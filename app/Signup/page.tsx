'use client';
import styles from "./page.module.css";
import { useState } from "react";

export default function Page() {

    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [houseError, setHouseError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [userPasswordError, setUserPasswordError] = useState(false);
    const [userRePasswordError, setUserRePasswordError] = useState(false);
    const hasError = houseError || emailError || userPasswordError || userRePasswordError;

    const validateHouseName = (e) => {
        const alphaNumericCheck = /^[a-z\d\-_\s]+$/i;
        if (!alphaNumericCheck.test(e.target.value)) {
            setHouseError(true);
            return;
        }
        setHouseError(false);
    }

    const validateEmail = (e) => {
        const emailValidation = /^(([^<>()[\]\\.,;: \s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!(emailValidation.test(e.target.value))) {
            setEmailError(true);
            return;
        }
        setEmailError(false);
    }

    const validateUserPassword = (e) => {
        if (e.target.value.length < 8) {
            console.log('should be erroring')
            setUserPasswordError(true);
            setRePassword(e.target.value);
            return;
        }
        setUserPasswordError(false);
        setRePassword(e.target.value)
    }

    const validateUserRePassword = (e) => {
        if (e.target.value !== rePassword) {
            setUserRePasswordError(true);
            return;
        }
        setUserRePasswordError(false);
    }



    const form = () => {
        return (
            // Signup Form Ui
            <form action="/api/form" method="post" className={styles.signUpFormContainer}>

                <div className={styles.signUpFormContainerItem}>

                    <input type="text" id="firstName" name="firstName" placeholder=" " />
                    <label htmlFor="firstName" className={styles.signUpFormContainerItemPlaceholder}>First Name</label>

                </div>

                <div className={styles.signUpFormContainerItem}>
                    <input type="text" id="lastName" name="lastName" placeholder=" " />
                    <label htmlFor="lastName" className={styles.signUpFormContainerItemPlaceholder}>Last Name</label>
                </div>

                <div className={styles.signUpFormContainerItem}>
                    <input type="text" id="userName" name="userName" placeholder=" " />
                    <label htmlFor="userName" className={styles.signUpFormContainerItemPlaceholder}>User Name</label>
                </div>

                <div className={styles.signUpFormContainerItem}>
                    <input type="text" id="houseName" name="houseName" placeholder=" " onChange={(e) => validateHouseName(e)} style={{ background: houseError ? "#E72727" : "white" }} required pattern="/^[a-z\d\-_\s]+$/i" />
                    <label htmlFor="houseName" className={styles.signUpFormContainerItemPlaceholder}> House Name</label>
                </div>

                <div className={styles.signUpFormContainerItem}>
                    <input type="email" id="userEmail" name="userEmail" placeholder=" " onChange={(e) => validateEmail(e)} style={{ background: emailError ? "#E72727" : "white" }} required />
                    <label htmlFor="userEmail" className={styles.signUpFormContainerItemPlaceholder}>Email</label>
                </div>

                <div className={styles.signUpFormContainerItem}>
                    <input type="password" id="userPassword" name="userPassword" placeholder=" " onChange={(e) => validateUserPassword(e)} style={{ background: userPasswordError ? "#E72727" : "white" }} required minLength={8} />
                    <label htmlFor="userPassword" className={styles.signUpFormContainerItemPlaceholder}>Password</label>
                </div>

                <div className={styles.signUpFormContainerItem}>
                    <input type="password" id="rePassword" name="rePassword" placeholder=" " onChange={(e) => validateUserRePassword(e)} style={{ background: userRePasswordError ? "#E72727" : "white" }} required minLength={8} />
                    <label htmlFor="rePassword" className={styles.signUpFormContainerItemPlaceholder}>Re-Enter pasword</label>
                </div>


                {/* Error message display  */}
                <div className={styles.signUpSubmitSection}>

                    <div className={styles.signUpSubmitSectionbuttons}>

                        {!hasError && (
                            <button type="submit" className={styles.signUpSubmitSectionSignUpButton}>Sign-up</button>
                        )}
                        {hasError && (
                            <button className={styles.signUpNotQuiteDisplay}>Not Quite</button>
                        )}
                    </div>
                    <div className={styles.signUpErrorMessageDisplay} id="signUpErrorMessageId">
                        {houseError && (
                            <h2>Error: House names must contain only alpha numeric charectars</h2>
                        )}
                        {emailError && (
                            <h2 >Error: Invaild Email</h2>
                        )}
                        {userPasswordError && (
                            <h2 >Error: Passwords need to be atleast 8 characters long</h2>
                        )}
                        {userRePasswordError && (
                            <h2 >Error: Passwords do not match</h2>
                        )}
                    </div>
                </div>
            </form>
        )
    }


    // Returns Signup page container
    return (
        <main className={styles.signUpPageContainer}>
            <h1>Create an Account</h1>
            {form()}

        </main>
    )
}