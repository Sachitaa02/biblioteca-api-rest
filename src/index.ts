import express from "express";
import process from "node:process";
import { connectDatabase } from "./config/database";
import bookRoutes from "./routes/bookRoutes";

process.loadEnvFile();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "API de Biblioteca funcionando",
  });
});

app.use("/books", bookRoutes);

async function main(): Promise<void> {
  try {
    await connectDatabase();

    const port = Number(process.env.PORT) || 3000;

    app.listen(port, () => {
      console.log(`Servidor ejecutándose en http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error al iniciar la aplicación:", error);
    process.exit(1);
  }
}

main();