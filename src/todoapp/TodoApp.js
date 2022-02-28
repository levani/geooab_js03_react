import classNames from "classnames";
import { useContext, useEffect, useRef, useState } from "react";
import Input from "./components/Input/Input";
import SelectTheme from "./components/SelectTheme";
import UserContext from "./context/UserContext";
import apiRequest from "./apiRequest";
import useRequest from "./hooks/useRequest";
import { useMutation, useQuery, useQueryClient } from "react-query";

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [value, setValue] = useState('');
  const inputRef = useRef();
  // const userContext = useContext(UserContext);
  // const [data, loading] = useRequest('GET', 'tasks');
  const { data, isLoading, refetch } = useQuery('tasks', () => apiRequest('GET', 'tasks'));
  const addTodoMutation = useMutation((text) => {
    return apiRequest('POST', 'tasks/create', {
      text
    })
  });
  const queryClient = useQueryClient();

  console.log('data', data);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (data) {
      setTodos(data);
    }
  }, [data]);

  function onItemChange(clickedItem) {
    const newValue = todos.map(item => {
      if (item.id === clickedItem.id) {
        item.completed = !item.completed;
      }
      return item;
    })
    setTodos(newValue);
  }

  async function onAddNewItem(e) {
    e.preventDefault();
    // const newItems = [
    //   { 
    //     id: Date.now(),
    //     text: value,
    //     completed: false,
    //   },
    //   ...todos,
    // ]
    // setTodos(newItems);
    setValue('');

    await addTodoMutation.mutateAsync(value);
    queryClient.invalidateQueries('tasks');
  }

  function onItemDelete(itemId) {
    const newItems = todos.filter(item => item.id !== itemId);
    setTodos(newItems);
  }

  const totalItem = todos.length;
  const itemsCompleted = todos.filter(item => item.completed).length;
  const itemsNotCompleted = todos.filter(item => !item.completed).length;
  
  // if (!userContext.user) {
  //   return <Auth />
  // }

  return <div>
    <div style={{padding: '20px'}}>
      <form action="" onSubmit={onAddNewItem}>
        <Input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          ref={inputRef}
        />
      </form>
    </div>

    {
      addTodoMutation.isLoading && <p>loading...</p>
    }

    {
      isLoading ? <p>loading...</p> : (
        <ul>
          {
            todos.map(item => (
              <li key={item.id} className={classNames({completed: item.completed})}>
                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => onItemChange(item)}
                />
                {item.text}
                <button onClick={() => onItemDelete(item.id)}>Delete</button>
              </li>
            ))
          }
        </ul>
      )
    }

    <button onClick={() => refetch()}>refresh</button>

    სულ: {totalItem}, დასრულებული: {itemsCompleted}, დაუსრულებელი: {itemsNotCompleted}

    <SelectTheme />
  </div>
}

export default TodoApp;