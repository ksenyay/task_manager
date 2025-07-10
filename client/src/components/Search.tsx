import React, { useState } from "react";
import type { AppDispatch } from "../state/store";
import EditBoards from "./EditBoards";
import styles from "./Search.module.css";
import { useDispatch } from "react-redux";
import { fetchBoardById } from "../state/boardSlice";

const Search: React.FC = () => {
  const [editBoards, setEditBoards] = useState(false);
  const [currentBoard, setCurrentBoard] = useState("");

  const handleOpenBoard = () => setEditBoards(true);
  const handleCloseBoard = () => setEditBoards(false);

  const dispatch = useDispatch<AppDispatch>();

  const loadBoard = () => {
    const id = currentBoard.trim();

    if (!id) {
      alert("Please enter an id");
      return;
    }

    dispatch(fetchBoardById(id))
      .then((res) => {
        if (!res.payload) {
          alert("Board does not exist");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className={styles.search}>
        <input
          type="text"
          id="boardID"
          value={currentBoard}
          onChange={(e) => setCurrentBoard(e.target.value)}
          placeholder="Enter a board ID..."
        />
        <button className={styles.loadBtn} onClick={loadBoard}>
          Load
        </button>
        <button onClick={handleOpenBoard}>Edit</button>
      </div>
      {/* Edit Dialog */}
      {editBoards && <EditBoards handleCloseBoard={handleCloseBoard} />}
    </>
  );
};

export default Search;
