import $ from "jquery";
import "slick-carousel";
import UIkit from "uikit";

window.jQuery = window.$ = $;
window.UIkit = UIkit;

const $win = $(window);
const isDesktop = () => $win.width() >= 1024;

if (/Mobi/.test(navigator.userAgent)) $("body").addClass("mobile");

// Slider del hero
$(".hero-slider").slick({
  autoplay: true,
  autoplaySpeed: 6000,
  fade: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  infinite: true,
  arrows: false,
  dots: true,
});

// ---------- Menú ----------
const $header = $("#header");
const $body = $("body");
const startsDark = !$header.hasClass("light");
const SCROLL_THEME = 50; // a partir de aquí el header lleva fondo blanco
const HIDE_AFTER = 250; // al bajar más de esto, el header se oculta
let lastY = window.scrollY;
const settleUntil = performance.now() + 800;

// El color del header depende solo de la posición: así es correcto aunque la
// página cargue desplazada (recarga, ancla, botón atrás).
function setHeaderTheme(y) {
  const dark = startsDark || y >= SCROLL_THEME;
  $header.toggleClass("dark", dark).toggleClass("light", !dark);
}

function isMenuOpen() {
  return $(".navigation-wrapper").hasClass("active") || $(".search-form-header").hasClass("active") || $header.hasClass("active");
}

function onScroll() {
  const y = window.scrollY;
  $body.toggleClass("scroll", y > 40);
  setHeaderTheme(y);
  // El salto inicial a un ancla o la restauración del scroll no oculta el header
  if (!isMenuOpen() && performance.now() > settleUntil) {
    if (y > lastY && y > HIDE_AFTER) $header.removeClass("show");
    else if (y < lastY || y <= HIDE_AFTER) $header.addClass("show");
  }
  lastY = y;
}
const syncHeader = () => {
  $body.toggleClass("scroll", window.scrollY > 40);
  setHeaderTheme(window.scrollY);
  lastY = window.scrollY;
};
syncHeader();
$header.addClass("show");
$win.on("scroll", onScroll);
// El navegador puede saltar a un ancla o restaurar el scroll sin avisar con un evento
$win.on("load pageshow hashchange", syncHeader);
requestAnimationFrame(syncHeader);
setTimeout(syncHeader, 300);

// Submenús en móvil: se abren al tocar (se decide en el momento, no al cargar)
$("nav li.menu-item-has-children > a").on("click", function (e) {
  if (isDesktop()) return;
  e.preventDefault();
  $(this).parent().toggleClass("open").find(".sub-menu").toggleClass("open");
});

// Menú móvil
$("#mobile-menu").on("click", function () {
  const open = !$(".navigation-wrapper").hasClass("active");
  $(".navigation-wrapper").toggleClass("active", open);
  $(this).toggleClass("active", open).attr("aria-expanded", open);
  $("#header .logo-wrap").toggleClass("active", open);
  $header.toggleClass("fixed", open).addClass("show");
  $body.css("overflow", open ? "hidden" : "");
});
// Al elegir un enlace del menú móvil se cierra
$(".navigation-wrapper a[href]:not([href='#'])").on("click", () => {
  if ($(".navigation-wrapper").hasClass("active")) $("#mobile-menu").trigger("click");
});

// Búsqueda
function openSearch(open) {
  $(".search-form-header, .blur-background").toggleClass("active", open);
  $header.toggleClass("active", open && $header.hasClass("dark"));
  if (open) setTimeout(() => $(".search-form-header .search-field").trigger("focus"), 50);
}
$("#top_menu-nav .search-navigation a").on("click", (e) => {
  e.preventDefault();
  openSearch(!$(".search-form-header").hasClass("active"));
});
$(".search-form-header .close-search, .blur-background").on("click", (e) => {
  e.preventDefault();
  openSearch(false);
});
$(document).on("keydown", (e) => {
  if (e.key !== "Escape") return;
  openSearch(false);
  closeDropdown(true);
});

// Dropdown de escritorio: mouseenter/mouseleave (no se disparan al pasar entre
// elementos hijos) y un pequeño margen antes de cerrar para que no parpadee.
let closeTimer;
function openDropdown() {
  if (!isDesktop()) return;
  clearTimeout(closeTimer);
  if ($header.hasClass("dark")) $header.addClass("active");
  $(".blur-background").addClass("active");
}
function closeDropdown(now) {
  clearTimeout(closeTimer);
  const close = () => {
    $("#main-nav__menu li.menu-item-has-children").removeClass("hover");
    if (!$(".search-form-header").hasClass("active")) {
      $header.removeClass("active");
      $(".blur-background").removeClass("active");
    }
  };
  now ? close() : (closeTimer = setTimeout(close, 150));
}
$("#main-nav__menu > li.menu-item-has-children")
  .on("mouseenter", function () {
    $(this).addClass("hover").siblings().removeClass("hover");
    openDropdown();
  })
  .on("mouseleave", function () {
    $(this).removeClass("hover");
    closeDropdown();
  })
  // Teclado: el submenú se abre al enfocar y se cierra al salir
  .on("focusin", function () {
    $(this).addClass("hover");
    openDropdown();
  })
  .on("focusout", function (e) {
    if (!this.contains(e.relatedTarget)) {
      $(this).removeClass("hover");
      closeDropdown();
    }
  });

// Jump links con scroll suave
$('.jump-links a[href^="#"], .jump-link-mobile .uk-accordion-content a[href^="#"], .jobs-ctas > a[href^="#"]').on(
  "click",
  function (e) {
    const target = $($(this).attr("href"));
    if (!target.length) return;
    e.preventDefault();
    $("html, body").animate({ scrollTop: target.offset().top }, 500);
  }
);

// Filtro de noticias
$(".posts-filter-button").on("click", function (e) {
  e.preventDefault();
  $(this).toggleClass("open");
  $(".news-filter").toggleClass("active");
});
$(".news-filter li").on("click", function () {
  const filter = $(this).data("filter");
  $(".news-filter li").removeClass("active");
  $(this).addClass("active");
  $(".news-resources-post").each(function () {
    $(this).toggle(filter === "*" || $(this).is(filter));
  });
});

// Barra de progreso de lectura en artículos
const panel = document.querySelector(".progressPanel");
if (panel) {
  const container = document.querySelector(".progressPanelContainer");
  const bar = panel.querySelector(".progress");
  const target = document.querySelector(".blog .content");
  const update = () => {
    const top = container.getBoundingClientRect().top + window.scrollY;
    const rect = target.getBoundingClientRect();
    const start = rect.top + window.scrollY;
    const pct = Math.min(100, Math.max(0, ((window.scrollY - start) / (rect.height - window.innerHeight)) * 100));
    container.style.height = `${panel.offsetHeight}px`;
    bar.style.transform = `translate3d(${pct - 100}%, 0, 0)`;
    panel.classList.toggle("sticky", window.scrollY > top);
  };
  window.addEventListener("scroll", update, { passive: true });
  update();
}

// Compartir artículo
const share = (url) => window.open(url, "share", "height=480,width=660");
const here = () => encodeURIComponent(location.href.split("#")[0]);
const title = () => encodeURIComponent(document.title);
$(".facebook-share").on("click", (e) => (e.preventDefault(), share(`https://www.facebook.com/sharer/sharer.php?u=${here()}`)));
$(".twitter-share").on("click", (e) => (e.preventDefault(), share(`https://twitter.com/intent/tweet?text=${title()}&url=${here()}`)));
$(".linkedin-share").on("click", (e) => (e.preventDefault(), share(`https://www.linkedin.com/sharing/share-offsite/?url=${here()}`)));

// Formularios: sin backend todavía, solo confirmación local
$("form.brote-form").on("submit", function (e) {
  e.preventDefault();
  if (!this.checkValidity()) {
    this.reportValidity();
    return;
  }
  $(this).find(".wpcf7-response-output").text("¡Gracias! Recibimos tu mensaje.").attr("aria-hidden", "false").show();
  this.reset();
});
