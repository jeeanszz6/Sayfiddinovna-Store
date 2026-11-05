(() => {
  const actions = document.querySelector('.header-actions');
  if (!actions) return;

  const currentLanguage = () => {
    try { return localStorage.getItem('sayfiddinovna-language') || 'ru'; }
    catch { return 'ru'; }
  };

  let account=null,localAccounts=[];
  try{account=JSON.parse(localStorage.getItem('sayfiddinovna-user')||'null');localAccounts=JSON.parse(localStorage.getItem('sayfiddinovna-local-users')||'[]')}catch{}
  if(!Array.isArray(localAccounts)||!localAccounts.some(user=>user?.email===account?.email))account=null;
  const accountLink=document.createElement('a');
  accountLink.className='account-link';accountLink.href=account?.email?'akun.html':'masuk.html';
  accountLink.setAttribute('aria-label',account?.email?'Profil akun':'Masuk ke akun');
  accountLink.innerHTML=`<span aria-hidden="true">♙</span><b>${account?.email?'Akun':'Masuk'}</b>`;
  actions.prepend(accountLink);

  let language = document.querySelector('#language-switch');
  if (!language) {
    language = document.createElement('select');
    language.id = 'language-switch';
    language.className = 'language-switch';
    language.setAttribute('aria-label', 'Pilih bahasa');
    language.innerHTML = '<option value="ru">Русский</option><option value="en">English</option><option value="uz">O‘zbekcha</option><option value="id">Bahasa Indonesia</option>';
    actions.prepend(language);
  }
  language.value = currentLanguage();
  if (!language.dataset.headerBound) {
    language.dataset.headerBound = 'true';
    language.addEventListener('change', () => {
      try { localStorage.setItem('sayfiddinovna-language', language.value); } catch {}
      // Rebuild dynamic cart/product/checkout content using the newly selected language.
      // This also refreshes text created before the language module initializes.
      location.reload();
    });
  }

  // Small, deterministic fallback for the shared navigation and catalog hero.
  // The main language script handles the larger product and page dictionaries.
  const words = {
    ru: {
      'Beranda':'Главная','Katalog':'Каталог','Membership':'Клуб','Panduan ukuran':'Таблица размеров','Bantuan':'Помощь','Keranjang':'Корзина','Masuk':'Войти','Akun':'Аккаунт',
      'KATALOG LENGKAP':'ПОЛНЫЙ КАТАЛОГ','Perlengkapan hoki':'Хоккейная экипировка','untuk permainanmu.':'для вашей игры.','Temukan stick, pelindung, perlengkapan kiper, dan aksesori untuk shift berikutnya.':'Клюшки, защита и аксессуары для вашей следующей смены.','Jelajahi katalog':'Открыть каталог'
    },
    en: {
      'Beranda':'Home','Katalog':'Catalog','Membership':'Membership','Panduan ukuran':'Size guide','Bantuan':'Support','Keranjang':'Cart','Masuk':'Sign in','Akun':'Account',
      'KATALOG LENGKAP':'FULL CATALOG','Perlengkapan hoki':'Hockey equipment','untuk permainanmu.':'for your game.','Temukan stick, pelindung, perlengkapan kiper, dan aksesori untuk shift berikutnya.':'Find sticks, protective gear and accessories for your next shift.','Jelajahi katalog':'Explore catalog'
    },
    uz: {
      'Beranda':'Bosh sahifa','Katalog':'Katalog','Membership':'A’zolik','Panduan ukuran':'O‘lchamlar qo‘llanmasi','Bantuan':'Yordam','Keranjang':'Savat','Masuk':'Kirish','Akun':'Hisob',
      'KATALOG LENGKAP':'TO‘LIQ KATALOG','Perlengkapan hoki':'Xokkey jihozlari','untuk permainanmu.':'o‘yiningiz uchun.','Temukan stick, pelindung, perlengkapan kiper, dan aksesori untuk shift berikutnya.':'Keyingi o‘yiningiz uchun tayoq, himoya vositalari va aksessuarlarni toping.','Jelajahi katalog':'Katalogni ko‘rish'
    },
    id: {}
  };
  const originalText = new WeakMap();
  const applyFallback = () => {
    const dictionary = words[currentLanguage()] || {};
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      if (!node.parentElement || ['SCRIPT','STYLE'].includes(node.parentElement.tagName)) continue;
      const raw = originalText.get(node) || node.nodeValue.trim();
      if (!raw) continue;
      originalText.set(node, raw);
      if (dictionary[raw]) node.nodeValue = node.nodeValue.replace(raw, dictionary[raw]);
    }
  };
  applyFallback();
})();
