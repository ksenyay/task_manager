import styles from './Card.module.css';
import { useState } from 'react';
import EditTask from './forms/EditTask';

const tasks: { title: string; description: string; id: number }[] = [
  {
    title: 'title',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, doloribus enim esse ad illo expl.',
    id: 1
  },
  {
    title: 'title',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, doloribus enim esse ad illo expl.',
    id: 2
  }
];


function Card() {
    const [showEditDialog, setShowEditDialog] = useState(false);

    const handleOpenEdit = () => setShowEditDialog(true);
    const handleCloseEdit = () => setShowEditDialog(false);
    
  return (
    <>
      {tasks.map((item) => (
        <div className={styles.card} key={item.id} draggable>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <div className={styles.iconContainer}>
            <img className={styles.icon} onClick={handleOpenEdit} src="edit.png" alt="edit icon" />
            <img className={styles.icon} src="delete.png" alt="delete icon" />
          </div>
        </div>
      ))}
        {/* Edit Dialog */}
        {showEditDialog && (
            <EditTask handleCloseEdit={handleCloseEdit} />
        )}
    </>
  );
}
export default Card