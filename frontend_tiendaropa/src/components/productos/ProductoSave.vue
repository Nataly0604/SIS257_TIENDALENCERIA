<script setup lang="ts">
import http from '../../plugins/axios';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Select from 'primevue/select';
import { computed, onMounted, ref, watch } from 'vue'
import type { Producto } from '../../models/producto';
import type { Categoria } from '../../models/categoria';

const ENDPOINT = 'productos';
const props = defineProps({
    mostrar: Boolean,
    producto: {
        type: Object as () => Producto,
        default: () => ({} as Producto),
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

const producto = ref<Producto>({ ...props.producto });
const categorias = ref<Categoria    []>([])

watch(
    () => props.producto,
    (newVal) => {
        producto.value = { ...newVal };
    }
);

async function handleSave() {
    try {
        const body = {
            nombre: producto.value.nombre,
            descripcion: producto.value.descripcion,
            precioUnitario: producto.value.precioUnitario,
            stock: producto.value.stock,
            idCategoria: producto.value.categoria.id,
        };
        if (props.modoEdicion) {
            await http.patch(`${ENDPOINT}/${producto.value.id}`, body);
        } else {
            await http.post(ENDPOINT, body);
        }
        emit('guardar');
        producto.value = {} as Producto;
        dialogVisible.value = false;
    } catch (error: any) {
        alert(error?.response?.data?.message || 'Error al guardar el producto.');
    }
}

async function obtenerCategorias() {
    categorias.value = await http.get('categorias').then((res) => res.data)
}

onMounted(() => {
    obtenerCategorias()
})
</script>

<template>
    <Dialog v-model:visible="dialogVisible" :header="props.modoEdicion ? 'Editar Producto' : 'Crear Producto'" style="width: 25rem">
        <div class="flex items-center gap-4 mb-4">
            <label for="nombre" class="font-semibold w-24">Nombre</label>
            <InputText id="nombre" v-model="producto.nombre" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex items-center gap-4 mb-4">
            <label for="descripcion" class="font-semibold w-24">Descripción</label>
            <InputText id="descripcion" v-model="producto.descripcion" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex items-center gap-4 mb-4">
            <label for="precioUnitario" class="font-semibold w-24">Precio Unitario</label>
            <InputNumber id="precioUnitario" v-model="producto.precioUnitario" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex items-center gap-4 mb-4">
            <label for="stock" class="font-semibold w-24">Stock</label>
            <InputNumber id="stock" v-model="producto.stock" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex items-center gap-4 mb-4">
                <label for="categoria" class="font-semibold w-24">Categorias</label>
                <Select id="categoria" v-model="producto.categoria" :options="categorias" optionLabel="nombre"
                    class="flex-auto" />
            </div>
        <div class="flex justify-end gap-2">
            <Button type="button" label="Cancelar" icon="pi pi-times" severity="secondary"
                @click="dialogVisible = false" />
            <Button type="button" label="Guardar" icon="pi pi-save" @click="handleSave" />
        </div>
    </Dialog>
</template>

<style scoped></style>
