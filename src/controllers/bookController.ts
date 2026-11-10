import { Request, Response } from "express";
import { Book } from "../models/Book";

export async function getBooks(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const books = await Book.find();

    res.status(200).json({
      success: true,
      message: "Libros obtenidos correctamente.",
      data: books,
    });
  } catch (error) {
    console.error("Error al obtener los libros:", error);

    res.status(500).json({
      success: false,
      message: "Error interno del servidor.",
    });
  }
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

export async function createBook(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const {
      title,
      author,
      publishedYear,
      genre,
      available,
    } = req.body;

    const newBook = await Book.create({
      title,
      author,
      publishedYear,
      genre,
      available,
    });

    res.status(201).json({
      success: true,
      message: "Libro creado correctamente.",
      data: newBook,
    });
  } catch (error) {
    console.error("Error al crear el libro:", error);

    res.status(500).json({
      success: false,
      message: "Error interno del servidor.",
    });
  }
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