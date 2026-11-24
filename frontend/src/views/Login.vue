<template>
    <div class="login-page">

        <!-- Navbar -->
        <nav class="navbar">
            <div class="container nav-inner">
                <router-link to="/" class="navbar-brand">
                    <svg class="brand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                        <path d="M22 16.5H2l4-9h12l4 9z" />
                        <path d="M6 16.5l1.5 3h9l1.5-3" />
                        <path d="M12 7.5V4m0 0l-2 2m2-2l2 2" />
                    </svg>
                    <span class="brand-name">Quet<span class="brand-accent">zal</span></span>
                </router-link>
            </div>
        </nav>

        <!-- Contenido -->
        <div class="container content">
            <div class="login-box animate-fade-up">

                <!-- Título -->
                <div class="login-header">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="40"
                        height="40">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                    <h1>Iniciar Sesión</h1>
                    <p>Bienvenido de vuelta a Quetzal</p>
                </div>

                <!-- Formulario -->
                <form @submit.prevent="handleLogin">

                    <div class="form-group">
                        <label>Correo electrónico</label>
                        <div class="input-wrapper">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="18"
                                height="18">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                            <input type="email" v-model="form.correo" placeholder="correo@gmail.com" required />
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Contraseña</label>
                        <div class="input-wrapper">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="18"
                                height="18">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                            <input :type="showPassword ? 'text' : 'password'" v-model="form.password"
                                placeholder="Tu contraseña" required />
                            <button type="button" class="toggle-password" @click="showPassword = !showPassword">
                                <svg v-if="!showPassword" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="1.5" width="18" height="18">
                                    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" />
                                    <circle cx="12" cy="12" r="3" />
                                </svg>
                                <svg v-else viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"
                                    width="18" height="18">
                                    <path
                                        d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                                    <line x1="1" y1="1" x2="23" y2="23" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <!-- CAPTCHA -->
                    <div class="g-recaptcha" data-sitekey="6Ld6CeQsAAAAAKp1exLv1W6X-cSmJXhv20RzFiwq"
                        data-callback="captchaCallback" style="margin-bottom: 1rem;"></div>

                    <!-- Error -->
                    <div class="error-msg" v-if="error">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="16"
                            height="16">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        {{ error }}
                    </div>

                    <button type="submit" class="btn-submit" :disabled="loading">
                        <svg v-if="!loading" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            width="18" height="18">
                            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                            <polyline points="10 17 15 12 10 7" />
                            <line x1="15" y1="12" x2="3" y2="12" />
                        </svg>
                        <span v-if="loading">Iniciando sesión...</span>
                        <span v-else>Iniciar Sesión</span>
                    </button>

                </form>

                <div class="login-footer">
                    <p>¿No tienes cuenta? <router-link to="/registro">Regístrate aquí</router-link></p>
                </div>

            </div>
        </div>

        <!-- Footer -->
        <footer class="footer">
            <div class="container footer-inner">
                <span class="footer-brand">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="18"
                        height="18">
                        <path d="M22 16.5H2l4-9h12l4 9z" />
                        <path d="M6 16.5l1.5 3h9l1.5-3" />
                        <path d="M12 7.5V4m0 0l-2 2m2-2l2 2" />
                    </svg>
                    Quetzal
                </span>
                <span class="footer-copy">© {{ currentYear }} Quetzal — Todos los derechos reservados</span>
            </div>
        </footer>

    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { obtenerCsrfToken, iniciarTemporizador } from '../main'

const router = useRouter()
const currentYear = computed(() => new Date().getFullYear())

const form = ref({ correo: '', password: '' })
const error = ref('')
const loading = ref(false)
const showPassword = ref(false)
const captchaToken = ref('')

onMounted(() => {
    // Mostrar alerta si la sesión expiró
    if (localStorage.getItem('sessionExpired')) {
        localStorage.removeItem('sessionExpired')
        window.Swal.fire({
            icon: 'warning',
            title: 'Sesión expirada',
            text: 'Lo sentimos, tu sesión ha expirado. Por favor inicia sesión nuevamente.',
            background: '#1a0c10',
            color: '#f0e8e0',
            confirmButtonColor: '#c9a84c'
        })
    }

    // Callback global del CAPTCHA
    window.captchaCallback = (token) => {
        captchaToken.value = token
    }

    // Cargar script de reCAPTCHA dinámicamente
    const script = document.createElement('script')
    script.src = 'https://www.google.com/recaptcha/api.js'
    script.async = true
    script.defer = true
    document.head.appendChild(script)
})

// Validación frontend antes de enviar
const validar = () => {
    if (!form.value.correo.trim()) return 'El correo es obligatorio.'
    const regexCorreo = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/
    if (!regexCorreo.test(form.value.correo)) return 'El correo solo puede tener letras o números antes del @.'
    if (!form.value.password.trim()) return 'La contraseña es obligatoria.'
    return null
}

const handleLogin = async () => {
    error.value = ''

    const errValidacion = validar()
    if (errValidacion) {
        error.value = errValidacion
        return
    }

    if (!captchaToken.value) {
        error.value = 'Por favor completa el CAPTCHA.'
        return
    }

    loading.value = true
    try {
        const res = await axios.post(
            `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/auth/login`,
            { ...form.value, captchaToken: captchaToken.value },
            { withCredentials: true }
        )

        const usuario = res.data.usuario
        localStorage.setItem('usuario', JSON.stringify(usuario))
        axios.defaults.headers.common['x-usuario'] = JSON.stringify(usuario)

        // Mensaje de bienvenida según género
        const bienvenida = usuario.genero === 'femenino'
            ? `¡Bienvenida, ${usuario.nombre}!`
            : `¡Bienvenido, ${usuario.nombre}!`

        await window.Swal.fire({
            icon: 'success',
            title: bienvenida,
            text: 'Accediendo al sistema...',
            timer: 2000,
            timerProgressBar: true,
            showConfirmButton: false,
            background: '#1a0c10',
            color: '#f0e8e0',
            iconColor: '#c9a84c'
        })

        await obtenerCsrfToken()
        iniciarTemporizador()
        router.push('/dashboard')
    } catch (err) {
        error.value = err.response?.data?.message || 'Error al iniciar sesión.'
        if (window.grecaptcha) window.grecaptcha.reset()
        captchaToken.value = ''
    } finally {
        loading.value = false
    }
}
</script>

<style scoped>
.login-page {
    min-height: 100vh;
    background-color: #0f0508;
    color: #f0e8e0;
    font-family: 'Segoe UI', system-ui, sans-serif;
    display: flex;
    flex-direction: column;
}

.navbar {
    background: rgba(15, 5, 8, 0.95);
    border-bottom: 1px solid rgba(201, 168, 76, 0.15);
    padding: 1rem 0;
}

.nav-inner {
    display: flex;
    align-items: center;
}

.navbar-brand {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    text-decoration: none;
}

.brand-icon {
    width: 28px;
    height: 28px;
    color: #c9a84c;
}

.brand-name {
    font-size: 1.4rem;
    font-weight: 800;
    color: #fff;
    letter-spacing: -0.5px;
}

.brand-accent {
    color: #c9a84c;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
}

.content {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 4rem 1.5rem;
}

@keyframes fadeUp {
    from {
        opacity: 0;
        transform: translateY(24px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-fade-up {
    animation: fadeUp 0.6s ease forwards;
}

.login-box {
    background: #1a0c10;
    border: 1px solid rgba(201, 168, 76, 0.2);
    border-radius: 16px;
    padding: 2.5rem;
    width: 100%;
    max-width: 440px;
}

.login-header {
    text-align: center;
    margin-bottom: 2rem;
    color: #c9a84c;
}

.login-header h1 {
    font-size: 1.8rem;
    font-weight: 800;
    color: #fff;
    margin: 0.75rem 0 0.4rem;
}

.login-header p {
    color: #b89a8a;
    font-size: 0.95rem;
}

.form-group {
    margin-bottom: 1.25rem;
}

.form-group label {
    display: block;
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #c9a84c;
    margin-bottom: 0.5rem;
}

.input-wrapper {
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(201, 168, 76, 0.2);
    border-radius: 8px;
    padding: 0 1rem;
    gap: 0.75rem;
    transition: border-color 0.2s;
}

.input-wrapper:focus-within {
    border-color: #c9a84c;
}

.input-wrapper svg {
    color: #c9a84c;
    flex-shrink: 0;
}

.input-wrapper input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    color: #f0e8e0;
    font-size: 0.95rem;
    padding: 0.85rem 0;
    font-family: inherit;
}

.input-wrapper input::placeholder {
    color: #6b5a5a;
}

.toggle-password {
    background: transparent;
    border: none;
    cursor: pointer;
    color: #b89a8a;
    display: flex;
    align-items: center;
    padding: 0;
    transition: color 0.2s;
}

.toggle-password:hover {
    color: #c9a84c;
}

.error-msg {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(107, 15, 26, 0.3);
    border: 1px solid rgba(107, 15, 26, 0.5);
    border-radius: 8px;
    padding: 0.75rem 1rem;
    color: #f0a0a0;
    font-size: 0.88rem;
    margin-bottom: 1.25rem;
}

.btn-submit {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background: #c9a84c;
    color: #4a0a12;
    font-weight: 700;
    font-size: 1rem;
    padding: 0.9rem;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
    margin-top: 0.5rem;
}

.btn-submit:hover:not(:disabled) {
    background: #f0c96b;
    transform: translateY(-1px);
}

.btn-submit:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.login-footer {
    text-align: center;
    margin-top: 1.5rem;
    color: #b89a8a;
    font-size: 0.9rem;
}

.login-footer a {
    color: #c9a84c;
    text-decoration: none;
    font-weight: 600;
}

.login-footer a:hover {
    text-decoration: underline;
}

.footer {
    background: #0f0508;
    border-top: 1px solid rgba(201, 168, 76, 0.1);
    padding: 1.5rem 0;
}

.footer-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 1rem;
}

.footer-brand {
    font-size: 1rem;
    font-weight: 700;
    color: #c9a84c;
    display: flex;
    align-items: center;
    gap: 0.4rem;
}

.footer-copy {
    font-size: 0.85rem;
    color: #b89a8a;
}

@media (max-width: 480px) {

    .login-box,
    .registro-box {
        padding: 1.5rem 1rem;
    }

    .footer-inner {
        flex-direction: column;
        text-align: center;
    }
}
</style>