import React, { useState } from "react";
import "../styles/TodoInsert.scss";

//input창
const TodoInsert = ({ onInsert }) => {
  const [value, setValue] = useState("");
  const onChange = (e) => {
    setValue(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault(); //새로고침 X
    setValue(""); //초기화
    onInsert(value); //추가해주는 작업
  };

  return (
    <form className="TodoInsert" onSubmit={onSubmit}>
      <input
        onChange={onChange}
        value={value}
        placeholder="할 일을 입력하세요"
      />
      <button type="submit">+</button>
    </form>
  );
};

export default TodoInsert;
