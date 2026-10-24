# ZYRVAE — Digital Studio (Official Website)

Sitio web oficial, responsive, bilingüe (ES / EN) y de alto rendimiento técnico para **ZYRVAE Digital Studio**, un estudio digital independiente orientado al diseño y desarrollo web para marcas que buscan diferenciarse, comunicar su valor y generar oportunidades comerciales.

---

## 01. Arquitectura y Tecnologías Seleccionadas

* **Framework:** Next.js 16 (App Router con Turbopack y SSR/SSG híbrido).
* **Lenguaje:** TypeScript 5 (tipado estricto en datos de proyectos, traducciones y componentes).
* **Estilos:** Tailwind CSS v4 con variables y tokens de diseño personalizados (paleta oscura grafito, acento azul eléctrico controlado `#0a5cff`, contrastes sobrios).
* **Tipografía:** Sistema técnico-editorial basado en Geist Sans (titulares contemporáneos y lectura) y Geist Mono (metadatos, coordenadas, números y detalles técnicos).
* **Animaciones e Interacción:** `motion` (Framer Motion para React 19) para la secuencia de ensamblaje del símbolo, revelado tipográfico, filtros de galería y microinteracciones.
* **Iconografía:** `lucide-react` para controles minimalistas y limpios.
* **Testing:** Suite automatizada con Node.js Test Runner y TypeScript (`tsx`) para validación de datos bilingües, integridad de assets SVG y validación de la API de contacto.

---

## 02. Secciones y Funcionalidades Implementadas

1. **Header Adaptativo:**
   * Compactación y ocultamiento inteligente al desplazarse hacia abajo con umbral de histéresis (previene parpadeos).
   * Reaparición suave al desplazarse hacia arriba.
   * Navegación completa por teclado con enlace accesible de salto al contenido principal (*Skip to main content*).
   * Selector bilingüe manual ES / EN con persistencia en `localStorage`.
   * Menú móvil accesible con bloqueo de scroll de fondo exclusivamente cuando está abierto y soporte para tecla `Esc`.
   * Acceso directo visible a *"Iniciar un proyecto / Start a project"*.

2. **Hero:**
   * Animación inicial cinemática: ensamblaje geométrico del símbolo ZYRVAE + aparición del wordmark + transición al hero (se ejecuta 1 vez por sesión o se omite con `prefers-reduced-motion` y tecla `Esc`).
   * Titular monumental: *"Digital, con intención."* / *"Digital, with intention."*.
   * Copia de apoyo editorial y llamadas a la acción primaria y secundaria.
   * Símbolo geométrico abstracto en vector SVG de alta precisión.

3. **Portfolio & Selected Work:**
   * Tres proyectos conceptuales honestamente declarados:
     * **AURA Sanctuary** (Hospitalidad / Alojamiento Boutique).
     * **KÔN Atelier** (Gastronomía / Atelier Culinario & Cocina de Estación).
     * **VECTRA Architects** (Arquitectura / Práctica Espacial & Monolito Urbano).
   * Filtros dinámicos operativos por categoría: *Todos*, *Hospitalidad*, *Gastronomía*, *Arquitectura*.
   * Cursor contextual no intrusivo en tarjetas de proyectos (solo en dispositivos con puntero fino, sin suplantar el cursor global).
   * Sin testimonios, clientes, métricas o cifras inventadas.

4. **Casos de Estudio con Demos Interactivas Funcionales:**
   * Rutas estáticas dedicadas para cada caso (`/case-study/[slug]`).
   * Desglose editorial completo: objetivo, contexto, decisiones visuales, interacciones, funcionalidades y beneficios comerciales hipotéticos claramente identificados.
   * **Demos funcionales en vivo:**
     * *AURA Sanctuary:* Inspector interactivo de suites, plano de planta, selector de noches/huéspedes y simulador de solicitud de reserva con aviso explícito de demostración.
     * *KÔN Atelier:* Alternador de menú degustación (7 vs. 11 pasos), interruptor de maridaje de autor y simulador de reserva de mesa.
     * *VECTRA Architects:* Visor interactivo de axonometría 3D, corte transversal este-oeste, matriz de materiales (hormigón, acero patinado, vidrio acústico) y generador de ficha técnica de demostración.

5. **Servicios & Capacidades:**
   * Índice editorial numerado (01 a 05) con líneas divisorias, etiquetas técnicas y microinteracciones de contraste:
     * `01 — Diseño Web & Dirección de Arte`
     * `02 — Desarrollo Web & Ingeniería Frontend`
     * `03 — Experiencias Digitales Personalizadas`
     * `04 — Integración & Optimización Técnica`
     * `05 — Mantenimiento & Soporte Continuo`

6. **Approach / Process:**
   * Línea de tiempo editorial vertical con 5 etapas:
     * `01 — Discovery & Diagnóstico`
     * `02 — Dirección & Estructura`
     * `03 — Diseño & Construcción`
     * `04 — Revisión & Refinamiento`
     * `05 — Lanzamiento & Soporte`
   * Indicación explícita de objetivos, trabajo ejecutado y entregables por etapa.

7. **Studio:**
   * Posicionamiento independiente internacional: *"Independientes por diseño. Con una mirada internacional."* / *"Independent by design. International in outlook."*.
   * Comunicación honesta sin fingir estructuras empresariales infladas.
   * Tres principios fundamentales de ZYRVAE: Diseño con intención, Precisión técnica y Comunicación directa.

8. **FAQ:**
   * Acordeón accesible por teclado con atributos WAI-ARIA (`aria-expanded`, `aria-controls`).
   * 8 preguntas y respuestas transparentes sobre alcance, presupuestos personalizados, clientes internacionales y soporte.

9. **Formulario Progresivo & Adaptativo (Start a Project):**
   * Estructura en 4 etapas:
     * *Etapa 1:* Información esencial (Nombre, Email, Marca, País).
     * *Etapa 2:* Proyecto (Tipo, Objetivo, Público, Funcionalidades adaptativas dinámicas, Descripción, Referencias).
     * *Etapa 3:* Alcance y presupuesto (Rango de inversión, Plazo deseado, Notas).
     * *Etapa 4:* Revisión completa de datos con botones de edición rápida antes de enviar.
   * Validación en tiempo real de campos obligatorios y formato de email con preservación del estado entre etapas.
   * Protección contra spam mediante trampa honeypot.
   * Envío real a través del endpoint `/api/contact` preparado para despacho a `zyrvae.co@gmail.com`.
   * En caso de requerir configuración de clave de servidor (`RESEND_API_KEY`), el formulario no miente: preserva intactos todos los datos ingresados y ofrece botón para copiar el brief completo y enlace directo con cuerpo precompletado hacia `zyrvae.co@gmail.com`.

10. **Footer & Cierre:**
    * Declaración final de cierre: *"¿Tenés un proyecto en mente? Hablemos."* / *"Have a project in mind? Let's talk."*.
    * Enlaces de navegación, selector de idioma, contacto visible `zyrvae.co@gmail.com` y copyright con año dinámico.

---

## 03. Rutas Disponibles

* `/` — Experiencia continua vertical (Hero, Portfolio, Servicios, Proceso, Estudio, FAQ, Formulario).
* `/case-study/aura-sanctuary` — Caso de estudio y demo interactiva de hospitalidad boutique.
* `/case-study/kon-atelier` — Caso de estudio y demo interactiva de gastronomía y atelier culinario.
* `/case-study/vectra-architects` — Caso de estudio y demo interactiva de arquitectura espacial.
* `/api/contact` — Endpoint POST para validación y despacho del formulario.
* `/sitemap.xml` — Mapa de sitio XML autogenerado con indexación canónica.
* `/robots.txt` — Reglas de rastreo para motores de búsqueda.

---

## 04. Verificación y Calidad Técnica

El proyecto cuenta con una suite de pruebas automatizadas que se ejecutan con:

```bash
npm test
```

### Resultados de la Verificación:
* **Integridad de Assets:** 9 archivos SVG vectoriales de alta resolución verificados en `public/images/`.
* **Honestidad del Portfolio:** Los 3 proyectos verificados como `isConcept: true`.
* **Paridad de Traducciones:** 100% de coincidencia de claves entre español e inglés.
* **Seguridad de la API de Contacto:**
  * Detección y rechazo de spam (honeypot): Código `400 SPAM_DETECTED`.
  * Rechazo de campos faltantes: Código `422 MISSING_REQUIRED_FIELDS`.
  * Rechazo de emails inválidos: Código `422 INVALID_EMAIL`.
  * Manejo honesto sin simulación falsa cuando falta clave externa: Código `503 CONFIG_PENDING`.
* **Accesibilidad:** Enfoque visible con anillo azul eléctrico, skip link, compatibilidad con `prefers-reduced-motion` y navegación por teclado en menús, filtros, acordeones y formularios.
* **Compilación de Producción:** `next build` genera 12 páginas estáticas y rutas dinámicas con cero errores.

---

## 05. Variables de Entorno y Configuración Externa

Para activar el envío de correos directos desde el servidor a `zyrvae.co@gmail.com` a través del proveedor [Resend](https://resend.com), configure el archivo `.env.local` basado en `.env.example`:

```env
# Clave API de Resend
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx

# Remitente verificado (opcional, por defecto utiliza el sandbox de onboarding)
EMAIL_FROM="ZYRVAE Inquiries <onboarding@resend.dev>"

# Correo de destino para notificaciones (por defecto: zyrvae.co@gmail.com)
CONTACT_NOTIFICATION_EMAIL="zyrvae.co@gmail.com"
```

*Nota:* Si no se define `RESEND_API_KEY`, el formulario mantendrá la validación completa en el servidor y guiará al cliente con alternativas directas de envío a `zyrvae.co@gmail.com` sin perder ningún dato.

---

## 06. Instrucciones de Ejecución

```bash
# Instalar dependencias
npm install

# Ejecutar pruebas automatizadas
npm test

# Ejecutar en modo desarrollo
npm run dev

# Compilar para producción
npm run build

# Iniciar servidor de producción
npm start
```

---

## 07. Estado de Publicación

* **Código fuente:** Completo, optimizado y libre de errores.
* **Build de producción:** Verificado exitosamente con Next.js 16 (Turbopack).
* **Despliegue externo:** Listo para conectar con Vercel, Netlify o cualquier host compatible con Next.js tan pronto como el usuario decida vincular su dominio oficial.
