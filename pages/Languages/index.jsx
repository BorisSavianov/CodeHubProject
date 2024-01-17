import Navbar from "@/components/Navbar";
import { Card } from "../../components/Card";
import styles from "../../styles/Languages.module.css";
import Image from "next/image";
import Link from "next/link";

export default function Languages() {
  return (
    <main className="container">
      <Navbar />
      <div id="cards">
        <Link href={"/Languages/PY"} className={styles.card}>
          <div className={styles.cardContent}>
            <Image
              className={styles.cardImage}
              src={"/Lang/Python-logo.png"}
              width={200}
              height={200}
              alt={"Image"}
            />
            <div className={styles.cardInfoWrapper}>
              <div className={styles.cardInfo}>
                <div className={styles.cardInfoTitle}>
                  <h3>Python</h3>
                </div>
              </div>
            </div>
          </div>
        </Link>
        <Link href={"/"} className={styles.card}>
          <div className={styles.cardContent}>
            <Image
              className={styles.cardImage}
              src={"/Lang/Java_logo.png"}
              width={200}
              height={200}
              alt={"Image"}
            />
            <div className={styles.cardInfoWrapper}>
              <div className={styles.cardInfo}>
                <div className={styles.cardInfoTitle}>
                  <h3>Java</h3>
                </div>
              </div>
            </div>
          </div>
        </Link>
        <Link href={"/"} className={styles.card}>
          <div className={styles.cardContent}>
            <Image
              className={styles.cardImage}
              src={"/Lang/C_Sharp_Logo.png"}
              width={200}
              height={200}
              alt={"Image"}
            />
            <div className={styles.cardInfoWrapper}>
              <div className={styles.cardInfo}>
                <div className={styles.cardInfoTitle}>
                  <h3>C#</h3>
                </div>
              </div>
            </div>
          </div>
        </Link>
        <Link href={"/"} className={styles.card}>
          <div className={styles.cardContent}>
            <Image
              className={styles.cardImage}
              src={"/Lang/JS_logo.png"}
              width={200}
              height={200}
              alt={"Image"}
            />
            <div className={styles.cardInfoWrapper}>
              <div className={styles.cardInfo}>
                <div className={styles.cardInfoTitle}>
                  <h3>JavaScript</h3>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </main>
  );
}
