import Image from "next/image";
import Link from "next/link";
import styles from "./not-found.module.css";
import logo from "../public/seven-star-logo.png";

export default function NotFound() {
    return (
        <main className={styles.scene}>
            <div className={styles.badgeWrap}>
                <span className={styles.badgeRing} aria-hidden="true" />
                <Image
                    src={logo}
                    alt="Seven Star Security Service Pvt. Ltd."
                    className={styles.badge}
                    priority
                />
            </div>

            <p className={styles.eyebrow}>
                <span className={styles.recDot} aria-hidden="true" />
                Checkpoint log — no signal found
            </p>

            <div className={styles.numberStage}>
                <h1 className={styles.numberBase} aria-hidden="true">
                    404
                </h1>
                <h1 className={styles.numberLit}>404</h1>
                <span className={styles.beam} aria-hidden="true" />
            </div>

            <h2 className={styles.headline}>This page isn&apos;t on our beat</h2>

            <p className={styles.body}>
                Our guards swept every checkpoint but couldn&apos;t locate this
                location. It may have been moved, renamed, or stood down from duty.
            </p>

            <p className={styles.devanagari}>पृष्ठ फेला परेन — page not found</p>

            <Link href="/" className={styles.cta}>
                Return to base →
            </Link>

            <p className={styles.footer}>Incident #404 · Status: Unresolved</p>
        </main>
    );
}
