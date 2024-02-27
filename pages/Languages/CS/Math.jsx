import styles from "../../../styles/C#.module.css";
import Section from "../../../components/Section";
import Navbar from "../../../components/Navbar";

export default function CSharpMathFunctions() {
  return (
    <main>
      <Navbar></Navbar>
      <div className={`${styles.varContent}`}>
        <Section
          header={"C# Math"}
          content={`Класът C# Math разполага с много методи, които ви позволяват да извършвате математически операции с числа.`}
          color={"redBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.variable}>Math.Max</span>(x, y)
            <br />
            <br />
            <span
              className={styles.comment}
            >{`// Методът Math.Max(x, y) може да се използва `}</span>
            <br />
            <span
              className={styles.comment}
            >{`за намиране на най-голямата стойност между x и y:`}</span>
            <br />
            <span className={styles.builtin}>Пример</span>
            <br />
            <br />
            <span className={styles.variable}>Math.Max</span>(5, 10);
          </pre>
        </div>
        <Section
          header={"Math.Min(x, y)"}
          content={`Методът Math.Min(x, y) може да се използва за намиране на най-малката стойност между x и y:`}
          color={"purpleBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.variable}>Math.Min</span>(x, y)
            <br />
            <br />
            <span
              className={styles.comment}
            >{`// Методът Math.Min(x, y) може да се използва `}</span>
            <br />
            <span
              className={styles.comment}
            >{`за намиране на най-малката стойност между x и y:`}</span>
            <br />
            <span className={styles.builtin}>Пример</span>
            <br />
            <br />
            <span className={styles.variable}>Math.Min</span>(5, 10);
          </pre>
        </div>
        <Section
          header={"Math.Sqrt(x)"}
          content={`Методът Math.Sqrt(x) връща корен квадратен от x:`}
          color={"greenBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.variable}>Math.Sqrt</span>(x)
            <br />
            <br />
            <span
              className={styles.comment}
            >{`// Методът Math.Sqrt(x) връща `}</span>
            <br />
            <span className={styles.comment}>{`корен квадратен от x:`}</span>
            <br />
            <span className={styles.builtin}>Пример</span>
            <br />
            <br />
            <span className={styles.variable}>Math.Sqrt</span>(64);
          </pre>
        </div>
        <Section
          header={"Math.Abs(x)"}
          content={`Методът Math.Abs(x) връща абсолютната (положителна) стойност на x:`}
          color={"blueBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.variable}>Math.Abs</span>(x)
            <br />
            <br />
            <span
              className={styles.comment}
            >{`// Методът Math.Abs(x) връща `}</span>
            <br />
            <span
              className={styles.comment}
            >{`абсолютната (положителна) стойност на x:`}</span>
            <br />
            <span className={styles.builtin}>Пример</span>
            <br />
            <br />
            <span className={styles.variable}>Math.Abs</span>(-4.7);
          </pre>
        </div>
        <Section
          header={"Math.Round()"}
          content={`Math.Round() закръгля число до най-близкото цяло число:`}
          color={"purpleBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.variable}>Math.Round</span>(x)
            <br />
            <br />
            <span
              className={styles.comment}
            >{`// Math.Round() закръгля число `}</span>
            <br />
            <span
              className={styles.comment}
            >{`до най-близкото цяло число:`}</span>
            <br />
            <span className={styles.builtin}>Пример</span>
            <br />
            <br />
            <span className={styles.variable}>Math.Round</span>(9.99);
          </pre>
        </div>
      </div>
    </main>
  );
}
