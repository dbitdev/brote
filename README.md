# Brote

Sitio de Brote, agencia digital para el sector agrícola de México. Hecho con [Astro](https://astro.build) y desplegado en Firebase Hosting (`broteag.web.app`, proyecto The Parra Company).

## Uso

Usa solo **pnpm**.

```bash
pnpm install
pnpm dev       # servidor local
pnpm build     # genera dist/
pnpm deploy    # compila y publica en https://broteag.web.app
```

## Estructura

- `src/pages/` páginas del sitio (`[servicio].astro` genera las 6 páginas de servicio, `noticias/[slug].astro` los artículos).
- `src/components/` Header, Footer y secciones reutilizables.
- `src/data/` menú, servicios y artículos.
- `src/scripts/main.js` comportamiento del menú, slider y formularios.
- `public/assets/` CSS, imágenes y fotos.
- `identidad/` todos los elementos de la marca (logos, colores, tipografía, íconos, patrones y guía).
- `scripts/make-svgs.py` genera los SVG decorativos e íconos.

## Pendientes

- Conectar los formularios (contacto y newsletter) a un servicio de envío.
- Reemplazar el equipo de relleno en `src/pages/nuestro-equipo.astro`.
- Fotos pendientes de generar.
