import { useState } from 'react';
import './App.css';
import ThemeContext from './todoapp/context/ThemeContext';
import UserContext from './todoapp/context/UserContext';
import TodoApp from './todoapp/TodoApp';

function App() {
  const [theme, setTheme] = useState('dark');
  const [user, setUser] = useState(null);

  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
      <UserContext.Provider value={{user, setUser}}>
        <TodoApp />
      </UserContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;
