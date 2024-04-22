/*
COP3530 Data Structures and Algorithms Final Project
The Pokemon Team Builder

TEAM:
Arwen Dowers
Joanna Mijares
Sahan Chery
*/

const NodeColor = {
    RED: 'RED',
    BLACK: 'BLACK',
  }
  
  class RBTNode {
    constructor(key, value, parent = null) {
      this.key = key;
    this.value = value;
      this.left = null;
      this.right = null;
      this.parent = parent;
      this.color = NodeColor.RED;
    }
  }

class orderedPokeMap{

    constructor() {
        this.root = null
      }

      insert(key, value) {

        const insertHelper = (node) => {
          const currNode = node
    
          if (key < currNode.key) {
            if (currNode.left) {
              insertHelper(currNode.left)
            } else {
              currNode.left = new RBTNode(key, value, currNode)
              currNode.left.parent = currNode
              this.fixInsert(currNode.left)
            }
          } else if (key > currNode.key) {
        
            if (currNode.right) {
              insertHelper(currNode.right)
            } else {
    
              currNode.right = new RBTNode(key, value, currNode)
              currNode.right.parent = currNode
              this.fixInsert(currNode.right)
            }
          }
  
        }
    
        if (!this.root) {
         
          this.root = new RBTNode(key, value, this.root)
          this.fixInsert(this.root)
        } else {
          insertHelper(this.root)
        }
      }


      fixInsert(node) {

        let currNode = node
    
        while (currNode.parent && currNode.parent.color === NodeColor.RED && currNode.parent.parent) {
          const { parent } = currNode
          const grandparent = parent.parent
    
          if (parent === grandparent.left) {
            if (grandparent.right && grandparent.right.color === NodeColor.RED) {
                //flip colors!
                grandparent.color = NodeColor.RED;
                grandparent.left.color = NodeColor.BLACK;
                grandparent.right.color = NodeColor.BLACK;
              
            } else {

              if (currNode === parent.right) {
                this.rotateLeft(parent)
                currNode = parent
              }
             
              this.rotateRight(grandparent)
            }
          } else {
            if (grandparent.left && grandparent.left.color === NodeColor.RED) {
                grandparent.color = NodeColor.RED;
                grandparent.left.color = NodeColor.BLACK;
                grandparent.right.color = NodeColor.BLACK;
                currNode = grandparent;
            } else {
              if (currNode === parent.left) {
                this.rotateRight(parent)
                currNode = parent
              }
              this.rotateLeft(grandparent)
            }
          }
          currNode = grandparent
        }
        this.root.color = NodeColor.BLACK
      }


      rotateLeft(node) {
        const currNode = node.right
    
        node.right = currNode.left
    
        currNode.left = node
    
        currNode.color = node.color
        node.color = NodeColor.RED
        
        const parent = node.parent;
        if (!parent) {
          this.root = currNode
        }
        else if (node === parent.left) {
          parent.left = currNode
        }
        else {
          parent.right = currNode
        }

            currNode.parent = node.parent
        
            node.parent = currNode
        
            if (node.right) {
            node.right.parent = node
            }
        }
    
      rotateRight(node) {
        const currNode = node.left
    
        node.left = currNode.right
    
        currNode.right = node
    
        currNode.color = node.color
    
        node.color = NodeColor.RED
    
        const parent = node.parent;
        if (!parent) {
          this.root = currNode
        }
        else if (node === parent.left) {
          parent.left = currNode
        }
        else {
          parent.right = currNode
        }

        currNode.parent = node.parent
    
        node.parent = currNode
    
        if (node.left) {
          node.left.parent = node
        }
      }

      _replaceParent(currNode, newNode) {
        const { parent } = currNode
        if (!parent) {
          this.root = newNode
        }
        else if (currNode === parent.left) {
          parent.left = newNode
        }
        else {
          parent.right = newNode
        }
      }
      
      //modified search and/or delete function! gets the value associated with key recursively
      get(key, node = this.root) {
        
        if(!node){
            return null;
        }

        if(key == node.key){
            return node.value;
        }

        if(key < node.key){
            return this.get(key, node.left);
        }

        return this.get(key, node.right);
        
    }

    //inorder traversal of tree in order to get all names
    inorder(node, allNames){
        if(node == null){
            return;
        }

        this.inorder(node.left, allNames);
        allNames.push(node.key);
        this.inorder(node.right, allNames);

    }

    //creates an array of all pokemon names
    getAllNames(){
        
        let allNames = [];

       this.inorder(this.root, allNames);

        //allNames.push("meow");

        console.log("Names:", allNames);

        return allNames;

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