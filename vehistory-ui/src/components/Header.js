import Notifications from "./Notifications";
import DarkModeToggle from "./DarkModeToggle";
import Logo from "../assets/logo.png";

function Header({ dark, toggleDark }) {
  return (
    <header className="header">
      {/* Left: Logo */}
      <div className="header-left">
        <img src={Logo} alt="Vehistory Logo" className="header-logo" />
      </div>

      {/* Center: Title & Tagline */}
      <div className="header-center">
        <h1 className="app-title">Vehistory</h1>
        <p className="app-tagline">
          Track your cars, services, and events effortlessly
        </p>
      </div>

      {/* Right: Notifications, Dark Mode, Login */}
      <div className="header-right">
        <Notifications />
        <DarkModeToggle dark={dark} toggle={toggleDark} />
        <button type="button" className="btn btn-primary">
          Login
        </button>
      </div>
    </header>
  );
}

export default Header;
