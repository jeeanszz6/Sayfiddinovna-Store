(()=>{
  const read=(key,fallback=[])=>{try{const value=JSON.parse(localStorage.getItem(key)||JSON.stringify(fallback));return Array.isArray(value)?value:fallback}catch{return fallback}};
  document.querySelector('#page-tracking-form')?.addEventListener('submit',async event=>{
    event.preventDefault();const data=new FormData(event.currentTarget),id=String(data.get('order')||'').trim().toUpperCase(),email=String(data.get('email')||'').trim().toLowerCase(),result=document.querySelector('#page-tracking-result');
    result.textContent='Memeriksa status pesanan…';
    try{const response=await fetch('api/payment-status.php',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify({order_id:id,email})});const payload=await response.json();result.textContent=response.ok&&payload.order?`${payload.order.order_id}: ${payload.order.payment_status} · ${payload.order.order_status} · Informasi resi tersedia setelah pesanan dikirim.`:(payload.message||'Pesanan tidak ditemukan. Periksa nomor pesanan dan email.');}
    catch(error){const order=read('sayfiddinovna-orders').find(item=>item.id===id&&String(item.email||'').toLowerCase()===email);result.textContent=order?`${order.id}: ${order.paymentStatus} · ${order.status}`:'Status belum dapat diperiksa. Coba lagi setelah koneksi tersedia.';}
  });
  document.querySelector('#page-return-form')?.addEventListener('submit',event=>{
    event.preventDefault();const data=new FormData(event.currentTarget),id=String(data.get('order')||'').trim().toUpperCase(),email=String(data.get('email')||'').trim().toLowerCase(),reason=String(data.get('reason')||'').trim(),result=document.querySelector('#page-return-result'),button=event.currentTarget.querySelector('button');button.disabled=true;
    const orders=read('sayfiddinovna-orders'),order=orders.find(item=>item.id===id&&String(item.email||'').toLowerCase()===email);
    if(!order){result.textContent='Pesanan tidak ditemukan di browser ini.';button.disabled=false;return;}
    if(reason.length<10){result.textContent='Jelaskan alasan retur setidaknya 10 karakter.';button.disabled=false;return;}
    const requests=read('sayfiddinovna-returns');requests.unshift({orderId:id,reason,status:'Diajukan',created:new Date().toISOString()});localStorage.setItem('sayfiddinovna-returns',JSON.stringify(requests));result.textContent=`Pengajuan retur untuk ${id} disimpan di browser ini. Hubungi toko melalui WhatsApp untuk tindak lanjut.`;event.currentTarget.reset();button.disabled=false;
  });
  document.querySelector('.menu-toggle')?.addEventListener('click',event=>{const nav=document.querySelector('.main-nav'),open=nav.classList.toggle('open');event.currentTarget.setAttribute('aria-expanded',String(open))});
})();
