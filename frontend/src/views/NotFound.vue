<template>
    <div class="not-found">
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

        <div class="container content">
            <div class="error-box animate-fade-up">
                <div class="plane-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="64"
                        height="64">
                        <path d="M22 2L11 13" />
                        <path d="M22 2L15 22l-4-9-9-4 20-7z" />
                    </svg>
                </div>
                <h1 class="error-code">404</h1>
                <h2 class="error-title">¡Vuelo no encontrado!</h2>
                <p class="error-desc">Parece que esta página despegó sin avisar. No existe o fue movida.</p>
                <router-link to="/" class="btn-home">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                        <path d="M3 12L12 3l9 9" />
                        <path d="M9 21V12h6v9" />
                        <path d="M3 12h18" />
                    </svg>
                    Volver al inicio
                </router-link>
            </div>
        </div>

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
import { computed } from 'vue'
const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.not-found {
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

@keyframes float {

    0%,
    100% {
        transform: translateY(0px) rotate(-10deg);
    }

    50% {
        transform: translateY(-15px) rotate(10deg);
    }
}

.animate-fade-up {
    animation: fadeUp 0.6s ease forwards;
}

.error-box {
    text-align: center;
    background: #1a0c10;
    border: 1px solid rgba(201, 168, 76, 0.2);
    border-radius: 16px;
    padding: 3rem 4rem;
    max-width: 500px;
}

.plane-icon {
    color: #c9a84c;
    margin-bottom: 1rem;
    display: inline-block;
    animation: float 3s ease-in-out infinite;
}

.error-code {
    font-size: 6rem;
    font-weight: 900;
    color: #c9a84c;
    line-height: 1;
    letter-spacing: -3px;
    margin-bottom: 0.5rem;
}

.error-title {
    font-size: 1.5rem;
    font-weight: 700;
    color: #fff;
    margin-bottom: 0.75rem;
}

.error-desc {
    font-size: 0.95rem;
    color: #b89a8a;
    margin-bottom: 2rem;
    line-height: 1.6;
}

.btn-home {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: #c9a84c;
    color: #4a0a12;
    font-weight: 700;
    padding: 0.75rem 2rem;
    border-radius: 8px;
    text-decoration: none;
    transition: all 0.2s;
}

.btn-home:hover {
    background: #f0c96b;
    transform: translateY(-2px);
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
    .error-box {
        padding: 2rem 1.5rem;
    }

    .error-code {
        font-size: 4rem;
    }
}
</style>