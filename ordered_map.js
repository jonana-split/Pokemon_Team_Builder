/*
COP3530 Data Structures and Algorithms Final Project
The Pokemon Team Builder

TEAM:
Arwen Dowers
Joanna Mijares
Sahan Chery
*/

class orderedPokeMap{
    constructor() {
        this.orderedMap = {};
    }
  
    insert(key, value) {
        this.orderedMap[key] = value;
    }

    get(key) {
        return this.orderedMap[key];
    }

    getAllNames() {
        return Object.keys(this.orderedMap);
    }

  }

// compares pokemon for alphabetical sorting
function comparePokemon(a,b){
    if(a.name < b.name) {
        return -1;
    }
    if(a.name > b.name) {
        return 1;
    }
    return 0;
}

// creates ordered map
let pokeOrderedMap = new orderedPokeMap();

async function getSortedData(){
    // starts with fresh map when getting data
    pokeOrderedMap = new orderedPokeMap();
    try{
        const pokeJson = await fetch('allPokemonData.json');
        if (!pokeJson.ok){
            throw new Error('Cannot capture pokemon');
        }
        const pokeData = await pokeJson.json();
        // sorts pokemon using the compare function
        pokeData.sort(comparePokemon);
        // gets pokemon data from allPokemonData.json
        pokeData.forEach(pokemon => {
            // gets each pokemon's values
            pokeOrderedMap.insert(pokemon.name, {
                name: pokemon.name,
                type: pokemon.type,
                weaknesses: pokemon.weaknesses,
                resistances: pokemon.resistances,
                sprite: pokemon.sprite
            }
            );
        });

        // prints the map
        console.log(pokeOrderedMap);
    } catch (error){
        console.error(error);
    }
    console.log("getSortedData completed");
    return pokeOrderedMap.getAllNames();
}