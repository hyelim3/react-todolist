import React, { useState, useEffect } from "react";
import "../styles/TodoEdit.scss";

const TodoEdit = ({ onInsertToggle, selectedTodo }) => {
  const [value, setValue] = useState("");
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    onInsertToggle();
  };
  useEffect(() => {
    setValue(selectedTodo.text); //Value값을 text로 바꾸겠다
  }, [selectedTodo]); //selectedTodo 바뀐다면

  return (
    <div className="background">
      <form onSubmit={onSubmit} className="todoedit__insert">
        <h2>수정하기</h2>
        <input
          onChange={onChange}
          value={value}
          placeholder="할 일을 입력하세요"
        />
        <button type="submit">수정하기</button>
      </form>
    </div>
  );
};

export default TodoEdit;
