import styles from './Dialogs.module.css'

interface AddTaskProps {
  handleCloseEdit: () => void;
}

const EditTask: React.FC<AddTaskProps> = ({ handleCloseEdit }) => {
    return (
        <div className={styles.dialogOverlay}>
            <div className={styles.dialogBox}>
                <h3>Edit Task</h3>
                <input type="text" placeholder="Title" />
                <textarea placeholder="Description" />
                <div className={styles.dialogActions}>
                    <button onClick={handleCloseEdit}>Cancel</button>
                    <button>Save</button>
                </div>
            </div>
        </div>
    )
}

export default EditTask;