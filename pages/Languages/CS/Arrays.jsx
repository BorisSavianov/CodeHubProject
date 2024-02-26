import styles from "../../../styles/C#.module.css";
import Section from "../../../components/Section";
import Navbar from "../../../components/Navbar";

export default function CSharpArrays() {
  return (
    <main>
      <Navbar></Navbar>
      <div className={`${styles.varContent}`}>
        <Section
          header={"Create an Array"}
          content={`Arrays are used to store multiple values in a single variable, instead of declaring separate variables for each value.`}
          color={"redBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.comment}>// To declare an array:</span>
            <br />
            <span className={styles.variable}>string[] cars;</span>
            <br />
            <br />
            <span className={styles.comment}>
              // Declare and initialize an array:
            </span>
            <br />
            <span className={styles.variable}>string[] cars</span> = {"{"}
            <span className={styles.string}>"Volvo"</span>,
            <span className={styles.string}>"BMW"</span>,
            <span className={styles.string}>"Ford"</span>,
            <span className={styles.string}>"Mazda"</span>
            {"}"};
          </pre>
        </div>
        <Section
          header={"Access the Elements of an Array"}
          content={`You access an array element by referring to the index number.`}
          color={"purpleBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.comment}>// Access an array element:</span>
            <br />
            <span className={styles.variable}>Console.WriteLine</span>(
            <span className={styles.variable}>cars</span>[
            <span className={styles.number}>0</span>]);
            <br />
            <span className={styles.comment}>// Outputs Volvo</span>
          </pre>
        </div>
        <Section
          header={"Change an Array Element"}
          content={`To change the value of a specific element, refer to the index number.`}
          color={"greenBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.comment}>// Change an array element:</span>
            <br />
            <span className={styles.variable}>cars</span>[
            <span className={styles.number}>0</span>] =
            <span className={styles.string}>"Opel"</span>;
            <br />
            <br />
            <span className={styles.comment}>
              // Now outputs Opel instead of Volvo
            </span>
          </pre>
        </div>
        <Section
          header={"Array Length"}
          content={`To find out how many elements an array has, use the Length property.`}
          color={"blueBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.comment}>
              // Get the length of the array:
            </span>
            <br />
            <span className={styles.variable}>Console.WriteLine</span>(
            <span className={styles.variable}>cars.Length</span>);
            <br />
            <span className={styles.comment}>// Outputs 4</span>
          </pre>
        </div>
        <div className={`${styles.varContent}`}>
          <Section
            header={"Loop Through an Array"}
            content={`You can loop through the array elements with the for loop, and use the Length property to specify how many times the loop should run.`}
            color={"redBG"}
          />
          <div className={`${styles.varCode} ${styles.marginB}`}>
            <pre className={styles.codeText}>
              <span className={styles.comment}>
                // Loop through an array with for loop:
              </span>
              <br />
              <span className={styles.variable}>string[] cars</span> = {"{"}
              <span className={styles.string}>"Volvo"</span>,
              <span className={styles.string}>"BMW"</span>,
              <span className={styles.string}>"Ford"</span>,
              <span className={styles.string}>"Mazda"</span>
              {"}"};
              <br />
              <span className={styles.builtin}>for</span> (
              <span className={styles.variable}>int i</span> ={" "}
              <span className={styles.number}>0</span>;
              <span className={styles.variable}>i</span> {"<"}{" "}
              <span className={styles.variable}>cars.Length</span>;
              <span className={styles.variable}>i++</span>){"{"}
              <br />
              &nbsp;&nbsp;
              <span className={styles.variable}>Console.WriteLine</span>(
              <span className={styles.variable}>cars</span>[
              <span className={styles.variable}>i</span>]);
              <br />
              {"}"}
            </pre>
          </div>
          <Section
            header={"The foreach Loop"}
            content={`There is also a foreach loop, which is used exclusively to loop through elements in an array.`}
            color={"purpleBG"}
          />
          <div className={`${styles.varCode} ${styles.marginB}`}>
            <pre className={styles.codeText}>
              <span className={styles.comment}>
                // Loop through an array with foreach loop:
              </span>
              <br />
              <span className={styles.variable}>string[] cars</span> = {"{"}
              <span className={styles.string}>"Volvo"</span>,
              <span className={styles.string}>"BMW"</span>,
              <span className={styles.string}>"Ford"</span>,
              <span className={styles.string}>"Mazda"</span>
              {"}"};
              <br />
              <span className={styles.builtin}>foreach</span> (
              <span className={styles.variable}>string car</span> in{" "}
              <span className={styles.variable}>cars</span>){"{"}
              <br />
              &nbsp;&nbsp;
              <span className={styles.variable}>Console.WriteLine</span>(
              <span className={styles.variable}>car</span>);
              <br />
              {"}"}
            </pre>
          </div>
        </div>
      </div>
    </main>
  );
}
