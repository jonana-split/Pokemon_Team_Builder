//CITATIONS:
//Hash Tables in JavaScript from scratch
//
//

class pokeHashTable{
    constructor(){
        
    }
}

function pokeHash(){

}


//CITATIONS:
//Dealing with JSON files and data: 
//https://www.youtube.com/watch?v=Z92PqSyUBSI&t=303s
//https://www.freecodecamp.org/news/how-to-read-json-file-in-javascript/
//https://www.youtube.com/watch?v=1tVCwv_BX2M
//https://stackoverflow.com/questions/63731711/data-from-fetch-url-and-using-that-data-in-another-function-question-about-scop
//SUPER HELPFUL for getting the data to be useful: https://forum.freecodecamp.org/t/help-with-functions-fetch/509448/6

function getPokemons(){

fetch('./onlyIvysaur.json')
    .then((response) => response.json())
    .then((pokemon) => {
        pokemons(pokemon);
    });
    
}

function pokemons(pokemon){
    for(let i=0; i < pokemon.length; i++){
        const pokeName = pokemon[i].name;
        const pokeType = pokemon[i].types;
        const pokeRes = pokemon[i].resistances;
        const pokeWeak = pokemon[i].weaknesses;


        console.log(pokeName);
        console.log(pokeType);
        console.log(pokeRes);
        console.log(pokeWeak);
    }

}