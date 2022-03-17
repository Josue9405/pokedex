function findPokemon(pokemonName) {
    if (pokemonName !== null) {
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`;
        fetch(url).then((res) => {
            if (!res.ok) {
                pokeImage("static/img/unknown.png")
                fillPokemonData("Pokemon no encontrado",'','','');
            }
            else {
                return res.json();
            }
        }).then((data) => {
            if (typeof data !== 'undefined' && data.hasOwnProperty('name')) {
                pokemonName.innerHTML = data.name.toUpperCase();
                var types = '';
                var moves = '';
                var stats = '';
                data.types.forEach(function (type) {
                    types += '<img src="static/img/' + type.type.name + '.png" class="poketype">';
                });
                data.moves.forEach(function (move) {
                    moves += '<tr><td>' + move.move.name.toUpperCase() + '</td><tr>';
                });
                data.stats.forEach(function (stat) {
                    stats += '<td style="vertical-align:bottom;"><div class="stats-bars" style="height:' + stat.base_stat + 'px">' + stat.base_stat + '</td>'
                });
                fillPokemonData(pokemonName, types, moves, stats);
                let pokeImg = data.sprites.front_default;
                pokeImage(pokeImg);
            }
        });
    }
}

function fillPokemonData(pokemonName, pokemonTypes, pokemonMoves, pokgemonStats){
    document.getElementById("pokemonName").innerHTML = pokemonName;
    document.getElementById("pokemonTypes").innerHTML = pokemonTypes;
    document.getElementById("pokemonMoves").innerHTML = pokemonMoves;
    document.getElementById("pokemonStats").innerHTML = pokgemonStats;
}
 
const pokeImage = (url) => {
    const pokePhoto = document.getElementById("pokemonSprite");
    pokePhoto.src = url;
}