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

  const onRemove = (id) => {
    // 해당 조건이 적용되는 것만 남긴다 todo의 id값이 다르면 남아있는다.
    setTodos((todos) => todos.filter((todo) => todo.id !== id)); // 같으면 삭제
  };

  const onToggle = (id) => {
    //아이디가 일치하는 id만 체크상태 바꾸기
    setTodos((todos) =>
      todos.map(
        (
          todo //todo에서 todo안에 있는 id와 찾는id가 일치하면 바꿔야함
        ) =>
          //text, id 그대로 뿌려주고 checked만 바꿈 todo의 원래 상태의 반전
          todo.id === id ? { ...todo, checked: !todo.checked } : todo //나머지는 todo
      )
    );
  };

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
}

export default App;
