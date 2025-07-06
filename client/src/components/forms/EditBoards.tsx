
interface AddProps {
  handleCloseBoard: () => void;
}


const EditBoards: React.FC<AddProps> = ({ handleCloseBoard }) => {
    return (
        <>
        
            <h1 onClick={handleCloseBoard}>sdasd</h1>
        </>
    )
}

export default EditBoards