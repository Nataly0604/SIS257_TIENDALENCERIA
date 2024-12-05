<template>
  <div class="card">
    <!-- Hero Section -->
    <div class="surface-section px-4 py-8 md:px-6 lg:px-8">
      <div class="text-center">
        <h1 class="text-900 font-bold text-4xl mb-4">Intimité Lingerie</h1>
        <p class="text-600 text-xl mb-6">Descubre tu lado más sensual con diseños únicos y elegantes</p>
        <Button label="Explorar Colección" icon="pi pi-heart" class="p-button-raised" />
      </div>
    </div>

    <!-- Featured Products -->
    <div class="surface-section px-4 py-8 md:px-6 lg:px-8">
      <h2 class="text-900 font-bold text-3xl text-center mb-6">Productos Destacados</h2>
      <Carousel :value="featuredProducts" :numVisible="3" :numScroll="1">
        <template #item="slotProps">
          <div class="p-2">
            <Card>
              <template #header>
                <img :src="slotProps.data.image" :alt="slotProps.data.name" class="w-full" />
              </template>
              <template #title>{{ slotProps.data.name }}</template>
              <template #subtitle>${{ slotProps.data.price.toFixed(2) }}</template>
              <template #content>
                <p>{{ slotProps.data.description }}</p>
              </template>
              <template #footer>
                <div class="flex justify-content-between">
                  <Button label="Ver Detalles" icon="pi pi-eye" class="p-button-secondary" />
                  <Button label="Añadir al Carrito" icon="pi pi-shopping-cart" class="p-button-primary" />
                </div>
              </template>
            </Card>
          </div>
        </template>
      </Carousel>
    </div>

    <!-- New Arrivals -->
    <div class="surface-section px-4 py-8 md:px-6 lg:px-8">
      <h2 class="text-900 font-bold text-3xl text-center mb-6">Novedades</h2>
      <Carousel :value="newArrivals" :numVisible="2" :numScroll="1">
        <template #item="slotProps">
          <div class="p-2">
            <Card>
              <template #header>
                <img :src="slotProps.data.image" :alt="slotProps.data.name" class="w-full" />
              </template>
              <template #title>{{ slotProps.data.name }}</template>
              <template #subtitle>${{ slotProps.data.price.toFixed(2) }}</template>
              <template #content>
                <p>{{ slotProps.data.description }}</p>
              </template>
              <template #footer>
                <div class="flex justify-content-between">
                  <Button label="Ver Detalles" icon="pi pi-eye" class="p-button-secondary" />
                  <Button label="Añadir al Carrito" icon="pi pi-shopping-cart" class="p-button-primary" />
                </div>
              </template>
            </Card>
          </div>
        </template>
      </Carousel>
    </div>

    <!-- Why Choose Us -->
    <div class="surface-section px-4 py-8 md:px-6 lg:px-8">
      <h2 class="text-900 font-bold text-3xl text-center mb-6">¿Por qué elegirnos?</h2>
      <div class="grid">
        <div class="col-12 md:col-4 text-center">
          <div class="text-5xl text-pink-500 mb-4">
            <i class="pi pi-heart"></i>
          </div>
          <h3 class="text-xl font-semibold mb-2">Diseños Exclusivos</h3>
          <p class="text-600 px-3">Cada pieza es una obra de arte diseñada para realzar tu belleza.</p>
        </div>
        <div class="col-12 md:col-4 text-center">
          <div class="text-5xl text-pink-500 mb-4">
            <i class="pi pi-shield"></i>
          </div>
          <h3 class="text-xl font-semibold mb-2">Calidad Premium</h3>
          <p class="text-600 px-3">Trabajamos con los mejores materiales para tu comodidad.</p>
        </div>
        <div class="col-12 md:col-4 text-center">
          <div class="text-5xl text-pink-500 mb-4">
            <i class="pi pi-truck"></i>
          </div>
          <h3 class="text-xl font-semibold mb-2">Envío Discreto</h3>
          <p class="text-600 px-3">Entrega rápida y confidencial en todo el país.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import Button from 'primevue/button';
import Carousel from 'primevue/carousel';
import Card from 'primevue/card';

export default {
  components: {
    Button,
    Carousel,
    Card
  },
  setup() {
    const featuredProducts = ref([
      {
        id: 1,
        name: 'Conjunto Sensual Rojo',
        description: 'Conjunto de encaje con detalles sensuales',
        price: 79.99,
        image: 'https://via.placeholder.com/300x400'
      },
      {
        id: 2,
        name: 'Babydoll de Seda',
        description: 'Elegante babydoll con acabado de seda',
        price: 59.99,
        image: 'https://via.placeholder.com/300x400'
      },
      {
        id: 3,
        name: 'Body Transparente',
        description: 'Body delicado de tul transparente',
        price: 89.99,
        image: 'https://via.placeholder.com/300x400'
      }
    ]);

    const newArrivals = ref([
      {
        id: 4,
        name: 'Conjunto Romántico Nude',
        description: 'Diseño delicado en tonos nude',
        price: 69.99,
        image: 'https://via.placeholder.com/300x400'
      },
      {
        id: 5,
        name: 'Short de Seda Negro',
        description: 'Short elegante de seda pura',
        price: 49.99,
        image: 'https://via.placeholder.com/300x400'
      }
    ]);

    return {
      featuredProducts,
      newArrivals
    };
  }
};
</script>

<style scoped>
.hero-section {
  width: 100%;
  padding: 2rem;
  background: #f8f9fa;
}

.products-section {
  width: 100%;
  padding: 2rem;
}

.p-2 {
  flex: 1;
}
</style>
