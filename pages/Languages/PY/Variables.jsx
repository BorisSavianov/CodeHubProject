import styles from "../../../styles/Python.module.css";

import Section from "../../../components/Section";
import Navbar from "../../../components/Navbar";

export default function PythonVariables() {
  return (
    <main className="container">
      <Navbar></Navbar>
      <div className={`${styles.varContent}`}>
        <Section
          header={"Променливи"}
          content={`В Python няма команда за деклариране на променлива. Тя се декларира сама когато и дадем дадена стойност`}
          color={"redBG"}
        />
        <div className={styles.varCode}>
          <pre className={styles.codeText}>
            <span className={styles.keyword}>x</span> ={" "}
            <span className={styles.number}>5</span>
            <br />
            <span className={styles.keyword}>y</span> ={" "}
            <span className={styles.string}>"Здравейте"</span>
            <br />
            <span className={styles.builtin}>print</span>(
            <span className={styles.variable}>x</span>)
            <br />
            <span className={styles.builtin}>print</span>(
            <span className={styles.variable}>y</span>)
            <br />
          </pre>
        </div>
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.variable}>x</span> ={" "}
            <span className={styles.number}>4</span>{" "}
            <span className={styles.comment}># x сега е от тип int</span>
            <br />
            <span className={styles.variable}>x</span> ={" "}
            <span className={styles.string}>"Sally"</span>{" "}
            <span className={styles.comment}># x сега е от тип str</span>
          </pre>
        </div>
        <Section
          header={"Casting"}
          content={`Ако искаме да спесифицираме типът на данните на променлива може да го направим с Casting`}
          color={"purpleBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.variable}>x</span> ={" "}
            <span className={styles.builtin}>str</span>(
            <span className={styles.number}>3</span>){" "}
            <span className={styles.comment}># x ще е '3'</span>
            <br />
            <span className={styles.variable}>y</span> ={" "}
            <span className={styles.builtin}>int</span>(
            <span className={styles.number}>3</span>){" "}
            <span className={styles.comment}># y ще е 3</span>
            <br />
            <span className={styles.variable}>z</span> ={" "}
            <span className={styles.builtin}>float</span>(
            <span className={styles.number}>3</span>){" "}
            <span className={styles.comment}># z ще е 3.0</span>
          </pre>
        </div>
        <Section
          header={"Главни букви"}
          content={`Имената на променливите зависят от главните букви в имената им`}
          color={"greenBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.variable}>a</span> ={" "}
            <span className={styles.number}>4</span>
            <br />
            <span className={styles.variable}>A</span> ={" "}
            <span className={styles.string}>"Мария"</span>
            <br />
            <span className={styles.comment}># A няма да промени a</span>
          </pre>
        </div>
      </div>
    </main>
  );
}
