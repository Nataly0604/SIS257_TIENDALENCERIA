<script setup lang="ts">
import http from '../../plugins/axios';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import { Select } from 'primevue';
import { computed, ref, watch } from 'vue';
import type { Empleado } from '../../models/empleado';

const ENDPOINT = 'empleados';
const props = defineProps({
    mostrar: Boolean,
    empleado: {
        type: Object as () => Empleado,
        default: () => ({} as Empleado),
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

const empleado = ref<Empleado>({ ...props.empleado });

watch(
    () => props.empleado,
    (newVal) => {
        empleado.value = { ...newVal };
    }
);

const cargos = ['Administrador', 'Vendedor', 'Cajero', 'Almacenero'];

async function handleSave() {
    try {
        const body = {
            nombres: empleado.value.nombres,
            apellidos: empleado.value.apellidos,
            cargo: empleado.value.cargo,
            salario: empleado.value.salario,
        };
        if (props.modoEdicion) {
            await http.patch(`${ENDPOINT}/${empleado.value.id}`, body);
        } else {
            await http.post(ENDPOINT, body);
        }
        emit('guardar');
        empleado.value = {} as Empleado;
        dialogVisible.value = false;
    } catch (error: any) {
        alert(error?.response?.data?.message || 'Error al guardar el empleado.');
    }
}
</script>

<template>
    <Dialog v-model:visible="dialogVisible" :header="props.modoEdicion ? 'Editar Empleado' : 'Crear Empleado'" style="width: 25rem">
        <div class="flex items-center gap-4 mb-4">
            <label for="nombre" class="font-semibold w-24">Nombre</label>
            <InputText id="nombre" v-model="empleado.nombres" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex items-center gap-4 mb-4">
            <label for="apellidos" class="font-semibold w-24">Apellido</label>
            <InputText id="apellidos" v-model="empleado.apellidos" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex items-center gap-4 mb-4">
            <label for="cargo" class="font-semibold w-24">Cargo</label>
            <Select id="cargo" v-model="empleado.cargo" class="flex-auto" :options="cargos" />
        </div>
        <div class="flex items-center gap-4 mb-4">
            <label for="salario" class="font-semibold w-24">Salario</label>
            <InputNumber id="salario" v-model="empleado.salario" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex justify-end gap-2">
            <Button type="button" label="Cancelar" icon="pi pi-times" severity="secondary"
                @click="dialogVisible = false" />
            <Button type="button" label="Guardar" icon="pi pi-save" @click="handleSave" />
        </div>
    </Dialog>
</template>

<style scoped></style>
