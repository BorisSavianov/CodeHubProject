import styles from "../../../styles/Python.module.css";
import Section from "../../../components/Section";
import Navbar from "../../../components/Navbar";

export default function Operators() {
  return (
    <main className="container">
      <Navbar />
      <div
        className={`${styles.varContent} ${styles.marginB} ${styles.content}`}
      >
        <Section
          header={"Аритметични оператори в Python"}
          content={`Аритметичните оператори се използват с числени стойности за извършване на обичайни математически операции:`}
          color={"blueBG"}
        />
        <table className={`${styles.table}  ${styles.marginB}`}>
          <tr>
            <th className={styles.varCode}>Оператор</th>
            <th className={styles.varCode}>Име</th>
            <th className={styles.varCode}>Пример</th>
          </tr>
          <tr>
            <td className={styles.varCode}>+</td>
            <td className={styles.varCode}>Събиране</td>
            <td className={styles.varCode}>x + y</td>
          </tr>
          <tr>
            <td className={styles.varCode}>-</td>
            <td className={styles.varCode}>Изваждане</td>
            <td className={styles.varCode}>x - y</td>
          </tr>
          <tr>
            <td className={styles.varCode}>*</td>
            <td className={styles.varCode}>Умножение</td>
            <td className={styles.varCode}>x * y</td>
          </tr>
          <tr>
            <td className={styles.varCode}>/</td>
            <td className={styles.varCode}>Деление</td>
            <td className={styles.varCode}>x / y</td>
          </tr>
          <tr>
            <td className={styles.varCode}>%</td>
            <td className={styles.varCode}>Модул</td>
            <td className={styles.varCode}>x % y</td>
          </tr>
          <tr>
            <td className={styles.varCode}>**</td>
            <td className={styles.varCode}>Степен</td>
            <td className={styles.varCode}>x ** y</td>
          </tr>
          <tr>
            <td className={styles.varCode}>//</td>
            <td className={styles.varCode}>Целочислено деление</td>
            <td className={styles.varCode}>x // y</td>
          </tr>
        </table>
        <Section
          header={"Оператори за присвояване в Python"}
          content={`Операторите за присвояване се използват за присвояване на стойности на променливи:`}
          color={"pinkBG"}
        />
        <table className={`${styles.table}  ${styles.marginB}`}>
          <tr>
            <th className={styles.varCode}>Оператор</th>
            <th className={styles.varCode}>Пример</th>
            <th className={styles.varCode}>Също като</th>
          </tr>
          <tr>
            <td className={styles.varCode}>=</td>
            <td className={styles.varCode}>x = 5</td>
            <td className={styles.varCode}>x = 5</td>
          </tr>
          <tr>
            <td className={styles.varCode}>+=</td>
            <td className={styles.varCode}>x += 3</td>
            <td className={styles.varCode}>x = x + 3</td>
          </tr>
          <tr>
            <td className={styles.varCode}>-=</td>
            <td className={styles.varCode}>x -= 3</td>
            <td className={styles.varCode}>x = x - 3</td>
          </tr>
          <tr>
            <td className={styles.varCode}>*=</td>
            <td className={styles.varCode}>x *= 3</td>
            <td className={styles.varCode}>x = x * 3</td>
          </tr>
          <tr>
            <td className={styles.varCode}>/=</td>
            <td className={styles.varCode}>x /= 3</td>
            <td className={styles.varCode}>x = x / 3</td>
          </tr>
          <tr>
            <td className={styles.varCode}>%=</td>
            <td className={styles.varCode}>x %= 3</td>
            <td className={styles.varCode}>x = x % 3</td>
          </tr>
          <tr>
            <td className={styles.varCode}>//=</td>
            <td className={styles.varCode}>x //= 3</td>
            <td className={styles.varCode}>x = x // 3</td>
          </tr>
          <tr>
            <td className={styles.varCode}>**=</td>
            <td className={styles.varCode}>x **= 3</td>
            <td className={styles.varCode}>x = x ** 3</td>
          </tr>
          <tr>
            <td className={styles.varCode}>&=</td>
            <td className={styles.varCode}>x &= 3</td>
            <td className={styles.varCode}>x = x & 3</td>
          </tr>
          <tr>
            <td className={styles.varCode}>|=</td>
            <td className={styles.varCode}>x |= 3</td>
            <td className={styles.varCode}>x = x | 3</td>
          </tr>
          <tr>
            <td className={styles.varCode}>^=</td>
            <td className={styles.varCode}>x ^= 3</td>
            <td className={styles.varCode}>x = x ^ 3</td>
          </tr>
          <tr>
            <td className={styles.varCode}>{`>=`}</td>
            <td className={styles.varCode}>{`x >>= 3`}</td>
            <td className={styles.varCode}>{`x = x >> 3`}</td>
          </tr>
          <tr>
            <td className={styles.varCode}>&lt;&lt;=</td>
            <td className={styles.varCode}>x &lt;&lt;= 3</td>
            <td className={styles.varCode}>x = x &lt;&lt; 3</td>
          </tr>
        </table>
        <Section
          header={"Оператори за сравнение в Python"}
          content={`Операторите за сравнение се използват за сравнение на две стойности:`}
          color={"redBG"}
        />
        <table className={`${styles.table}  ${styles.marginB}`}>
          <tr>
            <th className={styles.varCode}>Оператор</th>
            <th className={styles.varCode}>Име</th>
            <th className={styles.varCode}>Пример</th>
          </tr>
          <tr>
            <td className={styles.varCode}>&#61;&#61;</td>
            <td className={styles.varCode}>Равно</td>
            <td className={styles.varCode}>x == y</td>
          </tr>
          <tr>
            <td className={styles.varCode}>!=</td>
            <td className={styles.varCode}>Различно</td>
            <td className={styles.varCode}>x != y</td>
          </tr>
          <tr>
            <td className={styles.varCode}>&gt;</td>
            <td className={styles.varCode}>По-голямо от</td>
            <td className={styles.varCode}>{`x > y`}</td>
          </tr>
          <tr>
            <td className={styles.varCode}>&lt;</td>
            <td className={styles.varCode}>По-малко от</td>
            <td className={styles.varCode}>{`x < y`}</td>
          </tr>
          <tr>
            <td className={styles.varCode}>&gt;=</td>
            <td className={styles.varCode}>По-голямо или равно</td>
            <td className={styles.varCode}>{`x >= y`}</td>
          </tr>
          <tr>
            <td className={styles.varCode}>&lt;=</td>
            <td className={styles.varCode}>По-малко или равно</td>
            <td className={styles.varCode}>{`x <= y`}</td>
          </tr>
        </table>
        <Section
          header={"Логически оператори в Python"}
          content={`Логическите оператори се използват за комбиниране на условни изрази:`}
          color={"greenBG"}
        />
        <table className={`${styles.table}  ${styles.marginB}`}>
          <tr>
            <th className={styles.varCode}>Оператор</th>
            <th className={styles.varCode}>Описание</th>
            <th className={styles.varCode}>Пример</th>
          </tr>
          <tr>
            <td className={styles.varCode}>and</td>
            <td className={styles.varCode}>
              Връща True, ако и двете изказвания са истина
            </td>
            <td className={styles.varCode}>{`x < 5 and x < 10`}</td>
          </tr>
          <tr>
            <td className={styles.varCode}>or</td>
            <td className={styles.varCode}>
              Връща True, ако поне едно от изказванията е истина
            </td>
            <td className={styles.varCode}>{`x < 5 or x < 4`}</td>
          </tr>
          <tr>
            <td className={styles.varCode}>not</td>
            <td className={styles.varCode}>
              Обръща резултата, връща False, ако резултатът е истина
            </td>
            <td className={styles.varCode}>{`not(x < 5 and x < 10)`}</td>
          </tr>
        </table>
        <Section
          header={"Оператори за Идентичност в Python"}
          content={`Операторите за идентичност се използват за сравняване на обекти, не дали те са равни, а дали са фактически един и същ обект със същата паметова локация:`}
          color={"purpleBG"}
        />
        <table className={`${styles.table}  ${styles.marginB}`}>
          <tr>
            <th className={styles.varCode}>Оператор</th>
            <th className={styles.varCode}>Описание</th>
            <th className={styles.varCode}>Пример</th>
          </tr>
          <tr>
            <td className={styles.varCode}>is</td>
            <td className={styles.varCode}>
              Връща True, ако и двете променливи са един и същ обект
            </td>
            <td className={styles.varCode}>x is y</td>
          </tr>
          <tr>
            <td className={styles.varCode}>is not</td>
            <td className={styles.varCode}>
              Връща True, ако и двете променливи не са един и същ обект
            </td>
            <td className={styles.varCode}>x is not y</td>
          </tr>
        </table>
        <Section
          header={"Оператори за Членство в Python"}
          content={`Операторите за членство се използват за тестване дали последователност е представена в обект:`}
          color={"blueBG"}
        />
        <table className={`${styles.table}  ${styles.marginB}`}>
          <tr>
            <th className={styles.varCode}>Оператор</th>
            <th className={styles.varCode}>Описание</th>
            <th className={styles.varCode}>Пример</th>
          </tr>
          <tr>
            <td className={styles.varCode}>in</td>
            <td className={styles.varCode}>
              Връща True, ако последователност със зададената стойност е
              присъства в обекта
            </td>
            <td className={styles.varCode}>x in y</td>
          </tr>
          <tr>
            <td className={styles.varCode}>not in</td>
            <td className={styles.varCode}>
              Връща True, ако последователност със зададената стойност не е
              присъства в обекта
            </td>
            <td className={styles.varCode}>x not in y</td>
          </tr>
        </table>
      </div>
    </main>
  );
}
