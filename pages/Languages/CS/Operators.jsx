// React Component for Operators
import React from "react";
import styles from "../../../styles/C#.module.css";

const Operators = () => {
  return (
    <main>
      <div
        className={`${styles.varContent} ${styles.marginB} ${styles.content}`}
      >
        <h2 className={styles.header}>Arithmetic Operators</h2>
        <p className={styles.description}>
          Arithmetic operators are used to perform common mathematical
          operations.
        </p>
        <table className={`${styles.table} ${styles.marginB}`}>
          <thead>
            <tr>
              <th className={styles.varCode}>Operator</th>
              <th className={styles.varCode}>Name</th>
              <th className={styles.varCode}>Description</th>
              <th className={styles.varCode}>Example</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={styles.varCode}>+</td>
              <td className={styles.varCode}>Addition</td>
              <td className={styles.varCode}>Adds together two values</td>
              <td className={styles.varCode}>x + y</td>
            </tr>
            <tr>
              <td className={styles.varCode}>-</td>
              <td className={styles.varCode}>Subtraction</td>
              <td className={styles.varCode}>
                Subtracts one value from another
              </td>
              <td className={styles.varCode}>x - y</td>
            </tr>
            {/* ... (similar entries for other arithmetic operators) */}
          </tbody>
        </table>
      </div>

      <div
        className={`${styles.varContent} ${styles.marginB} ${styles.content}`}
      >
        <h2 className={styles.header}>Assignment Operators</h2>
        <p className={styles.description}>
          Assignment operators are used to assign values to variables.
        </p>
        <table className={`${styles.table} ${styles.marginB}`}>
          {/* ... (similar structure as the first table) */}
        </table>
      </div>

      <div
        className={`${styles.varContent} ${styles.marginB} ${styles.content}`}
      >
        <h2 className={styles.header}>Comparison Operators</h2>
        <p className={styles.description}>
          Comparison operators are used to compare two values (or variables).
        </p>
        <table className={`${styles.table} ${styles.marginB}`}>
          {/* ... (similar structure as the first table) */}
        </table>
      </div>

      <div
        className={`${styles.varContent} ${styles.marginB} ${styles.content}`}
      >
        <h2 className={styles.header}>Logical Operators</h2>
        <p className={styles.description}>
          Logical operators are used to determine the logic between variables or
          values.
        </p>
        <table className={`${styles.table} ${styles.marginB}`}>
          {/* ... (similar structure as the first table) */}
        </table>
      </div>
    </main>
  );
};

export default Operators;
