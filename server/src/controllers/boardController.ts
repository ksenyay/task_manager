import { Request, Response } from "express";
import Board from "../models/boardModel";

async function getAllBoards(req: Request, res: Response): Promise<any> {
  try {
    const boards = await Board.find({});

    if (boards.length === 0) {
      return res.status(404).json({ message: "No boards found" });
    }

    res.status(200).json(boards);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

async function addBoard(req: Request, res: Response): Promise<any> {
  try {
    const { id, name } = req.body;

    if (!id || !name) {
      return res.status(400).json({ message: "Missing id or name" });
    }

    const newBoard = new Board({ id, name });

    await newBoard.save();

    res.status(201).json(newBoard);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Error saving board");
  }
}

async function getBoardById(req: Request, res: Response): Promise<any> {
  try {
    const boardId = req.params.boardId;
    const board = await Board.findOne({ id: boardId });

    if (!board) {
      return res.status(404).json({ message: "Board not found" });
    }

    res.status(200).json(board);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

async function updateBoard(req: Request, res: Response): Promise<any> {
  try {
    const boardId = req.params.boardId;
    const updateData = req.body;

    const updatedBoard = await Board.findOneAndUpdate(
      { id: boardId },
      updateData,
      { new: true, runValidators: true },
    );

    if (!updatedBoard) {
      return res.status(404).json({ message: "Board not found" });
    }

    res.status(200).json(updatedBoard);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating board" });
  }
}

async function deleteBoard(req: Request, res: Response): Promise<any> {
  try {
    const boardId = req.params.boardId;

    const deletedBoard = await Board.findOneAndDelete({ id: boardId });

    if (!deletedBoard) {
      return res.status(404).json({ message: "Board not found" });
    }

    res.status(200).json({ message: "Board deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting board" });
  }
}

export { getAllBoards, addBoard, getBoardById, updateBoard, deleteBoard };
