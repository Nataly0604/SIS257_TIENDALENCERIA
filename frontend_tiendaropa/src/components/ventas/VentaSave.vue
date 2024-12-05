<script setup lang="ts">
import http from '../../plugins/axios';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputNumber from 'primevue/inputnumber';
import Dropdown from 'primevue/dropdown';
import { computed, ref, watch, onMounted } from 'vue';
import type { Venta } from '../../models/venta';
import type { Producto } from '../../models/producto';
import type { Cliente } from '../../models/cliente';
import type { Empleado } from '../../models/empleado';

const ENDPOINT = 'ventas';

const props = defineProps({
  mostrar: Boolean,
  venta: {
    type: Object as () => Venta,
    default: () => ({} as Venta),
  },
  modoEdicion: Boolean,
});

const emit = defineEmits(['guardar', 'close']);

const dialogVisible = computed({
  get: () => props.mostrar,
  set: (value) => {
    if (!value) emit('close');
  },
});

const venta = ref<Venta>({ ...props.venta });
const clientes = ref<Cliente[]>([]);
const productos = ref<Producto[]>([]);
const empleados = ref<Empleado[]>([]);

watch(
  () => props.venta,
  (newVal) => {
    venta.value = { ...newVal };
    if (!venta.value.producto) venta.value.producto = {} as Producto;
  }
);

function calcularTotal() {
  if (venta.value.cantidad && venta.value.producto?.precioUnitario) {
    venta.value.total = venta.value.cantidad * venta.value.producto.precioUnitario;
  } else {
    venta.value.total = 0;
  }
}

async function handleSave() {
  try {
    const body = {
      cliente: venta.value.cliente.id,
      producto: venta.value.producto.id,
      empleado: venta.value.empleado.id,
      fechaVenta: venta.value.fechaVenta,
      cantidad: venta.value.cantidad,
      total: venta.value.total,
    };

    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${venta.value.id}`, body);
    } else {
      await http.post(ENDPOINT, body);
    }

    emit('guardar');
    venta.value = {} as Venta;
    dialogVisible.value = false;
  } catch (error: any) {
    alert(error?.response?.data?.message || 'Error al guardar la venta.');
  }
}

async function obtenerClientes() {
  clientes.value = await http.get('clientes').then((res) => res.data);
}

async function obtenerProductos() {
  productos.value = await http.get('productos').then((res) => res.data);
}

async function obtenerEmpleados() {
  empleados.value = await http.get('empleados').then((res) => res.data);
}

onMounted(() => {
  obtenerClientes();
  obtenerProductos();
  obtenerEmpleados();
});
</script>

<template>
  <Dialog v-model:visible="dialogVisible" :header="props.modoEdicion ? 'Editar Venta' : 'Crear Venta'" style="width: 30rem">
    <div class="flex items-center gap-4 mb-4">
      <label for="cliente" class="font-semibold w-24">Cliente</label>
      <Dropdown
        id="cliente"
        v-model="venta.cliente"
        :options="clientes"
        optionLabel="nombres"
        class="flex-auto"
        filter
        filterPlaceholder="Buscar cliente"
      />
    </div>
    <div class="flex items-center gap-4 mb-4">
      <label for="empleado" class="font-semibold w-24">Empleado</label>
      <Dropdown
        id="empleado"
        v-model="venta.empleado"
        :options="empleados"
        optionLabel="nombres"
        class="flex-auto"
        filter
        filterPlaceholder="Buscar empleado"
      />
    </div>
    <div class="flex items-center gap-4 mb-4">
      <label for="producto" class="font-semibold w-24">Producto</label>
      <Dropdown
        id="producto"
        v-model="venta.producto"
        :options="productos"
        optionLabel="nombre"
        class="flex-auto"
        filter
        filterPlaceholder="Buscar producto"
        @change="calcularTotal"
      />
    </div>
    <div class="flex items-center gap-4 mb-4">
      <label for="cantidad" class="font-semibold w-24">Cantidad</label>
      <InputNumber id="cantidad" v-model="venta.cantidad" class="flex-auto" :min="1" @input="calcularTotal" />
    </div>
    <div class="flex justify-end gap-2">
      <Button type="button" label="Cancelar" icon="pi pi-times" severity="secondary" @click="dialogVisible = false" />
      <Button type="button" label="Guardar" icon="pi pi-save" @click="handleSave" />
    </div>
  </Dialog>
</template>

<style scoped></style>
