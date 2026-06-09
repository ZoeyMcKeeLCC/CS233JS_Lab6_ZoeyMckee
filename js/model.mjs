/*
Code Written by Brian Bird, Modfied by Zoey McKee on 4/24/2026
AI Policy: No generate tools were used in the creation of this project
*/

import { askGemini } from './gemini.js';

export class GroceryModel {
  
  constructor() {
    try {
      const savedGroceries = JSON.parse(localStorage.getItem('groceries')); // array to hold groceries
      // TODO: Add a line of code that retrieves groceries from local storage into savedGroceries
      if (!Array.isArray(savedGroceries) || !this.allValid(savedGroceries)) {
        throw new Error('Invalid grocery payload');
      }
      this.groceries = savedGroceries;
    } catch (e) {
      // Provide starter entries if local storage is empty/corrupt.
      this.groceries = [];

    }
    this.geminiButtonEventListener();
  }

  //Checks if indivdual item is valid
  isValidItem(item) {
    return (
      typeof item === 'object' &&
      item !== null &&
      typeof item.itemName === 'string' &&
      typeof item.quantity === 'string'
    );
  }

  //Iterates through groceries list and checkls if they are valid
  allValid(groceries) {
    for (let i = 0; i < groceries.length; i++) {
      if (!this.isValidItem(groceries[i])) {
        return false;
      }
    }
    return true;
  }

  //Writes to localStorage
  commit(groceries) {
    // TODO: write this method
    localStorage.setItem("groceries", JSON.stringify(groceries));

  }

  subscribeGroceryListChanged(callback) {
    this.onGroceryListChanged = callback;
  }

  //Adds grocery item to list, updates localStorage
  async addGrocery(itemName, quantity) {
    let nutrientInfo = await this.pullOpenFoodAPI(itemName);
    let newGrocery = { itemName, quantity};
    newGrocery.nutrientInfo = await nutrientInfo;
    
    // TODO: add the new grocery to the array of groceries and put it in local storage
    this.groceries.push(await newGrocery);
    this.commit(await this.groceries)
   
    return true;
  }

  //Removes grocery item at given index, updates localStorage
  deleteGrocery(index) {
    // TODO: Remove the grocery from the array and update local storage.
    this.groceries.splice(index, 1);
    this.commit(this.groceries)
  }

  async pullOpenFoodAPI(food){
    try{
      let response = await fetch(`https://proxy.corsfix.com/?https://world.openfoodfacts.org/cgi/search.pl?search_terms=${food}&search_simple=1&action=process&json=1`);
      let data = await response.json();
      let nutrientInfo = await data.products[0].nutrient_levels
      return await nutrientInfo;
    
    }catch{
      return null;
  }
}

  geminiButtonEventListener(){
  document.getElementById("geminiButton").addEventListener("click", async (event) => {
    document.getElementById("geminiOutput").innerHTML = "Thinking..."
    let tempText = await askGemini(this.groceries);

    document.getElementById("geminiOutput").innerHTML = await tempText;

  });
  }
}