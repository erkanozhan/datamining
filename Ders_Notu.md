# VERİ MADENCİLİĞİ (DATA MINING)  
**Ders Kodu:** BMSB403  
**Hazırlayan:** Ph.D. Erkan ÖZHAN  
Tekirdağ Namık Kemal Üniversitesi  
Çorlu Mühendislik Fakültesi  
Bilgisayar Mühendisliği Bölümü  
2022.v13-5  

E-posta: erkanozhan@gmail.com / eozhan@nku.edu.tr  
Tel: +90 282 250 23 84  

---

## Veri Nedir? (What is Data?)
- **Dijital Veri**
- **Basılı – Fiziksel Veri**
- **Soyut Veri**

### Veri Türleri:
- Doküman, Resim, Ses, Video, Metin, Program  
- Gazete, Dergi, Kitap, Afiş vb.  
- Tecrübeler, Hatıralar, Hayaller …

---

## Veri Kaynakları
- Marketler  
- Kurumlar  
- Konuşmalar  
- Hastaneler  
- Eğitim Kurumları  
- Laboratuvarlar  
- Turnikeler  
- Otoyol Geçiş Sistemleri  
- Sensörler  
- Facebook, Twitter  
- E-Mailler  
- Otomasyon Sistemleri  

---

## Veri Kaynaklarının Gelişimi
Otomatize edilmiş veri toplama araçları ve “olgunlaşmış” veritabanları; veri ambarlarında ve diğer bilgi depolama alanlarında devasa miktarda verinin birikmesine sebep olmuştur.  

- **Veri Üretimi:** Günümüzde her gün milyarlarca gigabayt veri üretilmektedir. 2025 yılına kadar küresel veri miktarının 175 zettabayta ulaşması beklenmektedir.
- **Depolama Gelişmeleri:** Depolama maliyetleri düşmeye devam ederken, bu devasa veri yığınlarını saklama kapasitemiz sürekli artmaktadır.
- **Sonuç:** Veri bolluğu içindeyiz, ancak asıl ihtiyaç duyduğumuz şey bu veriden anlamlı bilgi (knowledge) ve içgörü (insight) elde etmektir. 

Jerome Friedman:  
> “Verinin boyutu her 10 katına çıktığında, onu analiz etme biçimimizi tamamen yeniden şekillendirmek zorundayız.”  


## Veri Madenciliği (Data Mining)

Veri madenciliği, veri tabanı sorgularından (**database query**) farklıdır.  

### Veritabanı Sorgusu (Geleneksel Analiz)
- "Geçen ay en çok hangi ürün satıldı?"
- "İstanbul'daki müşterilerimizin ortalama yaşı kaçtır?"
- "Son üç ayda kaç yeni müşteri kazandık?"  

### Veri Madenciliği Analizi (Keşif ve Tahmin)
Veri madenciliği, verinin derinliklerindeki gizli örüntüleri, ilişkileri ve gelecek trendlerini ortaya çıkarmayı hedefler.

- **Birliktelik Analizi:** "Hangi ürünler genellikle birlikte satın alınır?" (Örn: Bebek bezi alan müşteriler bira da alır mı?)
- **Tahminleme (Sınıflandırma):** "Hangi müşterilerin önümüzdeki 3 ay içinde aboneliklerini iptal etme olasılığı yüksektir?"
- **Kümeleme:** "Müşterilerimizi satın alma davranışlarına göre hangi doğal gruplara (segmentlere) ayırabiliriz?"
- **Anomali Tespiti:** "Hangi kredi kartı işlemleri sahtekarlık şüphesi taşımaktadır?"
- **Tavsiye Sistemleri:** "A ürününü satın alan bir müşteriye başka hangi ürünleri önermeliyiz?"

---

## Veri Madenciliği Modelleri
Veri madenciliğinin temel amacı, verinin içindeki gizli örüntüleri ve ilişkileri keşfetmek için modeller oluşturmaktır. Bu modeller, açıkça kodlanmış kurallara dayanmak yerine, veriden otomatik olarak öğrenilir ve genellikle iki ana kategoriye ayrılır:

1.  **Tahminleyici (Predictive) Modeller:**
    - Gelecekteki veya bilinmeyen olayların sonucunu tahmin etmek için kullanılır.
    - **Örnekler:** Bir müşterinin bir ürünü satın alıp almayacağını tahmin eden **sınıflandırma** modelleri veya bir evin gelecekteki fiyatını tahmin eden **regresyon** modelleri.

2.  **Betimleyici (Descriptive) Modeller:**
    - Verideki doğal gruplamaları, ilişkileri veya aykırı durumları bulmaya odaklanır.
    - **Örnekler:** Müşterileri benzer satın alma alışkanlıklarına göre gruplayan **kümeleme** modelleri, birlikte sıkça satın alınan ürünleri belirleyen **birliktelik kuralları** veya sahtekarlık tespiti için kullanılan **anomali tespiti** modelleri.

---

## Veri Madenciliği, Makine Öğrenmesi ve İstatistik İlişkisi
Veri madenciliği, makine öğrenmesi ve istatistik birbiriyle yakından ilişkili, sıklıkla iç içe geçmiş alanlardır. Veri madenciliği, bu disiplinlerden gelen yöntemleri pratik problemlere uygulama sürecidir.

-   **İstatistik (Statistics):**
    -   Veri madenciliğinin teorik temelini oluşturur.
    -   Veriyi anlama, özetleme, hipotez test etme ve sonuçların güvenilirliğini ölçme gibi konulara odaklanır.
    -   Örnekleme, olasılık teorisi ve modelleme gibi klasik yöntemler sunar. Temel amacı, veriden çıkarım (inference) yapmaktır.

-   **Makine Öğrenmesi (Machine Learning):**
    -   Veri madenciliğinin algoritmik motorudur. Bilgisayar bilimi ve yapay zekanın bir alt dalıdır.
    -   Büyük veri setleri üzerinde verimli bir şekilde çalışabilen algoritmalar geliştirmeye odaklanır.
    -   Açıkça programlanmadan, veriden öğrenerek tahminler veya kararlar üreten sistemler oluşturur. Sınıflandırma, regresyon, kümeleme gibi algoritmalar bu alandan gelir. Temel amacı, tahminsel doğruluktur (predictive accuracy).

-   **Veri Madenciliği (Data Mining):**
    -   İstatistik ve makine öğrenmesi tekniklerini kullanarak büyük veri yığınları içindeki **anlamlı, yeni ve potansiyel olarak faydalı** örüntüleri keşfetme sürecidir.
    -   Odak noktası, keşfedilen bilgiyi pratik ve işlevsel bir içgörüye dönüştürmektir.
    -   Genellikle "Veritabanlarında Bilgi Keşfi" (Knowledge Discovery in Databases - KDD) sürecinin bir adımı olarak kabul edilir.

**Özetle:**
-   **İstatistik** "Neden?" sorusuna odaklanarak verinin altındaki yapıyı ve güvenilirliği anlamaya çalışır.
-   **Makine Öğrenmesi** "Nasıl?" sorusuna odaklanarak veriden öğrenen ve doğru tahminler yapan algoritmalar geliştirir.
-   **Veri Madenciliği** ise bu araçları kullanarak "Ne?" sorusuna cevap arar: "Veride hangi gizli ve değerli örüntüler var?" 

---

## Veri Madenciliğinin Önemi ve Uygulama Alanları

Veri madenciliği, ham veriyi iş zekasına, bilimsel keşiflere ve stratejik karar alma süreçlerine dönüştüren kritik bir disiplindir. Önemi, sadece büyük veri yığınlarını analiz etme kapasitesinden değil, aynı zamanda bu verilerden daha önce bilinmeyen, eyleme geçirilebilir ve değerli bilgiler çıkarma yeteneğinden kaynaklanır. Bu süreç, çeşitli sektörlerde devrim yaratmıştır:

-   **İşletme ve Pazarlama:**
    -   **Müşteri Segmentasyonu:** Müşterileri demografik bilgilere, satın alma alışkanlıklarına veya davranışlarına göre gruplayarak hedefli pazarlama stratejileri geliştirilir.
    -   **Pazar Sepeti Analizi (Birliktelik Kuralları):** Hangi ürünlerin birlikte satın alındığını tespit ederek raf düzenlemeleri, çapraz satış (cross-selling) ve promosyon kampanyaları optimize edilir.
    -   **Müşteri Kaybı (Churn) Analizi:** Bir hizmeti terk etme olasılığı yüksek olan müşterileri önceden belirleyerek onları elde tutmaya yönelik proaktif adımlar atılır.

-   **Finans ve Bankacılık:**
    -   **Sahtekarlık Tespiti (Fraud Detection):** Kredi kartı işlemlerindeki veya sigorta taleplerindeki anormal ve şüpheli örüntüleri tespit ederek finansal kayıplar önlenir.
    -   **Kredi Riski Değerlendirmesi:** Başvuru sahiplerinin kredi geçmişini ve diğer özelliklerini analiz ederek geri ödeme olasılıklarını tahmin eder ve kredi kararlarını destekler.

-   **Sağlık ve Biyoinformatik:**
    -   **Hastalık Teşhisi ve Tahmini:** Tıbbi verileri (görüntüler, laboratuvar sonuçları, hasta geçmişi) analiz ederek hastalıkların erken teşhisine yardımcı olur ve tedavi sonuçlarını tahmin eder.
    -   **Genomik Veri Analizi:** Gen dizilimlerindeki örüntüleri keşfederek genetik hastalıklara yatkınlığı belirler ve kişiselleştirilmiş tıp uygulamalarına zemin hazırlar.

-   **Web ve E-Ticaret:**
    -   **Tavsiye Sistemleri (Recommendation Systems):** Kullanıcıların geçmiş davranışlarına dayanarak onlara ilgi duyabilecekleri ürün, film veya içerikleri önerir, böylece kullanıcı deneyimini ve satışları artırır.
    -   **Web Kullanım Madenciliği:** Web sitesi ziyaretçilerinin gezinme yollarını analiz ederek site tasarımını ve kullanıcı arayüzünü iyileştirir.

Bu uygulamalar, veri madenciliğinin sadece teorik bir alan olmadığını, aynı zamanda kuruluşların daha akıllı kararlar almasını, verimliliği artırmasını ve rekabet avantajı elde etmesini sağlayan güçlü bir pratik araç olduğunu göstermektedir.

## Veri Madenciliği (Data Mining)

### Tanım
Veri madenciliği, çeşitli akademik kaynaklarda farklı şekillerde tanımlanmakla birlikte, temel olarak büyük veri setleri içindeki değerli bilgiyi keşfetme sürecini ifade eder.

- **Fayyad, Piatetsky-Shapiro, & Smyth (1996)** tarafından yapılan klasik tanıma göre veri madenciliği, "veri içerisindeki **geçerli, yeni, potansiyel olarak kullanışlı** ve nihayetinde **anlaşılabilir** örüntülerin önemsiz olmayan (non-trivial) çıkarım sürecidir." Bu tanım, sürecin sadece veri işlemeyi değil, aynı zamanda keşfedilen bilginin niteliğini de vurgular.
- **Han, Kamber, & Pei (2012)** ise veri madenciliğini, "büyük miktardaki veriden ilginç örüntüleri ve bilgiyi keşfetme süreci" olarak daha geniş bir perspektiften ele alır. Bu süreç, veritabanları, veri ambarları, web ve diğer bilgi havuzlarını kapsar.
- Temel amaç, veriden öğrenen bir **model** oluşturmaktır. Bu model, veriyi özetler ve gelecekteki olayları tahmin etmek (tahminleyici model) veya verinin iç yapısını anlamak (betimleyici model) için kullanılır. Keşfedilen bu yapılar genellikle **model** veya **örüntü (pattern)** olarak adlandırılır.

---
## Veritabanlarında Bilgi Keşfi (Knowledge Discovery in Databases - KDD)

Veritabanlarında Bilgi Keşfi (KDD), ham veri yığınları içerisinden **geçerli, yeni, potansiyel olarak faydalı ve nihayetinde anlaşılabilir** örüntüleri bulmaya yönelik **önemsiz olmayan (non-trivial)** ve bütünsel bir süreçtir. KDD, veri madenciliğini de içeren çok adımlı bir metodoloji olarak kabul edilir ve veriden bilgiye giden yol haritasını çizer.

### KDD Sürecinin Adımları
KDD süreci, genellikle aşağıdaki ardışık adımlardan oluşur:

1.  **Veri Seçimi (Selection):** Analiz hedefine uygun olarak, ilgili veri kaynaklarından (veritabanları, veri ambarları vb.) bir hedef veri kümesi oluşturulur.
2.  **Ön İşleme (Preprocessing):** Veri kalitesini artırmak için en kritik adımlardan biridir. Bu aşamada gürültülü veriler temizlenir, eksik değerler yönetilir ve tutarsızlıklar giderilir.
3.  **Dönüşüm (Transformation):** Veri, madencilik algoritmalarının uygulanmasına uygun hale getirmek için dönüştürülür. Bu, boyut indirgeme, öznitelik mühendisliği (feature engineering) ve normalizasyon gibi teknikleri içerebilir.
4.  **Veri Madenciliği (Data Mining):** Sürecin çekirdek adımıdır. Belirli bir amaç doğrultusunda (örn. sınıflandırma, kümeleme) akıllı algoritmalar kullanılarak veri içerisindeki örüntüler sistematik olarak çıkarılır.
5.  **Yorumlama ve Değerlendirme (Interpretation & Evaluation):** Keşfedilen örüntülerin ve modellerin, başlangıçtaki hedeflerle ne kadar uyumlu olduğu değerlendirilir. Anlamlı bulunan bilgiler görselleştirilerek veya raporlanarak karar vericiler için eyleme geçirilebilir bilgiye dönüştürülür.

### Keşfedilen Bilginin Nitelikleri
KDD sürecinin nihai hedefi, sadece herhangi bir örüntü bulmak değil, aşağıdaki niteliklere sahip olan **bilgiyi** ortaya çıkarmaktır:

-   **Örtük (Implicit):** Basit sorgularla veya geleneksel analiz yöntemleriyle kolayca bulunamayan, verinin derinliklerinde saklı olan.
-   **Geçerli (Valid):** Sadece analiz edilen veri setinde değil, yeni veriler üzerinde de belirli bir güvenilirlik derecesiyle genellenebilir olan.
-   **Yeni ve Özgün (Novel):** Daha önceden bilinmeyen, şaşırtıcı ve beklentilerin ötesinde olan.
-   **Potansiyel Olarak Faydalı (Potentially Useful):** Stratejik bir avantaj sağlayan, karar alma süreçlerini iyileştiren veya bir hedefe ulaşmak için eyleme geçirilebilen.
-   **Anlaşılabilir (Understandable):** Alan uzmanları veya son kullanıcılar tarafından kolayca yorumlanabilen ve anlamlandırılabilen.

---
## Veri Madenciliği ve KDD Arasındaki İlişki

Veri madenciliği, sıklıkla KDD süreciyle eş anlamlı olarak kullanılsa da, metodolojik olarak KDD'nin yalnızca bir adımıdır; ancak en merkezi adımıdır. KDD, veriden bilgiye ulaşmayı hedefleyen bütünsel bir metodoloji iken, veri madenciliği bu sürecin içerisinde belirli algoritmalar kullanarak örüntülerin fiilen çıkarıldığı analitik aşamayı temsil eder. Kısacası, KDD "bilgi keşfi"nin stratejik yol haritasını çizerken, veri madenciliği bu haritadaki en önemli "keşif" eylemidir.

### Efor Dağılımı ve Geleneksel Yöntemlerin Rolü
Uygulamada, bir KDD projesinde harcanan zaman ve eforun büyük bir kısmı—genellikle %80'e varan bir oranı—veri madenciliği adımından önceki hazırlık aşamalarına (veri seçimi, ön işleme ve dönüşüm) ayrılır. Bunun temel nedeni, gerçek dünya verilerinin genellikle "kirli" (eksik, gürültülü, tutarsız) olmasıdır. Veri madenciliği algoritmalarının başarısı, doğrudan girdi verisinin kalitesine bağlıdır. "Çöp girer, çöp çıkar" (Garbage In, Garbage Out) prensibi, bu aşamanın kritik önemini vurgular.

KDD sürecinin başlangıcında, genellikle standart veritabanı sorgulama dilleri (SQL) ve Çevrimiçi Analitik İşleme (OLAP) araçları ile bir ön analiz yapılır. Bu araçlar, veritabanında açıkça var olan bilgileri özetlemek, filtrelemek ve raporlamak için son derece güçlüdür. Ancak bu geleneksel yöntemler, verinin derinliklerindeki örtük, daha önce bilinmeyen ve tahmine dayalı ilişkileri ortaya çıkarmada yetersiz kalır. İşte bu noktada veri madenciliği devreye girer ve SQL'in cevaplayamadığı sorulara odaklanır:

-   **Birliktelik Analizi:** "Hangi ürünler genellikle birlikte satın alınır?" (SQL ile bu soruyu sormak için önce hangi ürünleri karşılaştıracağınızı bilmeniz gerekir; veri madenciliği ise bu ilişkileri otomatik olarak keşfeder.)
-   **Sınıflandırma ve Tahmin:** "Bir müşterinin kredi başvurusunun riskli olup olmadığını hangi özelliklere bakarak tahmin edebilirim?" (Bu, geleceğe yönelik bir tahmin gerektirir ve veriden öğrenen bir model oluşturulmasını zorunlu kılar.)

Özetle, SQL ve OLAP mevcut veriyi "sorgularken", veri madenciliği verinin kendisine "soru sormasını" sağlayarak gizli içgörüleri ve geleceğe yönelik modelleri keşfeder.

## Operasyonel Veritabanları ve Veri Ambarları

Veri analizi ve karar destek sistemleri bağlamında, operasyonel veritabanları ile veri ambarları arasında temel mimari ve amaç farklılıkları bulunmaktadır.

### Operasyonel Veritabanı Sistemleri (OLTP)
Operasyonel sistemler, bir kuruluşun günlük işlemlerini yürütmek için tasarlanmış **Çevrimiçi İşlem Gerçekleştirme (Online Transaction Processing - OLTP)** sistemleridir.

-   **Temel Amaç:** Günlük ticari işlemleri (ekleme, silme, güncelleme) hızlı ve tutarlı bir şekilde kaydetmek ve yönetmektir.
-   **Veri Yapısı:** Veri bütünlüğünü sağlamak ve tekrarı önlemek amacıyla genellikle yüksek derecede normalize edilmiş (Üçüncü Normal Form - 3NF) ilişkisel tablolardan oluşur.
-   **Kullanıcılar:** Genellikle son kullanıcılar, kasiyerler veya veri giriş operatörleridir.
-   **Odak Noktası:** Anlık, güncel veriler üzerindedir. Örneğin, bir bankacılık sistemindeki anlık bakiye veya bir e-ticaret sitesindeki mevcut stok durumu.

### Veri Ambarları (Data Warehouses - DW)
Veri ambarı, farklı operasyonel kaynaklardan toplanan verilerin analiz ve karar destek amacıyla bütünleştirildiği merkezi bir depodur. Bu sistemler **Çevrimiçi Analitik İşleme (Online Analytical Processing - OLAP)** için optimize edilmiştir.

**Tanım (W. H. Inmon):** Veri ambarı; stratejik karar almayı desteklemek amacıyla tasarlanmış, **konu odaklı (subject-oriented)**, **bütünleşik (integrated)**, **zamana göre değişen (time-variant)** ve **kalıcı (non-volatile)** bir veri koleksiyonudur.

-   **Konu Odaklı:** Veriler, "müşteri," "ürün," "satış" gibi analitik konular etrafında organize edilir.
-   **Bütünleşik:** Farklı kaynaklardan (örn. satış veritabanı, pazarlama Müşteri İlişkileri Yönetimi (Customer Relationship Management - CRM)) gelen veriler, tutarlı bir formatta birleştirilir ve standartlaştırılır.
-   **Zamana Göre Değişen:** Veriler, tarihsel bir perspektif sunacak şekilde (örn. son 5 yılın satış verileri) saklanır. Bu, trend analizini mümkün kılar.
-   **Kalıcı:** Veri ambarına yüklenen veriler genellikle değiştirilmez veya silinmez. Sadece periyodik olarak yeni veriler eklenir.

### OLTP ve Veri Ambarı Karşılaştırması

| Özellik | OLTP Sistemleri (Operasyonel Veritabanı) | Veri Ambarı (OLAP için) |
| :--- | :--- | :--- |
| **Ana Amaç** | Günlük işlemleri yürütme | Stratejik karar verme ve analiz |
| **Veri İçeriği** | Anlık, güncel ve detaylı veri | Tarihsel, özetlenmiş ve birleştirilmiş veri |
| **Veri Yapısı** | Yüksek derecede normalize (örn. 3NF) | Denormalize, çok boyutlu (örn. Yıldız, Kar Tanesi) |
| **Odak** | İşlem (Transaction) odaklı | Analiz (Query) odaklı |
| **Erişim Türü** | Sık okuma/yazma işlemleri | Yoğunlukla okuma, karmaşık sorgular |
| **Kullanıcılar** | Veri giriş operatörleri, son kullanıcılar | Bilgi çalışanları, analistler, yöneticiler |

### Veri Ambarı Mimarisi ve ETL Süreci

Veri ambarları, çeşitli kaynaklardan veri toplayan ve bu veriyi analize uygun hale getiren bir **Ayıklama, Dönüştürme, Yükleme (Extract, Transform, Load - ETL)** süreci üzerine kuruludur.

```mermaid
graph TD
   subgraph "Kaynak Sistemler"
        A["Operasyonel DB 1 (OLTP)"]
        B["Operasyonel DB 2 (CRM)"]
        C["Harici Veriler (Excel, API)"]
    end
    subgraph "Veri Hazırlama Alanı (Staging Area)"
        D{ETL Süreci}
        E[Veri Çıkarma]
        F[Temizleme, Birleştirme, Standardizasyon]
        G[Veri Yükleme]
        D -- 1. Extract (Çıkarma) --> E
        E -- 2. Transform (Dönüştürme) --> F
        F -- 3. Load (Yükleme) --> G
    end
    H["Veri Ambarı (Data Warehouse)"]
    subgraph "Analiz ve Raporlama"
        I[OLAP Sunucusu]
        J[Raporlama Araçları]
        K[Veri Madenciliği Araçları]
    end
    A --> D
    B --> D
    C --> D
    G --> H
    H --> I
    H --> J
    H --> K
```

1.  **Çıkarma (Extract):** Farklı operasyonel veritabanları ve harici kaynaklardan (örn. Uygulama Programlama Arayüzü - Application Programming Interface - API) ilgili veriler çekilir.
2.  **Dönüştürme (Transform):** Veriler temizlenir (eksik değerler doldurulur, tutarsızlıklar giderilir), birleştirilir ve veri ambarının standart şemasına uygun hale getirilir.
3.  **Yükleme (Load):** Dönüştürülmüş ve hazır hale getirilmiş veri, analiz edilmek üzere veri ambarına yüklenir.


### Meta Veri (Metadata)

**Tanım:** En basit tanımıyla meta veri, **"veri hakkında veri"** demektir. Veri ambarındaki verinin ne anlama geldiğini, nereden geldiğini, nasıl yapılandırıldığını ve nasıl kullanılacağını açıklayan bir tür "veri sözlüğü" veya "kullanım kılavuzu"dur. Ham veriye bağlam ve anlam kazandırır.

Meta veri, aşağıdaki gibi sorulara yanıt verir:
-   Bu verinin adı nedir? (`Satis_Miktari`)
-   Veri türü nedir? (Sayısal, metin, tarih vb.)
-   Hangi tablodan veya sistemden geliyor? (Kaynak)
-   En son ne zaman güncellendi?
-   Hesaplanmış bir alan ise formülü nedir?

**Örnek:**
Bir satış tablosunda `150` şeklinde bir değer olduğunu düşünelim. Bu değer tek başına bir anlam ifade etmez. Ancak meta verisi ile birlikte anlam kazanır:

-   **Veri (Data):** `150`
-   **Meta Veri (Metadata):**
    -   **Öznitelik Adı:** `Satis_Adedi`
    -   **Açıklama:** "Tek bir işlemde satılan ürün sayısı"
    -   **Veri Tipi:** `Tamsayı (Integer)`
    -   **Kaynak Tablo:** `Gunluk_Satislar`
    -   **Geçerli Aralık:** `1 - 500`

Bu meta veri sayesinde `150` değerinin, `Gunluk_Satislar` tablosundaki bir satış işleminde 150 adet ürün satıldığını ifade eden bir tamsayı olduğunu anlarız. Meta veri olmadan, veri yığınları anlamsız sayılardan ibaret kalır.

### Veri Ambarı Şemaları: Veriyi Anlamlandırma Sanatı

Veri ambarında veriler, analiz sorgularını hızlı ve verimli bir şekilde çalıştıracak şekilde özel yapılarla organize edilir. Bu yapılara **şema** denir. En yaygın kullanılan üç şema türü Yıldız, Kar Tanesi ve Galaksi (Fact Constellation) şemalarıdır.

#### 1. Yıldız Şeması (Star Schema)

En basit ve en yaygın kullanılan veri ambarı şemasıdır. Adını, yapısının bir yıldıza benzemesinden alır: merkezde bir **olgu (fact) tablosu** ve bu tabloya doğrudan bağlı olan **boyut (dimension) tabloları** bulunur.

-   **Olgu Tablosu (Fact Table):** İşletmenin sayısal ölçümlerini (satış adedi, gelir, maliyet gibi) ve boyut tablolarına ait yabancı anahtarları (foreign keys) içerir. İş süreçlerinden ölçülen nicel verileri (sayısal değerleri, metrikleri) tutan tablodur.
-   **Boyut Tabloları (Dimension Tables):** Olgu tablosundaki verilere bağlam kazandıran tanımlayıcı bilgileri (ürün adı, müşteri bilgisi, tarih detayları gibi) içerir. Boyut tabloları **denormalize** edilmiştir, yani ilgili tüm bilgiler tek bir tabloda toplanır.

**Avantajları:**
-   **Basitlik:** Anlaşılması ve sorgulanması kolaydır.
-   **Performans:** Daha az `JOIN` işlemi gerektirdiği için sorgular genellikle çok hızlı çalışır.

```mermaid
graph TD
    subgraph "Yıldız Şeması (Star Schema)"
        style FactSales fill:#f9f,stroke:#333,stroke-width:2px
        style DimTime fill:#bbf,stroke:#333,stroke-width:2px
        style DimStore fill:#bbf,stroke:#333,stroke-width:2px
        style DimProduct fill:#bbf,stroke:#333,stroke-width:2px

        FactSales("
            <b>Fact: Sales</b><br/>
            TimeKey<br/>
            StoreKey<br/>
            ProductKey<br/>
            ---<br/>
            <i>UnitsSold</i><br/>
            <i>TotalRevenue</i>
        ")

        DimTime("
            <b>Dim: Time</b><br/>
            <b>TimeKey (PK)</b><br/>
            Date<br/>
            Month<br/>
            Year
        ")

        DimStore("
            <b>Dim: Store</b><br/>
            <b>StoreKey (PK)</b><br/>
            StoreName<br/>
            City<br/>
            Country
        ")

        DimProduct("
            <b>Dim: Product</b><br/>
            <b>ProductKey (PK)</b><br/>
            ProductName<br/>
            Category<br/>
            Brand
        ")

        FactSales -- TimeKey --> DimTime
        FactSales -- StoreKey --> DimStore
        FactSales -- ProductKey --> DimProduct
    end
```

#### 2. Kar Tanesi Şeması (Snowflake Schema)

Yıldız şemasının bir uzantısıdır. Temel fark, boyut tablolarının **normalize** edilmiş olmasıdır. Yani, bir boyut tablosu, veri tekrarını azaltmak için daha küçük ve ilişkili birden fazla tabloya bölünür. Bu yapı, bir kar tanesinin dallanmış kristal yapısına benzediği için bu adı almıştır.

**Avantajları:**
-   **Veri Bütünlüğü:** Normalizasyon sayesinde veri tekrarı azalır ve depolama alanı daha verimli kullanılır.
-   **Bakım Kolaylığı:** Hiyerarşik yapıların yönetimi daha kolaydır (örn. Ürün -> Kategori -> Departman).

**Dezavantajları:**
-   **Sorgu Karmaşıklığı:** Daha fazla tablo olduğu için sorgular daha fazla `JOIN` işlemi gerektirir, bu da performansı düşürebilir.

```mermaid
graph TD
    subgraph "Kar Tanesi Şeması (Snowflake Schema)"
        style FactSales fill:#f9f,stroke:#333,stroke-width:2px
        style DimTime fill:#bbf,stroke:#333,stroke-width:2px
        style DimStore fill:#bbf,stroke:#333,stroke-width:2px
        style DimProduct fill:#bbf,stroke:#333,stroke-width:2px
        style DimCategory fill:#ccf,stroke:#333,stroke-width:2px

        FactSales("
            <b>Fact: Sales</b><br/>
            TimeKey<br/>
            StoreKey<br/>
            ProductKey<br/>
            ---<br/>
            <i>UnitsSold</i><br/>
            <i>TotalRevenue</i>
        ")

        DimTime("
            <b>Dim: Time</b><br/>
            <b>TimeKey (PK)</b><br/>
            Date<br/>
            Month
        ")

        DimStore("
            <b>Dim: Store</b><br/>
            <b>StoreKey (PK)</b><br/>
            StoreName<br/>
            City
        ")

        DimProduct("
            <b>Dim: Product</b><br/>
            <b>ProductKey (PK)</b><br/>
            ProductName<br/>
            Brand<br/>
            CategoryKey (FK)
        ")

        DimCategory("
            <b>Dim: Category</b><br/>
            <b>CategoryKey (PK)</b><br/>
            CategoryName
        ")

        FactSales -- TimeKey --> DimTime
        FactSales -- StoreKey --> DimStore
        FactSales -- ProductKey --> DimProduct
        DimProduct -- CategoryKey --> DimCategory
    end
```

#### 3. Galaksi Şeması / Fact Constellation Şeması

İki veya daha fazla olgu tablosunun, ortak boyut tablolarını paylaştığı daha karmaşık bir yapıdır. Bu şema, birbiriyle ilişkili farklı iş süreçlerini (örneğin, satış ve sevkiyat) tek bir modelde analiz etmek için kullanılır. Yapı, birden fazla yıldızın bir araya gelerek bir galaksi oluşturmasına benzetilir.

**Avantajları:**
-   **Esneklik:** Farklı iş süreçleri arasında entegre analiz yapma imkanı sunar.
-   **Yeniden Kullanılabilirlik:** Boyut tabloları birden fazla olgu tablosu tarafından paylaşıldığı için tutarlılık ve verimlilik artar.

```mermaid
graph TD
    subgraph "Galaksi Şeması (Fact Constellation)"
        style FactSales fill:#f9f,stroke:#333,stroke-width:2px
        style FactShipping fill:#f9f,stroke:#333,stroke-width:2px
        style DimTime fill:#bbf,stroke:#333,stroke-width:2px
        style DimStore fill:#bbf,stroke:#333,stroke-width:2px
        style DimProduct fill:#bbf,stroke:#333,stroke-width:2px
        style DimShipper fill:#bbf,stroke:#333,stroke-width:2px

        FactSales("<b>Fact: Sales</b>")
        FactShipping("<b>Fact: Shipping</b>")

        DimTime("<b>Dim: Time</b>")
        DimStore("<b>Dim: Store</b>")
        DimProduct("<b>Dim: Product</b>")
        DimShipper("<b>Dim: Shipper</b>")

        FactSales -- Paylaşılan Boyut --> DimTime
        FactSales -- Paylaşılan Boyut --> DimStore
        FactSales -- Paylaşılan Boyut --> DimProduct

        FactShipping -- Paylaşılan Boyut --> DimTime
        FactShipping -- Paylaşılan Boyut --> DimProduct
        FactShipping -- Ayrı Boyut --> DimShipper
    end
```

### Şema Karşılaştırması

| Özellik | Yıldız Şeması (Star) | Kar Tanesi Şeması (Snowflake) | Galaksi Şeması (Fact Constellation) |
| :--- | :--- | :--- | :--- |
| **Yapı** | Merkezi bir olgu tablosu, etrafında boyut tabloları | Yıldız şemasının normalize edilmiş hali | Birden fazla olgu tablosu, paylaşılan boyutlar |
| **Normalizasyon** | Boyutlar denormalize (tek tablo) | Boyutlar normalize (çoklu tablo) | Boyutlar genellikle denormalize |
| **Sorgu Performansı** | Yüksek (az `JOIN`) | Daha Düşük (çok `JOIN`) | Değişken (sorguya bağlı) |
| **Veri Bütünlüğü** | Daha düşük (veri tekrarı olabilir) | Yüksek (veri tekrarı az) | Yüksek (paylaşılan boyutlar sayesinde) |
| **Kullanım Alanı** | Çoğu veri ambarı ve veri pazarı (data mart) | Karmaşık hiyerarşilere sahip veri modelleri | Birbiriyle ilişkili birden fazla iş sürecinin analizi |  

   - **Galaxy Şeması (Galaxy Schema):**  
     - Çok sayıda kar tanesi şemasının birleşiminden oluşur.  
     - Koleksiyon veya nitelik tablosu gibi düşünülebilir.  
     - Büyük ölçekli sistemlerde tercih edilir.  

---

### OLAP (On-Line Analytical Processing)
- Veritabanı sorgulama komutlarıyla çok boyutlu tabloların analizini yapmak zordur.  
- Özellikle 3+ boyutlu veri tablolarında sıkıntılar yaşanır.  

**Özellikleri:**  
- Karar destek sorgularını kolaylaştırır.  
- İşlem yerine sorgulama ve raporlama için optimize edilmiştir.  
- Veriler özetlenmiş ve çok boyutlu yapılarda (küpler) depolanır.  
- Hiyerarşik düzenleme destekler.  
- Karmaşık çözümlemelere izin verir.  

---

### OLAP Bileşenleri
- **Küp (Cube):**  
  - Zaman, coğrafya, ürün türü gibi boyutları satış veya stok gibi özet verilerle birleştirir.  
  - Matematikteki küp gibi eşit kenarlı olmak zorunda değildir.  

- **Ölçü (Measure):**  
  - Küpte bulunan ve bulgu tablosundaki bir sütunu temel alan değerlerdir.  
  - Genellikle sayısal değerlerdir (önceden işlenmiş, derlenmiş, çözümlenmiş merkezi değerler).  
