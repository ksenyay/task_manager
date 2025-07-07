import { Router } from 'express';
import { getAllBoards, addBoard, getBoardById, updateBoard, deleteBoard } from '../controllers/boardController';

const router = Router();

router.get('/', getAllBoards);
router.post('/', addBoard);
router.get('/:boardId', getBoardById);
router.patch('/:boardId', updateBoard);
router.delete('/:boardId', deleteBoard);

export default router;