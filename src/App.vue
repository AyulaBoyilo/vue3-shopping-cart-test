<script setup lang="ts">
  import { RouterLink, RouterView } from "vue-router";
  import ShoppingCart from "@/components/ShoppingCart.vue";
  import { useProductsStore } from '@/stores/products';
  const productsStore = useProductsStore();
</script>

<template>
  <header class="top-bar spread">
    <nav class="top-bar-nav">
      <RouterLink to="/" class="top-bar-link">
        <i class="icofont-spoon-and-fork"></i>
        <span>Home</span>
      </RouterLink>

      <RouterLink to="/products" class="top-bar-link">
        <span>Products</span>
      </RouterLink>

      <RouterLink to="/past-orders" class="top-bar-link">
        <span>Past Orders</span>
      </RouterLink>
    </nav>

    <div @click="productsStore.toggleCartDisplay" class="top-bar-cart-link">
      <i class="icofont-cart-alt icofont-1x"></i>
      <span>Cart ({{ productsStore.cartTotalItems }})</span>
    </div>
  </header>

  <RouterView />

  <ShoppingCart />

  <footer></footer>
</template>

<style scoped>
  .top-bar-cart-link {
    cursor: pointer;
  }
</style>
