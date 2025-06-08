
const API_KEY ="3c7f7ddda16f40a054d771dd54da493f"
const BASE_URL ="https://api.themoviedb.org/3"

export const getPopularMovies = async () =>{
    const response = await fetch (`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await response.json()
    return data.results
};

export const searchMovies = async (query) =>{
const response = await fetch (`${BASE_URL}/movie/popular?api_key=${API_KEY}&query= ${encodedURIComponent(query)}`);
    const data = await response.json()
    return data.results
};