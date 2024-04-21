const fs = require('fs');

const pokeOrdered = [];

function orderedPokemon(){
    try{
        const pokeJson = fs.readFileSync('allPoekmonData.json', 'utf8');
        const pokemonData = JSON.parse(pokeJson);

        //Add pokemon to ordered map
        pokemonData.forEach(pokemon => {
            pokeOrdered.push({
                name: pokemon.name,
                type: pokemon.type,
                weaknesses: pokemon.weaknesses,
                resistances: pokemon.resistances
            });
        });

        console.log("Pokemon data read.");
    } catch (err){
        console.error("Error reading Pokemon", err);
    }
}

orderedPokemon();