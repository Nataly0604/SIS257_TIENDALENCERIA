<script setup lang="ts">
import Button from 'primevue/button';
import { ref } from 'vue';
import VentaList from '../components/ventas/VentaList.vue';
import VentaSave from '../components/ventas/VentaSave.vue';

const mostrarDialog = ref<boolean>(false);
const VentaListRef = ref<typeof VentaList | null>(null);
const ventaEdit = ref<any>(null);

function handleCreate() {
  ventaEdit.value = null;
  mostrarDialog.value = true;
}

function handleEdit(venta: any) {
  ventaEdit.value = venta;
  mostrarDialog.value = true;
}

function handleCloseDialog() {
  mostrarDialog.value = false;
}

function handleGuardar() {
  VentaListRef.value?.obtenerLista();
}
</script>

<template>
  <div>
    <h1>Ventas</h1>
    <Button label="Crear Nueva" icon="pi pi-plus" @click="handleCreate" />
    <VentaList ref="VentaListRef" @edit="handleEdit" />
    <VentaSave :mostrar="mostrarDialog" :venta="ventaEdit" :modoEdicion="!!ventaEdit" @guardar="handleGuardar" @close="handleCloseDialog" />
  </div>
</template>

<style scoped></style>
