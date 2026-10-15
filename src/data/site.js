export const site = {
  name: "Brote",
  title: "Brote | Agencia digital para el campo mexicano",
  description:
    "Brote es la agencia digital del sector agrícola de México: estrategia comercial, datos, marketing y presencia digital para las empresas que venden al campo.",
  email: "hola@broteag.mx",
  url: "https://broteag.web.app",
  social: {
    facebook: "https://www.facebook.com/broteagro",
  },
};

export const routes = {
  home: "/",
  productores: "/productores-agricolas/",
  noticias: "/noticias-y-recursos/",
  brtx: "/brtx-soluciones/",
  diseno: "/diseno-comercial-e-integracion/",
  datos: "/servicios-de-datos/",
  omnicanal: "/demanda-omnicanal/",
  analitica: "/analitica-de-marketing/",
  acerca: "/acerca-de-nosotros/",
  enfoque: "/nuestro-enfoque/",
  equipo: "/nuestro-equipo/",
  carreras: "/carreras/",
  contacto: "/contacto/",
  marca: "/marca-y-contenido/",
  sitios: "/sitios-y-plataformas/",
  privacidad: "/aviso-de-privacidad/",
};

// Menús del sitio
export const topMenu = [
  { id: 3875, label: "Productores y canal", href: routes.productores },
  { id: 3876, label: "Noticias y recursos", href: routes.noticias },
];

export const mainMenu = [
  {
    id: 46,
    label: "Qué hacemos",
    children: [
      { id: 3635, label: "Método BrtX™", href: routes.brtx },
      { id: 3634, label: "Diseño comercial e integración", href: routes.diseno },
      { id: 3633, label: "Habilitación de datos", href: routes.datos },
      { id: 3655, label: "Demanda omnicanal", href: routes.omnicanal },
      { id: 3632, label: "Analítica de marketing", href: routes.analitica },
      { id: 3700, label: "Marca y contenido", href: routes.marca },
      { id: 3701, label: "Sitios y plataformas", href: routes.sitios },
    ],
  },
  {
    id: 47,
    label: "Quiénes somos",
    children: [
      { id: 3631, label: "Acerca de nosotros", href: routes.acerca },
      { id: 3769, label: "Nuestro enfoque", href: routes.enfoque },
      { id: 3630, label: "Nuestro equipo", href: routes.equipo },
      { id: 4557, label: "Carreras", href: routes.carreras },
    ],
  },
  { id: 4897, label: "Contáctanos", href: routes.contacto },
];

export const footerWhatWeDo = [
  { label: "Método BrtX™", href: routes.brtx },
  { label: "Diseño comercial e integración", href: routes.diseno },
  { label: "Analítica de marketing", href: routes.analitica },
  { label: "Habilitación de datos", href: routes.datos },
  { label: "Demanda omnicanal", href: routes.omnicanal },
  { label: "Marca y contenido", href: routes.marca },
  { label: "Sitios y plataformas", href: routes.sitios },
];

export const footerSitemap = [
  { label: "Productores y canal", href: routes.productores },
  { label: "Noticias y recursos", href: routes.noticias },
  { label: "Carreras", href: routes.carreras },
  { label: "Contáctanos", href: routes.contacto },
];

// Servicios de Brote: los 4 de BrtX™ y 2 de base digital (ver guía de marca, sección Servicios)
export const services = [
  {
    key: "diseno",
    href: routes.diseno,
    icon: "/assets/img/icons/diseno.svg",
    title: "Diseño comercial e integración",
    group: "BrtX™",
    summary:
      "Alineamos procesos, roles y métricas de ventas y marketing para que todo el equipo ejecute la misma estrategia.",
  },
  {
    key: "analitica",
    href: routes.analitica,
    icon: "/assets/img/icons/analitica.svg",
    title: "Analítica de marketing",
    group: "BrtX™",
    summary:
      "Medimos lo que realmente mueve la aguja en el campo y convertimos los datos en decisiones de mercado claras.",
  },
  {
    key: "datos",
    href: routes.datos,
    icon: "/assets/img/icons/datos.svg",
    title: "Habilitación de datos",
    group: "BrtX™",
    summary:
      "Ordenamos, limpiamos y conectamos tus datos de clientes y distribuidores para que sean un activo de la organización.",
  },
  {
    key: "omnicanal",
    href: routes.omnicanal,
    icon: "/assets/img/icons/omnicanal.svg",
    title: "Creación de demanda omnicanal",
    group: "BrtX™",
    summary:
      "Diseñamos y operamos campañas en campo, digitales y por teléfono que generan demanda real entre productores.",
  },
  {
    key: "marca",
    href: routes.marca,
    icon: "/assets/img/icons/marca.svg",
    title: "Marca y contenido",
    group: "Base digital",
    summary:
      "Identidad, fotografía y video de campo, redes sociales, catálogos y fichas técnicas que hablan el idioma del productor.",
  },
  {
    key: "sitios",
    href: routes.sitios,
    icon: "/assets/img/icons/sitios.svg",
    title: "Sitios y plataformas",
    group: "Base digital",
    summary:
      "Sitios web, landing pages de campaña, portales para distribuidores y catálogos digitales rápidos y medibles.",
  },
];
