// productsService.js
class ProductsService {
    constructor(categoryId) {
      this.apiUrl = `https://wauu.uz/api/products/?category_id=${categoryId}`;
      this.products = null;
    }
  
    async fetchProducts() {
      try {
        const response = await fetch(this.apiUrl);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        this.products = data;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
  
    getProducts() {
      return this.products;
    }
  }
  
  export default ProductsService;
  