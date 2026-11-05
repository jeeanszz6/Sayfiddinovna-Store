(() => {
  // Display-only estimates. The order ledger remains denominated in IDR.
  const currencies = {
    id: { locale: 'id-ID', code: 'IDR', rate: 1, digits: 0 },
    en: { locale: 'en-US', code: 'USD', rate: 0.00005539, digits: 2 },
    ru: { locale: 'ru-RU', code: 'RUB', rate: 0.0046589, digits: 0 },
    uz: { locale: 'uz-UZ', code: 'UZS', rate: 0.67, digits: 0 }
  };
  const selectedLanguage = () => {
    try { const value = localStorage.getItem('sayfiddinovna-language'); return currencies[value] ? value : 'ru'; }
    catch { return 'ru'; }
  };
  window.HOCKEY_CURRENCY = {
    format(amount) {
      const settings = currencies[selectedLanguage()];
      return new Intl.NumberFormat(settings.locale, {
        style: 'currency', currency: settings.code,
        minimumFractionDigits: settings.digits, maximumFractionDigits: settings.digits
      }).format(Number(amount || 0) * settings.rate);
    },
    note() {
      return ({ id: 'Kurs tampilan perkiraan; nilai pesanan tetap dicatat dalam IDR.', en: 'Indicative display rate; orders are still recorded in IDR.', ru: 'Ориентировочный курс отображения; заказы учитываются в IDR.', uz: 'Ko‘rsatilgan kurs taxminiy; buyurtmalar IDRda hisoblanadi.' })[selectedLanguage()];
    }
  };
})();
