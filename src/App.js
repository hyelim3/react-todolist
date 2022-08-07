import React, { useState, useRef } from "react";
import TodoEdit from "./components/TodoEdit";
import TodoInsert from "./components/TodoInsert";
import TodoList from "./components/TodoList";
import TodoTemplate from "./components/TodoTemplate";

function App() {
  const [todos, setTodos] = useState([]);
  const [insertToggle, setInsertToggle] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const nextId = useRef(1);

  //삽입
  const onInsert = (text) => {
    const todo = {
      id: nextId.current,
      text: text,
      checked: false,
    };

    setTodos((todos) => todos.concat(todo));

    nextId.current++;
  };

  //수정 클릭했을 때 값을 가져오고 값을 수정하기에 넣어주는 것까지 2부
  const onInsertToggle = () => {
    setInsertToggle((prev) => !prev);
  };

  //삭제
  const onRemove = (id) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };

  const onToggle = (id) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  };

  const onUpdate = (id, text) => {
    setTodos(
      (
        todos //돌다가 id가 같으면 나머지는 남기고 text만 바뀌고 나머지는 남긴다
      ) => todos.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    );
    onInsertToggle();
  };
  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList
        todos={todos}
        onRemove={onRemove}
        onToggle={onToggle}
        onInsertToggle={onInsertToggle}
        setSelectedTodo={setSelectedTodo}
      />
      {insertToggle && (
        <TodoEdit
          onInsertToggle={onInsertToggle}
          selectedTodo={selectedTodo}
          onUpdate={onUpdate}
        />
      )}
    </TodoTemplate>
  );
}

export default App;
