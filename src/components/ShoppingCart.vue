<script setup lang="ts">
    import { useProductsStore } from '@/stores/products';
    const productsStore = useProductsStore();
</script>

<template>
    <aside v-if="productsStore.cartDisplay" class="cart-container">
        <div class="cart">
            <h1 class="cart-title spread">
            <span>
                Cart
                <i class="icofont-cart-alt icofont-1x"></i>
            </span>
            <button @click="productsStore.toggleCartDisplay" class="cart-close">&times;</button>
            </h1>

            <div class="cart-body">
            <table class="cart-table">
                <thead>
                <tr>
                    <th><span class="sr-only">Product Image</span></th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Qty</th>
                    <th>Total</th>
                    <th><span class="sr-only">Actions</span></th>
                </tr>
                </thead>
                <tbody class="cart__product-body">
                <tr class="cart__product-row" v-for="product in productsStore.cart" :key="product.id">
                    <td><i class="icofont-3x" :class="['icofont-' + (productsStore.products.find(item => item.id === product.id)?.icon)]"></i></td>
                    <td>{{ productsStore.products.find(item => item.id === product.id)?.name }}</td>
                    <td>${{ productsStore.products.find(item => item.id === product.id)?.price.USD.toFixed(2) }}</td>
                    <td class="center">{{ product.quantity }}</td>
                    <td>${{ ((productsStore.products.find(item => item.id === product.id)?.price.USD ?? 0) * product.quantity).toFixed(2) }}</td>
                    <td class="center">
                    <button @click="productsStore.removeFromCart(product.id)" class="btn btn-light cart-remove">
                        &times;
                    </button>
                    </td>
                </tr>
                </tbody>
            </table>

            <p v-if="productsStore.cartEmpty" class="center"><em>No items in cart</em></p>
            <div class="spread">
                <span><strong>Total:</strong> ${{ productsStore.cartTotalPrice.toFixed(2) }}</span>
                <button @click="productsStore.checkoutCart" class="btn btn-light btn-checkout">Checkout</button>
            </div>
            </div>
        </div>
    </aside>
</template>

<style scoped>
    .cart-close, .btn-checkout, .cart-remove {
        cursor: pointer;
    }

    .cart-table {
        margin-bottom: 15px;
    }
</style>