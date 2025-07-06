import styles from './Dialogs.module.css'

interface AddTaskProps {
  handleClose: () => void;
}

const AddTask: React.FC<AddTaskProps> = ({ handleClose }) => {
    return (
        <div className={styles.dialogOverlay}>
            <div className={styles.dialogBox}>
                <h3>Add Task</h3>
                <input type="text" placeholder="Title" />
                <textarea placeholder="Description" />
                <div className={styles.dialogActions}>
                    <button onClick={handleClose}>Cancel</button>
                    <button>Add</button>
                </div>
            </div>
        </div>
    )
}

export default AddTask