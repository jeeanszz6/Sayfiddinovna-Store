(()=>{
  let user,users=[];try{user=JSON.parse(localStorage.getItem('sayfiddinovna-user')||'null');users=JSON.parse(localStorage.getItem('sayfiddinovna-local-users')||'[]')}catch{}
  if(!user?.email||!Array.isArray(users)||!users.some(account=>account?.email===user.email)){localStorage.removeItem('sayfiddinovna-user');location.replace('masuk.html');return;}
  const name=document.querySelector('#profile-name'),email=document.querySelector('#profile-email'),form=document.querySelector('#profile-edit-form'),message=document.querySelector('#profile-message');
  const show=()=>{name.textContent=user.name||'Belum ditambahkan';email.textContent=user.email};show();
  try{const checkout=JSON.parse(localStorage.getItem('sayfiddinovna-checkout-details')||'{}');if(checkout.address)document.querySelector('#saved-address').textContent=`${checkout.name||user.name} · ${checkout.phone||''} · ${checkout.address}`}catch{}
  const points=Number(localStorage.getItem('sayfiddinovna-member-points')||0),joined=localStorage.getItem('sayfiddinovna-member')==='yes';document.querySelector('#member-summary').textContent=joined?`Member · ${points.toLocaleString('id-ID')} poin`:'Kamu belum bergabung dengan program membership.';
  document.querySelector('#profile-edit-toggle').addEventListener('click',()=>{form.hidden=!form.hidden;form.elements.name.value=user.name||'';if(!form.hidden)form.elements.name.focus()});
  document.querySelector('#profile-edit-cancel').addEventListener('click',()=>{form.hidden=true});
  form.addEventListener('submit',event=>{event.preventDefault();const newName=form.elements.name.value.trim();if(newName.length<2){message.textContent='Masukkan nama minimal 2 karakter.';return;}user={...user,name:newName};localStorage.setItem('sayfiddinovna-user',JSON.stringify(user));try{const users=JSON.parse(localStorage.getItem('sayfiddinovna-local-users')||'[]'),account=users.find(item=>item.email===user.email);if(account){account.name=newName;localStorage.setItem('sayfiddinovna-local-users',JSON.stringify(users));}}catch{}show();form.hidden=true;message.textContent='Nama berhasil diperbarui di browser ini.'});
  document.querySelector('#account-logout').addEventListener('click',()=>{localStorage.removeItem('sayfiddinovna-user');location.href='index.html'});
})();
