'use client';
import styles from "./page.module.css";
import { MouseEvent, useState } from "react";
import PocketBase from "pocketbase";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebaseAuth from "@/config";
import { useRouter } from "next/navigation";

export default function Page() {

    const router = useRouter();
    const [password, setPassword] = useState<string>("");
    const [rePassword, setRePassword] = useState("")
    const [displayNameError, setDisplayNameError] = useState(false);
    const [houseError, setHouseError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [userPasswordError, setUserPasswordError] = useState(false);
    const [userRePasswordError, setUserRePasswordError] = useState(false);
    const [firebaseAuthError, setFirebaseAuthError] = useState(false);
    const [firebaseAuthErrorMessage, setFirebaseAuthErrorMessage] = useState("");
    const hasError = houseError || emailError || userPasswordError || userRePasswordError || firebaseAuthError;

    const [email, setEmail] = useState("");
    const [houseName, setHouseName] = useState("");
    const [userName, setUserName] = useState("");
    const [displayName, setDisplayName] = useState("");

    const [firebaseErrorMessage, setFirebaseErrorMessage] = useState("");

    // const pb = new PocketBase('https://127.0.0.1.8090/');
    // pb.autoCancellation(false);


    const validateDisplayName = (e: ChangeEvent<HTMLInputElement>) => {
        setDisplayName(e.target.value);
    }

    const validateUserName = (e: ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);
    }

    const validateHouseName = (e: SetStateAction<string> | ChangeEvent<HTMLInputElement>) => {
        const alphaNumericCheck = /^[a-z\d\-_\s]+$/i;
        if (!alphaNumericCheck.test(e.target.value)) {
            setHouseError(true);
            return;
        }
        setHouseError(false);
        setHouseName(e.target.value);
    }

    const validateEmail = (e: ChangeEvent<HTMLInputElement>) => {
        const emailValidation = /^(([^<>()[\]\\.,;: \s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (!(emailValidation.test(e.target.value))) {
            setEmailError(true);
            return;
        }
        setEmailError(false);
        setEmail(e.target.value);
    }

    const validateUserPassword = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length < 8) {
            setUserPasswordError(true);
            return;
        }
        setUserPasswordError(false);
        setPassword(e.target.value)
        setRePassword(e.target.value)
    }

    const validateUserRePassword = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value !== rePassword) {
            setUserRePasswordError(true);
            return;
        }
        setUserRePasswordError(false);
    }

    async function postJSON(data: { username: string; firebaseAuth?: string; email?: string; emailVisibility?: boolean; password?: string; passwordConfirm?: string; display_name?: string; housename?: string; }) {
        try {
            const response = await fetch("http://localhost:3005/user", {
                method: "POST", // or 'PUT'
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            return response
        } catch (error) {
            console.error("Error:", error);
        }
    }




    const signUp = async (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {

        // example create data

        // await pb.collection('users').create({ user });

        createUserWithEmailAndPassword(firebaseAuth, email, password)
            .then(async (userCredential) => {
                // Signed in 
                console.log("Firebase auth: " + userCredential.user.uid + "   Email: " + email + "  Password:  " + password + " display name: " + displayName + " username: " + userName + " house name : " + houseName)
                const user = userCredential.user;

                const uuid = user.uid;

                // ...

                // fetch("http://localhost:3005/user", {
                //     method: "POST", // or 'PUT'
                //     headers: {
                //         'Access-Control-Allow-Origin': '*',
                //         "Content-Type": "application/json",
                //     },
                //     body: JSON.stringify(userCharacteristics),
                // }).then(res => console.log("res ", res))
                // .catch(error => console.log("error: ", error));

                try {
                    const response = await fetch("http://localhost:3005" + "/user", {
                        method: "POST", // or 'PUT'
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            firebaseAuthID: uuid,
                            userName: userName,
                            email: email,
                            emailVisibility: true,
                            password: password,
                            displayName: displayName,
                            housename: houseName
                        }),
                    });
                    const json = await response.json();
                    console.log(json);
                } catch (err) {
                    console.log("error: ")
                    console.log(err);
                }

            }
            )




        // console.log("API Response: ", response?.json());
        // if (response?.ok) {
        //     router.push("/");
        // }
        // })

        // .catch((error) => {
        //     const errorCode = error.code;
        //     const errorMessage = error.message;
        //     console.log("inside catch sstatement")
        //     console.log(errorMessage);
        //     setFirebaseAuthError(true)
        //     setFirebaseAuthErrorMessage(errorMessage);
        //     // ..
        // });

    }



    const form = () => {
        return (
            // Signup Form Ui
            <form method="post" className={styles.signUpFormContainer}>

                <div className={styles.signUpFormContainerItem}>

                    <input type="text" id="displayName" name="displayName" placeholder=" " onChange={(e) => validateDisplayName(e)} style={{ background: displayNameError ? "#E72727" : "white" }} required />
                    <label htmlFor="firstName" className={styles.signUpFormContainerItemPlaceholder}>Display Name</label> 

                </div>

                <div className={styles.signUpFormContainerItem}>

                    <input type="text" id="firstName" name="firstName" placeholder=" " />
                    <label htmlFor="firstName" className={styles.signUpFormContainerItemPlaceholder}>First Name</label>

                </div>

                <div className={styles.signUpFormContainerItem}>
                    <input type="text" id="lastName" name="lastName" placeholder=" " />
                    <label htmlFor="lastName" className={styles.signUpFormContainerItemPlaceholder}>Last Name</label>
                </div>

                <div className={styles.signUpFormContainerItem}>
                    <input type="text" id="userName" name="userName" placeholder=" " onChange={(e) => validateUserName(e)} />
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
                            <button type="button" className={styles.signUpSubmitSectionSignUpButton} onClick={(e) => { signUp(e) }}>Sign-up</button>
                        )}
                        {hasError && (
                            <button className={styles.signUpNotQuiteDisplay}>Not Quite</button>
                        )}
                    </div>
                    <div className={styles.signUpErrorMessageDisplay} id="signUpErrorMessageId">
                        {displayNameError  && (
                            <h2>Error: Display Name</h2>
                        )}
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
                        {firebaseAuthError && (
                            <h2>{firebaseAuthErrorMessage}</h2>
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