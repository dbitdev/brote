// Artículos de Noticias y Recursos. Para agregar uno nuevo basta con sumar un objeto aquí.
export const articles = [
  {
    slug: "la-ejecucion-como-ventaja-competitiva",
    title: "La ejecución como ventaja competitiva",
    excerpt:
      "Por qué las empresas agrícolas que ejecutan mejor, y no solo las que planean mejor, son las que ganan participación de mercado.",
    image: "/assets/photos/hero-soya.jpg",
    category: "Noticias",
    filter: "noticias",
    date: "2026-09-02",
    body: `
<h4>Casi todas las empresas del sector tienen un buen plan comercial. Muy pocas logran que ese plan llegue intacto hasta el productor.</h4>
<p>Entre la sala de juntas y la parcela hay muchos relevos: gerentes regionales, representantes de ventas, distribuidores, técnicos de campo. En cada relevo se pierde un poco de la intención original. Al final, el productor recibe un mensaje distinto al que se diseñó, en un momento que no es el adecuado y por un canal que no prefiere.</p>
<p>En Brote Ag llamamos a eso la <strong>brecha de ejecución</strong>, y es la razón más común por la que una buena estrategia no se traduce en resultados.</p>
<h4>Tres señales de que tu estrategia no se está ejecutando</h4>
<ul>
<li>Cada región mide el éxito con indicadores distintos.</li>
<li>Los lanzamientos de producto tardan más de lo planeado en llegar al campo.</li>
<li>El equipo comercial no sabe qué clientes atender primero.</li>
</ul>
<p>Cerrar esa brecha no requiere un plan nuevo. Requiere alinear procesos, roles y datos para que todos ejecuten el mismo plan, con la misma información, al mismo tiempo.</p>
<h4>Cómo lo abordamos</h4>
<p>Nuestras soluciones BrtX™ combinan diseño comercial, analítica, habilitación de datos y creación de demanda omnicanal. Empezamos por entender dónde se pierde la intención del plan y trabajamos con tu equipo hasta que la ejecución sea consistente en todas las regiones.</p>
`,
  },
  {
    slug: "datos-de-distribuidores-en-el-campo-mexicano",
    title: "Datos de distribuidores: el activo olvidado",
    excerpt:
      "Cómo ordenar la información de tu red de distribución para tomar mejores decisiones comerciales en el campo mexicano.",
    image: "/assets/photos/brtx-split.jpg",
    category: "Boletín",
    filter: "boletin",
    date: "2026-08-12",
    body: `
<h4>Tu red de distribución sabe más de tus clientes que tu CRM. El reto es convertir ese conocimiento en datos que se puedan usar.</h4>
<p>En México, una gran parte de las ventas de insumos agrícolas pasa por distribuidores y agrotiendas. Cada uno registra sus ventas a su manera: hojas de cálculo, sistemas propios o incluso libretas. El resultado es que el fabricante ve sus ventas a distribuidor, pero no sabe qué productor compró, en qué cultivo ni en qué región.</p>
<h4>Por dónde empezar</h4>
<ul>
<li><strong>Acordar un formato mínimo</strong> de reporte con los distribuidores clave.</li>
<li><strong>Normalizar</strong> nombres de productos, clientes y ubicaciones.</li>
<li><strong>Conectar</strong> la información con tus datos de mercadeo y ventas.</li>
</ul>
<p>Con datos ordenados es posible segmentar productores, medir el resultado real de cada campaña y asignar mejor los recursos del equipo de campo.</p>
<p>Nuestro servicio de habilitación de datos acompaña a fabricantes y distribuidores en este proceso, desde la limpieza inicial hasta los tableros que usan los equipos comerciales cada semana.</p>
`,
  },
  {
    slug: "como-llegar-al-productor-en-todos-los-canales",
    title: "Cómo llegar al productor en todos los canales",
    excerpt:
      "El productor ya no decide solo en la parcela: también en WhatsApp, en el mostrador y en las demostraciones de campo.",
    image: "/assets/photos/art-omnicanal.jpg",
    category: "Boletín",
    filter: "boletin",
    date: "2026-07-21",
    body: `
<h4>La decisión de compra del productor se construye a lo largo de semanas y en muchos lugares distintos.</h4>
<p>Una visita del técnico, un mensaje de WhatsApp, la recomendación del mostrador y lo que vio en una demostración de campo pesan en la misma decisión. Si cada canal dice algo distinto, el mensaje se diluye.</p>
<h4>Principios que aplicamos</h4>
<ul>
<li>Un mismo mensaje central, adaptado a cada canal.</li>
<li>El momento correcto según el ciclo del cultivo.</li>
<li>Seguimiento medible de cada contacto con el productor.</li>
</ul>
<p>La creación de demanda omnicanal no se trata de estar en todos lados, sino de estar en los lugares correctos con coherencia.</p>
`,
  },
];

export const formatDate = (iso) =>
  new Date(iso + "T12:00:00").toLocaleDateString("es-MX", { day: "numeric", month: "long", year: "numeric" });
