// inventory.js
// Fetch inventory data and update Gumroad buttons availability.
// This script reads the inventory.json file and disables purchase
// buttons on product pages when the stock for a given size is zero.

async function updateInventory() {
  try {
    const response = await fetch('inventory.json');
    if (!response.ok) {
      console.error('Failed to load inventory data');
      return;
    }
    const inventory = await response.json();
    // Find all Gumroad buttons and update their state
    document.querySelectorAll('.gumroad-button').forEach((btn) => {
      const product = btn.getAttribute('data-product');
      const size = btn.getAttribute('data-size');
      if (inventory[product] && inventory[product][size] !== undefined) {
        const stock = inventory[product][size];
        if (stock <= 0) {
          btn.classList.add('disabled');
          btn.textContent = 'Out of stock';
        }
      }
    });
  } catch (error) {
    console.error('Error loading inventory:', error);
  }
}

// Run update on DOMContentLoaded
document.addEventListener('DOMContentLoaded', updateInventory);