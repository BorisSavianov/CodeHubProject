import styles from "../../../styles/Python.module.css";
import Section from "../../../components/Section";
import Navbar from "../../../components/Navbar";

export default function PythonConditions() {
  return (
    <main className="container">
      <Navbar></Navbar>
      <div className={`${styles.varContent}`}>
        <Section
          header={"Условия и оператори за сравнение"}
          content={`Python поддържа стандартни логически условия от математиката:`}
          color={"redBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            Равно: a == b
            <br />
            Неравно: a != b
            <br />
            По-малко от: a {"<"} b
            <br />
            По-малко или равно: a {"<="} b
            <br />
            По-голямо от: a {">"} b
            <br />
            По-голямо или равно: a {">="} b
          </pre>
        </div>
        <Section
          header={"Използване на условия и оператори в if-заявки"}
          content={`Условията могат да се използват в "if заявки" и цикли.`}
          color={"purpleBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.variable}>a</span> ={" "}
            <span className={styles.number}>33</span>
            <br />
            <span className={styles.variable}>b</span> ={" "}
            <span className={styles.number}>200</span>
            <br />
            <span className={styles.builtin}>if</span>{" "}
            <span className={styles.variable}>b</span>{" "}
            <span className={styles.builtin}>{">"}</span>{" "}
            <span className={styles.variable}>a</span>:
            <br />
            &nbsp;&nbsp;&nbsp;
            <span className={styles.builtin}>print</span>(
            <span className={styles.string}>"b е по-голямо от a"</span>)
          </pre>
        </div>
        <Section
          header={"Отстъпи (Indentation)"}
          content={`Python използва отстъпи (интервали в началото на реда), за да дефинира обхвата на кода.`}
          color={"greenBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.builtin}>if</span>{" "}
            <span className={styles.variable}>b</span>{" "}
            <span className={styles.builtin}>{">"}</span>{" "}
            <span className={styles.variable}>a</span>:
            <br />
            &nbsp;&nbsp;&nbsp;<span className={styles.builtin}>print</span>(
            <span className={styles.string}>"b е по-голямо от a"</span>)
            <br />
            <span className={styles.builtin}>else</span>:
            <br />
            &nbsp;&nbsp;&nbsp;
            <span className={styles.builtin}>print</span>(
            <span className={styles.string}>"b не е по-голямо от a"</span>)
          </pre>
        </div>
        <Section
          header={"Оператори elif и else"}
          content={`Ключовите думи elif и else се използват за различни сценарии.`}
          color={"purpleBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.builtin}>if</span>{" "}
            <span className={styles.variable}>b</span>{" "}
            <span className={styles.builtin}>{">"}</span>{" "}
            <span className={styles.variable}>a</span>:
            <br />
            &nbsp;&nbsp;&nbsp;<span className={styles.builtin}>print</span>(
            <span className={styles.string}>"b е по-голямо от a"</span>)
            <br />
            <span className={styles.builtin}>elif</span>{" "}
            <span className={styles.variable}>a</span>{" "}
            <span className={styles.builtin}>==</span>{" "}
            <span className={styles.variable}>b</span>:
            <br />
            &nbsp;&nbsp;&nbsp;<span className={styles.builtin}>print</span>(
            <span className={styles.string}>"a и b са равни"</span>)
            <br />
            <span className={styles.builtin}>else</span>:
            <br />
            &nbsp;&nbsp;&nbsp;
            <span className={styles.builtin}>print</span>(
            <span className={styles.string}>"a е по-голямо от b"</span>)
          </pre>
        </div>
        <Section
          header={"Оператори if със само един ред"}
          content={`Ако имате само една заявка за изпълнение, можете да я поставите на същия ред като if заявката.`}
          color={"greenBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.builtin}>if</span>{" "}
            <span className={styles.variable}>a</span>{" "}
            <span className={styles.builtin}>&gt;</span>{" "}
            <span className={styles.variable}>b</span>:{" "}
            <span className={styles.builtin}>print</span>(
            <span className={styles.string}>"a е по-голямо от b"</span>)
          </pre>
        </div>
        <Section
          header={"Оператор if ... else на един ред"}
          content={`Можете да поставите if и else на един и същ ред, ако имате само по една заявка за изпълнение за всеки от тях.`}
          color={"purpleBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.variable}>a</span> ={" "}
            <span className={styles.number}>2</span>
            <br />
            <span className={styles.variable}>b</span> ={" "}
            <span className={styles.number}>330</span>
            <br />
            <span className={styles.builtin}>print</span>(
            <span className={styles.string}>"A"</span>){" "}
            <span className={styles.builtin}>if</span>{" "}
            <span className={styles.variable}>a</span>{" "}
            <span className={styles.builtin}>&gt;</span>{" "}
            <span className={styles.variable}>b</span>{" "}
            <span className={styles.builtin}>else</span>{" "}
            <span className={styles.builtin}>print</span>(
            <span className={styles.string}>"B"</span>)
          </pre>
        </div>
        <Section
          header={"Тернарни оператори и изрази"}
          content={`Тази техника се нарича тернарни оператори или условни изрази.`}
          color={"greenBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.variable}>a</span> ={" "}
            <span className={styles.number}>330</span>
            <br />
            <span className={styles.variable}>b</span> ={" "}
            <span className={styles.number}>330</span>
            <br />
            <span className={styles.builtin}>print</span>(
            <span className={styles.string}>"A"</span>){" "}
            <span className={styles.builtin}>if</span>{" "}
            <span className={styles.variable}>a</span>{" "}
            <span className={styles.builtin}>&gt;</span>{" "}
            <span className={styles.variable}>b</span>{" "}
            <span className={styles.builtin}>else</span>{" "}
            <span className={styles.builtin}>print</span>(
            <span className={styles.string}>"="</span>){" "}
            <span className={styles.builtin}>if</span>{" "}
            <span className={styles.variable}>a</span>{" "}
            <span className={styles.builtin}>==</span>{" "}
            <span className={styles.variable}>b</span>{" "}
            <span className={styles.builtin}>else</span>{" "}
            <span className={styles.builtin}>print</span>(
            <span className={styles.string}>"B"</span>)
          </pre>
        </div>
        <Section
          header={"Логически оператори: and, or, not"}
          content={`Логическите оператори and, or и not се използват за комбиниране или инвертиране на условни заявки.`}
          color={"purpleBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.variable}>a</span> ={" "}
            <span className={styles.number}>200</span>
            <br />
            <span className={styles.variable}>b</span> ={" "}
            <span className={styles.number}>33</span>
            <br />
            <span className={styles.variable}>c</span> ={" "}
            <span className={styles.number}>500</span>
            <br />
            <span className={styles.builtin}>if</span>{" "}
            <span className={styles.variable}>a</span>{" "}
            <span className={styles.builtin}>{">"}</span>{" "}
            <span className={styles.variable}>b</span>{" "}
            <span className={styles.builtin}>and</span>{" "}
            <span className={styles.variable}>c</span>{" "}
            <span className={styles.builtin}>{">"}</span>{" "}
            <span className={styles.variable}>a</span>:
            <br />
            &nbsp;&nbsp;&nbsp;
            <span className={styles.builtin}>print</span>(
            <span className={styles.string}>"И двете условия са вярни"</span>)
          </pre>
        </div>
        <Section
          header={"Логически оператор: or"}
          content={`Логическият оператор or се използва за комбиниране на условия.`}
          color={"greenBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.variable}>a</span> ={" "}
            <span className={styles.number}>200</span>
            <br />
            <span className={styles.variable}>b</span> ={" "}
            <span className={styles.number}>33</span>
            <br />
            <span className={styles.variable}>c</span> ={" "}
            <span className={styles.number}>500</span>
            <br />
            <span className={styles.builtin}>if</span>{" "}
            <span className={styles.variable}>a</span>{" "}
            <span className={styles.builtin}>{">"}</span>{" "}
            <span className={styles.variable}>b</span>{" "}
            <span className={styles.builtin}>or</span>{" "}
            <span className={styles.variable}>a</span>{" "}
            <span className={styles.builtin}>{">"}</span>{" "}
            <span className={styles.variable}>c</span>:
            <br />
            &nbsp;&nbsp;&nbsp;
            <span className={styles.builtin}>print</span>(
            <span className={styles.string}>
              "Поне едно от условията е вярно"
            </span>
            )
          </pre>
        </div>
        <Section
          header={"Логически оператор: not"}
          content={`Логическият оператор not се използва за инвертиране на резултата от условие.`}
          color={"purpleBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.variable}>a</span> ={" "}
            <span className={styles.number}>33</span>
            <br />
            <span className={styles.variable}>b</span> ={" "}
            <span className={styles.number}>200</span>
            <br />
            <span className={styles.builtin}>if not</span>{" "}
            <span className={styles.variable}>a</span>{" "}
            <span className={styles.builtin}>{">"}</span>{" "}
            <span className={styles.variable}>b</span>:
            <br />
            &nbsp;&nbsp;&nbsp;
            <span className={styles.builtin}>print</span>(
            <span className={styles.string}>"a не е по-голямо от b"</span>)
          </pre>
        </div>
        <div className={`${styles.varContent}`}>
          <Section
            header={"Влагани if-заявки (Nested If)"}
            content={`Можете да имате if-заявки вътре в if-заявки, което се нарича влагане на if-заявки.`}
            color={"purpleBG"}
          />
          <div className={`${styles.varCode} ${styles.marginB}`}>
            <pre className={styles.codeText}>
              <span className={styles.variable}>x</span> ={" "}
              <span className={styles.number}>41</span>
              <br />
              <span className={styles.builtin}>if</span>{" "}
              <span className={styles.variable}>x</span>{" "}
              <span className={styles.builtin}>{">"}</span>{" "}
              <span className={styles.number}>10</span>:
              <br />
              &nbsp;&nbsp;&nbsp;
              <span className={styles.builtin}>print</span>(
              <span className={styles.string}>"Над десет,"</span>)
              <br />
              &nbsp;&nbsp;&nbsp;
              <span className={styles.builtin}>if</span>{" "}
              <span className={styles.variable}>x</span>{" "}
              <span className={styles.builtin}>{">"}</span>{" "}
              <span className={styles.number}>20</span>:
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span className={styles.builtin}>print</span>(
              <span className={styles.string}>"и също над 20!"</span>)
              <br />
              &nbsp;&nbsp;&nbsp;
              <span className={styles.builtin}>else</span>:
              <br />
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <span className={styles.builtin}>print</span>(
              <span className={styles.string}>"но не над 20."</span>)
            </pre>
          </div>
        </div>
      </div>
    </main>
  );
}
