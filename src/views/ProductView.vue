<template>
  <div class="container my-5">
    <h2 class="text-center mb-4">Jewelry Catalog</h2>

    <!-- Products Grid -->
    <div class="row row-cols-1 row-cols-md-4 g-4">
      <div 
        v-for="product in products" 
        :key="product.id" 
        class="col mb-4"
      >
        <div class="card h-100 shadow-sm">
          <img
            :src="product.image"
            class="card-img-top p-3"
            :alt="product.title"
            style="object-fit: contain; height: 250px;"
          />
          <div class="card-body">
            <h5 class="card-title">{{ product.title }}</h5>
            <p class="card-text text-muted">
              {{ product.description.length > 100 
                 ? product.description.substring(0, 100) + '...' 
                 : product.description 
              }}
            </p>
          </div>
          <div class="card-footer d-flex justify-content-between align-items-center">
            <small class="text-muted fw-bold">
              ${{ product.price.toFixed(2) }}
            </small>
            <button 
              type="button" 
              class="btn btn-outline-primary"
              @click="addToCart(product)"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- No Products Message -->
    <div 
      v-if="products.length === 0" 
      class="text-center text-muted mt-5"
    >
      No jewelry products found.
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";

export default {
  setup() {
    // Products data
    const products = ref([]);

    // Fetch jewelry products from API
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products/category/jewelery");
        if (!response.ok) {
          throw new Error('Unable to fetch jewelry products');
        }
        
        // Store products
        products.value = await response.json();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Add product to cart (placeholder)
    const addToCart = (product) => {
      console.log(`Added ${product.title} to cart`);
      // TODO: Implement actual cart functionality
      alert(`Added ${product.title} to cart`);
    };

    // Fetch products when component is mounted
    onMounted(fetchProducts);

    return {
      products,
      addToCart
    };
  }
};
</script>

<style scoped>
.card-img-top {
  transition: transform 0.3s ease;
}

.card:hover .card-img-top {
  transform: scale(1.05);
}
</style>