import styles from "../../../styles/C#.module.css";

import Section from "../../../components/Section";
import Navbar from "../../../components/Navbar";

export default function CSharpVariables() {
  return (
    <main>
      <Navbar></Navbar>
      <div className={` ${styles.varContent}`}>
        <Section
          header={"Променливи"}
          content={`Променливите са контейнери за съхранение на стойности на данни.`}
          color={"redBG"}
        />
        <div className={styles.varCode}>
          <pre className={styles.codeText}>
            <span className={styles.keyword}>
              // Пример: съхранение на текст
            </span>
            <br />
            <span className={styles.string}>string</span> name = "John";
            <br />
            <span className={styles.builtin}>Console.WriteLine</span>(name);
            <br />
            <br />
            <span className={styles.keyword}>
              // Пример: съхранение на число
            </span>
            <br />
            <span className={styles.keyword}>int</span> myNum = 15;
            <br />
            <span className={styles.builtin}>Console.WriteLine</span>(myNum);
          </pre>
        </div>
        <div className={styles.marginB}></div>
        <Section
          header={"Деклариране (Създаване) на Променливи"}
          content={`За да създадете променлива, трябва да посочите типа и да й присвоите стойност.`}
          color={"purpleBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.keyword}>
              // Пример: деклариране без присвояване
            </span>
            <br />
            <span className={styles.keyword}>int</span> myNum;
            <br />
            myNum = 15;
            <br />
            <span className={styles.builtin}>Console.WriteLine</span>(myNum);
            <br />
            <br />
            <span className={styles.keyword}>
              // Пример: промяна на стойността
            </span>
            <br />
            <span className={styles.keyword}>int</span> myNum = 15;
            <br />
            myNum = 20;{" "}
            <span className={styles.comment}>// myNum сега е 20</span>
            <br />
            <span className={styles.builtin}>Console.WriteLine</span>(myNum);
          </pre>
        </div>
        <Section
          header={"Други Типове"}
          content={`Демонстрация как да декларирате променливи от други типове:`}
          color={"greenBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.keyword}>int</span> myNum = 5;
            <br />
            <span className={styles.keyword}>double</span> myDoubleNum = 5.99D;
            <br />
            <span className={styles.keyword}>char</span> myLetter = 'D';
            <br />
            <span className={styles.keyword}>bool</span> myBool ={" "}
            <span className={styles.builtin}>true</span>;
            <br />
            <span className={styles.keyword}>string</span> myText = "Hello";
          </pre>
        </div>
        <Section
          header={"Константи"}
          content={`Ако не искате други да презаписват съществуващите стойности, използвайте ключовата дума const.`}
          color={"blueBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.keyword}>
              // Пример: константна променлива
            </span>
            <br />
            <span className={styles.keyword}>const</span>{" "}
            <span className={styles.keyword}>int</span> myNum = 15;
            <br />
            <span className={styles.comment}>// myNum = 20; // грешка</span>
          </pre>
        </div>
      </div>
    </main>
  );
}
