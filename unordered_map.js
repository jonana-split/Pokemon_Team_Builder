//CITATIONS:

//Hash Maps
//https://www.freecodecamp.org/news/javascript-hash-table-associative-array-hashing-in-js/
//https://www.educative.io/blog/data-strucutres-hash-table-javascript#implement
//https://www.youtube.com/watch?v=y3CcHKEM8r8
//https://www.squash.io/javascript-hashmap-a-complete-guide/#:~:text=To%20implement%20a%20HashMap%2C%20we,list%20of%20key%2Dvalue%20pairs.

class unorderedPokeMap{
    constructor() {
        this.unorderedMap = [];
        this.size = 10000;
    }

    hash(key){
        var hash = key.toString().length % this.size;
        return hash;
    }
  
    insert(key, value) {
        const index = this.hash(key);

        if (!this.unorderedMap[index]) {
            this.unorderedMap[index] = [];
        }

        this.unorderedMap[index].push([key, value]);
    }

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

let pokeMap = new unorderedPokeMap(); //create an unordered map as a javascript object

async function getData(){
    pokeMap = new unorderedPokeMap();
    try{
        const pokeJson = await fetch('allPokemonData.json');
        if (!pokeJson.ok){
            throw new Error('Cannot capture pokemon');
        }
        const pokeData = await pokeJson.json();
        //Gets pokemon data from JSON
        pokeData.forEach(pokemon => {
            pokeMap.insert(pokemon.name, {
                name: pokemon.name,
                type: pokemon.type,
                weaknesses: pokemon.weaknesses,
                resistances: pokemon.resistances,
                sprite: pokemon.sprite
            }
            );
    });

        console.log(pokeMap); //Prints the map
    } catch (error){
        console.error(error);
    }
    console.log("getData completed");
    return pokeMap.getAllNames();
}

async function weakAndstr(){
    try{
        for (const pokeName in pokeMap){
            const poke = pokeMap[pokeName];
            const pokeType = poke.type;

            const pokeRes = await fetch('allPokemonData.json');
            if (!pokeRes.ok){
                throw new Error('Could not catch pokemon');
            }

            const pokeData = await pokeRes.json();
            const pokeDamage = pokeData.poke_damage;
            //Updates weaknesses and resistances based on damage relations
            pokeDamage.double_damage_from.forEach(weakness =>{
                pokemon.weaknesses.push(weakness.name);
            });
            pokeDamage.half_damage_from.forEach(resistance => {
                pokemon.resistances.push(resistance.name);
            });
        }
        console.log(pokeMap); //prints unordered map
    } catch (error){
        console.error(error);
    }
}


//getData(); //Calls function to get and read data from the JSON file