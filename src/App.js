import React, { useState, useRef } from "react";
import TodoEdit from "./components/TodoEdit";
import TodoInsert from "./components/TodoInsert";
import TodoList from "./components/TodoList";
import TodoTemplate from "./components/TodoTemplate";

function App() {
  const [todos, setTodos] = useState([]);
  const [insertToggle, setInsertToggle] = useState(false); //처음은 안나와야하니깐 false
  const nextId = useRef(1); //추가할 때 id가 1부터 시작

  //삽입
  const onInsert = (text) => {
    //text를 받음
    const todo = {
      id: nextId.current,
      text: text, //text
      checked: false,
    };

    setTodos((todos) => todos.concat(todo)); //초기배열에 객체 넣어줌 -> 새로 추가
    // -> 추가된 배열로 반환
    nextId.current++;
  };

  //수정
  const onInsertToggle = () => {
    setInsertToggle((prev) => !prev); //이전 상태의 반전 - 버튼을 누른다면
  };

  //삭제
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
      <TodoList
        todos={todos}
        onRemove={onRemove}
        onToggle={onToggle}
        onInsertToggle={onInsertToggle} //항목
      />
      {insertToggle && <TodoEdit onInsertToggle={onInsertToggle} />}
      {/* 둘다 참일 때만 참, 참일 때는 보여주고 거짓일 때 안띄어줌 */}
    </TodoTemplate>
  );
}

export default App;
