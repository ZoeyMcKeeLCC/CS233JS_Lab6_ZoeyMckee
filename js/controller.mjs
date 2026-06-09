/*
Code Written by Brian Bird, Modfied by Zoey McKee on 4/24/2026
AI Policy: No generate tools were used in the creation of this project
*/

export class GroceryController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.model.subscribeGroceryListChanged(this.onGroceryListChanged);
    this.view.onAddGrocery(this.handleAddGrocery);
    this.view.onDeleteGrocery(this.handleDeleteGrocery);

    this.onGroceryListChanged(this.model.groceries);
  }

  onGroceryListChanged = (groceries) => {
    this.view.displayGroceries(groceries);
  };

  handleAddGrocery = async (itemName, quantity) => {
    await this.model.addGrocery(itemName, quantity);
    this.onGroceryListChanged(await this.model.groceries);
  };

  handleDeleteGrocery = (index) => {
    this.model.deleteGrocery(index);
    this.onGroceryListChanged(this.model.groceries);
  };
}