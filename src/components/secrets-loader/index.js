import { useState } from "react";
import styles from "./style.module.css";

export default function SecretsLoader({onHide}) {
    const [isHidden, setIsHidden] = useState(false);
    const [isOpacityZero, setIsOpacityZero] = useState(false);
    function toggleComponent(){
        setTimeout(() => setIsHidden((current) => !current), 1000);
        setIsOpacityZero((current) => !current);
        onHide();
    }
    return (
        <div className={`z-10 h-screen w-screen flex flex-col justify-center items-center bg-black transition-all duration-1000 ${isOpacityZero ? "opacity-0" : "opacity-100"} ${isHidden ? "hidden" : "block"}`} >
            <div className={styles.book}>
                <div className={styles.book__pgShadow}></div>
                <div className={styles.book__pg}></div>
                <div className={`${styles.book__pg} ${styles.book__pg2}`}></div>
                <div className={`${styles.book__pg} ${styles.book__pg3}`}></div>
                <div className={`${styles.book__pg} ${styles.book__pg4}`}></div>
                <div className={`${styles.book__pg} ${styles.book__pg5}`}></div>
            </div>
            <div className="mt-10">Loading Secret Notes...</div>
            <p className="text-gray-600 text-xs text-center">If the app don't load than check your internet connection <br/> or <br/> <div className="text-blue-500 cursor-pointer" onClick={toggleComponent}>see the loading website</div></p>
        </div>
    )
}