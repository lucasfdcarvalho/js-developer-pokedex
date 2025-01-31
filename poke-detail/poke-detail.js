const body = document.querySelector("body");
const urlParametros = new URLSearchParams(window.location.search);
const idPokemon = urlParametros.get("id");

const buscarPokemon = async (pokemonId) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
            .then((response) => response.json())
            .then((pokemon) => body.innerHTML = montarDetails(pokemon))
            .catch(error => console.error(error))
}

const pegarTypes = (pokemon) => {
    return pokemon.types.map((type) => type.type.name).join("  ");
}

const formatarId = (id) => {
    return id.toString().padStart(3, "0");
}

const pegarStats = (pokemon) => {
    return pokemon.stats.map((stats) => `<p><strong>${stats.stat.name}: ${stats.base_stat}`).join("");
}

const montarDetails = (pokemon) => {
    return `<section class="content" id="${pokemon.types[0].type.name}">
                <div class="pokemon-detail">
                    <div class="header">
                        <h2>${pokemon.name}</h2>
                        <p class="number">${formatarId(pokemon.id)}</p>
                        <img src="${pokemon.sprites.other.dream_world.front_default}" alt="${pokemon.name}">
                        <p class="type">${pegarTypes(pokemon)}</p>

                        <div class="atributos">${pegarStats(pokemon)}</div>
                    </div>
                </div>
            </section>
            
        `
}


idPokemon ? buscarPokemon(idPokemon) : console.log("ID do Pokemon não encontrado");