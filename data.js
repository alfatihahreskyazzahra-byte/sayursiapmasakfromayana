const WA_NUMBER = "6281342422611";
const SHEET_URL = "https://script.google.com/macros/s/AKfycbxYiFHbwFiRDBDspKG3kfGuHsVqxRsVQdQs6iE3dmfdGKUTeAuZLhNhNx4RQbJN06L-oQ/exec";

const PRODUK = [
{id:1,nama:"SAYUR BENING",tampil:"Bayam, Jagung",gram:"Bayam 1 ikat 200gr, Jagung manis 1pcs 150gr, Bawang merah 15gr, Temu kunci 5gr",hpp:5500,harga:10000,kat:"Sayur Daun"},
{id:2,nama:"SOP AYAM",tampil:"Ayam, Kentang",gram:"Ayam dada 150gr, Kentang 100gr, Wortel 50gr, Buncis 30gr, Daun bawang 10gr, Bumbu putih 30gr",hpp:9000,harga:15000,kat:"Paket Siap Masak"},
{id:3,nama:"CAPCAY AYAM",tampil:"Ayam, Wortel",gram:"Ayam 120gr, Wortel 60gr, Kembang kol 50gr, Sawi putih 40gr, Bakso sapi 2pcs, Bumbu capcay 30gr + saos tiram",hpp:8500,harga:15000,kat:"Paket Siap Masak"},
{id:4,nama:"TUMIS KANGKUNG",tampil:"Kangkung, Tomat",gram:"Kangkung 1 ikat 200gr, Tomat 1pcs 50gr, Cabe 10gr, Bawang 20gr, Terasi 5gr",hpp:4000,harga:8000,kat:"Sayur Daun"},
{id:5,nama:"KANGKUNG + TELUR",tampil:"Kangkung, Telur",gram:"Kangkung 200gr, Telur 1 butir 60gr, Bawang 15gr, Cabe 5gr",hpp:6000,harga:10000,kat:"Sayur Daun"},
{id:6,nama:"SAYUR ASEM",tampil:"Jagung, Labu",gram:"Jagung 100gr, Labu siam 80gr, Kacang panjang 50gr, Melinjo 20gr, Bumbu asem 30gr + daun salam",hpp:5500,harga:10000,kat:"Sayur Daun"},
{id:7,nama:"SAYUR LODEH",tampil:"Labu, Terong",gram:"Labu 80gr, Terong 80gr, Kacang panjang 40gr, Santan kara 65ml, Bumbu lodeh kuning 30gr",hpp:6500,harga:12000,kat:"Sayur Buah"},
{id:8,nama:"BUNCIS WORTEL",tampil:"Buncis, Wortel",gram:"Buncis 100gr, Wortel 100gr, Bawang putih 10gr, Saus tiram 15ml",hpp:5000,harga:10000,kat:"Sayur Buah"},
{id:9,nama:"SAWI BAKSO",tampil:"Sawi, Bakso",gram:"Sawi hijau 150gr, Bakso sapi 5pcs 75gr, Bawang putih 10gr, Kaldu jamur 5gr",hpp:6500,harga:12000,kat:"Paket Siap Masak"},
{id:10,nama:"PARE TERI",tampil:"Pare, Teri",gram:"Pare 1pcs 150gr, Teri medan 20gr, Cabe 10gr, Bawang 15gr",hpp:6500,harga:12000,kat:"Sayur Buah"},
{id:11,nama:"ORAK-ARIK",tampil:"Telur, Kol",gram:"Telur 2 butir 120gr, Kol 100gr, Wortel 30gr, Daun bawang 10gr",hpp:6000,harga:10000,kat:"Paket Harian"},
{id:12,nama:"TAUGE TAHU",tampil:"Tauge, Tahu",gram:"Tauge 150gr, Tahu putih 2pcs 120gr, Daun bawang 10gr, Bumbu kuning 20gr",hpp:5000,harga:10000,kat:"Bumbu Dapur"},
{id:13,nama:"SOP BAKSO",tampil:"Bakso, Kentang",gram:"Bakso 5pcs 100gr, Kentang 100gr, Wortel 50gr, Buncis 30gr, Bumbu putih 25gr",hpp:8500,harga:15000,kat:"Paket Siap Masak"},
{id:14,nama:"BENING + TELUR",tampil:"Bayam, Telur",gram:"Bayam 150gr, Telur 1 butir 60gr, Jagung 50gr, Bawang 10gr",hpp:6500,harga:12000,kat:"Paket Harian"},
{id:15,nama:"KOL AYAM",tampil:"Kol, Ayam",gram:"Kol 120gr, Ayam 100gr, Wortel 40gr, Bumbu putih 20gr",hpp:6500,harga:12000,kat:"Paket Siap Masak"},
{id:16,nama:"TERONG TEMPE",tampil:"Terong, Tempe",gram:"Terong ungu 150gr, Tempe 1 papan 80gr, Cabe 10gr, Bumbu balado 20gr",hpp:5000,harga:10000,kat:"Sayur Buah"},
{id:17,nama:"SANTAN TERONG",tampil:"Terong, Labu",gram:"Terong 100gr, Labu 80gr, Santan 65ml, Bumbu kuning 30gr",hpp:6500,harga:12000,kat:"Sayur Buah"},
{id:18,nama:"BROKOLI AYAM",tampil:"Brokoli, Ayam",gram:"Brokoli 100gr, Ayam 100gr, Wortel 30gr, Bawang putih 10gr, Saus tiram 20ml",hpp:8500,harga:15000,kat:"Paket Siap Masak"},
{id:19,nama:"SAWI + TELUR",tampil:"Sawi, Telur",gram:"Sawi 150gr, Telur 1 butir 60gr, Bawang putih 10gr",hpp:5500,harga:10000,kat:"Paket Harian"},
{id:20,nama:"SAYUR MIE",tampil:"Sawi, Mie",gram:"Sawi 80gr, Mie telur 1 keping 70gr, Bakso 2pcs, Bumbu mie 20gr",hpp:4000,harga:8000,kat:"Paket Harian"},

{id:21,nama:"BAWANG MERAH KUPAS",tampil:"250gr, bersih",gram:"Bawang merah kupas 250gr - siap masak",hpp:7000,harga:13000,kat:"Bumbu Dapur"},
{id:22,nama:"BAWANG PUTIH KUPAS",tampil:"250gr, bersih",gram:"Bawang putih kupas 250gr",hpp:7000,harga:13000,kat:"Bumbu Dapur"},
{id:23,nama:"CABE MERAH BESAR",tampil:"100gr, segar",gram:"Cabe merah besar 100gr",hpp:5000,harga:10000,kat:"Bumbu Dapur"},
{id:24,nama:"CABE RAWIT MERAH",tampil:"100gr, pedas",gram:"Cabe rawit merah 100gr",hpp:6000,harga:12000,kat:"Bumbu Dapur"},
{id:25,nama:"CABE KERITING",tampil:"100gr, segar",gram:"Cabe keriting 100gr",hpp:5000,harga:10000,kat:"Bumbu Dapur"},
{id:26,nama:"BUMBU DASAR MERAH",tampil:"Bawang, Cabe, Tomat giling",gram:"Bawang merah 40gr, Bawang putih 15gr, Cabe merah 30gr, Tomat 30gr - giling halus 120gr",hpp:6000,harga:12000,kat:"Bumbu Dapur"},
{id:27,nama:"BUMBU DASAR PUTIH",tampil:"Bawang, Kemiri, halus",gram:"Bawang merah 30gr, Bawang putih 20gr, Kemiri 15gr, Merica 2gr - giling 100gr",hpp:6000,harga:12000,kat:"Bumbu Dapur"},
{id:28,nama:"BUMBU DASAR KUNING",tampil:"Kunyit, Jahe, Lengkuas giling",gram:"Kunyit 20gr, Jahe 15gr, Lengkuas 15gr, Kemiri 10gr - giling 100gr",hpp:6000,harga:12000,kat:"Bumbu Dapur"},
{id:29,nama:"JAHE",tampil:"100gr, segar",gram:"Jahe emprit 100gr",hpp:3000,harga:6000,kat:"Bumbu Dapur"},
{id:30,nama:"KUNYIT",tampil:"100gr, segar",gram:"Kunyit segar 100gr",hpp:3000,harga:6000,kat:"Bumbu Dapur"},
{id:31,nama:"LENGKUAS / LAOS",tampil:"100gr, segar",gram:"Lengkuas 100gr",hpp:3000,harga:6000,kat:"Bumbu Dapur"},
{id:32,nama:"SEREH",tampil:"3 batang, segar",gram:"Sereh 3 batang 60gr",hpp:2000,harga:5000,kat:"Bumbu Dapur"},
{id:33,nama:"DAUN SALAM",tampil:"1 ikat, segar",gram:"Daun salam 1 ikat 15 lembar",hpp:1500,harga:4000,kat:"Bumbu Dapur"},
{id:34,nama:"DAUN JERUK",tampil:"1 ikat, segar",gram:"Daun jeruk 1 ikat 15 lembar",hpp:1500,harga:4000,kat:"Bumbu Dapur"},
{id:35,nama:"KEMIRI",tampil:"50gr, bulat",gram:"Kemiri bulat 50gr",hpp:4000,harga:8000,kat:"Bumbu Dapur"},
{id:36,nama:"KETUMBAR BUBUK",tampil:"50gr, halus",gram:"Ketumbar bubuk 50gr",hpp:3500,harga:7000,kat:"Bumbu Dapur"},
{id:37,nama:"TERASI BAKAR",tampil:"2 pcs, matang",gram:"Terasi bakar matang 2pcs @10gr",hpp:2000,harga:5000,kat:"Bumbu Dapur"},
{id:38,nama:"BAWANG GORENG",tampil:"50gr, renyah",gram:"Bawang goreng renyah 50gr toples",hpp:6000,harga:12000,kat:"Bumbu Dapur"},
];

const EMOJI = {"Sayur Daun":"🥬","Sayur Buah":"🍅","Paket Siap Masak":"🍱","Bumbu Dapur":"🧄","Paket Harian":"🍛","Semua Produk":"🥕"};
const KATEGORI = ["Semua Produk","Paket Siap Masak","Sayur Daun","Sayur Buah","Bumbu Dapur","Paket Harian"];