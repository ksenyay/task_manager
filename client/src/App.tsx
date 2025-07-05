
import './App.css'
import Board from './components/Board'
import Search from './components/Search';

function App() {
  return (
    <div className="gridContainer">
      <div className="search"><Search /></div>
      <div className="todo"><Board column="To Do" /></div>
      <div className="inprocess"><Board column="In Process" /></div>
      <div className="done"><Board column="Done" /></div>
    </div>
  );
}

export default App
