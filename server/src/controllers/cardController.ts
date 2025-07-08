import { Request, Response } from 'express';
import Card from '../models/cardModel';

async function createCard(req: Request, res: Response): Promise<any> {
  try {
    const { title, description, boardId } = req.body;

    if (!title || !description || !boardId) {
      return res.status(400).json({ message: "Missing data" });
    }

    const newCard = new Card({ title, description, boardId });

    await newCard.save();

    res.status(201).json(newCard);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error saving card");
  }
}

async function getCardsByBoard(req: Request, res: Response): Promise<any> {
  try {
    const id = req.params.boardId

    const cards = await Card.find({ boardId: id })

    if (cards.length === 0) {
      return res.status(404).json({ message: 'No boards found' });
    }

    res.status(201).json(cards)

  } catch (err) {
    console.error(err);
    return res.status(500).send("Error fetching cards");
  }
}

async function updateCard(req: Request, res: Response): Promise<any> {
  try {
    const cardId = req.params.id; 
    const updateData = req.body;

    const updatedCard = await Card.findByIdAndUpdate(
      cardId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedCard) {
      return res.status(404).json({ message: 'Card not found' });
    }

    res.status(200).json(updatedCard);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating card' });
  }
}

async function deleteCard(req: Request, res: Response): Promise<any> {
  try {
    const cardId = req.params.id;

    const deletedCard = await Card.findByIdAndDelete(cardId);

    if (!deletedCard) {
      return res.status(404).json({ message: 'Card not found' });
    }

    res.status(200).json({ message: 'Card deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting card' });
  }
}

async function moveCard(req: Request, res: Response): Promise<any> {
  return
}

export {
    createCard,
    getCardsByBoard,
    updateCard,
    deleteCard,
    moveCard,
}