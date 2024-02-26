import React, { useState, useEffect } from "react";
import styles from "../../../styles/C#.module.css";
import Section from "../../../components/Section";
import Navbar from "../../../components/Navbar";
import QuizQuestion from "@/components/QuizQuestion";
import { getFirestore, updateDoc, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ToastComponent from "@/components/Toast";

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
          header={"Data Types in C#"}
          content={`As explained in the variables chapter, a variable in C# must be a specified data type:`}
          color={"redBG"}
        />
        <div className={styles.varCode}>
          <pre className={styles.codeText}>
            <span className={styles.comment}>// Example: storing text</span>
            <br />
            <span className={styles.keyword}>string</span> name = "John";
            <br />
            <span className={styles.builtin}>Console.WriteLine</span>(name);
            <br />
            <br />
            <span className={styles.comment}>// Example: storing a number</span>
            <br />
            <span className={styles.keyword}>int</span> myNum = 5;{" "}
            <span className={styles.comment}>// Integer (whole number)</span>
            <br />
            <span className={styles.keyword}>double</span> myDoubleNum = 5.99D;
            <span className={styles.comment}>// Floating point number</span>
            <br />
            <span className={styles.keyword}>char</span> myLetter = 'D';{" "}
            <span className={styles.comment}>// Character</span>
            <br />
            <span className={styles.keyword}>bool</span> myBool ={" "}
            <span className={styles.builtin}>true</span>;{" "}
            <span className={styles.comment}>// Boolean</span>
            <br />
            <span className={styles.keyword}>string</span> myText = "Hello";{" "}
            <span className={styles.comment}>// String</span>
            <br />
            <span className={styles.builtin}>Console.WriteLine</span>(myNum);
          </pre>
        </div>

        <div className={styles.marginB}></div>
        <div className={`${styles.varContent}`}>
          <Section
            header={"Data Type Size Description"}
            content={`int 4 bytes Stores whole numbers from -2,147,483,648 to 2,147,483,647`}
            color={"blueBG"}
          />
          <div className={styles.table}>
            <table>
              <tr>
                <th className={styles.varCode}>Data Type</th>
                <th className={styles.varCode}>Size</th>
                <th className={styles.varCode}>Description</th>
              </tr>
              <tr>
                <td className={styles.varCode}>int</td>
                <td className={styles.varCode}>4 bytes</td>
                <td className={styles.varCode}>
                  Stores whole numbers from -2,147,483,648 to 2,147,483,647
                </td>
              </tr>
              <tr>
                <td className={styles.varCode}>long</td>
                <td className={styles.varCode}>8 bytes</td>
                <td className={styles.varCode}>
                  Stores whole numbers from -9,223,372,036,854,775,808 to
                  9,223,372,036,854,775,807
                </td>
              </tr>
              <tr>
                <td className={styles.varCode}>float</td>
                <td className={styles.varCode}>4 bytes</td>
                <td className={styles.varCode}>
                  Stores fractional numbers. Sufficient for storing 6 to 7
                  decimal digits
                </td>
              </tr>
              <tr>
                <td className={styles.varCode}>double</td>
                <td className={styles.varCode}>8 bytes</td>
                <td className={styles.varCode}>
                  Stores fractional numbers. Sufficient for storing 15 decimal
                  digits
                </td>
              </tr>
              <tr>
                <td className={styles.varCode}>bool</td>
                <td className={styles.varCode}>1 bit</td>
                <td className={styles.varCode}>Stores true or false values</td>
              </tr>
              <tr>
                <td className={styles.varCode}>char</td>
                <td className={styles.varCode}>2 bytes</td>
                <td className={styles.varCode}>
                  Stores a single character/letter, surrounded by single quotes
                </td>
              </tr>
              <tr>
                <td className={styles.varCode}>string</td>
                <td className={styles.varCode}>2 bytes per character</td>
                <td className={styles.varCode}>
                  Stores a sequence of characters, surrounded by double quotes
                </td>
              </tr>
            </table>
          </div>
        </div>
        <div className={styles.marginB}></div>
        <Section
          header={"Numbers"}
          content={`Number types are divided into two groups: Integer types and Floating point types`}
          color={"blueBG"}
        />
        <div className={styles.marginB}></div>
        <Section
          header={"Integer Types"}
          content={`Int

          The int data type can store whole numbers from -2147483648 to 2147483647. In general, and in our tutorial, the int data type is the preferred data type when we create variables with a numeric value.`}
          color={"greenBG"}
        />

        <Section
          header={"Floating point types"}
          content={`Int

          The int data type can store whole numbers from -2147483648 to 2147483647. In general, and in our tutorial, the int data type is the preferred data type when we create variables with a numeric value.`}
          color={"greenBG"}
        />
        <div className={styles.marginB}></div>
        <Section
          header={"Booleans"}
          content={`A boolean data type is declared with the bool keyword and can only take the values true or false:`}
          color={"purpleBG"}
        />
        <div className={styles.marginB}></div>
        <Section
          header={"Characters"}
          content={`The char data type is used to store a single character. The character must be surrounded by single quotes, like 'A' or 'c':`}
          color={"purpleBG"}
        />
        <div className={styles.marginB}></div>
        <Section
          header={"Strings"}
          content={`The string data type is used to store a sequence of characters (text). String values must be surrounded by double quotes:`}
          color={"purpleBG"}
        />
        <div className={styles.marginB}></div>
        <div className={styles.varCode}>
          <pre className={styles.codeText}>
            <span className={styles.keyword}>// Integer Types</span>
            <br />
            <span className={styles.keyword}>Int</span>
            <br />
            <br />
            <span className={styles.string}>
              The int data type can store whole numbers from -2147483648 to
              2147483647. In general, and in our tutorial, the int data type is
              the preferred data type when we create variables with a numeric
              value.
            </span>
            <br />
            <span className={styles.keyword}>Example</span>
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
              The long data type can store whole numbers from
              -9223372036854775808 to 9223372036854775807. This is used when int
              is not large enough to store the value. Note that you should end
              the value with an "L":
            </span>
            <br />
            <span className={styles.keyword}>Example</span>
            <br />
            <br />
            <span className={styles.keyword}>long</span> myNum = 15000000000L;
            <br />
            <span className={styles.builtin}>Console.WriteLine</span>(myNum);
            <br />
            <br />
            <span className={styles.keyword}>// Floating Point Types</span>
            <br />
            <br />
            <span className={styles.string}>
              You should use a floating point type whenever you need a number
              with a decimal, such as 9.99 or 3.14515.
            </span>
            <br />
            <br />
            <span className={styles.keyword}>
              The float and double data types can store fractional numbers. Note
              that you should end the value with an "F" for floats and "D" for
              doubles:
            </span>
            <br />
            <span className={styles.keyword}>Float Example</span>
            <br />
            <br />
            <span className={styles.keyword}>float</span> myNum = 5.75F;
            <br />
            <span className={styles.builtin}>Console.WriteLine</span>(myNum);
            <br />
            <br />
            <span className={styles.keyword}>Double Example</span>
            <br />
            <br />
            <span className={styles.keyword}>double</span> myNum = 19.99D;
            <br />
            <span className={styles.builtin}>Console.WriteLine</span>(myNum);
            <br />
            <br />
            <span className={styles.string}>Use float or double?</span>
            <br />
            <br />
            <span className={styles.string}>
              The precision of a floating point value indicates how many digits
              the value can have after the decimal point. The precision of float
              is only six or seven decimal digits, while double variables have a
              precision of about 15 digits. Therefore, it is safer to use double
              for most calculations.
            </span>
            <br />
            <span className={styles.keyword}>Scientific Numbers</span>
            <br />
            <br />
            <span className={styles.string}>
              A floating point number can also be a scientific number with an
              "e" to indicate the power of 10:
            </span>
            <br />
            <span className={styles.keyword}>Example</span>
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
            <br />
            <span className={styles.keyword}>// Booleans</span>
            <br />
            <br />
            <span className={styles.string}>
              A boolean data type is declared with the bool keyword and can only
              take the values true or false:
            </span>
            <br />
            <span className={styles.keyword}>Example</span>
            <br />
            <br />
            <span className={styles.keyword}>bool</span> isCSharpFun = true;
            <br />
            <span className={styles.keyword}>bool</span> isFishTasty = false;
            <br />
            <span className={styles.builtin}>Console.WriteLine</span>
            (isCSharpFun);{" "}
            <span className={styles.comment}>// Outputs True</span>
            <br />
            <span className={styles.builtin}>Console.WriteLine</span>
            (isFishTasty);{" "}
            <span className={styles.comment}>// Outputs False</span>
            <br />
            <br />
            <span className={styles.keyword}>// Characters</span>
            <br />
            <br />
            <span className={styles.string}>
              The char data type is used to store a single character. The
              character must be surrounded by single quotes, like 'A' or 'c':
            </span>
            <br />
            <span className={styles.keyword}>Example</span>
            <br />
            <br />
            <span className={styles.keyword}>char</span> myGrade = 'B';
            <br />
            <span className={styles.builtin}>Console.WriteLine</span>(myGrade);
            <br />
            <br />
            <span className={styles.keyword}>// Strings</span>
            <br />
            <br />
            <span className={styles.string}>
              The string data type is used to store a sequence of characters
              (text). String values must be surrounded by double quotes:
            </span>
            <br />
            <span className={styles.keyword}>Example</span>
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
