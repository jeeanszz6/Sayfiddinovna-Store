(()=>{
  const language=()=>localStorage.getItem('sayfiddinovna-language')||'id';
  const copy=()=>window.HOCKEY_CHECKOUT_I18N[language()]||window.HOCKEY_CHECKOUT_I18N.id;
  const words={
    id:{qris:'QRIS',scan:'Bayar dengan QRIS melalui halaman aman Midtrans.',visa:'Kartu Visa',bank:'Transfer bank',va:'Virtual account',addCard:'Tambah rekening / kartu',cardName:'Nama pada kartu',cardNumber:'Nomor kartu',expiry:'Masa berlaku (MM/YY)',cvv:'CVV',savedCard:'Kartu tersimpan',secureNote:'Masukkan data kartu pada halaman aman Midtrans. Sayfiddinovna Sport tidak menyimpan nomor kartu atau CVV.',bankNote:'Pilih bank dan selesaikan transfer melalui instruksi Midtrans.',vaNote:'Nomor Virtual Account dibuat otomatis oleh Midtrans.',review:'Periksa pesanan',orderSaved:'Pesanan berhasil dibuat.',payNote:'Selesaikan pembayaran QRIS, lalu kirim bukti pembayaran dan nomor pesanan ke WhatsApp toko.',payment:'Pembayaran',pending:'Menunggu pembayaran',status:'Pesanan disimpan lokal',notFound:'Pesanan tidak ditemukan di browser ini.',whatsapp:'Kirim bukti pembayaran via WhatsApp',error:'Pesanan gagal disimpan. Periksa ruang penyimpanan browser.',whatsAppMessage:'Halo, saya mengirim bukti pembayaran untuk pesanan'},
    en:{qris:'QRIS',scan:'Pay using QRIS through the secure Midtrans checkout.',visa:'Visa card',bank:'Bank transfer',va:'Virtual account',addCard:'Add account / card',cardName:'Name on card',cardNumber:'Card number',expiry:'Expiry (MM/YY)',cvv:'CVV',savedCard:'Saved card',secureNote:'Enter card details on Midtrans secure checkout. Sayfiddinovna Sport does not store card numbers or CVV.',bankNote:'Choose a bank and complete the transfer using Midtrans instructions.',vaNote:'A Virtual Account number is generated automatically by Midtrans.',review:'Review order',orderSaved:'Your order has been created.',payNote:'Complete the QRIS payment, then send the payment proof and order number to the store on WhatsApp.',payment:'Payment',pending:'Awaiting payment',status:'Saved locally',notFound:'Order not found in this browser.',whatsapp:'Send payment proof on WhatsApp',error:'Could not save the order. Check browser storage.',whatsAppMessage:'Hello, I am sending the payment proof for order'},
    ru:{qris:'QRIS',scan:'Отсканируйте QRIS в банковском приложении или электронном кошельке.',visa:'Карта Visa',bank:'Банковский перевод',va:'Виртуальный счет',addCard:'Добавить карту',cardName:'Имя на карте',cardNumber:'Номер карты',expiry:'Срок действия (ММ/ГГ)',cvv:'CVV',savedCard:'Сохраненная карта',secureNote:'Демо: полные данные карты и CVV не сохраняются. Оплата картой не подключена к платежному шлюзу.',bankNote:'Перед переводом свяжитесь с магазином в WhatsApp, чтобы получить официальные банковские реквизиты.',vaNote:'Виртуальный счет будет создан после подтверждения заказа магазином. Свяжитесь с магазином в WhatsApp.',review:'Проверьте заказ',orderSaved:'Заказ успешно создан.',payNote:'Оплатите через QRIS и отправьте подтверждение и номер заказа магазину в WhatsApp.',payment:'Оплата',pending:'Ожидает оплаты',status:'Сохранено локально',notFound:'Заказ не найден в этом браузере.',whatsapp:'Отправить подтверждение в WhatsApp',error:'Не удалось сохранить заказ. Проверьте хранилище браузера.',whatsAppMessage:'Здравствуйте, отправляю подтверждение оплаты заказа'},
    uz:{qris:'QRIS',scan:'QRISni bank yoki elektron hamyon ilovasida skanerlang.',visa:'Visa kartasi',bank:'Bank o‘tkazmasi',va:'Virtual hisob',addCard:'Karta qo‘shish',cardName:'Kartadagi ism',cardNumber:'Karta raqami',expiry:'Amal qilish muddati (OO/YY)',cvv:'CVV',savedCard:'Saqlangan karta',secureNote:'Demo: karta to‘liq ma’lumotlari va CVV saqlanmaydi. Karta to‘lovi to‘lov tizimiga ulanmagan.',bankNote:'Pul o‘tkazishdan oldin rasmiy bank rekvizitlarini olish uchun WhatsApp orqali do‘kon bilan bog‘laning.',vaNote:'Virtual hisob do‘kon buyurtmani tasdiqlaganidan keyin beriladi. WhatsApp orqali bog‘laning.',review:'Buyurtmani tekshiring',orderSaved:'Buyurtma muvaffaqiyatli yaratildi.',payNote:'QRIS orqali to‘lov qiling va to‘lov cheki hamda buyurtma raqamini WhatsApp orqali do‘konga yuboring.',payment:'To‘lov',pending:'To‘lov kutilmoqda',status:'Mahalliy saqlandi',notFound:'Buyurtma ushbu brauzerda topilmadi.',whatsapp:'To‘lov chekini WhatsApp orqali yuborish',error:'Buyurtmani saqlab bo‘lmadi. Brauzer xotirasini tekshiring.',whatsAppMessage:'Salom, buyurtma uchun to‘lov chekini yuboryapman'}
  };
  const t=()=>words[language()]||words.id;
  const esc=value=>String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const price=value=>new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(Number(value)||0);
  const shippingCost=data=>data.shipping==='Express'?45000:data.shipping==='Ambil di toko'?0:20000;
  let currentOrder=null;
  function storeOrder(order){const key='sayfiddinovna-orders';let orders=[];try{orders=JSON.parse(localStorage.getItem(key)||'[]')}catch{}if(!Array.isArray(orders))orders=[];orders=orders.filter(item=>item.id!==order.id);orders.unshift(order);localStorage.setItem(key,JSON.stringify(orders));localStorage.setItem('sayfiddinovna-last-order',JSON.stringify(order))}
  function renderPending(order){currentOrder=order;const c=copy(),w=t(),total=Number(order.totalIDR)||0;
    document.querySelector('#checkout-content').innerHTML=`<section class="qris-pending"><span class="eyebrow">${esc(order.id)}</span><h3>${w.orderSaved}</h3><p>${c.total}: <strong>${price(total)}</strong></p><p class="demo-note">Selesaikan pembayaran pada jendela Midtrans. Status pesanan akan diperbarui setelah notifikasi pembayaran diterima.</p><p>${w.payment}: <b data-payment-live-status>${esc(order.paymentStatus||w.pending)} · ${esc(order.status||w.status)}</b></p><button class="button button-outline" id="check-payment-status">Periksa status pembayaran</button><button class="button button-outline" id="finish-order">${c.close}</button></section>`;
    document.querySelector('#step-indicator').innerHTML=c.steps.map(s=>`<div class="step done"><b>✓</b><span>${s}</span></div>`).join('');document.querySelector('#check-payment-status').onclick=async()=>{const result=await refreshPaymentStatus(order.id,order.email);if(!result)window.alert('Status belum dapat diperbarui. Coba lagi sebentar lagi.');};document.querySelector('#finish-order').onclick=()=>{closeModal('checkout-modal');setDrawer(false)};
  }
  function renderForm(){
    const c=copy(),w=t(),content=document.querySelector('#checkout-content');
    document.querySelector('#checkout-title').textContent=({id:'Selesaikan pesanan.',en:'Complete your order.',ru:'Оформление заказа.',uz:'Buyurtmani rasmiylashtirish.'})[language()]||'Selesaikan pesanan.';
    document.querySelector('#step-indicator').innerHTML=c.steps.map((step,i)=>`<div class="step ${i===checkoutStep?'current':i<checkoutStep?'done':''}"><b>${i+1}</b><span>${step}</span></div>`).join('');
    if(checkoutStep===0)content.innerHTML=`<form id="identity-form" class="form-grid"><label class="full-field">${c.email}<input required type="email" name="email" value="${esc(checkoutData.email||'')}" autocomplete="email"></label><button class="button button-dark full-field">${c.continueAddress} <span>↗</span></button></form>`;
    else if(checkoutStep===1)content.innerHTML=`<form id="shipping-form" class="form-grid"><label>${c.name}<input required name="name" value="${esc(checkoutData.name||'')}" autocomplete="name"></label><label>${c.phone}<input required name="phone" type="tel" value="${esc(checkoutData.phone||'')}" autocomplete="tel" placeholder="08xxxxxxxxxx"></label><label class="full-field">${c.address}<textarea required name="address" rows="3" autocomplete="street-address">${esc(checkoutData.address||'')}</textarea></label><label class="full-field">${c.shipping}<select name="shipping"><option value="Reguler">${c.regular} · ${price(20000)} · 3–5 ${c.day}</option><option value="Express">${c.express} · ${price(45000)} · 1–2 ${c.day}</option><option value="Ambil di toko">${c.pickup} · ${c.free}</option></select></label><button class="button button-outline" type="button" data-back>← ${c.back}</button><button class="button button-dark">${c.choosePayment} <span>↗</span></button></form>`;
    else if(checkoutStep===2){
      const selected=checkoutData.paymentMethod||'qris';
      content.innerHTML=`<form id="payment-form"><h3>${w.payment}</h3><div class="payment-options">
      <label class="payment-option"><input type="radio" name="payment" value="qris" ${selected==='qris'?'checked':''}><span><b>${w.qris}</b><small>${w.scan}</small></span></label>
      <label class="payment-option"><input type="radio" name="payment" value="visa" ${selected==='visa'?'checked':''}><span><b>${w.visa}</b><small>Visa debit / credit</small></span></label>
      <label class="payment-option"><input type="radio" name="payment" value="bank" ${selected==='bank'?'checked':''}><span><b>${w.bank}</b><small>${w.bankNote}</small></span></label>
      <label class="payment-option"><input type="radio" name="payment" value="va" ${selected==='va'?'checked':''}><span><b>${w.va}</b><small>${w.vaNote}</small></span></label></div>
      ${selected==='visa'?`<section class="card-entry"><h4>${w.visa}</h4><p class="demo-note">Data kartu, masa berlaku, dan CVV akan dimasukkan langsung pada halaman pembayaran aman Midtrans. Sayfiddinovna Sport tidak menyimpan data kartu.</p></section>`:''}
      <div class="form-actions"><button class="button button-outline" type="button" data-back>← ${c.back}</button><button class="button button-dark">${w.review} <span>↗</span></button></div></form>`;
      content.querySelectorAll('input[name="payment"]').forEach(input=>input.addEventListener('change',()=>{checkoutData.paymentMethod=input.value;renderForm()}));
    }
    else{
      const subtotal=cart.reduce((sum,item)=>sum+products.find(p=>p.id===Number(item.id)).price*item.qty,0),discountAmount=discount(),shipping=shippingCost(checkoutData),total=subtotal-discountAmount+shipping;
      const lines=cart.map(item=>{const product=products.find(p=>p.id===Number(item.id));return `<p>${esc(product.name)} · ${esc(item.size)}, ${esc(item.color)} × ${item.qty}<b>${price(product.price*item.qty)}</b></p>`}).join('');
      content.innerHTML=`<div class="confirmation"><h3>${w.review}</h3><div class="summary-lines">${lines}<p>${c.subtotal}<b>${price(subtotal)}</b></p>${discountAmount?`<p>${c.discount}<b>− ${price(discountAmount)}</b></p>`:''}<p>${c.shippingCost} (${esc(checkoutData.shipping||c.regular)})<b>${price(shipping)}</b></p><p class="grand-total">${c.total}<b>${price(total)}</b></p></div><div class="address-preview"><b>${esc(checkoutData.name)}</b> · ${esc(checkoutData.phone)}<br>${esc(checkoutData.email)}<br>${esc(checkoutData.address)}<br>${w.payment}: ${esc(({qris:w.qris,visa:w.visa,bank:w.bank,va:w.va})[checkoutData.paymentMethod||'qris'])}</div><p class="demo-note">Pembayaran akan diproses melalui halaman aman Midtrans. Rincian pembayaran akan muncul setelah kamu melanjutkan.</p><div class="form-actions"><button class="button button-outline" data-back>← ${c.back}</button><button class="button button-dark" id="create-order">Bayar melalui Midtrans <span>↗</span></button></div></div>`;
    }
  }
  window.checkoutRender=renderForm;
  async function loadMidtransSnap(){
    const cfgResponse=await fetch('api/public-config.php',{headers:{'Accept':'application/json'}});
    const cfg=await cfgResponse.json();
    if(!cfgResponse.ok||!cfg.clientKey)throw new Error(cfg.message||'Konfigurasi Midtrans belum diisi.');
    if(window.snap)return cfg;
    await new Promise((resolve,reject)=>{
      const script=document.createElement('script');
      script.src=cfg.isProduction?'https://app.midtrans.com/snap/snap.js':'https://app.sandbox.midtrans.com/snap/snap.js';
      script.setAttribute('data-client-key',cfg.clientKey);
      script.onload=resolve;script.onerror=()=>reject(new Error('Tidak dapat memuat halaman pembayaran Midtrans.'));
      document.head.appendChild(script);
    });
    return cfg;
  }
  async function refreshPaymentStatus(orderId,email){
    try{
      const response=await fetch('api/payment-status.php',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify({order_id:orderId,email})});
      const result=await response.json();
      if(response.ok&&result.order){
        const key='sayfiddinovna-orders';let orders=[];try{orders=JSON.parse(localStorage.getItem(key)||'[]')}catch{}
        const saved=orders.findIndex(item=>item.id===orderId);
        if(saved>=0){orders[saved].paymentStatus=result.order.payment_status;orders[saved].status=result.order.order_status;localStorage.setItem(key,JSON.stringify(orders));}
        if(result.order.payment_status==='paid'){cart=[];promoApplied=false;saveCart();}
        if(currentOrder&&currentOrder.id===orderId){currentOrder.paymentStatus=result.order.payment_status;currentOrder.status=result.order.order_status;}
        const statusNode=document.querySelector('[data-payment-live-status]');if(statusNode)statusNode.textContent=result.order.payment_status+' · '+result.order.order_status;
        return result.order;
      }
    }catch(error){console.warn('Status pembayaran belum dapat diperbarui:',error)}
    return null;
  }
  document.querySelector('#checkout-content').addEventListener('click',async event=>{
    if(event.target.closest('[data-back]')){checkoutStep=Math.max(0,checkoutStep-1);renderForm();return;}
    const button=event.target.closest('#create-order');if(!button)return;
    button.disabled=true;button.textContent='Menghubungkan ke Midtrans…';
    try{
      const cfg=await loadMidtransSnap();
      const response=await fetch('api/create-payment.php',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify({
        customer:{name:checkoutData.name,email:checkoutData.email,phone:checkoutData.phone,address:checkoutData.address},
        shipping:checkoutData.shipping||'Reguler',promo_code:promoApplied?'HOCKEY10':'',
        payment_method:checkoutData.paymentMethod||'qris',
        items:cart.map(item=>({id:Number(item.id),size:item.size,color:item.color,qty:Number(item.qty)}))
      })});
      const result=await response.json();
      if(!response.ok||!result.token)throw new Error(result.message||'Gagal membuat transaksi Midtrans.');
      const order=result.order;
      const localOrder={id:order.order_id,email:checkoutData.email,name:checkoutData.name,phone:checkoutData.phone,address:checkoutData.address,shipping:checkoutData.shipping,totalIDR:order.gross_amount,paymentMethod:checkoutData.paymentMethod||'qris',paymentStatus:'Menunggu pembayaran',status:'Menunggu pembayaran',created:new Date().toISOString()};
      storeOrder(localOrder);currentOrder=localOrder;
      window.snap.pay(result.token,{
        onSuccess:async()=>{await refreshPaymentStatus(order.order_id,checkoutData.email);renderPending(currentOrder);},
        onPending:async()=>{await refreshPaymentStatus(order.order_id,checkoutData.email);renderPending(currentOrder);},
        onError:async()=>{await refreshPaymentStatus(order.order_id,checkoutData.email);renderPending(currentOrder);},
        onClose:async()=>{await refreshPaymentStatus(order.order_id,checkoutData.email);renderPending(currentOrder);}
      });
      button.disabled=false;button.textContent='Bayar melalui Midtrans ↗';
    }catch(error){
      console.error('Midtrans checkout error:',error);window.alert(error.message||'Pembayaran belum dapat diproses.');button.disabled=false;button.textContent='Coba lagi';
    }
  });
  const trackingForm=document.querySelector('#tracking-form');
  trackingForm?.addEventListener('submit',async event=>{event.preventDefault();const data=new FormData(trackingForm),id=String(data.get('order')||'').trim().toUpperCase(),email=String(data.get('email')||'').trim().toLowerCase(),result=document.querySelector('#tracking-result');result.textContent='Memeriksa status pesanan…';try{const response=await fetch('api/payment-status.php',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify({order_id:id,email})});const payload=await response.json();result.textContent=response.ok&&payload.order?`${payload.order.order_id}: ${payload.order.payment_status} · ${payload.order.order_status}`:(payload.message||t().notFound);}catch(error){result.textContent=t().notFound;}});
  document.querySelector('#page-tracking-form')?.addEventListener('submit',event=>{event.preventDefault();const data=new FormData(event.currentTarget),id=String(data.get('order')||'').trim().toUpperCase(),email=String(data.get('email')||'').trim().toLowerCase(),result=document.querySelector('#page-tracking-result');let orders=[];try{orders=JSON.parse(localStorage.getItem('sayfiddinovna-orders')||'[]')}catch{}const order=orders.find(item=>item.id===id&&String(item.email||'').toLowerCase()===email);result.textContent=order?`${order.id}: ${order.paymentStatus} · ${order.status}`:t().notFound;});
  window.addEventListener('hockey-language-change',()=>{if(!document.querySelector('#checkout-modal')?.classList.contains('open'))return;if(currentOrder)renderPending(currentOrder);else renderForm();});
})();
