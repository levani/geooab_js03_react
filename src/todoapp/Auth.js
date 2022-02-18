import { useContext, useState } from "react";
import UserContext from "./context/UserContext";

export default function Auth() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const userContext = useContext(UserContext);

  function onSubmit(e) {
    e.preventDefault();

    // fetch('example.com/login').then(response => {

    // })

    if (username === 'test' && password === 'test') {
      userContext.setUser({
        username: 'test',
        name: 'Giorgi',
        email: 'test@example.com'
      })
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <p>
        <input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
      </p>
      <p>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </p>
      <button type="submit">Submit</button>
    </form>
  )
}