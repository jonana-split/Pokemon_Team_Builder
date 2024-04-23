/*
COP3530 Data Structures and Algorithms Final Project
The Pokemon Team Builder

TEAM:
Arwen Dowers
Joanna Mijares
Sahan Chery
*/


//Implementing RedBlack trees in JavaScript
//Class Slides 96-146 4 - Balanced Trees.pdf
//https://www.sahinarslan.tech/posts/deep-dive-into-data-structures-using-javascript-red-black-tree
//https://dev.to/humblecoder00/deep-dive-into-data-structures-using-javascript-red-black-tree-4lnb
//https://www.youtube.com/watch?v=IDqdf7VicDs
//https://dev.to/igorok/javascript-red-black-tree-4703
//https://www.programiz.com/dsa/red-black-tree
//https://mgechev.github.io/javascript-algorithms/data-structures_red-black-tree.js.html
//https://github.com/liubinyi/red-black-tree-js/blob/master/src/createNode.js
//https://www.growingwiththeweb.com/data-structures/red-black-tree/overview/


//initialize the colors we'll be using: Red and Black
const colors = {
    RED: 'RED',
    BLACK: 'BLACK',
  }
  
  //establish a node class for creating a node
  //each node on the tree has a key, value, color, and left and right and parent nodes
  class Node {
    constructor(key, value, parent = null) {
      this.key = key;
      this.value = value;
      this.parent = parent;
      this.color = colors.RED;
      this.left = null;
      this.right = null;
    }
  }

  //creates our ordered map!
class orderedPokeMap{

    constructor() {
        this.root = null
      }

      //INSERT
      insert(key, value) {

        //inner function, learned from https://dev.to/humblecoder00/deep-dive-into-data-structures-using-javascript-red-black-tree-4lnb
        const insertHelper = (node) => {
          
            //the current node
            let current = node;
    
            //if the key is greater than the current node's key
            if (key > current.key) {
                //if the current's right child exists...
                if (current.right != null) {
                    //recursively call insertHelper to keep searching for place to insert
                    insertHelper(current.right)
                }else{
                    //otherwise, the right node is now the new inserted key/value node. 
                    //set the parent of the new node to be the current node
                    current.right = new Node(key, value, current)
                    current.right.parent = current
                    this.fixInsert(current.right)
                  }
                
                  //if the key is less than the current node's key
            }else if (key < current.key) {
        
                //if the current node's left child exists...
                if (current.left!= null) {
                    //recursively call insertHelper to keep searching for place to insert
                    insertHelper(current.left)
                }else{
                    //otherwise, the left node is now the new inserted key/value node. 
                    //set the parent of the new node to be the current node
                    current.left = new Node(key, value, current)
                    current.left.parent = current
                    this.fixInsert(current.left)
                    }
          }
  
        }

        //if there is no root, make a new one and fix the insertion
        if (this.root == null) {
            this.root = new Node(key, value, this.root);
            this.fixInsert(this.root);
    
        }else {
            //insert the root
            insertHelper(this.root);
        }
    
      }


      //FIX INSERT (adjusts colors and handles rotations)
      //primarily from class slides
      fixInsert(node) {
    
        let current = node;

        if(current.parent == null && current){
            current.color = colors.BLACK;
          return;
        }

        if(current.parent && current.parent.color == colors.BLACK){
            return;
        }

        const parent = current.parent;
        const grandparent = current.parent.parent;
        let uncle;
        
        if(parent && grandparent && parent == grandparent.left){
            uncle = grandparent.right;
        }else if(parent && grandparent && parent == grandparent.right){
            uncle = grandparent.left;
        }

        if(grandparent && uncle && uncle.color == colors.RED){
            parent.color = uncle.color = colors.BLACK;
            grandparent.color = colors.RED;
            this.fixInsert(grandparent);
            return;
        }
        if(parent && grandparent && node == parent.right && parent == grandparent.left){
            this.rotateLeft(parent);
            node = parent;
            parent = node.parent;
            
        }else if(parent && grandparent && node == parent.left && parent == grandparent.right){
            this.rotateRight(parent);
            node = parent;
            parent = node.parent;
            
        }

        parent.color = colors.BLACK;
        grandparent.color = colors.RED;

        if(node == parent.left){
            this.rotateRight(grandparent);
        }else{
            this.rotateLeft(grandparent);
        }

      }


      rotateLeft(node) {
        const current = node.right
    
        node.right = current.left
    
        current.left = node
    
        current.color = node.color
        node.color = colors.RED
        
        const parent = node.parent;
        if (!parent) {
          this.root = current
        }
        else if (node === parent.left) {
          parent.left = current
        }
        else {
          parent.right = current
        }

            current.parent = node.parent
        
            node.parent = current
        
            if (node.right) {
            node.right.parent = node
            }
        }
    
      rotateRight(node) {
        const current = node.left
    
        node.left = current.right
    
        current.right = node
    
        current.color = node.color
    
        node.color = colors.RED
    
        const parent = node.parent;
        if (!parent) {
          this.root = current
        }
        else if (node === parent.left) {
          parent.left = current
        }
        else {
          parent.right = current
        }

        current.parent = node.parent
    
        node.parent = current
    
        if (node.left) {
          node.left.parent = node
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