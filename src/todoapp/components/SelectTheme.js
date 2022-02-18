import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

export default function SelectTheme() {
  const themeContext = useContext(ThemeContext);

  return (
    <div>
      <button onClick={() => themeContext.setTheme('light')}>light</button>
      <button onClick={() => themeContext.setTheme('dark')}>dark</button>
    </div>
  )
}