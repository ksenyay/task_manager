import { useDispatch, useSelector } from "react-redux";
import styles from "./Dialogs.module.css";
import type { AppDispatch, RootState } from "../../state/store";
import { addCard } from "../../state/tasksSlice";
import { useState } from "react";

interface AddTaskProps {
  handleClose: () => void;
  columnId: string;
}

const AddTask: React.FC<AddTaskProps> = ({ handleClose, columnId }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const currentBoard = useSelector(
    (state: RootState) => state.boards.currentBoard,
  );

  function handleFormSumbit(e: React.FormEvent) {
    e.preventDefault();

    if (title.length === 0 || description.length === 0) {
      alert("Title or description cannot be empty!");
      return;
    }

    if (currentBoard) {
      const formData = {
        title: title,
        description: description,
        boardId: currentBoard.id,
        column: columnId,
      };

      console.log(formData);
      dispatch(addCard(formData));
    }
    setTitle("");
    setDescription("");
    handleClose();
  }

  return (
    <div className={styles.dialogOverlay}>
      <div className={styles.dialogBox}>
        <h3>Add Task</h3>
        <input
          type="text"
          placeholder="Title"
          maxLength={30}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          maxLength={200}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className={styles.dialogActions}>
          <button onClick={handleClose}>Cancel</button>
          <button onClick={handleFormSumbit}>Add</button>
        </div>
      </div>
    </div>
  );
};

export default AddTask;
