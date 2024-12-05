<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="principal-container">
    <header>
      <div class="header-container">
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/clientes">Clientes</RouterLink>
          <RouterLink to="/empleados">Empleados</RouterLink>
          <RouterLink to="/categorias">Categorias</RouterLink>
          <RouterLink to="/productos">Productos</RouterLink>
          <RouterLink to="/ventas">Ventas</RouterLink>
          <RouterLink to="/login">Login</RouterLink>
        </nav>
      </div>
    </header>

    <main>
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
/* General Styles */
:root {
  --primary-color: #007bff;
  --secondary-color: #f8f9fa;
  --text-color: #333;
  --border-color: rgb(75, 221, 75);;
  --hover-color: #0056b3;
}

body {
  margin: 0;
  font-family: 'Roboto', sans-serif;
  background-color: var(--secondary-color);
  color: var(--text-color);
}

/* Header Styles */
.principal-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

header {
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 3rem;
  right: 0;
}

.logo {
  cursor: pointer;
}

nav {
  display: flex;
  gap: 1.5rem;
}

nav a {
  text-decoration: none;
  font-weight: bold;
  color: var(--primary-color);
  padding: 0.5rem 1rem;
  border: 2px solid transparent;
  border-radius: 5px;
  transition: all 0.3s ease;
}

nav a:hover {
  background-color: var(--primary-color);
  color: rgb(75, 221, 75);
  border-color: var(--primary-color);
}

nav a.router-link-exact-active {
  background-color: var(--primary-color);
  color: rgb(75, 221, 75);
}

/* Main Content Styles */
/* Main Content Styles */
main {
  flex-grow: 1;
  padding: 0; /* Elimina el padding para que ocupe todo el ancho */
}

main > * {
  max-width: 100%; /* Permite que ocupe todo el ancho */
  margin: 0;
}
</style>