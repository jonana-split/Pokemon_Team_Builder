//CITATIONS:
//Hash Tables in JavaScript from scratch
//https://www.freecodecamp.org/news/javascript-hash-table-associative-array-hashing-in-js/
//https://www.educative.io/blog/data-strucutres-hash-table-javascript#implement

class pokeHashTable{
        constructor() {
          
        }
      
        calculateHash(key) {
        }
      
        add(key, value) {
          
        }
      
        search(key) {
           
        }
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

//MULTIPLE VALUES TO HASH TABLE: https://stackoverflow.com/questions/33381583/how-to-add-many-values-to-one-key-in-javascript-object

function pokemons(pokemon){
    const pokeDex = new pokeHashTable();

    for(let i=0; i < pokemon.length; i++){
        //FIND A WAY TO ADD MULT VALUES TO THE HASH TABLE KEY
        pokeDex.add(pokemon[i].name,pokemon[i].types);
        pokeDex.add(pokemon[i].name, {resistances: [pokemon[i].resistances]});
        pokeDex.add(pokemon[i].name, {weaknesses: [pokemon[i].weaknesses] });
        
        console.log(pokeDex.search(pokemon[i].name));
    }

}