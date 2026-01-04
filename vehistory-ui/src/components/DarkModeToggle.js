function DarkModeToggle({ dark, toggle }) {
  return (
    <button style={{ float: "right", marginBottom: "10px" }} onClick={toggle}>
      {dark ? "Light" : "Dark"} Mode
    </button>
  );
}

export default DarkModeToggle;
