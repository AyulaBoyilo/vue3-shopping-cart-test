import { ref, computed } from "vue";
import { defineStore } from "pinia";
import foodJSON from "@/assets/food.json";
import pastOrdersJSON from "@/assets/past-orders.json";

interface Products {
  id: number;
  name: string;
  icon: string;
  price: {
    USD: number;
    NOK: number;
  };
  type: "vegetable" | "fruit" | "meat";
}

interface Order {
  id: number;
  quantity: number;
}

interface PastOrder {
  orderId: number;
  productId: number;
  quantity: number;
}

export const useProductsStore = defineStore("products", () => {
  const products: Products[] = foodJSON as Products[];

  // Cart
  const cart = ref<Order[]>([]);
  const cartEmpty = computed<boolean>(() => cart.value.length == 0);

  const cartTotalItems = computed<number>(() => cart.value.reduce((acc, curr) => acc + curr.quantity, 0));
  const cartTotalPrice = computed<number>(() => {
    return cart.value.reduce((acc, curr) => {
      const product = products.find(item => item.id === curr.id);

      if (product) {
        return acc + curr.quantity * product.price.USD;
      } else {
        return acc;
      }
    }, 0)
  });

  const cartDisplay = ref(false);
  function toggleCartDisplay() {
    cartDisplay.value = !cartDisplay.value;
  }

  function addToCart(productId: number, quantity: number) {
    const productInCart = cart.value.find(item => item.id === productId);

    if (quantity != 0 && quantity % 1 === 0 ) {
      if (productInCart) {
        productInCart.quantity += quantity;
      } else {
        const newEntry = {id: productId, quantity: quantity};
        cart.value.push(newEntry);
      }
    }

  }

  function removeFromCart(productId: number) {
    cart.value = cart.value.filter(item => item.id != productId);
  }

  function checkoutCart() {
    let highestOrderId = pastOrders.value.reduce((maxOrderId, order) => {
      return order.orderId > maxOrderId ? order.orderId : maxOrderId;
    }, 0);

    cart.value.forEach((item) => {
      highestOrderId++;
      pastOrders.value.push({ orderId: highestOrderId, productId: item.id, quantity: item.quantity })
    })

    cart.value = [];
  }

  // Past Orders
  const pastOrders = ref<PastOrder[]>([]);
  pastOrders.value = pastOrdersJSON as PastOrder[];

  function addPastOrder(productId: number, quantity: number) {
    const productInCart = cart.value.find(item => item.id === productId);

    if (productInCart) {
      productInCart.quantity += quantity;
    } else {
      const newEntry = {id: productId, quantity: quantity};
      cart.value.push(newEntry);
    }

  }

  return { products, cart, cartEmpty, cartTotalItems, cartTotalPrice, pastOrders, cartDisplay, addToCart, removeFromCart, checkoutCart, addPastOrder, toggleCartDisplay };
});
