import React, { useState } from "react";
import axios from "axios";
import styles from "../../../styles/C#.module.css";
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

  const handleIncrementXP = async (exerciseId) => {
    const firestore = getFirestore();

    try {
      // Check if the user has already received XP for the current exercise
      const userDocRef = doc(firestore, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();

        // Check if the user has received XP for the current exercise
        if (!userData.exercises || !userData.exercises.includes(exerciseId)) {
          // Update state
          setXP((prevXP) => prevXP + 1);

          // Get the updated XP value
          const updatedXP = xp + 1;

          // Update Firestore with the correct user UID and mark exercise as completed
          await updateDoc(doc(firestore, "users", user.uid), {
            xp: updatedXP,
            exercises: [...(userData.exercises || []), exerciseId],
          });

          // Show toast with the updated XP value
          ToastComponent(
            `Отговорът е правилен!\nИмате ${updatedXP}xp.`,
            "success"
          );
        } else {
          // User has already received XP for this exercise
          ToastComponent("Отговорът е правилен!", "success");
        }
      }
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

      // Set the constant language code
      const selectedLanguage = "csharp";

      // Include exerciseId in the API request
      const exerciseId = 3; // Add exerciseId here
      const response = await axios.post("/api/check", {
        exerciseId: exerciseId, // Update exerciseId for the second exercise
        answer: sanitizedAnswer,
        language: selectedLanguage,
      });

      if (response.data.message === "Правилен отговор!") {
        // Increment XP when the answer is correct
        handleIncrementXP(exerciseId); // Pass the correct exerciseId for the second exercise
      }
      setResult(response.data.message);
    } catch (error) {
      console.error(error);
      setResult(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className={`${styles.varContent}`}>
        <Section
          header={"C# For Loop"}
          content={`Когато знаете точно колко пъти искате да циклирате блок код, използвайте for цикъла вместо while цикъл:`}
          color={"redBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            {/* C# Пример с For Цикъл */}
            <span className={styles.comment}>
              // Пример: Извеждане на числа от 0 до 4
            </span>
            <br />
            <span className={styles.builtin}>for</span>{" "}
            <span className={styles.variable}>(int i = 1; i &lt;= 5; i++)</span>{" "}
            {"{"}
            <br />
            <span className={styles.codeIndent}>
              <span className={styles.builtin}>Console.WriteLine</span>(
              <span className={styles.variable}>i</span>);
            </span>
            <br />
            {"}"}
          </pre>
        </div>
        <Section
          header={"Вложени Цикли"}
          content={`Също така е възможно да поставите един цикъл в друг. Това се нарича вложен цикъл.`}
          color={"purpleBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            {/* C# Пример с Вложен Цикъл */}
            <span className={styles.comment}>// Пример: Вложени цикли</span>
            <br />
            <span className={styles.builtin}>for</span>{" "}
            <span className={styles.variable}>(int i = 1; i &lt;= 2; ++i)</span>{" "}
            {"{"}
            <br />
            <span className={styles.codeIndent}>
              <span className={styles.builtin}>Console.WriteLine</span>(
              <span className={styles.string}>"Външен: "</span> +{" "}
              <span className={styles.variable}>i</span>);{" "}
              {/* Изпълнява се 2 пъти */}
            </span>
            <br />
            <span className={styles.codeIndent}>
              {/* Вътрешен цикъл */}
              <span className={styles.builtin}>for</span>{" "}
              <span className={styles.variable}>
                (int j = 1; j &lt;= 3; j++)
              </span>{" "}
              {"{"}
              <br />
              <span className={styles.codeIndent2}>
                <span className={styles.builtin}>Console.WriteLine</span>(
                <span className={styles.string}>" Вътрешен: "</span> +{" "}
                <span className={styles.variable}>j</span>);{" "}
                {/* Изпълнява се 6 пъти (2 * 3) */}
              </span>
              <br />
              <span className={styles.codeIndent}>{"}"}</span>
            </span>
            <br />
            {"}"}
          </pre>
        </div>
        <Section
          header={"foreach Цикъл"}
          content={`Също така има foreach цикъл, който се използва изключително за циклиране през елементи в масив:`}
          color={"greenBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            {/* C# Пример с foreach Цикъл */}
            <span className={styles.comment}>
              // Пример: Циклиране през елементи в масива cars
            </span>
            <br />
            <span className={styles.variable}>
              string[] cars = {"{"} "Volvo", "BMW", "Ford", "Mazda" {"}"};
            </span>
            <br />
            <span className={styles.builtin}>foreach</span>{" "}
            <span className={styles.variable}>(string i in cars)</span> {"{"}
            <br />
            <span className={styles.codeIndent}>
              <span className={styles.builtin}>Console.WriteLine</span>(
              <span className={styles.variable}>i</span>);
            </span>
            <br />
            {"}"}
          </pre>
        </div>
      </div>

      <aside className={styles.quiz}>
        <h1>Задача</h1>
        <p>
          Направете C# код, който извежда числата от 1 до 5, използвайки for
          цикъл:
        </p>
        <textarea
          className={styles.answer}
          value={
            userAnswer ||
            `using System;\n\nclass Program\n{\n    static void Main()\n    {\n        Console.WriteLine("Hello, World!");\n    }\n}`
          }
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Въведи кода тук (максимум 300 символа)"
          rows={5}
          cols={5}
          maxLength={300}
        ></textarea>

        <button className={styles.submitBtn} onClick={handleSubmit}>
          Предай
        </button>
        {result && <p>{result}</p>}
      </aside>
    </div>
  );
}
