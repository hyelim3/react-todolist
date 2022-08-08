import React, { useState, useRef, useEffect } from "react";
import TodoEdit from "./components/TodoEdit";
import TodoInsert from "./components/TodoInsert";
import TodoList from "./components/TodoList";
import TodoTemplate from "./components/TodoTemplate";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [insertToggle, setInsertToggle] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
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

  const onToggle = async (id) => {
    try {
      const data = await axios({
        url: `http://localhost:4000/todos/check/${id}`,
        method: "PATCH",
      });
      setTodos(data.data);
    } catch (e) {
      setError(e);
    }
  };

  const onUpdate = (id, text) => {
    setTodos(
      (
        todos //돌다가 id가 같으면 나머지는 남기고 text만 바뀌고 나머지는 남긴다
      ) => todos.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    );
    onInsertToggle();
  };

  useEffect(() => {
    //api 최초 한번만 실행, 프론트에서 데이터 받기
    const getData = async () => {
      try {
        const data = await axios({
          url: "http://localhost:4000/todos",
          method: "GET",
        });
        console.log(data.data);
        setTodos(data.data); //할일 안에 넣어야함 불러와야함
        setIsLoading(false);
      } catch (e) {
        setError(e);
      }
    };
    getData();
  }, []);

  if (error) {
    return <>에러: {error.message}</>;
  }

  if (isLoading) {
    return <>Loading...</>;
  }

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
