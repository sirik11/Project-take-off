import React,{useState} from 'react'
import styles from './login.module.css'
import {useForm} from 'react-hook-form'
import {useDispatch } from 'react-redux'
import {GoogleSignInAPIRedirect} from './../../firebase'
import {useNavigate} from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useUser } from '../../features/contexts/UserContext'
import LogoContainer from "./../LogoContainer"
import Divider from "../Divider"
import Button from 'react-bootstrap/Button';



const Login = () => {

  const { user, setUser } = useUser();

  const {register, handleSubmit, formState} = useForm()
  const {errors} = formState

  const dispatch = useDispatch()
  const navigate = useNavigate()

  if (user) {
    navigate("/feed");
    return null; // or you can return a redirect or some message
  }

  const onSubmit = (data) => {
    const auth = getAuth();
  
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
          setUser(userCredential.user);
          navigate("/feed");
      })
      .catch((error) => {
          console.error("Error signing in: ", error.message);
          alert("Error signing in: " + error.message);
      });
  }


  const handleGoogleSignIn = () =>{
    dispatch(GoogleSignInAPIRedirect())
    navigate("/feed")
  }


  const [showPassword, setShowPassword] = useState(false);
  return (
    // <div>
    //    <LogoContainer />
    //    <div>
    //     <h1>Welcome back, We missed you</h1>
    //    </div>
    //     <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)} noValidate>
    //       <div className={styles.formContent}>
    //       <label>Email: </label>
    //       <input type='email' id='email' className={styles.formInput}
    //        {...register('email',{
    //         required:{
    //           value: true,
    //           message : "Email is required!"
    //         },
    //         pattern:{
    //           value : /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    //           message : "Invalid email format" 
    //         }
    //        })}></input>
    //       <p className={styles.errors}>{errors.email?.message}</p>
    //       <label>Password: </label>
    //       <input type='password' id='password' className={styles.formInput}
    //        {...register('password',{
    //         required:{
    //           value : true,
    //           message : "Password is required!"
    //         },
    //           minLength:{
    //             value : 8 ,
    //             message : "Password must be at least 8 characters long."
    //           }
            
    //       })}></input>
    //       <p className={styles.errors}>{errors.password?.message}</p>
    //       <button className={styles.signInBtn}>Sign In</button>
    //       {/* <Button className={styles.signInBtn}>Sign In</Button> */}
    //       </div>
    //     </form>


    //   <Divider />
    //     <div className={styles.googleSignIn}>
    //      <img src='/public/flat-color-icons_google.svg' alt='google logo' />
    //      <button onClick={handleGoogleSignIn}> Sign in with Google</button>
    //     </div>
      
    // </div>
    <>
     <LogoContainer/>
    <div className={styles.registerContainer}>
      <h1>Welcome back, We missed you</h1>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required!",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Invalid email format",
              },
            })}
          />
          <p className={styles.error}>{errors.email?.message}</p>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="password">Password:</label>
          <div className={styles.passwordContainer}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              {...register("password", {
                required: "Password is required!",
                pattern: {
                  value:
                    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,}$/,
                  message:
                    "Password must contain at least one lowercase letter, one uppercase letter, one special character, and at least 8 digits without spaces.",
                },
              })}
              className={styles.passwordInput}
            />
          </div>
          <p className={styles.error}>{errors.password?.message}</p>
        </div>

       
          <Button id="registerButton" variant="primary" size="lg" className={styles.registerBtn} type="submit"
          style={{backgroundColor : "#7F61A9"}}>
            Sign In
          </Button>

          <Divider />

          <div className={styles.googleSignIn}>
            <img src='/public/flat-color-icons_google.svg' alt='google logo' />
            <button onClick={handleGoogleSignIn} className={styles.GSignInBtn}> Sign in with Google</button>
          </div>




      </form>
    </div>
    </>
  )
}

export default Login

