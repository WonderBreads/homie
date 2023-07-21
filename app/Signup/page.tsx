'use client';
import styles from "./page.module.css";
import { MouseEvent, useState } from "react";
import PocketBase from "pocketbase";
import { FirebaseError, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import firebaseAuth from "@/config";
import { useRouter } from "next/navigation";
import { error } from "console";
import { Elsie } from "@next/font/google";

export default function Page() {

    const router = useRouter();
    const [password, setPassword] = useState<string>("");
    const [rePassword, setRePassword] = useState("")
    const [userNameError, setUserNameError] = useState(false);
    const [displayNameError, setDisplayNameError] = useState(false);
    const [houseError, setHouseError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [userPasswordError, setUserPasswordError] = useState(false);
    const [userRePasswordError, setUserRePasswordError] = useState(false);
    const [firebaseAuthError, setFirebaseAuthError] = useState(false);
    const [firebaseAuthErrorMessage, setFirebaseAuthErrorMessage] = useState("");
    const [dataBaseError, setDataBaseError] = useState(false);
    const [dataBaseErrorMessage, setDataBaseErrorMessage] = useState("");
    const [submitClicKCounter, setSubmitClickCounter] = useState(0);
    const hasError = userNameError || displayNameError || houseError || emailError || userPasswordError || userRePasswordError || firebaseAuthError || dataBaseError;

    const [email, setEmail] = useState("");
    const [houseName, setHouseName] = useState("");
    const [userName, setUserName] = useState("");
    const [displayName, setDisplayName] = useState("");

    const [firebaseErrorMessage, setFirebaseErrorMessage] = useState("");

    // const pb = new PocketBase('https://127.0.0.1.8090/');
    // pb.autoCancellation(false);


    const validateDisplayName = (e: ChangeEvent<HTMLInputElement>) => {
        if ((e.target.value === null || e.target.value.trim() === "")) {
            setDisplayNameError(true);
        }
        else{
        setDisplayNameError(false);
        setDisplayName(e.target.value);
        }
    }

    const validateUserName = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === null || e.target.value.trim() === "" ) {
            setUserNameError(true);
        }
        else {
        setUserNameError(false);
        setUserName(e.target.value);
        }
    }

    const validateHouseName = (e: SetStateAction<string> | ChangeEvent<HTMLInputElement>) => {
        const alphaNumericCheck = /^[a-z\d\-_\s]+$/i;
        if (!alphaNumericCheck.test(e.target.value)) {
            if (!alphaNumericCheck.test(houseName) || houseName === null || houseName.trim() === "")
            setHouseError(true);
            
            else
            setHouseError(false);
        }
        else{
        setHouseError(false);
        setHouseName(e.target.value);
        }
    }

    const validateEmail = (e: ChangeEvent<HTMLInputElement>) => {
        const emailValidation = /^(([^<>()[\]\\.,;: \s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if ((!(emailValidation.test(e.target.value)))) {
            setEmailError(true);
        }
        else {
        setEmailError(false);
        setEmail(e.target.value);
        setFirebaseAuthError(false);
        }
    }

    const validateUserPassword = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length < 8) {
            setUserPasswordError(true);
        }
        else{
        setUserPasswordError(false);
        setPassword(e.target.value)
        }
    }

    const validateUserRePassword = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value !== password) {
            setUserRePasswordError(true);
        }
        else{
        setRePassword(e.target.value);
        setUserRePasswordError(false);
        }
    }

    // async function postJSON(data: { username: string; firebaseAuth?: string; email?: string; emailVisibility?: boolean; password?: string; passwordConfirm?: string; display_name?: string; housename?: string; }) {
    //     try {
    //         const response = await fetch("http://localhost:3005/user", {
    //             method: "POST", // or 'PUT'
    //             headers: {
    //                 'Access-Control-Allow-Origin': '*',
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify(data),
    //         });
    //         return response
    //     } catch (error) {
    //         console.error("Error:", error);
    //     }
    // }

    const emptyValueCheck = (e) => {
        if (e === null || e.trim() === "") {
            return true;
        }
        return false
    }



    const signUp = async (e: MouseEvent<HTMLButtonElement, MouseEvent>) => {
        // example create data
        e.preventDefault();

        if (emptyValueCheck(displayName) ) {
            return setDisplayNameError(true);

        }
        else if (emptyValueCheck(userName)) {
            return setUserNameError(true);
        }
        else if (emptyValueCheck(houseName)) {
            return setHouseError(true);
        }
        else if (emptyValueCheck(email)) {
            return setEmailError(true);
        }
        else if (emptyValueCheck(password)) {
            return setUserPasswordError(true);
        }
        else if (emptyValueCheck(rePassword) || (rePassword !== password)) {
            return setUserRePasswordError(true);
        }
        // await pb.collection('users').create({ user });
         try {
           await createUserWithEmailAndPassword(firebaseAuth, email, password)
                .then(async userCredential => {
                    console.log("DisplayName Error: " + displayNameError + " username Error: " + userNameError + " houseError: " + houseError);
                    // Signed in 
                    setFirebaseAuthError(false);
                    setEmailError(false);
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
                                firebaseAuthID: 1111111,
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
                        if (response?.ok) {
                            setSubmitClickCounter(1);
                            document.getElementById(id);
                            // document.getElementById("SignUpSubmitButton")?.removeAttribute("disabled") ;
                            router.push("/");
                            setDataBaseError(false);
                        }

                    } catch (err) {
                        console.error(err.code);
                        setDataBaseError(true);
                        setDataBaseErrorMessage(err + "");
                        console.log("error: ")
                        console.log(err);
                    }
                }
                )
        }
        catch (err) {
            console.log(err);
            setFirebaseAuthError(true);
            setEmailError(true);
            setFirebaseAuthErrorMessage(err.code);
        }

        // console.log("API Response: ", response?.json());

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
            <form method="post" className={styles.signUpFormContainer} >

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
                    <input type="text" id="userName" name="userName" placeholder=" " onChange={(e) => validateUserName(e)} style={{ background: userNameError ? "#E72727" : "white" }} required />
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
                        {hasError && (
                            <button className={styles.signUpNotQuiteDisplay} disabled>Not Quite</button>
                        )}
                        {!hasError &&  (
                            <button type="button"  id="SignUpSubmitButton" className={styles.signUpSubmitSectionSignUpButton} onClick={ (e) => {signUp(e) }}>Sign-up</button>
                        )}
                    </div>
                    <div className={styles.signUpErrorMessageDisplay} id="signUpErrorMessageId">
                        {displayNameError && (
                            <h2>Error: Display Name required</h2>
                        )}
                        {userNameError && (
                            <h2>Error: User Name required</h2>
                        )}
                        {houseError && (
                            <h2>Error: House names is requires and must contain only alpha numeric charectars</h2>
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
                        {dataBaseError && (
                            <h2>{dataBaseErrorMessage}</h2>
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