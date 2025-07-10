import type { Board } from "../types";

const BASE_URL = "https://task-manager-kfnk.onrender.com/api/boards";

// GET all boards

export async function getAllBoards(): Promise<Board[]> {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch boards");
  return await res.json();
}

// GET board by id

export async function getBoardById(boardId: string): Promise<Board> {
  const res = await fetch(`${BASE_URL}/${boardId}`);
  if (!res.ok) throw new Error("Failed to fetch board");
  return await res.json();
}

// POST new board

export async function addNewBoard(board: {
  id: string;
  name: string;
}): Promise<Board> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(board),
  });

  if (!res.ok) throw new Error("Failed to post board");
  return await res.json();
}

// PATCH update a board

export async function updateBoard(
  boardId: string,
  update: Partial<Board>,
): Promise<Board> {
  const res = await fetch(`${BASE_URL}/${boardId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(update),
  });
  if (!res.ok) throw new Error("Failed to update board");
  return await res.json();
}

export async function deleteBoard(boardId: string): Promise<Board> {
  const res = await fetch(`${BASE_URL}/${boardId}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to detele board");
  return await res.json();
}
