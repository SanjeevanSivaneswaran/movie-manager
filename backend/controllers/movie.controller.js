import Movie from "../models/movie.model.js";
import mongoose from "mongoose";

export const addMovies = async(req,res) => {
    const movie = req.body;

    if(!movie.title || !movie.genre || !movie.plot || !movie.image) {
        return res.status(400).json({success: false, message: "All fields are required"});
    }

    const newMovie = new Movie(movie);

    try{
        await newMovie.save();
        res.status(201).json({success: true, message: "Movie added successfully", data: newMovie});
    } catch(error) {
        console.log(error);
        res.status(500).json({success: false, message: "Internal server error"});
    }
};

export const getMovies = async(req, res) => {
    try{
        const movies = await Movie.find({});
        res.status(200).json({success: true, data: movies});
    } catch(error) {
        console.log(error);
        res.status(500).json({success: false, message: "Internal server error"});
    }
};

export const updateMovie = async(req,res)=> {
    try{
        const {id} = req.params;
        const movie = req.body;

        if(!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({success: false, message: "Invalid movie ID"});
        }

        const updatedMovie = await Movie.findByIdAndUpdate(id, movie, {new:true});
        res.status(200).json({success: true, message: "Movie updated successfully", data: updatedMovie});
    } catch(error) {
        console.log(error);
        res.status(500).json({success: false, message: "Internal server error"});
    }
};

export const deleteMovie = async(req, res) => {
    const {id} = req.params;

    try{
        const movie = await Movie.findByIdAndDelete(id);
        if(!movie) {
            return res.status(404).json({success: false, message: "Movie not found"});
        }   
        res.status(200).json({success: true, message: "Movie deleted successfully"});  
    } catch(error) {
        console.log(error);
        res.status(500).json({success: false, message: "Internal server error"});
    }
};