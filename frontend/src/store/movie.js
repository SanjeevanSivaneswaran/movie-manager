import {create} from 'zustand';

export const useMoviestore = create((set) => ({
    movies: [],
    setMovies: (movies) => set({movies}),

    addMovie: async(newMovie) => {
        if(!newMovie.title || !newMovie.genre || !newMovie.plot || !newMovie.image){
            return {success: false, message: "Please fill in all fields"};
        }
        const res = await fetch("/api/movies", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(newMovie),
        });
        const data = await res.json();
        set((state) => ({movies: [...state.movies, data.data]}));
        return {success: true, message: "Movie added successfully..."};
    },

    fetchMovies: async() => {
        const res = await fetch("/api/movies");
        const data = await res.json();
        set({movies: data.data});
    },

    deleteMovie: async (pid) => {
		const res = await fetch(`/api/movies/${pid}`, {
			method: "DELETE",
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		set((state) => ({ movies: state.movies.filter((movie) => movie._id !== pid) }));
		return { success: true, message: data.message };
	},

	updateMovie: async (pid, updatedMovie) => {
		const res = await fetch(`/api/movies/${pid}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json", 
			},
			body: JSON.stringify(updatedMovie),
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		set((state) => ({
			movies: state.movies.map((movie) => (movie._id === pid ? data.data : movie)),
		}));

		return { success: true, message: data.message };
	},
}));