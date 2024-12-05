<script setup lang="ts">
import Button from 'primevue/button';
import { ref } from 'vue';
import EmpleadoList from '../components/empleados/EmpleadoList.vue';
import EmpleadoSave from '../components/empleados/EmpleadoSave.vue';

const mostrarDialog = ref<boolean>(false);
const EmpleadoListRef = ref<typeof EmpleadoList | null>(null);
const empleadoEdit = ref<any>(null);

function handleCreate() {
  empleadoEdit.value = null;
  mostrarDialog.value = true;
}

function handleEdit(empleado: any) {
  empleadoEdit.value = empleado;
  mostrarDialog.value = true;
}

function handleCloseDialog() {
  mostrarDialog.value = false;
}

function handleGuardar() {
  EmpleadoListRef.value?.obtenerLista();
}
</script>

<template>
  <div>
    <h1>Empleados</h1>
    <Button label="Crear Nuevo" icon="pi pi-plus" @click="handleCreate" />
    <EmpleadoList ref="EmpleadoListRef" @edit="handleEdit" />
    <EmpleadoSave :mostrar="mostrarDialog" :empleado="empleadoEdit" :modoEdicion="!!empleadoEdit" @guardar="handleGuardar"
      @close="handleCloseDialog" />
  </div>
</template>

<style scoped></style>
