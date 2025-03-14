import React, { use, useContext, useState } from "react";
import Layout from "../../Layout/Layout";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./signUp.module.css";
import logo from "../../../assets/Images/signUp/images.png";
import { Type } from "../../../Utils/action.type";
import { auth } from "../../../Utils/firebase";
import {ClipLoader } from 'react-spinners'


import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { ParentContext } from "../../DataProvider/DataProvider";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navStateData=useLocation();

  // console.log(navStateData)

  const [{ user }, dispatch] = useContext(ParentContext);
const navigate=useNavigate()

  const [isloading, setIsLoading] = useState({
    signIn: false,
    signUp: false,
  });

  // console.warn(email,password)
  // console.log(user);

  // auth handelr fun
  const authHandler = (e) => {
    e.preventDefault();
    // console.log(e.target.name)

    if (e.target.name == "signIn") {
      setIsLoading({
        ...isloading,
        signIn: true,
      });
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });

          setIsLoading({
            ...isloading,
            signIn: false,
          })

          setError("")
          navigate(navStateData?.state?.redirect || "/")
        })
        .catch((err) => {
          setError(err.message);
          setIsLoading({
            ...isloading,
            signIn: false,
          });
        });
    } else {
      setIsLoading({
        ...isloading,
        signUp: true,
      });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setIsLoading({
            ...isloading,
            signUp: false,
          });
          navigate(navStateData?.state?.redirect || "/")
        })
        .catch((err) => {
          setError(err.message);
          setIsLoading({
            ...isloading,
            signUp: false,
          });
        });
    }
  };

  return (
    <>
      <section className={styles.login}>
        <Link to="/">
          {/* logo */}
          <img src={logo} alt="amazon-logo" />
        </Link>

        {/* form */}
        <div className={styles.login_cotianer}>
          <h1>Sign In</h1>
          {
            navStateData?.state?.msg && (
              <small className={
                styles.auth_not_logined
              }>

                {navStateData.state.msg}
              </small>
            )
          }
          <form action="">
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                id="email"
              />
            </div>
            <div className="pwd">
              <label htmlFor="pwd">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="pwd"
              />
            </div>
            <button
              type="submit"
              onClick={authHandler}
              name="signIn"
              className={styles.login_sign_btn}
            >
              {isloading.signIn ?<ClipLoader size={12} color="#000"/>:"Sign In"}
             
            </button>
          </form>

          {/* agreement */}
          <p>
            By continuing, you agree to Amazon Fake Clone. Terms of Use and
            Sale.Please also review our Privacy Notice,Cookie Notice,and
            Interest-Based Advertising Notice.
          </p>
          {/* create acc btn */}

          <button
            onClick={authHandler}
            name="signUp"
            type="submit"
            className={styles.login__register_btn}
          >
          {isloading.signUp ? <ClipLoader size={12}  color="#000"/>:
          "Create Amazon Account"}
          </button>

          {error && (
            <small className={styles.login_errPopUp}>
              {error} <br />
            </small>
          )}
        </div>
      </section>
    </>
  );
}

export default Auth;
