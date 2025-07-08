import type { RootState, AppDispatch } from '../state/store';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBoards } from '../state/boards/boardSlice'; 
import { useEffect } from 'react';
import styles from './forms/Dialogs.module.css'

interface AddProps {
  handleCloseBoard: () => void;
}

const EditBoards: React.FC<AddProps> = ({ handleCloseBoard }) => {

// Data from redux
const dispatch = useDispatch<AppDispatch>();
const boards = useSelector((state: RootState) => state.boards);

useEffect(() => {
    dispatch(fetchBoards());
}, [dispatch]);

console.log(boards)

return (
    <>
        <div className={styles.dialogOverlay}>
            <div className={styles.dialogBox}>
                <h3>Edit Boards</h3>
                <div className={styles.addBoard}>
                    <input type="text" placeholder="Name" />
                    <button>Add</button>
                </div>
                {boards.map((board) => {
                    return (
                        <div className={styles.board}>
                            <p>{board.name}({board.id})</p>
                            <div className={styles.iconContainer}>
                                <img className={styles.icon}
                                    src="edit.png"
                                    alt="edit icon"
                                />
                                <img className={styles.icon} src="delete.png" alt="delete icon" />
                            </div>
                        </div>
                    )
                })}
            
                <div className={styles.dialogActions}>
                    <button onClick={handleCloseBoard}>Cancel</button>
                    <button>Save</button>
                </div>
            </div>
        </div>
    </>
)
}

export default EditBoards