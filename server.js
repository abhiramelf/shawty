import express from "express";
import 'dotenv/config';
import { connectDB } from "./backend/config/db.js"

connectDB();
const app = express();

app.get("/", (req, res) => {
    res.send("App is running!");
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`App is running at URL\n\nhttp://localhost:${process.env.PORT}`);
})