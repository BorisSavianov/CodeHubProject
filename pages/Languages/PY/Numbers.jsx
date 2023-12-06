import styles from "../../../styles/Python.module.css";
import Section from "../../../components/Section";
import Navbar from "../../../components/Navbar";

export default function PythonNumbers() {
  return (
    <main className="container">
      <Navbar></Navbar>
      <div className={`${styles.varContent}  ${styles.marginB}`}>
        <Section
          header={"Числа в Python"}
          content={`В Python има два типа числа:`}
          color={"redBG"}
        />
        <div className={styles.content}>
          <div className={`${styles.varCode} `}>
            <p>
              <span className={styles.keyword}>int</span>
              <br />
              <span className={styles.keyword}>float</span>
            </p>
          </div>
          <p>
            Променливите от числов тип се създават, когато им присвоите
            стойност:
          </p>
          <div className={`${styles.varCode}`}>
            <pre className={styles.codeText}>
              <span className={styles.keyword}># Пример</span>
              <br />
              <span className={styles.variable}>x</span> ={" "}
              <span className={styles.number}>1</span>{" "}
              <span className={styles.comment}># int</span>
              <br />
              <span className={styles.variable}>y</span> ={" "}
              <span className={styles.number}>2.8</span>{" "}
              <span className={styles.comment}># float</span>
            </pre>
          </div>
          <p>
            За да проверите типа на даден обект в Python, използвайте функцията
            <span className={styles.builtin}> type()</span>:
          </p>
          <div className={`${styles.varCode} ${styles.marginB}`}>
            <pre className={styles.codeText}>
              <span className={styles.keyword}># Пример</span>
              <br />
              <span className={styles.builtin}>print</span>(
              <span className={styles.builtin}>type</span>(
              <span className={styles.variable}>x</span>))
              <br />
              <span className={styles.builtin}>print</span>(
              <span className={styles.builtin}>type</span>(
              <span className={styles.variable}>y</span>))
              <br />
            </pre>
          </div>
          <Section header={"Int"} color={"purpleBG"} />
          <div className={`${styles.varCode}  ${styles.marginB}`}>
            <pre className={styles.codeText}>
              <span className={styles.keyword}># Цели числа:</span>
              <br />
              <span className={styles.variable}>x</span> ={" "}
              <span className={styles.number}>1</span>
              <br />
              <span className={styles.variable}>y</span> ={" "}
              <span className={styles.number}>35656222554887711</span>
              <br />
              <span className={styles.variable}>z</span> ={" "}
              <span className={styles.number}>-3255522</span>
              <br />
              <span className={styles.builtin}>print</span>(
              <span className={styles.builtin}>type</span>(
              <span className={styles.variable}>x</span>))
              <br />
              <span className={styles.builtin}>print</span>(
              <span className={styles.builtin}>type</span>(
              <span className={styles.variable}>y</span>))
              <br />
              <span className={styles.builtin}>print</span>(
              <span className={styles.builtin}>type</span>(
              <span className={styles.variable}>z</span>))
            </pre>
          </div>
          <Section header={"Float"} color={"blueBG"} />
          <div className={`${styles.varCode}  ${styles.marginB}`}>
            <pre className={styles.codeText}>
              <span className={styles.keyword}># Дробни числа:</span>
              <br />
              <span className={styles.variable}>x</span> ={" "}
              <span className={styles.number}>1.10</span>
              <br />
              <span className={styles.variable}>y</span> ={" "}
              <span className={styles.number}>1.0</span>
              <br />
              <span className={styles.variable}>z</span> ={" "}
              <span className={styles.number}>-35.59</span>
              <br />
              <span className={styles.builtin}>print</span>(
              <span className={styles.builtin}>type</span>(
              <span className={styles.variable}>x</span>))
              <br />
              <span className={styles.builtin}>print</span>(
              <span className={styles.builtin}>type</span>(
              <span className={styles.variable}>y</span>))
              <br />
              <span className={styles.builtin}>print</span>(
              <span className={styles.builtin}>type</span>(
              <span className={styles.variable}>z</span>))
            </pre>
          </div>
          <Section header={"Конверсия на типове"} color={"pinkBG"} />
          <div className={`${styles.varCode}  ${styles.marginB}`}>
            <pre className={styles.codeText}>
              <span className={styles.keyword}># Пример</span>
              <br />
              <span className={styles.variable}>x</span> ={" "}
              <span className={styles.number}>1</span>{" "}
              <span className={styles.comment}># int</span>
              <br />
              <span className={styles.variable}>y</span> ={" "}
              <span className={styles.number}>2.8</span>{" "}
              <span className={styles.comment}># float</span>
              <br />
              <br />
              <span className={styles.keyword}>
                # преобразуване от int към float:
              </span>
              <br />
              <span className={styles.variable}>a</span> ={" "}
              <span className={styles.builtin}>float</span>(
              <span className={styles.variable}>x</span>)
              <br />
              <br />
              <span className={styles.keyword}>
                # преобразуване от float към int:
              </span>
              <br />
              <span className={styles.variable}>b</span> ={" "}
              <span className={styles.builtin}>int</span>(
              <span className={styles.variable}>y</span>)
              <br />
              <br />
              <span className={styles.builtin}>print</span>(
              <span className={styles.variable}>a</span>)
              <span className={styles.builtin}> print</span>(
              <span className={styles.variable}>b</span>)
              <br />
              <br />
              <span className={styles.builtin}>print</span>(
              <span className={styles.builtin}>type</span>(
              <span className={styles.variable}>a</span>))
              <span className={styles.builtin}> print</span>(
              <span className={styles.builtin}>type</span>(
              <span className={styles.variable}>b</span>))
            </pre>
          </div>
          <Section header={"Случайно число"} color={"greenBG"} />
          <div className={`${styles.varCode}  ${styles.marginB}`}>
            <pre className={styles.codeText}>
              <span className={styles.keyword}>
                # Python има вграден модул
                <br /> наречен random, който може
                <br />
                да се използва за
                <br /> генериране на случайни числа:
              </span>
              <br />
              <br />
              <span className={styles.keyword}># Пример</span>
              <br />
              <span className={styles.comment}>
                # Импортиране на модула random
                <br /> и извеждане на случайно число
                <br />
                между 1 и 9:
              </span>
              <br />
              <span className={styles.builtin}>import</span> random
              <br />
              <span className={styles.builtin}>print</span>(
              <span className={styles.builtin}>random</span>.
              <span className={styles.builtin}>randrange</span>(
              <span className={styles.number}>1</span>,{" "}
              <span className={styles.number}>10</span>))
            </pre>
          </div>
        </div>
      </div>
    </main>
  );
}
