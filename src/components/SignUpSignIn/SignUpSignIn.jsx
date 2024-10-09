import { useState } from "react";
import Input from "../Input/Input";
import "./signupsignin.css";
import Button from "../Button/Button";
import { auth } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
const SignUpSignIn = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

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

  function createDoc() {
    // No doc with uid exist to create a doc
  }
  return (
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
        <p style={{ textAlign: "center", margin: 0 }}>OR</p>
        <Button
          text={loading ? "Loading.." : "Sign Up using google"}
          blue={"true"}
        />
      </form>
    </div>
  );
};

export default SignUpSignIn;
