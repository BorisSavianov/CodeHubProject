import styles from "../../../styles/Python.module.css";
import Section from "../../../components/Section";
import Navbar from "../../../components/Navbar";

export default function PythonLists() {
  return (
    <main className="container">
      <Navbar></Navbar>
      <div className={`${styles.varContent}`}>
        <Section
          header={"Списъци"}
          content={`Списъците се използват за съхранение на множество елементи в една променлива. Те са един от 4-те вградени типове данни в Python, заедно с Tuple, Set и Dictionary.`}
          color={"redBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.comment}># Създайте списък:</span>
            <br />
            <span className={styles.variable}>thislist</span> = [
            <span className={styles.string}>"apple"</span>,
            <span className={styles.string}>"banana"</span>,
            <span className={styles.string}>"cherry"</span>]
            <br />
            <span className={styles.builtin}>print</span>(
            <span className={styles.variable}>thislist</span>)
          </pre>
        </div>
        <Section
          header={"Елементи на списъка"}
          content={`Елементите на списъка са подредени, могат да бъдат променяни и позволяват повторение на стойности. Те се индексират, започвайки от [0].`}
          color={"purpleBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.comment}># Подредени и променяеми:</span>
            <br />
            <span className={styles.variable}>thislist</span>[
            <span className={styles.number}>0</span>] =
            <span className={styles.string}>"orange"</span>
            <br />
            <span className={styles.builtin}>print</span>(
            <span className={styles.variable}>thislist</span>)
            <br />
            <span className={styles.comment}># Позволява повторение:</span>
            <br />
            <span className={styles.variable}>thislist</span>.append(
            <span className={styles.string}>"cherry"</span>)
            <br />
            <span className={styles.builtin}>print</span>(
            <span className={styles.variable}>thislist</span>)
          </pre>
        </div>
        <Section
          header={"Дължина на списъка"}
          content={`За определение на броя на елементите в списък използвайте функцията len().`}
          color={"greenBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.comment}># Дължина на списъка:</span>
            <br />
            <span className={styles.builtin}>print</span>(
            <span className={styles.builtin}>len</span>(
            <span className={styles.variable}>thislist</span>))
          </pre>
        </div>
        <Section
          header={"Елементи на списъка - Типове данни"}
          content={`Елементите на списъка могат да бъдат от всякакъв тип данни, а списъкът може да съдържа различни типове данни.`}
          color={"blueBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.comment}>
              # Елементи на списъка - Типове данни:
            </span>
            <br />
            <span className={styles.variable}>list1</span> = [
            <span className={styles.string}>"apple"</span>,
            <span className={styles.string}>"banana"</span>,
            <span className={styles.string}>"cherry"</span>]
            <br />
            <span className={styles.variable}>list2</span> = [
            <span className={styles.number}>1</span>,{" "}
            <span className={styles.number}>5</span>,
            <span className={styles.number}>7</span>,{" "}
            <span className={styles.number}>9</span>,
            <span className={styles.number}>3</span>]
            <br />
            <span className={styles.variable}>list3</span> = [
            <span className={styles.builtin}>True</span>,{" "}
            <span className={styles.builtin}>False</span>,
            <span className={styles.builtin}>False</span>]
          </pre>
        </div>
        <Section
          header={"Функция за типа"}
          content={`Списъците се определят като обекти с тип данни 'list' в Python.`}
          color={"pinkBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.comment}># Функция за типа:</span>
            <br />
            <span className={styles.variable}>mylist</span> = [
            <span className={styles.string}>"apple"</span>,
            <span className={styles.string}>"banana"</span>,
            <span className={styles.string}>"cherry"</span>]
            <br />
            <span className={styles.builtin}>print</span>(
            <span className={styles.builtin}>type</span>(
            <span className={styles.variable}>mylist</span>))
          </pre>
        </div>
      </div>
    </main>
  );
}
