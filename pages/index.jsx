import React, { useState, useEffect, useRef } from "react";
import { getFirestore, collection, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../components/Navbar";
import styles from "../styles/LandingPage.module.css";
import ScrollAnimation from "react-animate-on-scroll";
import "animate.css/animate.min.css";

export default function LandingPage() {
  const [username, setUsername] = useState("");
  const auth = getAuth();

  useEffect(() => {
    const fetchUsername = async () => {
      const db = getFirestore();
      const user = auth.currentUser;

      if (user) {
        const userDocRef = doc(collection(db, "users"), user.uid);
        const userSnapshot = await getDoc(userDocRef);

        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          setUsername(userData.username);
        }
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUsername();
      }
    });

    // Clean up the event listener and subscription
    return () => {
      unsubscribe();
    };
  }, [auth]);

  // Smooth scroll to the center of the specified section
  const scrollToCenterOfSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    if (sectionElement) {
      const windowHeight = window.innerHeight;
      const sectionOffsetTop = sectionElement.offsetTop;
      const sectionHeight = sectionElement.offsetHeight;

      const scrollToY = sectionOffsetTop - (windowHeight - sectionHeight) / 2;

      window.scrollTo({
        top: scrollToY,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="container">
      <Navbar />
      <header className={styles.heading}>
        <div>
          <div className={styles["heading-text"]}>
            <h1 className={`${styles["heading-text-top"]}`}>Кодирай</h1>
            <h1 className={`${styles["heading-text-middle"]}`}>Научи</h1>
            <h1 className={`${styles["heading-text-bottom"]}`}>Проспрерирай</h1>
          </div>
          <div className={`${styles["learn-more"]}`}>
            <p className={styles["section-paragraph"]}>
              <span className={styles.gold}>CodeHub</span> е платформа за{" "}
              <span className={styles.greenAnim}>обучение по програмиране</span>
              , която ви предоставя всичко необходимо за да развиете своите
              умения и компетенции
            </p>
            <button
              className={`${styles["learn-more-btn"]}`}
              onClick={() => scrollToCenterOfSection("essence-section")}
            >
              Разберете повече
            </button>
          </div>
        </div>
        <div>
          <Image
            className={styles.headingImg}
            src="/CodeHub-logo.png"
            width={257}
            height={250}
            alt="header image"
          />
        </div>
      </header>

      <div className={styles.content}>
        <div className={styles.sectionWrapper}>
          <div className={styles.animation}>
            <ScrollAnimation
              animateIn="animate__fadeInLeft"
              className={styles.animation}
              delay={120}
            >
              <h1
                className={`${styles["section-heading"]} ${styles["blueBG"]}`}
              >
                Същност
              </h1>
            </ScrollAnimation>
          </div>
          <ScrollAnimation animateIn="animate__fadeInLeft">
            <section className={`${styles.section}`} id="essence-section">
              <p className={styles["section-paragraph"]}>
                Открийте популярни езици за програмиране
                <span className={styles.blue}> по забавен и интерактивен </span>
                начин
              </p>
              <button
                className={`${styles["essence-btn"]}`}
                onClick={() =>
                  scrollToCenterOfSection("online-compiler-section")
                }
              >
                Еха!
              </button>
            </section>
          </ScrollAnimation>
        </div>

        <div className={styles.sectionWrapper}>
          <div className={styles.animation}>
            <ScrollAnimation
              animateIn="animate__fadeInLeft"
              className={styles.animation}
              delay={120}
            >
              <h1
                className={`${styles["section-heading"]} ${styles["purpleBG"]}`}
              >
                Онлайн Компилатор
              </h1>
            </ScrollAnimation>
          </div>

          <ScrollAnimation animateIn="animate__fadeInLeft">
            <section
              className={`${styles.section}`}
              id="online-compiler-section"
            >
              <p className={styles["section-paragraph"]}>
                Проверете вашите умения като използвате нашият
                <span className={styles.pink}> онлайн компилатор!</span>
              </p>
              <button
                className={`${styles["comp-btn"]}`}
                onClick={() => scrollToCenterOfSection("question-section")}
              >
                Какво още?
              </button>
            </section>
          </ScrollAnimation>
        </div>
        <div className={styles.sectionWrapper}>
          <div className={styles.animation}>
            <ScrollAnimation
              animateIn="animate__fadeInLeft"
              className={styles.animation}
              delay={120}
            >
              <h1
                className={`${styles["section-heading"]} ${styles["pinkBG"]}`}
              >
                Ако имате въпрос, попитайте!
              </h1>
            </ScrollAnimation>
          </div>
          <ScrollAnimation animateIn="animate__fadeInLeft">
            <section className={`${styles.section}`} id="question-section">
              <p className={styles["section-paragraph"]}>
                Нуждаете се от допълнителна помощ?
                <span className={styles.purple}> Задайте</span> въпроса си в
                нашия
                <span className={styles.purpleAnim}> форум!</span>
              </p>
              <Link style={{ textDecoration: "none" }} href="Languages/">
                <button className={`${styles["get-started-btn"]}`}>
                  Да започваме!
                </button>
              </Link>
            </section>
          </ScrollAnimation>
        </div>

        <footer className={styles.footer}>
          <ScrollAnimation animateIn="animate__fadeInUp">
            <div className={styles.line}></div>
            <h3 className={styles.FooterContent}>
              Имате въпроси или предложения? Свържете се с мен на
              <Link href="mailto:bsavianov@gmail.com" className={styles.email}>
                ‎ bsavianov@gmail.com
              </Link>
            </h3>
            <div className={styles.socials}>
              <Link
                className={styles.github}
                href="https://github.com/BorisSavianov/"
              >
                <svg
                  aria-hidden="true"
                  data-prefix="fab"
                  data-icon="github"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 496 512"
                >
                  <path
                    fill="currentColor"
                    d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
                  ></path>
                </svg>
              </Link>
              <Link
                className={styles.facebook}
                href="https://www.facebook.com/boris.savianov"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  viewBox="2.8 2 24 30"
                >
                  <path
                    fill="currentColor"
                    d="M15,3C8.373,3,3,8.373,3,15c0,6.016,4.432,10.984,10.206,11.852V18.18h-2.969v-3.154h2.969v-2.099c0-3.475,1.693-5,4.581-5 c1.383,0,2.115,0.103,2.461,0.149v2.753h-1.97c-1.226,0-1.654,1.163-1.654,2.473v1.724h3.593L19.73,18.18h-3.106v8.697 C22.481,26.083,27,21.075,27,15C27,8.373,21.627,3,15,3z"
                  ></path>
                </svg>
              </Link>
            </div>
          </ScrollAnimation>
        </footer>
      </div>
    </main>
  );
}
