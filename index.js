

async function getUsers() {
    let url = 'https://swapi.dev/api/people/';
    try {
        let res = await fetch(url);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}

async function renderUsers() {
    let person = await getUsers();
    let vehicles = '';
    let html = '';
    console.log(person)
    person.results.forEach(results => {
        if(results.vehicles == ""){
            vehicles = '<h3>This character has no vehicles :(</h3>'
        }
        else {
            vehicles = '<a href="${results.vehicles}">Vehicles of the character</a>'
        }
        let htmlSegment = `<div class="user">
                            <h2>${results.name} ${results.height}</h2>
                            <div class="vehicles">${vehicles}</div>
                        </div>`;

        html += htmlSegment;
    });

    let container = document.querySelector('.container');
    container.innerHTML = html;
}


renderUsers()
