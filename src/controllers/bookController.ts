import { Request, Response } from "express";
import mongoose from "mongoose";
import { Book } from "../models/Book";
import { sendError, sendSuccess } from "../utils/response";

export async function getBooks(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const books = await Book.find();

    sendSuccess(
      res,
      200,
      "Libros obtenidos correctamente.",
      books
    );
  } catch (error) {
    console.error("Error al obtener los libros:", error);

    sendError(
      res,
      500,
      "Error interno del servidor."
    );
  }
}

export async function getBookById(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      sendError(res, 400, "ID de libro inválido.");
      return;
    }

    const book = await Book.findById(id);

    if (!book) {
      sendError(res, 404, "Libro no encontrado.");
      return;
    }

    sendSuccess(
      res,
      200,
      "Libro obtenido correctamente.",
      book
    );
  } catch (error) {
    console.error("Error al obtener el libro:", error);

    sendError(
      res,
      500,
      "Error interno del servidor."
    );
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

    sendSuccess(
      res,
      201,
      "Libro creado correctamente.",
      newBook
    );
  } catch (error: unknown) {
    console.error("Error al crear el libro:", error);

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000
    ) {
      sendError(
        res,
        409,
        "Ya existe un libro con ese título."
      );
      return;
    }

    if (error instanceof mongoose.Error.ValidationError) {
      sendError(
        res,
        400,
        "Los datos enviados no son válidos."
      );
      return;
    }

    sendError(
      res,
      500,
      "Error interno del servidor."
    );
  }
}

export async function updateBook(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      sendError(res, 400, "ID de libro inválido.");
      return;
    }

    const updatedBook = await Book.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedBook) {
      sendError(res, 404, "Libro no encontrado.");
      return;
    }

    sendSuccess(
      res,
      200,
      "Libro actualizado correctamente.",
      updatedBook
    );
  } catch (error: unknown) {
    console.error("Error al actualizar el libro:", error);

    if (
      typeof error === "object" &&
      error !== null &&
      "code" in error &&
      error.code === 11000
    ) {
      sendError(
        res,
        409,
        "Ya existe un libro con ese título."
      );
      return;
    }

    if (error instanceof mongoose.Error.ValidationError) {
      sendError(
        res,
        400,
        "Los datos enviados no son válidos."
      );
      return;
    }

    sendError(
      res,
      500,
      "Error interno del servidor."
    );
  }
}

export async function deleteBook(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      sendError(res, 400, "ID de libro inválido.");
      return;
    }

    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      sendError(res, 404, "Libro no encontrado.");
      return;
    }

    sendSuccess(
      res,
      200,
      "Libro eliminado correctamente.",
      deletedBook
    );
  } catch (error) {
    console.error("Error al eliminar el libro:", error);

    sendError(
      res,
      500,
      "Error interno del servidor."
    );
  }
}