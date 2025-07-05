import React from 'react';
import styles from './Search.module.css'

const Search: React.FC = () => {
  return (
    <>
       <div className={styles.search}>
        <input type="text" placeholder='Enter a board ID...'/>
        <button className={styles.loadBtn}>Load</button>
        <button>Edit</button>
       </div>
    </>
  );
};

export default Search;