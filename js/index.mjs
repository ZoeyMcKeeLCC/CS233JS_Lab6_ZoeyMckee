/*
Code Written by Brian Bird, Modfied by Zoey McKee on 4/24/2026
AI Policy: No generate tools were used in the creation of this project
*/

/*  GroceryList — Starter File
    This application simulates an electronic grocery list. Users can add and delete
    items from the list. The list of items is stored in browser local storage
    so items persist between sessions.

    All classes and initialization code are in this single file.
*/



import { GroceryModel } from './model.mjs';
import { GroceryController } from './controller.mjs';
import { GroceryView } from './view.mjs';

/* ========== Initialization ========== */

document.addEventListener('DOMContentLoaded', () => {
  new GroceryController(new GroceryModel(), new GroceryView());
});
