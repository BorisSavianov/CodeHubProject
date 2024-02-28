import React, { useState, useEffect } from "react";
import styles from "../../../styles/C#.module.css";
import Section from "../../../components/Section";
import Navbar from "../../../components/Navbar";
import QuizQuestion from "@/components/QuizQuestion";
import { getFirestore, updateDoc, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ToastComponent from "@/components/Toast";
import { set } from "firebase/database";

const CSharpDataTypes = ({ user }) => {
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
      question: "Какъв тип данни се използва за цели числа в C#?",
      options: ["int", "long", "float", "double"],
      answer: "int",
    },
    {
      question: "Кой тип данни съхранява символ в C#?",
      options: ["char", "bool", "string", "int"],
      answer: "char",
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
    <div className={styles.cSharp}>
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

export default function DataTypes() {
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

      <div className={`${styles.varContent}`}>
        <Section
          header={"Типове данни в C#"}
          content={`Както е обяснено в главата за променливите, променлива в C# трябва да бъде определен тип данни:`}
          color={"redBG"}
        />
        <div className={styles.varCode}>
          <pre className={styles.codeText}>
            <span className={styles.comment}>
              // Пример: запазване на текст
            </span>
            <br />
            <span className={styles.keyword}>string</span> name = "John";
            <br />
            <span className={styles.builtin}>Console.WriteLine</span>(name);
            <br />
            <br />
            <span className={styles.comment}>
              // Пример: запазване на число
            </span>
            <br />
            <span className={styles.keyword}>int</span> myNum = 5;{" "}
            <span className={styles.comment}>// Цяло число</span>
            <br />
            <span className={styles.keyword}>double</span> myDoubleNum = 5.99D;
            <span className={styles.comment}>// Число с плаваща запетая</span>
            <br />
            <span className={styles.keyword}>char</span> myLetter = 'D';{" "}
            <span className={styles.comment}>// Символ</span>
            <br />
            <span className={styles.keyword}>bool</span> myBool ={" "}
            <span className={styles.builtin}>true</span>;{" "}
            <span className={styles.comment}>// Булева стойност</span>
            <br />
            <span className={styles.keyword}>string</span> myText = "Hello";{" "}
            <span className={styles.comment}>// Низ</span>
            <br />
            <span className={styles.builtin}>Console.WriteLine</span>(myNum);
          </pre>
        </div>

        <div className={styles.marginB}></div>
        <div className={`${styles.varContent}`}>
          <Section
            header={"Описание на размера на типовете данни"}
            content={`int 4 байта Запазва цели числа от -2,147,483,648 до 2,147,483,647`}
            color={"blueBG"}
          />
          <div className={styles.table}>
            <table>
              <tr>
                <th className={styles.varCode}>Тип данни</th>
                <th className={styles.varCode}>Размер</th>
                <th className={styles.varCode}>Описание</th>
              </tr>
              <tr>
                <td className={styles.varCode}>int</td>
                <td className={styles.varCode}>4 байта</td>
                <td className={styles.varCode}>
                  Запазва цели числа от -2,147,483,648 до 2,147,483,647
                </td>
              </tr>
              <tr>
                <td className={styles.varCode}>long</td>
                <td className={styles.varCode}>8 байта</td>
                <td className={styles.varCode}>
                  Запазва цели числа от -9,223,372,036,854,775,808 до
                  9,223,372,036,854,775,807
                </td>
              </tr>
              <tr>
                <td className={styles.varCode}>float</td>
                <td className={styles.varCode}>4 байта</td>
                <td className={styles.varCode}>
                  Запазва дробни числа. Подходящ за запазване на 6 до 7
                  десетични цифри
                </td>
              </tr>
              <tr>
                <td className={styles.varCode}>double</td>
                <td className={styles.varCode}>8 байта</td>
                <td className={styles.varCode}>
                  Запазва дробни числа. Подходящ за запазване на 15 десетични
                  цифри
                </td>
              </tr>
              <tr>
                <td className={styles.varCode}>bool</td>
                <td className={styles.varCode}>1 бит</td>
                <td className={styles.varCode}>
                  Запазва стойности true или false
                </td>
              </tr>
              <tr>
                <td className={styles.varCode}>char</td>
                <td className={styles.varCode}>2 байта</td>
                <td className={styles.varCode}>
                  Запазва единичен символ/буква, обграден от единични кавички
                </td>
              </tr>
              <tr>
                <td className={styles.varCode}>string</td>
                <td className={styles.varCode}>2 байта на символ</td>
                <td className={styles.varCode}>
                  Запазва последователност от символи, обградена от двойни
                  кавички
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div className={styles.marginB}></div>
        <Section
          header={"Числа"}
          content={`Типовете числа се делят на две групи: Целочислени типове и Типове с плаваща запетая`}
          color={"blueBG"}
        />
        <div className={styles.marginB}></div>
        <Section
          header={"Целочислени типове"}
          content={`Int

          Типът данни int може да съхранява цели числа от -2147483648 до 2147483647. Обикновено и в нашето ръководство, типът данни int е предпочитан, когато създаваме променливи с числова стойност.`}
          color={"greenBG"}
        />

        <div className={styles.varCode}>
          <pre className={styles.codeText}>
            <span className={styles.keyword}>// Целочислени типове</span>
            <br />
            <span className={styles.keyword}>Int</span>
            <br />
            <br />
            <span className={styles.string}>
              Типът данни int може да съхранява цели
              <br />
              числа от -2147483648 до 2147483647.
              <br />
              Обикновено и в нашето ръководство,
              <br />
              типът данни int е предпочитан
              <br />
              при създаването на променливи с <br />
              числова стойност.
            </span>
            <br />
            <span className={styles.keyword}>Пример</span>
            <br />
            <br />
            <span className={styles.keyword}>int</span> myNum = 100000;
            <br />
            <span className={styles.builtin}>Console.WriteLine</span>(myNum);
            <br />
            <br />
            <span className={styles.keyword}>Long</span>
            <br />
            <br />
            <span className={styles.string}>
              Типът данни long може да съхранява цели
              <br />
              числа от -9223372036854775808 до <br />
              9223372036854775807.
              <br />
              Този тип се използва, когато int не е <br />
              достатъчно голям, за
              <br />
              да съхранява стойността. Внимание: <br />
              трябва да приключите стойността с "L":
            </span>
            <br />
            <span className={styles.keyword}>Пример</span>
            <br />
            <br />
            <span className={styles.keyword}>long</span> myNum = 15000000000L;
            <br />
            <span className={styles.builtin}>Console.WriteLine</span>(myNum);
            <br />
            <br />
            <span className={styles.keyword}>// Типове с плаваща запетая</span>
            <br />
            <br />
            <span className={styles.string}>
              Винаги трябва да използвате тип с <br />
              плаваща запетая, когато ви е необходимо <br />
              число с десетична запетая,
              <br />
              като 9.99 или 3.14515.
            </span>
            <br />
          </pre>
        </div>

        <Section
          header={"Типове с плаваща запетая"}
          content={`Int

          Типът данни int може да съхранява цели числа от -2147483648 до 2147483647. Обикновено и в нашето ръководство, типът данни int е предпочитан, когато създаваме променливи с числова стойност.`}
          color={"greenBG"}
        />
        <div className={styles.marginB}>
          <div className={styles.varCode}>
            <pre className={styles.codeText}>
              <br />
              <span className={styles.keyword}>
                Типовете данни float и double могат да съхраняват
                <br />
                дробни числа. Забележете, че трябва да
                <br />
                приключите стойността с "F" за float и "D" за double:
              </span>
              <br />
              <br />
              <span className={styles.keyword}>Пример за float</span>
              <br />
              <br />
              <span className={styles.keyword}>float</span> myNum = 5.75F;
              <br />
              <span className={styles.builtin}>Console.WriteLine</span>(myNum);
              <br />
              <br />
              <span className={styles.keyword}>Пример за double</span>
              <br />
              <br />
              <span className={styles.keyword}>double</span> myNum = 19.99D;
              <br />
              <span className={styles.builtin}>Console.WriteLine</span>(myNum);
              <br />
              <br />
              <span className={styles.string}>
                Кога да използвате float или double?
              </span>
              <br />
              <br />
              <span className={styles.string}>
                Точността на стойността с плаваща запетая указва
                <br />
                колко цифри може да има след
                <br />
                десетичната запетая. Точността на float
                <br />
                е само шест или седем десетични цифри,
                <br />
                докато променливите double имат
                <br />
                точност от около 15 цифри. <br />
                Затова е по-безопасно да използвате
                <br />
                double за повечето изчисления.
              </span>
              <br />
              <span className={styles.keyword}>Научни числа</span>
              <br />
              <br />
              <span className={styles.string}>
                Числото с плаваща запетая може да бъде и
                <br />
                научно число с "е", което показва степента на 10:
              </span>
              <br />
              <span className={styles.keyword}>Пример</span>
              <br />
              <br />
              <span className={styles.keyword}>float</span> f1 = 35e3F;
              <br />
              <span className={styles.keyword}>double</span> d1 = 12E4D;
              <br />
              <span className={styles.builtin}>Console.WriteLine</span>(f1);
              <br />
              <span className={styles.builtin}>Console.WriteLine</span>(d1);
              <br />
            </pre>
          </div>
        </div>
        <Section
          header={"Булеви стойности"}
          content={`Булевият тип данни се декларира с ключовата дума bool и може да приема само стойностите true или false:`}
          color={"purpleBG"}
        />
        <div className={styles.marginB}>
          <div className={styles.varCode}>
            <pre className={styles.codeText}>
              <br />
              <span className={styles.keyword}>// Булеви стойности</span>
              <br />
              <br />
              <span className={styles.string}>
                Булевият тип данни се декларира
                <br /> с ключовата дума bool и може
                <br />
                да приема само стойностите true или false:
              </span>
              <br />
              <span className={styles.keyword}>Пример</span>
              <br />
              <br />
              <span className={styles.keyword}>bool</span> isCSharpFun = true;
              <br />
              <span className={styles.keyword}>bool</span> isFishTasty = false;
              <br />
              <span className={styles.builtin}>Console.WriteLine</span>
              (isCSharpFun);{" "}
              <span className={styles.comment}>// Изход True</span>
              <br />
              <span className={styles.builtin}>Console.WriteLine</span>
              (isFishTasty);{" "}
              <span className={styles.comment}>// Изход False</span>
              <br />
              <br />
              <span className={styles.keyword}>// Символи</span>
              <br />
              <br />
              <span className={styles.string}>
                Символният тип данни се използва за
                <br />
                съхранение на единичен
                <br />
                символ. Символът трябва да бъде обграден
                <br /> с единични кавички, например 'A' или 'c':
              </span>
              <br />
              <span className={styles.keyword}>Пример</span>
              <br />
              <br />
              <span className={styles.keyword}>char</span> myGrade = 'B';
              <br />
              <span className={styles.builtin}>Console.WriteLine</span>
              (myGrade);
              <br />
              <br />
            </pre>
          </div>
        </div>
        <Section
          header={"Низове"}
          content={`Низовият тип данни се използва за съхранение на поредица от символи (текст). Стойностите на низовете трябва да бъдат обградени с двойни кавички:`}
          color={"purpleBG"}
        />

        <div className={styles.varCode}>
          <pre className={styles.codeText}>
            <span className={styles.keyword}>// Низове</span>
            <br />
            <br />
            <span className={styles.string}>
              Низовият тип данни се използва за съхранение
              <br /> на поредица от символи (текст). <br />
              Стойностите на низовете <br />
              трябва да бъдат обградени с двойни кавички:
            </span>
            <br />
            <span className={styles.keyword}>Пример</span>
            <br />
            <br />
            <span className={styles.keyword}>string</span> greeting = "Hello
            World";
            <br />
            <span className={styles.builtin}>Console.WriteLine</span>(greeting);
          </pre>
        </div>
      </div>

      <div className={styles.marginB}></div>

      <CSharpDataTypes user={user} />
      <div className={styles.marginB}></div>
    </main>
  );
}
