import { forwardRef, useContext, useImperativeHandle, useRef } from "react"
import ThemeContext from "../context/ThemeContext";

function Input(props, ref) {
  const inputRef = useRef();
  const themeContext = useContext(ThemeContext);

  useImperativeHandle(ref, () => ({
    focus: () => {
      console.log('focus input');
      inputRef.current.focus();
    },
    
    test: () => {
      alert('test');
    }
  }))

  return (
    <div class={`input-${themeContext.theme}`}>
      <input
        {...props}
        ref={inputRef}
        className="input"
      />
    </div>
  )
}

export default forwardRef(Input);