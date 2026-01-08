function DarkModeToggle({ dark, toggle }) {
  return (
    <button className="icon-btn" onClick={toggle} title="Toggle Dark Mode">
      {dark ? "☀️" : "🌙"}
    </button>
  );
}

export default DarkModeToggle;
