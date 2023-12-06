import styles from "../styles/LandingPage.module.css";

export default function Section({ header, content, color }) {
  return (
    <section className={`${styles.section}`}>
      <h1 className={`${styles["section-heading"]} ${styles[color]}`}>
        {header}
      </h1>
      <p className={styles["section-paragraph"]}>{content}</p>
    </section>
  );
}
