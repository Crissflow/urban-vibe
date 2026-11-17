/**
 * Urban Vibe - JS principal
 * Menú responsivo · Modales · Filtros (categoría, color, talla, precio) · Carrito
 */
(function () {
  'use strict';

  /* ========== ESTADO ========== */
  let menuAbierto = false;
  let carrito = JSON.parse(localStorage.getItem('uv_carrito') || '[]');
  let favoritos = JSON.parse(localStorage.getItem('uv_favoritos') || '[]');

  const PRECIO_LIMITE = 200;
  const filtrosActivos = {
    categoria: 'todas',
    color: 'todos',
    talla: 'todas',
    precioMin: 0,
    precioMax: PRECIO_LIMITE,
    orden: 'default'
  };

  /* ========== REFS DOM ========== */
  const MENU_BOTON = document.querySelector('.menu-boton');
  const MENU = document.querySelector('.menu');
  const BODY = document.body;

  /* ========== MENÚ RESPONSIVO ========== */
  function toggleMenu() {
    menuAbierto = !menuAbierto;
    if (MENU) MENU.classList.toggle('menu-abierto', menuAbierto);
    if (MENU_BOTON) {
      MENU_BOTON.setAttribute('aria-expanded', menuAbierto ? 'true' : 'false');
      const icono = MENU_BOTON.querySelector('i');
      if (icono) icono.className = menuAbierto ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    }
  }
  function cerrarMenu() {
    if (menuAbierto) toggleMenu();
  }
  if (MENU_BOTON) MENU_BOTON.addEventListener('click', function (e) { e.preventDefault(); toggleMenu(); });
  if (MENU) MENU.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', cerrarMenu); });

  /* ========== CARRITO ========== */
  function guardarCarrito() {
    localStorage.setItem('uv_carrito', JSON.stringify(carrito));
    actualizarBadge();
  }

  function actualizarBadge() {
    const badge = document.getElementById('carrito-badge');
    if (!badge) return;
    const total = carrito.reduce(function (s, i) { return s + i.cantidad; }, 0);
    badge.textContent = total;
    badge.hidden = total === 0;
  }


  function guardarFavoritos() {
    localStorage.setItem('uv_favoritos', JSON.stringify(favoritos));
    actualizarBadgeFav();
  }
  function esFavorito(id) {
    return favoritos.indexOf(id) !== -1;
  }
  function toggleFavorito(id) {
    const i = favoritos.indexOf(id);
    if (i === -1) favoritos.push(id);
    else favoritos.splice(i, 1);
    guardarFavoritos();
    // Update hearts in DOM
    document.querySelectorAll('.btn-fav[data-id="' + id + '"]').forEach(function (b) {
      b.classList.toggle('activo', esFavorito(id));
      b.setAttribute('aria-pressed', esFavorito(id) ? 'true' : 'false');
      b.title = esFavorito(id) ? 'Quitar de favoritos' : 'Agregar a favoritos';
    });
  }
  function actualizarBadgeFav() {
    const badge = document.getElementById('fav-badge');
    if (!badge) return;
    if (favoritos.length > 0) {
      badge.hidden = false;
      badge.textContent = String(favoritos.length);
    } else {
      badge.hidden = true;
    }
  }

    function agregarAlCarrito(producto, talla) {
    const key = producto.id + '|' + (talla || 'Única');
    const existente = carrito.find(function (i) { return i.key === key; });
    if (existente) {
      existente.cantidad += 1;
    } else {
      carrito.push({
        key: key,
        id: producto.id,
        nombre: producto.nombre,
        precio: producto.precio,
        img: producto.img,
        talla: talla || 'Única',
        cantidad: 1
      });
    }
    guardarCarrito();
    alert('✓ "' + producto.nombre + '" agregado al carrito' + (talla && talla !== 'Única' ? ' (talla ' + talla + ')' : '') + '.');
  }

  function cambiarCantidad(key, delta) {
    const item = carrito.find(function (i) { return i.key === key; });
    if (!item) return;
    item.cantidad += delta;
    if (item.cantidad <= 0) {
      carrito = carrito.filter(function (i) { return i.key !== key; });
    }
    guardarCarrito();
    renderCarrito();
  }

  function eliminarItem(key) {
    carrito = carrito.filter(function (i) { return i.key !== key; });
    guardarCarrito();
    renderCarrito();
  }

  function totalCarrito() {
    return carrito.reduce(function (s, i) { return s + i.precio * i.cantidad; }, 0);
  }

  function renderCarrito() {
    const lista = document.getElementById('carrito-lista');
    const totalEl = document.getElementById('carrito-total');
    const vacio = document.getElementById('carrito-vacio');
    if (!lista) return;

    lista.innerHTML = '';
    if (carrito.length === 0) {
      if (vacio) vacio.hidden = false;
      if (totalEl) totalEl.textContent = 'S/ 0.00';
      return;
    }
    if (vacio) vacio.hidden = true;

    carrito.forEach(function (item) {
      const li = document.createElement('li');
      li.className = 'carrito-item';
      li.innerHTML =
        '<img src="' + item.img + '" alt="">' +
        '<div class="carrito-item-info">' +
          '<strong>' + item.nombre + '</strong>' +
          '<span>Talla: ' + item.talla + '</span>' +
          '<span class="precio">S/ ' + item.precio.toFixed(2) + '</span>' +
        '</div>' +
        '<div class="carrito-item-acciones">' +
          '<button type="button" class="btn-cant" data-key="' + item.key + '" data-delta="-1" aria-label="Menos">−</button>' +
          '<button type="button" class="editar-cantidad" data-key="' + item.key + '" aria-label="Editar cantidad de ' + item.nombre + '" title="Editar cantidad">' + item.cantidad + '</button>' +
          '<button type="button" class="btn-cant" data-key="' + item.key + '" data-delta="1" aria-label="Más">+</button>' +
          '<button type="button" class="btn-eliminar" data-key="' + item.key + '" aria-label="Eliminar"><i class="fa-solid fa-trash"></i></button>' +
        '</div>';
      lista.appendChild(li);
    });

    if (totalEl) totalEl.textContent = 'S/ ' + totalCarrito().toFixed(2);

    lista.querySelectorAll('.editar-cantidad').forEach(function (boton) {
      boton.addEventListener('click', function () {
        const item = carrito.find(function (fila) { return fila.key === boton.dataset.key; });
        const entrada = prompt('¿Cuántas unidades deseas? Ingresa un entero positivo.', String(item.cantidad));
        if (entrada === null) return;
        const cantidad = Number(entrada.trim());
        if (!/^[0-9]+$/.test(entrada.trim()) || !Number.isSafeInteger(cantidad) || cantidad < 1) {
          alert('Ingresa una cantidad entera mayor que cero.');
          return;
        }
        item.cantidad = cantidad;
        guardarCarrito();
        renderCarrito();
      });
    });

    lista.querySelectorAll('.btn-cant').forEach(function (btn) {
      btn.addEventListener('click', function () {
        cambiarCantidad(btn.dataset.key, parseInt(btn.dataset.delta, 10));
      });
    });
    lista.querySelectorAll('.btn-eliminar').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (confirm('¿Quitar este producto del carrito?')) eliminarItem(btn.dataset.key);
      });
    });
  }

  function abrirCarrito() {
    const drawer = document.getElementById('carrito-drawer');
    const overlay = document.getElementById('carrito-overlay');
    if (drawer) drawer.classList.add('activo');
    if (overlay) overlay.classList.add('activo');
    BODY.classList.add('carrito-abierto');
    renderCarrito();
  }
  function cerrarCarrito() {
    const drawer = document.getElementById('carrito-drawer');
    const overlay = document.getElementById('carrito-overlay');
    if (drawer) drawer.classList.remove('activo');
    if (overlay) overlay.classList.remove('activo');
    BODY.classList.remove('carrito-abierto');
  }

  const btnCarrito = document.getElementById('btn-carrito');
  if (btnCarrito) btnCarrito.addEventListener('click', abrirCarrito);
  const btnCerrarCarrito = document.getElementById('carrito-cerrar');
  if (btnCerrarCarrito) btnCerrarCarrito.addEventListener('click', cerrarCarrito);
  const carritoOverlay = document.getElementById('carrito-overlay');
  if (carritoOverlay) carritoOverlay.addEventListener('click', cerrarCarrito);

  const btnVaciar = document.getElementById('carrito-vaciar');
  if (btnVaciar) {
    btnVaciar.addEventListener('click', function () {
      if (carrito.length === 0) return;
      if (confirm('¿Vaciar todo el carrito?')) {
        carrito = [];
        guardarCarrito();
        renderCarrito();
      }
    });
  }

  const btnComprar = document.getElementById('carrito-comprar');
  if (btnComprar) {
    btnComprar.addEventListener('click', function () {
      if (carrito.length === 0) {
        alert('Tu carrito está vacío.');
        return;
      }
      const ok = confirm('Total a pagar: S/ ' + totalCarrito().toFixed(2) + '\n\n¿Confirmar pedido? (demo)');
      if (ok) {
        alert('¡Pedido registrado! Te contactaremos para coordinar el pago y envío.');
        carrito = [];
        guardarCarrito();
        renderCarrito();
        cerrarCarrito();
      }
    });
  }

  actualizarBadge();

  /* ========== MODAL PRODUCTO ========== */
  const MODAL_OVERLAY = document.getElementById('modal-overlay');
  const MODAL = document.getElementById('modal');
  const MODAL_TITULO = document.getElementById('modal-titulo');
  const MODAL_IMG = document.getElementById('modal-img');
  const MODAL_DESC = document.getElementById('modal-desc');
  const MODAL_PRECIO = document.getElementById('modal-precio');
  const MODAL_CERRAR = document.getElementById('modal-cerrar');
  const MODAL_TALLAS = document.getElementById('modal-tallas');
  const MODAL_AGREGAR = document.getElementById('modal-agregar');
  let productoModalActual = null;
  let tallaSeleccionada = null;

  function abrirModal(prod) {
    productoModalActual = prod;
    tallaSeleccionada = prod.tallas && prod.tallas.length === 1 ? prod.tallas[0] : null;
    if (MODAL_TITULO) MODAL_TITULO.textContent = prod.nombre;
    if (MODAL_DESC) MODAL_DESC.textContent = prod.desc;
    if (MODAL_PRECIO) MODAL_PRECIO.textContent = 'S/ ' + prod.precio.toFixed(2);
    if (MODAL_IMG) { MODAL_IMG.src = prod.img; MODAL_IMG.alt = prod.nombre; }

    if (MODAL_TALLAS) {
      MODAL_TALLAS.innerHTML = '';
      (prod.tallas || ['Única']).forEach(function (t) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'chip-talla' + (tallaSeleccionada === t ? ' activo' : '');
        btn.textContent = t;
        btn.addEventListener('click', function () {
          tallaSeleccionada = t;
          MODAL_TALLAS.querySelectorAll('.chip-talla').forEach(function (b) { b.classList.remove('activo'); });
          btn.classList.add('activo');
        });
        MODAL_TALLAS.appendChild(btn);
      });
    }

    if (MODAL_OVERLAY) MODAL_OVERLAY.classList.add('activo');
    if (MODAL) MODAL.classList.add('activo');
    BODY.classList.add('modal-abierto');
  }

  function cerrarModal() {
    if (MODAL_OVERLAY) MODAL_OVERLAY.classList.remove('activo');
    if (MODAL) MODAL.classList.remove('activo');
    BODY.classList.remove('modal-abierto');
    productoModalActual = null;
  }

  if (MODAL_OVERLAY) MODAL_OVERLAY.addEventListener('click', function (e) { if (e.target === MODAL_OVERLAY) cerrarModal(); });
  if (MODAL_CERRAR) MODAL_CERRAR.addEventListener('click', cerrarModal);
  if (MODAL_AGREGAR) {
    MODAL_AGREGAR.addEventListener('click', function () {
      if (!productoModalActual) return;
      if (!tallaSeleccionada && productoModalActual.tallas && productoModalActual.tallas.length > 1) {
        alert('Por favor elige una talla.');
        return;
      }
      agregarAlCarrito(productoModalActual, tallaSeleccionada || 'Única');
      cerrarModal();
    });
  }

  /* ========== RENDER PRODUCTOS + FILTROS ========== */
  function obtenerPaginaTipo() {
    const path = location.pathname.toLowerCase();
    if (path.indexOf('ropa-urbana') !== -1) return 'ropa';
    if (path.indexOf('accesorios') !== -1) return 'accesorios';
    return 'index';
  }

  function categoriasDePagina() {
    const tipo = obtenerPaginaTipo();
    if (tipo === 'ropa') return ['camisetas', 'poleras', 'pantalones'];
    if (tipo === 'accesorios') return ['gorras', 'mochilas', 'lentes'];
    return [];
  }

  function productosVisibles() {
    const cats = categoriasDePagina();
    if (typeof CATALOGO === 'undefined') return [];
    let lista = CATALOGO.filter(function (p) {
      if (cats.length && cats.indexOf(p.categoria) === -1) return false;
      if (filtrosActivos.categoria !== 'todas' && p.categoria !== filtrosActivos.categoria) return false;
      if (filtrosActivos.color !== 'todos' && p.color !== filtrosActivos.color) return false;
      if (filtrosActivos.talla !== 'todas' && (!p.tallas || p.tallas.indexOf(filtrosActivos.talla) === -1)) return false;
      if (p.precio < filtrosActivos.precioMin || p.precio > filtrosActivos.precioMax) return false;
      return true;
    });
    if (filtrosActivos.orden === 'precio-asc') lista.sort(function (a, b) { return a.precio - b.precio; });
    else if (filtrosActivos.orden === 'precio-desc') lista.sort(function (a, b) { return b.precio - a.precio; });
    else if (filtrosActivos.orden === 'nombre') lista.sort(function (a, b) { return a.nombre.localeCompare(b.nombre, 'es'); });
    return lista;
  }

  function actualizarFiltrosActivos() {
    const cont = document.getElementById('filtros-activos');
    if (!cont) return;
    cont.innerHTML = '';
    const tags = [];
    if (filtrosActivos.categoria !== 'todas') tags.push({ tipo: 'categoria', label: filtrosActivos.categoria });
    if (filtrosActivos.color !== 'todos') tags.push({ tipo: 'color', label: filtrosActivos.color });
    if (filtrosActivos.talla !== 'todas') tags.push({ tipo: 'talla', label: 'Talla ' + filtrosActivos.talla });
    if (filtrosActivos.precioMin > 0 || filtrosActivos.precioMax < PRECIO_LIMITE) {
      tags.push({ tipo: 'precio', label: 'S/ ' + filtrosActivos.precioMin + ' – ' + filtrosActivos.precioMax });
    }
    tags.forEach(function (t) {
      const span = document.createElement('button');
      span.type = 'button';
      span.className = 'filtro-tag';
      span.innerHTML = t.label + ' <i class="fa-solid fa-xmark"></i>';
      span.addEventListener('click', function () {
        if (t.tipo === 'categoria') {
          filtrosActivos.categoria = 'todas';
          document.querySelectorAll('.chip[data-filtro]').forEach(function (c) {
            const on = c.dataset.filtro === 'todas';
            c.classList.toggle('activo', on);
            c.setAttribute('aria-pressed', on ? 'true' : 'false');
          });
          history.replaceState(null, '', location.pathname);
        } else if (t.tipo === 'color') {
          filtrosActivos.color = 'todos';
          document.querySelectorAll('.swatch').forEach(function (s) {
            const on = s.dataset.color === 'todos';
            s.classList.toggle('activo', on);
            s.setAttribute('aria-pressed', on ? 'true' : 'false');
          });
        } else if (t.tipo === 'talla') {
          filtrosActivos.talla = 'todas';
          document.querySelectorAll('.chip-talla-filtro').forEach(function (c) {
            const on = c.dataset.talla === 'todas';
            c.classList.toggle('activo', on);
            c.setAttribute('aria-pressed', on ? 'true' : 'false');
          });
        } else if (t.tipo === 'precio') {
          filtrosActivos.precioMin = 0;
          document.getElementById('precio-min').value = 0;
          filtrosActivos.precioMax = PRECIO_LIMITE;
          const r = document.getElementById('filtro-precio');
          const lab = document.getElementById('precio-label');
          const mx = document.getElementById('precio-max');
          if (r) { r.value = r.max; if (lab) lab.textContent = 'Hasta S/ ' + r.max; }
          if (mx) mx.value = r ? r.max : PRECIO_LIMITE;
        }
        renderCatalogo();
        actualizarFiltrosActivos();
      });
      cont.appendChild(span);
    });
  }

  function crearCard(prod) {
    const art = document.createElement('article');
    art.className = 'producto';
    art.dataset.id = prod.id;
    art.dataset.color = prod.color;
    art.dataset.precio = prod.precio;
    art.dataset.categoria = prod.categoria;

    let etiquetaHtml = prod.etiqueta ? '<span class="etiqueta">' + prod.etiqueta + '</span>' : '';
    art.innerHTML =
      '<figure><img src="' + prod.img + '" alt="' + prod.nombre + '" loading="lazy">' + etiquetaHtml + '</figure>' +
      '<div class="producto-info">' +
        '<h3>' + prod.nombre + '</h3>' +
        '<p>' + prod.desc + '</p>' +
        '<p class="meta-prod"><span class="tag-color">' + prod.color + '</span> · ' + (prod.tallas ? prod.tallas.join(', ') : '') + '</p>' +
        '<p class="precio">S/ ' + prod.precio.toFixed(2) + '</p>' +
      '</div>' +
      '<div class="producto-acciones">' +
        '<button type="button" class="boton btn-ver" data-id="' + prod.id + '">Ver detalle</button>' +
        '<button type="button" class="boton-icono btn-fav' + (esFavorito(prod.id) ? ' activo' : '') + '" data-id="' + prod.id + '" title="' + (esFavorito(prod.id) ? 'Quitar de favoritos' : 'Agregar a favoritos') + '" aria-pressed="' + (esFavorito(prod.id) ? 'true' : 'false') + '"><i class="fa-' + (esFavorito(prod.id) ? 'solid' : 'regular') + ' fa-heart"></i></button>' +
        '<button type="button" class="boton boton-oscuro btn-add" data-id="' + prod.id + '" title="Agregar al carrito"><i class="fa-solid fa-cart-plus"></i></button>' +
      '</div>';
    return art;
  }

  function renderCatalogo() {
    const contenedor = document.getElementById('catalogo-dinamico');
    if (!contenedor || typeof CATALOGO === 'undefined') return;

    const visibles = productosVisibles();
    const cats = categoriasDePagina();
    const porCategoria = {};

    visibles.forEach(function (p) {
      if (!porCategoria[p.categoria]) porCategoria[p.categoria] = [];
      porCategoria[p.categoria].push(p);
    });

    contenedor.innerHTML = '';

    const contador = document.getElementById('contador-resultados');
    if (contador) contador.textContent = visibles.length + ' producto' + (visibles.length !== 1 ? 's' : '');

    if (visibles.length === 0) {
      contenedor.innerHTML = '<div class="contenedor"><p class="sin-resultados">No hay productos con esos filtros. Prueba otras opciones.</p></div>';
      return;
    }

    // Si hay orden activo (no relevancia), mostrar grilla plana
    if (filtrosActivos.orden !== 'default') {
      const section = document.createElement('section');
      section.className = 'categoria-bloque';
      section.innerHTML = '<div class="contenedor"><div class="rejilla-productos"></div></div>';
      const rejilla = section.querySelector('.rejilla-productos');
      visibles.forEach(function (p) { rejilla.appendChild(crearCard(p)); });
      contenedor.appendChild(section);
    } else {
      const ordenCats = cats.length ? cats : Object.keys(porCategoria);
      ordenCats.forEach(function (cat) {
        const lista = porCategoria[cat];
        if (!lista || !lista.length) return;
        const meta = (typeof SECCIONES !== 'undefined' && SECCIONES[cat]) ? SECCIONES[cat] : { titulo: cat, icono: 'fa-tag', desc: '' };
        const section = document.createElement('section');
        section.className = 'categoria-bloque';
        section.id = cat;
        section.dataset.categoria = cat;
        section.innerHTML =
          '<div class="contenedor">' +
            '<h2><i class="fa-solid ' + meta.icono + '"></i> ' + meta.titulo + '</h2>' +
            '<p>' + meta.desc + '</p>' +
            '<div class="rejilla-productos"></div>' +
          '</div>';
        const rejilla = section.querySelector('.rejilla-productos');
        lista.forEach(function (p) { rejilla.appendChild(crearCard(p)); });
        contenedor.appendChild(section);
      });
    }

    contenedor.querySelectorAll('.btn-ver').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const prod = CATALOGO.find(function (p) { return p.id === btn.dataset.id; });
        if (prod) abrirModal(prod);
      });
    });
    actualizarFiltrosActivos();

    
    contenedor.querySelectorAll('.btn-fav').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleFavorito(btn.dataset.id);
        const icon = btn.querySelector('i');
        if (icon) {
          icon.className = esFavorito(btn.dataset.id) ? 'fa-solid fa-heart' : 'fa-regular fa-heart';
        }
      });
    });

    contenedor.querySelectorAll('.btn-add').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const prod = CATALOGO.find(function (p) { return p.id === btn.dataset.id; });
        if (!prod) return;
        // Siempre abrir modal para elegir talla antes de agregar
        abrirModal(prod);
      });
    });
  }

  function setupFiltros() {
    // Categoría
    document.querySelectorAll('.chip[data-filtro]').forEach(function (chip) {
      chip.addEventListener('click', function () {
        filtrosActivos.categoria = chip.dataset.filtro;
        document.querySelectorAll('.chip[data-filtro]').forEach(function (c) {
          const on = c.dataset.filtro === filtrosActivos.categoria;
          c.classList.toggle('activo', on);
          c.setAttribute('aria-pressed', on ? 'true' : 'false');
        });
        if (filtrosActivos.categoria === 'todas') history.replaceState(null, '', location.pathname);
        else history.replaceState(null, '', '#' + filtrosActivos.categoria);
        renderCatalogo();
        actualizarFiltrosActivos();
      });
    });

    // Color swatches
    document.querySelectorAll('.swatch').forEach(function (sw) {
      sw.addEventListener('click', function () {
        filtrosActivos.color = sw.dataset.color;
        document.querySelectorAll('.swatch').forEach(function (s) {
          const on = s.dataset.color === filtrosActivos.color;
          s.classList.toggle('activo', on);
          s.setAttribute('aria-pressed', on ? 'true' : 'false');
        });
        renderCatalogo();
        actualizarFiltrosActivos();
      });
    });

    // Talla chips
    document.querySelectorAll('.chip-talla-filtro').forEach(function (chip) {
      chip.addEventListener('click', function () {
        filtrosActivos.talla = chip.dataset.talla;
        document.querySelectorAll('.chip-talla-filtro').forEach(function (c) {
          const on = c.dataset.talla === filtrosActivos.talla;
          c.classList.toggle('activo', on);
          c.setAttribute('aria-pressed', on ? 'true' : 'false');
        });
        renderCatalogo();
        actualizarFiltrosActivos();
      });
    });

    // Precio range + inputs
    const rangoPrecio = document.getElementById('filtro-precio');
    const precioLabel = document.getElementById('precio-label');
    const inputMin = document.getElementById('precio-min');
    const inputMax = document.getElementById('precio-max');

    function aplicarPrecio(evento) {
      // valueAsNumber devuelve NaN si el campo está vacío. El cero es válido.
      const minimo = inputMin.valueAsNumber;
      const maximo = inputMax.valueAsNumber;
      let min = Number.isFinite(minimo) ? Math.max(0, Math.min(minimo, PRECIO_LIMITE)) : 0;
      let max = Number.isFinite(maximo) ? Math.max(0, Math.min(maximo, PRECIO_LIMITE)) : PRECIO_LIMITE;
      if (min > max) {
        if (evento.target === inputMin) max = min;
        else min = max;
      }
      inputMin.value = min;
      inputMax.value = max;
      rangoPrecio.value = max;
      filtrosActivos.precioMin = min;
      filtrosActivos.precioMax = max;
      precioLabel.textContent = 'S/ ' + min + ' – S/ ' + max;
      renderCatalogo();
      actualizarFiltrosActivos();
    }

    if (rangoPrecio) {
      rangoPrecio.addEventListener('input', function (evento) {
        inputMax.value = rangoPrecio.value;
        aplicarPrecio(evento);
      });
      inputMin.addEventListener('change', aplicarPrecio);
      inputMax.addEventListener('change', aplicarPrecio);
    }

    // Orden
    const selOrden = document.getElementById('filtro-orden');
    if (selOrden) {
      selOrden.addEventListener('change', function () {
        filtrosActivos.orden = selOrden.value;
        renderCatalogo();
      });
    }

    // Limpiar
    const btnLimpiar = document.getElementById('limpiar-filtros');
    if (btnLimpiar) {
      btnLimpiar.addEventListener('click', function () {
        filtrosActivos.categoria = 'todas';
        filtrosActivos.color = 'todos';
        filtrosActivos.talla = 'todas';
        filtrosActivos.precioMin = 0;
        filtrosActivos.precioMax = PRECIO_LIMITE;
        filtrosActivos.orden = 'default';
        document.querySelectorAll('.chip[data-filtro]').forEach(function (c) {
          const on = c.dataset.filtro === 'todas';
          c.classList.toggle('activo', on);
          c.setAttribute('aria-pressed', on ? 'true' : 'false');
        });
        document.querySelectorAll('.swatch').forEach(function (s) {
          const on = s.dataset.color === 'todos';
          s.classList.toggle('activo', on);
          s.setAttribute('aria-pressed', on ? 'true' : 'false');
        });
        document.querySelectorAll('.chip-talla-filtro').forEach(function (c) {
          const on = c.dataset.talla === 'todas';
          c.classList.toggle('activo', on);
          c.setAttribute('aria-pressed', on ? 'true' : 'false');
        });
        if (rangoPrecio) { rangoPrecio.value = rangoPrecio.max; if (precioLabel) precioLabel.textContent = 'Hasta S/ ' + rangoPrecio.max; }
        if (inputMin) inputMin.value = 0;
        if (inputMax) inputMax.value = rangoPrecio ? rangoPrecio.max : PRECIO_LIMITE;
        if (selOrden) selOrden.value = 'default';
        history.replaceState(null, '', location.pathname);
        renderCatalogo();
        actualizarFiltrosActivos();
      });
    }

    // Hash inicial
    const hash = location.hash.replace('#', '');
    if (hash && document.querySelector('.chip[data-filtro="' + hash + '"]')) {
      filtrosActivos.categoria = hash;
      document.querySelectorAll('.chip[data-filtro]').forEach(function (c) {
        const on = c.dataset.filtro === hash;
        c.classList.toggle('activo', on);
        c.setAttribute('aria-pressed', on ? 'true' : 'false');
      });
    }
  }


  /* ========== FORMULARIO CONTACTO ========== */
  const formulario = document.querySelector('.formulario');
  if (formulario) {
    formulario.addEventListener('submit', function (e) {
      e.preventDefault();
      const nombre = (document.getElementById('nombre') || {}).value || '';
      const correo = (document.getElementById('correo') || {}).value || '';
      const mensaje = (document.getElementById('mensaje') || {}).value || '';
      if (!nombre.trim() || !correo.trim() || !mensaje.trim()) {
        alert('Por favor completa todos los campos obligatorios.');
        return;
      }
      if (confirm('¿Confirmas el envío?\n\nNombre: ' + nombre + '\nCorreo: ' + correo)) {
        alert('¡Mensaje enviado! (demo) Nos pondremos en contacto pronto.');
        formulario.reset();
      }
    });
  }

  /* ========== ESCAPE ========== */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      cerrarMenu();
      cerrarModal();
      cerrarCarrito();
    }
  });

  /* ========== INIT ========== */
  console.info('UrbanVibe: ' + CATALOGO.length + ' productos. Vista previa del catálogo:');
  console.table(CATALOGO.slice(0, 3), ['nombre', 'categoria', 'precio']);
  setupFiltros();
  renderCatalogo();
  actualizarBadgeFav();
  actualizarBadge();


  /* ========== PORTADA: frase rotativa ========== */
  (function () {
    const el = document.getElementById('frase-rotativa');
    if (!el) return;
    const frases = ['propio ritmo', 'calle con estilo', 'vibe sin filtro', 'look de verdad'];
    let i = 0;
    setInterval(function () {
      el.style.opacity = '0';
      setTimeout(function () {
        i = (i + 1) % frases.length;
        el.textContent = frases[i];
        el.style.opacity = '1';
      }, 350);
    }, 3200);
  })();

  /* ========== ARMA TU VIBE (outfit builder) ========== */
  (function () {
    if (typeof CATALOGO === 'undefined') return;
    const selArriba = document.getElementById('vibe-arriba');
    const selAbajo = document.getElementById('vibe-abajo');
    const selExtra = document.getElementById('vibe-extra');
    if (!selArriba || !selAbajo || !selExtra) return;

    const arriba = CATALOGO.filter(function (p) { return p.categoria === 'camisetas' || p.categoria === 'poleras'; });
    const abajo = CATALOGO.filter(function (p) { return p.categoria === 'pantalones'; });
    const extra = CATALOGO.filter(function (p) { return p.categoria === 'gorras' || p.categoria === 'mochilas' || p.categoria === 'lentes'; });

    function llenar(sel, lista, placeholder) {
      sel.innerHTML = '<option value="">' + placeholder + '</option>';
      lista.forEach(function (p) {
        const opt = document.createElement('option');
        opt.value = p.id;
        opt.textContent = p.nombre + ' — S/ ' + p.precio.toFixed(2);
        sel.appendChild(opt);
      });
    }
    llenar(selArriba, arriba, 'Elige arriba…');
    llenar(selAbajo, abajo, 'Elige abajo…');
    llenar(selExtra, extra, 'Elige extra…');

    function preview(sel, boxId) {
      const box = document.getElementById(boxId);
      if (!box) return;
      const id = sel.value;
      if (!id) {
        box.innerHTML = '<span>Elige una pieza</span>';
        return;
      }
      const prod = CATALOGO.find(function (p) { return p.id === id; });
      if (prod) box.innerHTML = '<img src="' + prod.img + '" alt="' + prod.nombre + '">';
    }

    function actualizarTotal() {
      let total = 0;
      [selArriba, selAbajo, selExtra].forEach(function (sel) {
        if (!sel.value) return;
        const prod = CATALOGO.find(function (p) { return p.id === sel.value; });
        if (prod) total += prod.precio;
      });
      const el = document.getElementById('vibe-total');
      if (el) el.textContent = 'S/ ' + total.toFixed(2);
    }

    const piezas = [selArriba, selAbajo, selExtra];
    function selectorTalla(pieza) {
      return document.getElementById(pieza.id.replace('vibe-', 'talla-'));
    }
    piezas.forEach(function (pieza) {
      pieza.addEventListener('change', function () {
        const producto = CATALOGO.find(function (p) { return p.id === pieza.value; });
        const talla = selectorTalla(pieza);
        talla.replaceChildren();
        talla.disabled = !producto;
        if (producto) {
          if (producto.tallas.length > 1) talla.add(new Option('Selecciona una talla', ''));
          producto.tallas.forEach(function (t) { talla.add(new Option(t, t)); });
        } else {
          talla.add(new Option('Elige primero una pieza', ''));
        }
        preview(pieza, pieza.id.replace('vibe-', 'prev-'));
        actualizarTotal();
      });
    });

    document.getElementById('vibe-agregar').addEventListener('click', function () {
      const elegidas = piezas.filter(function (pieza) { return pieza.value; });
      if (!elegidas.length) {
        alert('Elige al menos una pieza para tu look.');
        return;
      }
      for (const pieza of elegidas) {
        if (!selectorTalla(pieza).value) {
          alert('Selecciona la talla de ' + pieza.options[pieza.selectedIndex].text + '.');
          selectorTalla(pieza).focus();
          return;
        }
      }
      elegidas.forEach(function (pieza) {
        const producto = CATALOGO.find(function (p) { return p.id === pieza.value; });
        agregarAlCarrito(producto, selectorTalla(pieza).value);
      });
    });
  })();



  /* ========== PANEL FAVORITOS ========== */
  function abrirFavoritos() {
    renderFavoritos();
    const drawer = document.getElementById('fav-drawer');
    const overlay = document.getElementById('fav-overlay');
    if (drawer) drawer.classList.add('activo');
    if (overlay) overlay.classList.add('activo');
    document.body.classList.add('fav-abierto');
  }
  function cerrarFavoritos() {
    const drawer = document.getElementById('fav-drawer');
    const overlay = document.getElementById('fav-overlay');
    if (drawer) drawer.classList.remove('activo');
    if (overlay) overlay.classList.remove('activo');
    document.body.classList.remove('fav-abierto');
  }
  function renderFavoritos() {
    const lista = document.getElementById('fav-lista');
    const vacio = document.getElementById('fav-vacio');
    if (!lista) return;
    lista.innerHTML = '';
    if (typeof CATALOGO === 'undefined' || !favoritos.length) {
      if (vacio) vacio.hidden = false;
      return;
    }
    if (vacio) vacio.hidden = true;
    favoritos.forEach(function (id, idx) {
      const prod = CATALOGO.find(function (p) { return p.id === id; });
      if (!prod) return;
      const li = document.createElement('li');
      li.className = 'fav-item';
      li.style.animationDelay = (idx * 0.05) + 's';
      li.innerHTML =
        '<img src="' + prod.img + '" alt="' + prod.nombre + '">' +
        '<div class="fav-item-info">' +
          '<h4>' + prod.nombre + '</h4>' +
          '<span class="tag-color">' + prod.color + '</span>' +
          '<div class="precio">S/ ' + prod.precio.toFixed(2) + '</div>' +
        '</div>' +
        '<div class="fav-item-acciones">' +
          '<button type="button" class="btn-fav-cart" data-id="' + prod.id + '" title="Agregar al carrito"><i class="fa-solid fa-cart-plus"></i></button>' +
          '<button type="button" class="btn-fav-quitar" data-id="' + prod.id + '" title="Quitar de favoritos"><i class="fa-solid fa-heart-crack"></i></button>' +
        '</div>';
      lista.appendChild(li);
    });
    lista.querySelectorAll('.btn-fav-quitar').forEach(function (btn) {
      btn.addEventListener('click', function () {
        toggleFavorito(btn.dataset.id);
        renderFavoritos();
        actualizarHeaderFav();
      });
    });
    lista.querySelectorAll('.btn-fav-cart').forEach(function (btn) {
      btn.addEventListener('click', function () {
        const prod = CATALOGO.find(function (p) { return p.id === btn.dataset.id; });
        if (!prod) return;
        if (typeof abrirModal === 'function') {
          cerrarFavoritos();
          abrirModal(prod);
        } else {
          agregarAlCarrito(prod, (prod.tallas && prod.tallas[0]) || 'Única');
        }
      });
    });
  }
  function actualizarHeaderFav() {
    const btn = document.getElementById('fav-toggle');
    if (btn) btn.classList.toggle('tiene-favs', favoritos.length > 0);
    actualizarBadgeFav();
  }

  const favToggle = document.getElementById('fav-toggle');
  if (favToggle) favToggle.addEventListener('click', abrirFavoritos);
  const favCerrar = document.getElementById('fav-cerrar');
  if (favCerrar) favCerrar.addEventListener('click', cerrarFavoritos);
  const favOverlayEl = document.getElementById('fav-overlay');
  if (favOverlayEl) favOverlayEl.addEventListener('click', cerrarFavoritos);
  const favVaciar = document.getElementById('fav-vaciar');
  if (favVaciar) {
    favVaciar.addEventListener('click', function () {
      if (!favoritos.length) return;
      if (!confirm('¿Vaciar todos los favoritos?')) return;
      favoritos = [];
      guardarFavoritos();
      document.querySelectorAll('.btn-fav').forEach(function (b) {
        b.classList.remove('activo');
        b.setAttribute('aria-pressed', 'false');
        const icon = b.querySelector('i');
        if (icon) icon.className = 'fa-regular fa-heart';
      });
      renderFavoritos();
      actualizarHeaderFav();
    });
  }
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') cerrarFavoritos();
  });
  actualizarHeaderFav();


})();
