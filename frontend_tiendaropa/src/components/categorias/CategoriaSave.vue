<script setup lang="ts">
import http from '../../plugins/axios';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import InputMask from 'primevue/inputmask';
import { computed, ref, watch } from 'vue';
import type { Categoria } from '../../models/categoria';

const ENDPOINT = 'categorias';
const props = defineProps({
    mostrar: Boolean,
    categoria: {
        type: Object as () => Categoria,
        default: () => ({} as Categoria),
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

const categoria = ref<Categoria>({ ...props.categoria });

watch(
    () => props.categoria,
    (newVal) => {
        categoria.value = { ...newVal };
    }
);

async function handleSave() {
    try {
        const body = {
            nombre: categoria.value.nombre,
        };
        if (props.modoEdicion) {
            await http.patch(`${ENDPOINT}/${categoria.value.id}`, body);
        } else {
            await http.post(ENDPOINT, body);
        }
        emit('guardar');
        categoria.value = {} as Categoria;
        dialogVisible.value = false;
    } catch (error: any) {
        alert(error?.response?.data?.message || 'Error al guardar el categoria.');
    }
}
</script>

<template>
    <Dialog v-model:visible="dialogVisible" :header="props.modoEdicion ? 'Editar' : 'Crear'" style="width: 25rem">
        <div class="flex items-center gap-4 mb-4">
            <label for="nombre" class="font-semibold w-24">Nombres</label>
            <InputText id="nombre" v-model="categoria.nombre" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex justify-end gap-2">
            <Button type="button" label="Cancelar" icon="pi pi-times" severity="secondary"
                @click="dialogVisible = false" />
            <Button type="button" label="Guardar" icon="pi pi-save" @click="handleSave" />
        </div>
    </Dialog>
</template>

<style scoped></style>
