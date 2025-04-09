'use client'
import { useRouter } from "next/navigation";
import styles from "./page.module.css";

export default function Home() {
  const router = useRouter()
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <button className = {styles.button} onClick = {() => router.push('/products')}>products</button>
        <button className = {styles.button} onClick = {() => router.push('/carts')}>carts</button>
      </main>
    </div>
  );
}
