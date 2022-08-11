import React, { useState, useRef, useEffect } from "react";
import TodoEdit from "./components/TodoEdit";
import TodoInsert from "./components/TodoInsert";
import TodoList from "./components/TodoList";
import TodoTemplate from "./components/TodoTemplate";
import axios from "axios";
import { MdPool } from "react-icons/md";

function App() {
  const [todos, setTodos] = useState([]);
  const [insertToggle, setInsertToggle] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const nextId = useRef(4);

  //삽입
  const onInsert = async (text) => {
    // const todo = {
    //   id: nextId.current,
    //   text: text,
    //   checked: false,
    // };

    // setTodos((todos) => todos.concat(todo));

    // nextId.current++;
    try {
      const data = await axios({
        url: `http://localhost:4000/todos`,
        method: "POST",
        data: { text },
      });

      setTodos(data.data);
    } catch (e) {
      setError(e);
    }
  };

  //수정 클릭했을 때 값을 가져오고 값을 수정하기에 넣어주는 것까지 2부
  const onInsertToggle = () => {
    setInsertToggle((prev) => !prev);
  };

  //삭제
  const onRemove = async (id) => {
    //setTodos((todos) => todos.filter((todo) => todo.id !== id));
    try {
      await axios({
        url: `http://localhost:4000/todos/${id}`,
        method: "DELETE",
      });
      const data = await axios({
        url: `http://localhost:4000/todos`,
        method: "GET",
      });
      console.log(data);
      setTodos(data.data);
    } catch (e) {
      setError(e);
    }
  };

  const onToggle = async (id) => {
    const data = await axios({
      url: `http://localhost:4000/todos/check/${id}`,
      method: "PATCH",
    });
    console.log("updatedData", data.data);
    setTodos(data.data);
  };

  const onUpdate = async (id, text) => {
    // setTodos((todos) =>
    //   todos.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    // );
    console.log(id);
    console.log(text);
    try {
      const data = await axios({
        url: `http://localhost:4000/todos/${id}`,
        method: "PATCH",
        data: {
          text,
          perform_date: "2022-08-09 11:11:11",
        },
      });
      setTodos(data.data);
    } catch (e) {
      setError(e);
    }
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
        console.log("data", data.data);
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
      <button
        onClick={() => {
          console.log(todos);
        }}
      >
        check
      </button>
    </TodoTemplate>
  );
}

export default App;
