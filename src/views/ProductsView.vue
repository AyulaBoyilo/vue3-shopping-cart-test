<script setup lang="ts">
  import ProductCard from "@/components/ProductCard.vue";
  import { useProductsStore } from '@/stores/products';

  const productsStore = useProductsStore();
  const allProducts = productsStore.products;
</script>

<template>
  <main class="wrapper">
        <h1 class="products__title">Products</h1>

        <div class="card-container">
          <ProductCard v-for="product in allProducts" :key="product.id" :product ="product"/>
        </div>
  </main>
</template>

<style>
  .products__title {
    margin-bottom: 20px;
  }
</style>
