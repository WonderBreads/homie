'use client';
import styles from "./page.module.css"
import Form from "./form"
import { useState, useEffect } from "react";

export default function Page() {

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        houseName: "",
        userEmail: "",
        userPassword: ""
    });
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");
    const [houseError, setHouseError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [userPasswordError, setUserPasswordError] = useState(false);
    const [userRePasswordError, setUserRePasswordError] = useState(false);
    const hasError = houseError || emailError || userPasswordError || userRePasswordError;

    // Handles the Signup form changes and validation
    const handleInputChange = (e) => {
        setUser(prevState => ({ ...prevState, [e.target.name]: e.target.value }))

        let alphaNumericCheck = /^[a-z0-9]+$/i;
        let emailValidation = /^(([^<>()[\]\\.,;: \s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (e.target.name == "houseName" && !alphaNumericCheck.test(e.target.value) && !houseError) {
            setHouseError(true);
            document.getElementById('houseName')!.style.background = "red";
        }
        else if (e.target.name == "houseName" && alphaNumericCheck.test(e.target.value) && houseError) {
            setHouseError(false);
            document.getElementById('houseName')!.style.background = "white";
        }

        if (e.target.name == "userEmail" && !(emailValidation.test(e.target.value))) {
            setEmailError(true);
            document.getElementById('userEmail')!.style.background = "red";
        }
        else if (e.target.name == "userEmail" && emailValidation.test(e.target.value)) {
            setEmailError(false);
            document.getElementById('userEmail')!.style.background = "white";
        }

        if (e.target.name == "userPassword" && (e.target.value.length < 8)) {
            setUserPasswordError(true);
            setPassword(e.target.value);
            document.getElementById('userPassword')!.style.background = "red";

        }
        else if (e.target.name == "userPassword" && (e.target.value.length >= 8)) {
            setUserPasswordError(false);
            setPassword(e.target.value);
            document.getElementById('userPassword')!.style.background = "white";
        }

        if (e.target.name == "rePassword" && e.target.value === password) {
            setUserRePasswordError(false);
            setRePassword(e.target.value);
            document.getElementById('rePassword')!.style.background = "white";
        }
        else if (e.target.name == "rePassword" && e.target.value !== password) {
            setUserRePasswordError(true);
            setRePassword(e.target.value);
            document.getElementById('rePassword')!.style.background = "red";
        }

    }

    const form = () => {
        return (
            // Signup Form Ui
            <form action="/api/form" method="post" className={styles.signUpFormContainer}>

                <div className={styles.signUpFormContainerItem}>

                    <input type="text" id="firstName" name="firstName" placeholder=" " onChange={handleInputChange} />
                    <label htmlFor="firstName" className={styles.signUpFormContainerItemPlaceholder}>First Name</label>

                </div>

                <div className={styles.signUpFormContainerItem}>
                    <input type="text" id="lastName" name="lastName" placeholder=" " onChange={handleInputChange} />
                    <label htmlFor="lastName" className={styles.signUpFormContainerItemPlaceholder}>Last Name</label>
                </div>

                <div className={styles.signUpFormContainerItem}>
                    <input type="text" id="userName" name="userName" placeholder=" " onChange={handleInputChange} />
                    <label htmlFor="userName" className={styles.signUpFormContainerItemPlaceholder}>User Name</label>
                </div>

                <div className={styles.signUpFormContainerItem}>
                    <input type="text" id="houseName" name="houseName" placeholder=" " required pattern="^[a-z0-9]+$" onChange={handleInputChange} />
                    <label htmlFor="houseName" className={styles.signUpFormContainerItemPlaceholder}> House Name</label>
                </div>

                <div className={styles.signUpFormContainerItem}>
                    <input type="email" id="userEmail" name="userEmail" placeholder=" " onChange={handleInputChange} required />
                    <label htmlFor="userEmail" className={styles.signUpFormContainerItemPlaceholder}>Email</label>
                </div>

                <div className={styles.signUpFormContainerItem}>
                    <input type="password" id="userPassword" name="userPassword" placeholder=" " onChange={handleInputChange} required minLength={8} />
                    <label htmlFor="userPassword" className={styles.signUpFormContainerItemPlaceholder}>Password</label>
                </div>

                <div className={styles.signUpFormContainerItem}>
                    <input type="password" id="rePassword" name="rePassword" placeholder=" " onChange={handleInputChange} required minLength={8} />
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