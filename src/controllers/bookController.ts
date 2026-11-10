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

export async function getBookById(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);

    if (!book) {
      res.status(404).json({
        success: false,
        message: "Libro no encontrado.",
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: "Libro obtenido correctamente.",
      data: book,
    });
  } catch (error) {
    console.error("Error al obtener el libro:", error);

    res.status(400).json({
      success: false,
      message: "ID de libro inválido.",
    });
  }
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

export async function updateBook(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { id } = req.params;

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedBook) {
      res.status(404).json({
        success: false,
        message: "Libro no encontrado.",
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: "Libro actualizado correctamente.",
      data: updatedBook,
    });
  } catch (error) {
    console.error("Error al actualizar el libro:", error);

    res.status(400).json({
      success: false,
      message: "No se pudo actualizar el libro.",
    });
  }
}

export async function deleteBook(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { id } = req.params;

    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      res.status(404).json({
        success: false,
        message: "Libro no encontrado.",
      });

      return;
    }

    res.status(200).json({
      success: true,
      message: "Libro eliminado correctamente.",
      data: deletedBook,
    });
  } catch (error) {
    console.error("Error al eliminar el libro:", error);

    res.status(400).json({
      success: false,
      message: "No se pudo eliminar el libro.",
    });
  }
}