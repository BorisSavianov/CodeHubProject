import React, { useState } from "react";
import axios from "axios";
import styles from "../../../styles/Python.module.css";
import Section from "../../../components/Section";
import Navbar from "../../../components/Navbar";
import { getFirestore, updateDoc, doc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import ToastComponent from "@/components/Toast";
import { useEffect } from "react";

export default function PythonWhileLoop() {
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
      // Include exerciseId in the API request
      const exerciseId = 2; // Add exerciseId here
      const response = await axios.post("/api/check", {
        exerciseId,
        answer: userAnswer,
      });

      if (response.data.message === "Правилен отговор!") {
        // Increment XP when the answer is correct
        handleIncrementXP(exerciseId);
      }
      setResult(response.data.message);
    } catch (error) {
      console.error(error);
      setResult(`Error: ${error.message}`);
    }
  };

  return (
    <main>
      <Navbar></Navbar>
      <div className={`${styles.varContent}`}>
        <Section
          header={"Цикълът while"}
          content={`С цикъла while можем да изпълним определен набор от операции, докато условието е истина.`}
          color={"redBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.variable}>i</span> ={" "}
            <span className={styles.number}>1</span>
            <br />
            <span className={styles.keyword}>while</span>{" "}
            <span className={styles.variable}>i</span> {"<"}{" "}
            <span className={styles.number}>6</span>:
            <br />
            &nbsp;&nbsp;
            <span className={styles.builtin}>print</span>(
            <span className={styles.variable}>i</span>)
            <br />
            &nbsp;&nbsp;
            <span className={styles.variable}>i</span> +={" "}
            <span className={styles.number}>1</span>
            <br />
            <span className={styles.comment}>
              # Забележка: не забравяйте
              <br /> да увеличавате i,
              <br /> в противен случай цикълът
              <br /> ще продължи завинаги.
            </span>
          </pre>
        </div>
        <Section
          header={"Операторът break"}
          content={`С оператора break можем да спрем цикъла, дори ако условието на while е истина.`}
          color={"greenBG"}
        />
        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.variable}>i</span> ={" "}
            <span className={styles.number}>1</span>
            <br />
            <span className={styles.keyword}>while</span>{" "}
            <span className={styles.variable}>i</span> {"<"}{" "}
            <span className={styles.number}>6</span>:
            <br />
            &nbsp;&nbsp;
            <span className={styles.builtin}>print</span>(
            <span className={styles.variable}>i</span>)
            <br />
            &nbsp;&nbsp;
            <span className={styles.keyword}>if</span>{" "}
            <span className={styles.variable}>i</span> {"==="}{" "}
            <span className={styles.number}>3</span>:
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className={styles.keyword}>break</span>
            <br />
            &nbsp;&nbsp;
            <span className={styles.variable}>i</span> +={" "}
            <span className={styles.number}>1</span>
          </pre>
        </div>
        <Section
          header={"Операторът continue"}
          content={`С оператора continue можем да спрем текущата итерация и да продължим със следващата.`}
          color={"redBG"}
        />

        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.variable}>i</span> ={" "}
            <span className={styles.number}>0</span>
            <br />
            <span className={styles.keyword}>while</span>{" "}
            <span className={styles.variable}>i</span> {"<"}{" "}
            <span className={styles.number}>6</span>:
            <br />
            &nbsp;&nbsp;
            <span className={styles.variable}>i</span> +={" "}
            <span className={styles.number}>1</span>
            <br />
            &nbsp;&nbsp;
            <span className={styles.keyword}>if</span>{" "}
            <span className={styles.variable}>i</span> {"==="}{" "}
            <span className={styles.number}>3</span>:
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <span className={styles.keyword}>continue</span>
            <br />
            &nbsp;&nbsp;
            <span className={styles.builtin}>print</span>(
            <span className={styles.variable}>i</span>)
          </pre>
        </div>
        <Section
          header={"Операторът else"}
          content={`С оператора else можем да изпълним блок код, когато условието не е вярно повече.`}
          color={"greenBG"}
        />

        <div className={`${styles.varCode} ${styles.marginB}`}>
          <pre className={styles.codeText}>
            <span className={styles.variable}>i</span> ={" "}
            <span className={styles.number}>1</span>
            <br />
            <span className={styles.keyword}>while</span>{" "}
            <span className={styles.variable}>i</span> {"<"}{" "}
            <span className={styles.number}>6</span>:
            <br />
            &nbsp;&nbsp;
            <span className={styles.builtin}>print</span>(
            <span className={styles.variable}>i</span>)
            <br />
            &nbsp;&nbsp;
            <span className={styles.variable}>i</span> +={" "}
            <span className={styles.number}>1</span>
            <br />
            <span className={styles.keyword}>else</span>:
            <br />
            &nbsp;&nbsp;
            <span className={styles.builtin}>print</span>(
            <span className={styles.string}>"i вече не е по-малко от 6"</span>)
          </pre>
        </div>
      </div>
      <aside className={styles.quiz}>
        <h1>Задача</h1>
        <p>
          Направи Python код който извежда числата от 1 до 3 използвайки while
          loop:
        </p>
        <textarea
          className={styles.answer}
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
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
    </main>
  );
}
