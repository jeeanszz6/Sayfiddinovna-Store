(()=>{
  const form=document.querySelector('#login-page-form');
  if(!form)return;
  let mode='login';
  const message=document.querySelector('#login-page-message'),nameWrap=document.querySelector('#login-name-wrap'),submit=document.querySelector('#login-page-submit'),toggle=document.querySelector('#login-page-toggle');
  const text={
    id:{login:'Masuk',register:'Buat akun',have:'Sudah punya akun? Masuk',new:'Belum punya akun? Buat akun',title:'Akun lokal',intro:'Masuk untuk menyimpan data checkout di browser ini.',note:'Akun hanya tersedia di browser dan perangkat ini.'},
    en:{login:'Sign in',register:'Create account',have:'Already have an account? Sign in',new:'New here? Create an account',title:'Local account',intro:'Sign in to save checkout details in this browser.',note:'This account is available only in this browser and on this device.'},
    ru:{login:'Войти',register:'Создать аккаунт',have:'Уже есть аккаунт? Войти',new:'Нет аккаунта? Создать',title:'Локальный аккаунт',intro:'Войдите, чтобы сохранить данные заказа в этом браузере.',note:'Аккаунт доступен только в этом браузере и на этом устройстве.'},
    uz:{login:'Kirish',register:'Hisob yaratish',have:'Hisobingiz bormi? Kiring',new:'Hisobingiz yo‘qmi? Yaratish',title:'Mahalliy hisob',intro:'Buyurtma ma’lumotlarini ushbu brauzerda saqlash uchun kiring.',note:'Hisob faqat shu brauzer va qurilmada ishlaydi.'}
  };
  const words=()=>text[localStorage.getItem('sayfiddinovna-language')||'id']||text.id;
  const readUsers=()=>{try{const users=JSON.parse(localStorage.getItem('sayfiddinovna-local-users')||'[]');return Array.isArray(users)?users:[]}catch{return[]}};
  const hash=async value=>{
    if(!window.crypto?.subtle)throw new Error('Login lokal memerlukan localhost atau HTTPS agar kata sandi dapat dilindungi.');
    const digest=await window.crypto.subtle.digest('SHA-256',new TextEncoder().encode(value));
    return Array.from(new Uint8Array(digest),byte=>byte.toString(16).padStart(2,'0')).join('');
  };
  const apply=()=>{
    const t=words();document.querySelector('#auth-page-title').textContent=t.title;document.querySelector('.auth-intro').textContent=t.intro;document.querySelector('.demo-note').textContent=t.note;
    submit.innerHTML=`${mode==='login'?t.login:t.register} <span aria-hidden="true">↗</span>`;toggle.textContent=mode==='login'?t.new:t.have;
  };
  toggle.addEventListener('click',()=>{mode=mode==='login'?'register':'login';nameWrap.hidden=mode!=='register';nameWrap.querySelector('input').required=mode==='register';form.elements.password.autocomplete=mode==='register'?'new-password':'current-password';message.textContent='';apply()});
  form.addEventListener('submit',async event=>{
    event.preventDefault();message.textContent='';submit.disabled=true;
    const data=new FormData(form),email=String(data.get('email')||'').trim().toLowerCase(),name=String(data.get('name')||'').trim(),password=String(data.get('password')||'');
    try{
      const users=readUsers(),existing=users.find(user=>user.email===email),passwordHash=await hash(password);
      if(mode==='register'){
        if(existing)throw new Error('Email ini sudah terdaftar di browser ini. Silakan masuk.');
        if(name.length<2)throw new Error('Masukkan nama lengkap.');
        users.push({email,name,passwordHash,created:new Date().toISOString()});localStorage.setItem('sayfiddinovna-local-users',JSON.stringify(users));
      }else if(!existing||existing.passwordHash!==passwordHash)throw new Error('Email atau kata sandi tidak cocok.');
      const account=mode==='register'?users.find(user=>user.email===email):existing;
      localStorage.setItem('sayfiddinovna-user',JSON.stringify({email:account.email,name:account.name}));
      const continueCheckout=new URLSearchParams(location.search).get('checkout')==='1';
      location.href=continueCheckout?'index.html?checkout=1&continue=1#unggulan':'akun.html';
    }catch(error){message.textContent=error.message||'Akun tidak dapat disimpan di browser ini.'}
    finally{submit.disabled=false}
  });
  window.addEventListener('hockey-language-change',apply);apply();
})();
