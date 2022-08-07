import React from "react";
import TodoListItem from "./TodoListItem";

const TodoList = ({
  todos,
  onToggle,
  onRemove,
  onInsertToggle,
  setSelectedTodo,
}) => {
  return (
    <div className="TodoList">
      {todos.map((todo, index) => (
        <TodoListItem
          todo={todo}
          key={index}
          onToggle={onToggle}
          onRemove={onRemove}
          onInsertToggle={onInsertToggle}
          setSelectedTodo={setSelectedTodo}
        />
      ))}
    </div>
  );
};

export default TodoList;
