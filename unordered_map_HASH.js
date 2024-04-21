//unordered map using hash map as backing data structure
class unorderedPokeMap{
    constructor() {
      this.unorderedMap = {};
      this.size = 0;
    }

    hash(key){
        var hash = key.toString().length % this.size;
        return hash;
    }
  
    insert(key, value) {
      
      const index = this.hash(key);

      this.unorderedMap[index] = [key, value];
      this.size++;
    }

}

const pokeMap = new unorderedPokeMap(); //create an unordered map as a javascript object

async function getData(){
    try{
        const pokeJson = await fetch('allPokemonData.json');
        if (!pokeJson.ok){
            throw new Error('Cannot capture pokemon');
        }
        const pokeData = await pokeJson.json();
        //Gets pokemon data from JSON
        pokeData.forEach(pokemon => {
            pokeMap.insert(pokemon.name,{
                type: pokemon.type,
                weaknesses: pokemon.weaknesses,
                resistances: pokemon.resistances,
                sprite: pokemon.sprite}
            );
    });

        console.log(pokeMap); //Prints the map
    } catch (error){
        console.error(error);
    }
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


getData(); //Calls function to get and read data from the JSON file