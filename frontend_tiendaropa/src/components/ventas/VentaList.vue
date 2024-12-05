<script setup lang="ts">
import type { Venta } from '../../models/venta';
import http from '../../plugins/axios';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import { onMounted, ref } from 'vue';
import dayjs from 'dayjs'; // Importa dayjs

const ENDPOINT = 'ventas';
let ventas = ref<Venta[]>([]);

const emit = defineEmits(['edit']);
const ventaDelete = ref<Venta | null>(null);
const mostrarConfirmDialog = ref<boolean>(false);

async function obtenerLista() {
    ventas.value = await http.get(ENDPOINT).then((response) => response.data);
    // Formatear la fecha de cada venta
    ventas.value = ventas.value.map((venta) => ({
        ...venta,
        fechaVentaFormateada: dayjs(venta.fechaVenta).format('DD/MM/YYYY HH:mm:ss'), // Formato legible
    }));
    console.log('Ventas:', ventas.value);
}

function calcularTotal(venta: Venta): number {
    return venta.cantidad * (venta.producto?.precioUnitario || 0);
}

function mostrarEliminarConfirm(venta: Venta) {
    ventaDelete.value = venta;
    mostrarConfirmDialog.value = true;
}

async function eliminar() {
    try {
        if (ventaDelete.value) {
            await http.delete(`${ENDPOINT}/${ventaDelete.value.id}`);
            obtenerLista();
        }
    } catch (error) {
        console.error('Error al eliminar la venta:', error);
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
                    <th>Fecha de Venta</th>
                    <th>Cliente</th>
                    <th>Empleado</th>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Total</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(venta, index) in ventas" :key="venta.id">
                    <td>{{ index + 1 }}</td>
                    <td>{{ dayjs(venta.fechaVenta).format('DD/MM/YYYY HH:mm:ss') }}</td>
                    <td>{{ venta.cliente.nombres }}</td>
                    <td>{{ venta.empleado.nombres }}</td>
                    <td>{{ venta.producto.nombre }}</td>
                    <td>{{ venta.cantidad }}</td>
                    <td>{{ calcularTotal(venta).toFixed(2) }}</td>
                    <td>
                        <!-- <Button icon="pi pi-pencil" aria-label="Editar" text @click="emitirEdicion(venta)" /> -->
                        <Button icon="pi pi-trash" aria-label="Eliminar" text @click="mostrarEliminarConfirm(venta)" />
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
