import classNames from "classnames";
import { useEffect, useRef, useState } from "react";

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

  useEffect(() => {
    inputRef.current.focus();
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

  return <div>

    <div style={{padding: '20px'}}>
      <form action="" onSubmit={onAddNewItem}>
        <input
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
            <button>Delete</button>
          </li>
        ))
      }
    </ul>
  </div>
}

export default TodoApp;