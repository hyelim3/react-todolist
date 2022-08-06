import React from "react";
import TodoListItem from "./TodoListItem";

const TodoList = ({ todos, onToggle, onRemove, onInsertToggle }) => {
  return (
    <div className="TodoList">
      {todos.map((todo, index) => (
        <TodoListItem
          todo={todo}
          key={index}
          onToggle={onToggle}
          onRemove={onRemove}
          onInsertToggle={onInsertToggle}
        />
      ))}
    </div>
  );
};

export default TodoList;
