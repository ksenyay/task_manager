import './styles/App.css'
import Column from './components/Column'
import Search from './components/Search';

function App() {
  return (
    <div className="gridContainer">
      <div className='heading'>
         <h1>Daily Tasks</h1>
      </div>
      <div className="search"><Search /></div>
      <div className="todo"><Column column="To Do" /></div>
      <div className="inprocess"><Column column="In Progress" /></div>
      <div className="done"><Column column="Done" /></div>
    </div>
  );
}

export default App