import type { RootState, AppDispatch } from "../state/store";
import { useDispatch, useSelector } from "react-redux";
import {
  createBoard,
  fetchBoards,
  removeBoard,
  patchBoard,
} from "../state/boardSlice";
import { useEffect, useState } from "react";
import styles from "./forms/Dialogs.module.css";

interface AddProps {
  handleCloseBoard: () => void;
}

const EditBoards: React.FC<AddProps> = ({ handleCloseBoard }) => {
  const dispatch = useDispatch<AppDispatch>();
  const boards = useSelector((state: RootState) => state.boards.boards);
  const [boardName, setBoardName] = useState("");
  const [editingBoardId, setEditingBoardId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  const deleteBoard = async (id: string) => {
    if (confirm("Are you sure you want to delete this board?")) {
      try {
        await dispatch(removeBoard(id)).unwrap();
        await dispatch(fetchBoards());
      } catch (err) {
        console.error("Failed to delete board:", err);
      }
    }
  };

  const startEditing = (board: { id: string; name: string }) => {
    setEditingBoardId(board.id);
    setBoardName(board.name);
  };

  const saveBoard = () => {
    const trimmedName = boardName.trim();
    if (!trimmedName) {
      alert("Please enter a board name");
      return;
    }

    const nameExists = boards.some(
      (board) =>
        board.name.toLowerCase() === trimmedName.toLowerCase() &&
        board.id !== editingBoardId,
    );

    if (nameExists) {
      alert("A board with this name already exists!");
      return;
    }

    if (editingBoardId) {
      dispatch(
        patchBoard({ id: editingBoardId!, update: { name: trimmedName } }),
      );
      setEditingBoardId(null);
      setBoardName("");
    } else {
      const id = crypto.randomUUID().slice(0, 6);
      dispatch(createBoard({ id, name: trimmedName }));
      setBoardName("");
    }
  };

  return (
    <div className={styles.dialogOverlay}>
      <div className={styles.dialogBox}>
        <h3>Edit Boards</h3>

        <div className={styles.addBoard}>
          <input
            type="text"
            id="boardName"
            maxLength={20}
            placeholder="Name"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
          />
          <button onClick={saveBoard}>{editingBoardId ? "Save" : "Add"}</button>
        </div>

        {boards.length === 0 ? (
          <p className={styles.noBoards}>You don't have any boards yet.</p>
        ) : (
          boards.map((board) => (
            <div key={board.id} className={styles.board}>
              <p>
                {board.name}: {board.id}
              </p>
              <div className={styles.iconContainer}>
                <img
                  className={styles.icon}
                  src="edit.png"
                  alt="edit icon"
                  onClick={() => startEditing(board)}
                />
                <img
                  className={styles.icon}
                  src="delete.png"
                  alt="delete icon"
                  onClick={() => deleteBoard(board.id)}
                />
              </div>
            </div>
          ))
        )}

        <div className={styles.dialogActions}>
          <button className={styles.closeBtn} onClick={handleCloseBoard}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBoards;
