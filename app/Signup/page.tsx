import styles from "./page.module.css"
import Form from "./form"
import Script from "next/script"

export default function Page() {
    const form = () => {
        return (
            <form action="/api/form" method="post" className={styles.signUp_Form_Container}>

                <div className={styles.signUp_Form_Container_Item}>
                    <div className={styles.signUp_Form_Container_Item_Cut}></div>
                    <input type="text" id="first" name="first" placeholder=" " />
                    <label htmlFor="first" className={styles.signUp_Form_Container_Item_Placeholder}>First Name</label>

                </div>

                <div className={styles.signUp_Form_Container_Item}>
                    <div className={styles.signUp_Form_Container_Item_Cut}></div>
                    <input type="text" id="last" name="last" placeholder=" " />
                    <label htmlFor="last" className={styles.signUp_Form_Container_Item_Placeholder}>Last Name</label>
                </div>

                <div className={styles.signUp_Form_Container_Item}>
                    <div className={styles.signUp_Form_Container_Item_Cut}></div>
                    <input type="text" id="userName" name="userName" placeholder=" " />
                    <label htmlFor="userName" className={styles.signUp_Form_Container_Item_Placeholder}>User Name</label>
                </div>

                <div className={styles.signUp_Form_Container_Item}>
                    <div className={styles.signUp_Form_Container_Item_Cut}></div>
                    <input type="text" id="house" name="house" placeholder=" " required pattern="^[a-z0-9]+$" />
                    <label htmlFor="house" className={styles.signUp_Form_Container_Item_Placeholder}> House Name</label>
                </div>

                <div className={styles.signUp_Form_Container_Item}>
                    <div className={styles.signUp_Form_Container_Item_Cut}></div>
                    <input type="email" id="email" name="email" placeholder=" " required />
                    <label htmlFor="email" className={styles.signUp_Form_Container_Item_Placeholder}>Email</label>
                </div>

                <div className={styles.signUp_Form_Container_Item}>
                    <div className={styles.signUp_Form_Container_Item_Cut}></div>
                    <input type="password" id="password" name="password" placeholder=" " required minLength={8}/>
                    <label htmlFor="password" className={styles.signUp_Form_Container_Item_Placeholder}>Password</label>
                </div>

                <div className={styles.signUp_Form_Container_Item}>
                    <div className={styles.signUp_Form_Container_Item_Cut}></div>
                    <input type="password" id="repassword" name="repassword" placeholder=" " required minLength={8}/>
                    <label htmlFor="repassword" className={styles.signUp_Form_Container_Item_Placeholder}>Re-enter pasword</label>
                </div>

                <div className={styles.signUp_Submit_Section}>
                    <div className={styles.signUp_Submit_Section_buttons}>
                        <button className={styles.signUp_Not_Quite_Display}>Not Quite</button>
                        <button type="submit" className={styles.signUp_Submit_Section_SignUp_Button}>Sign-up</button>
                    </div>
                    <h2 className={styles.signUp_Error_Message_Display}>Error message:</h2>
                </div>
            </form>
        )


    }

    <script>
        function ValidateFormWithJS() {

        }
    </script>

    return (
        <main className={styles.signUp_Page_Container}>
            <h1>Create an Account</h1>
            {form()}

        </main>
    )
}