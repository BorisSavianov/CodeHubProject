import styles from "../../../styles/C#.module.css";
import Section from "../../../components/Section";
import Navbar from "../../../components/Navbar";

export default function CSharpArrays() {
  return (
    <main>
      <Navbar></Navbar>
      <div className={`${styles.varContent}`}>
        <Section
          header={"Създаване на масив"}
          content={`Масивите се използват за съхранение на множество стойности в една променлива, вместо да се декларират отделни променливи за всяка стойност.`}
          color={"redBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.comment}>// За деклариране на масив:</span>
            <br />
            <span className={styles.variable}>string[] cars;</span>
            <br />
            <br />
            <span className={styles.comment}>
              // Деклариране и инициализиране на масив:
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
          header={"Достъп до елементите на масива"}
          content={`Достъпът до елемент на масива става, като се обръщате към индексния номер.`}
          color={"purpleBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.comment}>
              // Достъп до елемент на масива:
            </span>
            <br />
            <span className={styles.variable}>Console.WriteLine</span>(
            <span className={styles.variable}>cars</span>[
            <span className={styles.number}>0</span>]);
            <br />
            <span className={styles.comment}>// Извежда Volvo</span>
          </pre>
        </div>
        <Section
          header={"Промяна на елемент на масива"}
          content={`За промяна на стойността на конкретен елемент се използва индексният номер.`}
          color={"greenBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.comment}>
              // Промяна на елемент на масива:
            </span>
            <br />
            <span className={styles.variable}>cars</span>[
            <span className={styles.number}>0</span>] =
            <span className={styles.string}>"Opel"</span>;
            <br />
            <br />
            <span className={styles.comment}>
              // Сега извежда Opel вместо Volvo
            </span>
          </pre>
        </div>
        <Section
          header={"Дължина на масива"}
          content={`За да разберете колко елемента има масивът, използвайте свойството Length.`}
          color={"blueBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.comment}>
              // Получаване на дължината на масива:
            </span>
            <br />
            <span className={styles.variable}>Console.WriteLine</span>(
            <span className={styles.variable}>cars.Length</span>);
            <br />
            <span className={styles.comment}>// Извежда 4</span>
          </pre>
        </div>
        <div className={`${styles.varContent}`}>
          <Section
            header={"Цикъл през масива"}
            content={`Можете да циклирате през елементите на масива с for цикъла и да използвате свойството Length, за да укажете колко пъти трябва да се изпълни цикълът.`}
            color={"redBG"}
          />
          <div className={`${styles.varCode} ${styles.marginB}`}>
            <pre className={styles.codeText}>
              <span className={styles.comment}>
                // Цикъл през масив с for цикъл:
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
            header={"Цикълът foreach"}
            content={`Съществува също така цикълът foreach, който се използва изключително за циклиране през елементи в масив.`}
            color={"purpleBG"}
          />
          <div className={`${styles.varCode} ${styles.marginB}`}>
            <pre className={styles.codeText}>
              <span className={styles.comment}>
                // Цикъл през масив с foreach цикъл:
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
