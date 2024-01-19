<script setup lang="ts">
    import { ref } from "vue";
    import { useProductsStore } from '@/stores/products';

    const props = defineProps(['product']);
    const productsStore = useProductsStore();

    const productQuantity = ref(0);

    const roundInput = () => {
        productQuantity.value = Math.floor(productQuantity.value)
    }
    
    const addItem = () => {
        productsStore.addToCart(props.product.id, productQuantity.value);
        productQuantity.value = 0;
    }
</script>

<template>
    <div class="card">
        <div class="card-title">
            {{ product.name }}
        </div>
        <div class="card-body">
            <i class="icofont-10x" :class="['icofont-' + product.icon]"></i>
            <form>
            <div class="row">
                <div class="cell">
                <label>Type:</label>
                </div>
                <div class="cell">
                <em class="card__product-type">{{ product.type }}</em>
                </div>
            </div>
            <div class="row">
                <div class="cell">
                <label>Price:</label>
                </div>
                <div class="cell">
                ${{ product.price.USD.toFixed(2) }}
                </div>
            </div>
            <div class="row">
                <div class="cell">
                <label>Quantity:</label>
                </div>
                <div class="cell">
                <input type="number" v-model="productQuantity" @keyup="roundInput"
                @keydown.enter.prevent>
                </div>
            </div>
            </form>
        </div>
        <div class="card-footer">
            <button @click="addItem" class="btn btn-light">
            Add to cart
            </button>
        </div>
    </div>
</template>

<style scoped>
    .card__product-type {
        text-transform: capitalize;
    }

    .card-footer .btn {
        cursor: pointer;
    }
</style>