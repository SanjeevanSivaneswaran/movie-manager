import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Box,Button,Heading,HStack,IconButton,Image,Input,Modal,ModalBody,ModalCloseButton,ModalContent,ModalFooter,ModalHeader,ModalOverlay,Text,useDisclosure,useToast,VStack,Textarea
} from "@chakra-ui/react";
import { useMoviestore } from "../store/movie";
import {useState} from 'react';

const MovieCard = ({movie}) => {
    const [updatedMovie, setUpdatedMovie] = useState(movie);

    const { deleteMovie, updateMovie } = useMoviestore();
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();

    const handleDeleteMovie = async (pid) => {
		const { success, message } = await deleteMovie(pid);
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: message,
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
	};

    const handleUpdateMovie = async (pid, updatedMovieData) => {
		const { success, message } = await updateMovie(pid, updatedMovieData);
		onClose();
		if (!success) {
			toast({
				title: "Error",
				description: message,
				status: "error",
				duration: 3000,
				isClosable: true,
			});
		} else {
			toast({
				title: "Success",
				description: "Movie updated successfully",
				status: "success",
				duration: 3000,
				isClosable: true,
			});
		}
	};

  return (
    <Box
			shadow='lg'
			rounded='lg'
			overflow='hidden'
			transition='all 0.3s'
			_hover={{ transform: "translateY(-5px)", shadow: "xl" }}
			bg={'white'}
		>
			<Image src={movie.image} alt={movie.name} h={48} w='full' objectFit='cover' />

			<Box p={4}>
				<Heading as='h3' size='md' mb={2}>
					{movie.title}
				</Heading>

				<Text fontStyle='italic' fontSize='l' color={"black"} mb={4}>
					{movie.genre}
				</Text>

                <Text  fontSize='l' color={"black"} mb={4}>
					{movie.plot}
				</Text>

				<HStack spacing={2}>
					<IconButton icon={<EditIcon />} onClick={onOpen} colorScheme='blue' />
					<IconButton
						icon={<DeleteIcon />}
						onClick={() => handleDeleteMovie(movie._id)}
						colorScheme='red'
					/>
				</HStack>
			</Box>

			<Modal isOpen={isOpen} onClose={onClose}>
				<ModalOverlay />

				<ModalContent>
					<ModalHeader>Update Movie</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<VStack spacing={4}>
							<Input
								placeholder='Movie Title with Year'
								name='title'
								value={updatedMovie.title}
								onChange={(e) => setUpdatedMovie({ ...updatedMovie, title: e.target.value })}
							/>
							<Input
								placeholder='Genre'
								name='genre'
								value={updatedMovie.genre}
								onChange={(e) => setUpdatedMovie({ ...updatedMovie, genre: e.target.value })}
							/>
                            <Textarea
                                placeholder='Plot'
                                name='plot'
                                value={updatedMovie.plot}
                                onChange={(e) => setUpdatedMovie({...updatedMovie, plot: e.target.value})}    
                            />
							<Input
								placeholder='Image URL'
								name='image'
								value={updatedMovie.image}
								onChange={(e) => setUpdatedMovie({ ...updatedMovie, image: e.target.value })}
							/>
						</VStack>
					</ModalBody>

					<ModalFooter>
						<Button
							colorScheme='blue'
							mr={3}
							onClick={() => handleUpdateMovie(movie._id, updatedMovie)}
						>
							Update
						</Button>
						<Button variant='ghost' onClick={onClose}>
							Cancel
						</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</Box>
  )
}

export default MovieCard
