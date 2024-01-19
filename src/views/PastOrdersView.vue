<script setup lang="ts">
  import { useProductsStore } from '@/stores/products';

  const productsStore = useProductsStore();
  const pastOrders = productsStore.pastOrders;
</script>

<template>
  <main class="wrapper">
    <h1 class="orders__title">Past Orders</h1>

    <table class="product-table">
      <thead>
        <tr>
          <td><span class="sr-only">Product Image</span></td>
          <td>Product</td>
          <td>Price</td>
          <td>Quantity</td>
          <td>Total</td>
          <td><span class="sr-only">Actions</span></td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in pastOrders" :key="order.orderId">
          <td><i class="icofont-4x" :class="['icofont-' + (productsStore.products.find(item => item.id === order.productId)?.icon)]"></i></td>
          <td>{{ productsStore.products.find(item => item.id === order.productId)?.name }}</td>
          <td>{{ productsStore.products.find(item => item.id === order.productId)?.price.USD }}</td>
          <td>{{ order.quantity }}</td>
          <td>${{ ((productsStore.products.find(item => item.id === order.productId)?.price.USD ?? 0) * order.quantity).toFixed(2) }}</td>
          <td><button @click="productsStore.addPastOrder(order.productId, order.quantity)" class="btn btn-dark btn-add">Add</button></td>
        </tr>
      </tbody>
    </table>
  </main>
</template>

<style scoped>
  .wrapper {
    min-height: calc(100vh - 228px);
  }
  .orders__title {
    margin-bottom: 20px;
  }

  thead {
    font-weight: 700;
  }

  .btn-add {
    cursor: pointer;
  }
</style>
