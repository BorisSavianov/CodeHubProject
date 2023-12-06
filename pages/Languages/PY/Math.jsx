import styles from "../../../styles/Python.module.css";
import Section from "../../../components/Section";
import Navbar from "../../../components/Navbar";

export default function PythonMathFunctions() {
  return (
    <main className="container">
      <Navbar></Navbar>
      <div className={`${styles.varContent}`}>
        <Section
          header={"Вградени математически функции"}
          content={`Функциите min() и max() могат да се използват, за да намерят най-ниската или най-високата стойност в итерируем обект:`}
          color={"redBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.variable}>x</span> ={" "}
            <span className={styles.builtin}>min</span>(5, 10, 25)
            <br />
            <span className={styles.variable}>y</span> ={" "}
            <span className={styles.builtin}>max</span>(5, 10, 25)
            <br />
            <span className={styles.builtin}>print</span>(
            <span className={styles.variable}>x</span>)
            <br />
            <span className={styles.builtin}>print</span>(
            <span className={styles.variable}>y</span>)
            <br />
          </pre>
        </div>
        <Section
          header={"Функция abs()"}
          content={`Функцията abs() връща абсолютната (положителна) стойност на посоченото число:`}
          color={"purpleBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.variable}>x</span> ={" "}
            <span className={styles.builtin}>abs</span>(-7.25)
            <br />
            <span className={styles.builtin}>print</span>(
            <span className={styles.variable}>x</span>)
            <br />
          </pre>
        </div>
        <Section
          header={"Функция pow()"}
          content={`Функцията pow(x, y) връща стойността на x на степен y (xy):`}
          color={"greenBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.variable}>x</span> ={" "}
            <span className={styles.builtin}>pow</span>(4, 3)
            <br />
            <span className={styles.builtin}>print</span>(
            <span className={styles.variable}>x</span>)
            <br />
          </pre>
        </div>
        <Section
          header={"Модул Math"}
          content={`Python има вграден модул наречен math, който разширява списъка с математически функции.`}
          color={"blueBG"}
        />
        <div className={`${styles.varCode}`}>
          <pre className={styles.codeText}>
            <span className={styles.builtin}>import</span>{" "}
            <span className={styles.module}>math</span>
            <br />
            <span className={styles.variable}>x</span> ={" "}
            <span className={styles.module}>math</span>.
            <span className={styles.function}>sqrt</span>(64)
            <br />
            <span className={styles.builtin}>print</span>(
            <span className={styles.variable}>x</span>)
            <br />
          </pre>
        </div>
        <div className={`${styles.varCode}`}>
          <pre className={styles.codeText}>
            <span className={styles.variable}>x</span> ={" "}
            <span className={styles.module}>math</span>.
            <span className={styles.function}>ceil</span>(1.4)
            <br />
            <span className={styles.variable}>y</span> ={" "}
            <span className={styles.module}>math</span>.
            <span className={styles.function}>floor</span>(1.4)
            <br />
            <span className={styles.builtin}>print</span>(
            <span className={styles.variable}>x</span>){" "}
            <span className={styles.comment}># връща 2</span>
            <br />
            <span className={styles.builtin}>print</span>(
            <span className={styles.variable}>y</span>){" "}
            <span className={styles.comment}># връща 1</span>
            <br />
          </pre>
        </div>
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.variable}>x</span> ={" "}
            <span className={styles.module}>math</span>.
            <span className={styles.constant}>pi</span>
            <br />
            <span className={styles.builtin}>print</span>(
            <span className={styles.variable}>x</span>)
            <br />
          </pre>
        </div>
      </div>
    </main>
  );
}
