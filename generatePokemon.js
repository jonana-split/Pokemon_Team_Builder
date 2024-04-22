/*
COP3530 Data Structures and Algorithms Final Project
The Pokemon Team Builder

TEAM:
Arwen Dowers
Joanna Mijares
Sahan Chery

CITATIONS:
1) https://pokeapi.co/
2) https://medium.com/@sergio13prez/fetching-them-all-poke-api-62ca580981a2
*/

// holds all normal pokemon (not fusions)
let allNormalPokemon = [];
// keeps track of API fetches
let allNormalPokemonPromises = [];

// gets pokemon data from the API
function fetchPokemonData(pokemon){
    let url = pokemon.url;
      
    return fetch(url)
      .then(response => response.json())
      .then(function(pokeData){
        let type = pokeData.types[0].type.name;
        // fetches type data
        return fetch(`https://pokeapi.co/api/v2/type/${type}`)
            .then(typeresponse => typeresponse.json())
            .then(function(pokemonType) {
                // gets pokemon's weaknesses and resistances
                let weaknesses = pokemonType.damage_relations.double_damage_from.map(function(x) {return x.name});
                let resistances = pokemonType.damage_relations.half_damage_from.map(function(x) {return x.name});

                // assigns data to variables for a pokemon (sprite is the pokemon image)
                let fetchedPokemon = {
                    name: pokeData.name,
                    type: pokeData.types[0].type.name,
                    weaknesses: weaknesses,
                    resistances: resistances,
                    sprite: pokeData.sprites.front_default
                };

                // adds the pokemon with its data to the allNormalPokemon array
                allNormalPokemon.push(fetchedPokemon);
                // formatting output
                console.log(`${pokeData.name}, ${fetchedPokemon.type}, [${weaknesses}], [${resistances}]`);
            })
            // catches errors
            .catch(function(err){});
        })
    }

// number of pokemon data points
let count = 100000;
// holds all pokemon (normal and fusion ones)
let allPokemon = [];
let allPokemonPromises = [];

async function buildPokemonList() {
    // adds the normal pokemon to the allPokemon array
    for(let i = 0; i < allNormalPokemon.length; i++) {
        // adds variables to pokemon for the allPokemon array
        let fetchedPokemon = {
            name: allNormalPokemon[i].name,
            type: allNormalPokemon[i].type,
            weaknesses: allNormalPokemon[i].weaknesses,
            resistances: allNormalPokemon[i].resistances,
            sprite: allNormalPokemon[i].sprite
        };

        // pushes pokemon to allPokemon array
        allPokemon.push(fetchedPokemon);
        count--;
    }

    // builds the fusion pokemon using pairs of two pokemon
    for(let i = 0; i < allNormalPokemon.length; i++) {
        for(let j = 0; j < allNormalPokemon.length; j++) {
            // if the two pokemon in the pair are not the same
            if(i !== j) {
                // merges the two pokemon's names
                let fusionName = allNormalPokemon[i].name.slice(0, 4);
                fusionName += allNormalPokemon[j].name.slice(-4);
                // gets variables for the fused pokemon (uses first pokemon's values)
                let fetchedFusedPokemon = {
                    name: fusionName,
                    type: allNormalPokemon[i].type,
                    weaknesses: allNormalPokemon[i].weaknesses,
                    resistances: allNormalPokemon[i].resistances,
                    sprite: allNormalPokemon[i].sprite
                };

                // adds the fusion pokemon to the allPokemon array
                allPokemon.push(fetchedFusedPokemon);
                count--;
            }

            // once number of pokemon data points has been reached
            if(count <= 0) {
                break;
            }
        }

        if(count <= 0) {
            break;
        }
    }

    Promise.all(allPokemonPromises).then(() => {        
        console.log('DONE GENERATING POKEMON.  All pokemon count = ', allPokemon.length);
        console.log('View allPokemon to see results.');
    });
}

// fetches list of all pokemon from API
async function fetchPokemon(){
    fetch('https://pokeapi.co/api/v2/pokemon?limit=100000')
     .then(response => response.json())
     .then(function(allpokemon) {
        allpokemon.results.forEach(function(pokemon){
            allNormalPokemonPromises.push(fetchPokemonData(pokemon));
        })
     })
     .then(function() {
        Promise.all(allNormalPokemonPromises).then(() => {        
            console.log('DONE.  Normal pokemon count = ', allNormalPokemon.length);
            buildPokemonList();
        });
     });
   }

// run the below command to execute this code in the console window
fetchPokemon();