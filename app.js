/* ============================================================
   app.js — لوميير | متجر إلكتروني (النسخة 2.0)
   يشمل: سلة المشتريات + Checkout + WhatsApp API + Admin Dashboard
   ============================================================ */

'use strict';

/* ============================================================
   ١. الإعدادات الثابتة
   ============================================================ */

/** رقم واتساب المالك (بدون + أو 00) */
const WHATSAPP_NUMBER = '201040894329'; // ← تعديل الرقم هنا

/** كلمة مرور لوحة التحكم (مشفرة بـ Base64 للحماية البسيطة) */
const ADMIN_PASSWORD_HASH = btoa('lumiere2026admin'); // كلمة المرور: lumiere2026admin

/* ============================================================
   ٢. بيانات المنتجات الافتراضية
   ============================================================ */
const DEFAULT_PRODUCTS = [
  { id: 1, name: 'سماعات لاسلكية نويز كانسلينج', category: 'electronics', categoryLabel: 'إلكترونيات', price: 349, rating: 4.8, reviews: 1240, image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80' },
  { id: 2, name: 'ساعة ذكية سبورت برو', category: 'electronics', categoryLabel: 'إلكترونيات', price: 599, rating: 4.7, reviews: 872, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80' },
  { id: 3, name: 'كاميرا ميرورلس احترافية', category: 'electronics', categoryLabel: 'إلكترونيات', price: 2299, rating: 4.9, reviews: 543, image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=500&q=80' },
  { id: 4, name: 'جاكيت جلد كلاسيكي', category: 'fashion', categoryLabel: 'أزياء', price: 189, rating: 4.6, reviews: 398, image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&q=80' },
  { id: 5, name: 'حذاء رياضي فاخر', category: 'fashion', categoryLabel: 'أزياء', price: 260, rating: 4.8, reviews: 1102, image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80' },
  { id: 6, name: 'حقيبة يد جلدية إيطالية', category: 'fashion', categoryLabel: 'أزياء', price: 420, rating: 4.9, reviews: 318, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500&q=80' },
  { id: 7, name: 'مجموعة عطور فاخرة', category: 'beauty', categoryLabel: 'الجمال', price: 145, rating: 4.7, reviews: 659, image: 'https://images.unsplash.com/photo-1541643600914-78b084683702?w=500&q=80' },
  { id: 8, name: 'كريم مرطب طبيعي فاخر', category: 'beauty', categoryLabel: 'الجمال', price: 89, rating: 4.6, reviews: 892, image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=500&q=80' },
  { id: 9, name: 'مجموعة شمعات معطرة', category: 'home', categoryLabel: 'المنزل', price: 75, rating: 4.8, reviews: 476, image: 'https://images.unsplash.com/photo-1602178506450-2a3e95124f1b?w=500&q=80' },
  { id: 10, name: 'طقم أواني سيراميك مميز', category: 'home', categoryLabel: 'المنزل', price: 195, rating: 4.7, reviews: 284, image: 'https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?w=500&q=80' },
  { id: 11, name: 'حصيرة يوغا احترافية', category: 'sport', categoryLabel: 'رياضة', price: 95, rating: 4.8, reviews: 720, image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&q=80' },
  { id: 12, name: 'دراجة ثابتة ذكية', category: 'sport', categoryLabel: 'رياضة', price: 1850, rating: 4.9, reviews: 215, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80' },
  { id: 12, name: 'دراجة ثابتة ذكية', category: 'sport', categoryLabel: 'رياضة', price: 1850, rating: 4.9, reviews: 215, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80' },
  { id: 12, name: 'دراجة ثابتة ذكية', category: 'sport', categoryLabel: 'رياضة', price: 1850, rating: 4.9, reviews: 215, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80' },
  { id: 12, name: 'دراجة ثابتة ذكية', category: 'sport', categoryLabel: 'رياضة', price: 1850, rating: 4.9, reviews: 215, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80' },
  { id: 12, name: 'دراجة ثابتة ذكية', category: 'sport', categoryLabel: 'رياضة', price: 1850, rating: 4.9, reviews: 215, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80' },
  { id: 12, name: 'دراجة ثابتة ذكية', category: 'sport', categoryLabel: 'رياضة', price: 1850, rating: 4.9, reviews: 215, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80' },
  { id: 12, name: 'دراجة ثابتة ذكية', category: 'sport', categoryLabel: 'رياضة', price: 1850, rating: 4.9, reviews: 215, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80' },
  { id: 12, name: 'دراجة ثابتة ذكية', category: 'sport', categoryLabel: 'رياضة', price: 1850, rating: 4.9, reviews: 215, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80' },
  { id: 12, name: 'دراجة ثابتة ذكية', category: 'sport', categoryLabel: 'رياضة', price: 1850, rating: 4.9, reviews: 215, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80' },
  { id: 12, name: 'دراجة ثابتة ذكية', category: 'sport', categoryLabel: 'رياضة', price: 1850, rating: 4.9, reviews: 215, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80' },
  { id: 12, name: 'دراجة ثابتة ذكية', category: 'sport', categoryLabel: 'رياضة', price: 1850, rating: 4.9, reviews: 215, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80' },
  { id: 12, name: 'دراجة ثابتة ذكية', category: 'sport', categoryLabel: 'رياضة', price: 1850, rating: 4.9, reviews: 215, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80' },
  { id: 12, name: 'دراجة ثابتة ذكية', category: 'sport', categoryLabel: 'رياضة', price: 1850, rating: 4.9, reviews: 215, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80' },
  { id: 12, name: 'دراجة ثابتة ذكية', category: 'sport', categoryLabel: 'رياضة', price: 1850, rating: 4.9, reviews: 215, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80' },
  { id: 12, name: 'دراجة ثابتة ذكية', category: 'sport', categoryLabel: 'رياضة', price: 1850, rating: 4.9, reviews: 215, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80' },
  { id: 12, name: 'دراجة ثابتة ذكية', category: 'sport', categoryLabel: 'رياضة', price: 1850, rating: 4.9, reviews: 215, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80' },
  { id: 12, name: 'دراجة ثابتة ذكية', category: 'sport', categoryLabel: 'رياضة', price: 1850, rating: 4.9, reviews: 215, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80' },
  { id: 12, name: 'دراجة ثابتة ذكية', category: 'sport', categoryLabel: 'رياضة', price: 1850, rating: 4.9, reviews: 215, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80' },
  { id: 12, name: 'دراجة ثابتة ذكية', category: 'sport', categoryLabel: 'رياضة', price: 1850, rating: 4.9, reviews: 215, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80' },
  { id: 12, name: 'دراجة ثابتة ذكية', category: 'sport', categoryLabel: 'رياضة', price: 1850, rating: 4.9, reviews: 215, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80' },
  { id: 12, name: 'دراجة ثابتة ذكية', category: 'sport', categoryLabel: 'رياضة', price: 1850, rating: 4.9, reviews: 215, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80' },
  { id: 12, name: 'دراجة ثابتة ذكية', category: 'sport', categoryLabel: 'رياضة', price: 1850, rating: 4.9, reviews: 215, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80' },
  { id: 12, name: 'دراجة ثابتة ذكية', category: 'sport', categoryLabel: 'رياضة', price: 1850, rating: 4.9, reviews: 215, image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80' },
];

/* ============================================================
   ٣. حالة التطبيق (State)
   ============================================================ */
const state = {
  products:       [],   // المنتجات الحالية (قد تتغير عبر الأدمن)
  cart:           [],
  wishlist:       [],
  searchQuery:    '',
  activeCategory: 'all',
  isAdmin:        false,           // هل المالك مسجّل دخوله؟
  pendingDeleteId: null,           // معرّف المنتج المنتظر الحذف
};

/* ============================================================
   ٤. مساعدات DOM
   ============================================================ */
const $ = id => document.getElementById(id);
const $q = sel => document.querySelector(sel);
const $$ = sel => document.querySelectorAll(sel);

/* ===== مراجع العناصر ===== */
const DOM = {
  /* المنتجات */
  productsGrid:       $('productsGrid'),
  noResults:          $('noResults'),
  resultsCount:       $('resultsCount'),
  addProductBtn:      $('addProductBtn'),
  /* السلة */
  cartBadge:          $('cartBadge'),
  cartBtn:            $('cartBtn'),
  cartClose:          $('cartClose'),
  cartDrawer:         $('cartDrawer'),
  cartOverlay:        $('cartOverlay'),
  cartBody:           $('cartBody'),
  cartFooter:         $('cartFooter'),
  cartEmpty:          $('cartEmpty'),
  subtotalAmount:     $('subtotalAmount'),
  totalAmount:        $('totalAmount'),
  continueShopping:   $('continueShopping'),
  checkoutBtn:        $('checkoutBtn'),
  /* بحث */
  searchInput:        $('searchInput'),
  searchClear:        $('searchClear'),
  /* Navbar */
  navbar:             $('navbar'),
  menuToggle:         $('menuToggle'),
  adminBadge:         $('adminBadge'),
  adminLogoutBtn:     $('adminLogoutBtn'),
  /* Toast */
  toastContainer:     $('toastContainer'),
  /* Checkout Form Modal */
  checkoutFormModal:  $('checkoutFormModal'),
  checkoutFormClose:  $('checkoutFormClose'),
  checkoutFormCancel: $('checkoutFormCancel'),
  checkoutForm:       $('checkoutForm'),
  customerName:       $('customerName'),
  customerPhone:      $('customerPhone'),
  customerAddress:    $('customerAddress'),
  customerNotes:      $('customerNotes'),
  orderMiniSummary:   $('orderMiniSummary'),
  checkoutTotal:      $('checkoutTotal'),
  nameError:          $('nameError'),
  phoneError:         $('phoneError'),
  addressError:       $('addressError'),
  /* Success Modal */
  successModal:       $('successModal'),
  successModalClose:  $('successModalClose'),
  /* Admin Login Modal */
  adminLoginModal:    $('adminLoginModal'),
  adminLoginClose:    $('adminLoginClose'),
  adminLoginCancel:   $('adminLoginCancel'),
  adminLoginForm:     $('adminLoginForm'),
  adminPassword:      $('adminPassword'),
  adminPassError:     $('adminPassError'),
  secretAdminBtn:     $('secretAdminBtn'),
  /* Product Form Modal */
  productFormModal:   $('productFormModal'),
  productFormTitle:   $('productFormTitle'),
  productFormClose:   $('productFormClose'),
  productFormCancel:  $('productFormCancel'),
  productForm:        $('productForm'),
  productFormId:      $('productFormId'),
  pName:              $('pName'),
  pPrice:             $('pPrice'),
  pCategory:          $('pCategory'),
  pImage:             $('pImage'),
  pRating:            $('pRating'),
  pReviews:           $('pReviews'),
  /* Delete Modal */
  deleteModal:        $('deleteModal'),
  deleteModalText:    $('deleteModalText'),
  deleteCancelBtn:    $('deleteCancelBtn'),
  deleteConfirmBtn:   $('deleteConfirmBtn'),
};

/* ============================================================
   ٥. خرائط الفئات
   ============================================================ */
const CATEGORY_LABELS = {
  electronics: 'إلكترونيات',
  fashion:     'أزياء',
  home:        'المنزل',
  beauty:      'الجمال',
  sport:       'رياضة',
};

/* ============================================================
   ٦. Local Storage
   ============================================================ */
function saveProducts() { localStorage.setItem('lumiere_products', JSON.stringify(state.products)); }
function saveCart()     { localStorage.setItem('lumiere_cart',     JSON.stringify(state.cart));     }
function saveWishlist() { localStorage.setItem('lumiere_wishlist', JSON.stringify(state.wishlist)); }
function saveAdminSession() { sessionStorage.setItem('lumiere_admin', '1'); }
function clearAdminSession() { sessionStorage.removeItem('lumiere_admin'); }

function loadFromStorage() {
  /* المنتجات */
  const savedProducts = localStorage.getItem('lumiere_products');
  state.products = savedProducts ? JSON.parse(savedProducts) : JSON.parse(JSON.stringify(DEFAULT_PRODUCTS));

  /* السلة */
  const savedCart = localStorage.getItem('lumiere_cart');
  state.cart = savedCart ? JSON.parse(savedCart) : [];

  /* المفضلة */
  const savedWish = localStorage.getItem('lumiere_wishlist');
  state.wishlist = savedWish ? JSON.parse(savedWish) : [];

  /* جلسة المالك (sessionStorage تنتهي بإغلاق المتصفح) */
  state.isAdmin = sessionStorage.getItem('lumiere_admin') === '1';
}

/* ============================================================
   ٧. تنسيق الأرقام
   ============================================================ */
function formatPrice(amount) { return `${Number(amount).toLocaleString('ar-SA')} ر.س`; }

/* ============================================================
   ٨. منطق السلة
   ============================================================ */
function getTotal()    { return state.cart.reduce((s, i) => s + i.price * i.qty, 0); }
function getTotalQty() { return state.cart.reduce((s, i) => s + i.qty, 0); }

function addToCart(productId) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;
  const existing = state.cart.find(i => i.id === productId);
  if (existing) {
    existing.qty++;
    showToast(`تمت إضافة "${product.name}" (${existing.qty}) 🛍`, 'success');
  } else {
    state.cart.push({ ...product, qty: 1 });
    showToast(`أُضيف "${product.name}" إلى السلة ✦`, 'success');
  }
  saveCart(); updateCartUI(); updateCartBadge(); animateCartBtn();
}

function removeFromCart(productId) {
  const el = $q(`.cart-item[data-id="${productId}"]`);
  if (el) {
    el.classList.add('removing');
    setTimeout(() => { state.cart = state.cart.filter(i => i.id !== productId); saveCart(); updateCartUI(); updateCartBadge(); }, 300);
  } else {
    state.cart = state.cart.filter(i => i.id !== productId);
    saveCart(); updateCartUI(); updateCartBadge();
  }
}

function updateQty(productId, delta) {
  const item = state.cart.find(i => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) { removeFromCart(productId); return; }
  saveCart(); updateCartUI(); updateCartBadge();
}

function updateCartBadge() {
  const qty = getTotalQty();
  DOM.cartBadge.textContent = qty;
  DOM.cartBadge.classList.toggle('show', qty > 0);
}

function animateCartBtn() {
  DOM.cartBtn.style.transform = 'scale(1.3)';
  setTimeout(() => { DOM.cartBtn.style.transform = ''; }, 300);
}

/* ============================================================
   ٩. عرض السلة
   ============================================================ */
function updateCartUI() {
  const isEmpty = state.cart.length === 0;
  DOM.cartEmpty.classList.toggle('hidden', !isEmpty);
  DOM.cartFooter.classList.toggle('hidden', isEmpty);

  if (isEmpty) { DOM.cartBody.innerHTML = ''; return; }

  DOM.cartBody.innerHTML = state.cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <img class="cart-item-img" src="${item.image}" alt="${item.name}" loading="lazy"
           onerror="this.src='https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=200&q=60'" />
      <div>
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-price">${formatPrice(item.price * item.qty)}</p>
        <div class="qty-control">
          <button class="qty-btn" onclick="updateQty(${item.id},-1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="updateQty(${item.id},+1)">+</button>
        </div>
      </div>
      <div class="cart-item-actions">
        <button class="remove-btn" onclick="removeFromCart(${item.id})">✕</button>
      </div>
    </div>
  `).join('');

  const total = getTotal();
  DOM.subtotalAmount.textContent = formatPrice(total);
  DOM.totalAmount.textContent    = formatPrice(total);
}

function openCart()  { DOM.cartDrawer.classList.add('open'); DOM.cartOverlay.classList.add('open'); document.body.style.overflow = 'hidden'; updateCartUI(); }
function closeCart() { DOM.cartDrawer.classList.remove('open'); DOM.cartOverlay.classList.remove('open'); document.body.style.overflow = ''; }

/* ============================================================
   ١٠. نموذج إتمام الطلب (Checkout Form)
   ============================================================ */

/** فتح مودال نموذج الطلب */
function openCheckoutForm() {
  if (state.cart.length === 0) { showToast('السلة فارغة، أضف منتجات أولاً', 'error'); return; }

  /* بناء ملخص الطلب */
  DOM.orderMiniSummary.innerHTML = state.cart.map(item => `
    <div class="mini-item">
      <span class="mini-item-name">${item.name} × ${item.qty}</span>
      <span class="mini-item-detail">${formatPrice(item.price * item.qty)}</span>
    </div>
  `).join('');
  DOM.checkoutTotal.textContent = formatPrice(getTotal());

  /* مسح أخطاء سابقة */
  clearFormErrors();
  DOM.checkoutForm.reset();

  closeCart();
  setTimeout(() => {
    DOM.checkoutFormModal.classList.remove('hidden');
    DOM.customerName.focus();
  }, 350);
}

function closeCheckoutForm() { DOM.checkoutFormModal.classList.add('hidden'); }

/** التحقق من صحة النموذج */
function validateCheckoutForm() {
  let valid = true;
  clearFormErrors();

  const name    = DOM.customerName.value.trim();
  const phone   = DOM.customerPhone.value.trim();
  const address = DOM.customerAddress.value.trim();

  if (!name || name.length < 3) {
    showFieldError(DOM.customerName, DOM.nameError, 'الاسم مطلوب (٣ أحرف على الأقل)');
    valid = false;
  }
  if (!phone || !/^[0-9+\s\-]{8,15}$/.test(phone)) {
    showFieldError(DOM.customerPhone, DOM.phoneError, 'رقم هاتف غير صحيح');
    valid = false;
  }
  if (!address || address.length < 10) {
    showFieldError(DOM.customerAddress, DOM.addressError, 'يرجى إدخال عنوان تفصيلي');
    valid = false;
  }

  return valid;
}

function showFieldError(input, errorEl, message) {
  input.classList.add('error');
  errorEl.textContent = message;
}

function clearFormErrors() {
  [DOM.customerName, DOM.customerPhone, DOM.customerAddress].forEach(el => el.classList.remove('error'));
  [DOM.nameError, DOM.phoneError, DOM.addressError].forEach(el => el.textContent = '');
}

/* ============================================================
   ١١. إرسال الطلب عبر WhatsApp
   ============================================================ */

/**
 * بناء رسالة واتساب احترافية
 * @param {object} customer - بيانات العميل
 * @returns {string} رسالة منسقة
 */
function buildWhatsAppMessage(customer) {
  const divider = '─'.repeat(30);
  const now     = new Date().toLocaleString('ar-SA', { dateStyle: 'short', timeStyle: 'short' });

  // تفاصيل المنتجات
  const itemsText = state.cart.map((item, i) =>
    `${i + 1}. ${item.name}\n   الكمية: ${item.qty} × ${formatPrice(item.price)} = ${formatPrice(item.price * item.qty)}`
  ).join('\n\n');

  const message = `
🛍️ *طلب جديد — لوميير*
${divider}
📅 *التاريخ:* ${now}
${divider}
👤 *بيانات العميل:*
• الاسم: ${customer.name}
• الهاتف: ${customer.phone}
• العنوان: ${customer.address}
${customer.notes ? `• ملاحظات: ${customer.notes}` : ''}
${divider}
📦 *تفاصيل الطلب:*

${itemsText}

${divider}
💰 *الإجمالي: ${formatPrice(getTotal())}*
🚚 الشحن: مجاني
${divider}
✅ الرجاء تأكيد الطلب في أقرب وقت
  `.trim();

  return message;
}

/** فتح واتساب مع الرسالة */
function sendToWhatsApp(customer) {
  const message = buildWhatsAppMessage(customer);
  const encoded = encodeURIComponent(message);
  const url     = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
  window.open(url, '_blank', 'noopener');
}

/** معالج submit نموذج الطلب */
function handleCheckoutSubmit(e) {
  e.preventDefault();
  if (!validateCheckoutForm()) return;

  const customer = {
    name:    DOM.customerName.value.trim(),
    phone:   DOM.customerPhone.value.trim(),
    address: DOM.customerAddress.value.trim(),
    notes:   DOM.customerNotes.value.trim(),
  };

  /* إرسال واتساب */
  sendToWhatsApp(customer);

  /* تفريغ السلة */
  state.cart = [];
  saveCart();
  updateCartBadge();

  /* إغلاق المودال وعرض نجاح */
  closeCheckoutForm();
  setTimeout(() => { DOM.successModal.classList.remove('hidden'); }, 300);
}

/* ============================================================
   ١٢. لوحة تحكم المالك (Admin Dashboard)
   ============================================================ */

/** فتح مودال تسجيل دخول المالك */
function openAdminLogin() {
  DOM.adminLoginModal.classList.remove('hidden');
  DOM.adminPassword.value = '';
  DOM.adminPassError.textContent = '';
  setTimeout(() => DOM.adminPassword.focus(), 100);
}

function closeAdminLogin() { DOM.adminLoginModal.classList.add('hidden'); }

/** معالج تسجيل دخول المالك */
function handleAdminLogin(e) {
  e.preventDefault();
  const pass = DOM.adminPassword.value;

  if (btoa(pass) === ADMIN_PASSWORD_HASH) {
    state.isAdmin = true;
    saveAdminSession();
    closeAdminLogin();
    applyAdminMode();
    showToast('مرحباً! أنت الآن في وضع المالك ⚙', 'success');
  } else {
    DOM.adminPassError.textContent = 'كلمة المرور غير صحيحة';
    DOM.adminPassword.classList.add('error');
    DOM.adminPassword.value = '';
    DOM.adminPassword.focus();
    setTimeout(() => { DOM.adminPassword.classList.remove('error'); DOM.adminPassError.textContent = ''; }, 3000);
  }
}

/** تطبيق واجهة المالك */
function applyAdminMode() {
  DOM.adminBadge.classList.remove('hidden');
  DOM.adminLogoutBtn.classList.remove('hidden');
  DOM.addProductBtn.classList.remove('hidden');
  filterProducts(); // إعادة رسم المنتجات مع أزرار الإدارة
}

/** إلغاء وضع المالك */
function adminLogout() {
  state.isAdmin = false;
  clearAdminSession();
  DOM.adminBadge.classList.add('hidden');
  DOM.adminLogoutBtn.classList.add('hidden');
  DOM.addProductBtn.classList.add('hidden');
  filterProducts();
  showToast('تم تسجيل الخروج من وضع المالك', 'success');
}

/* ============================================================
   ١٣. CRUD المنتجات (Admin)
   ============================================================ */

/** توليد معرّف فريد للمنتجات الجديدة */
function generateId() { return Date.now(); }

/** فتح نموذج إضافة منتج جديد */
function openAddProductForm() {
  DOM.productFormTitle.textContent = '➕ إضافة منتج جديد';
  DOM.productFormId.value = '';
  DOM.productForm.reset();
  DOM.productFormModal.classList.remove('hidden');
}

/** فتح نموذج تعديل منتج موجود */
function openEditProductForm(productId) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;

  DOM.productFormTitle.textContent = '✏️ تعديل المنتج';
  DOM.productFormId.value = product.id;
  DOM.pName.value         = product.name;
  DOM.pPrice.value        = product.price;
  DOM.pCategory.value     = product.category;
  DOM.pImage.value        = product.image || '';
  DOM.pRating.value       = product.rating || 4.5;
  DOM.pReviews.value      = product.reviews || 0;

  DOM.productFormModal.classList.remove('hidden');
}

function closeProductForm() { DOM.productFormModal.classList.add('hidden'); }

/** معالج حفظ المنتج (إضافة أو تعديل) */
function handleProductFormSubmit(e) {
  e.preventDefault();

  const name     = DOM.pName.value.trim();
  const price    = parseFloat(DOM.pPrice.value);
  const category = DOM.pCategory.value;

  if (!name || isNaN(price) || !category) {
    showToast('يرجى ملء الحقول الإلزامية', 'error');
    return;
  }

  const productData = {
    name,
    price,
    category,
    categoryLabel: CATEGORY_LABELS[category] || category,
    image:    DOM.pImage.value.trim() || 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=500&q=80',
    rating:   parseFloat(DOM.pRating.value) || 4.5,
    reviews:  parseInt(DOM.pReviews.value)  || 0,
  };

  const editId = DOM.productFormId.value;

  if (editId) {
    /* تعديل منتج موجود */
    const index = state.products.findIndex(p => p.id === parseInt(editId));
    if (index !== -1) {
      state.products[index] = { ...state.products[index], ...productData };
      showToast(`تم تعديل "${name}" بنجاح ✦`, 'success');
    }
  } else {
    /* إضافة منتج جديد */
    state.products.push({ id: generateId(), ...productData });
    showToast(`تمت إضافة "${name}" بنجاح ✦`, 'success');
  }

  saveProducts();
  closeProductForm();
  filterProducts();
}

/** فتح مودال تأكيد الحذف */
function openDeleteConfirm(productId) {
  const product = state.products.find(p => p.id === productId);
  if (!product) return;
  state.pendingDeleteId = productId;
  DOM.deleteModalText.textContent = `هل أنت متأكد من حذف "${product.name}"؟ لا يمكن التراجع.`;
  DOM.deleteModal.classList.remove('hidden');
}

function closeDeleteModal() { DOM.deleteModal.classList.add('hidden'); state.pendingDeleteId = null; }

/** تنفيذ الحذف */
function confirmDelete() {
  if (!state.pendingDeleteId) return;
  const product = state.products.find(p => p.id === state.pendingDeleteId);
  state.products = state.products.filter(p => p.id !== state.pendingDeleteId);
  // إزالة من السلة أيضاً
  state.cart = state.cart.filter(i => i.id !== state.pendingDeleteId);
  saveProducts(); saveCart(); updateCartBadge(); updateCartUI();
  closeDeleteModal();
  filterProducts();
  showToast(`تم حذف "${product?.name || 'المنتج'}" بنجاح`, 'success');
}

/* ============================================================
   ١٤. عرض المنتجات (Rendering)
   ============================================================ */

/** توليد HTML لبطاقة منتج واحدة */
function createProductCard(product, index) {
  const stars    = '★'.repeat(Math.min(Math.round(product.rating), 5)) + '☆'.repeat(Math.max(5 - Math.round(product.rating), 0));
  const isWished = state.wishlist.includes(product.id);

  /* شريط أدوات المالك (يظهر فقط في وضع الإدارة) */
  const adminToolbar = state.isAdmin ? `
    <div class="admin-card-toolbar">
      <button class="admin-card-btn admin-edit-btn" onclick="openEditProductForm(${product.id})">✏ تعديل</button>
      <button class="admin-card-btn admin-delete-btn" onclick="openDeleteConfirm(${product.id})">🗑 حذف</button>
    </div>
  ` : '';

  return `
    <article class="product-card ${state.isAdmin ? 'admin-mode' : ''}" data-id="${product.id}" style="animation-delay:${index * 0.06}s">
      ${adminToolbar}
      <div class="product-img-wrap">
        <img class="product-img" src="${product.image}" alt="${product.name}" loading="lazy"
             onerror="this.src='https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=500&q=80'" />
        <span class="product-badge">${product.categoryLabel}</span>
        <button class="product-wish ${isWished ? 'active' : ''}" onclick="toggleWishlist(${product.id},event)" aria-label="المفضلة">
          ${isWished ? '❤️' : '🤍'}
        </button>
      </div>
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <div class="product-meta">
          <span class="product-price">${formatPrice(product.price)}</span>
          <div class="product-rating">
            <span class="rating-stars">${stars}</span>
            <span>(${Number(product.reviews).toLocaleString('ar-SA')})</span>
          </div>
        </div>
        <button class="add-to-cart-btn" onclick="handleAddToCart(${product.id},this)">
          <span>🛒</span><span>إضافة للسلة</span>
        </button>
      </div>
    </article>
  `;
}

/** معالج "إضافة للسلة" مع تأثير بصري */
function handleAddToCart(productId, btn) {
  addToCart(productId);
  const orig = btn.innerHTML;
  btn.classList.add('added');
  btn.innerHTML = '<span>✓</span><span>أُضيف!</span>';
  setTimeout(() => { btn.classList.remove('added'); btn.innerHTML = orig; }, 1500);
}

/** تبديل المفضلة */
function toggleWishlist(productId, event) {
  event.stopPropagation();
  const btn = event.currentTarget;
  const idx = state.wishlist.indexOf(productId);
  if (idx === -1) {
    state.wishlist.push(productId);
    btn.innerHTML = '❤️';
    btn.classList.add('active');
    showToast('أُضيف إلى المفضلة ❤️', 'success');
  } else {
    state.wishlist.splice(idx, 1);
    btn.innerHTML = '🤍';
    btn.classList.remove('active');
  }
  saveWishlist();
}

/** رسم قائمة منتجات */
function renderProducts(products) {
  if (products.length === 0) {
    DOM.productsGrid.innerHTML = '';
    DOM.noResults.classList.remove('hidden');
    DOM.resultsCount.textContent = 'لا توجد نتائج';
    return;
  }
  DOM.noResults.classList.add('hidden');
  DOM.resultsCount.textContent = products.length === state.products.length ? 'عرض جميع المنتجات' : `${products.length} نتيجة`;
  DOM.productsGrid.innerHTML = products.map((p, i) => createProductCard(p, i)).join('');
}

/* ============================================================
   ١٥. البحث والفلترة
   ============================================================ */
function filterProducts() {
  const q   = state.searchQuery.toLowerCase().trim();
  const cat = state.activeCategory;
  const filtered = state.products.filter(p =>
    (q === '' || p.name.toLowerCase().includes(q)) &&
    (cat === 'all' || p.category === cat)
  );
  renderProducts(filtered);
}

let searchTimeout;
function handleSearch(value) {
  clearTimeout(searchTimeout);
  state.searchQuery = value;
  DOM.searchClear.classList.toggle('visible', value.length > 0);
  searchTimeout = setTimeout(filterProducts, 250);
}

function handleCategorySelect(catBtns, clickedBtn) {
  catBtns.forEach(b => b.classList.remove('active'));
  clickedBtn.classList.add('active');
  state.activeCategory = clickedBtn.dataset.cat;
  filterProducts();
}

/* ============================================================
   ١٦. Toast
   ============================================================ */
function showToast(message, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `<span>${type === 'success' ? '✦' : '⚠'}</span><span>${message}</span>`;
  DOM.toastContainer.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('toast-out');
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

/* ============================================================
   ١٧. ربط الأحداث
   ============================================================ */
function bindEvents() {

  /* --- السلة --- */
  DOM.cartBtn.addEventListener('click', openCart);
  DOM.cartClose.addEventListener('click', closeCart);
  DOM.cartOverlay.addEventListener('click', closeCart);
  DOM.continueShopping.addEventListener('click', closeCart);

  /* --- Checkout --- */
  DOM.checkoutBtn.addEventListener('click', openCheckoutForm);
  DOM.checkoutFormClose.addEventListener('click', closeCheckoutForm);
  DOM.checkoutFormCancel.addEventListener('click', closeCheckoutForm);
  DOM.checkoutForm.addEventListener('submit', handleCheckoutSubmit);
  DOM.successModalClose.addEventListener('click', () => DOM.successModal.classList.add('hidden'));

  /* --- البحث --- */
  DOM.searchInput.addEventListener('input', e => handleSearch(e.target.value));
  DOM.searchClear.addEventListener('click', () => { DOM.searchInput.value = ''; handleSearch(''); DOM.searchInput.focus(); });

  /* --- الفئات --- */
  const catBtns = $$('.cat-btn');
  catBtns.forEach(btn => btn.addEventListener('click', () => handleCategorySelect(catBtns, btn)));

  /* --- Admin Login --- */
  DOM.secretAdminBtn.addEventListener('click', openAdminLogin);
  DOM.adminLoginClose.addEventListener('click', closeAdminLogin);
  DOM.adminLoginCancel.addEventListener('click', closeAdminLogin);
  DOM.adminLoginForm.addEventListener('submit', handleAdminLogin);
  DOM.adminLogoutBtn.addEventListener('click', adminLogout);

  /* --- Admin Product CRUD --- */
  DOM.addProductBtn.addEventListener('click', openAddProductForm);
  DOM.productFormClose.addEventListener('click', closeProductForm);
  DOM.productFormCancel.addEventListener('click', closeProductForm);
  DOM.productForm.addEventListener('submit', handleProductFormSubmit);

  /* --- Delete Modal --- */
  DOM.deleteCancelBtn.addEventListener('click', closeDeleteModal);
  DOM.deleteConfirmBtn.addEventListener('click', confirmDelete);

  /* --- إغلاق المودالات بالنقر على الخلفية --- */
  [DOM.checkoutFormModal, DOM.successModal, DOM.adminLoginModal, DOM.productFormModal, DOM.deleteModal].forEach(modal => {
    modal.addEventListener('click', e => { if (e.target === modal) modal.classList.add('hidden'); });
  });

  /* --- Scroll effect على الناف بار --- */
  window.addEventListener('scroll', () => { DOM.navbar.classList.toggle('scrolled', window.scrollY > 20); }, { passive: true });

  /* --- Escape لإغلاق أي مودال مفتوح --- */
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    closeCart();
    [DOM.checkoutFormModal, DOM.successModal, DOM.adminLoginModal, DOM.productFormModal, DOM.deleteModal].forEach(m => m.classList.add('hidden'));
  });

  /* --- موبايل: زر القائمة --- */
  DOM.menuToggle.addEventListener('click', openCart);
}

/* ============================================================
   ١٨. تهيئة التطبيق
   ============================================================ */
function init() {
  loadFromStorage();
  updateCartBadge();
  filterProducts();
  bindEvents();

  /* استعادة وضع المالك إذا كانت الجلسة نشطة */
  if (state.isAdmin) { applyAdminMode(); }

  console.log('%c✦ لوميير — متجر إلكتروني v2.0', 'color:#c9a96e;font-size:16px;font-weight:bold;');
  console.log('%cAdmin Panel: اضغط الزر السري في الأسفل', 'color:#7c5cbf;font-size:12px;');
}

document.addEventListener('DOMContentLoaded', init);