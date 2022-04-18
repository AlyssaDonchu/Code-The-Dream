


//----------------------------------- Get API call --------------------------------------------------------------\\ 

async function getApiData(url) {
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function renderCharacters(url) {
    let loader = document.querySelector('.loading')
    let characters = await getApiData(url);

//----------------------------------- If there's an API response, hides the loader -------------------------------\\

    if(characters) hideloader()
    let html = '';
    console.log(characters)

//----------------------------------- Goes through each character -------------------------------------------------\\

    characters.results.forEach(results => {

//----------------------------------- Adds character's name, height and vehicle to the html variable ---------------\\

        let htmlSegment = `<div class="character character${results.url}">
                            <div class="profile__img"><img class="profile__img--1" src="./assets/profile.svg"></div>
                            <h2 class="character__name">${results.name}</h2>
                            <p class="character__height">Height: ${results.height}</p>
                            <p class="character__gender">Gender: ${results.gender}</p>`;

        html += htmlSegment;

//----------------------------------- Films URLs come in one chunk, separated by a comma. This part separates each URL\\

        for(const film_url of results.films){
            let htmlSegment = `<a href="#landing-page" class="character__film" id="${film_url}" onclick="renderFilms(this.id)">${film_url}</a>`;
            
            html += htmlSegment;
    }

    html += '</div>'
        
    });

//----------------------------------- Adds all the API data into HTML container ------------------------------------\\

    let container = document.querySelector('.container');
    container.innerHTML += html;

    let nextPageURL = characters.next;
    renderAllPages(nextPageURL)
}

//----------------------------------- Function to render all pages -------------------------------------------------\\

async function renderAllPages(url){
    if(url){
        renderCharacters(url);
    }
    else console.log('All Character pages were rendered')
}

//----------------------------------- Function to hide the loader --------------------------------------------------\\

function hideloader() {
    document.querySelector('.loading').style.display = 'none';
}

//----------------------------------- Function to render Films -----------------------------------------------------\\

async function renderFilms(url){
    document.querySelector('.loading').style.marginTop = '10px';
    document.querySelector('.loading').style.fontSize = '20px';
    document.querySelector('.loading').style.display = 'flex';
    document.querySelector('.loading').innerHTML = "Loading data..."
    let film = await getApiData(url)
    console.log(film.title)
    htmlSegment = `<div class="film__details">
                <p>Film title: ${film.title}</p>
                <p>Was on episode: ${film.episode_id}</p>
                <p>Director: ${film.director}</p>
                <p>Release date: ${film.release_date}</p>
                </div>`

    document.querySelector('.loading').innerHTML = htmlSegment

}

renderCharacters('https://swapi.dev/api/people/')