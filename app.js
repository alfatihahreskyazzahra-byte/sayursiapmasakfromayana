let katAktif="Semua Produk"; let showAll=false;
let cart=JSON.parse(localStorage.getItem('sayur_cart')||'[]');
let riwayat=JSON.parse(localStorage.getItem('sayur_riwayat')||'[]');

function slug(nama){ return nama.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,''); }

function getFotoHTML(p){
  let s = slug(p.nama);
  let fotoAdmin = localStorage.getItem('foto_' + s);
  if(fotoAdmin){
    return `<img src="${fotoAdmin}" style="width:100%;height:100%;object-fit:cover;display:block" loading="lazy">`;
  }
  let emoji = EMOJI[p.kat] || '🥬';
  return `<img src="uploads/${s}.jpg" style="width:100%;height:100%;object-fit:cover;display:block" loading="lazy" onerror="this.style.display='none'; this.parentElement.innerHTML='${emoji}<span class=badge-kat>${p.kat}</span>'; this.parentElement.style.display='grid'; this.parentElement.style.placeItems='center'; this.parentElement.style.fontSize='36px';">`;
}

function getAllProduk(){
  let asli = typeof PRODUK !== 'undefined' ? PRODUK : [];
  let tambahan = JSON.parse(localStorage.getItem('produk_tambahan')||'[]');
  let terhapus = JSON.parse(localStorage.getItem('produk_terhapus')||'[]');
  let gabung = [...asli, ...tambahan];
  // Filter yang sudah dihapus di admin-menu.html
  return gabung.filter(p=> !terhapus.includes(slug(p.nama)));
}

function renderKategori(){
 document.getElementById('catList').innerHTML=KATEGORI.map(k=>`<div class="cat ${k===katAktif?'active':''}" onclick="filterKat('${k}')"><div class="cat-icon">${EMOJI[k]||'🥗'}</div><p style="font-size:11px;margin-top:4px">${k}</p></div>`).join('');
}
function getListTampil(){
 let list = katAktif==="Semua Produk"?getAllProduk():getAllProduk().filter(p=>p.kat===katAktif);
 if(katAktif==="Semua Produk" &&!showAll) list=list.slice(0,6);
 return list;
}
function renderProduk(list){
 document.getElementById('grid').innerHTML=list.map(p=>`<div class="card"><div class="card-img">${getFotoHTML(p)}<span class="badge-kat">${p.kat}</span></div><div class="card-body"><h4 class="nama-produk">${p.nama}</h4><p class="bahan-singkat">${p.tampil}</p><div class="price">Rp ${p.harga.toLocaleString('id-ID')}</div><button class="btn-pesan" onclick="tambahCart(${p.id})">🛒 Pesan</button></div></div>`).join('');
}
function filterKat(k){
 katAktif=k; if(k!=="Semua Produk") showAll=true;
 document.getElementById('btnLihatSemua').innerText=(k==="Semua Produk" &&!showAll)?"Lihat Semua >":"Tutup <";
 renderKategori(); renderProduk(k==="Semua Produk"?(showAll?getAllProduk():getAllProduk().slice(0,6)):getAllProduk().filter(p=>p.kat===k));
}
function toggleLihatSemua(){
 if(katAktif!=="Semua Produk"){katAktif="Semua Produk";}
 showAll=!showAll;
 document.getElementById('btnLihatSemua').innerText=showAll?"Tutup <":"Lihat Semua >";
 renderKategori(); renderProduk(showAll?getAllProduk():getAllProduk().slice(0,6));
}
function filterProduk(){
 const q=document.getElementById('searchInput').value.toLowerCase();
 if(!q){renderProduk(getListTampil()); return;}
 renderProduk(getAllProduk().filter(p=>p.nama.toLowerCase().includes(q)||p.tampil.toLowerCase().includes(q)));
}

// ====== FIX UTAMA: PESAN LANGSUNG KE KERANJANG ======
function tambahCart(id){
 const prod=getAllProduk().find(p=>p.id===id); 
 const i=cart.findIndex(c=>c.id===id);
 if(i>-1)cart[i].qty++; else cart.push({...prod,qty:1});
 localStorage.setItem('sayur_cart',JSON.stringify(cart)); 
 updateBadge();
 
 // AUTO PINDAH KE KERANJANG
 showPage('cart', document.getElementById('navCart'));
 setTimeout(()=>{
   document.getElementById('cartPage').scrollIntoView({behavior:'smooth', block:'start'});
 }, 150);
}

function updateBadge(){
 const t=cart.reduce((a,b)=>a+b.qty,0);
 const e=document.getElementById('cartCount');
 if(e){ e.style.display=t>0?'grid':'none'; e.innerText=t; }
 renderCart();
}
function renderCart(){
 let total=0;
 const listEl=document.getElementById('cartList');
 if(!listEl) return;
 listEl.innerHTML=cart.length===0?'<p style="text-align:center;color:#94a3b8;padding:20px">Keranjang kosong</p>':cart.map((c,i)=>{total+=c.harga*c.qty; return `<div class="cart-item"><div style="font-size:28px">${EMOJI[c.kat]}</div><div style="flex:1"><b style="font-size:13px">${c.nama}</b><br><small>${c.tampil}</small><br><small>Rp ${c.harga} x ${c.qty}</small></div><div style="text-align:right"><b>Rp ${(c.harga*c.qty).toLocaleString('id-ID')}</b><br><button onclick="ubahQty(${i},-1)" style="width:24px;height:24px;border-radius:50%">-</button> ${c.qty} <button onclick="ubahQty(${i},1)" style="width:24px;height:24px;border-radius:50%">+</button></div></div>`}).join('');
 const totalEl=document.getElementById('totalB');
 if(totalEl) totalEl.innerText='Rp '+total.toLocaleString('id-ID');
}
function ubahQty(i,d){cart[i].qty+=d; if(cart[i].qty<=0)cart.splice(i,1); localStorage.setItem('sayur_cart',JSON.stringify(cart)); updateBadge();}
function showPage(p,el){
 document.getElementById('homePage').style.display=p==='home'?'block':'none';
 document.getElementById('cartPage').style.display=p==='cart'?'block':'none';
 document.getElementById('pesananPage').style.display=p==='pesanan'?'block':'none';
 document.querySelectorAll('.nav').forEach(n=>n.classList.remove('active'));
 if(el)el.classList.add('active');
 else {
   if(p==='home') document.getElementById('navHome').classList.add('active');
   if(p==='cart') document.getElementById('navCart').classList.add('active');
 }
 if(p==='cart')renderCart();
 if(p==='pesanan')renderRiwayat();
 if(p==='home'){renderKategori(); renderProduk(getListTampil());}
}
function checkoutWA(){
 if(cart.length===0)return alert('Keranjang kosong');
 document.getElementById('strukTanggal').innerText=new Date().toLocaleString('id-ID');
 let html=""; let tot=0;
 cart.forEach(c=>{tot+=c.harga*c.qty; html+=`<div style="display:flex;justify-content:space-between;margin:6px 0;font-size:13px"><div><b>${c.nama}</b><br><small>${c.tampil} x${c.qty}</small></div><div>Rp ${(c.harga*c.qty).toLocaleString('id-ID')}</div></div>`});
 document.getElementById('strukIsi').innerHTML=html;
 document.getElementById('strukTotal').innerText='Rp '+tot.toLocaleString('id-ID');
 document.getElementById('strukModal').style.display='block';
}
function closeStruk(){document.getElementById('strukModal').style.display='none';}

function confirmCheckoutWA(){
 const nama=document.getElementById('inputNama').value.trim();
 const alamat=document.getElementById('inputAlamat').value.trim();
 const hpEl=document.getElementById('inputNoHP')||document.getElementById('inputHP');
 const nohp=hpEl?hpEl.value.trim():'';
 if(!nama||!alamat)return alert('Isi nama & alamat dulu');
 const total=cart.reduce((a,b)=>a+b.harga*b.qty,0);
 riwayat.unshift({
   nama:nama, alamat:alamat,
   items:cart.map(c=> ({nama:c.nama, tampil:c.tampil, qty:c.qty}) ),
   total:total, tanggal:new Date().toLocaleString('id-ID')
 });
 localStorage.setItem('sayur_riwayat',JSON.stringify(riwayat));
 const detailGram = cart.map(c=>`- ${c.nama} x${c.qty}: ${c.gram || c.tampil}`).join('\n');
 const itemsSingkat = cart.map(c=> c.nama + ' x' + c.qty).join(', ');
 const hppTotal = cart.reduce((a,b)=>a+(b.hpp||0)*b.qty,0);
 fetch(SHEET_URL,{
   method:"POST", mode:"no-cors", headers:{"Content-Type":"text/plain;charset=utf-8"},
   body:JSON.stringify({ tanggal:new Date().toLocaleString('id-ID'), nama:nama, alamat:alamat, nohp:nohp, items:itemsSingkat, subtotal:total, ongkir:0, total:total, rincian_gram:detailGram, hpp:hppTotal })
 });
 let pesan = `*Halo SayurSiapMasakAi*, saya mau pesan:\n`;
 cart.forEach((c,i)=>{ pesan += `${i+1}. ${c.nama} x ${c.qty} = Rp ${(c.harga*c.qty).toLocaleString('id-ID')}\n`; });
 pesan += `Total: Rp ${total.toLocaleString('id-ID')}\nNama: ${nama}\nNo HP: ${nohp}\nAlamat: ${alamat}\nTerima kasih!`;
 window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(pesan)}`,'_blank');
 cart=[]; localStorage.setItem('sayur_cart','[]'); updateBadge(); closeStruk();
 showPage('pesanan', document.querySelectorAll('.nav')[2]);
}
function renderRiwayat(){
 const el = document.getElementById('riwayatList'); if(!el) return;
 riwayat = JSON.parse(localStorage.getItem('sayur_riwayat')||'[]');
 if(riwayat.length===0){ el.innerHTML='<div style="text-align:center;padding:40px 20px;color:#94a3b8"><div style="font-size:40px">📋</div><p>Belum ada riwayat pesanan</p></div>'; return; }
 el.innerHTML=riwayat.map((r,i)=>{
   let itemsText = Array.isArray(r.items) ? r.items.map(it=> (it.nama||it) + ' x' + (it.qty||1)).join(', ') : r.items || '';
   return `<div style="background:white;border-radius:14px;padding:14px;margin-bottom:10px;border:1px solid #e2e8f0"><div style="display:flex;justify-content:space-between"><b style="color:#0f6d3a;font-size:13px">${r.tanggal}</b><span style="font-size:11px;background:#fef3c7;padding:2px 8px;border-radius:20px">Selesai</span></div><div style="margin-top:8px;font-size:13px"><b>${r.nama}</b><br><small style="color:#64748b">${r.alamat}</small></div><div style="margin-top:8px;font-size:12px;color:#334155;background:#f8fafc;padding:8px;border-radius:8px">${itemsText}</div><div style="margin-top:8px;display:flex;justify-content:space-between;align-items:center"><b style="color:#0f6d3a">Rp ${(r.total||0).toLocaleString('id-ID')}</b><button onclick="hapusRiwayat(${i})" style="border:0;background:transparent;color:#ef4444;font-size:11px">Hapus</button></div></div>`;
 }).join('');
}
function hapusRiwayat(i){ if(confirm('Hapus riwayat ini?')){ riwayat.splice(i,1); localStorage.setItem('sayur_riwayat',JSON.stringify(riwayat)); renderRiwayat(); } }
function downloadStruk(){ alert('Silakan screenshot struk ini'); }

renderKategori(); renderProduk(getAllProduk().slice(0,6)); updateBadge(); renderRiwayat();