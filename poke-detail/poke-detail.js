
const urlParams = new URLSearchParams(window.location.search);
const pokemonId = urlParams.get('id');

fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`)
    .then(response => response.json())
    .then(data => {
        const pokemonName = data.name;  
        const pokemonImage = data.sprites.other['dream_world'].front_default; 
        const pokemonTypes = data.types.map(type => type.type.name).join(' • ');  

        document.querySelector('.card h2').textContent = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
        document.querySelector('.card .number').textContent = `#${pokemonId.padStart(3, '0')}`;
        document.querySelector('.card img').src = pokemonImage;
        document.querySelector('.card .type').textContent = pokemonTypes;

        const stats = data.stats.map(stat => {
            return `<p><strong>${stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}:</strong> ${stat.base_stat}</p>`;
        }).join('');
        document.querySelector('.card .stats').innerHTML = stats;
    })
    .catch(error => {
        console.error('Erro ao buscar os dados do Pokémon:', error);
        document.querySelector('.card').innerHTML = '<p>Erro ao carregar as informações do Pokémon.</p>';
    });
