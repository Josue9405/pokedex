function findPokemon(pokemonName){
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`;
    fetch(url).then((res) => {
        if (res.status != "200") {
            console.log(res);
            pokeImage("./pokemon-sad.gif")
        }
        else {
            return res.json();
        }
    }).then((data) => {
        if (data) {
            console.log(data);
            const pokemonName = document.getElementById("pokemonName");
            pokemonName.innerHTML = data.name.toUpperCase();
            var types = '';
            var moves = '';
            var stats = '';
            data.types.forEach(function (type){
                types += '<img src="static/img/'+type.type.name+'.png" class="poketype">';
            });
            console.log(data.moves)
            data.moves.forEach(function(move){
                moves += '<tr><td>'+move.move.name.toUpperCase()+'</td><tr>';
            });
            data.stats.forEach(function(stat){
                stats += '<td style="vertical-align:bottom;"><div style="background-color: blue; text-align:center; color:white; height:'+stat.base_stat+'px">'+stat.base_stat+'</td>'
            });
            document.getElementById("pokemonTypes").innerHTML = types;
            document.getElementById("pokemonMoves").innerHTML = moves;
            document.getElementById("pokemonStats").innerHTML = stats;
            let pokeImg = data.sprites.front_default;
            pokeImage(pokeImg);
            console.log(pokeImg);
        }
    });
}

const pokeImage = (url) => {
    const pokePhoto = document.getElementById("pokemonSprite");
    pokePhoto.src = url;
}