<script setup lang="ts">
import type { Producto } from '../../models/producto';
import http from '../../plugins/axios';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import { onMounted, ref } from 'vue';

const ENDPOINT = 'productos';
let productos = ref<Producto[]>([]);

const emit = defineEmits(['edit']);
const productoDelete = ref<Producto | null>(null);
const mostrarConfirmDialog = ref<boolean>(false);

async function obtenerLista() {
  productos.value = await http.get(ENDPOINT).then((response) => response.data)
  console.log('Productos:', productos.value);
}

function emitirEdicion(producto: Producto) {
  emit('edit', producto);
}

function mostrarEliminarConfirm(producto: Producto) {
  productoDelete.value = producto;
  mostrarConfirmDialog.value = true;
}

async function eliminar() {
  try {
    if (productoDelete.value) {
      await http.delete(`${ENDPOINT}/${productoDelete.value.id}`);
      obtenerLista();
    }
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
  } finally {
    mostrarConfirmDialog.value = false;
  }
}

onMounted(() => {
  obtenerLista();
});

defineExpose({ obtenerLista });
</script>

<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Nro.</th>
          <th>Nombre</th>
          <th>descripcion</th>
          <th>Precio Unitario</th>
          <th>stock</th>
          <th>Categoría</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(producto, index) in productos" :key="producto.id">
          <td>{{ index + 1 }}</td>
          <td>{{ producto.nombre }}</td>
          <td>{{ producto.descripcion }}</td>
          <td>{{ producto.precioUnitario }}</td>
          <td>{{ producto.stock }}</td>
          <td>{{ producto.categoria.nombre }}</td>
          <td>
            <Button icon="pi pi-pencil" aria-label="Editar" text @click="emitirEdicion(producto)" />
            <Button icon="pi pi-trash" aria-label="Eliminar" text @click="mostrarEliminarConfirm(producto)" />
          </td>
        </tr>
      </tbody>
    </table>

    <Dialog v-model:visible="mostrarConfirmDialog" header="Confirmar Eliminación" :style="{ width: '25rem' }">
      <p>¿Estás seguro de que deseas eliminar este registro?</p>
      <div class="flex justify-end gap-2">
        <Button type="button" label="Cancelar" severity="secondary" @click="mostrarConfirmDialog = false" />
        <Button type="button" label="Eliminar" @click="eliminar" />
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>
