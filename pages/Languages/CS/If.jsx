import styles from "../../../styles/C#.module.css";
import Section from "../../../components/Section";
import Navbar from "../../../components/Navbar";

export default function CSharpConditions() {
  return (
    <main>
      <Navbar></Navbar>
      <div className={`${styles.varContent}`}>
        <Section
          header={"C# Conditions and If Statements"}
          content={`C# supports the usual logical conditions from mathematics:`}
          color={"redBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            Less than: a {"<"} b
            <br />
            Less than or equal to: a {"<="} b
            <br />
            Greater than: a {">"} b
            <br />
            Greater than or equal to: a {">="} b
            <br />
            Equal to a == b
            <br />
            Not Equal to: a != b
          </pre>
        </div>
        <Section
          header={"The if Statement"}
          content={`Use the if statement to specify a block of C# code to be executed if a condition is True.`}
          color={"purpleBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            if (condition) &#123;
            <br />
            &nbsp;&nbsp;&nbsp;// block of code to be executed <br />
            &nbsp;&nbsp; //if the condition is True
            <br />
            &#125;
          </pre>
        </div>
        <Section
          header={"The else Statement"}
          content={`Use the else statement to specify a block of code to be executed if the condition is False.`}
          color={"greenBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            if (condition) &#123;
            <br />
            &nbsp;&nbsp;&nbsp;// block of code to be executed <br />
            &nbsp;&nbsp; //if the condition is True
            <br />
            &#125; else &#123;
            <br />
            &nbsp;&nbsp;&nbsp;// block of code to be executed <br />
            &nbsp;&nbsp; //if the condition is False
            <br />
            &#125;
          </pre>
        </div>
        <Section
          header={"The else if Statement"}
          content={`Use the else if statement to specify a new condition if the first condition is False.`}
          color={"purpleBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            if (condition1) &#123;
            <br />
            &nbsp;&nbsp;&nbsp;// block of code to be executed <br />
            &nbsp;&nbsp; //if condition1 is True
            <br />
            &#125; else if (condition2) &#123;
            <br />
            &nbsp;&nbsp;&nbsp;// block of code to be executed <br />
            &nbsp;&nbsp; //if the condition1 is false and condition2 <br />
            &nbsp;&nbsp; //is True
            <br />
            &#125; else &#123;
            <br />
            &nbsp;&nbsp;&nbsp;// block of code to be executed <br />
            &nbsp;&nbsp; //if the condition1 is false and condition2 <br />
            &nbsp;&nbsp; //is False
            <br />
            &#125;
          </pre>
        </div>
      </div>
    </main>
  );
}
