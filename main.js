/**
 * main.js
 * الكود البرمجي الشامل والمتكامل لشركة دلتا للتوريدات العمومية
 * يعمل فوراً ومباشرة سواء فُتح الملف بالمتصفح محلياً (file://) أو عبر خادم الويب (http/https)
 * خالي تماماً من أي إيموجي ويعتمد بنسبة 100% على أيقونات SVG
 */

(function () {
  'use strict';

  // إضافة فئة تفعيل الجافاسكريبت بعد التأكد من تحميل البيئة البرمجية
  document.documentElement.classList.add('js-ready');

  // ==========================================================================
  // 1. بيانات ومعلومات الشركة الموحدة (Site Config)
  // ==========================================================================
  const siteConfig = {
    company: {
      name: 'دلتا للتوريدات العمومية',
      legalName: 'شركة دلتا للتوريدات العمومية والتجارة',
      tagline: 'جودة في التوريد .. شريكك في نجاحك',
      headquarters: {
        governorate: 'محافظة كفر الشيخ',
        city: 'مدينة بلطيم',
        streetAddress: 'محافظة كفر الشيخ — مدينة بلطيم، جمهورية مصر العربية',
        workingHours: 'السبت — الخميس: 9:00 ص — 5:00 م (الجمعة عطلة)',
        mapEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d27376.93438514197!2d31.0700!3d31.5583!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f9d854e4c34a9b%3A0x633519890a8a65bb!2z2KjZhNi32YrZhdiMINmF2LHYp9mD2LIg2KjZhNi32YrZhdiMINmF2K3Yp9mB2LjYqSDZg9mB2LEg2KfZhNi02YrYrg!5e0!3m2!1sar!2seg!4v1700000000000!5m2!1sar!2seg'
      },
      email: 'info@deltasupplies-eg.com'
    },

    // أقسام الاتصال الأربعة
    departments: [
      {
        id: 'customer-service',
        name: 'خدمة العملاء',
        description: 'استفسارات عامة ومتابعة التوريدات الفورية',
        icon: 'headphones',
        numbers: [
          { raw: '01012345601', display: '010 1234 5601', label: 'خدمة العملاء - الخط الأول' },
          { raw: '01112345602', display: '011 1234 5602', label: 'خدمة العملاء - الخط الثاني' }
        ]
      },
      {
        id: 'marketing',
        name: 'التسويق والشراكات',
        description: 'الاتفاقيات والعقود وبناء الشراكات المؤسسية',
        icon: 'megaphone',
        numbers: [
          { raw: '01012345603', display: '010 1234 5603', label: 'التسويق والشراكات' }
        ]
      },
      {
        id: 'sales',
        name: 'المبيعات وعروض الأسعار',
        description: 'طلبات عروض الأسعار ومقايسات التوريد المباشر',
        icon: 'tag',
        numbers: [
          { raw: '01012345605', display: '010 1234 5605', label: 'المبيعات وعروض الأسعار' }
        ]
      },
      {
        id: 'management',
        name: 'الإدارة العامة',
        description: 'العقود الكبرى والمناقصات الحكومية',
        icon: 'briefcase',
        numbers: [
          { raw: '01012345607', display: '010 1234 5607', label: 'الإدارة - الخط الأول' },
          { raw: '01112345608', display: '011 1234 5608', label: 'الإدارة - الخط الثاني' }
        ]
      }
    ],

    // مجالات التوريد الـ 12 المعتمدة مع بيانات ومواصفات كل قطاع
    categories: [
      {
        id: 'contracting-construction',
        code: '01',
        group: 'construction',
        title: 'مقاولات وإنشاءات',
        subtitle: 'مواد بناء وتجهيز مواقع المشروعات الإنشائية',
        image: 'construction.webp',
        items: ['حديد تسليح بجميع الأقطار (عز، بشاي)', 'أسمنت معتمد بورتلاندي ومقاوم', 'أخشاب قوالب موسكي وبلايوود وبونتي', 'عُدد ومستلزمات تجهيز المواقع والمحطات'],
        specs: 'مطابقة للكود المصري للبناء، شهادات اختبار كسر وضغط معتمدة.',
        deliveryTime: 'خلال 24 ساعة لموقع العمل'
      },
      {
        id: 'factories-companies',
        code: '02',
        group: 'industrial',
        title: 'مصانع وشركات',
        subtitle: 'تجهيزات خطوط الإنتاج والتشغيل المستمر',
        image: 'industrial.webp',
        items: ['قطع غيار خطوط الإنتاج وماكينات التعبئة', 'خامات ومواد معالجة وكيماويات وسيطة', 'أدوات تشغيل هيدروليكية ونيوماتيكية', 'مستلزمات صيانة دورية، سيور، رولمان بلي'],
        specs: 'توريد مباشر طبقاً للكاتالوج الفني للماكينات.',
        deliveryTime: 'جدولة شحن دوري فوري'
      },
      {
        id: 'machinery-equipment',
        code: '03',
        group: 'industrial',
        title: 'معدات وآلات',
        subtitle: 'معدات ثقيلة وخفيفة ومحركات سحب ودفع',
        image: 'infrastructure.webp',
        items: ['معدات ثقيلة، لوادر، حفارات، أوناش شوكية', 'معدات ورش صناعية، مخارط، مقاشط', 'مواتير كهربائية ثلاثية الأوجه وديزل', 'كمبروسرات هواء صناعية حلزونية'],
        specs: 'ماركات عالمية معتمدة مع ضمان وتوفير قطع الغيار.',
        deliveryTime: 'تسليم بالموقع مع الفحص'
      },
      {
        id: 'electrical-automation',
        code: '04',
        group: 'industrial',
        title: 'كهرباء وتحكم',
        subtitle: 'تجهيزات شبكات القوى والتحكم الآلي الصناعي',
        image: 'electrical.webp',
        items: ['كابلات نحاس وألومنيوم (السويدي / الجيزة)', 'لوحات توزيع رئيسية وفرعية جهد منخفض', 'قواطع صناعية ذكية (Schneider / ABB)', 'كشافات LED صناعية ومستلزمات إنارة'],
        specs: 'شهادات اختبار معتمدة مطابقة لمواصفات وزارة الكهرباء.',
        deliveryTime: 'توريد وشحن في نفس اليوم'
      },
      {
        id: 'plumbing-water-drainage',
        code: '05',
        group: 'construction',
        title: 'سباكة ومياه وصرف',
        subtitle: 'شبكات التغذية والصرف وخطوط الضغط العالي',
        image: 'irrigation.webp',
        items: ['مواسير بلاستيك HDPE وUPVC وزهر', 'محابس وبلوف صناعية فراشة وسكينة', 'طلمبات رفع مياه وطلمبات صرف غاطسة', 'أغطية مطابق GRP وحديد زهر بمختلف الحمولات'],
        specs: 'متوافقة مع اشتراطات الشركة القابضة لمياه الشرب والصرف.',
        deliveryTime: 'شحن فوري بالسيارات المجهزة'
      },
      {
        id: 'agricultural-supplies',
        code: '06',
        group: 'agricultural-marine',
        title: 'مستلزمات زراعية',
        subtitle: 'تجهيزات المزارع وشبكات الري الحديث والإنتاج',
        image: 'agriculture.webp',
        items: ['معدات وميكنة زراعية وماكينات ري حديثة', 'طلمبات ري غاطسة وسطحية عالية التدفق', 'خراطيم ضغط وتنقيط وشبكات ري محوري', 'مستلزمات مزارع الإنتاج الحيواني والصوب'],
        specs: 'خامات مقاومة للشمس والمناخ وتوفير استهلاك الطاقة.',
        deliveryTime: 'توصيل حتى باب المزرعة'
      },
      {
        id: 'marine-supplies',
        code: '07',
        group: 'agricultural-marine',
        title: 'مستلزمات بحرية',
        subtitle: 'مهمات المراكب ومعدات ومحركات الصيد البحري',
        image: 'marine.webp',
        items: ['معدات ومهمات مراكب صيد وتجهيزات ملاحية', 'مواتير بحرية داخلية وخارجية أصلية', 'قطع غيار رفاصات وجلب وأعمدة بحرية', 'شباك صيد متطورة ومهمات إنقاذ وسلامة'],
        specs: 'معالجة ضد الصدأ والتآكل الملحي واعتمادات ملاحية.',
        deliveryTime: 'تسليم بموانئ البرلس وكفر الشيخ'
      },
      {
        id: 'workshop-supplies',
        code: '08',
        group: 'industrial',
        title: 'مستلزمات الورش',
        subtitle: 'تجهيزات الخراطة والحدادة ومراكز الخدمة الميكانيكية',
        image: 'mechanical.webp',
        items: ['عُدد يدوية صناعية كروم فاناديوم فائقة التحمل', 'عُدد كهربائية (دريلات، صواريخ، هيلتيات)', 'ماكينات لحام كهرباء وميج وتيج وسلوك لحام', 'مستلزمات تشغيل وكواريك وأوناش ورش'],
        specs: 'ماركات احترافية (Bosch, DeWalt, Makita) للخدمة الشاقة.',
        deliveryTime: 'شحن مباشر للورشة'
      },
      {
        id: 'industrial-raw-materials',
        code: '09',
        group: 'industrial',
        title: 'خامات صناعية',
        subtitle: 'مواد أولية ومستلزمات إنتاج متخصصة حسب الطلب',
        image: 'custom.webp',
        items: ['معادن وسبائك، ألواح صلب وصاج مجلفن واستانلس', 'بوليمرات ولدائن وخامات بلاستيك بيور', 'كيماويات وسيطة ومذيبات ودهانات إيبوكسي', 'مستلزمات تصنيع بمواصفات كيميائية دقيقة'],
        specs: 'شهادات تحليل مخبري وفحص خامات (COA) لكل شحنة.',
        deliveryTime: 'جدولة توريد تعاقدية منتظمة'
      },
      {
        id: 'occupational-safety',
        code: '10',
        group: 'commercial-safety',
        title: 'مستلزمات السلامة المهنية',
        subtitle: 'حماية الأفراد والمنشآت وتجهيزات الأمن الصناعي',
        image: 'safety.webp',
        items: ['خوذات أمان ونظارات وأقنعة ضد الشظايا', 'أحذية أمان صناعية بكعب وبوز صلب (Safety Shoes)', 'ملابس وأفرولات عمل عاكسة ومقاومة للقطع', 'أنظمة وطفايات حريق بودرة ورغوة وCO2'],
        specs: 'متوافقة مع معايير OSHA والكود المصري للسلامة والصحة.',
        deliveryTime: 'توريد سريع لكافة المواقع'
      },
      {
        id: 'office-supplies-equipment',
        code: '11',
        group: 'commercial-safety',
        title: 'أجهزة ومستلزمات مكتبية',
        subtitle: 'تجهيز المقرات الإدارية وبيئات العمل للشركات',
        image: 'stationery.webp',
        items: ['أجهزة حاسب آلي وسيرفرات وشبكات ربط', 'طابعات وماكينات تصوير ومسح ضوئي ليزر', 'أحبار طابعات أصلية ومستهلكات طباعة', 'أثاث مكتبي، كراسي طبية، وخزائن ومكاتب مدراء'],
        specs: 'أجهزة وضمان محلي معتمد مع عقود صيانة دورية.',
        deliveryTime: 'توصيل وتركيب بالمقر الإداري'
      },
      {
        id: 'government-supplies',
        code: '12',
        group: 'government',
        title: 'توريدات حكومية',
        subtitle: 'تنفيذ المناقصات والممارسات والمزايدات بالمواصفات المعتمدة',
        image: 'tenders.webp',
        items: ['مستلزمات الهيئات والمدارس والجامعات والمستشفيات', 'مهمات ومعدات المشروعات القومية والتنموية', 'توريد متطابق بالكامل مع كراسات الشروط الحكومية', 'فواتير ضريبية إلكترونية فورية وسجل تجاري معتمد'],
        specs: 'سجل تجاري وبطاقة ضريبية وجاهزية خطابات الضمان.',
        deliveryTime: 'التزام صارم بجدول تسليم الكراسة'
      }
    ]
  };

  // دوال مساعدة للروابط والواتساب
  function getPhoneLink(rawNumber) {
    return `tel:${rawNumber}`;
  }

  function getWhatsAppLink(rawNumber, message = '') {
    const cleanNumber = rawNumber.replace(/\D/g, '');
    const internationalNumber = cleanNumber.startsWith('0') ? `2${cleanNumber}` : cleanNumber;
    const encodedMsg = encodeURIComponent(message || 'مرحباً، أود الاستفسار عن توريدات شركة دلتا.');
    return `https://wa.me/${internationalNumber}?text=${encodedMsg}`;
  }

  function buildQuoteWhatsAppMessage(formData) {
    const lines = [
      'طلب عرض سعر جديد من موقع شركة دلتا للتوريدات العمومية:',
      '------------------------------------------------',
      `الاسم: ${formData.name || 'غير محدد'}`,
      formData.company ? `الشركة: ${formData.company}` : '',
      `رقم الموبايل: ${formData.phone || 'غير محدد'}`,
      `مجال التوريد: ${formData.categoryTitle || 'غير محدد'}`,
      `تفاصيل الطلب والكميات والمواصفات:`,
      formData.details || 'لا توجد تفاصيل إضافية'
    ].filter(Boolean);

    return lines.join('\n');
  }

  // أيقونات SVG نظيفة
  const SVG_ICONS = {
    phone: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>`,
    whatsapp: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="currentColor" d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm5.79 14.15c-.24.68-1.39 1.3-1.92 1.38-.49.08-1.12.11-3.64-.93-3.22-1.33-5.29-4.6-5.45-4.82-.16-.21-1.31-1.74-1.31-3.32 0-1.58.83-2.36 1.12-2.68.29-.32.64-.4 86-.4.22 0 .43.01.62.02.2.01.46-.07.72.55.27.64.91 2.22.99 2.38.08.16.14.35.03.56-.11.21-.16.35-.32.54-.16.19-.34.42-.49.56-.16.15-.33.32-.14.64.19.32.84 1.39 1.81 2.25 1.25 1.11 2.3 1.45 2.63 1.61.32.16.51.13.7-.08.19-.21.8-0.93 1.01-1.25.21-.32.43-.27.72-.16.29.11 1.87.88 2.19 1.04.32.16.53.24.61.37.08.13.08.77-.16 1.45z"/></svg>`,
    headphones: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>`,
    megaphone: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 11 18-5v12L3 14v-3z"></path><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path></svg>`,
    tag: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z"></path><path d="M7 7h.01"></path></svg>`,
    briefcase: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>`
  };

  // ==========================================================================
  // 2. توليد أقسام الاتصال والتليفونات (رقمين في نفس الصف لكل قسم)
  // ==========================================================================
  function renderDepartments() {
    const container = document.getElementById('departments-container');
    if (!container || !siteConfig.departments) return;

    container.innerHTML = '';

    siteConfig.departments.forEach((dept) => {
      const card = document.createElement('div');
      card.className = 'dept-card';

      const iconSvg = SVG_ICONS[dept.icon] || SVG_ICONS.headphones;

      const header = `
        <div class="dept-header">
          <div class="dept-icon" aria-hidden="true">${iconSvg}</div>
          <div>
            <h4 class="dept-title">${dept.name}</h4>
            <p class="dept-desc">${dept.description}</p>
          </div>
        </div>
      `;

      const numbersHtml = dept.numbers.map((num) => {
        const telUrl = getPhoneLink(num.raw);
        const waUrl = getWhatsAppLink(num.raw, `مرحباً، أود التواصل مع قسم ${dept.name} بشركة دلتا.`);
        
        return `
          <div class="phone-action-item">
            <a href="${telUrl}" class="phone-tel-link" aria-label="اتصل هاتفياً بـ ${num.label} على الرقم ${num.raw}">
              ${SVG_ICONS.phone}
              <span class="num-ltr">${num.display}</span>
            </a>
            <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="phone-wa-btn" aria-label="تواصل عبر واتساب مع ${num.label}">
              ${SVG_ICONS.whatsapp}
            </a>
          </div>
        `;
      }).join('');

      card.innerHTML = `
        ${header}
        <div class="dept-numbers-row">
          ${numbersHtml}
        </div>
      `;

      container.appendChild(card);
    });
  }

  // ==========================================================================
  // 3. إدارة الترويسة والتنقل
  // ==========================================================================
  function initNavigation() {
    const header = document.querySelector('.site-header');
    const menuToggle = document.getElementById('menu-toggle');
    const mobileDrawer = document.getElementById('mobile-drawer');

    // فرض الوضع النهاري القياسي
    document.documentElement.setAttribute('data-theme', 'light');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 20) {
        header?.classList.add('is-scrolled');
      } else {
        header?.classList.remove('is-scrolled');
      }
    }, { passive: true });

    if (menuToggle && mobileDrawer) {
      menuToggle.addEventListener('click', () => {
        const isOpen = mobileDrawer.classList.toggle('is-open');
        menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });

      mobileDrawer.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          mobileDrawer.classList.remove('is-open');
          menuToggle.setAttribute('aria-expanded', 'false');
        });
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileDrawer.classList.contains('is-open')) {
          mobileDrawer.classList.remove('is-open');
          menuToggle.setAttribute('aria-expanded', 'false');
          menuToggle.focus();
        }
      });
    }
  }

  // ==========================================================================
  // 4. إدارة كتالوج المجالات الـ 12 والبحث والمودال
  // ==========================================================================
  function initCatalog() {
    const categorySelect = document.getElementById('form-category');
    const searchInput = document.getElementById('catalog-search-input');
    const filterTabs = document.querySelectorAll('.filter-tab-btn');
    const counterBadge = document.getElementById('catalog-count-badge');
    const modalOverlay = document.getElementById('sector-modal-overlay');
    const modalCloseBtn = document.getElementById('sector-modal-close');
    const modalBody = document.getElementById('sector-modal-body');
    const catalogCards = document.querySelectorAll('.catalog-card');

    // تعبئة القائمة المنسدلة في الفورم
    if (categorySelect && siteConfig.categories) {
      categorySelect.innerHTML = '<option value="" disabled selected>اختر مجال التوريد المطلوب...</option>';
      siteConfig.categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat.id;
        option.textContent = `${cat.code} — ${cat.title}`;
        categorySelect.appendChild(option);
      });
    }

    // فلترة الكروت الموجودة في الصفحة
    function applyFilters() {
      const query = (searchInput?.value || '').trim().toLowerCase();
      const activeTab = document.querySelector('.filter-tab-btn.is-active')?.getAttribute('data-filter') || 'all';
      let visibleCount = 0;

      catalogCards.forEach(card => {
        const cardGroup = card.getAttribute('data-group') || '';
        const cardText = card.textContent.toLowerCase();

        const matchesGroup = (activeTab === 'all') || (cardGroup === activeTab);
        const matchesQuery = !query || cardText.includes(query);

        if (matchesGroup && matchesQuery) {
          card.style.display = 'flex';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      if (counterBadge) {
        counterBadge.textContent = `عرض ${visibleCount} من أصل 12 مجالأ معتمداً`;
      }
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

    // الاستماع لفتح نافذة المواصفات الفنية (Modal)
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

        document.getElementById('btn-modal-rfq')?.addEventListener('click', () => {
          closeModal();
        });
      }

      // النقر على زر طلب التوريد
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

  // ==========================================================================
  // 5. إدارة نموذج طلب عرض السعر والتحقق
  // ==========================================================================
  function initQuoteForm() {
    const form = document.getElementById('quote-form');
    const whatsappBtn = document.getElementById('btn-quote-whatsapp');
    const alertContainer = document.getElementById('form-alert-container');

    if (!form) return;

    let lastSubmitTime = 0;
    const RATE_LIMIT_MS = 30000;

    function sanitizeInput(str) {
      if (!str) return '';
      return str.trim().replace(/[<>]/g, '').substring(0, 1000);
    }

    function validateEgyptianPhone(phone) {
      const clean = phone.replace(/[\s-]/g, '');
      const regex = /^01[0125][0-9]{8}$/;
      return {
        isValid: regex.test(clean),
        cleaned: clean
      };
    }

    function showAlert(message, type = 'success') {
      if (!alertContainer) return;
      alertContainer.textContent = '';

      const alertDiv = document.createElement('div');
      alertDiv.className = `form-alert form-alert-${type}`;
      alertDiv.setAttribute('role', 'alert');

      const iconSpan = document.createElement('span');
      iconSpan.textContent = type === 'success' ? '✓' : '!';
      iconSpan.style.fontWeight = 'bold';
      iconSpan.style.fontSize = '1.2rem';

      const msgSpan = document.createElement('span');
      msgSpan.textContent = message;

      alertDiv.appendChild(iconSpan);
      alertDiv.appendChild(msgSpan);
      alertContainer.appendChild(alertDiv);

      alertDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function getValidatedFormData() {
      const nameInput = document.getElementById('form-name');
      const companyInput = document.getElementById('form-company');
      const phoneInput = document.getElementById('form-phone');
      const categorySelect = document.getElementById('form-category');
      const detailsInput = document.getElementById('form-details');
      const honeypot = document.getElementById('form-hp');

      if (honeypot && honeypot.value.trim() !== '') {
        return { isBot: true };
      }

      let hasErrors = false;

      const nameVal = sanitizeInput(nameInput?.value);
      if (!nameVal || nameVal.length < 2) {
        nameInput?.classList.add('is-invalid');
        hasErrors = true;
      } else {
        nameInput?.classList.remove('is-invalid');
      }

      const phoneCheck = validateEgyptianPhone(phoneInput?.value || '');
      if (!phoneCheck.isValid) {
        phoneInput?.classList.add('is-invalid');
        hasErrors = true;
      } else {
        phoneInput?.classList.remove('is-invalid');
      }

      const categoryVal = categorySelect?.value;
      if (!categoryVal) {
        categorySelect?.classList.add('is-invalid');
        hasErrors = true;
      } else {
        categorySelect?.classList.remove('is-invalid');
      }

      const detailsVal = sanitizeInput(detailsInput?.value);
      if (!detailsVal || detailsVal.length < 5) {
        detailsInput?.classList.add('is-invalid');
        hasErrors = true;
      } else {
        detailsInput?.classList.remove('is-invalid');
      }

      if (hasErrors) {
        return { isValid: false };
      }

      const selectedCategoryObj = siteConfig.categories.find(c => c.id === categoryVal);
      const categoryTitle = selectedCategoryObj ? `${selectedCategoryObj.code} — ${selectedCategoryObj.title}` : categoryVal;

      return {
        isValid: true,
        data: {
          name: nameVal,
          company: sanitizeInput(companyInput?.value),
          phone: phoneCheck.cleaned,
          category: categoryVal,
          categoryTitle: categoryTitle,
          details: detailsVal
        }
      };
    }

    function handleWhatsAppSubmission(e) {
      if (e) e.preventDefault();

      const formCheck = getValidatedFormData();
      if (formCheck.isBot) {
        form.reset();
        showAlert('تم استلام طلبك بنجاح وسيتواصل معك مهندس المبيعات قريباً.', 'success');
        return;
      }

      if (!formCheck.isValid) {
        showAlert('يرجى مراجعة الحقول المطلوبة والتأكد من إدخال رقم موبايل مصري صحيح مكون من 11 رقماً (مثال: 01012345678).', 'error');
        return;
      }

      const waMsg = buildQuoteWhatsAppMessage(formCheck.data);
      const salesNumber = siteConfig.departments.find(d => d.id === 'sales')?.numbers[0]?.raw || '01012345605';
      const waUrl = getWhatsAppLink(salesNumber, waMsg);

      showAlert(`شكراً لك يا ${formCheck.data.name}. جاري فتح تطبيق واتساب لإرسال تفاصيل طلبك مباشرة إلى مبيعات شركة دلتا...`, 'success');
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }

    if (whatsappBtn) {
      whatsappBtn.addEventListener('click', handleWhatsAppSubmission);
    }

    form.addEventListener('submit', handleWhatsAppSubmission);
  }

  // ==========================================================================
  // 6. تحميل خريطة جوجل بنظام النقر حسب الطلب
  // ==========================================================================
  function initMapLoader() {
    const mapContainer = document.getElementById('map-container');
    const loadMapBtn = document.getElementById('btn-load-map');
    const placeholder = document.getElementById('map-placeholder');

    if (!mapContainer || !loadMapBtn) return;

    function loadGoogleMap() {
      if (mapContainer.querySelector('iframe')) return;

      const iframe = document.createElement('iframe');
      iframe.src = siteConfig.company.headquarters.mapEmbedUrl;
      iframe.className = 'map-iframe';
      iframe.title = 'موقع شركة دلتا للتوريدات العمومية على خريطة جوجل - كفر الشيخ، مصر';
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

  // ==========================================================================
  // 7. قائمة الأسئلة الشائعة الأكورديون
  // ==========================================================================
  function initFaqAccordion() {
    const triggers = document.querySelectorAll('.faq-trigger');

    triggers.forEach((trigger) => {
      trigger.addEventListener('click', () => {
        const item = trigger.closest('.faq-item');
        if (!item) return;

        const isOpen = item.classList.contains('is-open');

        document.querySelectorAll('.faq-item').forEach(other => {
          if (other !== item) {
            other.classList.remove('is-open');
            other.querySelector('.faq-trigger')?.setAttribute('aria-expanded', 'false');
          }
        });

        if (isOpen) {
          item.classList.remove('is-open');
          trigger.setAttribute('aria-expanded', 'false');
        } else {
          item.classList.add('is-open');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });
    });
  }

  // ==========================================================================
  // 8. تهيئة ظهور العناصر عند التمرير
  // ==========================================================================
  function initScrollObserver() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      document.querySelectorAll('.reveal-init').forEach(el => el.classList.add('reveal-visible'));
      return;
    }

    const elements = document.querySelectorAll('.reveal-init');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '50px 0px 50px 0px',
      threshold: 0.02
    });

    elements.forEach(el => observer.observe(el));

    // صمام أمان زمني لضمان ظهور كافة العناصر حتى في البيئات المقيدة
    setTimeout(() => {
      document.querySelectorAll('.reveal-init:not(.reveal-visible)').forEach(el => {
        el.classList.add('reveal-visible');
      });
    }, 1200);
  }

  // الانطلاق عند جاهزية الصفحة
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

  function initApp() {
    renderDepartments();
    initNavigation();
    initCatalog();
    initQuoteForm();
    initMapLoader();
    initFaqAccordion();
    initScrollObserver();
  }

})();
