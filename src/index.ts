import express from "express"
import denotev from "dotenv"
import { connectMongoDB } from "./config/db";
import cors from "cors"
import routerPayments from "./routers/router"
import { errorHandler } from "./middlewares/errorHandler";



denotev.config();
connectMongoDB().then(()=>console.log("Se ha concetado"));

const app = express();
app.use(express.json());

app.use(cors());
app.use(errorHandler)



app.use("/api/payments", routerPayments);

app.listen(process.env.PORT, () => console.log("Servidor en http://localhost:3000"));
