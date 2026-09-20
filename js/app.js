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

function setText(selector, value) {
  const element = $(selector);
  if (element) element.textContent = value;
}

function bind(selector, eventName, handler) {
  const element = $(selector);
  if (element) element.addEventListener(eventName, handler);
}

function getStatusTotals() {
  return state.orders.reduce((totals, order) => {
    totals[order.status] = (totals[order.status] || 0) + 1;
    return totals;
  }, { Preparacion: 0, Camino: 0, Entregado: 0 });
}

function renderDashboardStats() {
  const totals = getStatusTotals();
  const totalOrders = state.orders.length;
  const active = totalOrders - totals.Entregado;

  setText('#active-orders', active);
  setText('#delivery-total', totals.Camino);
  setText('#chart-total', totalOrders);
  setText('#customer-total', state.customers.length);
  setText('#orders-count', totalOrders);
  setText('#prep-total', totals.Preparacion);
  setText('#way-total', totals.Camino);
  setText('#done-total', totals.Entregado);

  const donut = $('#status-donut');
  if (donut && totalOrders > 0) {
    const doneEnd = (totals.Entregado / totalOrders) * 100;
    const wayEnd = doneEnd + (totals.Camino / totalOrders) * 100;
    donut.style.background = `conic-gradient(var(--green) 0 ${doneEnd}%, var(--blue) ${doneEnd}% ${wayEnd}%, var(--yellow) ${wayEnd}% 100%)`;
  }
}

function getNextOrderNumber() {
  const orderNumbers = state.orders
    .map((order) => Number(order.id.replace('#PP-', '')))
    .filter(Number.isFinite);
  return Math.max(1041, ...orderNumbers) + 1;
}

function formatDeliveryDate(value) {
  if (!value) return 'Hoy, ahora';
  const date = new Date(`${value}T00:00:00`);
  const today = new Date();
  const sameDay = date.toDateString() === today.toDateString();
  if (sameDay) return 'Hoy, ahora';
  return new Intl.DateTimeFormat('es-EC', { day: 'numeric', month: 'short' }).format(date);
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
    const filtered = state.orders.filter((order) => {
      const matchesText = `${order.id} ${order.customer}`.toLowerCase().includes(query);
      return matchesText && (filter === 'all' || order.status === filter);
    });
    all.innerHTML = filtered.length ? filtered.map((order) => renderOrderRow(order, true)).join('') : '<tr><td colspan="7">No hay pedidos que coincidan con la busqueda.</td></tr>';
  }
  renderDashboardStats();
  $$('.row-menu').forEach((button) => button.addEventListener('click', () => cycleOrderStatus(button.dataset.orderId)));
}

function cycleOrderStatus(id) {
  const order = state.orders.find((item) => item.id === id);
  if (!order) return;
  const statuses = ['Preparacion', 'Camino', 'Entregado'];
  const currentIndex = statuses.indexOf(order.status);
  order.status = statuses[((currentIndex < 0 ? 0 : currentIndex) + 1) % statuses.length];
  saveOrders();
  renderOrders();
  showToast(`${id} actualizado: ${statusLabel(order.status)}`);
}

function renderProducts() {
  const grid = $('#product-grid');
  if (!grid) return;
  grid.innerHTML = state.products.map((product) => {
    const stockNumber = Number.parseInt(product.stock, 10);
    const stockClass = Number.isFinite(stockNumber) && stockNumber <= 6 ? 'low' : '';
    return `<article class="product-card"><div class="product-visual">${product.icon}</div><h3>${product.name}</h3><p>${product.description}</p><div class="product-meta"><strong>${product.price}</strong><span class="stock ${stockClass}">${product.stock}</span></div></article>`;
  }).join('');
}

function initials(name) {
  return name.split(' ').map((part) => part[0]).slice(0, 2).join('');
}

function renderCustomers() {
  const grid = $('#customer-grid');
  if (!grid) return;
  grid.innerHTML = state.customers.map((customer) => `<article class="customer-card"><div class="customer-large-avatar">${initials(customer.name)}</div><div><h3>${customer.name}</h3><p>${customer.email}</p></div><div class="customer-orders"><strong>${customer.orders}</strong><span>pedidos</span></div></article>`).join('');
  setText('#customer-total', state.customers.length);
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
  const customerOptions = state.customers.map((customer) => `<option value="${customer.name}">${customer.name}</option>`).join('');
  const productOptions = state.products.map((product) => `<option value="${product.name}">${product.name}</option>`).join('');
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
  const nextNumber = getNextOrderNumber();
  const customer = $('#form-customer').value;
  const productName = $('#form-product').value;
  const product = state.products.find((item) => item.name === productName);
  const deliveryDate = $('#form-date').value;
  state.orders.unshift({ id: `#PP-${nextNumber}`, customer, products: `${productName} x1`, date: formatDeliveryDate(deliveryDate), total: product?.price || '$0', status: 'Preparacion' });
  saveOrders();
  renderOrders();
  closeOrderModal();
  navigate('orders');
  showToast('Pedido creado correctamente');
}

$$('.nav-item').forEach((item) => item.addEventListener('click', () => navigate(item.dataset.view)));
$$('[data-view-target]').forEach((item) => item.addEventListener('click', () => navigate(item.dataset.viewTarget)));
bind('#menu-toggle', 'click', () => $('#sidebar').classList.toggle('open'));
bind('#new-order-button', 'click', openOrderModal);
bind('#orders-new-button', 'click', openOrderModal);
bind('#quick-order', 'click', openOrderModal);
$$('[data-close-modal]').forEach((button) => button.addEventListener('click', closeOrderModal));
bind('#order-form', 'submit', addOrder);
bind('#order-modal', 'click', (event) => { if (event.target.id === 'order-modal') closeOrderModal(); });
bind('#order-search', 'input', renderOrders);
bind('#order-filter', 'change', renderOrders);
bind('#notification-button', 'click', () => showToast('No hay notificaciones nuevas'));
bind('#product-add-button', 'click', () => showToast('Catalogo listo para agregar productos'));
bind('#customer-add-button', 'click', () => showToast('Formulario de clientes disponible en la proxima iteracion'));

renderOrders();
renderProducts();
renderCustomers();
