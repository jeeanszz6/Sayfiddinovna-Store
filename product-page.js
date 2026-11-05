(()=>{
  const root=document.getElementById('product-detail-page');
  if(!root)return;
  const products=Array.isArray(window.HOCKEY_PRODUCTS)?window.HOCKEY_PRODUCTS:[];
  const photos=window.HOCKEY_PHOTOS||{};
  const query=new URLSearchParams(location.search);
  const requestedId=Number(query.get('id'))||1;
  const product=products.find(item=>Number(item.id)===requestedId);
  if(!product){root.innerHTML='<p class="empty-results">Produk tidak ditemukan. Kembali ke <a href="katalog.html">katalog</a>.</p>';return;}

  const language=(()=>{try{return localStorage.getItem('sayfiddinovna-language')||'ru'}catch{return 'ru'}})();
  const photo=photos[product.id]||{src:'assets/foto-produk/produk-01.jpg',source:'Sayfiddinovna Sport',page:'katalog.html'};
  const copy=window.HOCKEY_PRODUCT_COPY?.[product.id]||{};
  const description=copy[language]||copy.id||copy.ru||'Perlengkapan hoki untuk menemani latihan dan pertandingan.';
  const money=value=>window.HOCKEY_CURRENCY?.format(value)||new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',maximumFractionDigits:0}).format(value);
  const escape=value=>String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const names={
    en:{1:'JB 8 Composite Hockey Stick',2:'Osaka Mid bow wg field hockey stick',3:'TK 2.1 Control Bow Hockey Stick',4:'Outdoor hockey ball',5:'Indoor hockey ball',6:'adidas hockey Shin Pads',7:'Osaka Pro bow gf indoor hockey stick',8:'Osaka Pro bow 10 indoor hockey stick',9:'Grays Penalty Corner Facemask',10:'Hockey Penalty Corner Facemask OOP',11:'Osaka Indoor Hockey Glove | Iconic Black',12:'Mouth guard triple safety',13:'Mouth guard double safety',14:'Adidas Fabela X 2 LE Hockey Shoes',15:'Mizuno Wave Gaia 3',16:'adidas Chaosfury .40 LE Hockey Stick',17:'OBO Robo Hi-Rebound Glove - left Hand',18:'OBO Robo Hi-Rebound Glove - right Hand',19:'Osaka Pro tour large hockey stick bag',20:'Anti-Slip Chamois Grip Wrap',21:'Coquette Hockey Players Sticker'},
    id:{21:'Sticker Pemain Hoki Coquette'},uz:{21:'Coquette xokkeychilar stikeri'},ru:{21:'Стикер с хоккеистами coquette'}
  };
  const title=names[language]?.[product.id]||product.name;
  root.innerHTML=`<nav class="detail-breadcrumb"><a href="index.html">Beranda</a> / <a href="katalog.html">Katalog</a> / ${escape(product.category)}</nav>
    <section class="product-detail-layout"><div class="detail-gallery"><div class="detail-main-image"><img id="hero-product-photo" src="${escape(photo.src)}" alt="${escape(title)}"><span class="gallery-tag">SAYFIDDINOVNA SPORT</span></div>
    <p class="photo-credit">Foto produk: <a href="${escape(photo.page)}" target="_blank" rel="noopener noreferrer">${escape(photo.source)} ↗</a>. Gambar hanya ilustrasi; model dapat berbeda dari SKU katalog.</p></div>
    <div class="product-detail-copy"><span class="eyebrow">${escape(product.category)} · ${escape(product.material)}</span><h1>${escape(title)}</h1><p class="product-lede">${escape(description)}</p><strong class="detail-product-price">${money(product.price)}</strong>
    <form id="product-buy-form" class="product-buy-form"><label>Ukuran / varian<select name="size" required>${product.sizes.map(value=>`<option value="${escape(value)}">${escape(value)}</option>`).join('')}</select></label>
    <label>Warna<select name="color" required>${product.colors.map(value=>`<option value="${escape(value)}">${escape(value)}</option>`).join('')}</select></label>
    <label>Jumlah<div class="detail-qty"><button type="button" data-step="-1" aria-label="Kurangi jumlah">−</button><input name="qty" type="number" min="1" max="20" value="1" required><button type="button" data-step="1" aria-label="Tambah jumlah">+</button></div></label>
    <button class="button button-dark" type="submit">Tambah ke keranjang <span>↗</span></button><p data-cart-message role="status" aria-live="polite"></p></form>
    <a class="size-help" href="panduan-ukuran.html">Butuh bantuan ukuran? Buka panduan ukuran ↗</a><div class="delivery-note"><b>Pengiriman dan bantuan</b><span>Hubungi <a href="tel:+6281319831225">081319831225</a> untuk pertanyaan produk.</span></div></div></section>
    <section class="section related-detail"><div class="section-heading"><div><span class="eyebrow">LANJUTKAN BELANJA</span><h2>Produk lainnya.</h2></div><a class="text-link" href="katalog.html">Lihat katalog ↗</a></div><div class="product-grid">${products.filter(item=>item.id!==product.id).slice(0,4).map(item=>`<a class="product-card" href="produk.html?id=${item.id}"><div class="product-image"><img class="product-photo" src="${escape(photos[item.id]?.src||photo.src)}" alt="${escape(item.name)}" loading="lazy"></div><div class="product-info"><h3>${escape(item.name)}</h3><b>${money(item.price)}</b></div></a>`).join('')}</div></section>`;

  const form=root.querySelector('#product-buy-form');
  const message=form.querySelector('[data-cart-message]');
  form.addEventListener('click',event=>{
    const button=event.target.closest('[data-step]');
    if(!button)return;
    const input=form.elements.qty;
    input.value=Math.max(1,Math.min(20,(Number(input.value)||1)+Number(button.dataset.step)));
  });
  form.addEventListener('submit',event=>{
    event.preventDefault();
    const data=new FormData(form),qty=Number(data.get('qty'));
    if(!form.reportValidity())return;
    if(!Number.isInteger(qty)||qty<1||qty>20){message.textContent='Jumlah harus antara 1 dan 20.';return;}
    const item={id:Number(product.id),size:String(data.get('size')),color:String(data.get('color')),qty};
    if(!product.sizes.includes(item.size)||!product.colors.includes(item.color)){message.textContent='Pilih ukuran dan warna yang tersedia.';return;}
    try{
      const key='sayfiddinovna-hockey-cart';
      const saved=JSON.parse(localStorage.getItem(key)||'[]');
      const cart=Array.isArray(saved)?saved:[];
      const previous=cart.find(line=>Number(line.id)===item.id&&line.size===item.size&&line.color===item.color);
      if(previous&&Number(previous.qty)+qty>20){message.textContent='Jumlah maksimum untuk varian ini adalah 20.';return;}
      if(previous)previous.qty=Number(previous.qty)+qty;else cart.push(item);
      localStorage.setItem(key,JSON.stringify(cart));
      location.href='index.html?checkout=1#unggulan';
    }catch(error){message.textContent='Keranjang gagal disimpan. Periksa izin penyimpanan browser lalu coba lagi.';console.error('Gagal menyimpan keranjang:',error);}
  });
  document.addEventListener('change',event=>{if(event.target.matches('#language-switch'))location.reload();});
})();
