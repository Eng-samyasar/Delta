/**
 * form-handler.js
 * إدارة والتحقق وتأمين نموذج طلب عرض السعر
 * شركة دلتا للتوريدات العمومية
 */

import { siteConfig, buildQuoteWhatsAppMessage, getWhatsAppLink } from './site-config.js';

export function initQuoteForm() {
  const form = document.getElementById('quote-form');
  const whatsappBtn = document.getElementById('btn-quote-whatsapp');
  const alertContainer = document.getElementById('form-alert-container');

  if (!form) return;

  // صمام الأمان لمنع الإرسال المتكرر السريع (Rate Limiting)
  let lastSubmitTime = 0;
  const RATE_LIMIT_MS = 30000; // 30 ثانية بين كل طلب وآخر

  // دالة تنظيف وتطهير النصوص لمنع هجمات XSS
  function sanitizeInput(str) {
    if (!str) return '';
    return str
      .trim()
      .replace(/[<>]/g, '') // حذف وسوم HTML
      .substring(0, 1000);   // حد أقصى للحقل
  }

  // التحقق من صيغة الموبايل المصري (010, 011, 012, 015 + 8 أرقام = 11 رقماً)
  function validateEgyptianPhone(phone) {
    const clean = phone.replace(/[\s-]/g, '');
    const regex = /^01[0125][0-9]{8}$/;
    return {
      isValid: regex.test(clean),
      cleaned: clean
    };
  }

  // إظهار رسائل التنبيه بشكل آمن دون استخدام innerHTML
  function showAlert(message, type = 'success') {
    if (!alertContainer) return;
    alertContainer.textContent = ''; // مسح المحتوى القديم

    const alertDiv = document.createElement('div');
    alertDiv.className = `form-alert form-alert-${type}`;
    alertDiv.setAttribute('role', 'alert');

    // أيقونة آمنة
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

  // جمع وتدقيق البيانات من الحقول
  function getValidatedFormData() {
    const nameInput = document.getElementById('form-name');
    const companyInput = document.getElementById('form-company');
    const phoneInput = document.getElementById('form-phone');
    const categorySelect = document.getElementById('form-category');
    const detailsInput = document.getElementById('form-details');
    const honeypot = document.getElementById('form-hp');

    // فحص مصيدة الروبوتات (Honeypot Trap)
    if (honeypot && honeypot.value.trim() !== '') {
      console.warn('Bot detected via honeypot.');
      return { isBot: true };
    }

    let hasErrors = false;

    // تدقيق الاسم
    const nameVal = sanitizeInput(nameInput?.value);
    if (!nameVal || nameVal.length < 2) {
      nameInput?.classList.add('is-invalid');
      hasErrors = true;
    } else {
      nameInput?.classList.remove('is-invalid');
    }

    // تدقيق الموبايل
    const phoneCheck = validateEgyptianPhone(phoneInput?.value || '');
    if (!phoneCheck.isValid) {
      phoneInput?.classList.add('is-invalid');
      hasErrors = true;
    } else {
      phoneInput?.classList.remove('is-invalid');
    }

    // تدقيق المجال
    const categoryVal = categorySelect?.value;
    if (!categoryVal) {
      categorySelect?.classList.add('is-invalid');
      hasErrors = true;
    } else {
      categorySelect?.classList.remove('is-invalid');
    }

    // تدقيق التفاصيل
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

  // معالجة زر الإرسال المباشر عبر واتساب
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const formCheck = getValidatedFormData();

      if (formCheck.isBot) {
        return;
      }

      // تجهيز رسالة الواتساب بالبيانات المتاحة حتى لو لم تكتمل كافة الحقول
      const nameInput = document.getElementById('form-name');
      const companyInput = document.getElementById('form-company');
      const phoneInput = document.getElementById('form-phone');
      const categorySelect = document.getElementById('form-category');
      const detailsInput = document.getElementById('form-details');

      const selectedCategoryObj = siteConfig.categories.find(c => c.id === categorySelect?.value);
      const categoryTitle = selectedCategoryObj ? `${selectedCategoryObj.code} — ${selectedCategoryObj.title}` : (categorySelect?.value || 'عام');

      const waMsg = buildQuoteWhatsAppMessage({
        name: sanitizeInput(nameInput?.value),
        company: sanitizeInput(companyInput?.value),
        phone: sanitizeInput(phoneInput?.value),
        categoryTitle: categoryTitle,
        details: sanitizeInput(detailsInput?.value)
      });

      // رقم مبيعات الشركة المعتمد
      const salesNumber = siteConfig.departments.find(d => d.id === 'sales')?.numbers[0]?.raw || '01012345605';
      const waUrl = getWhatsAppLink(salesNumber, waMsg);

      window.open(waUrl, '_blank', 'noopener,noreferrer');
    });
  }

  // معالجة إرسال النموذج الأساسي
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const now = Date.now();
    if (now - lastSubmitTime < RATE_LIMIT_MS) {
      const waitSeconds = Math.ceil((RATE_LIMIT_MS - (now - lastSubmitTime)) / 1000);
      showAlert(`تم إرسال طلبك مؤخراً، يرجى الانتظار ${waitSeconds} ثانية قبل إرسال طلب آخر.`, 'error');
      return;
    }

    const check = getValidatedFormData();

    if (check.isBot) {
      // إيهام البوت بالنجاح دون تسجيل أي بيانات
      form.reset();
      showAlert('تم استلام طلبك بنجاح وسيتواصل معك مهندس المبيعات قريباً.', 'success');
      return;
    }

    if (!check.isValid) {
      showAlert('يرجى مراجعة الحقول المطلوبة والتأكد من إدخال رقم موبايل مصري صحيح (مثال: 01012345678).', 'error');
      return;
    }

    // إرسال آمن (يمكن ربطه بنقطة نهاية /api/quote أو خدمة بريد)
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn ? submitBtn.textContent : '';

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'جاري تسجيل الطلب...';
    }

    setTimeout(() => {
      lastSubmitTime = Date.now();
      form.reset();
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }
      showAlert(`شكراً لك يا ${check.data.name}. تم تسجيل طلب عرض السعر لمجال (${check.data.categoryTitle}) بنجاح. سيتواصل معك فريق مبيعات شركة دلتا خلال أقل من ساعتين عمل.`, 'success');
    }, 700);
  });
}
