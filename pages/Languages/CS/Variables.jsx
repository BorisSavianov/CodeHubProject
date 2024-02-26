import styles from "../../../styles/C#.module.css";

import Section from "../../../components/Section";
import Navbar from "../../../components/Navbar";

export default function CSharpVariables() {
  return (
    <main>
      <Navbar></Navbar>
      <div className={` ${styles.varContent}`}>
        <Section
          header={"Variables"}
          content={`Variables are containers for storing data values.`}
          color={"redBG"}
        />
        <div className={styles.varCode}>
          <pre className={styles.codeText}>
            <span className={styles.keyword}>// Example: storing text</span>
            <br />
            <span className={styles.string}>string</span> name = "John";
            <br />
            <span className={styles.builtin}>Console.WriteLine</span>(name);
            <br />
            <br />
            <span className={styles.keyword}>// Example: storing a number</span>
            <br />
            <span className={styles.keyword}>int</span> myNum = 15;
            <br />
            <span className={styles.builtin}>Console.WriteLine</span>(myNum);
          </pre>
        </div>
        <div className={styles.marginB}></div>
        <Section
          header={"Declaring (Creating) Variables"}
          content={`To create a variable, you must specify the type and assign it a value.`}
          color={"purpleBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.keyword}>
              // Example: declaring without assigning
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
              // Example: changing the value
            </span>
            <br />
            <span className={styles.keyword}>int</span> myNum = 15;
            <br />
            myNum = 20;{" "}
            <span className={styles.comment}>// myNum is now 20</span>
            <br />
            <span className={styles.builtin}>Console.WriteLine</span>(myNum);
          </pre>
        </div>
        <Section
          header={"Other Types"}
          content={`A demonstration of how to declare variables of other types:`}
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
          header={"Constants"}
          content={`If you don't want others to overwrite existing values, use the const keyword.`}
          color={"blueBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.keyword}>
              // Example: constant variable
            </span>
            <br />
            <span className={styles.keyword}>const</span>{" "}
            <span className={styles.keyword}>int</span> myNum = 15;
            <br />
            <span className={styles.comment}>// myNum = 20; // error</span>
          </pre>
        </div>
      </div>
    </main>
  );
}
