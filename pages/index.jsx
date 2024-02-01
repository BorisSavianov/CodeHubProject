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
    <main>
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
      </div>
    </main>
  );
}
