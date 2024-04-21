//CITATIONS:
//Hash Tables in JavaScript from scratch
//https://www.freecodecamp.org/news/javascript-hash-table-associative-array-hashing-in-js/
//https://www.educative.io/blog/data-strucutres-hash-table-javascript#implement
//MULTIPLE VALUES TO HASH TABLE: https://stackoverflow.com/questions/33381583/how-to-add-many-values-to-one-key-in-javascript-object


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


function getPokemons(){

fetch('./onlyIvysaur.json')
    .then((response) => response.json())
    .then((pokemon) => {
        pokemons(pokemon);
    });
    
}


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