import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import router from './routes/movie.route.js';

dotenv.config();

console.log(process.env.MONGO_URL);

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/api/movies", router);

app.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});

