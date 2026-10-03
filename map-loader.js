/**
 * map-loader.js
 * تحميل خريطة جوجل بنظام النقر حسب الطلب (Click-to-Load)
 * يحمي سرعة تحميل الصفحة ويوفر بيانات المستخدم والخصوصية
 * شركة دلتا للتوريدات العمومية
 */

import { siteConfig } from './site-config.js';

export function initMapLoader() {
  const mapContainer = document.getElementById('map-container');
  const loadMapBtn = document.getElementById('btn-load-map');
  const placeholder = document.getElementById('map-placeholder');

  if (!mapContainer || !loadMapBtn) return;

  function loadGoogleMap() {
    if (mapContainer.querySelector('iframe')) return; // تم التحميل مسبقاً

    const iframe = document.createElement('iframe');
    iframe.src = siteConfig.company.headquarters.mapEmbedUrl;
    iframe.className = 'map-iframe';
    iframe.title = 'موقع شركة دلتا للتوريدات العمومية على خريطة جوجل - كفر الشيخ، مصر';
    iframe.allowFullscreen = false;
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'no-referrer-when-downgrade';

    if (placeholder) {
      placeholder.style.display = 'none';
    }

    mapContainer.appendChild(iframe);
  }

  loadMapBtn.addEventListener('click', (e) => {
    e.preventDefault();
    loadGoogleMap();
  });

  if (placeholder) {
    placeholder.addEventListener('click', (e) => {
      e.preventDefault();
      loadGoogleMap();
    });
  }
}
