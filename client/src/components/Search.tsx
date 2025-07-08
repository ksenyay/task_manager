import React, {useState} from 'react';
import EditBoards from './EditBoards'
import styles from './Search.module.css'

const Search: React.FC = () => {
  const [editBoards, setEditBoards] = useState(false);
  
  const handleOpenBoard = () => setEditBoards(true);
  const handleCloseBoard = () => setEditBoards(false);
      

  return (
    <>
       <div className={styles.search}>
        <input type="text" id='boardID' placeholder='Enter a board ID...'/>
        <button className={styles.loadBtn}>Load</button>
        <button onClick={handleOpenBoard}>Edit</button>
       </div>
       {/* Edit Dialog */}
        {editBoards && (
            <EditBoards handleCloseBoard={handleCloseBoard} />
        )}
    </>
  );
};

export default Search;