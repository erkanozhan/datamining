# VERİ MADENCİLİĞİ (DATA MINING)  
**Ders Kodu:** BMSB403  
**Hazırlayan:** Ph.D. Erkan ÖZHAN  
Tekirdağ Namık Kemal Üniversitesi  
Çorlu Mühendislik Fakültesi  
Bilgisayar Mühendisliği Bölümü  
2025.v13-6  

E-posta: erkanozhan@gmail.com / eozhan@nku.edu.tr  
Tel: +90 282 250 23 84  
Ofis: Çorlu Mühendislik Fakültesi, 4. Kat B-410  
Görüşme Saatleri: Her hafta Perşembe 09:30-12:30 arası.

**Bu not iki yerden okunabilir; içerik ikisinde de aynıdır:**

| | Adres | Ne zaman tercih edilir? |
| :--- | :--- | :--- |
| **Web sitesi** | [erkanozhan.github.io/datamining](https://erkanozhan.github.io/datamining/) | Notu okumak ve çalışmak için: Formüller hızlı yüklenir, soldaki listeden bölümler arasında geçilir, tüm notta **arama** yapılabilir. |
| **GitHub deposu** | [github.com/erkanozhan/datamining](https://github.com/erkanozhan/datamining) | Veri setlerini ve kod dosyalarını indirmek, notun son değişikliklerini takip etmek için. |

**Veri setleri ve kodlar:** Notta kullanılan veri setleri [`datasets/`](https://github.com/erkanozhan/datamining/tree/main/datasets), R kodları [`codes/`](https://github.com/erkanozhan/datamining/tree/main/codes) klasöründedir.

**Notun tamamını yazdırmak veya PDF olarak kaydetmek için:** [Notun tamamı tek sayfada](https://erkanozhan.github.io/datamining/yazdir.html) bağlantısı açılır, sayfa yüklendikten sonra tarayıcının yazdırma menüsünden (Ctrl+P) "PDF olarak kaydet" seçilir. PDF, depodaki [`araclar/pdf_olustur.py`](https://github.com/erkanozhan/datamining/blob/main/araclar/pdf_olustur.py) betiğiyle de üretilebilir.

**Terimler hakkında:** Türkçe kavramların ilk geçtiği yerde parantez içinde İngilizce karşılığı verilmiştir. Gerçek Pozitif, Sahte Pozitif, Gerçek Negatif ve Sahte Negatif terimleri sırasıyla *True Positive*, *False Positive*, *True Negative* ve *False Negative* karşılığında kullanılmıştır.

---

## İçindekiler

Not bölümlere ayrılmıştır; her bağlantı ilgili bölümün sayfasını açar. Her sayfanın sonunda önceki ve sonraki sayfaya geçiş bağlantıları bulunur.

1. [Veri Nedir?](bolumler/01-giris.md)
2. [Veri Kaynakları](bolumler/01-giris.md#b2)
3. [Veri Kaynaklarının Gelişimi](bolumler/01-giris.md#b3)
4. [Veri Madenciliği](bolumler/01-giris.md#b4)
5. [Veri Madenciliği Modelleri](bolumler/01-giris.md#b5)
6. [Veri Madenciliği, Makine Öğrenmesi ve İstatistik İlişkisi](bolumler/01-giris.md#b6)
7. [Veri Madenciliğinin Önemi ve Uygulama Alanları](bolumler/01-giris.md#b7)
8. [Veritabanlarında Bilgi Keşfi (KDD)](bolumler/01-giris.md#b8)
9. [Veri Madenciliği ve KDD Arasındaki İlişki](bolumler/01-giris.md#b9)
10. [Operasyonel Veritabanları ve Veri Ambarları](bolumler/10-veri-ambarlari-ve-olap.md)
11. [OLAP (Çevrimiçi Analitik İşleme)](bolumler/10-veri-ambarlari-ve-olap.md#b11)
12. [OLAP Mimarisi: Küpler, Boyutlar ve Ölçüler](bolumler/10-veri-ambarlari-ve-olap.md#b12)
13. [Karar Ağaçları](bolumler/13-karar-agaclari.md)
14. [Naive Bayes Sınıflandırıcısı](bolumler/14-naive-bayes.md)
15. [Kümeleme Analizi](bolumler/15-kumeleme.md)
16. [WEKA ile Birliktelik Kuralı Madenciliği](bolumler/16-birliktelik-kurallari.md)
17. [Metin Madenciliği](bolumler/17-metin-madenciligi.md)
18. [R Yazılımında Uygulamalar](bolumler/18-r-uygulamalari.md)
- [Kaynaklar](bolumler/kaynaklar.md)
