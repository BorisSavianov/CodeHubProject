import React, { useState } from "react";
import styles from "../../../styles/Python.module.css";
import Section from "../../../components/Section";
import Navbar from "../../../components/Navbar";
import QuizQuestion from "@/components/QuizQuestion";
import { getFirestore, updateDoc, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ToastComponent from "@/components/Toast";
import { useEffect } from "react";

const Quiz = ({ user }) => {
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

  const questions = [
    {
      question: "Какъв е основният тип данни в Python?",
      options: ["str", "int", "float", "bool"],
      answer: "str",
    },
    {
      question: "От какъв тип е x = True",
      options: ["list", "str", "int", "bool"],
      answer: "bool",
    },
  ];

  const handleAnswer = (questionIndex, selectedAnswer, correctAnswer) => {
    if (!selectedAnswer) {
      ToastComponent("Моля, изберете отговор преди да проверите.", "info");
      return;
    }

    if (selectedAnswer === correctAnswer) {
      try {
        // Call the handleIncrementXP function to handle further logic (e.g., update in Firestore)
        handleIncrementXP();
      } catch (error) {
        console.error("Error updating user XP:", error);
      }
    } else {
      ToastComponent("Отговорът е грешен.", "error");
    }
  };

  return (
    <div className={styles.quiz}>
      {questions.map((question, index) => (
        <QuizQuestion
          key={index}
          question={question.question}
          options={question.options}
          onAnswer={(selectedOption) =>
            handleAnswer(index, selectedOption, question.answer)
          }
        />
      ))}
    </div>
  );
};

export default function PythonDataTypes() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <main>
      <Navbar></Navbar>

      <div className={`${styles.varContent} ${styles.marginB} `}>
        <Section
          header={"Вградени типове данни"}
          content={`В програмирането типът данни е важно понятие. Променливите могат да съхраняват данни от различни типове, и различните типове могат да извършват различни операции. Python има следните вградени типове данни по подразбиране, разделени в следните категории:`}
          color={"redBG"}
        />
        <div className={styles.table}>
          <table>
            <tr>
              <th className={styles.varCode}>Пример</th>
              <th className={styles.varCode}>Тип данни</th>
            </tr>
            <tr>
              <td className={styles.varCode}>x = "Hello World"</td>
              <td className={styles.varCode}>str</td>
            </tr>
            <tr>
              <td className={styles.varCode}>x = 20</td>
              <td className={styles.varCode}>int</td>
            </tr>
            <tr>
              <td className={styles.varCode}>x = 20.5</td>
              <td className={styles.varCode}>float</td>
            </tr>
            <tr>
              <td className={styles.varCode}>
                x = ["apple", "banana", "cherry"]
              </td>
              <td className={styles.varCode}>list</td>
            </tr>
            <tr>
              <td className={styles.varCode}>
                x = ("apple", "banana", "cherry")
              </td>
              <td className={styles.varCode}>tuple</td>
            </tr>
            <tr>
              <td className={styles.varCode}>x = range(6)</td>
              <td className={styles.varCode}>range</td>
            </tr>
            <tr>
              <td
                className={styles.varCode}
              >{`x = {("name": "John", "age": 36)}`}</td>
              <td className={styles.varCode}>dict</td>
            </tr>
            <tr>
              <td className={styles.varCode}>x = True</td>
              <td className={styles.varCode}>bool</td>
            </tr>
            <tr>
              <td className={styles.varCode}>x = None</td>
              <td className={styles.varCode}>NoneType</td>
            </tr>
          </table>
        </div>
      </div>

      <div className={`${styles.varContent}  ${styles.marginB}`}>
        <Section
          header={"Задаване на конкретен тип данни"}
          content={`Ако искате да зададете типа на данните, можете да използвате следните конструкторски функции:`}
          color={"blueBG"}
        />
        <div className={styles.table}>
          <table>
            <tr>
              <th className={styles.varCode}>Пример</th>
              <th className={styles.varCode}>Тип данни</th>
            </tr>
            <tr>
              <td className={styles.varCode}>x = str("Hello World")</td>
              <td className={styles.varCode}>str</td>
            </tr>
            <tr>
              <td className={styles.varCode}>x = int(20)</td>
              <td className={styles.varCode}>int</td>
            </tr>
            <tr>
              <td className={styles.varCode}>x = float(20.5)</td>
              <td className={styles.varCode}>float</td>
            </tr>
            <tr>
              <td className={styles.varCode}>
                x = list(("apple", "banana", "cherry"))
              </td>
              <td className={styles.varCode}>list</td>
            </tr>
            <tr>
              <td className={styles.varCode}>
                x = tuple(("apple", "banana", "cherry"))
              </td>
              <td className={styles.varCode}>tuple</td>
            </tr>
            <tr>
              <td className={styles.varCode}>x = range(6)</td>
              <td className={styles.varCode}>range</td>
            </tr>
            <tr>
              <td className={styles.varCode}>x = dict(name="John", age=36)</td>
              <td className={styles.varCode}>dict</td>
            </tr>

            <tr>
              <td className={styles.varCode}>x = bool(5)</td>
              <td className={styles.varCode}>bool</td>
            </tr>
            <tr>
              <td className={styles.varCode}>x = None</td>
              <td className={styles.varCode}>NoneType</td>
            </tr>
          </table>
        </div>
      </div>
      <Quiz user={user} />
    </main>
  );
}
