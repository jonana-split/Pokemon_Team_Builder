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
      //primarily from class slides 96-146
      fixInsert(node) {
    
        //current node is the one we are fixing
        let current = node;

        //if current exists and its parent is null then current is the root and is therefore black
        if(current.parent == null && current){
            current.color = colors.BLACK;
          return;
        }

        //if current has a prarent and its parent's color is black, no need for any fixing.
        if(current.parent && current.parent.color == colors.BLACK){
            return;
        }

        //establish parent and grandparent nodes
        const parent = current.parent;
        const grandparent = current.parent.parent;

        //create uncle...
        let uncle;
        
        //establish which node in particular is the uncle
        //if the parent is the left child, uncle is the right child
        if(parent && grandparent && parent == grandparent.left){
            uncle = grandparent.right;

        //if the parent is the right child, uncle is the left child
        }else if(parent && grandparent && parent == grandparent.right){
            uncle = grandparent.left;
        }

        //if the uncle is red, then the parent and uncle both need to switch colors to be black
        //the grandparent can then be red, but we now need to recursively check if the grandparent beinf red is valid
        if(grandparent && uncle && uncle.color == colors.RED){
            parent.color = uncle.color = colors.BLACK;
            grandparent.color = colors.RED;
            this.fixInsert(grandparent);
            return;
        }

        //perform a left rotation if left subtree of grandparent is unbalanced
        if(parent && grandparent && node == parent.right && parent == grandparent.left){
            this.rotateLeft(parent);
            node = parent;
            parent = node.parent;

        //perform a right rotation if right subtree of grandparent is unbalanced
        }else if(parent && grandparent && node == parent.left && parent == grandparent.right){
            this.rotateRight(parent);
            node = parent;
            parent = node.parent;
            
        }

        //set parent to black and grandparent to red
        parent.color = colors.BLACK;
        grandparent.color = colors.RED;

        //node is to the parent's left, perform a right rotation on the grandparent to accomodate color changes
        //vice versa for if node is on parent's right
        if(node == parent.left){
            this.rotateRight(grandparent);
        }else{
            this.rotateLeft(grandparent);
        }

      }

    //heavily referenced for rotations:
    //https://dev.to/humblecoder00/deep-dive-into-data-structures-using-javascript-red-black-tree-4lnb
    //https://www.sahinarslan.tech/posts/deep-dive-into-data-structures-using-javascript-red-black-tree
    //https://www.youtube.com/watch?v=95s3ndZRGbk
    //https://www.codesdope.com/course/data-structures-red-black-trees-insertion/
    
    rotateLeft(node) {

        //the current node we're looking at is the node's right node
        const current = node.right
        const parent = node.parent;

        //node's right is now the current node's left
        node.right = current.left
    
        //if the left node of current exists, then the parent of current's left node is now the original node
        if(current.left){
            current.left.parent = node;
        }

        //set curren't parent to og node's parent
        current.parent = parent;

        //if there is no parent, the node we're looking at is the root
        if (!parent) {
          this.root = current;

        //otherwise, if the og node is now the og node's parent's left, the paren't left node is the current node
        }else if (node == parent.left) {
            parent.left = current;

        //otherwise, the og node's parent's right node is the current node
        }else{
            parent.right = current;
        }

        //our current node's left node is now officially the original node
        current.left = node;

        //the og node's parent is officially the current node. rotation success
        node.parent = current;

    }
    
    //heavily referenced for rotations:
    //https://dev.to/humblecoder00/deep-dive-into-data-structures-using-javascript-red-black-tree-4lnb
    //https://www.sahinarslan.tech/posts/deep-dive-into-data-structures-using-javascript-red-black-tree
    //https://www.youtube.com/watch?v=95s3ndZRGbk
    //https://www.codesdope.com/course/data-structures-red-black-trees-insertion/
    rotateRight(node) {
        
        //the current node we're looking at is the node's left node
        const current = node.left
        const parent = node.parent;

        //node's left is now the current node's right
        node.left = current.right
    
        //if the right node of current exists, then the parent of current's right node is now the original node
        if(current.right){
            current.right.parent = node;
        }

        //set curren't parent to og node's parent
        current.parent = parent;

        //if there is no parent, the node we're looking at is the root
        if (!parent) {
            this.root = current;

        //otherwise, if the og node is now the og node's parent's right, the paren't right node is the current node
        }else if (node == parent.right) {
            parent.right = current;

        //otherwise, the og node's parent's left node is the current node
        }else{
            parent.left = current;
        }

        //our current node's right node is now officially the original node
        current.right = node;

        //the og node's parent is officially the current node. rotation success
        node.parent = current;
        
    }
      
      //modified search and/or delete function! gets the value associated with key recursively
      get(key, node = this.root) {
        
        //if there is no node then just return null
        if(!node){
            return null;
        }

        //if the key is the same as the node's key, then this is the value we are looking for
        if(key == node.key){
            return node.value;
        }

        //if the key is LESS than the node's key, recursively call get on the node's left
        if(key < node.key){
            return this.get(key, node.left);
        }

        //if the key is MORE than the node's key, recursively call get on the node's right
        return this.get(key, node.right);
        
    }

    //inorder traversal of tree in order to get all names
    inorder(node, allNames){
        if(node == null){
            return;
        }

        this.inorder(node.left, allNames);
        allNames.push(node.key); //push selected name to allNames array
        this.inorder(node.right, allNames);

    }

    //creates an array of all pokemon names
    getAllNames(){
        
        //array to hold all names
        let allNames = [];

        //go through the tree in order to get an already sorted array
       this.inorder(this.root, allNames);

        console.log("Names:", allNames); //some debugging

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