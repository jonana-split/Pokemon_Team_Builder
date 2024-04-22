/*
COP3530 Data Structures and Algorithms Final Project
The Pokemon Team Builder

TEAM:
Arwen Dowers
Joanna Mijares
Sahan Chery

CITATIONS:
1) https://www.freecodecamp.org/news/javascript-hash-table-associative-array-hashing-in-js/
2) https://www.educative.io/blog/data-strucutres-hash-table-javascript#implement
3) https://www.youtube.com/watch?v=y3CcHKEM8r8
4) https://www.squash.io/javascript-hashmap-a-complete-guide/#:~:text=To%20implement%20a%20HashMap%2C%20we,list%20of%20key%2Dvalue%20pairs.
*/

class unorderedPokeMap{
    constructor() {
        this.unorderedMap = [];
        // bucket size
        this.size = 10000;
    }

    // creates a hash map
    hash(key){
        var hash = key.toString().length % this.size;
        return hash;
    }
  
    // inserts pokemon into the hash map
    insert(key, value) {
        const index = this.hash(key);

        if (!this.unorderedMap[index]) {
            this.unorderedMap[index] = [];
        }

        this.unorderedMap[index].push([key, value]);
    }

    // gets the pokemon from a bucket
    get(key) {
        const index = this.hash(key);
        const bucket = this.unorderedMap[index];
        if (!bucket) {
            return undefined;
        }
        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                return bucket[i][1];
            }
        }
        return undefined;
    }

    // gets a list of all pokemon names
    getAllNames() {
        let allNames = [];
        for(let i = 0; i < this.size; i++) {
            // if there's nothing in the bucket
            if(!this.unorderedMap[i]) {
                continue;
            }

            for(let j = 0; j < this.unorderedMap[i].length; j++) {
                allNames.push(this.unorderedMap[i][j][1].name);
            }
        }
        return allNames;
    }
  }

// creates an unordered map
let pokeMap = new unorderedPokeMap();

async function getData(){
    // starts with a fresh map when getting data
    pokeMap = new unorderedPokeMap();
    try{
        const pokeJson = await fetch('allPokemonData.json');
        if (!pokeJson.ok){
            throw new Error('Cannot capture pokemon');
        }
        const pokeData = await pokeJson.json();
        //gets pokemon data from allPokemonData.json
        pokeData.forEach(pokemon => {
            // gets each pokemon's values
            pokeMap.insert(pokemon.name, {
                name: pokemon.name,
                type: pokemon.type,
                weaknesses: pokemon.weaknesses,
                resistances: pokemon.resistances,
                sprite: pokemon.sprite
            }
            );
    });

        // prints the map
        console.log(pokeMap);
    } catch (error){
        console.error(error);
    }
    console.log("getData completed");
    return pokeMap.getAllNames();
}