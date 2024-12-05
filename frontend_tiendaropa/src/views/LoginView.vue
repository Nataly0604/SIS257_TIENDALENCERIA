<template>
    <div>
        <!-- Componente Toast -->
        <Toast />
        <!-- Vista de Login -->
        <div class="login-container">
            <div class="login-card">
                <h2 class="text-900 font-bold text-3xl text-center mb-4">Iniciar Sesión</h2>
                <p class="text-600 text-center mb-6">Accede a tu cuenta para explorar nuestras colecciones exclusivas.
                </p>

                <form @submit.prevent="handleSubmit">
                    <div class="form-group">
                        <label for="email" class="text-600">Correo Electrónico</label>
                        <input id="email" v-model="email" type="email" class="input-field"
                            placeholder="Ingresa tu correo" required />
                    </div>

                    <div class="form-group">
                        <label for="password" class="text-600">Contraseña</label>
                        <input id="password" v-model="password" type="password" class="input-field"
                            placeholder="Ingresa tu contraseña" required />
                    </div>

                    <Button type="submit" label="Iniciar Sesión" icon="pi pi-sign-in"
                        class="p-button-primary w-full mt-4" />
                </form>

                <p class="text-center text-600 mt-4">
                    ¿No tienes una cuenta?
                    <RouterLink to="/registro" class="link">Regístrate aquí</RouterLink>
                </p>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import { useToast } from 'primevue/usetoast'; // Importa el hook para usar el servicio Toast
import Toast from 'primevue/toast'; // Componente Toast

export default {
    components: { Button, Toast },
    setup() {
        const email = ref('');
        const password = ref('');
        const router = useRouter();
        const toast = useToast();

        const handleSubmit = () => {
            console.log('Email:', email.value);
            console.log('Password:', password.value);

            // Muestra un mensaje de éxito
            toast.add({
                severity: 'success',
                summary: 'Inicio de Sesión',
                detail: '¡Bienvenido de nuevo!',
                life: 3000,
            });

            // Redirige a la ruta home
            router.push('/');
        };

        return {
            email,
            password,
            handleSubmit,
        };
    },
};
</script>

<style scoped>
.login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background-color: var(--secondary-color);
}

.login-card {
    width: 100%;
    max-width: 400px;
    background-color: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    padding: 2rem;
}

.form-group {
    margin-bottom: 1.5rem;
}

.label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
}

.input-field {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid var(--border-color);
    border-radius: 5px;
    font-size: 1rem;
    outline: none;
    transition: border-color 0.3s ease;
}

.input-field:focus {
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
}

.link {
    color: var(--primary-color);
    text-decoration: none;
    font-weight: bold;
}

.link:hover {
    color: var(--hover-color);
    text-decoration: underline;
}
</style>