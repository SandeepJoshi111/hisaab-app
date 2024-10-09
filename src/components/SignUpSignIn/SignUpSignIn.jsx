import { useState } from "react";
import Input from "../Input/Input";
import "./signupsignin.css";
import Button from "../Button/Button";
import { auth, db, doc, provider, setDoc } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { getDoc } from "firebase/firestore";
const SignUpSignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState(false);
  const navigate = useNavigate();

  function signUpWithEmail() {
    setLoading(true);

    // Create new account using email and pass
    if (name != "" && email != "" && password != "" && confirmPassword != "") {
      if (password === confirmPassword) {
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            toast.success("User Created");
            setConfirmPassword("");
            setEmail("");
            setName("");
            setPassword("");
            createDoc(user);
          })
          .catch((err) => {
            const errorMessage = err.message;
            toast.error(errorMessage);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        toast.error("Password doesn't match");
        setLoading(false);
      }
    } else {
      toast.error("All fields are mandatory!");
      setLoading(false);
    }
  }

  function loginUsingEmail() {
    setLoading(true);
    if (email != "" && password != "") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          toast.success("User Logged In!", user);
          navigate("/dashboard");
        })
        .catch((err) => {
          const errorMessage = err.message;
          toast.error(errorMessage);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      toast.error("All fields are mandatory!");
      setLoading(false);
    }
  }

  async function createDoc(user) {
    // No doc with uid exist to create a doc
    setLoading(true);
    if (!user) return;

    const userRef = doc(db, "users", user.uid);
    const userData = await getDoc(userRef);
    if (!userData.exists()) {
      try {
        await setDoc(userRef, {
          name: user.displayName ? user.displayName : name,
          email: user.email,
          photoUrl: user.photoURL ? user.photoURL : "",
          createdAt: new Date(),
        });
      } catch (err) {
        toast.error(err.message);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }
  }

  function googleAuth() {
    setLoading(true);
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        console.log(token);
        const user = result.user;
        console.log(user);
        toast.success("User Logged In!");
        createDoc(user);
        navigate("/dashboard");
        setLoading(false);
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);

        setLoading(false);
        // ...
      });
  }

  return (
    <>
      {loginForm ? (
        <div className="signup-wrapper">
          <h2 className="title">
            Log In on <span style={{ color: "var(--theme)" }}>HiSaab</span>
          </h2>
          <form>
            <Input
              type="email"
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"Enter your email"}
            />
            <Input
              type="password"
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"Enter Password"}
            />
            <Button
              disabled={loading}
              text={loading ? "Loading.." : "Login"}
              onClick={loginUsingEmail}
            />
            <p className="p-login">OR</p>
            <Button
              text={loading ? "Loading.." : "Login using google"}
              blue={"true"}
              onClick={googleAuth}
            />

            <p
              className="p-login"
              style={{ cursor: "pointer" }}
              onClick={() => setLoginForm(!loginForm)}
            >
              Don&apos;t have a account? Sign Up
            </p>
          </form>
        </div>
      ) : (
        <div className="signup-wrapper">
          <h2 className="title">
            Sign Up on <span style={{ color: "var(--theme)" }}>HiSaab</span>
          </h2>
          <form>
            <Input
              type="text"
              label={"Full Name"}
              state={name}
              setState={setName}
              placeholder={"Enter your name"}
            />
            <Input
              type="email"
              label={"Email"}
              state={email}
              setState={setEmail}
              placeholder={"Enter your email"}
            />
            <Input
              type="password"
              label={"Password"}
              state={password}
              setState={setPassword}
              placeholder={"Enter Password"}
            />
            <Input
              type="password"
              label={"Confirm Password"}
              state={confirmPassword}
              setState={setConfirmPassword}
              placeholder={"Confirm Password"}
            />

            <Button
              disabled={loading}
              text={loading ? "Loading.." : "Sign Up"}
              onClick={signUpWithEmail}
            />
            <p className="p-login">OR</p>
            <Button
              onClick={googleAuth}
              text={loading ? "Loading.." : "Login using google"}
              blue={"true"}
            />
            <p
              className="p-login"
              style={{ cursor: "pointer" }}
              onClick={() => setLoginForm(!loginForm)}
            >
              Already have a account? Log In
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default SignUpSignIn;
