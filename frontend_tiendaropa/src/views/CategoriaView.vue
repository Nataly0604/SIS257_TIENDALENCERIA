<script setup lang="ts">
import Button from 'primevue/button';
import { ref } from 'vue';
import CategoriaList from '../components/categorias/CategoriaList.vue';
import CategoriaSave from '../components/categorias/CategoriaSave.vue';

const mostrarDialog = ref<boolean>(false);
const CategoriaListRef = ref<typeof CategoriaList | null>(null);
const categoriaEdit = ref<any>(null);

function handleCreate() {
  categoriaEdit.value = null;
  mostrarDialog.value = true;
}

function handleEdit(categoria: any) {
  categoriaEdit.value = categoria;
  mostrarDialog.value = true;
}

function handleCloseDialog() {
  mostrarDialog.value = false;
}

function handleGuardar() {
  CategoriaListRef.value?.obtenerLista();
}
</script>

<template>
  <div>
    <h1>Categorias</h1>
    <Button label="Crear Nuevo" icon="pi pi-plus" @click="handleCreate" />
    <CategoriaList ref="CategoriaListRef" @edit="handleEdit" />
    <CategoriaSave :mostrar="mostrarDialog" :categoria="categoriaEdit" :modoEdicion="!!categoriaEdit" @guardar="handleGuardar"
      @close="handleCloseDialog" />
  </div>
</template>

<style scoped></style>
