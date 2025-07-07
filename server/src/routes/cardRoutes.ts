import { Router } from 'express';
import * as cardController from '../controllers/cardController';

const router = Router();

router.post('/', cardController.createCard);
router.get('/board/:boardId', cardController.getCardsByBoard);
router.patch('/:id', cardController.updateCard);
router.delete('/:id', cardController.deleteCard);
router.patch('/:id/move', cardController.moveCard);

export default router;