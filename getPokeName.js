function getPokemonNames(){
    
    fetch('./allPokemonData.json')
    .then((response) => response.json())
    .then((pokemonNames) => {
        var pokeNamesList = [];
    
    
        for(let i=0; i < pokemonNames.length; i++){
        pokeNamesList.push(pokemonNames[i].name);
        }
    });
        
}
