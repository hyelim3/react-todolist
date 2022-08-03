import React from "react";
import {
  MdCheckBox,
  MdCheckBoxOutlineBlank,
  MdModeEditOutline,
  MdRemoveCircleOutline,
} from "react-icons/md";
import cn from "classnames";
import "../styles/TodoListItem.scss";

const TodoListItem = ({ todo, onToggle }) => {
  const { id, text, checked } = todo;
  return (
    <li className="TodoListItem">
      <div
        onClick={() => {
          onToggle(id);
        }}
        className={cn("checkbox", { checked: checked })}
      >
        {checked ? <MdCheckBox /> : <MdCheckBoxOutlineBlank />}
        <div className="text">{text}</div>
      </div>
      <div className="edit" onClick={() => {}}>
        <MdModeEditOutline />
      </div>
      <div className="remove">
        <MdRemoveCircleOutline />
      </div>
    </li>
  );
};

export default TodoListItem;
