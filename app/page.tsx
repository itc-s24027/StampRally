import styles from "./page.module.css";
import LoginButton from "@/app/_components/LoginButton";

export default function Home() {
  return (
    <div className={styles.page}>
        <LoginButton />
    </div>
  );
}
