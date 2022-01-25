import express from "express";
import api from "./routes/index";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import { createConnection } from "typeorm";


createConnection().then((connection) => {
  const app = express();
  //Middleware
  app.use(express.json());
  app.use(
    cors({
      credentials: true,
      origin: "http://localhost:3000",
    })
  );
  app.use(cookieParser());

  app.use(api);

  const PORT: Number = Number(process.env.PORT as string) || 5000;
  app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
}).catch(error => {
    console.log("Error:",error)
});

