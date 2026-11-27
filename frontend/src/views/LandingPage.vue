<template>
    <div class="landing">

        <!-- Navbar -->
        <nav class="navbar" :class="{ scrolled: isScrolled }">
            <div class="container nav-inner">
                <router-link class="navbar-brand" to="/">
                    <svg class="brand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"
                        aria-hidden="true">
                        <path d="M22 16.5H2l4-9h12l4 9z" />
                        <path d="M6 16.5l1.5 3h9l1.5-3" />
                        <path d="M12 7.5V4m0 0l-2 2m2-2l2 2" />
                    </svg>
                    <span class="brand-name">Quet<span class="brand-accent">zal</span></span>
               </router-link>
                <div class="nav-actions">
                    <router-link to="/login" class="btn btn-ghost">Iniciar Sesión</router-link>
                    <router-link to="/registro" class="btn btn-primary">Registrarse</router-link>
                </div>
            </div>
        </nav>

        <!-- Hero -->
        <section class="hero">
            <div class="hero-bg-overlay" aria-hidden="true"></div>
            <div class="container hero-content">
                <p class="hero-eyebrow animate-fade-up" style="--delay: 0.1s">Libertad de volar</p>
                <h1 class="hero-title animate-fade-up" style="--delay: 0.2s">
                    Tu próximo destino<br><span class="hero-highlight">te está esperando</span>
                </h1>
                <p class="hero-subtitle animate-fade-up" style="--delay: 0.3s">Reserva vuelos rápido, seguros y sin
                    complicaciones</p>

                <!-- Toggle ida/vuelta -->
                <div class="trip-toggle animate-fade-up" style="--delay: 0.35s">
                    <button class="toggle-btn" :class="{ active: tripType === 'roundtrip' }"
                        @click="tripType = 'roundtrip'">Ida y vuelta</button>
                    <button class="toggle-btn" :class="{ active: tripType === 'oneway' }"
                        @click="tripType = 'oneway'">Solo ida</button>
                </div>

                <!-- Search Bar -->
                <div class="search-bar animate-fade-up" style="--delay: 0.4s">
                    <div class="search-field" @click="activeField = 'origin'"
                        :class="{ focused: activeField === 'origin' }">
                        <span class="search-label">Origen</span>
                        <span class="search-value">Ciudad de México</span>
                        <div class="field-dropdown" v-if="activeField === 'origin'">
                            <div class="dropdown-item" v-for="city in popularCities" :key="city"
                                @click.stop="activeField = null">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="14"
                                    height="14">
                                    <circle cx="12" cy="12" r="9" />
                                    <path d="M12 8v4l3 3" />
                                </svg>
                                {{ city }}
                            </div>
                        </div>
                    </div>
                    <div class="search-divider" aria-hidden="true">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18"
                            height="18">
                            <path d="M4 12h16M14 6l6 6-6 6M10 18l-6-6 6-6" />
                        </svg>
                    </div>
                    <div class="search-field" @click="activeField = 'dest'"
                        :class="{ focused: activeField === 'dest' }">
                        <span class="search-label">Destino</span>
                        <span class="search-value">Selecciona ciudad</span>
                        <div class="field-dropdown" v-if="activeField === 'dest'">
                            <div class="dropdown-item" v-for="city in popularCities" :key="city"
                                @click.stop="activeField = null">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="14"
                                    height="14">
                                    <path d="M12 2a7 7 0 0 1 7 7c0 4-7 13-7 13S5 13 5 9a7 7 0 0 1 7-7z" />
                                    <circle cx="12" cy="9" r="2.5" />
                                </svg>
                                {{ city }}
                            </div>
                        </div>
                    </div>
                    <div class="search-field" @click="activeField = 'date'"
                        :class="{ focused: activeField === 'date' }">
                        <span class="search-label">Fecha</span>
                        <span class="search-value">¿Cuándo vuelas?</span>
                    </div>
                    <div class="search-field" @click="activeField = 'pax'" :class="{ focused: activeField === 'pax' }">
                        <span class="search-label">Pasajeros</span>
                        <span class="search-value">{{ passengerLabel }}</span>
                        <div class="field-dropdown pax-dropdown" v-if="activeField === 'pax'">
                            <div class="pax-row">
                                <span>Adultos</span>
                                <div class="pax-counter">
                                    <button @click.stop="passengers > 1 && passengers--">−</button>
                                    <span>{{ passengers }}</span>
                                    <button @click.stop="passengers < 9 && passengers++">+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <router-link to="/registro" class="btn-search" @click="activeField = null">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16"
                            height="16" aria-hidden="true">
                            <circle cx="11" cy="11" r="8" />
                            <path d="m21 21-4.35-4.35" />
                        </svg>
                        Buscar vuelos
                    </router-link>
                </div>
            </div>
        </section>

        <!-- Stats -->
        <section class="stats animate-fade-up" style="--delay: 0.5s">
            <div class="container stats-grid">
                <div class="stat-item" v-for="stat in stats" :key="stat.label">
                    <span class="stat-number">{{ stat.value }}</span>
                    <span class="stat-label">{{ stat.label }}</span>
                </div>
            </div>
        </section>

        <!-- Promociones -->
        <section class="promos">
            <div class="container">
                <h2 class="section-title animate-fade-up">Ofertas Especiales</h2>
                <div class="promos-grid">
                    <div class="promo-card animate-fade-up" v-for="(promo, i) in promos" :key="promo.title"
                        :style="`--delay: ${0.1 * i}s`">
                        <div class="promo-badge">{{ promo.badge }}</div>
                        <div class="promo-icon" aria-hidden="true" v-html="promo.svg"></div>
                        <div class="promo-info">
                            <span class="promo-route">{{ promo.route }}</span>
                            <span class="promo-price">{{ promo.price }}</span>
                        </div>
                        <div class="promo-countdown">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="12"
                                height="12" aria-hidden="true">
                                <circle cx="12" cy="12" r="9" />
                                <path d="M12 7v5l3 3" />
                            </svg>
                            Termina en {{ promo.ends }}
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Features -->
        <section class="features">
            <div class="container">
                <h2 class="section-title animate-fade-up">¿Por qué elegir Quetzal?</h2>
                <div class="features-grid">
                    <div class="feature-card animate-fade-up" v-for="(feature, i) in features" :key="feature.title"
                        :style="`--delay: ${0.1 * i}s`">
                        <div class="feature-icon" :aria-label="feature.ariaLabel" role="img" v-html="feature.svg"></div>
                        <h3 class="feature-title">{{ feature.title }}</h3>
                        <p class="feature-desc">{{ feature.desc }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Destinos -->
        <section class="destinations">
            <div class="container">
                <h2 class="section-title animate-fade-up">Destinos Populares</h2>
                <div class="destinations-grid">
                    <div class="destination-card animate-fade-up" v-for="(dest, i) in destinations" :key="dest.city"
                        :style="`--delay: ${0.08 * i}s`">
                        <div class="dest-icon" aria-hidden="true" v-html="dest.svg"></div>
                        <div class="dest-info">
                            <span class="dest-city">{{ dest.city }}</span>
                            <span class="dest-price">Desde {{ dest.price }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA -->
        <section class="cta-banner">
            <div class="container cta-inner animate-fade-up">
                <div class="cta-text">
                    <h2>¿Listo para despegar?</h2>
                    <p>Crea tu cuenta gratis y reserva en minutos</p>
                </div>
                <router-link to="/registro" class="btn btn-primary btn-lg">
                    Empezar ahora
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"
                        aria-hidden="true">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </router-link>
            </div>
        </section>

        <!-- Footer -->
        <footer class="footer">
            <div class="container footer-inner">
                <span class="footer-brand">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" width="18" height="18"
                        aria-hidden="true">
                        <path d="M22 16.5H2l4-9h12l4 9z" />
                        <path d="M6 16.5l1.5 3h9l1.5-3" />
                        <path d="M12 7.5V4m0 0l-2 2m2-2l2 2" />
                    </svg>
                    Quetzal
                </span>
                <span class="footer-copy">© {{ currentYear }} Quetzal — Todos los derechos reservados</span>
            </div>
        </footer>

        <!-- Overlay para cerrar dropdowns -->
        <div v-if="activeField" class="overlay" @click="activeField = null"></div>

    </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
const tripType = ref('roundtrip')
const activeField = ref(null)
const passengers = ref(1)
const isScrolled = ref(false)

const passengerLabel = computed(() =>
    passengers.value === 1 ? '1 Adulto' : `${passengers.value} Adultos`
)

const popularCities = ['Ciudad de México', 'Cancún', 'Guadalajara', 'Monterrey', 'Los Cabos', 'Oaxaca']

const handleScroll = () => { isScrolled.value = window.scrollY > 20 }
onMounted(() => window.addEventListener('scroll', handleScroll))
onUnmounted(() => window.removeEventListener('scroll', handleScroll))

const stats = [
    { value: '10,000+', label: 'Vuelos reservados' },
    { value: '50+', label: 'Destinos disponibles' },
    { value: '99%', label: 'Satisfacción' },
    { value: '3 min', label: 'Reserva promedio' },
]

const promos = [
    {
        badge: '−30%',
        route: 'CDMX → Cancún',
        price: '$899',
        ends: '2d 14h',
        svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="28" height="28"><path d="M12 2a7 7 0 0 1 7 7c0 4-7 13-7 13S5 13 5 9a7 7 0 0 1 7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>`
    },
    {
        badge: '−25%',
        route: 'Monterrey → CDMX',
        price: '$699',
        ends: '1d 6h',
        svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="28" height="28"><path d="M3 17 8 8l4 6 3-4 4 7H3z"/><path d="M3 21h18"/></svg>`
    },
    {
        badge: '−20%',
        route: 'GDL → Los Cabos',
        price: '$1,199',
        ends: '3d 8h',
        svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="28" height="28"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>`
    },
]

const features = [
    {
        ariaLabel: 'Avión en vuelo',
        title: 'Vuelos Disponibles',
        desc: 'Encuentra el vuelo perfecto para cualquier destino nacional e internacional',
        svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="40" height="40"><path d="M22 2L11 13"/><path d="M22 2L15 22l-4-9-9-4 20-7z"/></svg>`
    },
    {
        ariaLabel: 'Escudo de seguridad',
        title: '100% Seguro',
        desc: 'Tus datos y reservas están protegidos con cifrado de nivel bancario',
        svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="40" height="40"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>`
    },
    {
        ariaLabel: 'Asiento de avión',
        title: 'Elige tu Asiento',
        desc: 'Selecciona la clase y el asiento exacto que prefieras antes de volar',
        svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="40" height="40"><path d="M5 10v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4"/><path d="M5 14v3h14v-3"/><path d="M8 10V6a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v4"/><path d="M8 20h8"/></svg>`
    },
    {
        ariaLabel: 'Reloj rápido',
        title: 'Reserva Rápida',
        desc: 'Confirma tu vuelo en menos de 3 minutos desde cualquier dispositivo',
        svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="40" height="40"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/><path d="M5.5 5.5 4 4"/><path d="m20 4-1.5 1.5"/></svg>`
    }
]

const destinations = [
    { city: 'Ciudad de México', price: '$899', svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="32" height="32"><path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M9 21v-6h6v6"/></svg>` },
    { city: 'Cancún', price: '$1,299', svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="32" height="32"><path d="M12 2a7 7 0 0 1 7 7c0 4-7 13-7 13S5 13 5 9a7 7 0 0 1 7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>` },
    { city: 'Guadalajara', price: '$749', svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="32" height="32"><path d="M3 21h18"/><path d="M5 21V7l7-4 7 4v14"/><path d="M9 21v-6h6v6"/><path d="M9 7h.01M15 7h.01"/></svg>` },
    { city: 'Monterrey', price: '$699', svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="32" height="32"><path d="M3 17 8 8l4 6 3-4 4 7H3z"/><path d="M3 21h18"/></svg>` },
    { city: 'Los Cabos', price: '$1,499', svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="32" height="32"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>` },
    { city: 'Oaxaca', price: '$950', svg: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="32" height="32"><path d="M12 2a7 7 0 0 1 7 7c0 4-7 13-7 13S5 13 5 9a7 7 0 0 1 7-7z"/><path d="M8.5 9a3.5 3.5 0 0 0 7 0"/></svg>` },
]
</script>

<style scoped>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

.landing {
    background-color: #0f0508;
    min-height: 100vh;
    font-family: 'Segoe UI', system-ui, sans-serif;
    color: #f0e8e0;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1.5rem;
}

/* Animaciones de entrada */
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
    opacity: 0;
    animation: fadeUp 0.6s ease forwards;
    animation-delay: var(--delay, 0s);
}

/* Navbar */
.navbar {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(15, 5, 8, 0.5);
    backdrop-filter: blur(14px);
    -webkit-backdrop-filter: blur(14px);
    border-bottom: 1px solid rgba(201, 168, 76, 0.0);
    padding: 1rem 0;
    transition: background 0.3s, border-color 0.3s;
}

.navbar.scrolled {
    background: rgba(15, 5, 8, 0.95);
    border-bottom-color: rgba(201, 168, 76, 0.15);
}

.nav-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.navbar-brand {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    text-decoration: none;
    color: #c9a84c;
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

.nav-actions {
    display: flex;
    gap: 0.75rem;
    align-items: center;
}

/* Botones */
.btn {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.6rem 1.25rem;
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.9rem;
    text-decoration: none;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
}

.btn-ghost {
    color: #b89a8a;
    background: transparent;
    border: 1px solid rgba(201, 168, 76, 0.3);
}

.btn-ghost:hover {
    color: #c9a84c;
    border-color: #c9a84c;
    background: rgba(201, 168, 76, 0.08);
}

.btn-primary {
    background: #c9a84c;
    color: #4a0a12;
    font-weight: 700;
}

.btn-primary:hover {
    background: #e8c96a;
    transform: translateY(-1px);
}

.btn-lg {
    padding: 0.85rem 2rem;
    font-size: 1rem;
}

/* Hero */
.hero {
    position: relative;
    padding: 5rem 0 4rem;
    overflow: hidden;
    background: linear-gradient(160deg, #241016 0%, #0f0508 60%);
}

.hero::before {
    content: '';
    position: absolute;
    top: -80px;
    right: -80px;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(107, 15, 26, 0.45) 0%, transparent 70%);
    pointer-events: none;
}

.hero::after {
    content: '';
    position: absolute;
    bottom: -60px;
    left: -60px;
    width: 400px;
    height: 400px;
    background: radial-gradient(circle, rgba(201, 168, 76, 0.1) 0%, transparent 70%);
    pointer-events: none;
}

.hero-bg-overlay {
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(90deg, transparent, transparent 80px, rgba(201, 168, 76, 0.025) 80px, rgba(201, 168, 76, 0.025) 81px);
    pointer-events: none;
}

.hero-content {
    position: relative;
    z-index: 1;
}

.hero-eyebrow {
    font-size: 0.82rem;
    font-weight: 600;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #c9a84c;
    margin-bottom: 1rem;
}

.hero-title {
    font-size: clamp(2.2rem, 5vw, 3.8rem);
    font-weight: 900;
    line-height: 1.1;
    color: #fff;
    margin-bottom: 1rem;
    letter-spacing: -1px;
}

.hero-highlight {
    color: #c9a84c;
    display: block;
}

.hero-subtitle {
    font-size: 1.1rem;
    color: #b89a8a;
    margin-bottom: 1.5rem;
}

/* Toggle */
.trip-toggle {
    display: inline-flex;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(201, 168, 76, 0.2);
    border-radius: 8px;
    padding: 4px;
    margin-bottom: 1rem;
    gap: 4px;
}

.toggle-btn {
    padding: 0.4rem 1.1rem;
    border-radius: 6px;
    border: none;
    background: transparent;
    color: #b89a8a;
    font-size: 0.85rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
}

.toggle-btn.active {
    background: #6b0f1a;
    color: #c9a84c;
    font-weight: 700;
}

/* Search Bar */
.search-bar {
    display: flex;
    align-items: stretch;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(201, 168, 76, 0.25);
    border-radius: 12px;
    overflow: visible;
    backdrop-filter: blur(8px);
    position: relative;
}

.search-field {
    display: flex;
    flex-direction: column;
    padding: 1rem 1.25rem;
    flex: 1;
    min-width: 120px;
    border-right: 1px solid rgba(201, 168, 76, 0.15);
    cursor: pointer;
    transition: background 0.2s;
    position: relative;
    border-radius: 0;
}

.search-field:first-child {
    border-radius: 12px 0 0 12px;
}

.search-field:hover,
.search-field.focused {
    background: rgba(201, 168, 76, 0.06);
}

.search-field.focused {
    border-bottom: 2px solid #c9a84c;
}

.search-label {
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    color: #c9a84c;
    margin-bottom: 0.3rem;
}

.search-value {
    font-size: 0.92rem;
    color: #f0e8e0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.field-dropdown {
    position: absolute;
    top: calc(100% + 8px);
    left: 0;
    min-width: 200px;
    background: #1a0c10;
    border: 1px solid rgba(201, 168, 76, 0.25);
    border-radius: 10px;
    padding: 6px;
    z-index: 200;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
}

.dropdown-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0.6rem 0.8rem;
    border-radius: 6px;
    font-size: 0.88rem;
    color: #f0e8e0;
    cursor: pointer;
    transition: background 0.15s;
}

.dropdown-item:hover {
    background: rgba(201, 168, 76, 0.1);
    color: #c9a84c;
}

.pax-dropdown {
    min-width: 180px;
}

.pax-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.6rem 0.8rem;
    font-size: 0.88rem;
    color: #f0e8e0;
}

.pax-counter {
    display: flex;
    align-items: center;
    gap: 12px;
}

.pax-counter button {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 1px solid rgba(201, 168, 76, 0.3);
    background: transparent;
    color: #c9a84c;
    font-size: 1.1rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.15s;
}

.pax-counter button:hover {
    background: rgba(201, 168, 76, 0.15);
}

.pax-counter span {
    font-weight: 700;
    color: #fff;
    min-width: 16px;
    text-align: center;
}

.search-divider {
    display: flex;
    align-items: center;
    padding: 0 0.6rem;
    color: #c9a84c;
    border-right: 1px solid rgba(201, 168, 76, 0.15);
}

.btn-search {
    background: #6b0f1a;
    color: #c9a84c;
    font-weight: 700;
    font-size: 0.92rem;
    white-space: nowrap;
    padding: 0.9rem 1.5rem;
    text-decoration: none;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border: none;
    cursor: pointer;
    transition: all 0.2s;
    border-radius: 0 12px 12px 0;
}

.btn-search:hover {
    background: #8c1424;
    color: #e8c96a;
}

/* Overlay */
.overlay {
    position: fixed;
    inset: 0;
    z-index: 99;
}

/* Stats */
.stats {
    background: #1a0c10;
    border-top: 1px solid rgba(201, 168, 76, 0.1);
    border-bottom: 1px solid rgba(201, 168, 76, 0.1);
    padding: 2rem 0;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 1rem;
    text-align: center;
}

.stat-item {
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
}

.stat-number {
    font-size: 2rem;
    font-weight: 900;
    color: #c9a84c;
    letter-spacing: -1px;
}

.stat-label {
    font-size: 0.82rem;
    color: #b89a8a;
    font-weight: 500;
}

/* Promociones */
.promos {
    padding: 5rem 0;
    background: #0f0508;
}

.promos-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1.25rem;
}

.promo-card {
    background: #1a0c10;
    border: 1px solid rgba(201, 168, 76, 0.15);
    border-radius: 12px;
    padding: 1.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    position: relative;
    transition: all 0.25s;
    opacity: 0;
    animation: fadeUp 0.6s ease forwards;
    animation-delay: var(--delay, 0s);
}

.promo-card:hover {
    border-color: rgba(201, 168, 76, 0.4);
    background: rgba(201, 168, 76, 0.05);
    transform: translateY(-3px);
}

.promo-badge {
    position: absolute;
    top: -10px;
    right: 16px;
    background: #6b0f1a;
    color: #c9a84c;
    font-size: 0.75rem;
    font-weight: 800;
    padding: 3px 10px;
    border-radius: 20px;
    border: 1px solid rgba(201, 168, 76, 0.3);
    letter-spacing: 0.5px;
}

.promo-icon {
    color: #c9a84c;
    flex-shrink: 0;
}

.promo-info {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    flex: 1;
}

.promo-route {
    font-size: 0.95rem;
    font-weight: 600;
    color: #f0e8e0;
}

.promo-price {
    font-size: 1.2rem;
    font-weight: 900;
    color: #c9a84c;
}

.promo-countdown {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 0.75rem;
    color: #b89a8a;
    margin-top: 0.3rem;
}

/* Features */
.features {
    padding: 5rem 0;
    background: #1a0c10;
    border-top: 1px solid rgba(201, 168, 76, 0.1);
    border-bottom: 1px solid rgba(201, 168, 76, 0.1);
}

.section-title {
    font-size: 1.8rem;
    font-weight: 800;
    color: #fff;
    margin-bottom: 2.5rem;
    text-align: center;
    letter-spacing: -0.5px;
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.25rem;
}

.feature-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(201, 168, 76, 0.15);
    border-radius: 12px;
    padding: 1.75rem;
    opacity: 0;
    animation: fadeUp 0.6s ease forwards;
    animation-delay: var(--delay, 0s);
    transition: transform 0.25s, border-color 0.25s, background 0.25s;
}

.feature-card:hover {
    transform: translateY(-4px);
    border-color: rgba(201, 168, 76, 0.4);
    background: rgba(201, 168, 76, 0.05);
}

.feature-icon {
    color: #c9a84c;
    margin-bottom: 1rem;
    display: block;
}

.feature-title {
    font-size: 1.05rem;
    font-weight: 700;
    color: #fff;
    margin-bottom: 0.5rem;
}

.feature-desc {
    font-size: 0.9rem;
    color: #b89a8a;
    line-height: 1.6;
}

/* Destinos */
.destinations {
    padding: 5rem 0;
    background: #0f0508;
}

.destinations-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 1rem;
}

.destination-card {
    background: #1a0c10;
    border: 1px solid rgba(201, 168, 76, 0.12);
    border-radius: 12px;
    padding: 1.25rem;
    display: flex;
    align-items: center;
    gap: 0.9rem;
    cursor: pointer;
    opacity: 0;
    animation: fadeUp 0.6s ease forwards;
    animation-delay: var(--delay, 0s);
    transition: all 0.2s;
}

.destination-card:hover {
    border-color: rgba(201, 168, 76, 0.35);
    background: rgba(201, 168, 76, 0.05);
    transform: translateY(-2px);
}

.dest-icon {
    color: #c9a84c;
    flex-shrink: 0;
}

.dest-info {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
}

.dest-city {
    font-size: 0.92rem;
    font-weight: 600;
    color: #f0e8e0;
}

.dest-price {
    font-size: 0.8rem;
    color: #c9a84c;
    font-weight: 500;
}

/* CTA */
.cta-banner {
    background: linear-gradient(135deg, #4a0a12 0%, #6b0f1a 100%);
    border-top: 1px solid rgba(201, 168, 76, 0.2);
    border-bottom: 1px solid rgba(201, 168, 76, 0.2);
    padding: 3.5rem 0;
}

.cta-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    flex-wrap: wrap;
}

.cta-text h2 {
    font-size: 1.6rem;
    font-weight: 800;
    color: #fff;
    margin-bottom: 0.4rem;
}

.cta-text p {
    color: rgba(255, 255, 255, 0.65);
    font-size: 1rem;
}

/* Footer */
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

/* Responsive */
@media (max-width: 768px) {
    .search-bar {
        flex-direction: column;
        border-radius: 12px;
        overflow: visible;
    }

    .search-field {
        border-right: none;
        border-bottom: 1px solid rgba(201, 168, 76, 0.15);
        border-radius: 0;
    }

    .search-field:first-child {
        border-radius: 12px 12px 0 0;
    }

    .search-divider {
        display: none;
    }

    .btn-search {
        justify-content: center;
        padding: 1rem;
        border-radius: 0 0 12px 12px;
    }

    .cta-inner {
        flex-direction: column;
        text-align: center;
    }

    .nav-actions .btn-ghost {
        display: none;
    }

    .stats-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}
</style>
