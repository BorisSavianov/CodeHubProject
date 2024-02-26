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
          content={`The C# Math class has many methods that allow you to perform mathematical tasks on numbers.`}
          color={"redBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.variable}>Math.Max</span>(x, y)
            <br />
            <br />
            <span
              className={styles.comment}
            >{`// The Math.Max(x, y) method can be used `}</span>
            <br />
            <span
              className={styles.comment}
            >{`to find the highest value of x and y:`}</span>
            <br />
            <span className={styles.builtin}>Example</span>
            <br />
            <br />
            <span className={styles.variable}>Math.Max</span>(5, 10);
          </pre>
        </div>
        <Section
          header={"Math.Min(x, y)"}
          content={`The Math.Min(x, y) method can be used to find the lowest value of x and y:`}
          color={"purpleBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.variable}>Math.Min</span>(x, y)
            <br />
            <br />
            <span
              className={styles.comment}
            >{`// The Math.Min(x, y) method can be used `}</span>
            <br />
            <span
              className={styles.comment}
            >{`to find the lowest value of x and y:`}</span>
            <br />
            <span className={styles.builtin}>Example</span>
            <br />
            <br />
            <span className={styles.variable}>Math.Min</span>(5, 10);
          </pre>
        </div>
        <Section
          header={"Math.Sqrt(x)"}
          content={`The Math.Sqrt(x) method returns the square root of x:`}
          color={"greenBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.variable}>Math.Sqrt</span>(x)
            <br />
            <br />
            <span
              className={styles.comment}
            >{`// The Math.Sqrt(x) method returns `}</span>
            <br />
            <span className={styles.comment}>{`the square root of x:`}</span>
            <br />
            <span className={styles.builtin}>Example</span>
            <br />
            <br />
            <span className={styles.variable}>Math.Sqrt</span>(64);
          </pre>
        </div>
        <Section
          header={"Math.Abs(x)"}
          content={`The Math.Abs(x) method returns the absolute (positive) value of x:`}
          color={"blueBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.variable}>Math.Abs</span>(x)
            <br />
            <br />
            <span
              className={styles.comment}
            >{`// The Math.Abs(x) method returns `}</span>
            <br />
            <span
              className={styles.comment}
            >{`the absolute (positive) value of x:`}</span>
            <br />
            <span className={styles.builtin}>Example</span>
            <br />
            <br />
            <span className={styles.variable}>Math.Abs</span>(-4.7);
          </pre>
        </div>
        <Section
          header={"Math.Round()"}
          content={`Math.Round() rounds a number to the nearest whole number:`}
          color={"purpleBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.variable}>Math.Round</span>(x)
            <br />
            <br />
            <span
              className={styles.comment}
            >{`// Math.Round() rounds a number `}</span>
            <br />
            <span
              className={styles.comment}
            >{`to the nearest whole number:`}</span>
            <br />
            <span className={styles.builtin}>Example</span>
            <br />
            <br />
            <span className={styles.variable}>Math.Round</span>(9.99);
          </pre>
        </div>
      </div>
    </main>
  );
}
