<script setup lang="ts">
  import ProductCard from "@/components/ProductCard.vue";
  import { useProductsStore } from '@/stores/products';

  const productsStore = useProductsStore();
  const recProducts = productsStore.products.slice(0, 3);
</script>

<template>
  <div class="splash-container">
    <div class="splash">
      <h1>Splendid Food</h1>
    </div>
  </div>

  <main class="wrapper">

    <h2>Recommended</h2>

    <div class="recommended">
      <ProductCard v-for="product in recProducts" :key="product.id" :product ="product"/>
    </div>

  </main>


</template>
