import type { RootState, AppDispatch } from '../state/store';
import { useDispatch, useSelector } from 'react-redux';
import { createBoard, fetchBoards, removeBoard } from '../state/boardSlice'; 
import { useEffect, useState } from 'react';
import styles from './forms/Dialogs.module.css'
import { v4 as uuidv4 } from 'uuid';

interface AddProps {
  handleCloseBoard: () => void;
}

const EditBoards: React.FC<AddProps> = ({ handleCloseBoard }) => {

// Data from redux
  const dispatch = useDispatch<AppDispatch>();
  const boards = useSelector((state: RootState) => state.boards.boards);

  const [newBoardName, setNewBoardName] = useState('');

  useEffect(() => {
    dispatch(fetchBoards());
  }, [dispatch]);

  const deleteBoard = async (id: string) => {
        try {
            await dispatch(removeBoard(id)).unwrap();
            await dispatch(fetchBoards());
        } catch (err) {
            console.error('Failed to delete board:', err);
        }
    };

   const addBoard = () => {
    const trimmedName = newBoardName.trim();
    if (!trimmedName) {
      alert('Please enter a board name');
      return;
    }

    const id = uuidv4().slice(0, 6)

    console.log('Adding board with id:', id, 'and name:', trimmedName);
    dispatch(createBoard({ id, name: trimmedName }));
    setNewBoardName('');
  };

return (
    <>
        <div className={styles.dialogOverlay}>
            <div className={styles.dialogBox}>
                <h3>Edit Boards</h3>
                <div className={styles.addBoard}>
                    <input type="text" id='boardName' placeholder="Name" 
                           value={newBoardName} 
                           onChange={e => setNewBoardName(e.target.value)}
                     />
                    <button onClick={addBoard}>Add</button>
                </div>
                {boards.length === 0 ? (
                    <p className={styles.noBoards}>You don't have any boards yet.</p>
                ) : (
                    boards.map((board) => (
                        <div key={board.id} className={styles.board}>
                            <p>{board.name}: {board.id}</p>
                            <div className={styles.iconContainer}>
                                <img className={styles.icon} src="edit.png" alt="edit icon" />
                                <img className={styles.icon} onClick={() => deleteBoard(board.id)} src="delete.png" alt="delete icon" />
                            </div>
                        </div>
                    ))
                )}
            
                <div className={styles.dialogActions}>
                    <button className={styles.closeBtn} onClick={handleCloseBoard}>Close</button>
                </div>
            </div>
        </div>
    </>
)
}

export default EditBoards