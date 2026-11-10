import mongoose from "mongoose";

export async function connectDatabase(): Promise<void> {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    throw new Error(
      "La variable de entorno MONGO_URI no está definida."
    );
  }

  await mongoose.connect(mongoUri);

  console.log("MongoDB conectado correctamente.");
}