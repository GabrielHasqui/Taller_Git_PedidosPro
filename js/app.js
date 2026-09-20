const state = {
  orders: JSON.parse(localStorage.getItem('pedidopro-orders') || 'null') || pedidoProData.orders,
  products: pedidoProData.products,
  customers: pedidoProData.customers
};

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

function saveOrders() {
  localStorage.setItem('pedidopro-orders', JSON.stringify(state.orders));
}

function statusClass(status) {
  return status === 'Preparacion' ? 'status-prep' : status === 'Camino' ? 'status-way' : 'status-done';
}

function statusLabel(status) {
  return status === 'Preparacion' ? 'En preparacion' : status === 'Camino' ? 'En camino' : 'Entregado';
}

function renderOrderRow(order, full = false) {
  return `<tr><td><strong>${order.id}</strong></td><td>${order.customer}</td>${full ? `<td>${order.products}</td>` : ''}<td>${order.date}</td><td><strong>${order.total}</strong></td><td><span class="status ${statusClass(order.status)}">${statusLabel(order.status)}</span></td><td><button class="icon-button row-menu" aria-label="Cambiar estado" data-order-id="${order.id}">•••</button></td></tr>`;
}

function renderOrders() {
  const recent = $('#recent-orders-body');
  const all = $('#orders-body');
  if (recent) recent.innerHTML = state.orders.slice(0, 4).map((order) => renderOrderRow(order)).join('');
  if (all) {
    const query = ($('#order-search')?.value || '').toLowerCase();
    const filter = $('#order-filter')?.value || 'all';
    const filtered = state.orders.filtr((order) => {
      const matchesText = `${order.id} ${order.customer}`.toLowerCase().includes(query);
      return matchesText && (filter === 'all' || order.status === filter);
    });
    all.innerHTML = filtered.length ? filtered.map((order) => renderOrderRow(order, true)).join('') : '<tr><td colspan="7">No hay pedidos que coincidan con la busqueda.</td></tr>';
  }
  const active = state.orders.filter((order) => order.status !== 'Entregado').length;
  const delivery = state.orders.filter((order) => order.status === 'Camino').length;
  if ($('#active-orders')) $('#active-orders').textContent = active;
  if ($('#delivery-total')) $('#delivery-total').textContent = delivery;
  if ($('#chart-total')) $('#chart-total').textContent = state.orders.length;
  $$('.row-menu').forEach((button) => button.addEventListener('click', () => cycleOrderStatus(button.dataset.orderId)));
}

function cycleOrderStatus(id) {
  const order = state.orders.find((item) => item.id === id);
  if (!order) return;
  const statuses = ['Preparacion', 'Camino', 'Entregado'];
  order.status = statuses[(statuses.indexOf(order.status) + 1) % statuses.length];
  saveOrders();
  renderOrders();
  showToast(`${id} actualizado: ${statusLabel(order.status)}`);
}

function renderProducts() {
  $('#product-grid').innerHTML = state.products.map((product) => `<article class="product-card"><div class="product-visual">${product.icon}</div><h3>${product.name}</h3><p>${product.description}</p><div class="product-meta"><strong>${product.price}</strong><span class="stock ${product.stock.startsWith('6') ? 'low' : ''}">${product.stock}</span></div></article>`).join('');
}

function initials(name) {
  return name.split(' ').map((part) => part[0]).slice(0, 2).join('');
}

function renderCustomers() {
  $('#customer-grid').innerHTML = state.customers.map((customer) => `<article class="customer-card"><div class="customer-large-avatar">${initials(customer.name)}</div><div><h3>${customer.name}</h3><p>${customer.email}</p></div><div class="customer-orders"><strong>${customer.orders}</strong><span>pedidos</span></div></article>`).join('');
}

function navigate(viewName) {
  $$('.view').forEach((view) => view.classList.toggle('active', view.id === `view-${viewName}`));
  $$('.nav-item').forEach((item) => item.classList.toggle('active', item.dataset.view === viewName));
  const activeItem = $(`.nav-item[data-view="${viewName}"]`);
  $('#breadcrumb-current').textContent = activeItem ? activeItem.textContent.trim().replace(/^\S+\s/, '') : viewName;
  $('#sidebar').classList.remove('open');
}

function showToast(message) {
  const toast = $('#toast');
  toast.textContent = message;
  toast.classList.add('visible');
  clearTimeout(showToast.timeout);
  showToast.timeout = setTimeout(() => toast.classList.remove('visible'), 2800);
}

function openOrderModal() {
  const customerOptions = state.customers.map((customer) => `<option>${customer.name}</option>`).join('');
  const productOptions = state.products.map((product) => `<option>${product.name}</option>`).join('');
  $('#form-customer').innerHTML = customerOptions;
  $('#form-product').innerHTML = productOptions;
  $('#form-date').value = new Date().toISOString().split('T')[0];
  $('#order-modal').hidden = false;
  $('#form-customer').focus();
}

function closeOrderModal() {
  $('#order-modal').hidden = true;
  $('#order-form').reset();
}

function addOrder(event) {
  event.preventDefault();
  const nextNumber = 1042 + state.orders.length - 8;
  const customer = $('#form-customer').value;
  const product = $('#form-product').value;
  state.orders.unshift({ id: `#PP-${nextNumber}`, customer, products: `${product} x1`, date: 'Hoy, ahora', total: '$120', status: 'Preparacion' });
  saveOrders();
  renderOrders();
  closeOrderModal();
  navigate('orders');
  showToast('Pedido creado correctamente');
}

$$('.nav-item').forEach((item) => item.addEventListener('click', () => navigate(item.dataset.view)));
$$('[data-view-target]').forEach((item) => item.addEventListener('click', () => navigate(item.dataset.viewTarget)));
$('#menu-toggle').addEventListener('click', () => $('#sidebar').classList.toggle('open'));
$('#new-order-button').addEventListener('click', openOrderModal);
$('#orders-new-button').addEventListener('click', openOrderModal);
$('#quick-order').addEventListener('click', openOrderModal);
$$('[data-close-modal]').forEach((button) => button.addEventListener('click', closeOrderModal));
$('#order-form').addEventListener('submit', addOrder);
$('#order-modal').addEventListener('click', (event) => { if (event.target.id === 'order-modal') closeOrderModal(); });
$('#order-search').addEventListener('input', renderOrders);
$('#order-filter').addEventListener('change', renderOrders);
$('#notification-button').addEventListener('click', () => showToast('No hay notificaciones nuevas'));
$('#product-add-button').addEventListener('click', () => showToast('Catalogo listo para agregar productos'));
$('#customer-add-button').addEventListener('click', () => showToast('Formulario de clientes disponible en la proxima iteracion'));

renderOrders();
renderProducts();
renderCustomers();
