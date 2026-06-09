/*
Code Written by Brian Bird, Modfied by Zoey McKee on 4/24/2026
AI Policy: No generate tools were used in the creation of this project
*/
import { html, render } from 'lit-html';

export class GroceryView {
  constructor() {
    this.app = document.querySelector('.grocery-list');
    this.form = document.querySelector('.grocery-form');
    this.itemNameInput = document.getElementById('itemName');
    this.quantityInput = document.getElementById('quantity');
  }

  get itemName() {
    return this.itemNameInput.value.trim();
  }

  get quantity() {
    return this.quantityInput.value.trim();
  }

  resetForm() {
    this.form.reset();
  }

  displayGroceries(groceries) {
    render(this.groceriesTemplate(groceries), this.app);
  }

  groceriesTemplate(groceries){
    return html`
    ${groceries.map((grocery, index) => this.groceryTemplate(grocery, index))}
  `;
    
  }

  groceryTemplate(grocery, index) {
      return html`
      <div class="list-group-item d-flex justify-content-between align-items-center" data-index="${index}">
        <div>
          <h5 class="mb-1">${grocery.itemName}</h5>
          <small class="text-muted">Quantity: ${grocery.quantity}</small><br>
          <small class="text-muted">${this.formatNutrientInfo(grocery.nutrientInfo)}</small>
        </div>
        <button name="deleteGrocery" type="button" class="btn btn-danger btn-sm" aria-label="Delete item">
          <i class="bi-trash"></i>
        </button>
      </div>`;
    }
  
  formatNutrientInfo(nutrientList){
    let buffer = ""
    try{
        buffer=`Fat: ${nutrientList.fat} | Salt: ${nutrientList.salt} | Saturated-Fat: ${nutrientList["saturated-fat"]} | Sugar: ${nutrientList.sugars}`
    } catch {
      buffer="There was an error loading nutrient info."
    }
    return buffer;
  }

  async onAddGrocery(handler) {
    this.form.addEventListener('submit', async (event) => {
      event.preventDefault();

      if (!this.form.checkValidity()) {
        this.form.reportValidity();
        return;
      }

      await handler(this.itemName, this.quantity);
      this.resetForm();
    });
  }

  onDeleteGrocery(handler) {
    this.app.addEventListener('click', (event) => {
      const deleteButton = event.target.closest('button[name="deleteGrocery"]');
      if (!deleteButton) {
        return;
      }

      const itemEl = deleteButton.closest('[data-index]');
      const index = parseInt(itemEl.getAttribute('data-index'), 10);
      handler(index);
    });
  }
}