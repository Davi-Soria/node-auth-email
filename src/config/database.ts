import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
    process.env.DB_NAME || '',
    process.env.DB_USER || '',
    process.env.DB_PASS || '',
    {
        host: process.env.DB_HOST || "localhost",
        dialect: "postgres",
        logging: false
    }
);

sequelize.authenticate()
  .then(() => {
    console.log("🟢 Conectado ao banco com sucesso!");
    console.log(`📛 Banco: ${process.env.DB_NAME}`);
  })
  .catch((err) => {
    console.error("🔴 Erro ao conectar ao banco:", err);
  });