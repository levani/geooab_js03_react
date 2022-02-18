import classNames from "classnames";
import { useContext, useEffect, useRef, useState } from "react";
import Auth from "./Auth";
import Input from "./components/Input";
import SelectTheme from "./components/SelectTheme";
import UserContext from "./context/UserContext";

const ITEMS = [
  {
    id: 1,
    title: 'lorem ipsum 11',
    completed: false,
  },
  {
    id: 2,
    title: 'lorem ipsum 22',
    completed: false,
  },
  {
    id: 3,
    title: 'lorem ipsum 33',
    completed: true,
  },
  {
    id: 4,
    title: 'lorem ipsum 44',
    completed: true,
  },
];

function TodoApp() {
  const [todos, setTodos] = useState(ITEMS);
  const [value, setValue] = useState('');
  const inputRef = useRef();
  const userContext = useContext(UserContext);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const items = localStorage.getItem('items');
    if (items) {
      setTodos(JSON.parse(items));
    }
  }, []);

  function onItemChange(clickedItem) {
    const newValue = todos.map(item => {
      if (item.id === clickedItem.id) {
        item.completed = !item.completed;
      }
      return item;
    })
    setTodos(newValue);
  }

  function onAddNewItem(e) {
    e.preventDefault();
    const newItems = [
      { 
        id: Date.now(),
        title: value,
        completed: false,
      },
      ...todos,
    ]
    setTodos(newItems);
    localStorage.setItem('items', JSON.stringify(newItems));
    setValue('');
  }

  function onItemDelete(itemId) {
    const newItems = todos.filter(item => item.id !== itemId);
    setTodos(newItems);
    localStorage.setItem('items', JSON.stringify(newItems));
  }

  const totalItem = todos.length;
  const itemsCompleted = todos.filter(item => item.completed).length;
  const itemsNotCompleted = todos.filter(item => !item.completed).length;

  console.log(userContext.user);
  
  if (!userContext.user) {
    return <Auth />
  }

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

    <ul>
      {
        todos.map(item => (
          <li key={item.id} className={classNames({completed: item.completed})}>
            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => onItemChange(item)}
            />
            {item.title}
            <button onClick={() => onItemDelete(item.id)}>Delete</button>
          </li>
        ))
      }
    </ul>

    სულ: {totalItem}, დასრულებული: {itemsCompleted}, დაუსრულებელი: {itemsNotCompleted}

    <SelectTheme />
  </div>
}

export default TodoApp;