import process from "node:process";
import { connectDatabase } from "./config/database";

process.loadEnvFile();

async function main(): Promise<void> {
  try {
    await connectDatabase();

    console.log("API de Biblioteca iniciada.");
  } catch (error) {
    console.error("Error al iniciar la aplicación:", error);
    process.exit(1);
  }
}

main();