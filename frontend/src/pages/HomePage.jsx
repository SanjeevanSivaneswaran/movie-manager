import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";

import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useMoviestore } from "../store/movie.js";
import MovieCard from "../components/MovieCard.jsx";


const Homepage = () => {
  const { fetchMovies, movies} = useMoviestore();

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);
  console.log("Movies: ",movies);

  return (
    <Container maxW='container.xl' py={12}>
			<VStack spacing={8}>
				<Text
					fontSize={"30"}
					fontWeight={"bold"}
					bgGradient={"linear(to-r, cyan.400, blue.500)"}
					bgClip={"text"}
					textAlign={"center"}
				>
					Watched Movies
				</Text>

				<SimpleGrid
					columns={{
						base: 1,
						md: 2,
						lg: 3,
					}}
					spacing={10}
					w={"full"}
				>
					{movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
				</SimpleGrid>

				{movies.length === 0 && (
					<Text fontSize='xl' textAlign={"center"} fontWeight='bold' color='gray.500'>
						No Movies Watched{" "}
						<Link to={"/create"}>
							<Text as='span' color='blue.500' _hover={{ textDecoration: "underline" }}>
								Add Watched Movies
							</Text>
						</Link>
					</Text>
				)}
			</VStack>
		</Container>
  )
}

export default Homepage
