import { useEffect, useState } from "react";
import { startAfter } from "firebase/firestore";

import { useRouter } from "next/router";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  addDoc,
  serverTimestamp,
  deleteDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "../../../lib/firebase";
import {
  getDatabase,
  ref as rtdbRef,
  get as rtdbGet,
  set as rtdbSet,
} from "firebase/database";

import styles from "../../../styles/Posts.module.css";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import ToastComponent from "@/components/Toast";

export async function getStaticPaths() {
  const firestore = getFirestore();
  const postsQuery = query(collection(firestore, "posts"));
  const postsSnapshot = await getDocs(postsQuery);
  const paths = postsSnapshot.docs.map((doc) => ({
    params: { postId: doc.id },
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps(context) {
  const { postId } = context.params;
  const firestore = getFirestore();
  const postDocRef = doc(firestore, "posts", postId);
  const postDocSnapshot = await getDoc(postDocRef);

  if (!postDocSnapshot.exists()) {
    return {
      notFound: true,
    };
  }

  const postData = postDocSnapshot.data();
  const post = {
    ...postData,
    createdAt: postData.createdAt.toDate().toISOString(), // Convert to ISO string
  };

  return {
    props: {
      post,
    },
    revalidate: 60, // ISR every 60 seconds
  };
}

export default function PostDetails({ post }) {
  const router = useRouter();
  const { postId } = router.query;
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [createdBy, setCreatedBy] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [numCommentsToShow, setNumCommentsToShow] = useState(5);
  const [numCommentsToFetch, setNumCommentsToFetch] = useState(5);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [hasMoreComments, setHasMoreComments] = useState(true);
  const [totalComments, setTotalComments] = useState(0);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Fetch comments initially
    fetchComments(numCommentsToFetch);

    // Check liked status and fetch like count
    checkLikedStatus();
    fetchLikeCount();

    // Set up interval to refresh comments every 10 seconds
    const intervalId = setInterval(() => {
      fetchComments(numCommentsToFetch);
    }, 60000); // 10 seconds

    // Clean up the interval on component unmount
    return () => {
      clearInterval(intervalId);
    };

    // Dependency array includes the necessary dependencies
  }, [post, numCommentsToFetch]);

  const fetchLikeCount = async () => {
    const databaseUrl =
      "https://codehub-bac6f-default-rtdb.europe-west1.firebasedatabase.app";
    const database = getDatabase(app, databaseUrl);
    const postLikeCountRef = rtdbRef(database, `posts/${postId}/likeCount`);

    try {
      const snapshot = await rtdbGet(postLikeCountRef);
      if (snapshot.exists()) {
        setLikeCount(snapshot.val());
      }
    } catch (error) {
      console.error("Error fetching like count:", error);
    }
  };

  const handleLike = async () => {
    const databaseUrl =
      "https://codehub-bac6f-default-rtdb.europe-west1.firebasedatabase.app";
    const database = getDatabase(app, databaseUrl);
    const auth = getAuth();

    if (!auth.currentUser) {
      ToastComponent("Трябва да сте регистрирани.", "error");
      return;
    }

    const userUid = auth.currentUser.uid;
    const userLikeRef = rtdbRef(database, `posts/${postId}/likes/${userUid}`);
    const postLikeCountRef = rtdbRef(database, `posts/${postId}/likeCount`);

    try {
      const snapshot = await rtdbGet(postLikeCountRef);

      if (!liked) {
        // Increase like count
        await rtdbSet(userLikeRef, true);
        const newLikeCount = snapshot.val() + 1;
        await rtdbSet(postLikeCountRef, newLikeCount); // Increment like count in DB
      } else {
        // Decrease like count
        await rtdbSet(userLikeRef, null);
        const newLikeCount = snapshot.val() - 1;
        await rtdbSet(postLikeCountRef, newLikeCount); // Decrement like count in DB
      }

      // After updating the database, fetch the updated like count and status
      fetchLikeCount();
      checkLikedStatus();
    } catch (error) {
      console.error("Error updating like status:", error);
    }
  };

  const checkLikedStatus = async () => {
    const databaseUrl =
      "https://codehub-bac6f-default-rtdb.europe-west1.firebasedatabase.app";
    const database = getDatabase(app, databaseUrl);
    const auth = getAuth();

    if (auth.currentUser) {
      const userUid = auth.currentUser.uid;
      const likedStatusRef = rtdbRef(
        database,
        `posts/${postId}/likes/${userUid}`
      );

      try {
        const likedSnapshot = await rtdbGet(likedStatusRef);
        setLiked(likedSnapshot.exists());
      } catch (error) {
        console.error("Error checking liked status:", error);
      }
    }
  };

  const fetchComments = async (numComments) => {
    const firestore = getFirestore();
    const commentsQuery = query(
      collection(firestore, "posts", postId, "comments"),
      orderBy("createdAt", "desc"), // Newest to oldest
      limit(numComments)
    );

    const commentsSnapshot = await getDocs(commentsQuery);
    const commentsData = commentsSnapshot.docs.map((doc) => {
      const comment = doc.data();
      comment.id = doc.id; // Assign the document ID to the comment
      return comment;
    });

    setComments(commentsData.reverse()); // Reverse to maintain the correct order

    const totalCommentsQuery = query(
      collection(firestore, "posts", postId, "comments")
    );
    const totalCommentsSnapshot = await getDocs(totalCommentsQuery);
    setTotalComments(totalCommentsSnapshot.size);
  };

  const handleCommentSubmit = async (event) => {
    event.preventDefault();

    if (!user || !commentText) {
      return;
    }

    const firestore = getFirestore();
    const commentsRef = collection(firestore, "posts", postId, "comments");

    try {
      const newComment = {
        userId: user.uid,
        text: commentText,
        createdAt: serverTimestamp(),
      };

      const docRef = await addDoc(commentsRef, newComment);

      // Update the newComment object with the generated document ID
      newComment.id = docRef.id;

      // Update state with the newComment
      setComments((prevComments) => [...prevComments, newComment]);
      setCommentText("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleLoadMoreComments = async () => {
    if (!hasMoreComments) {
      return;
    }

    if (comments.length >= totalComments) {
      setHasMoreComments(false);
      return;
    }

    const oldestComment = comments[comments.length - 1];
    const oldestCommentTimestamp = oldestComment.createdAt;

    const firestore = getFirestore();
    const commentsQuery = query(
      collection(firestore, "posts", postId, "comments"),
      orderBy("createdAt", "desc"),
      startAfter(oldestCommentTimestamp),
      limit(numCommentsToFetch)
    );

    try {
      const commentsSnapshot = await getDocs(commentsQuery);
      const additionalComments = commentsSnapshot.docs.map((doc) => doc.data());

      if (additionalComments.length === 0) {
        // No more comments to load
        setHasMoreComments(false);
        return;
      }

      // Append the additional comments in the correct order (newest to oldest)
      setComments((prevComments) => [
        ...prevComments,
        ...additionalComments.reverse(),
      ]);
    } catch (error) {
      console.error("Error fetching additional comments:", error);
    }
  };

  const deleteComment = async (comment) => {
    if (!comment || !comment.id || !postId) {
      console.error("Comment data, comment ID, or postId is missing.");
      return;
    }

    const firestore = getFirestore();
    const commentDocRef = doc(
      firestore,
      "posts",
      postId,
      "comments",
      comment.id
    );

    try {
      await deleteDoc(commentDocRef);
      console.log("Comment deleted");

      // Update the comments state by filtering out the deleted comment
      setComments((prevComments) =>
        prevComments.filter((c) => c.id !== comment.id)
      );

      // Decrease the totalComments count
      setTotalComments((prevTotal) => prevTotal - 1);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <main>
      <Navbar />
      <h2 className={styles.title}>{post.title}</h2>
      <p className={styles.PostContent}>{post.content}</p>
      {createdBy && <p>Направен от: {createdBy}</p>}
      {post.imageUrl && (
        <div className={styles.ImgContainer}>
          <Link href={post.imageUrl}>
            <img
              className={styles.img}
              src={post.imageUrl}
              alt={`Post ${postId} image`}
            />
          </Link>
        </div>
      )}

      <h2 className={styles.LikesHead}>Харесване</h2>
      <div className={styles.LikesDiv}>
        <div className={styles.BtnDiv}>
          {liked ? (
            <button onClick={handleLike} className={styles.NotLiked}>
              Премахване
            </button>
          ) : (
            <button onClick={handleLike} className={styles.Liked}>
              Харесване
            </button>
          )}
          <p className={styles.LikeCount}>Харесвания: {likeCount}</p>
          {/* Display the like count */}
        </div>
      </div>

      <h3 className={styles.CommentsHeading}>Коментари</h3>
      <div className={styles.line}></div>
      {user && (
        <form onSubmit={handleCommentSubmit} className={styles.CommentForm}>
          <p>Добави коментар</p>
          <input
            type="text"
            value={commentText}
            onChange={(event) => setCommentText(event.target.value)}
          />

          <button type="submit">Коментирай</button>
        </form>
      )}

      {comments.length > 0 ? (
        <div>
          <aside className={styles.Comments}>
            {comments.map((comment, index) => (
              <div className={styles.Comment} key={index}>
                {comment.text}
                {user && user.uid === comment.userId && (
                  <button
                    className={styles.deleteBtn}
                    onClick={() => deleteComment(comment)}
                  >
                    Изтрий
                  </button>
                )}
              </div>
            ))}
          </aside>
          {hasMoreComments && comments.length >= numCommentsToShow && (
            <button onClick={handleLoadMoreComments}>Зареди още</button>
          )}
        </div>
      ) : (
        <p
          style={{
            display: "flex",
            justifyContent: "center",
            width: "100%",
            marginBottom: "50px",
          }}
        >
          Няма коментари
        </p>
      )}
    </main>
  );
}
