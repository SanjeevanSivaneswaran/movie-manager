import { Box } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import CreatePage from "./pages/CreatePage";
import Homepage from "./pages/Homepage";
import Navbar from "./components/Navbar";
import { useColorModeValue } from "@chakra-ui/react";
import { useMoviestore } from "./store/movie";

function App() {
  const {movies} = useMoviestore();

  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </Box>
  )
}

export default App;
