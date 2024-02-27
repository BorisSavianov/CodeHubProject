import styles from "../../../styles/C#.module.css";
import Section from "../../../components/Section";
import Navbar from "../../../components/Navbar";

export default function CSharpConditions() {
  return (
    <main>
      <Navbar></Navbar>
      <div className={`${styles.varContent}`}>
        <Section
          header={"C# Условия и If Изявления"}
          content={`C# поддържа обичайните логически условия от математиката:`}
          color={"redBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            По-малко от: a {"<"} b
            <br />
            По-малко или равно на: a {"<="} b
            <br />
            По-голямо от: a {">"} b
            <br />
            По-голямо или равно на: a {">="} b
            <br />
            Равно на: a == b
            <br />
            Неравно на: a != b
          </pre>
        </div>
        <Section
          header={"Изявлението if"}
          content={`Използвайте изявлението if, за да укажете блок от C# код, който да се изпълни, ако условието е Вярно.`}
          color={"purpleBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            if (условие) &#123;
            <br />
            &nbsp;&nbsp;&nbsp;// блок от код, който ще се изпълни <br />
            &nbsp;&nbsp; //ако условието е Вярно
            <br />
            &#125;
          </pre>
        </div>
        <Section
          header={"Изявлението else"}
          content={`Използвайте изявлението else, за да укажете блок от код, който да се изпълни, ако условието е Грешно.`}
          color={"greenBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            if (условие) &#123;
            <br />
            &nbsp;&nbsp;&nbsp;// блок от код, който ще се изпълни <br />
            &nbsp;&nbsp; //ако условието е Вярно
            <br />
            &#125; else &#123;
            <br />
            &nbsp;&nbsp;&nbsp;// блок от код, който ще се изпълни <br />
            &nbsp;&nbsp; //ако условието е Грешно
            <br />
            &#125;
          </pre>
        </div>
        <Section
          header={"Изявлението else if"}
          content={`Използвайте изявлението else if, за да укажете ново условие, ако първото условие е Грешно.`}
          color={"purpleBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            if (условие1) &#123;
            <br />
            &nbsp;&nbsp;&nbsp;// блок от код, който ще се изпълни <br />
            &nbsp;&nbsp; //ако условие1 е Вярно
            <br />
            &#125; else if (условие2) &#123;
            <br />
            &nbsp;&nbsp;&nbsp;// блок от код, който ще се изпълни <br />
            &nbsp;&nbsp; //ако условие1 е Грешно и условие2 <br />
            &nbsp;&nbsp; //е Вярно
            <br />
            &#125; else &#123;
            <br />
            &nbsp;&nbsp;&nbsp;// блок от код, който ще се изпълни <br />
            &nbsp;&nbsp; //ако условие1 е Грешно и условие2 <br />
            &nbsp;&nbsp; //е Грешно
            <br />
            &#125;
          </pre>
        </div>
      </div>
    </main>
  );
}
