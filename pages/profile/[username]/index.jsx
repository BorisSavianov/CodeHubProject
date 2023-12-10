import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { getStorage, ref, deleteObject } from "firebase/storage";
import {
  reauthenticateWithCredential,
  EmailAuthProvider,
  GoogleAuthProvider,
  reauthenticateWithPopup,
} from "firebase/auth";
import { GithubAuthProvider } from "firebase/auth";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";

import styles from "../../../styles/Account.module.css";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import ToastComponent from "@/components/Toast";

// Функция за изтриване на профила и документа с потребителското име на потребителя
const deleteUserProfile = async (posts, user, router) => {
  const auth = getAuth();
  const firestore = getFirestore();
  const storage = getStorage();

  try {
    // Проверка на доставчика на влизане на потребителя
    const providerId = user.providerData[0].providerId;
    let credential;

    if (providerId === "password") {
      // Ако потребителят е влязъл с имейл/парола, поискване на парола
      const password = prompt("Моля, въведете паролата си");
      if (!password) {
        console.log("Паролата не е предоставена. Профилът не е изтрит.");
        return;
      }
      credential = EmailAuthProvider.credential(user.email, password);
    } else if (providerId === "google.com") {
      // Ако потребителят е влязъл с Google, повторна проверка с Google вход
      const provider = new GoogleAuthProvider();
      await reauthenticateWithPopup(auth.currentUser, provider);
    } else if (providerId === "github.com") {
      // Ако потребителят е влязъл с GitHub, повторна проверка с GitHub вход
      const provider = new GithubAuthProvider();
      await reauthenticateWithPopup(auth.currentUser, provider);
    } else {
      // Неподдържан доставчик на влизане, покажи грешка или обработи по подходящ начин
      console.error("Неподдържан доставчик на влизане. Профилът не е изтрит.");
      return;
    }

    // Ако имаме удостоверение, повторно удостовери потребителя
    if (credential) {
      await reauthenticateWithCredential(auth.currentUser, credential);
    }

    // Изтриване на публикациите и свързаните изображения на потребителя
    for (const post of posts) {
      if (post.imageUrl) {
        // Изтриване на изображението от съхранение
        const imageRef = ref(storage, post.imageUrl);
        await deleteObject(imageRef);
      }

      await deleteDoc(doc(firestore, "posts", post.id));

      // Изтриване на коментарите на потребителя в публикацията
      const commentsQuery = query(
        collection(firestore, `posts/${post.id}/comments`),
        where("userId", "==", user.uid)
      );
      const commentsSnapshot = await getDocs(commentsQuery);
      const commentsDocs = commentsSnapshot.docs;

      for (const commentDoc of commentsDocs) {
        await deleteDoc(commentDoc.ref);
      }
    }

    // Изтриване на документа за профила на потребителя
    await deleteDoc(doc(firestore, "users", user.uid));

    // Изтриване на потребителя от Firebase Authentication
    await auth.currentUser.delete();

    // Пренасочване на потребителя към началната страница или друга подходяща страница
    router.push("/");
  } catch (error) {
    console.error("Грешка при изтриване на потребителския профил:", error);
  }
};

export default function UserProfile() {
  const router = useRouter();
  const { username } = router.query;
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [userUsername, setUserUsername] = useState("");
  const [xp, setXP] = useState(0);

  useEffect(() => {
    const auth = getAuth();
    const firestore = getFirestore();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);

      if (user) {
        try {
          const userDocRef = doc(collection(firestore, "users"), user.uid);
          const userSnapshot = await getDoc(userDocRef);

          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            setUserUsername(userData.username);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    });

    const fetchUserProfile = async () => {
      try {
        const userProfileQuery = query(
          collection(firestore, "users"),
          where("username", "==", username)
        );
        const userProfileSnapshot = await getDocs(userProfileQuery);

        if (!userProfileSnapshot.empty) {
          const userProfileData = userProfileSnapshot.docs[0].data();
          setXP(userProfileData.xp || 0);
        } else {
          console.warn(`User with username ${username} not found.`);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    const fetchPosts = async () => {
      const userPostsQuery = query(
        collection(firestore, "posts"),
        where("username", "==", username)
      );
      const userPostsSnapshot = await getDocs(userPostsQuery);
      const userPostsData = userPostsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(userPostsData);
    };

    const fetchComments = async () => {
      if (user) {
        const userCommentsQuery = query(
          collection(firestore, "posts"),
          where("username", "==", username)
        );
        const userPostsSnapshot = await getDocs(userCommentsQuery);
        const userPostsDocs = userPostsSnapshot.docs;
        const userCommentsData = [];

        for (const userPostDoc of userPostsDocs) {
          const userPostId = userPostDoc.id;
          const userCommentsQuery = query(
            collection(firestore, `posts/${userPostId}/comments`),
            where("userId", "==", user.uid)
          );
          const userCommentsSnapshot = await getDocs(userCommentsQuery);
          const userCommentsDocs = userCommentsSnapshot.docs;
          const userComments = userCommentsDocs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          userCommentsData.push(...userComments);
        }

        setComments(userCommentsData);
      }
    };

    fetchUserProfile();
    fetchPosts();
    fetchComments();

    return () => unsubscribe();
  }, [username, user]);

  const handleDelete = async (postId, imageUrl) => {
    const firestore = getFirestore();
    const storage = getStorage();

    try {
      // Изтриване на документа за публикацията
      await deleteDoc(doc(firestore, "posts", postId));

      // Изтриване на свързаното изображение, ако съществува
      if (imageUrl) {
        const imageRef = ref(storage, imageUrl);
        await deleteObject(imageRef);
      }

      // Актуализация на състоянието на публикациите, за да се премахне изтритата публикация
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));

      console.log("Публикацията беше успешно изтрита");
    } catch (error) {
      console.error("Грешка при изтриване на публикацията:", error);
    }
  };

  const handleSignOut = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      console.log("Успешно излизане");
      router.push("/login");
    } catch (error) {
      console.error("Грешка при излизане:", error);
    }
  };

  const handleDeleteProfile = async () => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser && currentUser.emailVerified) {
      try {
        await auth.currentUser.reload();
        const refreshedUser = auth.currentUser;
        if (refreshedUser.emailVerified) {
          deleteUserProfile(posts, refreshedUser, router);
        } else {
          console.error(
            "Изтекъл електронен адрес за потвърждение на потребителя. Моля, влезте отново."
          );
        }
      } catch (error) {
        console.error(
          "Грешка при обновяване на състоянието на удостоверението на потребителя:",
          error
        );
      }
    } else {
      console.error(
        "Изтекло състояние на удостоверение на потребителя. Моля, влезте отново."
      );
    }
  };

  const handleChangePassword = async () => {
    const auth = getAuth();

    // TODO: Реализирайте собствен механизъм за подкана на потребителя за техния имейл
    const userEmail = prompt("Моля, въведете вашия имейл");

    if (userEmail) {
      try {
        await sendPasswordResetEmail(auth, userEmail);
        console.log("Имейл за нулиране на парола изпратен успешно");
      } catch (error) {
        console.error(
          "Грешка при изпращане на имейл за нулиране на парола:",
          error
        );
      }
    }
  };

  if (!user) {
    return <p>Зареждане...</p>;
  }

  // Example: Increment XP
  const handleIncrementXP = async () => {
    const firestore = getFirestore();

    try {
      // Update state
      setXP((prevXP) => prevXP + 1);

      // Get the updated XP value
      const updatedXP = xp + 1;

      // Update Firestore
      await updateDoc(doc(firestore, "users", user.uid), { xp: updatedXP });

      // Show toast with the updated XP value
      ToastComponent(`Имате ${updatedXP}xp`, "info");
    } catch (error) {
      console.error("Error updating user XP:", error);
    }
  };

  const isOwnAccount = userUsername === username; // Проверка дали потребителят разглежда своя собствен профил

  return (
    <main className="container">
      <Navbar />
      <main className={styles.details}>
        <img src={user.photoURL} className={styles.profilePic}></img>
        <p className={styles.username}>{username}</p>
        <p>XP: {xp}</p>
        {comments.length > 0 ? (
          <p>{comments.length} Коментара</p>
        ) : (
          <p>Няма коментари</p>
        )}
      </main>

      {/* Показване на публикациите и коментарите на потребителя */}
      {isOwnAccount && (
        <>
          <div className={styles["btn-wrapper"]}>
            <button onClick={handleChangePassword} className={styles.btn}>
              Промяна на парола
            </button>
            <button onClick={handleDeleteProfile} className={styles.btn}>
              Изтриване на профил
            </button>
            <button onClick={handleSignOut} className={styles.btn}>
              Излизане
            </button>
          </div>
        </>
      )}

      <button onClick={handleIncrementXP}>hi</button>

      <aside>
        <h2 className={styles.heading}>Публикации</h2>
        {posts.length > 0 ? (
          <div className={styles.posts}>
            {posts.map((post) => (
              <article className={styles.post}>
                <Link key={post.id} href={`/posts/${post.id}`}>
                  <div className={styles.title}>{post.title}</div>
                </Link>
                <button
                  className={styles.delBtn}
                  onClick={() => handleDelete(post.id, post.imageUrl)}
                >
                  Изтриване
                </button>
              </article>
            ))}
          </div>
        ) : (
          <p>Няма намерени публикации.</p>
        )}
      </aside>
    </main>
  );
}
