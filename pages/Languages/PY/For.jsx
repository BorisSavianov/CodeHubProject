import React, { useState } from "react";
import axios from "axios";
import styles from "../../../styles/Python.module.css";
import Section from "../../../components/Section";
import Navbar from "../../../components/Navbar";
import { getFirestore, updateDoc, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ToastComponent from "@/components/Toast";
import { useEffect } from "react";

export default function Home() {
  const [userAnswer, setUserAnswer] = useState("");
  const [result, setResult] = useState("");
  const [user, setUser] = useState(null);
  const [xp, setXP] = useState(0);

  useEffect(() => {
    const fetchUserXP = async () => {
      if (user) {
        const firestore = getFirestore();
        const userDocRef = doc(firestore, "users", user.uid);

        try {
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            setXP(userData.xp || 0);
          }
        } catch (error) {
          console.error("Error fetching user XP:", error);
        }
      }
    };

    fetchUserXP();
  }, [user]);

  const handleIncrementXP = async () => {
    const firestore = getFirestore();

    try {
      // Update state
      setXP((prevXP) => prevXP + 1);

      // Get the updated XP value
      const updatedXP = xp + 1;

      // Update Firestore with the correct user UID
      await updateDoc(doc(firestore, "users", user.uid), { xp: updatedXP });

      // Show toast with the updated XP value
      ToastComponent(`Отговорът е правилен!\nИмате ${updatedXP}xp.`, "success");
    } catch (error) {
      console.error("Error updating user XP:", error);
    }
  };

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [user]);

  const handleSubmit = async () => {
    try {
      const sanitizedAnswer = userAnswer.replace(/\n/g, "");

      const response = await axios.post("/api/check", {
        answer: sanitizedAnswer,
      });
      if (response.data.message === "Правилен отговор!") {
        // Increment XP when the answer is correct
        handleIncrementXP();
      }
      setResult(response.data.message);
    } catch (error) {
      console.error(error);
      setResult(`Error: ${error.message}`);
    }
  };

  return (
    <div className="container">
      <Navbar></Navbar>
      <div className={`${styles.varContent}`}>
        <Section
          header={"For Цикли в Python"}
          content={`For цикълът се използва за итериране през последователност (списък, кортеж, речник, множество или низ). Работи повече като метод за итератор в обектно-ориентираното програмиране.`}
          color={"redBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.comment}>
              # Пример: Извеждане на всяко плод в списък с плодове
            </span>
            <br />
            <span className={styles.variable}>fruits</span> ={" "}
            <span className={styles.string}>["apple", "banana", "cherry"]</span>
            <br />
            <span className={styles.builtin}>for</span>{" "}
            <span className={styles.variable}>x</span> in{" "}
            <span className={styles.variable}>fruits</span>:
            <br />
            <span className={styles.codeIndent}>
              <span className={styles.builtin}>print</span>(
              <span className={styles.variable}>x</span>)
            </span>
          </pre>
        </div>
        <Section
          header={"Итериране през низ"}
          content={`Низовете също са обекти, които могат да бъдат итерирани; те съдържат последователност от символи.`}
          color={"purpleBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.comment}>
              # Пример: Итериране през буквите в думата "banana"
            </span>
            <br />
            <span className={styles.builtin}>for</span>{" "}
            <span className={styles.variable}>x</span> in{" "}
            <span className={styles.string}>"banana"</span>:
            <br />
            <span className={styles.codeIndent}>
              <span className={styles.builtin}>print</span>(
              <span className={styles.variable}>x</span>)
            </span>
          </pre>
        </div>
        <Section
          header={"Операторът break"}
          content={`Операторът break спира цикъла, преди да бъде обходен всеки елемент.`}
          color={"greenBG"}
        />
        <div className={styles.varCode}>
          <pre className={styles.codeText}>
            <span className={styles.comment}>
              # Пример: Изход от цикъла, когато x е "banana"
            </span>
            <br />
            <span className={styles.variable}>fruits</span> ={" "}
            <span className={styles.string}>["apple", "banana", "cherry"]</span>
            <br />
            <span className={styles.builtin}>for</span>{" "}
            <span className={styles.variable}>x</span> in{" "}
            <span className={styles.variable}>fruits</span>:
            <br />
            <span className={styles.codeIndent}>
              <span className={styles.builtin}>print</span>(
              <span className={styles.variable}>x</span>)
              <br />
              <span className={styles.builtin}>if</span>{" "}
              <span className={styles.variable}>x</span> =={" "}
              <span className={styles.string}>"banana"</span>:
              <br />
              <span className={styles.codeIndent2}>
                <span className={styles.builtin}>break</span>
              </span>
            </span>
          </pre>
        </div>
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.comment}>
              # Пример: Изход от цикъла, когато x е "banana" (break преди print)
            </span>
            <br />
            <span className={styles.variable}>fruits</span> ={" "}
            <span className={styles.string}>["apple", "banana", "cherry"]</span>
            <br />
            <span className={styles.builtin}>for</span>{" "}
            <span className={styles.variable}>x</span> in{" "}
            <span className={styles.variable}>fruits</span>:
            <br />
            <span className={styles.codeIndent}>
              <span className={styles.builtin}>if</span>{" "}
              <span className={styles.variable}>x</span> =={" "}
              <span className={styles.string}>"banana"</span>:
              <br />
              <span className={styles.codeIndent2}>
                <span className={styles.builtin}>break</span>
              </span>
              <span className={styles.builtin}>print</span>(
              <span className={styles.variable}>x</span>)
            </span>
          </pre>
        </div>
        <div className={`${styles.varContent}`}>
          <Section
            header={"Операторът continue"}
            content={`Операторът continue спира текущата итерация на цикъла и продължава със следващата.`}
            color={"blueBG"}
          />
          <div className={`${styles.varCode} ${styles.marginB}`}>
            <pre className={styles.codeText}>
              <span className={styles.comment}>
                # Пример: Не отпечатвай "banana"
              </span>
              <br />
              <span className={styles.variable}>fruits</span> ={" "}
              <span className={styles.string}>
                ["apple", "banana", "cherry"]
              </span>
              <br />
              <span className={styles.builtin}>for</span>{" "}
              <span className={styles.variable}>x</span> in{" "}
              <span className={styles.variable}>fruits</span>:
              <br />
              <span className={styles.codeIndent}>
                <span className={styles.builtin}>if</span>{" "}
                <span className={styles.variable}>x</span> =={" "}
                <span className={styles.string}>"banana"</span>:
                <br />
                <span className={styles.codeIndent2}>
                  <span className={styles.builtin}>continue</span>
                </span>
              </span>
              <span className={styles.builtin}>print</span>(
              <span className={styles.variable}>x</span>)
            </pre>
          </div>
        </div>

        <Section
          header={"Функцията range()"}
          content={`За да итерирате през определен брой пъти, можем да използваме функцията range().`}
          color={"redBG"}
        />
        <div className={styles.varCode}>
          <pre className={styles.codeText}>
            <span className={styles.comment}>
              # Пример: Използване на функцията range()
            </span>
            <br />
            <span className={styles.builtin}>for</span>{" "}
            <span className={styles.variable}>x</span> in{" "}
            <span className={styles.builtin}>range</span>(6):
            <br />
            <span className={styles.codeIndent}>
              <span className={styles.builtin}>print</span>(
              <span className={styles.variable}>x</span>)
            </span>
          </pre>
        </div>
        <div className={`${styles.varCode}`}>
          <pre className={styles.codeText}>
            <span className={styles.comment}>
              # Пример: Използване на параметъра start
            </span>
            <br />
            <span className={styles.builtin}>for</span>{" "}
            <span className={styles.variable}>x</span> in{" "}
            <span className={styles.builtin}>range</span>(2, 6):
            <br />
            <span className={styles.codeIndent}>
              <span className={styles.builtin}>print</span>(
              <span className={styles.variable}>x</span>)
            </span>
          </pre>
        </div>
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.comment}>
              # Пример: Увеличаване на последователността с 3
            </span>
            <br />
            <span className={styles.builtin}>for</span>{" "}
            <span className={styles.variable}>x</span> in{" "}
            <span className={styles.builtin}>range</span>(2, 30, 3):
            <br />
            <span className={styles.codeIndent}>
              <span className={styles.builtin}>print</span>(
              <span className={styles.variable}>x</span>)
            </span>
          </pre>
        </div>
        <Section
          header={"Else в For Loop"}
          content={`Ключовата дума else в цикъл for указва блок код, който да се изпълни, когато цикълът приключи.`}
          color={"purpleBG"}
        />
        <div className={`${styles.varCode}`}>
          <pre className={styles.codeText}>
            <span className={styles.comment}>
              # Пример: Отпечатай всички числа от 0 до 5 и съобщение, когато
              цикълът завърши
            </span>
            <br />
            <span className={styles.builtin}>for</span>{" "}
            <span className={styles.variable}>x</span> in{" "}
            <span className={styles.builtin}>range</span>(6):
            <br />
            <span className={styles.codeIndent}>
              <span className={styles.builtin}>print</span>(
              <span className={styles.variable}>x</span>)
            </span>
            <br />
            <span className={styles.builtin}>else</span>:
            <br />
            <span className={styles.codeIndent}>
              <span className={styles.builtin}>print</span>(
              <span className={styles.string}>"Finally finished!"</span>)
            </span>
          </pre>
        </div>
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.comment}>
              # Пример: Прекъсни цикъла, когато x е 3, провери блока else
            </span>
            <br />
            <span className={styles.builtin}>for</span>{" "}
            <span className={styles.variable}>x</span> in{" "}
            <span className={styles.builtin}>range</span>(6):
            <br />
            <span className={styles.codeIndent}>
              <span className={styles.builtin}>if</span>{" "}
              <span className={styles.variable}>x</span> =={" "}
              <span className={styles.number}>3</span>:{" "}
              <span className={styles.builtin}>break</span>
            </span>
            <br />
            <span className={styles.builtin}>print</span>(
            <span className={styles.variable}>x</span>)
            <br />
            <span className={styles.builtin}>else</span>:
            <br />
            <span className={styles.codeIndent}>
              <span className={styles.builtin}>print</span>(
              <span className={styles.string}>"Finally finished!"</span>)
            </span>
          </pre>
        </div>
        <Section
          header={"Влагани цикли"}
          content={`Влаганият цикъл е цикъл вътре в друг цикъл.`}
          color={"greenBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.comment}>
              # Пример: Отпечатай всеки прилагател за всяко плод
            </span>
            <br />
            <span className={styles.variable}>adj</span> ={" "}
            <span className={styles.string}>["red", "big", "tasty"]</span>
            <br />
            <span className={styles.variable}>fruits</span> ={" "}
            <span className={styles.string}>["apple", "banana", "cherry"]</span>
            <br />
            <span className={styles.builtin}>for</span>{" "}
            <span className={styles.variable}>x</span> in{" "}
            <span className={styles.variable}>adj</span>:
            <br />
            <span className={styles.codeIndent}>
              <span className={styles.builtin}>for</span>{" "}
              <span className={styles.variable}>y</span> in{" "}
              <span className={styles.variable}>fruits</span>:
              <br />
              <span className={styles.codeIndent2}>
                <span className={styles.builtin}>print</span>(
                <span className={styles.variable}>x</span>,{" "}
                <span className={styles.variable}>y</span>)
              </span>
            </span>
          </pre>
        </div>
      </div>
      <aside className={styles.quiz}>
        <h1>Задача</h1>
        <p>
          Направи Python код който извежда числата от 1 до 5 използвайки for
          loop:
        </p>
        <textarea
          className={styles.answer}
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          onInput={(e) => {
            const sanitizedValue = e.target.value.replace(/\n/g, "");
            e.target.value = sanitizedValue.slice(0, 100);
            setUserAnswer(sanitizedValue.slice(0, 100));
          }}
          placeholder="Въведи кода тук (максимум 100 символа)"
          rows={5}
          cols={5}
          maxLength={100}
        />

        <button className={styles.submitBtn} onClick={handleSubmit}>
          Предай
        </button>
        {result && <p>{result}</p>}
      </aside>
    </div>
  );
}
