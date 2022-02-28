import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import './App.scss';
import ThemeContext from './todoapp/context/ThemeContext';
import UserContext from './todoapp/context/UserContext';
import TodoApp from './todoapp/TodoApp';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

function App() {
  const [theme, setTheme] = useState('dark');
  const [user, setUser] = useState(null);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeContext.Provider value={{theme, setTheme}}>
        <UserContext.Provider value={{user, setUser}}>
          <TodoApp />
        </UserContext.Provider>
      </ThemeContext.Provider>
    </QueryClientProvider>
  );
}

export default App;
