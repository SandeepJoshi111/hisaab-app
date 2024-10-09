import { useEffect } from "react";
import { auth } from "../../firebase";
import "./header.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { toast } from "react-toastify";
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
        <p className="logo link" onClick={logout}>
          Logout
        </p>
      )}
    </div>
  );
};

export default Header;
