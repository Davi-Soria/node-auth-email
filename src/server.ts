import express from "express";
import dotenv from "dotenv";
import routes from "./routes/routes";
import cors from "cors";
import { syncDatabase } from "./config/sync";

dotenv.config();

const server = express();

const port = process.env.PORT || 3000;

server.use(cors());
server.use(express.json());

server.use("/api", routes);

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
});

syncDatabase();


