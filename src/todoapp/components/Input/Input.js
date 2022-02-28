import { forwardRef, useContext, useImperativeHandle, useRef } from "react"
import ThemeContext from "../../context/ThemeContext";
import styles from './Input.module.scss';

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
    <div>
      <input
        {...props}
        ref={inputRef}
        className={styles.input}
      />
    </div>
  )
}

export default forwardRef(Input);