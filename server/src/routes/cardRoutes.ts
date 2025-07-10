import { Router } from "express";
import {
  createCard,
  getCardsByBoard,
  updateCard,
  deleteCard,
  moveCard,
} from "../controllers/cardController";

const router = Router();

router.post("/", createCard);
router.get("/board/:boardId", getCardsByBoard);
router.patch("/:id", updateCard);
router.delete("/:id", deleteCard);
router.patch("/:id/move", moveCard);

export default router;
