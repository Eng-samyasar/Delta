/**
 * catalog.js
 * إدارة تفاعلات وفلترة والبحث في مجالات التوريد الـ 12 والنوافذ المنبثقة
 * شركة دلتا للتوريدات العمومية
 */

import { siteConfig } from './site-config.js';

export function initCatalog() {
  const catalogGrid = document.getElementById('catalog-grid');
  const categorySelect = document.getElementById('form-category');
  const searchInput = document.getElementById('catalog-search-input');
  const filterTabs = document.querySelectorAll('.filter-tab-btn');
  const counterBadge = document.getElementById('catalog-count-badge');
  const modalOverlay = document.getElementById('sector-modal-overlay');
  const modalCloseBtn = document.getElementById('sector-modal-close');
  const modalBody = document.getElementById('sector-modal-body');

  // تعبئة خيارات مجالات التوريد في القائمة المنسدلة للفورم
  if (categorySelect && siteConfig.categories) {
    categorySelect.innerHTML = '<option value="" disabled selected>اختر مجال التوريد المطلوب...</option>';
    siteConfig.categories.forEach(cat => {
      const option = document.createElement('option');
      option.value = cat.id;
      option.textContent = `${cat.code} — ${cat.title}`;
      categorySelect.appendChild(option);
    });
  }

  // توليد كروت الكتالوج الغنية مع الصور الحقيقية والتفاصيل إن كانت الحاوية ديناميكية
  if (catalogGrid && siteConfig.categories) {
    renderCatalogCards(siteConfig.categories);
  }

  function renderCatalogCards(categoriesToRender) {
    if (!catalogGrid) return;
    catalogGrid.innerHTML = '';

    if (categoriesToRender.length === 0) {
      catalogGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: var(--space-8); background: var(--color-surface-card); border-radius: var(--radius-md); border: 1px dashed var(--color-border-subtle);">
          <p style="font-size: var(--text-base); color: var(--color-text-muted); margin-bottom: var(--space-3);">لم يتم العثور على نتائج مطابقة لبحثك.</p>
          <button type="button" class="btn btn-outline btn-sm" id="btn-reset-filters">إعادة ضبط البحث وعرض كافة المجالات</button>
        </div>
      `;
      const resetBtn = document.getElementById('btn-reset-filters');
      resetBtn?.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        filterTabs.forEach(t => t.classList.remove('is-active'));
        document.querySelector('[data-filter="all"]')?.classList.add('is-active');
        renderCatalogCards(siteConfig.categories);
      });
      if (counterBadge) counterBadge.textContent = 'عرض 0 من 12 مجالأ';
      return;
    }

    categoriesToRender.forEach(cat => {
      const card = document.createElement('article');
      card.className = 'catalog-card reveal-init';
      card.setAttribute('data-category-id', cat.id);
      card.setAttribute('data-group', cat.group);

      const itemsListHtml = cat.items.slice(0, 4).map(item => `
        <li class="catalog-item-row">${item}</li>
      `).join('');

      card.innerHTML = `
        <div class="catalog-img-wrap">
          <img src="${cat.image}" alt="${cat.title} - دلتا للتوريدات" loading="lazy" width="400" height="250">
          <div class="catalog-img-badge">${cat.deliveryTime || 'توصيل فوري'}</div>
        </div>

        <div class="catalog-top">
          <span class="catalog-code">${cat.code}</span>
          <span class="badge-outline" style="font-size: 0.7rem;">${cat.specs.split('،')[0]}</span>
        </div>

        <div>
          <h3 class="catalog-title">${cat.title}</h3>
          <div class="catalog-subtitle">${cat.subtitle}</div>
          <ul class="catalog-items-list">
            ${itemsListHtml}
          </ul>
        </div>

        <div style="display: flex; gap: var(--space-2); margin-top: var(--space-3);">
          <button type="button" class="btn-sector-modal" data-modal-category="${cat.id}" style="flex: 1; padding: 0.5rem; font-size: var(--text-xs); border: 1px solid var(--color-border-subtle); border-radius: var(--radius-sm); color: var(--color-navy-800); background: var(--color-surface-bg); font-weight: bold; cursor: pointer;" aria-label="عرض تفاصيل ومواصفات ${cat.title}">
            المواصفات الفنية
          </button>
          <button type="button" class="catalog-action-btn" data-request-category="${cat.id}" style="flex: 1.2;" aria-label="اطلب توريدات ${cat.title}">
            <span>اطلب المجال</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="9 18 15 12 9 6"></polyline></svg>
          </button>
        </div>
      `;

      catalogGrid.appendChild(card);
    });

    if (counterBadge) {
      counterBadge.textContent = `عرض ${categoriesToRender.length} من أصل 12 مجالأ معتمداً`;
    }
  }

  // منطق الفلترة والبحث المباشر
  function applyFilters() {
    const query = (searchInput?.value || '').trim().toLowerCase();
    const activeTab = document.querySelector('.filter-tab-btn.is-active')?.getAttribute('data-filter') || 'all';

    const filtered = siteConfig.categories.filter(cat => {
      const matchesGroup = (activeTab === 'all') || (cat.group === activeTab);
      const textToSearch = `${cat.title} ${cat.subtitle} ${cat.items.join(' ')} ${cat.specs}`.toLowerCase();
      const matchesQuery = !query || textToSearch.includes(query);
      return matchesGroup && matchesQuery;
    });

    renderCatalogCards(filtered);
  }

  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('is-active'));
      tab.classList.add('is-active');
      applyFilters();
    });
  });

  // فتح نافذة تفاصيل ومواصفات المجال (Modal)
  document.addEventListener('click', (e) => {
    const modalBtn = e.target.closest('[data-modal-category]');
    if (modalBtn) {
      e.preventDefault();
      const catId = modalBtn.getAttribute('data-modal-category');
      const cat = siteConfig.categories.find(c => c.id === catId);
      if (!cat || !modalOverlay || !modalBody) return;

      modalBody.innerHTML = `
        <div style="border-radius: var(--radius-md); overflow: hidden; margin-bottom: var(--space-4); max-height: 220px;">
          <img src="${cat.image}" alt="${cat.title}" style="width: 100%; height: 100%; object-fit: cover;">
        </div>
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-2);">
          <span class="catalog-code" style="font-size: 1rem;">${cat.code}</span>
          <span class="badge-delta">${cat.deliveryTime}</span>
        </div>
        <h3 style="font-size: var(--text-xl); margin-bottom: 4px;">${cat.title}</h3>
        <p style="color: var(--color-amber-600); font-weight: bold; font-size: var(--text-sm); margin-bottom: var(--space-4);">${cat.subtitle}</p>

        <h4 style="font-size: var(--text-sm); margin-bottom: var(--space-2); border-bottom: 1px solid var(--color-border-subtle); padding-bottom: 4px;">أهم الأصناف والمهمات المتاحة للتوريد:</h4>
        <ul style="margin-inline-start: var(--space-4); margin-bottom: var(--space-4); line-height: 1.8; font-size: var(--text-sm); color: var(--color-text-muted);">
          ${cat.items.map(item => `<li>${item}</li>`).join('')}
        </ul>

        <div style="background: var(--color-surface-bg); padding: var(--space-3); border-radius: var(--radius-sm); margin-bottom: var(--space-4); font-size: var(--text-xs); border: 1px solid var(--color-border-subtle);">
          <strong>المواصفات والاعتمادات:</strong> ${cat.specs}
        </div>

        <button type="button" class="btn btn-primary" data-request-category="${cat.id}" style="width: 100%;" id="btn-modal-rfq">
          اطلب تسعير ومقايسة لهذا المجال فوراً
        </button>
      `;

      modalOverlay.classList.add('is-active');
      document.body.style.overflow = 'hidden';

      // زر الطلب من داخل المودال
      document.getElementById('btn-modal-rfq')?.addEventListener('click', () => {
        closeModal();
      });
    }

    // الاستماع لزر طلب المجال
    const rfqBtn = e.target.closest('[data-request-category]');
    if (rfqBtn) {
      e.preventDefault();
      const categoryId = rfqBtn.getAttribute('data-request-category');

      if (categorySelect) {
        categorySelect.value = categoryId;
        categorySelect.dispatchEvent(new Event('change'));
      }

      const targetSection = document.getElementById('quote-card') || document.getElementById('contact');
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        targetSection.style.transition = 'box-shadow 0.4s ease, border-color 0.4s ease';
        targetSection.style.borderColor = 'var(--color-amber-500)';
        targetSection.style.boxShadow = '0 0 0 4px rgba(240, 194, 46, 0.35)';

        setTimeout(() => {
          targetSection.style.borderColor = '';
          targetSection.style.boxShadow = '';
        }, 1500);

        const nameInput = document.getElementById('form-name');
        if (nameInput) {
          setTimeout(() => nameInput.focus(), 600);
        }
      }
    }
  });

  function closeModal() {
    if (modalOverlay) {
      modalOverlay.classList.remove('is-active');
      document.body.style.overflow = '';
    }
  }

  modalCloseBtn?.addEventListener('click', closeModal);
  modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay?.classList.contains('is-active')) {
      closeModal();
    }
  });
}
