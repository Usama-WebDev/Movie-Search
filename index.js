const API_KEY = "16e495ab"; 

const searchBtn = document.getElementById("search-btn");
const movieInput = document.getElementById("movie-input");
const resultContainer = document.getElementById("result-container");

async function getMovie() {
    const movieName = movieInput.value.trim();

    // Prevent empty search
    if (movieName.length <= 0) {
        if (resultContainer) {
            resultContainer.innerHTML = `<p style="color: red">Please enter a movie!</p>`;
        }
        return;
    }


    // API endpoint
    const url = `https://omdbapi.com/?t=${encodeURIComponent(movieName)}&apiKey=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)

        // <img src="${data.Poster} />
        if(data.Response === "True") {
            resultContainer.innerHTML = `
            
            <h2>${data.Title} (${data.Year})</h2>
            <p>Genre: ${data.Genre} </p>
            <p>Director: ${data.Director} </p>

            `
        } else {
            resultContainer.innerHTML = `<p style="color: red">Can't find the movie</p>`
        }
        
    } catch (error) {
        console.log("Error while fetching the movie", error);
        if (resultContainer) {
            resultContainer.innerHTML = `<p style="color: red">Something went wrong. Try again later.</p>`; // Fixed </P> typo
        }
    }
}

searchBtn.addEventListener("click", getMovie);
