<script setup lang="ts">
import Button from 'primevue/button';
import { ref } from 'vue';
import ProductoList from '../components/productos/ProductoList.vue';
import ProductoSave from '../components/productos/ProductoSave.vue';

const mostrarDialog = ref<boolean>(false);
const ProductoListRef = ref<typeof ProductoList | null>(null);
const productoEdit = ref<any>(null);

function handleCreate() {
  productoEdit.value = null;
  mostrarDialog.value = true;
}

function handleEdit(producto: any) {
  productoEdit.value = producto;
  mostrarDialog.value = true;
}

function handleCloseDialog() {
  mostrarDialog.value = false;
}

function handleGuardar() {
  ProductoListRef.value?.obtenerLista();
}
</script>

<template>
  <div>
    <h1>Productos</h1>
    <Button label="Crear Nuevo" icon="pi pi-plus" @click="handleCreate" />
    <ProductoList ref="ProductoListRef" @edit="handleEdit" />
    <ProductoSave :mostrar="mostrarDialog" :producto="productoEdit" :modoEdicion="!!productoEdit" @guardar="handleGuardar"
      @close="handleCloseDialog" />
  </div>
</template>

<style scoped></style>
