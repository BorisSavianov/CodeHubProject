import styles from "../../../styles/Python.module.css";
import Section from "../../../components/Section";
import Navbar from "../../../components/Navbar";

export default function PythonWhileLoop() {
  return (
    <main className="container">
      <Navbar></Navbar>
      <div className={`${styles.varContent}`}>
        <Section
          header={"Цикълът while"}
          content={`С цикъла while можем да изпълним определен набор от операции, докато условието е истина.`}
          color={"redBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.variable}>i</span> ={" "}
            <span className={styles.number}>1</span>
            <br />
            <span className={styles.keyword}>while</span>{" "}
            <span className={styles.variable}>i</span> {"<"}{" "}
            <span className={styles.number}>6</span>:
            <br />
            &nbsp;&nbsp;
            <span className={styles.builtin}>print</span>(
            <span className={styles.variable}>i</span>)
            <br />
            &nbsp;&nbsp;
            <span className={styles.variable}>i</span> +={" "}
            <span className={styles.number}>1</span>
            <br />
            <span className={styles.comment}>
              # Забележка: не забравяйте
              <br /> да увеличавате i,
              <br /> в противен случай цикълът
              <br /> ще продължи завинаги.
            </span>
          </pre>
        </div>
        <Section
          header={"Операторът break"}
          content={`С оператора break можем да спрем цикъла, дори ако условието на while е истина.`}
          color={"greenBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.variable}>i</span> ={" "}
            <span className={styles.number}>1</span>
            <br />
            <span className={styles.keyword}>while</span>{" "}
            <span className={styles.variable}>i</span> {"<"}{" "}
            <span className={styles.number}>6</span>:
            <br />
            &nbsp;&nbsp;
            <span className={styles.builtin}>print</span>(
            <span className={styles.variable}>i</span>)
            <br />
            &nbsp;&nbsp;
            <span className={styles.keyword}>if</span>{" "}
            <span className={styles.variable}>i</span> {"==="}{" "}
            <span className={styles.number}>3</span>:
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className={styles.keyword}>break</span>
            <br />
            &nbsp;&nbsp;
            <span className={styles.variable}>i</span> +={" "}
            <span className={styles.number}>1</span>
          </pre>
        </div>
        <Section
          header={"Операторът continue"}
          content={`С оператора continue можем да спрем текущата итерация и да продължим със следващата.`}
          color={"redBG"}
        />

        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.variable}>i</span> ={" "}
            <span className={styles.number}>0</span>
            <br />
            <span className={styles.keyword}>while</span>{" "}
            <span className={styles.variable}>i</span> {"<"}{" "}
            <span className={styles.number}>6</span>:
            <br />
            &nbsp;&nbsp;
            <span className={styles.variable}>i</span> +={" "}
            <span className={styles.number}>1</span>
            <br />
            &nbsp;&nbsp;
            <span className={styles.keyword}>if</span>{" "}
            <span className={styles.variable}>i</span> {"==="}{" "}
            <span className={styles.number}>3</span>:
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className={styles.keyword}>continue</span>
            <br />
            &nbsp;&nbsp;
            <span className={styles.builtin}>print</span>(
            <span className={styles.variable}>i</span>)
          </pre>
        </div>
        <Section
          header={"Операторът else"}
          content={`С оператора else можем да изпълним блок код, когато условието не е вярно повече.`}
          color={"greenBG"}
        />

        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.variable}>i</span> ={" "}
            <span className={styles.number}>1</span>
            <br />
            <span className={styles.keyword}>while</span>{" "}
            <span className={styles.variable}>i</span> {"<"}{" "}
            <span className={styles.number}>6</span>:
            <br />
            &nbsp;&nbsp;
            <span className={styles.builtin}>print</span>(
            <span className={styles.variable}>i</span>)
            <br />
            &nbsp;&nbsp;
            <span className={styles.variable}>i</span> +={" "}
            <span className={styles.number}>1</span>
            <br />
            <span className={styles.keyword}>else</span>:
            <br />
            &nbsp;&nbsp;
            <span className={styles.builtin}>print</span>(
            <span className={styles.string}>"i вече не е по-малко от 6"</span>)
          </pre>
        </div>
      </div>
    </main>
  );
}
