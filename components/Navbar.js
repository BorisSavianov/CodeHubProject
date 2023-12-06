import Image from "next/image";
import styles from "../styles/Navbar.module.css";
import Link from "next/link";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const auth = getAuth();

  useEffect(() => {
    const fetchUsername = async () => {
      const db = getFirestore();
      const currentUser = auth.currentUser;

      if (currentUser) {
        const userDocRef = doc(collection(db, "users"), currentUser.uid);
        const userSnapshot = await getDoc(userDocRef);

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          setUsername(userData.username);
        }
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        fetchUsername();
      }
    });

    return () => unsubscribe();
  }, [auth]);

  function changeCss() {
    const wrapperElement = document.querySelector("header");
    this.scrollY > 230
      ? wrapperElement.classList.add("wrapper")
      : wrapperElement.classList.remove("wrapper");
  }

  window.addEventListener("scroll", changeCss, false);

  return (
    <>
      <style>{`
      .wrapper {
        position: fixed;
        top: 0;
        left: auto;
        right: auto;
        width: 100%;
        backdrop-filter: blur(2px);
      }
    `}</style>

      <header>
        <nav className={styles.nav}>
          <Link href="/">
            <Image
              src="/CodeHub-logo.png"
              width={50}
              height={50}
              alt="website logo"
              className={styles.logo}
            />
          </Link>

          <aside className={`${styles.options} ${styles["push-left"]}`}>
            <Link
              href="https://translator-alpha.vercel.app"
              className={`${styles.option}`}
            >
              Компилатор
            </Link>
            <Link href={`/posts`} className={`${styles.option}`}>
              Форум
            </Link>
            {user && user.photoURL ? (
              <Link href={`/profile/${username}`}>
                <Image
                  className={styles.profilePic}
                  src={user.photoURL}
                  width={50}
                  height={50}
                  alt={user.displayName}
                />
              </Link>
            ) : user ? (
              <Link href={`/profile/${username}`}>
                <Image
                  className={styles.profilePic}
                  width={50}
                  height={50}
                  alt={user.displayName}
                />
              </Link>
            ) : (
              <Link href={`/login`}>
                <Image
                  className={styles.profilePic}
                  src="/hacker.png"
                  width={50}
                  height={50}
                  alt="fallback image"
                />
              </Link>
            )}
          </aside>
        </nav>
      </header>
    </>
  );
}
