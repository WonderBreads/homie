'use client';
import styles from "./page.module.css";
import { useState } from "react";
import PocketBase from "pocketbase";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebaseAuth from "@/firebase";

export default function Page() {

    const [password, setPassword] = useState<string>("");
    const [rePassword, setRePassword] = useState("");
    const [houseError, setHouseError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [userPasswordError, setUserPasswordError] = useState(false);
    const [userRePasswordError, setUserRePasswordError] = useState(false);
    const hasError = houseError || emailError || userPasswordError || userRePasswordError;

    const [email, setEmail] = useState("");
    const [houseName, setHouseName] = useState("");
    const [userName, setUserName] = useState("");
    const [displayName, setDisplayName] = useState("");

    const [firebaseErrorMessage, setFirebaseErrorMessage] = useState("");

    const pb = new PocketBase('https://127.0.0.1.8090/');
    pb.autoCancellation(false);


    const validateDisplayName = (e) => {
        setDisplayName(e.target.name);
    }

    const validateUserName = (e) => {
        setUserName(e.target.value);
    }

    const validateHouseName = (e) => {
        const alphaNumericCheck = /^[a-z\d\-_\s]+$/i;
        if (!alphaNumericCheck.test(e.target.value)) {
            setHouseError(true);
            return;
        }
        setHouseError(false);
        setHouseName(e);
    }

    const validateEmail = (e) => {
        const emailValidation = /^(([^<>()[\]\\.,;: \s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!(emailValidation.test(e.target.value))) {
            setEmailError(true);
            return;
        }
        setEmailError(false);
        setEmail(e.target.value);
    }

    const validateUserPassword = (e) => {
        if (e.target.value.length < 8) {
            setUserPasswordError(true);
            return;
        }
        setUserPasswordError(false);
        setPassword(e.target.value)
        setRePassword(e.target.value)
    }

    const validateUserRePassword = (e) => {
        if (e.target.value !== rePassword) {
            setUserRePasswordError(true);
            return;
        }
        setUserRePasswordError(false);
    }


    const signUp = async (e) => {

        console.log("Firebase auth: " + firebaseAuth + "   Email: " + email  + "  Password:  " + password)
        // example create data
        const user = {
            username: userName,
            email: email,
            emailVisibility: true,
            password: password,
            passwordConfirm: rePassword,
            display_name: displayName,
            house_name: houseName
        };

        // await pb.collection('users').create({ user });

        createUserWithEmailAndPassword(firebaseAuth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user1 = userCredential.user;
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });

    }



    const form = () => {
        return (
            // Signup Form Ui
            <form method="post" className={styles.signUpFormContainer}>

                <div className={styles.signUpFormContainerItem}>

                    <input type="text" id="firstName" name="firstName" placeholder=" " onChange={(e) => validateDisplayName(e)} />
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
                    <input type="text" id="houseName" name="houseName" placeholder=" " onChange={(e) => validateHouseName(e)} style={{ background: houseError ? "#E72727" : "white" }} required />
                    <label htmlFor="houseName" className={styles.signUpFormContainerItemPlaceholder}> House Name</label>
                </div>

                <div className={styles.signUpFormContainerItem}>
                    <input type="email" id="userEmail" name="userEmail" placeholder=" " onChange={(e) => validateEmail(e)} style={{ background: emailError ? "#E72727" : "white" }} required />
                    <label htmlFor="userEmail" className={styles.signUpFormContainerItemPlaceholder}>Email</label>
                </div>

                <div className={styles.signUpFormContainerItem}>
                    <input type="password" id="userPassword" name="userPassword" placeholder=" " onChange={(e) => validateUserPassword(e)} style={{ background: userPasswordError ? "#E72727" : "white" }} required minLength={7} />
                    <label htmlFor="userPassword" className={styles.signUpFormContainerItemPlaceholder}>Password</label>
                </div>

                <div className={styles.signUpFormContainerItem}>
                    <input type="password" id="rePassword" name="rePassword" placeholder=" " onChange={(e) => validateUserRePassword(e)} style={{ background: userRePasswordError ? "#E72727" : "white" }} required minLength={7} />
                    <label htmlFor="rePassword" className={styles.signUpFormContainerItemPlaceholder}>Re-Enter pasword</label>
                </div>


                {/* Error message display  */}
                <div className={styles.signUpSubmitSection}>

                    <div className={styles.signUpSubmitSectionbuttons}>

                        {!hasError && (
                            <button type="submit" className={styles.signUpSubmitSectionSignUpButton} onClick={(e) => { signUp; console.log("Firebase auth: " + firebaseAuth + "   Email: " + email  + "  Password:  " + password) }}>Sign-up</button>
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