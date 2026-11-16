# 18. R Yazılımında Uygulamalar: Sütun Seçimi, Filtreleme, Yeni Değişken Türetme ve Temel Fonksiyonlar

---

## 18.1. Giriş

R dilinde veri analizi yapılırken en sık yapılan işlemler sütunları seçmek, satırları filtrelemek, yeni değişkenler türetmek ve verileri özetlemektir. Bu bölümde bu işlemler için hem base R (temel R) fonksiyonları hem de **dplyr** paketi kullanılmaktadır. dplyr paketi, Hadley Wickham tarafından geliştirilmiş ve veri manipülasyonunu son derece okunabilir hale getiren bir araçtır.

Önce temel kavramlar ele alınmakta, ardından daha kapsamlı uygulamalara geçilmektedir.

---

## 18.2. Veri Çerçevesi ile Çalışmaya Başlamak

R'da veriler genellikle **data frame** (veri çerçevesi) yapısında tutulur. Bunu Excel tablosu gibi düşünebilirsiniz: satırlar gözlemleri, sütunlar değişkenleri temsil eder.

Örnek bir veri seti oluşturalım:

```r
# Basit bir hasta veri seti
hastalar <- data.frame(
  hasta_id = 1:6,
  yas = c(45, 32, 58, 29, 67, 41),
  cinsiyet = c("E", "K", "E", "K", "E", "K"),
  tansiyon = c(120, 110, 145, 105, 155, 118),
  kolesterol = c(200, 180, 240, 170, 260, 195),
  sigara = c(TRUE, FALSE, TRUE, FALSE, TRUE, FALSE)
)

hastalar
```

Çıktı:
```
  hasta_id yas cinsiyet tansiyon kolesterol sigara
1        1  45        E      120        200   TRUE
2        2  32        K      110        180  FALSE
3        3  58        E      145        240   TRUE
4        4  29        K      105        170  FALSE
5        5  67        E      155        260   TRUE
6        6  41        K      118        195  FALSE
```

---

## 18.3. Sütun Seçimi (Column Selection)

### 18.3.1. Base R ile Sütun Seçimi

Veri çerçevesinden belirli sütunları seçmenin birkaç yolu vardır:

```r
# Tek sütun seçimi - $ operatörü ile
hastalar$yas

# Tek sütun seçimi - köşeli parantez ile
hastalar[, "yas"]
hastalar[, 2]  # 2. sütun

# Birden fazla sütun seçimi
hastalar[, c("yas", "tansiyon")]
hastalar[, c(2, 4)]  # 2. ve 4. sütunlar

# Sütun hariç tutma (negatif indeks)
hastalar[, -1]  # hasta_id hariç tümü
hastalar[, -c(1, 6)]  # 1. ve 6. sütunlar hariç
```

Köşeli parantez notasyonunda virgülün solunda satır, sağında sütun belirtilir. Virgülün solunu boş bırakmak "tüm satırlar" anlamına gelir.

### 18.3.2. dplyr ile Sütun Seçimi: select()

**dplyr** paketindeki `select()` fonksiyonu, sütun seçimini çok daha okunabilir hale getirir. "Select" kelimesi Latince *seligere* (ayırmak, seçmek) kökünden gelir.

```r
library(dplyr)

# Temel sütun seçimi
select(hastalar, yas, tansiyon)

# Sütun aralığı seçimi
select(hastalar, yas:kolesterol)

# Sütun hariç tutma
select(hastalar, -hasta_id)
select(hastalar, -c(hasta_id, sigara))
```

`select()` fonksiyonunun güçlü yardımcı fonksiyonları vardır:

```r
# starts_with(): Belirli bir önekle başlayan sütunlar
select(hastalar, starts_with("t"))  # tansiyon

# ends_with(): Belirli bir sonekle biten sütunlar
select(hastalar, ends_with("ol"))  # kolesterol

# contains(): Belirli bir ifade içeren sütunlar
select(hastalar, contains("si"))  # cinsiyet, tansiyon, sigara

# everything(): Kalan tüm sütunlar (sıralama için kullanışlı)
select(hastalar, cinsiyet, everything())  # cinsiyet'i başa al

# where(): Koşula göre sütun seçimi
select(hastalar, where(is.numeric))  # sadece sayısal sütunlar
```

---

## 18.4. Satır Filtreleme (Row Filtering)

### 18.4.1. Base R ile Filtreleme

Satırları filtrelemek için mantıksal koşullar kullanırız:

```r
# Yaşı 50'den büyük hastalar
hastalar[hastalar$yas > 50, ]

# Erkek hastalar
hastalar[hastalar$cinsiyet == "E", ]

# Birden fazla koşul (VE - &)
hastalar[hastalar$yas > 40 & hastalar$tansiyon > 120, ]

# Birden fazla koşul (VEYA - |)
hastalar[hastalar$yas < 30 | hastalar$yas > 60, ]
```

### 18.4.2. dplyr ile Filtreleme: filter()

`filter()` fonksiyonu, adından da anlaşılacağı gibi verileri süzer. Latince *filtrum* (süzgeç) kelimesinden türemiştir.

```r
# Temel filtreleme
filter(hastalar, yas > 50)

# Çoklu koşullar (virgül VE anlamına gelir)
filter(hastalar, yas > 40, tansiyon > 120)

# VEYA koşulu
filter(hastalar, yas < 30 | yas > 60)

# %in% operatörü ile çoklu değer kontrolü
filter(hastalar, yas %in% c(32, 45, 67))

# between() fonksiyonu
filter(hastalar, between(yas, 30, 50))
```

---

## 18.5. Yeni Değişken Türetme: mutate()

**Yeni değişken türetme**, var olan değişkenlerden yeni değişkenler elde etme işlemidir. dplyr'daki fonksiyonun adı olan *mutate* (İng. "değiştirmek, dönüştürmek"), Latince *mutare* (değiştirmek) fiilinden gelir; biyolojideki mutasyon terimiyle aynı kökü paylaşır.

### 18.5.1. Base R ile Yeni Değişken

```r
# Yeni sütun ekleme
hastalar$yas_grubu <- ifelse(hastalar$yas >= 50, "Yaşlı", "Genç")

# Matematiksel dönüşüm
hastalar$tansiyon_normalize <- (hastalar$tansiyon - mean(hastalar$tansiyon)) / sd(hastalar$tansiyon)
```

### 18.5.2. dplyr ile Yeni Değişken: mutate()

`mutate()` fonksiyonu, veri çerçevesine yeni sütunlar ekler veya mevcut sütunları dönüştürür:

```r
# Yeni değişken oluşturma
hastalar <- mutate(hastalar,
  risk_skoru = tansiyon * 0.3 + kolesterol * 0.2 + yas * 0.5
)

# Birden fazla değişken aynı anda
hastalar <- mutate(hastalar,
  yas_kare = yas^2,
  tan_kol_oran = tansiyon / kolesterol,
  yuksek_risk = ifelse(tansiyon > 130 & kolesterol > 200, "Evet", "Hayır")
)

# Koşullu değişken: case_when()
hastalar <- mutate(hastalar,
  yas_kategori = case_when(
    yas < 30 ~ "Genç",
    yas < 50 ~ "Orta Yaş",
    yas < 65 ~ "Orta-İleri Yaş",
    TRUE ~ "İleri Yaş"  # Geri kalan tümü
  )
)
```

`case_when()` fonksiyonu, iç içe `ifelse()` yazmaktan kurtarır ve kodu çok daha okunabilir kılar.

### 18.5.3. transmute(): Sadece Yeni Değişkenleri Tut

`mutate()` tüm sütunları korurken, `transmute()` sadece oluşturulan yeni sütunları döndürür:

```r
transmute(hastalar,
  hasta_id,
  risk_skoru = tansiyon * 0.3 + kolesterol * 0.2
)
```

---

## 18.6. Sıralama (Sorting/Ordering)

### 18.6.1. Base R ile Sıralama

```r
# Yaşa göre artan sıralama
hastalar[order(hastalar$yas), ]

# Yaşa göre azalan sıralama
hastalar[order(hastalar$yas, decreasing = TRUE), ]

# Birden fazla değişkene göre sıralama
hastalar[order(hastalar$cinsiyet, hastalar$yas), ]
```

### 18.6.2. dplyr ile Sıralama: arrange()

`arrange()` (İng. "düzenlemek, sıraya koymak") fonksiyonu satırları bir veya daha fazla sütuna göre sıralar. Sözcük, Eski Fransızca *arangier* (sıraya koymak) fiilinden gelir.

```r
# Artan sıralama
arrange(hastalar, yas)

# Azalan sıralama
arrange(hastalar, desc(yas))

# Çoklu sıralama
arrange(hastalar, cinsiyet, desc(yas))
```

---

## 18.7. Veri Özetleme (Summarization)

### 18.7.1. Base R ile Özetleme

```r
# Temel özet istatistikler
mean(hastalar$yas)
median(hastalar$tansiyon)
sd(hastalar$kolesterol)
summary(hastalar)
```

### 18.7.2. dplyr ile Özetleme: summarise() / summarize()

`summarise()` fonksiyonu (Amerikan İngilizcesinde `summarize()` olarak da yazılabilir), veriyi özetler ve tek satırlık sonuç döndürür:

```r
summarise(hastalar,
  ort_yas = mean(yas),
  ort_tansiyon = mean(tansiyon),
  max_kolesterol = max(kolesterol),
  hasta_sayisi = n()
)
```

Çıktı:
```
   ort_yas ort_tansiyon max_kolesterol hasta_sayisi
1 45.33333        125.5            260            6
```

### 18.7.3. Gruplama ile Özetleme: group_by()

`group_by()` fonksiyonu, verileri kategorilere ayırarak grup bazlı hesaplama yapmanızı sağlar:

```r
hastalar %>%
  group_by(cinsiyet) %>%
  summarise(
    ort_yas = mean(yas),
    ort_tansiyon = mean(tansiyon),
    n = n()
  )
```

Çıktı (`group_by()` sonucu bir *tibble* olarak döner; tibble'lar sayıları kısaltılmış biçimde gösterir):
```
# A tibble: 2 × 4
  cinsiyet ort_yas ort_tansiyon     n
  <chr>      <dbl>        <dbl> <int>
1 E           56.7          140     3
2 K           34            111     3
```

---

## 18.8. Pipe Operatörü: %>% ve |>

Buraya kadar fonksiyonlar ayrı ayrı kullanılmıştır. Gerçek analizlerde ise birden fazla işlemin zincirleme yapılması gerekir. Bu noktada **pipe** (boru) operatörü devreye girer.

Pipe operatörü, soldaki çıktıyı sağdaki fonksiyonun ilk argümanı olarak aktarır. Bunu su borusundan akan veri gibi düşünebilirsiniz.

```r
# Pipe olmadan (iç içe fonksiyonlar - okunması zor)
summarise(filter(select(hastalar, yas, tansiyon, cinsiyet), yas > 40), ort_tan = mean(tansiyon))

# Pipe ile (okunması kolay)
hastalar %>%
  select(yas, tansiyon, cinsiyet) %>%
  filter(yas > 40) %>%
  summarise(ort_tan = mean(tansiyon))
```

R 4.1 sürümünden itibaren base R'da da native pipe operatörü `|>` mevcuttur:

```r
hastalar |>
  filter(yas > 40) |>
  summarise(ort_tan = mean(tansiyon))
```

Pipe operatörü kodu bir hikâye gibi okunabilir kılar: "Hastalar verisini al, 40 yaş üstünü filtrele, ortalama tansiyonu hesapla."

---

## 18.9. Sık Kullanılan Yardımcı Fonksiyonlar

### 18.9.1. Eksik Veri İşlemleri

```r
# Eksik veri kontrolü
is.na(hastalar$yas)
sum(is.na(hastalar$yas))  # Kaç eksik var?

# Eksik verileri çıkarma
na.omit(hastalar)

# tidyr ile (drop_na ve replace_na fonksiyonları tidyr paketindedir)
library(tidyr)
hastalar %>% drop_na()
hastalar %>% drop_na(yas, tansiyon)  # Belirli sütunlarda

# Eksik değer doldurma
hastalar %>%
  mutate(yas = replace_na(yas, mean(yas, na.rm = TRUE)))
```

### 18.9.2. Tekrar Eden Satırlar

```r
# Tekrar kontrolü
duplicated(hastalar)

# Tekrarları çıkarma (base R)
unique(hastalar)

# dplyr ile benzersiz satırlar
distinct(hastalar)
distinct(hastalar, cinsiyet, .keep_all = TRUE)  # Her cinsiyetten bir tane
```

### 18.9.3. Sütun Yeniden Adlandırma

```r
# Base R (özgün tabloyu bozmamak için bir kopya üzerinde)
hastalar2 <- hastalar
names(hastalar2)[names(hastalar2) == "yas"] <- "age"

# dplyr ile (sonuç yeni bir tablo olarak döner; hastalar değişmez)
rename(hastalar, age = yas, gender = cinsiyet)
```

### 18.9.4. Satır Numarası Ekleme

```r
hastalar %>%
  mutate(satir_no = row_number())
```

---

## 18.10. Kapsamlı Bir Örnek

Öğrendiklerimizi birleştirelim. Diyelim ki şu soruyu yanıtlamak istiyoruz: "Sigara içen ve içmeyen gruplar arasında ortalama tansiyon ve kolesterol farklılıkları nelerdir? Her gruptan kaç kişi var ve en yüksek risk skoruna sahip hastalar kimler?"

```r
# Önce risk skorunu hesaplayalım
analiz_sonuc <- hastalar %>%
  # Yeni değişkenler oluştur
  mutate(
    risk_skoru = tansiyon * 0.4 + kolesterol * 0.3 + yas * 0.3,
    sigara_durum = ifelse(sigara, "İçiyor", "İçmiyor")
  ) %>%
  # Sigara durumuna göre grupla
  group_by(sigara_durum) %>%
  # Özet istatistikleri hesapla
  summarise(
    hasta_sayisi = n(),
    ort_yas = round(mean(yas), 1),
    ort_tansiyon = round(mean(tansiyon), 1),
    ort_kolesterol = round(mean(kolesterol), 1),
    ort_risk = round(mean(risk_skoru), 1),
    max_risk = round(max(risk_skoru), 1)
  ) %>%
  # Risk skoruna göre sırala
  arrange(desc(ort_risk))

print(analiz_sonuc)
```

Çıktı:
```
# A tibble: 2 × 7
  sigara_durum hasta_sayisi ort_yas ort_tansiyon ort_kolesterol ort_risk max_risk
  <chr>               <int>   <dbl>        <dbl>          <dbl>    <dbl>    <dbl>
1 İçiyor                  3    56.7          140           233.     143      160.
2 İçmiyor                 3    34            111           182.     109.     118
```

Tibble çıktısı sayıları kısaltarak gösterir. Tam değerler şöyledir: Sigara içenlerde ortalama kolesterol 233.3, ortalama risk 143.0, en yüksek risk 160.1; içmeyenlerde ortalama kolesterol 181.7, ortalama risk 109.1, en yüksek risk 118.0'dır. Tam değerleri görmek için `print(as.data.frame(analiz_sonuc))` kullanılabilir.

---

## 18.11. Özet Tablo: Temel dplyr Fonksiyonları

| Fonksiyon | İşlevi | Örnek |
|-----------|--------|-------|
| `select()` | Sütun seçimi | `select(veri, col1, col2)` |
| `filter()` | Satır filtreleme | `filter(veri, col > 5)` |
| `mutate()` | Yeni değişken | `mutate(veri, yeni = col * 2)` |
| `arrange()` | Sıralama | `arrange(veri, col)` |
| `summarise()` | Özetleme | `summarise(veri, ort = mean(col))` |
| `group_by()` | Gruplama | `group_by(veri, kategori)` |
| `rename()` | Yeniden adlandırma | `rename(veri, yeni = eski)` |
| `distinct()` | Benzersiz satırlar | `distinct(veri, col)` |

---

## 18.12. Veri Birleştirme: Join İşlemleri

Gerçek dünyada veriler nadiren tek bir tabloda bulunur. Hastane örneğimize devam edersek: hasta demografik bilgileri bir tabloda, laboratuvar sonuçları başka bir tabloda, tedavi kayıtları üçüncü bir tabloda olabilir. Bu tabloları anlamlı şekilde birleştirmek veri analizinin temel becerilerinden biridir.

**Join** (birleştirme) terimi, İngilizcede "katılmak, birleşmek" anlamına gelir. Veritabanı terminolojisinde ise iki veya daha fazla tabloyu ortak bir anahtar (key) üzerinden birleştirme işlemini ifade eder. SQL dilinden R'a geçmiş bir kavramdır.

### 18.12.1. Örnek Veri Setleri

Birleştirme işlemlerini göstermek için birbiriyle ilişkili üç tablo oluşturalım:

```r
# Hasta demografik bilgileri
hastalar <- data.frame(
  hasta_id = c(101, 102, 103, 104, 105),
  ad = c("Ahmet", "Ayşe", "Mehmet", "Fatma", "Ali"),
  yas = c(45, 32, 58, 29, 67),
  cinsiyet = c("E", "K", "E", "K", "E")
)

# Laboratuvar sonuçları (bazı hastalar eksik)
lab_sonuclari <- data.frame(
  hasta_id = c(101, 102, 103, 106, 107),
  hemoglobin = c(14.2, 12.8, 15.1, 13.5, 11.9),
  glukoz = c(95, 88, 142, 101, 76),
  tarih = c("2024-01-15", "2024-01-16", "2024-01-15", "2024-01-17", "2024-01-18")
)

# Tedavi kayıtları
tedaviler <- data.frame(
  hasta_id = c(101, 101, 102, 103, 108),
  ilac = c("Aspirin", "Metformin", "Parol", "Metformin", "Aspirin"),
  doz_mg = c(100, 500, 500, 1000, 100)
)
```

Tablolar arasında tam bir örtüşme yoktur: bazı hastalar lab sonuçlarında var ama hasta listesinde yok (106, 107), bazıları tedavi kayıtlarında var ama hasta listesinde yok (108). Bu durum gerçek verilerde oldukça yaygındır.

### 18.12.2. Join Türleri

dplyr paketi dört temel join fonksiyonu sunar. Her birinin davranışı farklıdır ve doğru olanı seçmek analiz sonuçlarınızı doğrudan etkiler.

#### 18.12.2.1. Inner Join: Kesişim

`inner_join()` sadece her iki tabloda da bulunan kayıtları döndürür. Küme teorisindeki kesişim (∩) işlemine benzer.

```r
library(dplyr)

# Sadece her iki tabloda da olan hastalar
inner_join(hastalar, lab_sonuclari, by = "hasta_id")
```

Çıktı:
```
  hasta_id     ad yas cinsiyet hemoglobin glukoz      tarih
1      101  Ahmet  45        E       14.2     95 2024-01-15
2      102   Ayşe  32        K       12.8     88 2024-01-16
3      103 Mehmet  58        E       15.1    142 2024-01-15
```

Hasta 104 ve 105 sonuçta yok çünkü lab kayıtları bulunmuyor. Hasta 106 ve 107 de yok çünkü hasta listesinde kayıtlı değiller.

#### 18.12.2.2. Left Join: Sol Tablo Öncelikli

`left_join()` sol tablodaki (ilk argüman) tüm kayıtları korur, sağ tablodan eşleşenleri ekler. Eşleşme yoksa NA değeri atanır. Buradaki "sol" (left), fonksiyona ilk argüman olarak verilen ana tabloyu ifade eder.

```r
# Tüm hastalar, lab sonuçları varsa ekle
left_join(hastalar, lab_sonuclari, by = "hasta_id")
```

Çıktı:
```
  hasta_id     ad yas cinsiyet hemoglobin glukoz      tarih
1      101  Ahmet  45        E       14.2     95 2024-01-15
2      102   Ayşe  32        K       12.8     88 2024-01-16
3      103 Mehmet  58        E       15.1    142 2024-01-15
4      104  Fatma  29        K         NA     NA       <NA>
5      105    Ali  67        E         NA     NA       <NA>
```

Fatma ve Ali'nin lab sonuçları NA olarak görünüyor. Bu join türü, "ana tablodaki tüm kayıtları kaybetmeden zenginleştirme" yapmak istediğinizde kullanılır.

#### 18.12.2.3. Right Join: Sağ Tablo Öncelikli

`right_join()` tam tersi mantıkla çalışır: sağ tablodaki tüm kayıtları korur.

```r
# Tüm lab sonuçları, hasta bilgisi varsa ekle
right_join(hastalar, lab_sonuclari, by = "hasta_id")
```

Çıktı:
```
  hasta_id     ad yas cinsiyet hemoglobin glukoz      tarih
1      101  Ahmet  45        E       14.2     95 2024-01-15
2      102   Ayşe  32        K       12.8     88 2024-01-16
3      103 Mehmet  58        E       15.1    142 2024-01-15
4      106   <NA>  NA     <NA>       13.5    101 2024-01-17
5      107   <NA>  NA     <NA>       11.9     76 2024-01-18
```

Hasta 106 ve 107'nin demografik bilgileri NA, çünkü hasta listesinde kayıtlı değiller ama lab sonuçları var.

#### 18.12.2.4. Full Join: Birleşim

`full_join()` her iki tablodaki tüm kayıtları korur. Küme teorisindeki birleşim (∪) işlemine karşılık gelir.

```r
# Her iki tablodaki tüm kayıtlar
full_join(hastalar, lab_sonuclari, by = "hasta_id")
```

Çıktı:
```
  hasta_id     ad yas cinsiyet hemoglobin glukoz      tarih
1      101  Ahmet  45        E       14.2     95 2024-01-15
2      102   Ayşe  32        K       12.8     88 2024-01-16
3      103 Mehmet  58        E       15.1    142 2024-01-15
4      104  Fatma  29        K         NA     NA       <NA>
5      105    Ali  67        E         NA     NA       <NA>
6      106   <NA>  NA     <NA>       13.5    101 2024-01-17
7      107   <NA>  NA     <NA>       11.9     76 2024-01-18
```

### 18.12.3. Farklı Sütun İsimleriyle Birleştirme

Tablolardaki anahtar sütunların isimleri farklı olabilir. Bu durumda `by` parametresinde eşleştirme belirtilir:

```r
# Sütun isimleri farklıysa
randevular <- data.frame(
  patient_no = c(101, 102, 103),
  randevu_tarihi = c("2024-02-01", "2024-02-03", "2024-02-05"),
  bolum = c("Dahiliye", "Kardiyoloji", "Dahiliye")
)

# Farklı isimli sütunları eşleştirme
left_join(hastalar, randevular, by = c("hasta_id" = "patient_no"))
```

### 18.12.4. Birden Fazla Anahtar ile Birleştirme

Bazen tek bir sütun benzersiz eşleşme sağlamaz. Örneğin, aynı hastanın farklı tarihlerdeki kayıtlarını eşleştirmek için hem hasta_id hem de tarih kullanılabilir:

```r
# Günlük ölçümler
olcumler_sabah <- data.frame(
  hasta_id = c(101, 101, 102),
  tarih = c("2024-01-15", "2024-01-16", "2024-01-15"),
  tansiyon_sabah = c(120, 118, 110)
)

olcumler_aksam <- data.frame(
  hasta_id = c(101, 101, 102),
  tarih = c("2024-01-15", "2024-01-16", "2024-01-15"),
  tansiyon_aksam = c(125, 122, 108)
)

# İki anahtar ile birleştirme
inner_join(olcumler_sabah, olcumler_aksam, by = c("hasta_id", "tarih"))
```

Çıktı:
```
  hasta_id      tarih tansiyon_sabah tansiyon_aksam
1      101 2024-01-15            120            125
2      101 2024-01-16            118            122
3      102 2024-01-15            110            108
```

### 18.12.5. Base R ile Join İşlemleri: merge()

dplyr kullanmadan da birleştirme yapılabilir. `merge()` fonksiyonu base R'ın sunduğu çözümdür:

```r
# Inner join (varsayılan)
merge(hastalar, lab_sonuclari, by = "hasta_id")

# Left join
merge(hastalar, lab_sonuclari, by = "hasta_id", all.x = TRUE)

# Right join
merge(hastalar, lab_sonuclari, by = "hasta_id", all.y = TRUE)

# Full join
merge(hastalar, lab_sonuclari, by = "hasta_id", all = TRUE)
```

`merge()` fonksiyonu işlevsel olarak yeterli olsa da dplyr fonksiyonları daha okunabilir ve pipe zincirleriyle daha uyumludur.

### 18.12.6. Filtering Joins: semi_join() ve anti_join()

Bu iki fonksiyon birleştirme yapmaz, filtreleme yapar. Sonuç tablosunda sadece sol tablonun sütunları bulunur.

#### 18.12.6.1. semi_join(): Eşleşenleri Filtrele

`semi_join()` sol tabloda, sağ tabloda karşılığı olan satırları döndürür:

```r
# Lab sonucu olan hastaları filtrele (lab sütunlarını ekleme)
semi_join(hastalar, lab_sonuclari, by = "hasta_id")
```

Çıktı:
```
  hasta_id     ad yas cinsiyet
1      101  Ahmet  45        E
2      102   Ayşe  32        K
3      103 Mehmet  58        E
```

#### 18.12.6.2. anti_join(): Eşleşmeyenleri Filtrele

`anti_join()` tam tersi: sol tabloda, sağ tabloda karşılığı olmayan satırları döndürür. Eksik verileri tespit etmek için çok kullanışlıdır.

```r
# Lab sonucu olmayan hastalar
anti_join(hastalar, lab_sonuclari, by = "hasta_id")
```

Çıktı:
```
  hasta_id    ad yas cinsiyet
1      104 Fatma  29        K
2      105   Ali  67        E
```

```r
# Hasta kaydı olmayan lab sonuçları
anti_join(lab_sonuclari, hastalar, by = "hasta_id")
```

Çıktı:
```
  hasta_id hemoglobin glukoz      tarih
1      106       13.5    101 2024-01-17
2      107       11.9     76 2024-01-18
```

### 18.12.7. Üç veya Daha Fazla Tabloyu Birleştirme

Gerçek analizlerde genellikle ikiden fazla tablo birleştirilir. Pipe operatörü bu işlemi zincirleme yapmayı kolaylaştırır:

```r
# Üç tabloyu birleştir
tam_veri <- hastalar %>%
  left_join(lab_sonuclari, by = "hasta_id") %>%
  left_join(tedaviler, by = "hasta_id")

print(tam_veri)
```

Çıktı:
```
  hasta_id     ad yas cinsiyet hemoglobin glukoz      tarih      ilac doz_mg
1      101  Ahmet  45        E       14.2     95 2024-01-15   Aspirin    100
2      101  Ahmet  45        E       14.2     95 2024-01-15 Metformin    500
3      102   Ayşe  32        K       12.8     88 2024-01-16     Parol    500
4      103 Mehmet  58        E       15.1    142 2024-01-15 Metformin   1000
5      104  Fatma  29        K         NA     NA       <NA>      <NA>     NA
6      105    Ali  67        E         NA     NA       <NA>      <NA>     NA
```

Dikkat: Ahmet'in iki satırı var çünkü iki farklı ilaç kullanıyor. Bu davranış, **one-to-many** (birden çoğa) ilişkilerde beklenen sonuçtur.

### 18.12.8. Join İşlemlerinde Dikkat Edilecek Noktalar

**Yinelenen anahtar sorunu:** Anahtar sütunda tekrar eden değerler varsa satır sayısı beklenmedik şekilde artabilir. Her iki tabloda da yinelenen değer varsa, eşleşen satırların tüm birleşimleri (kartezyen çarpım) oluşur.

```r
# Tehlikeli durum örneği
tablo_a <- data.frame(id = c(1, 1), a = c("x", "y"))
tablo_b <- data.frame(id = c(1, 1), b = c("m", "n"))
inner_join(tablo_a, tablo_b, by = "id")
```

Çıktı (4 satır):
```
  id a b
1  1 x m
2  1 x n
3  1 y m
4  1 y n
```

dplyr 1.1.0 ve sonraki sürümler bu durumda "Detected an unexpected many-to-many relationship between `x` and `y`" uyarısı verir. Çoğa çok (many-to-many) ilişki bilerek isteniyorsa `relationship = "many-to-many"` argümanı yazılarak uyarı kapatılabilir.

**Sütun ismi çakışması:** Her iki tabloda aynı isimde (anahtar olmayan) sütunlar varsa, dplyr otomatik olarak `.x` ve `.y` sonekleri ekler:

```r
# Her iki tabloda da "tarih" sütunu var
tablo1 <- data.frame(id = 1, tarih = "2024-01-01", deger = 10)
tablo2 <- data.frame(id = 1, tarih = "2024-01-05", sonuc = 20)

inner_join(tablo1, tablo2, by = "id")
```

Çıktı:
```
  id    tarih.x deger    tarih.y sonuc
1  1 2024-01-01    10 2024-01-05    20
```

Bu durumu önlemek için `suffix` parametresi kullanılabilir:

```r
inner_join(tablo1, tablo2, by = "id", suffix = c("_baslangic", "_bitis"))
```

### 18.12.9. Join Türleri Özet Tablosu

| Fonksiyon | Açıklama | Sonuçta Kim Var? |
|-----------|----------|------------------|
| `inner_join()` | Kesişim | Her iki tabloda eşleşenler |
| `left_join()` | Sol öncelikli | Sol tablonun tamamı + sağdan eşleşenler |
| `right_join()` | Sağ öncelikli | Sağ tablonun tamamı + soldan eşleşenler |
| `full_join()` | Birleşim | Her iki tablonun tamamı |
| `semi_join()` | Filtre (var) | Sol tablodan, sağda karşılığı olanlar |
| `anti_join()` | Filtre (yok) | Sol tablodan, sağda karşılığı olmayanlar |

### 18.12.10. Kapsamlı Join Örneği

Bir hastane senaryosunda, diyabet hastalarının son lab sonuçlarını ve aktif tedavilerini tek bir tabloda görmek istediğimizi düşünelim:

```r
# Diyabet şüphesi olan hastalar (açlık glukozu > 126 mg/dL)
diyabet_raporu <- hastalar %>%
  # Lab sonuçlarını ekle
  inner_join(lab_sonuclari, by = "hasta_id") %>%
  # Glukozu 126'nın üzerinde olanları filtrele
  filter(glukoz > 126) %>%
  # Tedavi bilgilerini ekle
  left_join(tedaviler, by = "hasta_id") %>%
  # Sadece Metformin kullananlar
  filter(ilac == "Metformin" | is.na(ilac)) %>%
  # İstenen sütunları seç ve düzenle
  select(hasta_id, ad, yas, glukoz, ilac, doz_mg) %>%
  # Glukoz değerine göre sırala
  arrange(desc(glukoz))

print(diyabet_raporu)
```

Çıktı:
```
  hasta_id     ad yas glukoz      ilac doz_mg
1      103 Mehmet  58    142 Metformin   1000
```

Lab sonucu olan hastalardan yalnızca Mehmet'in glukoz değeri (142) eşiği aşmaktadır. Glukozu 101 olan 106 numaralı kayıt, hasta listesinde bulunmadığı için `inner_join()` adımında elenmiştir.

---

## 18.13. Alıştırmalar

### 18.13.1. Temel Alıştırmalar

1. `mtcars` veri setinden sadece 6 silindirli araçları filtreleyip, ortalama yakıt tüketimini (mpg) hesaplayın.

2. `iris` veri setinde her tür için ortalama petal uzunluğunu bulun ve azalan sırada listeleyin.

3. Kendi oluşturduğunuz bir öğrenci veri setinde (isim, not1, not2, not3 sütunları), ortalama notu hesaplayıp "Geçti/Kaldı" şeklinde yeni bir değişken ekleyin.

### 18.13.2. Join Alıştırmaları

4. Aşağıdaki iki tabloyu oluşturun ve farklı join türlerinin sonuçlarını karşılaştırın:
   - Ürünler: urun_id, urun_adi, kategori
   - Satislar: satis_id, urun_id, miktar, tarih

5. `anti_join()` kullanarak hiç satışı olmayan ürünleri bulun.

6. Üç tablo oluşturun (ogrenciler, dersler, notlar) ve bunları birleştirerek her öğrencinin aldığı dersleri ve notlarını gösteren bir rapor hazırlayın.

---

[← 17. Metin Madenciliği](17-metin-madenciligi.md) · [İçindekiler](../Ders_Notu.md) · [Kaynaklar →](kaynaklar.md)
