const pedidoProData = {
  orders: [
    { id: '#PP-1041', customer: 'Maria Fernanda', products: 'Pack desayuno x2', date: 'Hoy, 10:30', total: '$240', status: 'Preparacion' },
    { id: '#PP-1040', customer: 'Carlos Mendoza', products: 'Cafe molido x4', date: 'Hoy, 09:15', total: '$180', status: 'Camino' },
    { id: '#PP-1039', customer: 'Sofia Andrade', products: 'Kit oficina x1', date: 'Ayer, 16:40', total: '$320', status: 'Entregado' },
    { id: '#PP-1038', customer: 'Diego Ramirez', products: 'Pack desayuno x1', date: 'Ayer, 14:20', total: '$120', status: 'Entregado' },
    { id: '#PP-1037', customer: 'Laura Torres', products: 'Cafe premium x3', date: '18 Sep, 11:00', total: '$270', status: 'Camino' },
    { id: '#PP-1036', customer: 'Andres Leon', products: 'Kit oficina x2', date: '17 Sep, 15:30', total: '$480', status: 'Preparacion' },
    { id: '#PP-1035', customer: 'Valentina Cruz', products: 'Pack regalo x1', date: '17 Sep, 12:10', total: '$195', status: 'Entregado' },
    { id: '#PP-1034', customer: 'Mateo Silva', products: 'Cafe molido x2', date: '16 Sep, 10:00', total: '$90', status: 'Preparacion' }
  ],
  products: [
    { name: 'Pack desayuno', description: 'Cafe, jugo y croissant', price: '$120', stock: '24 disponibles', icon: '☕' },
    { name: 'Cafe premium', description: 'Grano seleccionado 500g', price: '$90', stock: '12 disponibles', icon: '◉' },
    { name: 'Kit oficina', description: 'Snacks para equipos', price: '$240', stock: '6 disponibles', icon: '▦' },
    { name: 'Pack regalo', description: 'Presentacion especial', price: '$195', stock: '18 disponibles', icon: '✦' }
  ],
  customers: [
    { name: 'Maria Fernanda', email: 'maria.f@correo.com', orders: 8, spent: '$1,240' },
    { name: 'Carlos Mendoza', email: 'carlos.m@correo.com', orders: 6, spent: '$980' },
    { name: 'Sofia Andrade', email: 'sofia.a@correo.com', orders: 5, spent: '$760' },
    { name: 'Diego Ramirez', email: 'diego.r@correo.com', orders: 4, spent: '$540' },
    { name: 'Laura Torres', email: 'laura.t@correo.com', orders: 3, spent: '$420' },
    { name: 'Andres Leon', email: 'andres.l@correo.com', orders: 2, spent: '$320' },
    { name: 'Ana Lopez', email: 'ana.lopez@correo.com', orders: 1, spent: '$120' }
  ]
};
