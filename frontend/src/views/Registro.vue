<template>
    <div class="registro-page">

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
            <div class="registro-box animate-fade-up">

                <!-- Título -->
                <div class="registro-header">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="40"
                        height="40">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <line x1="19" y1="8" x2="19" y2="14" />
                        <line x1="22" y1="11" x2="16" y2="11" />
                    </svg>
                    <h1>Crear Cuenta</h1>
                    <p>Únete a Quetzal y empieza a volar</p>
                </div>

                <!-- Formulario -->
                <form @submit.prevent="handleRegistro">

                    <!-- Nombre completo -->
                    <div class="form-group">
                        <label>Nombre completo</label>
                        <div class="input-wrapper">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="18"
                                height="18">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                            <input type="text" v-model="form.nombre" placeholder="Nombre Nombre" />
                        </div>
                        <span class="campo-hint">Dos palabras con mayúscula inicial. Ej: Nombre Nombre</span>
                    </div>

                    <!-- Apellidos -->
                    <div class="form-row">
                        <div class="form-group">
                            <label>Primer Apellido</label>
                            <div class="input-wrapper">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="18"
                                    height="18">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                                <input type="text" v-model="form.primer_apellido" placeholder="Apellido" />
                            </div>
                        </div>
                        <div class="form-group">
                            <label>Segundo Apellido</label>
                            <div class="input-wrapper">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="18"
                                    height="18">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                                <input type="text" v-model="form.segundo_apellido" placeholder="Opcional" />
                            </div>
                        </div>
                    </div>

                    <!-- Nacionalidad -->
                    <div class="form-group">
                        <label>Nacionalidad</label>
                        <div class="input-wrapper">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="18"
                                height="18">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="2" y1="12" x2="22" y2="12" />
                                <path
                                    d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                            </svg>
                            <input type="text" v-model="form.nacionalidad" placeholder="Mexicana" />
                        </div>
                    </div>

                    <!-- Correo -->
                    <div class="form-group">
                        <label>Correo Electrónico</label>
                        <div class="input-wrapper">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="18"
                                height="18">
                                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                <polyline points="22,6 12,13 2,6" />
                            </svg>
                            <input type="email" v-model="form.correo" placeholder="usuario123@gmail.com" />
                        </div>
                        <span class="campo-hint">Ej: usuario@gmail.com o usuario@gob.mx</span>
                    </div>

                    <!-- Teléfono y Pasaporte -->
                    <div class="form-row">
                        <div class="form-group">
                            <label>Teléfono</label>
                            <div class="input-wrapper">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="18"
                                    height="18">
                                    <path
                                        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                                </svg>
                                <input type="tel" v-model="form.telefono" placeholder="4941161315" maxlength="10"
                                    @input="soloNumeros" />
                            </div>
                            <span class="campo-hint">Exactamente 10 dígitos</span>
                        </div>
                        <div class="form-group">
                            <label>Núm. Pasaporte</label>
                            <div class="input-wrapper">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="18"
                                    height="18">
                                    <rect x="3" y="3" width="18" height="18" rx="2" />
                                    <circle cx="12" cy="10" r="3" />
                                    <path d="M7 21v-1a5 5 0 0 1 10 0v1" />
                                </svg>
                                <input type="text" v-model="form.num_pasaporte" placeholder="MX12345" maxlength="8"
                                    @input="formatearPasaporte" />
                            </div>
                            <span class="campo-hint">2 letras + 5 o 6 números. Ej: MX12345</span>
                        </div>
                    </div>

                    <!-- Género -->
                    <div class="form-group">
                        <label>Género</label>
                        <div class="input-wrapper">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="18"
                                height="18">
                                <circle cx="12" cy="7" r="4" />
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                            </svg>
                            <select v-model="form.genero"
                                style="flex:1; background:transparent; border:none; outline:none; color:#f0e8e0; font-size:0.95rem; padding:0.85rem 0; font-family:inherit;">
                                <option value="" disabled style="background:#1a0c10;">Selecciona tu género</option>
                                <option value="femenino" style="background:#1a0c10;">Femenino</option>
                                <option value="masculino" style="background:#1a0c10;">Masculino</option>
                            </select>
                        </div>
                    </div>

                    <!-- Contraseña -->
                    <div class="form-group">
                        <label>Contraseña</label>
                        <div class="input-wrapper">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="18"
                                height="18">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                            <input :type="showPassword ? 'text' : 'password'" v-model="form.password"
                                placeholder="Mínimo 8 caracteres, una letra y un número" />
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
                        <span class="campo-hint">Mínimo 8 caracteres, al menos una letra y un número</span>
                    </div>

                    <!-- CAPTCHA -->
                    <div class="g-recaptcha" data-sitekey="6Ld6CeQsAAAAAKp1exLv1W6X-cSmJXhv20RzFiwq"
                        data-callback="captchaCallbackRegistro" style="margin-bottom: 1rem;">
                    </div>

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

                    <!-- Éxito -->
                    <div class="success-msg" v-if="success">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="16"
                            height="16">
                            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                            <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                        {{ success }}
                    </div>

                    <button type="submit" class="btn-submit" :disabled="loading">
                        <svg v-if="!loading" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                            width="18" height="18">
                            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                            <circle cx="9" cy="7" r="4" />
                            <line x1="19" y1="8" x2="19" y2="14" />
                            <line x1="22" y1="11" x2="16" y2="11" />
                        </svg>
                        <span v-if="loading">Creando cuenta...</span>
                        <span v-else>Crear Cuenta</span>
                    </button>

                </form>

                <div class="registro-footer">
                    <p>¿Ya tienes cuenta? <router-link to="/login">Inicia sesión aquí</router-link></p>
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

const router = useRouter()
const currentYear = computed(() => new Date().getFullYear())

const form = ref({
    nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
    nacionalidad: '',
    correo: '',
    telefono: '',
    num_pasaporte: '',
    password: '',
    genero: ''
})

const error = ref('')
const success = ref('')
const loading = ref(false)
const showPassword = ref(false)
const captchaToken = ref('')

onMounted(() => {
    window.captchaCallbackRegistro = (token) => {
        captchaToken.value = token
    }
    const script = document.createElement('script')
    script.src = 'https://www.google.com/recaptcha/api.js'
    script.async = true
    script.defer = true
    document.head.appendChild(script)
})

// ─── Solo permite números en teléfono, máx 10 ────────────────
const soloNumeros = () => {
    form.value.telefono = form.value.telefono.replace(/\D/g, '').slice(0, 10)
}

// ─── Formatea pasaporte: 2 letras mayúsculas + números ────────
const formatearPasaporte = () => {
    let val = form.value.num_pasaporte.toUpperCase()
    let letras = val.slice(0, 2).replace(/[^A-Z]/g, '')
    let numeros = val.slice(2).replace(/\D/g, '').slice(0, 6)
    form.value.num_pasaporte = letras + numeros
}

const validar = () => {
    const regexNombre = /^[A-ZÁÉÍÓÚÜÑ][a-záéíóúüñ]+(\s[A-ZÁÉÍÓÚÜÑ][a-záéíóúüñ]+)?$/

    if (!form.value.nombre.trim()) return 'El nombre es obligatorio.'
    if (!regexNombre.test(form.value.nombre.trim()))
        return 'El nombre debe tener dos palabras con mayúscula inicial. Ej: Nombre Nombre'

    if (!form.value.primer_apellido.trim()) return 'El primer apellido es obligatorio.'
    if (!regexNombre.test(form.value.primer_apellido.trim()))
        return 'El primer apellido debe iniciar con mayúscula. Ej: García'

    if (form.value.segundo_apellido.trim() && !regexNombre.test(form.value.segundo_apellido.trim()))
        return 'El segundo apellido debe iniciar con mayúscula. Ej: López'

    if (!form.value.nacionalidad.trim()) return 'La nacionalidad es obligatoria.'

    const regexCorreo = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/
    if (!form.value.correo.trim()) return 'El correo es obligatorio.'
    if (!regexCorreo.test(form.value.correo.trim()))
        return 'El correo solo puede tener letras o números antes del @. Ej: usuario123@gmail.com'

    const regexTel = /^\d{10}$/
    if (!form.value.telefono.trim()) return 'El teléfono es obligatorio.'
    if (!regexTel.test(form.value.telefono.trim()))
        return 'El teléfono debe tener exactamente 10 dígitos numéricos. Ej: 4941161315'

    const regexPasaporte = /^[A-Z]{2}[0-9]{5,6}$/
    if (!form.value.num_pasaporte.trim()) return 'El número de pasaporte es obligatorio.'
    if (!regexPasaporte.test(form.value.num_pasaporte.trim().toUpperCase()))
        return 'El pasaporte debe tener 2 letras mayúsculas + 5 o 6 números. Ej: MX12345'

    if (!form.value.genero) return 'Selecciona tu género.'

    const regexPassword = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,}$/
    if (!regexPassword.test(form.value.password))
        return 'La contraseña debe tener mínimo 8 caracteres, al menos una letra y un número.'

    return null
}

const handleRegistro = async () => {
    error.value = ''
    success.value = ''

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
        await axios.post(
            `${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/auth/registro`,
            { ...form.value, captchaToken: captchaToken.value },
            { withCredentials: true }
        )

        await window.Swal.fire({
            icon: 'success',
            title: '¡Cuenta creada!',
            text: 'Tu cuenta fue creada correctamente. Inicia sesión.',
            background: '#1a0c10',
            color: '#f0e8e0',
            confirmButtonColor: '#c9a84c',
        })

        router.push('/login')
    } catch (err) {
        error.value = err.response?.data?.message || 'Error al crear la cuenta.'
        if (window.grecaptcha) window.grecaptcha.reset()
        captchaToken.value = ''
    } finally {
        loading.value = false
    }
}
</script>

<style scoped>
.registro-page {
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
    padding: 3rem 1.5rem;
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

.registro-box {
    background: #1a0c10;
    border: 1px solid rgba(201, 168, 76, 0.2);
    border-radius: 16px;
    padding: 2.5rem;
    width: 100%;
    max-width: 600px;
}

.registro-header {
    text-align: center;
    margin-bottom: 2rem;
    color: #c9a84c;
}

.registro-header h1 {
    font-size: 1.8rem;
    font-weight: 800;
    color: #fff;
    margin: 0.75rem 0 0.4rem;
}

.registro-header p {
    color: #b89a8a;
    font-size: 0.95rem;
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
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

.campo-hint {
    display: block;
    color: #6b5a5a;
    font-size: 0.75rem;
    margin-top: 0.25rem;
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

.success-msg {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(15, 107, 26, 0.3);
    border: 1px solid rgba(15, 107, 26, 0.5);
    border-radius: 8px;
    padding: 0.75rem 1rem;
    color: #a0f0a0;
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

.registro-footer {
    text-align: center;
    margin-top: 1.5rem;
    color: #b89a8a;
    font-size: 0.9rem;
}

.registro-footer a {
    color: #c9a84c;
    text-decoration: none;
    font-weight: 600;
}

.registro-footer a:hover {
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

@media (max-width: 600px) {
    .form-row {
        grid-template-columns: 1fr;
    }
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