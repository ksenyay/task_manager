import { Router } from 'express';
import * as boardController from '../controllers/boardController';

const router = Router();

router.get('/', boardController.getAllBoards);
router.post('/', boardController.addBoard);
router.get('/:boardId', boardController.getBoardById);
router.patch('/:boardId', boardController.updateBoard);
router.delete('/:boardId', boardController.deleteBoard);

export default router;