import styles from "./page.module.css"

export function handler(req, res) {
    // Get data submitted in request's body.
    const body = req.body
  
     // Optional logging to see the responses
  // in the command line where next.js app is running.
  console.log('body: ', body)

  // Guard clause checks for first and last name,
  // and returns early if they are not found
  if (!body.first || !body.last) {
    // Sends a HTTP bad request error code
    return res.status(400).json({ data: 'First or last name not found' })
  }

  // Found the name.
  // Sends a HTTP success code
  res.status(200).json({ data: `${body.first} ${body.last} ${body.userName} ${body.house} ${body.email} ${body.password}` })
}

export default function Form() {
    return (
      <form action="/api/form" method="post" className={styles.signUp_Form_Container}>

        <div className={styles.first_Name}>
        <label htmlFor="first">First Name</label>
        <input type="text" id="first" name="first" placeholder="First name" />
        </div>

        <div className={styles.last_Name}>
        <label htmlFor="last">Last Name</label>
        <input type="text" id="last" name="last" placeholder="Last name" />
        </div>

        <div className={styles.user_Name}>
        <label htmlFor="userName">User Name</label>    
        <input type="text" id="userName" name="userName" placeholder="User Name" />
        </div>

        <div className={styles.house_Name}>
        <label htmlFor="house"> House Name</label>
        <input type="text"id="house" name="house" placeholder="House Name"  required/>
        </div>

        <div className={styles.email}>
        <label htmlFor="email">Email</label>
        <input type="text" id="email" name="email" placeholder="Email"  required/>
        </div>

        <div className={styles.password}>
        <label htmlFor="password">Password</label>
        <input type="text" id="password" name="password" placeholder="Password"  required/>
        </div>

        <div className={styles.renter_Password}>
        <label htmlFor="repassword">Re-enter paswword</label>
        <input type="text" id="repassword" name="repassword" placeholder="Re-enter Password" required/>
        </div>

        <div className={styles.submit_Section}>
        <button type="submit">Sign-up</button>
        <h2>Error message</h2>
        </div>
      </form>
    )
  }
  