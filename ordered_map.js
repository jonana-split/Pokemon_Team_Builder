class orderedPokeMap{
    constructor() {
      
    }
  
    insert(key, value) {
      
    }

  }

const pokeOrderedMap = {}; //create an ordered map as a javascript object

function comparePokemon(a,b){
    if(a.name < b.name) {
        return -1;
    }
    if(a.name > b.name) {
        return 1;
    }
    return 0;
}

async function getSortedData(){
    try{
        const pokeJson = await fetch('allPokemonData.json');
        if (!pokeJson.ok){
            throw new Error('Cannot capture pokemon');
        }
        const pokeData = await pokeJson.json();
        pokeData.sort(comparePokemon);
        //Gets pokemon data from JSON
        pokeData.forEach(pokemon => {
            pokeOrderedMap[pokemon.name] = {
                name: pokemon.name,
                type: pokemon.type,
                weaknesses: pokemon.weaknesses,
                resistances: pokemon.resistances,
                sprite: pokemon.sprite
            };
        });

        console.log(pokeOrderedMap); //Prints the map
    } catch (error){
        console.error(error);
    }
    console.log("getSortedData completed");
    return Object.keys(pokeOrderedMap);
}

/*function orderedPokemon(){
    try{
        const pokeJson = fs.readFileSync('allPokemonData.json', 'utf8');
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

orderedPokemon();*/

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


getSortedData(); //Calls function to get and read data from the JSON file