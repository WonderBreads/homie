import styles from "./page.module.css"

export default function Page() {
    return (
        <main className={styles.loginMain}>
            <section className={styles.loginContent}>
            <h1>Sign up Page</h1>
            <button className={styles.loginButton}> Login </button>
            <a href="">Dont have an account?</a>
            </section>
        </main>
    )
}