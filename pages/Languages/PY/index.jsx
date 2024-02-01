import Link from "next/link";
import styles from "../../../styles/Python.module.css";
import Navbar from "@/components/Navbar";

export default function Wellcome() {
  return (
    <main>
      <Navbar />
      <div className={styles.heading}>
        <h1>Научи Python</h1>
      </div>

      <div className={styles.Langcontent}>
        <p>
          <Link href={`/Languages/PY/Variables`} className={styles.Item}>
            Променливи
          </Link>
        </p>
        <p>
          <Link href={`/Languages/PY/Data_Types`} className={styles.Item}>
            Типове данни
          </Link>
        </p>
        <p>
          <Link href={`/Languages/PY/Numbers`} className={styles.Item}>
            Числа
          </Link>
        </p>
        <p>
          <Link href={`/Languages/PY/Operators`} className={styles.Item}>
            Логически Оператори
          </Link>
        </p>
        <p>
          <Link href={`/Languages/PY/Lists`} className={styles.Item}>
            Листи
          </Link>
        </p>
        <p>
          <Link href={`/Languages/PY/If`} className={styles.Item}>
            If else
          </Link>
        </p>
        <p>
          <Link href={`/Languages/PY/While`} className={styles.Item}>
            While
          </Link>
        </p>
        <p>
          <Link href={`/Languages/PY/For`} className={styles.Item}>
            For цикъл
          </Link>
        </p>
        <p>
          <Link href={`/Languages/PY/Classes`} className={styles.Item}>
            Класове и обекти
          </Link>
        </p>
        <p>
          <Link href={`/Languages/PY/Math`} className={styles.Item}>
            Математика
          </Link>
        </p>
      </div>
    </main>
  );
}
