import express from 'express'; 
import {addMovies, getMovies, updateMovie, deleteMovie } from '../controllers/movie.controller.js';

const router = express.Router();

router.post("/", addMovies);

router.get("/", getMovies);

router.put("/:id", updateMovie);

router.delete("/:id", deleteMovie); 

export default router;