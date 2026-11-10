import { Request, Response } from "express";

export function getBooks(
  req: Request,
  res: Response
): void {
  res.status(501).json({
    success: false,
    message: "GET /books todavía no implementado",
  });
}

export function getBookById(
  req: Request,
  res: Response
): void {
  res.status(501).json({
    success: false,
    message: "GET /books/:id todavía no implementado",
  });
}

export function createBook(
  req: Request,
  res: Response
): void {
  res.status(501).json({
    success: false,
    message: "POST /books todavía no implementado",
  });
}

export function updateBook(
  req: Request,
  res: Response
): void {
  res.status(501).json({
    success: false,
    message: "PATCH /books/:id todavía no implementado",
  });
}

export function deleteBook(
  req: Request,
  res: Response
): void {
  res.status(501).json({
    success: false,
    message: "DELETE /books/:id todavía no implementado",
  });
}