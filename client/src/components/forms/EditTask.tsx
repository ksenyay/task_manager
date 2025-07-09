import { useEffect, useState } from 'react';
import styles from './Dialogs.module.css'
import { editCard } from '../../state/tasksSlice';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../state/store';

interface AddTaskProps {
  handleCloseEdit: () => void;
  taskData: {
    _id: string,
    title: string;
    description: string;
  };
}

const EditTask: React.FC<AddTaskProps> = ({ handleCloseEdit, taskData }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        setTitle(taskData.title);
        setDescription(taskData.description);
    }, [taskData]);

    function handleFormSubmit(e: React.FormEvent) {
        e.preventDefault();
        dispatch(editCard({ id: taskData._id, update: { title, description } }));
        handleCloseEdit(); 
    }

    return (
        <div className={styles.dialogOverlay}>
            <div className={styles.dialogBox}>
                <h3>Edit Task</h3>
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <div className={styles.dialogActions}>
                    <button onClick={handleCloseEdit}>Cancel</button>
                    <button onClick={handleFormSubmit}>Save</button>
                </div>
            </div>
        </div>
    )
}

export default EditTask;
