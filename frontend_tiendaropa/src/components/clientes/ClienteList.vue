  <script setup lang="ts">
  import type { Cliente } from '../../models/cliente';
  import http from '../../plugins/axios';
  import Button from 'primevue/button';
  import Dialog from 'primevue/dialog';
  import { onMounted, ref } from 'vue';

  const ENDPOINT = 'clientes';
  let clientes = ref<Cliente[]>([]);

  const emit = defineEmits(['edit']);
  const clienteDelete = ref<Cliente | null>(null);
  const mostrarConfirmDialog = ref<boolean>(false);

  async function obtenerLista() {
    clientes.value = await http.get(ENDPOINT).then((response) => response.data)
    console.log('Clientes:', clientes.value);
  }

  function emitirEdicion(cliente: Cliente) {
    emit('edit', cliente);
  }

  function mostrarEliminarConfirm(cliente: Cliente) {
    clienteDelete.value = cliente;
    mostrarConfirmDialog.value = true;
  }

  async function eliminar() {
    try {
      if (clienteDelete.value) {
        await http.delete(`${ENDPOINT}/${clienteDelete.value.id}`);
        obtenerLista();
      }
    } catch (error) {
      console.error('Error al eliminar el cliente:', error);
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
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Email</th>
            <th>Teléfono</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(cliente, index) in clientes" :key="cliente.id">
            <td>{{ index + 1 }}</td>
            <td>{{ cliente.nombres }}</td>
            <td>{{ cliente.apellidos }}</td>
            <td>{{ cliente.email }}</td>
            <td>{{ cliente.telefono }}</td>
            <td>{{ cliente.direccion }}</td>
            <td>
              <Button icon="pi pi-pencil" aria-label="Editar" text @click="emitirEdicion(cliente)" />
              <Button icon="pi pi-trash" aria-label="Eliminar" text @click="mostrarEliminarConfirm(cliente)" />
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
