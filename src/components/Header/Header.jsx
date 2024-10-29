/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { auth } from "../../firebase";
import "./header.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
import userImg from "../../assets/user.svg";

const Header = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, loading]);

  function logout() {
    signOut(auth)
      .then(() => {
        toast.success("UserLogged Out!");
        navigate("/");
      })
      .catch((err) => {
        toast.success(err.message);
      });
  }
  return (
    <div className="navbar">
      <p className="logo">HiSaab</p>
      {user && (
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <img
            src={user.photoURL ? user.photoURL : userImg}
            width={user.photoURL ? "32" : "24"}
            style={{ borderRadius: "50%" }}
          />
          <p className="logo link" onClick={logout}>
            Logout
          </p>
        </div>
      )}
    </div>
  );
};

export default Header;
