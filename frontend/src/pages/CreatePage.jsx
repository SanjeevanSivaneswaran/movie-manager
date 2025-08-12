import React, { useState } from 'react';
import { Container, VStack, Heading, Box, Input, Textarea, Button, useToast } from '@chakra-ui/react';
import { useMoviestore } from '../store/movie';


const CreatePage = () => {

    const [movie,setMovie] = useState({
        title: '',
        genre: '',
        plot: '',
        image: '',
    });

    const toast = useToast();

    const {addMovie} = useMoviestore();
    
    const handleAddMovie = async() => {
        const {success, message} = await addMovie(movie);
        if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: message,
				status: "success",
				isClosable: true,
			});
		}
		setMovie({ title: "", genre: "", plot: "", image:"" });
	};


  return (
    <Container maxW={'container.sm'}>
        <VStack spacing={8}>
            <Heading as={'h1'} size={'2xl'} textAlign={'center'} mb={8}>
                Add Watched Movies
            </Heading>

            <Box
                w={'full'} p={6} bg={'white'} rounded={'lg'} shadow={'md'} 
            >
                <VStack spacing={4}>
                    <Input
                        placeholder='Movie Title with Year'
                        name='title'
                        value={movie.title}
                        onChange={(e) => setMovie({...movie, title: e.target.value})}
                    />

                    <Input
                        placeholder='Genre'
                        name='genre'
                        value={movie.genre}
                        onChange={(e) => setMovie({...movie, genre: e.target.value})}
                    />

                    <Textarea
                        placeholder='Plot'
                        name='plot'
                        value={movie.plot}
                        onChange={(e) => setMovie({...movie, plot: e.target.value})}    
                    />

                    <Input
                        placeholder='Image URL'
                        name='image'
                        value={movie.image}
                        onChange={(e) => setMovie({...movie, image: e.target.value})}
                    />

                    <Button colorScheme='blue' w={'full'} mt={4} onClick={handleAddMovie}>
                        Add Movie
                    </Button>
                </VStack>

            </Box>
        </VStack>
    </Container>
  )
};

export default CreatePage
