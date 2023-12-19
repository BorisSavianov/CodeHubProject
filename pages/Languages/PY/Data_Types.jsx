import React, { useState } from "react";
import styles from "../../../styles/Python.module.css";
import quiz from "@/styles/Quiz.module.css";
import Section from "../../../components/Section";
import Navbar from "../../../components/Navbar";
import QuizQuestion from "@/components/QuizQuestion";

import ToastComponent from "@/components/Toast";

const Quiz = () => {
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
      ToastComponent("Отговорът е правилен!", "success");
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
  return (
    <main className="container">
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
      <Quiz />
    </main>
  );
}
