import { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";

import Link from "next/link";

import styles from "../../styles/Posts.module.css";
import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function PostsPage({ posts, user }) {
  // Проверка дали има потребител и извеждане на съобщение или null
  if (!user) {
    return <p>Трябва да сте влезли, за да видите постовете.</p>; // Променете това съобщение според нуждите
  }

  const [postsWithUsername, setPostsWithUsername] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState([]);
  const postsPerPage = 3; // Брой постове на страница
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchPostsWithUsername = async () => {
      const firestore = getFirestore();

      const postsWithUsernameData = await Promise.all(
        posts.map(async (post) => {
          if (!post.userId) {
            // Обработка на случаите, когато липсва userId
            return post;
          }

          const userDocRef = doc(firestore, "users", post.userId);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            const username = userData.username;
            return {
              ...post,
              username: username,
            };
          } else {
            return post;
          }
        })
      );

      setPostsWithUsername(postsWithUsernameData);
    };

    fetchPostsWithUsername();
  }, [posts]);

  useEffect(() => {
    // Изчисляване на обхвата на индексите за видимите постове
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const currentPosts = postsWithUsername.slice(startIndex, endIndex);
    setVisiblePosts(currentPosts);
  }, [currentPage, postsWithUsername]);

  const nextPage = () => {
    if (currentPage * postsPerPage < postsWithUsername.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <main>
      <Navbar />

      <div className={styles.create}>
        <h2>Направи пост</h2>
        <Link href="/posts/new">
          <button className={styles.createBtn}>Нов пост</button>
        </Link>
      </div>
      <h1 className={styles.all}>Всички постове</h1>
      <section className={styles.wraper}>
        {visiblePosts.map((post) => (
          <Link
            href={`/posts/${post.id}`}
            key={post.id}
            className={styles.posts}
          >
            {post.imageUrl ? (
              <>
                <div className={styles.imageWrapper}>
                  <img
                    src={post.imageUrl}
                    className={styles.image}
                    alt={post.title}
                  />
                </div>
                <div className={styles.content}>
                  <h2>{post.title}</h2>
                  <p>
                    {post.content.length > 50
                      ? `${post.content.slice(0, 50)}...`
                      : post.content}
                  </p>
                </div>
              </>
            ) : (
              <div className={styles.contentShort}>
                <h2>{post.title}</h2>
                <p>
                  {post.content.length > 50
                    ? `${post.content.slice(0, 50)}...`
                    : post.content}
                </p>
              </div>
            )}
          </Link>
        ))}
      </section>

      <div className={styles.pagination}>
        <button
          className={`${styles.PagBtn} ${
            currentPage === 1 ? styles.disabled : ""
          }`}
          onClick={prevPage}
          disabled={currentPage === 1}
        >
          Предишна
        </button>
        <button
          className={`${styles.PagBtn} ${
            currentPage * postsPerPage >= postsWithUsername.length
              ? styles.disabled
              : ""
          }`}
          onClick={nextPage}
          disabled={currentPage * postsPerPage >= postsWithUsername.length}
        >
          Следваща
        </button>
      </div>
    </main>
  );
}

export async function getServerSideProps() {
  try {
    const firestore = getFirestore();
    const postsRef = collection(firestore, "posts");
    const postsQuery = query(postsRef, orderBy("createdAt", "desc"));
    const snapshot = await getDocs(postsQuery);
    const posts = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        title: data.title,
        content: data.content,
        userId: data.userId || null,
        imageUrl: data.imageUrl,
      };
    });

    return {
      props: {
        posts,
      },
    };
  } catch (error) {
    console.error("Грешка при извличане на постове:", error);

    return {
      props: {
        posts: [],
      },
    };
  }
}
