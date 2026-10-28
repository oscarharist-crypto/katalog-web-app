const SHEET_PRODUCTS = 'Products';
const SHEET_SETTINGS = 'Settings';
const DATABASE_ID_KEY = 'DATABASE_ID';
const ADMIN_PIN_KEY = 'ADMIN_PIN';

// Halaman HTML ditanam di file ini agar tidak ada error "HTML file named index was not found".
// Untuk memperbarui tampilan, gunakan file TXT panduan sebagai sumber dan ganti konstanta HTML_PAGE.
const HTML_PAGE = "<!DOCTYPE html>\n<html>\n<head>\n  <base target=\"_top\">\n  <meta charset=\"utf-8\">\n  <style>\n    :root{--accent:#2563eb;--ink:#172033;--muted:#64748b;--line:#e2e8f0;--bg:#f5f7fb}\n    *{box-sizing:border-box}body{margin:0;background:var(--bg);font:15px/1.5 Arial,sans-serif;color:var(--ink)}\n    button,input,textarea,select{font:inherit}button{cursor:pointer;border:0;border-radius:10px;padding:10px 14px;background:var(--accent);color:#fff;font-weight:700}\n    button.secondary{background:#e8edf5;color:#172033}button.danger{background:#dc2626}.wrap{max-width:1180px;margin:auto;padding:20px}\n    header{background:#fff;border-bottom:1px solid var(--line);position:sticky;top:0;z-index:5}\n    .head{max-width:1180px;margin:auto;padding:16px 20px;display:flex;gap:12px;align-items:center;justify-content:space-between}\n    h1,h2,h3,p{margin-top:0}h1{font-size:24px;margin-bottom:2px}h2{font-size:22px}.muted{color:var(--muted)}.hero{padding:25px 0}\n    .notice{padding:12px 15px;background:#eaf2ff;border-radius:12px;margin:10px 0 18px}\n    .tools{display:flex;gap:10px;flex-wrap:wrap;margin:15px 0}.tools input,.tools select{flex:1;min-width:150px}\n    input,textarea,select{width:100%;padding:10px 11px;border:1px solid #cbd5e1;border-radius:9px;background:#fff;color:var(--ink)}\n    label{display:block;font-weight:700;font-size:13px;margin:12px 0 5px}.grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px}\n    .card,.panel{background:#fff;border:1px solid var(--line);border-radius:15px;overflow:hidden}.card img{width:100%;height:190px;object-fit:cover;background:#e2e8f0}\n    .placeholder{height:190px;display:grid;place-items:center;background:#e2e8f0;color:#64748b}.cardbody{padding:14px}.price{font-weight:800;font-size:18px;color:var(--accent)}\n    .old{font-size:13px;color:#94a3b8;text-decoration:line-through;margin-left:7px}.tag{font-size:12px;background:#eef2ff;color:#3730a3;padding:4px 8px;border-radius:20px}\n    .row{display:flex;align-items:center;justify-content:space-between;gap:10px}.desc{color:#475569;font-size:14px;white-space:pre-wrap}.panel{padding:18px;margin:16px 0}.hidden{display:none!important}\n    .formgrid{display:grid;grid-template-columns:1fr 1fr;gap:0 14px}.full{grid-column:1/-1}.actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:14px}\n    .adminlist{display:grid;grid-template-columns:1fr;gap:8px}.adminitem{padding:12px;border:1px solid var(--line);border-radius:10px;display:flex;justify-content:space-between;gap:10px;align-items:center}\n    .status{margin:10px 0;color:#0f766e}.footer{text-align:center;padding:30px;color:var(--muted);font-size:13px}\n    dialog{border:0;border-radius:16px;width:min(600px,94vw);padding:22px;box-shadow:0 20px 60px #0f172a44}dialog::backdrop{background:#0f172a88}\n    .video{width:100%;aspect-ratio:16/9;border:0;border-radius:10px}\n    @media(max-width:900px){.grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:560px){.grid{grid-template-columns:1fr}.head{align-items:flex-start}.formgrid{grid-template-columns:1fr}.full{grid-column:auto}.wrap{padding:14px}.card img,.placeholder{height:220px}}\n  </style>\n</head>\n<body>\n<header><div class=\"head\"><div><h1 id=\"siteName\">Katalog Saya</h1><div class=\"muted\" id=\"tagline\">Temukan produk favorit Anda</div></div><button class=\"secondary\" onclick=\"openLogin()\">\u2699 Admin</button></div></header>\n<main class=\"wrap\">\n  <section class=\"hero\"><h2>Jelajahi katalog</h2><p class=\"muted\">Cari produk, lihat harga, detail, dan video.</p><div id=\"announcement\" class=\"notice hidden\"></div>\n    <div class=\"tools\"><input id=\"search\" placeholder=\"Cari nama/deskripsi produk...\" oninput=\"renderProducts()\"><select id=\"category\" onchange=\"renderProducts()\"><option value=\"\">Semua kategori</option></select><select id=\"sort\" onchange=\"renderProducts()\"><option value=\"new\">Terbaru</option><option value=\"low\">Harga terendah</option><option value=\"high\">Harga tertinggi</option><option value=\"name\">Nama A\u2013Z</option></select></div>\n  </section>\n  <div id=\"loading\" class=\"muted\">Memuat katalog...</div><section id=\"products\" class=\"grid\"></section><div id=\"empty\" class=\"panel hidden\">Produk belum tersedia atau tidak ditemukan.</div>\n  <section class=\"panel\"><h3>Hubungi kami</h3><p id=\"contactText\" class=\"muted\">Hubungi admin untuk informasi lebih lanjut.</p><div class=\"actions\" id=\"contactActions\"></div></section>\n  <section id=\"adminPanel\" class=\"panel hidden\">\n    <div class=\"row\"><div><h2>Panel admin</h2><p class=\"muted\">Kelola produk dan pengaturan katalog.</p></div><button class=\"secondary\" onclick=\"logout()\">Keluar</button></div>\n    <div class=\"actions\"><button onclick=\"newProduct()\">+ Tambah produk</button><button class=\"secondary\" onclick=\"showSettings()\">Pengaturan situs</button><button class=\"secondary\" onclick=\"showProductList()\">Daftar produk</button></div>\n    <div id=\"productEditor\" class=\"hidden\">\n      <h3 id=\"editorTitle\">Tambah produk</h3>\n      <div class=\"formgrid\">\n        <div class=\"full\"><label>Nama produk *</label><input id=\"pName\" placeholder=\"Nama produk\"></div>\n        <div><label>Kategori</label><input id=\"pCategory\" placeholder=\"Mis. Pakaian\"></div>\n        <div><label>Stok</label><input id=\"pStock\" type=\"number\" min=\"0\" value=\"0\"></div>\n        <div><label>Harga (angka)</label><input id=\"pPrice\" type=\"number\" min=\"0\" value=\"0\"></div>\n        <div><label>Harga sebelum diskon (opsional)</label><input id=\"pOldPrice\" type=\"number\" min=\"0\" value=\"0\"></div>\n        <div class=\"full\"><label>URL foto (https://...)</label><input id=\"pImage\" placeholder=\"https://alamat-gambar.jpg\"></div>\n        <div class=\"full\"><label>URL video (opsional, YouTube atau video https)</label><input id=\"pVideo\" placeholder=\"https://youtube.com/watch?v=...\"></div>\n        <div class=\"full\"><label>Deskripsi</label><textarea id=\"pDescription\" rows=\"4\"></textarea></div>\n        <div class=\"full\"><label><input id=\"pFeatured\" type=\"checkbox\" style=\"width:auto\"> Tandai sebagai unggulan</label></div>\n      </div>\n      <div class=\"actions\"><button onclick=\"saveProduct()\">Simpan produk</button><button class=\"secondary\" onclick=\"cancelEditor()\">Batal</button></div>\n    </div>\n    <div id=\"settingsEditor\" class=\"hidden\">\n      <h3>Pengaturan situs</h3><div class=\"formgrid\">\n        <div class=\"full\"><label>Nama situs</label><input id=\"sSiteName\"></div><div class=\"full\"><label>Slogan</label><input id=\"sTagline\"></div>\n        <div><label>Mata uang</label><select id=\"sCurrency\"><option value=\"IDR\">Rupiah (IDR)</option><option value=\"USD\">US Dollar (USD)</option><option value=\"MYR\">Ringgit (MYR)</option><option value=\"SGD\">Singapore Dollar (SGD)</option></select></div>\n        <div><label>Warna utama</label><input id=\"sColor\" type=\"color\" value=\"#2563eb\"></div>\n        <div class=\"full\"><label>Nomor WhatsApp (format internasional, tanpa + atau spasi)</label><input id=\"sWhatsapp\" placeholder=\"628123456789\"></div>\n        <div class=\"full\"><label>Email kontak</label><input id=\"sEmail\" type=\"email\"></div>\n        <div class=\"full\"><label>Pesan pengumuman</label><input id=\"sAnnouncement\"></div>\n        <div class=\"full\"><label>PIN admin baru (simpan baik-baik)</label><input id=\"sPin\" type=\"password\" placeholder=\"Isi hanya jika ingin mengganti PIN\"></div>\n      </div><div class=\"actions\"><button onclick=\"saveSettings()\">Simpan pengaturan</button><button class=\"secondary\" onclick=\"showProductList()\">Kembali</button></div>\n    </div>\n    <div id=\"productList\"><h3>Daftar produk</h3><div id=\"adminProducts\" class=\"adminlist\"></div></div>\n    <div id=\"adminStatus\" class=\"status\"></div>\n  </section>\n</main>\n<footer class=\"footer\">Katalog online \u2022 Dibuat dengan Google Apps Script</footer>\n\n<dialog id=\"loginDialog\"><h2>Masuk admin</h2><p class=\"muted\">Masukkan PIN admin.</p><label>PIN</label><input id=\"loginPin\" type=\"password\" onkeydown=\"if(event.key==='Enter')login()\"><div class=\"actions\"><button onclick=\"login()\">Masuk</button><button class=\"secondary\" onclick=\"document.getElementById('loginDialog').close()\">Batal</button></div><div id=\"loginError\" class=\"status\"></div></dialog>\n<dialog id=\"detailDialog\"><div class=\"row\"><h2 id=\"detailTitle\"></h2><button class=\"secondary\" onclick=\"document.getElementById('detailDialog').close()\">Tutup</button></div><div id=\"detailContent\"></div></dialog>\n<script>\nlet appData={products:[],settings:{}}, adminPin='', editingId='';\nconst $=id=>document.getElementById(id);\nfunction callServer(name,...args){return new Promise((resolve,reject)=>google.script.run.withSuccessHandler(resolve).withFailureHandler(e=>reject(new Error(e.message||e)))[name](...args))}\nfunction escapeHtml(s){return String(s==null?'':s).replace(/[&<>\"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;',\"'\":'&#39;'}[c]))}\nfunction money(n){const currency=appData.settings.currency||'IDR';try{return new Intl.NumberFormat('id-ID',{style:'currency',currency,maximumFractionDigits:currency==='IDR'?0:2}).format(Number(n||0))}catch(e){return String(n)}}\nfunction safeLink(url){try{const u=new URL(url);return ['http:','https:'].includes(u.protocol)?u.href:''}catch(e){return ''}}\nfunction load(){callServer('getPublicData').then(data=>{appData=data;applySettings();populateCategories();renderProducts();$('loading').classList.add('hidden')}).catch(e=>{$('loading').textContent='Gagal memuat data: '+e.message})}\nfunction applySettings(){const s=appData.settings||{};document.documentElement.style.setProperty('--accent',/^#[0-9a-f]{6}$/i.test(s.themeColor||'')?s.themeColor:'#2563eb');$('siteName').textContent=s.siteName||'Katalog Saya';$('tagline').textContent=s.tagline||'';document.title=s.siteName||'Katalog';$('announcement').textContent=s.announcement||'';$('announcement').classList.toggle('hidden',!s.announcement);$('contactText').textContent=s.contactEmail?'Email: '+s.contactEmail:'Hubungi kami melalui WhatsApp.';$('contactActions').innerHTML='';if(s.whatsapp){let b=document.createElement('a');b.href='https://wa.me/'+s.whatsapp.replace(/\\D/g,'');b.target='_blank';b.rel='noopener';b.innerHTML='<button>Chat WhatsApp</button>';$('contactActions').appendChild(b)}if(s.contactEmail){let a=document.createElement('a');a.href='mailto:'+s.contactEmail;a.innerHTML='<button class=\"secondary\">Kirim Email</button>';$('contactActions').appendChild(a)}}\nfunction populateCategories(){const old=$('category').value;const cats=[...new Set(appData.products.map(p=>p.category).filter(Boolean))].sort();$('category').innerHTML='<option value=\"\">Semua kategori</option>'+cats.map(c=>'<option>'+escapeHtml(c)+'</option>').join('');$('category').value=cats.includes(old)?old:''}\nfunction renderProducts(){let list=[...appData.products],q=$('search').value.toLowerCase(),cat=$('category').value,sort=$('sort').value;list=list.filter(p=>(!cat||p.category===cat)&&(`${p.name} ${p.description} ${p.category}`).toLowerCase().includes(q));if(sort==='low')list.sort((a,b)=>a.price-b.price);if(sort==='high')list.sort((a,b)=>b.price-a.price);if(sort==='name')list.sort((a,b)=>a.name.localeCompare(b.name));if(sort==='new')list.reverse();$('products').innerHTML=list.map(p=>{const img=safeLink(p.imageUrl);return `<article class=\"card\">${img?`<img src=\"${escapeHtml(img)}\" alt=\"${escapeHtml(p.name)}\" loading=\"lazy\" onerror=\"this.style.display='none';this.nextElementSibling.style.display='grid'\"><div class=\"placeholder\" style=\"display:none\">Foto tidak tersedia</div>`:'<div class=\"placeholder\">Belum ada foto</div>'}<div class=\"cardbody\">${p.featured?'<span class=\"tag\">Unggulan</span> ':''}<span class=\"tag\">${escapeHtml(p.category||'Umum')}</span><h3 style=\"margin:10px 0 5px\">${escapeHtml(p.name)}</h3><div class=\"price\">${money(p.price)}${p.oldPrice>p.price?`<span class=\"old\">${money(p.oldPrice)}</span>`:''}</div><p class=\"muted\" style=\"font-size:13px\">Stok: ${Number(p.stock)||0}</p><p class=\"desc\">${escapeHtml((p.description||'').slice(0,110))}${(p.description||'').length>110?'\u2026':''}</p><button onclick=\"showDetail('${escapeHtml(p.id)}')\">Lihat detail</button></div></article>`}).join('');$('empty').classList.toggle('hidden',list.length>0)}\nfunction showDetail(id){const p=appData.products.find(x=>x.id===id);if(!p)return;$('detailTitle').textContent=p.name;let html=`<p class=\"price\">${money(p.price)} ${p.oldPrice>p.price?`<span class=\"old\">${money(p.oldPrice)}</span>`:''}</p><p class=\"muted\">Kategori: ${escapeHtml(p.category||'Umum')} \u2022 Stok: ${Number(p.stock)||0}</p><p class=\"desc\">${escapeHtml(p.description||'Tidak ada deskripsi.')}</p>`;const img=safeLink(p.imageUrl);if(img)html+=`<img src=\"${escapeHtml(img)}\" style=\"width:100%;max-height:360px;object-fit:contain;border-radius:10px\" alt=\"\">`;const video=safeLink(p.videoUrl);if(video){let embed=video;if(/youtube\\.com\\/watch\\?v=/.test(video))embed='https://www.youtube-nocookie.com/embed/'+new URL(video).searchParams.get('v');else if(/youtu\\.be\\//.test(video))embed='https://www.youtube-nocookie.com/embed/'+new URL(video).pathname.slice(1);if(/youtube-nocookie\\.com\\/embed\\//.test(embed))html+=`<iframe class=\"video\" src=\"${escapeHtml(embed)}\" allowfullscreen loading=\"lazy\"></iframe>`;else if(/\\.(mp4|webm|ogg)(\\?.*)?$/i.test(video))html+=`<video class=\"video\" controls src=\"${escapeHtml(video)}\"></video>`;else html+=`<p><a href=\"${escapeHtml(video)}\" target=\"_blank\" rel=\"noopener\">Tonton video</a></p>`}if(appData.settings.whatsapp){const msg=encodeURIComponent('Halo, saya tertarik dengan '+p.name+' ('+money(p.price)+').');html+=`<p><a href=\"https://wa.me/${appData.settings.whatsapp.replace(/\\D/g,'')}?text=${msg}\" target=\"_blank\" rel=\"noopener\"><button>Pesan via WhatsApp</button></a></p>`}$('detailContent').innerHTML=html;$('detailDialog').showModal()}\nfunction openLogin(){$('loginPin').value='';$('loginError').textContent='';$('loginDialog').showModal()}\nasync function login(){try{const ok=await callServer('verifyAdmin',$('loginPin').value);if(!ok){$('loginError').textContent='PIN salah.';return}adminPin=$('loginPin').value;$('loginDialog').close();$('adminPanel').classList.remove('hidden');showProductList()}catch(e){$('loginError').textContent=e.message}}\nfunction logout(){adminPin='';$('adminPanel').classList.add('hidden');cancelEditor();showProductList()}\nfunction setStatus(t){$('adminStatus').textContent=t}\nfunction showProductList(){$('productEditor').classList.add('hidden');$('settingsEditor').classList.add('hidden');$('productList').classList.remove('hidden');$('adminProducts').innerHTML=appData.products.map(p=>`<div class=\"adminitem\"><div><b>${escapeHtml(p.name)}</b><div class=\"muted\">${money(p.price)} \u00b7 ${escapeHtml(p.category||'Umum')}</div></div><div class=\"actions\"><button class=\"secondary\" onclick=\"editProduct('${escapeHtml(p.id)}')\">Edit</button><button class=\"danger\" onclick=\"deleteProduct('${escapeHtml(p.id)}')\">Hapus</button></div></div>`).join('')||'<p class=\"muted\">Belum ada produk.</p>'}\nfunction newProduct(){editingId='';$('editorTitle').textContent='Tambah produk';['pName','pCategory','pImage','pVideo','pDescription'].forEach(id=>$(id).value='');$('pPrice').value=0;$('pOldPrice').value=0;$('pStock').value=0;$('pFeatured').checked=false;$('productList').classList.add('hidden');$('settingsEditor').classList.add('hidden');$('productEditor').classList.remove('hidden');setStatus('')}\nfunction editProduct(id){const p=appData.products.find(x=>x.id===id);if(!p)return;editingId=id;$('editorTitle').textContent='Edit produk';$('pName').value=p.name;$('pCategory').value=p.category;$('pPrice').value=p.price;$('pOldPrice').value=p.oldPrice;$('pStock').value=p.stock;$('pImage').value=p.imageUrl;$('pVideo').value=p.videoUrl;$('pDescription').value=p.description;$('pFeatured').checked=p.featured;$('productList').classList.add('hidden');$('settingsEditor').classList.add('hidden');$('productEditor').classList.remove('hidden');setStatus('')}\nfunction cancelEditor(){showProductList()}\nasync function saveProduct(){const item={id:editingId,name:$('pName').value,category:$('pCategory').value,price:$('pPrice').value,oldPrice:$('pOldPrice').value,stock:$('pStock').value,imageUrl:$('pImage').value,videoUrl:$('pVideo').value,description:$('pDescription').value,featured:$('pFeatured').checked};try{appData=await callServer('adminSaveProduct',adminPin,item);applySettings();populateCategories();renderProducts();showProductList();setStatus('Produk berhasil disimpan.')}catch(e){setStatus('Gagal menyimpan: '+e.message)}}\nasync function deleteProduct(id){const p=appData.products.find(x=>x.id===id);if(!p||!confirm('Hapus produk \"'+p.name+'\"?'))return;try{appData=await callServer('adminDeleteProduct',adminPin,id);populateCategories();renderProducts();showProductList();setStatus('Produk dihapus.')}catch(e){setStatus('Gagal menghapus: '+e.message)}}\nfunction showSettings(){const s=appData.settings||{};$('sSiteName').value=s.siteName||'';$('sTagline').value=s.tagline||'';$('sCurrency').value=s.currency||'IDR';$('sColor').value=/^#[0-9a-f]{6}$/i.test(s.themeColor||'')?s.themeColor:'#2563eb';$('sWhatsapp').value=s.whatsapp||'';$('sEmail').value=s.contactEmail||'';$('sAnnouncement').value=s.announcement||'';$('sPin').value='';$('productEditor').classList.add('hidden');$('productList').classList.add('hidden');$('settingsEditor').classList.remove('hidden')}\nasync function saveSettings(){const s={siteName:$('sSiteName').value,tagline:$('sTagline').value,currency:$('sCurrency').value,themeColor:$('sColor').value,whatsapp:$('sWhatsapp').value,contactEmail:$('sEmail').value,announcement:$('sAnnouncement').value};if($('sPin').value.trim())s.adminPin=$('sPin').value.trim();try{appData=await callServer('adminSaveSettings',adminPin,s);if(s.adminPin)adminPin=s.adminPin;applySettings();populateCategories();renderProducts();showProductList();setStatus('Pengaturan berhasil disimpan.')}catch(e){setStatus('Gagal menyimpan pengaturan: '+e.message)}}\nload();\n</script>\n</body>\n</html>";

function doGet() {
  setupSheets_();
  const settings = getSettings_();
  return HtmlService.createHtmlOutput(HTML_PAGE)
    .setTitle(settings.siteName || 'Katalog Produk')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

// Jalankan fungsi ini sekali dari editor Apps Script untuk menyiapkan database dan izin.
function initializeCatalog() {
  setupSheets_();
  const ss = getDatabaseSpreadsheet_();
  const message = 'Database katalog siap: ' + ss.getUrl();
  Logger.log(message);
  return message;
}

// Mendukung project yang terikat ke spreadsheet maupun project Apps Script standalone.
function getDatabaseSpreadsheet_() {
  const props = PropertiesService.getScriptProperties();
  const savedId = props.getProperty(DATABASE_ID_KEY);
  if (savedId) {
    try { return SpreadsheetApp.openById(savedId); }
    catch (err) { throw new Error('Database tersimpan tidak dapat dibuka. Periksa akses spreadsheet atau hapus Script Property DATABASE_ID agar dapat memilih database baru. Detail: ' + err.message); }
  }
  const active = SpreadsheetApp.getActiveSpreadsheet();
  if (active) {
    props.setProperty(DATABASE_ID_KEY, active.getId());
    return active;
  }
  const created = SpreadsheetApp.create('Database Katalog');
  props.setProperty(DATABASE_ID_KEY, created.getId());
  return created;
}

function setupSheets_() {
  const ss = getDatabaseSpreadsheet_();
  let products = ss.getSheetByName(SHEET_PRODUCTS);
  if (!products) {
    products = ss.insertSheet(SHEET_PRODUCTS);
    products.appendRow(['id','name','category','price','oldPrice','description','imageUrl','videoUrl','stock','featured','createdAt']);
  }
  let settings = ss.getSheetByName(SHEET_SETTINGS);
  if (!settings) {
    settings = ss.insertSheet(SHEET_SETTINGS);
    settings.appendRow(['key','value']);
    settings.getRange(2, 1, 8, 2).setValues([
      ['siteName','Katalog Saya'],
      ['tagline','Temukan produk favorit Anda'],
      ['currency','IDR'],
      ['whatsapp',''],
      ['contactEmail',''],
      ['themeColor','#2563eb'],
      ['announcement','Selamat datang di katalog kami!'],
      ['adminPin','1234']
    ]);
  }
  const props = PropertiesService.getScriptProperties();
  if (!props.getProperty(ADMIN_PIN_KEY)) {
    const pin = getSettingValue_('adminPin') || '1234';
    props.setProperty(ADMIN_PIN_KEY, String(pin));
  }
}

function getPublicData() {
  setupSheets_();
  const sh = getDatabaseSpreadsheet_().getSheetByName(SHEET_PRODUCTS);
  const values = sh.getDataRange().getValues();
  const products = values.slice(1).filter(r => r[0] !== '' && r[0] != null).map(r => ({
    id: String(r[0]), name: String(r[1] || ''), category: String(r[2] || ''),
    price: Number(r[3] || 0), oldPrice: Number(r[4] || 0), description: String(r[5] || ''),
    imageUrl: String(r[6] || ''), videoUrl: String(r[7] || ''), stock: Number(r[8] || 0),
    featured: String(r[9]).toLowerCase() === 'true' || r[9] === true
  }));
  return { products: products, settings: getSettings_() };
}

function verifyAdmin(pin) {
  setupSheets_();
  return String(pin || '') === String(PropertiesService.getScriptProperties().getProperty(ADMIN_PIN_KEY) || '1234');
}

function adminSaveProduct(pin, item) {
  requireAdmin_(pin);
  setupSheets_();
  if (!item || !String(item.name || '').trim()) throw new Error('Nama produk wajib diisi.');
  const sh = getDatabaseSpreadsheet_().getSheetByName(SHEET_PRODUCTS);
  const rows = sh.getDataRange().getValues();
  const id = String(item.id || Utilities.getUuid());
  const price = Number(item.price || 0), oldPrice = Number(item.oldPrice || 0), stock = Number(item.stock || 0);
  if (![price, oldPrice, stock].every(n => Number.isFinite(n) && n >= 0)) throw new Error('Harga dan stok harus berupa angka nol atau lebih.');
  const row = [id, String(item.name).trim(), String(item.category || '').trim(), price, oldPrice,
    String(item.description || ''), safeUrl_(item.imageUrl), safeUrl_(item.videoUrl), stock,
    Boolean(item.featured), new Date()];
  let found = -1;
  for (let i = 1; i < rows.length; i++) if (String(rows[i][0]) === id) { found = i + 1; break; }
  if (found > 0) sh.getRange(found, 1, 1, row.length).setValues([row]);
  else sh.appendRow(row);
  return getPublicData();
}

function adminDeleteProduct(pin, id) {
  requireAdmin_(pin);
  setupSheets_();
  const sh = getDatabaseSpreadsheet_().getSheetByName(SHEET_PRODUCTS);
  const rows = sh.getDataRange().getValues();
  for (let i = 1; i < rows.length; i++) {
    if (String(rows[i][0]) === String(id)) { sh.deleteRow(i + 1); break; }
  }
  return getPublicData();
}

function adminSaveSettings(pin, settings) {
  requireAdmin_(pin);
  setupSheets_();
  const sh = getDatabaseSpreadsheet_().getSheetByName(SHEET_SETTINGS);
  const values = sh.getDataRange().getValues();
  const allowed = ['siteName','tagline','currency','whatsapp','contactEmail','themeColor','announcement','adminPin'];
  allowed.forEach(key => {
    if (!settings || settings[key] === undefined) return;
    const value = String(settings[key] == null ? '' : settings[key]);
    let found = -1;
    for (let i = 1; i < values.length; i++) if (String(values[i][0]) === key) { found = i + 1; break; }
    if (found > 0) sh.getRange(found, 2).setValue(value);
    else sh.appendRow([key, value]);
    if (key === 'adminPin' && value.trim()) {
      PropertiesService.getScriptProperties().setProperty(ADMIN_PIN_KEY, value.trim());
    }
  });
  return getPublicData();
}

function requireAdmin_(pin) {
  if (!verifyAdmin(pin)) throw new Error('PIN admin salah. Silakan masuk kembali.');
}

function getSettings_() {
  const ss = getDatabaseSpreadsheet_();
  const sh = ss.getSheetByName(SHEET_SETTINGS);
  const out = {};
  if (!sh) return out;
  sh.getDataRange().getValues().slice(1).forEach(r => { if (r[0]) out[String(r[0])] = String(r[1] == null ? '' : r[1]); });
  return out;
}

function getSettingValue_(key) { return getSettings_()[key] || ''; }

function safeUrl_(value) {
  const s = String(value || '').trim();
  if (!s) return '';
  if (!/^https?:\/\//i.test(s)) throw new Error('URL foto/video harus diawali http:// atau https://');
  return s;
}
