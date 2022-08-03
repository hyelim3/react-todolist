import React, { useState, useRef } from "react";
import TodoInsert from "./components/TodoInsert";
import TodoList from "./components/TodoList";
import TodoTemplate from "./components/TodoTemplate";

function App() {
  const [todos, setTodos] = useState([]);
  const onInsert = (text) => {
    //text를 받음
    const todo = {
      id: nextId.current,
      text: text, //text
      checked: false,
    };
    setTodos((todos) => todos.concat(todo)); //초기배열에 객체 넣어줌 -> 추가 반복
    nextId.current++;
  };
  const nextId = useRef(1); //추가할 때 id가 1부터 시작
  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} />
    </TodoTemplate>
  );
}

export default App;
