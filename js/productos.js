/**
 * Catálogo Urban Vibe — solo varones
 * Cada nombre/color coincide con la foto real (revisado visualmente)
 */
const CATALOGO = [
  /* ===== CAMISETAS ===== */
  { id:'c01', nombre:'Camiseta Limitless Club', desc:'Negra oversize con bandas rojas Limitless Culture Club en la espalda.', precio:49.90, categoria:'camisetas', color:'negro', tallas:['S','M','L','XL'], img:'imagenes/Camiseta.jpeg', etiqueta:'Más pedida' },
  { id:'c02', nombre:'Camiseta Will Return', desc:'Blanca con tipografía SHADAI / ELOHIM / YAHWEH en la espalda.', precio:44.90, categoria:'camisetas', color:'blanco', tallas:['S','M','L','XL'], img:'imagenes/productos/camiseta-blanca-grafica.jpg' },
  { id:'c03', nombre:'Camiseta Rebellion Roots', desc:'Negra con gráfico dorado REBELLION IS IN MY y raíces.', precio:46.90, categoria:'camisetas', color:'negro', tallas:['M','L','XL'], img:'imagenes/productos/camiseta-negra-dorada.jpg', etiqueta:'Nuevo' },
  { id:'c04', nombre:'Camiseta grafito parche', desc:'Gris grafito con parche ilustrado en el pecho.', precio:46.90, categoria:'camisetas', color:'gris', tallas:['S','M','L','XL'], img:'imagenes/productos/camiseta-oversize-grafito.jpg' },
  { id:'c05', nombre:'Camiseta blanca lisa', desc:'Blanca básica de cuello redondo, corte regular.', precio:38.90, categoria:'camisetas', color:'blanco', tallas:['S','M','L','XL','XXL'], img:'imagenes/productos/camiseta-blanca-lisa.jpg' },
  { id:'c06', nombre:'Camiseta Yahweh Yireh', desc:'Negra con texto YAHWEH YIREH en arco sobre el pecho.', precio:42.90, categoria:'camisetas', color:'negro', tallas:['S','M','L','XL'], img:'imagenes/productos/camiseta-yahweh-negra.jpg' },
  { id:'c07', nombre:'Camiseta 705 Badge', desc:'Negra con badge circular 705 en el pecho.', precio:41.90, categoria:'camisetas', color:'negro', tallas:['S','M','L'], img:'imagenes/productos/camiseta-705-negra.jpg' },
  { id:'c08', nombre:'Camiseta blanca outdoor', desc:'Blanca lisa oversize para el día a día.', precio:39.90, categoria:'camisetas', color:'blanco', tallas:['M','L','XL'], img:'imagenes/productos/camiseta-blanca-outdoor.jpg' },
  { id:'c09', nombre:'Camiseta (HOTEL)', desc:'Blanca con bordado minimalista (HOTEL) en el pecho.', precio:45.90, categoria:'camisetas', color:'blanco', tallas:['S','M','L'], img:'imagenes/productos/camiseta-hotel-blanca.jpg', etiqueta:'Nuevo' },
  { id:'c10', nombre:'Camiseta blanca slim', desc:'Blanca ajustada, cuello redondo, modelo hombre.', precio:40.90, categoria:'camisetas', color:'blanco', tallas:['S','M','L','XL'], img:'imagenes/productos/camiseta-azul-hombre.jpg' },
  { id:'c11', nombre:'Camiseta beige Original', desc:'Beige con print azul Maneki / ORIGINAL.', precio:47.90, categoria:'camisetas', color:'beige', tallas:['S','M','L','XL'], img:'imagenes/productos/camiseta-gris-hombre.jpg' },

  /* ===== POLERAS ===== */
  { id:'p01', nombre:'Polera Essentials negra', desc:'Sudadera negra con bordado ESSENTIALS FEAR OF GOD.', precio:89.90, categoria:'poleras', color:'negro', tallas:['S','M','L','XL'], img:'imagenes/Polera.jpeg', etiqueta:'Más pedida' },
  { id:'p02', nombre:'Hoodie grafito', desc:'Hoodie gris oscuro con capucha y bolsillo canguro.', precio:84.90, categoria:'poleras', color:'gris', tallas:['M','L','XL'], img:'imagenes/productos/polera-grafito.jpg' },
  { id:'p03', nombre:'Polera verde cropped', desc:'Verde con corte corto y cierre frontal.', precio:92.90, categoria:'poleras', color:'verde', tallas:['S','M','L'], img:'imagenes/productos/polera-verde-cropped.jpg', etiqueta:'Nuevo' },
  { id:'p04', nombre:'Polera verde bordada', desc:'Verde bosque con bordado en el pecho.', precio:86.90, categoria:'poleras', color:'verde', tallas:['S','M','L','XL'], img:'imagenes/productos/polera-verde-bordada.jpg' },
  { id:'p05', nombre:'Hoodie blanca', desc:'Hoodie blanca con cordones y bolsillo frontal.', precio:88.90, categoria:'poleras', color:'blanco', tallas:['S','M','L','XL'], img:'imagenes/productos/hoodie-blanca.jpg' },
  { id:'p06', nombre:'Hoodie gris melange', desc:'Hoodie gris jaspeado, vista posterior.', precio:94.90, categoria:'poleras', color:'gris', tallas:['S','M','L','XL'], img:'imagenes/productos/hoodie-gris-melange.jpg' },
  { id:'p07', nombre:'Sudadera blanca basic', desc:'Sudadera blanca de cuello redondo, sin capucha.', precio:74.90, categoria:'poleras', color:'blanco', tallas:['S','M','L','XL'], img:'imagenes/productos/sudadera-blanca-basic.jpg' },
  { id:'p08', nombre:'Hoodie gris North Face', desc:'Hoodie gris, estilo outdoor con capucha.', precio:91.90, categoria:'poleras', color:'gris', tallas:['M','L','XL'], img:'imagenes/productos/hoodie.northface-gris.jpg' },

  /* ===== PANTALONES (solo fotos verificadas hombre / producto) ===== */
  { id:'t01', nombre:'Jogger negro', desc:'Jogger negro con puños elásticos.', precio:79.90, categoria:'pantalones', color:'negro', tallas:['S','M','L','XL'], img:'imagenes/productos/pantalon-jogger-negro.jpg', etiqueta:'Más pedido' },
  { id:'t02', nombre:'Pantalón deportivo gris', desc:'Deportivo gris, tela liviana.', precio:74.90, categoria:'pantalones', color:'gris', tallas:['M','L','XL'], img:'imagenes/productos/pantalon-deportivo-gris.jpg' },
  { id:'t03', nombre:'Jean crema', desc:'Jean recto en tono crema.', precio:94.90, categoria:'pantalones', color:'beige', tallas:['28','30','32','34'], img:'imagenes/productos/pantalon-jean-crema.jpg' },
  { id:'t04', nombre:'Jean azul oscuro', desc:'Jean clásico azul oscuro.', precio:94.90, categoria:'pantalones', color:'azul', tallas:['28','30','32','34','36'], img:'imagenes/productos/pantalon-jean-azul-oscuro.jpg', etiqueta:'Nuevo' },
  { id:'t05', nombre:'Jean índigo', desc:'Jean azul índigo, corte recto.', precio:89.90, categoria:'pantalones', color:'azul', tallas:['30','32','34'], img:'imagenes/productos/jean-indigo-oscuro.jpg' },
  { id:'t06', nombre:'Pack jeans denim', desc:'Trío de jeans (claro, oscuro y negro).', precio:119.90, categoria:'pantalones', color:'azul', tallas:['28','30','32','34'], img:'imagenes/productos/jean-azul-hombre.jpg' },
  { id:'t07', nombre:'Chino beige', desc:'Chino beige / khaki, corte slim.', precio:86.90, categoria:'pantalones', color:'beige', tallas:['30','32','34','36'], img:'imagenes/productos/chino-beige.jpg' },

  /* ===== GORRAS (foto = nombre, sin duplicados) ===== */
  { id:'g01', nombre:'Gorra urbana azul', desc:'Celeste con bordados tribales y detalle central.', precio:39.90, categoria:'gorras', color:'azul', tallas:['Única'], img:'imagenes/Gorra.jpeg', etiqueta:'Más pedida' },
  { id:'g02', nombre:'Gorra camel A\'s', desc:'Camel / beige con logo A\'s bordado negro.', precio:34.90, categoria:'gorras', color:'beige', tallas:['Única'], img:'imagenes/productos/gorra-camel.jpg' },
  { id:'g03', nombre:'Gorra NY navy', desc:'Azul navy con logo NY y panel de malla.', precio:36.90, categoria:'gorras', color:'azul', tallas:['Única'], img:'imagenes/productos/gorra-azul-marino.jpg', etiqueta:'Nuevo' },
  { id:'g04', nombre:'Gorra blanca anarquía', desc:'Blanca con parche rojo de anarquía.', precio:35.90, categoria:'gorras', color:'blanco', tallas:['Única'], img:'imagenes/productos/gorra-blanca.jpg' },
  { id:'g05', nombre:'Gorra trucker blanca', desc:'Trucker blanca con malla trasera, frontal lisa.', precio:32.90, categoria:'gorras', color:'blanco', tallas:['Única'], img:'imagenes/productos/gorra-trucker-blanca.jpg' },
  { id:'g06', nombre:'Gorra helado beige', desc:'Beige con bordado de helado derretido.', precio:37.90, categoria:'gorras', color:'beige', tallas:['Única'], img:'imagenes/productos/gorra-helado-beige.jpg', etiqueta:'Nuevo' },
  { id:'g07', nombre:'Gorra washed gris', desc:'Gris deslavado con logo bordado tono sobre tono.', precio:34.90, categoria:'gorras', color:'gris', tallas:['Única'], img:'imagenes/productos/gorra-azul-hombre.jpg' },

  /* ===== MOCHILAS ===== */
  { id:'m01', nombre:'Mochila negra clásica', desc:'Negra tipo cuero con correas y hebillas metálicas.', precio:109.90, categoria:'mochilas', color:'negro', tallas:['Única'], img:'imagenes/productos/mochila-negra-clasica.jpg', etiqueta:'Más pedida' },
  { id:'m02', nombre:'Mochila negra lima', desc:'Negra deportiva con cierres verde lima.', precio:94.90, categoria:'mochilas', color:'negro', tallas:['Única'], img:'imagenes/productos/mochila-negra-lima.jpg' },
  { id:'m03', nombre:'Mochila durazno', desc:'Acolchada tono durazno / salmon.', precio:99.90, categoria:'mochilas', color:'beige', tallas:['Única'], img:'imagenes/productos/mochila-durazno.jpg', etiqueta:'Nuevo' },
  { id:'m04', nombre:'Mochila verde oliva', desc:'Verde oliva con varios compartimentos.', precio:104.90, categoria:'mochilas', color:'verde', tallas:['Única'], img:'imagenes/productos/mochila-verde-oliva.jpg' },
  { id:'m05', nombre:'Mochila urbana negra', desc:'Negra minimalista con badge amarillo frontal.', precio:112.90, categoria:'mochilas', color:'negro', tallas:['Única'], img:'imagenes/productos/mochila-urbana-negra.jpg' },
  { id:'m06', nombre:'Mochila cuero marrón', desc:'Cuero marrón con logo en relieve.', precio:129.90, categoria:'mochilas', color:'beige', tallas:['Única'], img:'imagenes/productos/mochila-cuero-marron.jpg' },
  { id:'m07', nombre:'Mochila Vinta verde', desc:'Verde canvas outdoor con correas de cuero.', precio:118.90, categoria:'mochilas', color:'verde', tallas:['Única'], img:'imagenes/productos/mochila-vinta-verde.jpg', etiqueta:'Nuevo' },
  { id:'m08', nombre:'Mochila negra básica', desc:'Negra sencilla, ligera para el día a día.', precio:89.90, categoria:'mochilas', color:'negro', tallas:['Única'], img:'imagenes/productos/mochila-sport-roja.jpg' },

  /* ===== LENTES ===== */
  { id:'l01', nombre:'Lentes clásicos negros', desc:'Montura negra clásica, lentes oscuros.', precio:59.90, categoria:'lentes', color:'negro', tallas:['Única'], img:'imagenes/productos/lentes-clasicos-negros.jpg' },
  { id:'l02', nombre:'Lentes aviador negros', desc:'Aviador negro, estilo atemporal.', precio:64.90, categoria:'lentes', color:'negro', tallas:['Única'], img:'imagenes/productos/lentes-aviador-negros.jpg', etiqueta:'Nuevo' },
  { id:'l03', nombre:'Lentes aviador amarillos', desc:'Aviador con cristales amarillos.', precio:62.90, categoria:'lentes', color:'amarillo', tallas:['Única'], img:'imagenes/productos/lentes-aviador-amarillos.jpg' },
  { id:'l04', nombre:'Lentes carey verdes', desc:'Montura carey con lentes verdes.', precio:69.90, categoria:'lentes', color:'verde', tallas:['Única'], img:'imagenes/productos/lentes-carey-verdes.jpg' },
  { id:'l05', nombre:'Lentes redondos dorados', desc:'Montura redonda dorada, cristales oscuros.', precio:72.90, categoria:'lentes', color:'negro', tallas:['Única'], img:'imagenes/productos/lentes-redondos-dorados.jpg', etiqueta:'Nuevo' },
  { id:'l06', nombre:'Lentes wayfarer negros', desc:'Wayfarer negro brillante.', precio:68.90, categoria:'lentes', color:'negro', tallas:['Única'], img:'imagenes/productos/lentes-wayfarer-negros.jpg' },
  { id:'l07', nombre:'Lentes deportivos', desc:'Montura deportiva, protección UV.', precio:74.90, categoria:'lentes', color:'negro', tallas:['Única'], img:'imagenes/productos/lentes-deportivos.jpg' }
];

const SECCIONES = {
  camisetas: { titulo:'Camisetas', icono:'fa-shirt', desc:'Básicas y de estampado para el día a día.' },
  poleras:   { titulo:'Poleras', icono:'fa-layer-group', desc:'Hoodies, sudaderas y felpas.' },
  pantalones:{ titulo:'Pantalones', icono:'fa-person-walking', desc:'Joggers, jeans y chinos.' },
  gorras:    { titulo:'Gorras', icono:'fa-baseball', desc:'Snapback, trucker y visera curva.' },
  mochilas:  { titulo:'Mochilas', icono:'fa-bag-shopping', desc:'Urbanas, deportivas y outdoor.' },
  lentes:    { titulo:'Lentes', icono:'fa-glasses', desc:'Estilo y protección UV.' }
};
