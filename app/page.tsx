import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main >
      <section className={styles.loginContent}>
            <h1>Homie</h1>
            <button className={styles.loginButton}> Login </button>
            <a href="">Dont have an account?</a>
            </section>
    </main>
  )
}
