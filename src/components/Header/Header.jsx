import "./header.css";
const Header = () => {
  function logout() {
    alert("Logout");
  }
  return (
    <div className="navbar">
      <p className="logo">HiSaab</p>
      <p className="logo link" onClick={logout}>
        Logout
      </p>
    </div>
  );
};

export default Header;
