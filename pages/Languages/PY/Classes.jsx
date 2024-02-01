import styles from "../../../styles/Python.module.css";
import Section from "../../../components/Section";
import Navbar from "../../../components/Navbar";

export default function PythonClasses() {
  return (
    <main>
      <Navbar></Navbar>
      <div className={`${styles.varContent}`}>
        <Section
          header={"Класове/Обекти в Python"}
          content={`Python е обектно-ориентиран език за програмиране. Почти всичко в Python е обект със свои свойства и методи. Класът е като конструктор на обект или "схема" за създаване на обекти.`}
          color={"redBG"}
        />
        <div className={styles.marginB}></div>
        <Section
          header={"Създаване на клас"}
          content={`За създаване на клас използвайте ключовата дума class. Пример:`}
          color={"purpleBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.keyword}>class</span> MyClass:
            <br />
            &nbsp;&nbsp;<span className={styles.variable}>x</span> ={" "}
            <span className={styles.number}>5</span>
          </pre>
        </div>
        <Section
          header={"Създаване на обект"}
          content={`Сега можем да използваме класа наречен MyClass, за да създадем обекти. Пример:`}
          color={"greenBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.variable}>p1</span> = MyClass()
            <br />
            <span className={styles.builtin}>print</span>(
            <span className={styles.variable}>p1.x</span>)
          </pre>
        </div>
        <Section
          header={"Функция __init__()"}
          content={`Всички класове имат функция наречена __init__(), която се изпълнява винаги, когато класът се инициира. Пример:`}
          color={"blueBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.keyword}>class</span> Person:
            <br />
            &nbsp;&nbsp;<span className={styles.keyword}>def</span> __init__(
            <span className={styles.variable}>self</span>, name, age):
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className={styles.variable}>self.name</span> = name
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className={styles.variable}>self.age</span> = age
            <br />
            <br />
            <span className={styles.variable}>p1</span> = Person("John", 36)
            <br />
            <span className={styles.builtin}>print</span>(
            <span className={styles.variable}>p1.name</span>)
            <br />
            <span className={styles.builtin}>print</span>(
            <span className={styles.variable}>p1.age</span>)
          </pre>
        </div>
        <Section
          header={"Функция __str__()"}
          content={`Функцията __str__() контролира какво трябва да се върне, когато обектът на класа се представя като низ. Пример:`}
          color={"pinkBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.keyword}>class</span> Person:
            <br />
            &nbsp;&nbsp;<span className={styles.keyword}>def</span> __str__(
            <span className={styles.variable}>self</span>):
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className={styles.builtin}>return</span> f"
            {<span className={styles.variable}>self.name</span>}(
            {<span className={styles.variable}>self.age</span>})"
            <br />
            <br />
            <span className={styles.variable}>p1</span> = Person("John", 36)
            <br />
            <span className={styles.builtin}>print</span>(
            <span className={styles.variable}>p1</span>)
          </pre>
        </div>
        <Section
          header={"Методи на обект"}
          content={`Обектите могат също да съдържат методи. Методите в обектите са функции, които принадлежат на обекта. Пример:`}
          color={"purpleBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.keyword}>class</span> Person:
            <br />
            &nbsp;&nbsp;<span className={styles.keyword}>def</span> myfunc(
            <span className={styles.variable}>self</span>):
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className={styles.builtin}>print</span>(
            <span className={styles.string}>"Здравей, казвам се "</span> +
            <span className={styles.variable}>self.name</span>)
            <br />
            <br />
            <span className={styles.variable}>p1</span> = Person("John", 36)
            <span className={styles.builtin}>p1.myfunc()</span>
          </pre>
        </div>
        <Section
          header={"Промяна на свойства на обект"}
          content={`Можете да променяте свойства на обект. Пример:`}
          color={"greenBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.variable}>p1</span>.
            <span className={styles.variable}>age</span> ={" "}
            <span className={styles.number}>40</span>
          </pre>
        </div>
        <Section
          header={"Изтриване на свойства на обект"}
          content={`Можете да изтривате свойства на обект с ключовата дума del. Пример:`}
          color={"blueBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.keyword}>del</span>{" "}
            <span className={styles.variable}>p1.age</span>
          </pre>
        </div>
        <Section
          header={"Изтриване на обекти"}
          content={`Можете да изтривате обекти с ключовата дума del. Пример:`}
          color={"pinkBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.keyword}>del</span>{" "}
            <span className={styles.variable}>p1</span>
          </pre>
        </div>
      </div>
    </main>
  );
}
