# Veri Madenciliği Ders Materyalleri

Tekirdağ Namık Kemal Üniversitesi Çorlu Mühendislik Fakültesi Bilgisayar Mühendisliği Bölümü **Veri Madenciliği (BMSB403)** dersinin ders notu, veri setleri ve R kodları.

- **Ders notu:** [Ders_Notu.md](Ders_Notu.md)
- **Web sürümü:** [erkanozhan.github.io/datamining](https://erkanozhan.github.io/datamining/). Aynı not; formüller, diyagramlar, içindekiler ve arama ile birlikte.

## Ders Notunun Kapsamı

Veri ve veri kaynakları, veri madenciliği ve bilgi keşfi (KDD), veri ambarları ve OLAP, karar ağaçları, Naive Bayes, kümeleme (uzaklık ölçütleri, hiyerarşik kümeleme, k-Means), birliktelik kuralları (Apriori, FPGrowth, lift), metin madenciliği (TF-IDF, kosinüs benzerliği) ve R ile veri işleme (dplyr, join işlemleri). Uygulamalar WEKA 3.8 ve R ile yapılmaktadır.

## Klasörler

| Klasör / dosya | İçerik |
| :--- | :--- |
| [`Ders_Notu.md`](Ders_Notu.md) | Ders notunun tamamı (18 bölüm ve kaynaklar) |
| [`index.html`](index.html) | Web sürümünü oluşturan docsify sayfası |
| [`images/`](images) | Ders notundaki şekiller |
| [`LICENSE`](LICENSE) | Lisans metni (GNU GPL v3) |

### Veri setleri ([`datasets/`](datasets))

| Dosya | İçerik | Kullanıldığı yer |
| :--- | :--- | :--- |
| [`2-Bilgisayaralimi-naivebayes-nominal.csv`](datasets/2-Bilgisayaralimi-naivebayes-nominal.csv) | 14 müşterinin yaşı, geliri, öğrenci olup olmadığı, kredibilitesi ve bilgisayar alıp almadığı | Ders notu 14.2.1 (Naive Bayes, elle hesaplama) |
| [`Bilgisayar_Risk_NaiveBayes.csv`](datasets/Bilgisayar_Risk_NaiveBayes.csv) | 20 kullanıcının mesleği, işletim sistemi, antivirüs kullanımı, yaş grubu, tarayıcısı ve güvenlik riski | Ders notu 14.2.2 ve 14.3 (Naive Bayes, elle hesaplama ve WEKA) |
| [`insanlar.csv`](datasets/insanlar.csv) | 47 kişinin adı, yaşı, boyu, kilosu ve ayak numarası | Ders notu 15.5 (WEKA ile k-Means, AddCluster, J48, JRip) |
| [`airline.csv`](datasets/airline.csv) | 1949–1960 yılları arasındaki aylık havayolu yolcu sayıları | [`codes/Veri_Turleri_Data_Ayirma-v2.qmd`](codes/Veri_Turleri_Data_Ayirma-v2.qmd) (tarih sütununu ayırma) |

WEKA'da bir dosyayı doğrudan internetten açmak için "Preprocess > Open URL..." seçilip dosyanın ham (raw) adresi girilir, örneğin:
`https://raw.githubusercontent.com/erkanozhan/datamining/main/datasets/insanlar.csv`

### R kodları ([`codes/`](codes))

| Dosya | İçerik |
| :--- | :--- |
| [`Veri_Turleri_Data_Ayirma-v2.qmd`](codes/Veri_Turleri_Data_Ayirma-v2.qmd) | R'daki temel veri türleri; `airline.csv` verisinde tarih sütununu yıl, ay ve gün sütunlarına ayırma |
| [`Aykiri_Deger_Bulma-v2.Rmd`](codes/Aykiri_Deger_Bulma-v2.Rmd) | Aykırı değerlerin tespiti |
| [`clustering.Rmd`](codes/clustering.Rmd) | Dirsek (elbow) yöntemi ile uygun küme sayısının belirlenmesi |
| [`Clustering_MarkDown-v3.Rmd`](codes/Clustering_MarkDown-v3.Rmd) | Kümeleme analizinin uygulamalı akışı: küme sayısının belirlenmesi (dirsek, NbClust) ve sonuçların dışa aktarılması |

## Kurulum

- **WEKA:** [WEKA 3.8](https://ml.cms.waikato.ac.nz/weka). Ders notundaki çıktılar WEKA 3.8.6 ile alınmıştır. `iris.arff` ve `ReutersGrain-*.arff` gibi standart veri setleri WEKA kurulum klasöründeki `data/` dizinindedir.
- **R:** Ders notundaki R kodları için gerekli paketler:

```r
install.packages(c("dplyr", "tidyr", "factoextra", "NbClust", "cluster", "ggplot2"))
```

## Lisans

Bu depodaki içerik [GNU General Public License v3.0](LICENSE) kapsamında paylaşılmaktadır.
