# 17. Metin Madenciliği (Text Mining)

Günümüzde üretilen verinin büyük bölümü e-postalar, sosyal medya iletileri, haberler ve müşteri yorumları gibi yapılandırılmamış metinlerden oluşur. **Metin madenciliği (text mining)**, bu devasa metin yığınlarından anlamlı bilgi ve örüntüler çıkarmak için kullanılan teknikler bütünüdür. Temelde, bilgisayarlara metinleri "okumayı", işlemeyi ve içlerindeki gizli bilgiyi keşfetmeyi öğretmeyi amaçlar. Hedef, bir insanın okuyup anlayarak yapacağı analizi, binlerce hatta milyonlarca doküman üzerinde saniyeler içinde yapabilmektir.

Metin madenciliği, belirgin bir formatı olmayan, yazı biçimindeki veriler içerisinden gizli nitelikli bilginin çıkarılması ve düzensiz haldeki bilginin formatlanması sürecidir.
Bir başka tanıma göre metin madenciliği, metin koleksiyonlarından bilgiye erişmeyi, metinlerden bilgi çıkarmayı amaçlayan süreçleri birleştiren mimaridir.

Metin madenciliği, veri madenciliğinin bir alt dalı olarak görülebilir, ancak kendine özgü zorlukları ve yöntemleri vardır. Temel felsefesi, yapılandırılmamış metin verisini, analiz edebileceğimiz **yapılandırılmış bir formata** dönüştürmektir. Bu dönüşüm sağlandıktan sonra, daha önce öğrendiğimiz sınıflandırma, kümeleme gibi veri madenciliği tekniklerini bu yeni yapılandırılmış veri üzerinde uygulayabiliriz.

Bu süreç genellikle birkaç temel adımdan oluşur:

1.  **Bilgi Erişimi (Information Retrieval):** Analiz için ilgili dokümanları bulma ve toplama aşamasıdır. Google'da bir arama yapmak gibi düşünebilirsiniz.
2.  **Doğal Dil İşleme (Natural Language Processing - NLP):** Sürecin kalbidir. Burada metin, dilbilgisi kurallarına göre parçalarına ayrılır. Cümleler, kelimeler, kelime kökleri (stemming), isimler, fiiller gibi dilbilimsel unsurlar tespit edilir. Bu, bilgisayarın metnin yapısını anlamasını sağlar.
3.  **Bilgi Çıkarımı (Information Extraction):** Metnin içinden belirli ve somut bilgilerin (örneğin, kişi adları, şirket isimleri, tarihler, yerler) otomatik olarak çıkarılmasıdır.
4.  **Örüntü Keşfi (Pattern Discovery):** Yapılandırılmış hale getirilen bu veriler üzerinde istatistiksel ve makine öğrenmesi algoritmaları çalıştırılarak gizli ilişkiler, trendler ve gruplar ortaya çıkarılır.

**Metin Madenciliğinin Bazı Popüler Uygulamaları:**

*   **Duygu Analizi (Sentiment Analysis):** Müşteri yorumlarının veya sosyal medya gönderilerinin pozitif mi, negatif mi, yoksa nötr mü olduğunu otomatik olarak belirlemek.
*   **Konu Modelleme (Topic Modeling):** Binlerce haber makalesini analiz edip, "ekonomi", "spor", "teknoloji" gibi ana konuları otomatik olarak gruplamak.
*   **Metin Sınıflandırma:** Gelen e-postaları "spam" veya "önemli" olarak etiketlemek, destek taleplerini ilgili departmanlara yönlendirmek.
*   **Metin Özetleme:** Uzun bir dokümanı okuyup ana fikirlerini içeren kısa bir özetini otomatik olarak oluşturmak.


Metin Madenciliği (Text Mining), bu yapılandırılmamış metin yığınlarının içindeki değerli bilgiyi ve gizli örüntüleri keşfetme sürecidir. Bu, tek bir adımdan oluşan sihirli bir işlem değil, sistematik bir yaklaşımlar bütünüdür. Şimdi bu sürecin temel aşamalarını daha derinlemesine inceleyelim.

***

## 17.1. Metin Madenciliği (Text Mining)

Metin madenciliği, ham metin verisini bilgisayarların anlayabileceği ve üzerine analiz yapabileceği bir formata dönüştürerek, bu veriden anlamlı sonuçlar çıkarma disiplinidir. Bu süreç, genellikle dört ana aşamadan oluşan bir boru hattı (pipeline) olarak düşünülebilir.

### 17.1.1. Aşama 1: Metin Koleksiyonu Oluşturma (Corpus Building)

Her veri projesinde olduğu gibi, ilk adım üzerinde çalışacağımız veriyi toplamaktır. Metin madenciliğinde, bu toplanan dokümanlar bütününe **"corpus"** veya **"derlem"** denir. Bu aşamanın amacı, analiz hedefimize uygun, ilgili ve yeterli miktarda metin verisini bir araya getirmektir.

*   **Ne Yapılır?**
    *   **Kaynak Belirleme:** Analiz edeceğimiz metinler nereden gelecek? Müşteri yorumları için bir e-ticaret sitesi mi, kamuoyu nabzını ölçmek için Twitter mı, yoksa bilimsel trendleri anlamak için akademik makale veritabanları mı?
    *   **Veri Toplama:** Kaynak belirlendikten sonra, veriler teknik yöntemlerle toplanır. Bu, web sitelerinden veri kazımak (web scraping), sosyal medya platformlarının sağladığı API'ları (Uygulama Programlama Arayüzü) kullanmak veya kurumsal veritabanlarından (e-postalar, destek talepleri) veri çekmek olabilir.
*   **Neden Önemli?**
    Toplanan verinin kalitesi ve ilgililiği, projenin başarısını doğrudan etkiler. Yanlış veya ilgisiz bir metin koleksiyonu ile başlanırsa, sonraki tüm aşamalar anlamını yitirecektir.

### 17.1.2. Aşama 2: Metin Ön İşleme (Text Preprocessing)

Bu, metin madenciliğinin en kritik ve genellikle en çok zaman alan aşamasıdır. Ham metin, bilgisayarlar için anlamsız bir karakter dizisidir. Amacımız, bu "kirli" ve yapılandırılmamış metni, makine öğrenmesi algoritmalarının işleyebileceği temiz, standart ve **sayısal** bir formata dönüştürmektir.

*   **Temel Adımlar:**
    *   **Normalizasyon:** Metindeki tutarsızlıkları giderme işlemidir. Genellikle tüm harfleri küçük harfe çevirmek (`"Veri"`, `"VERİ"` → `"veri"`) gibi adımları içerir.
    *   **Tokenizasyon (Tokenization):** Metni anlamlı birimlere, yani "token"lara ayırmaktır. Bu genellikle kelimelere ayırma şeklinde olur. `("Bu bir cümledir.") → ["Bu", "bir", "cümledir", "."]`
    *   **Etkisiz Kelimelerin Çıkarılması (Stop Word Removal):** Metinde sıkça geçen ancak anlamsal olarak tek başına bir değer taşımayan kelimelerin (`"ve"`, `"ama"`, `"bir"`, `"için"`, `"şey"`) temizlenmesidir. Bu, analizde gürültüyü azaltır.
    *   **Kök Bulma (Stemming & Lemmatization):** Kelimeleri eklerinden arındırarak kök formuna indirgemektir. Bu, aynı anlama gelen farklı kelime formlarını tek bir çatı altında toplamayı sağlar.
        *   **Stemming:** Basit ve kurala dayalı bir kırpma işlemidir. Kelimenin sonundaki ekleri basitçe keser. Hızlıdır ama bazen anlamsız veya yanlış kökler üretebilir.
            *   **Örnekler (Türkçe):** `"kitaplar"`, `"kitapçı"`, `"kitaplık"` → `"kitap"`. `"gözlükçü"`, `"gözleri"` → `"göz"`. `"koşuyorlar"`, `"koşucu"` → `"koş"`.
            *   **Örnekler (İngilizce):** `"studies"`, `"studying"` → `"studi"` (anlamsız kök). `"connected"`, `"connecting"`, `"connection"` → `"connect"`. Kural tabanlı olduğu için `"ran"` gibi düzensiz biçimleri köke indiremez.
        *   **Lemmatization:** Kelimenin dilbilgisel yapısını ve bağlamını dikkate alarak sözlükteki anlamlı kökünü (lemma) bulur. Daha doğrudur ama daha yavaştır ve bir dil sözlüğü gerektirir.
            *   **Örnekler (Türkçe):** `"gidiyorum"`, `"gittiler"`, `"gidecek"` → `"gitmek"`. `"yaptım"`, `"yapar"` → `"yapmak"`.
            *   **Örnekler (İngilizce):** `"am"`, `"is"`, `"are"` → `"be"`. `"ran"`, `"running"` → `"run"`. `"better"` → `"good"`. `"mice"` → `"mouse"`.
*   **Sayısal Temsile Dönüştürme (Vectorization):**
    Temizlenen, köklerine ayrılmış metin, nihayetinde sayılara dönüştürülmelidir. Bu aşamada, her doküman bir sayı vektörü olarak temsil edilir. Bu, metni makine öğrenmesi algoritmalarının anlayabileceği bir "dil" olan matematiğe çevirmektir. En yaygın yöntemlerden biri, her dokümanın hangi kelimeleri ne kadar önemle içerdiğini gösteren bir **Belge-Terim Matrisi (Document-Term Matrix)** oluşturmaktır.

    **TF-IDF (Term Frequency-Inverse Document Frequency)** gibi teknikler, bir kelimenin bir doküman ve tüm koleksiyon (corpus) içindeki önemini tartan ağırlıklar hesaplayarak bu dönüşümü gerçekleştirir.

    **TF-IDF Değerlerinin Hesaplanması:**

    TF-IDF değeri, iki ana bileşenin çarpımıyla elde edilir: **Terim Frekansı (TF)** ve **Ters Doküman Frekansı (IDF)**.

    1.  **Terim Frekansı (Term Frequency - TF):** Bir kelimenin (terimin) belirli bir doküman içinde ne sıklıkla geçtiğini ölçer. Genellikle, kelimenin dokümandaki geçiş sayısının, o dokümandaki toplam kelime sayısına bölünmesiyle normalleştirilir.

        $\displaystyle TF(t, d) = \frac{\text{t teriminin d dokümanındaki geçiş sayısı}}{\text{d dokümanındaki toplam terim sayısı}}$

        $\displaystyle \underbrace{TF(t, d)}_ {\substack{\text{t teriminin}\cr \text{d'deki sıklığı}}} = \frac{\overbrace{\text{t'nin d'de geçiş sayısı}}^{\text{ham sayım}}}{\underbrace{\text{d'deki toplam terim sayısı}}_ {\substack{\text{uzun dokümanlar avantaj}\cr \text{kazanmasın diye}}}}$

        **Ne anlatıyor?** Terim frekansı, bir terimin dokümandaki geçiş sayısını dokümanın toplam terim sayısına bölerek terimin dokümandaki payını verir; böylece uzun dokümanlar yalnızca uzun oldukları için avantaj kazanmaz. Burada t bir terim (kelime), d bir dokümandır. Örnek: D1'in 4 kelimesinden 2'si "veri"dir: TF = 2/4 = 0.50.

    2.  **Ters Doküman Frekansı (Inverse Document Frequency - IDF):** Bir kelimenin tüm doküman koleksiyonu (corpus) içinde ne kadar nadir olduğunu ölçer. Nadir kelimeler daha yüksek IDF değerine sahip olur, çünkü bu kelimeler dokümanı daha iyi ayırt eder.

        $\displaystyle IDF(t) = \log_e \left( \frac{\text{Toplam doküman sayısı (N)}}{\text{t terimini içeren doküman sayısı}} \right)$

        $\displaystyle \underbrace{IDF(t)}_ {\substack{\text{t ne kadar}\cr \text{nadir?}}} = \log_e \left( \frac{\overbrace{N}^{\substack{\text{toplam}\cr \text{doküman sayısı}}}}{\underbrace{n_t}_ {\substack{\text{t terimini içeren}\cr \text{doküman sayısı}}}} \right)$

        **Ne anlatıyor?** IDF, toplam doküman sayısının terimi içeren doküman sayısına oranının logaritmasıdır; az sayıda dokümanda geçen terimler yüksek, hemen her dokümanda geçen terimler düşük değer alır. $\log_e$ doğal logaritmadır (ln). Her dokümanda geçen bir kelime için oran 1'dir ve $\ln 1 = 0$: Böyle bir kelime hiç ayırt edici değildir. Logaritma oranı yumuşatır: 1000 dokümanın yalnızca 1'inde geçen bir kelimenin oranı 1000'dir ama IDF'i $\ln 1000 \approx 6.91$'dir. Örnek: "veri" 3 dokümanın 2'sinde geçer: $\ln(3/2) \approx 0.41$.

    3.  **TF-IDF Değeri:**

        $\displaystyle TF\text{-}IDF(t, d) = TF(t, d) \times IDF(t)$

        $\displaystyle \underbrace{TF\text{-}IDF(t, d)}_ {\substack{\text{t'nin d için}\cr \text{önemi}}} = \overbrace{TF(t, d)}^{\text{d'de ne kadar sık?}} \times \underbrace{IDF(t)}_ {\substack{\text{koleksiyonda ne}\cr \text{kadar nadir?}}}$

        **Ne anlatıyor?** Bir terimin doküman içindeki sıklığı, koleksiyondaki nadirliğiyle çarpılır: Bir kelime bir dokümanda sık, koleksiyonun genelinde ise nadir geçiyorsa o doküman için önemlidir. Aşağıdaki örnekte TF-IDF("veri", D1) = 0.50 × 0.41 ≈ 0.205 bulunur.
            
        TF-IDF, bir kelimenin bir doküman için önemini gösteren nihai değerdir. IDF formülünde, bazı uygulamalarda sıfıra bölme hatasını önlemek için paydada `(t terimini içeren doküman sayısı + 1)` kullanılır veya logaritma tabanı 2 olabilir.

    **Örnek Üzerinden Adım Adım Hesaplama:**

    Üç basit dokümanımız olduğunu varsayalım (ön işleme adımlarından sonra):
    *   D1: "veri madencilik veri analiz" (Toplam kelime: 4)
    *   D2: "metin madencilik uygulama" (Toplam kelime: 3)
    *   D3: "veri analiz raporlama" (Toplam kelime: 3)

    Toplam Doküman Sayısı (N) = 3
    Sözlük (Benzersiz Kelimeler): "veri", "madencilik", "analiz", "metin", "uygulama", "raporlama"

    **Adım 1: Terim Frekansı (TF) Hesaplaması**

    *   **D1 için:**
        *   TF("veri", D1) = 2/4 = 0.50
        *   TF("madencilik", D1) = 1/4 = 0.25
        *   TF("analiz", D1) = 1/4 = 0.25
        *   Diğer kelimeler (metin, uygulama, raporlama) için TF = 0

    *   **D2 için:**
        *   TF("metin", D2) = 1/3 ≈ 0.33
        *   TF("madencilik", D2) = 1/3 ≈ 0.33
        *   TF("uygulama", D2) = 1/3 ≈ 0.33
        *   Diğer kelimeler (veri, analiz, raporlama) için TF = 0

    *   **D3 için:**
        *   TF("veri", D3) = 1/3 ≈ 0.33
        *   TF("analiz", D3) = 1/3 ≈ 0.33
        *   TF("raporlama", D3) = 1/3 ≈ 0.33
        *   Diğer kelimeler (madencilik, metin, uygulama) için TF = 0

    **Adım 2: Ters Doküman Frekansı (IDF) Hesaplaması**

    *   "veri": D1, D3'te geçiyor (2 doküman)

        $\displaystyle IDF(\text{"veri"}) = \log_e\left(\frac{3}{2}\right) = \log_e(1.5) \approx 0.41$

    *   "madencilik": D1, D2'de geçiyor (2 doküman)

        $\displaystyle IDF(\text{"madencilik"}) = \log_e\left(\frac{3}{2}\right) = \log_e(1.5) \approx 0.41$

    *   "analiz": D1, D3'te geçiyor (2 doküman)

        $\displaystyle IDF(\text{"analiz"}) = \log_e\left(\frac{3}{2}\right) = \log_e(1.5) \approx 0.41$

    *   "metin": D2'de geçiyor (1 doküman)

        $\displaystyle IDF(\text{"metin"}) = \log_e\left(\frac{3}{1}\right) = \log_e(3) \approx 1.10$

    *   "uygulama": D2'de geçiyor (1 doküman)

        $\displaystyle IDF(\text{"uygulama"}) = \log_e\left(\frac{3}{1}\right) = \log_e(3) \approx 1.10$

    *   "raporlama": D3'te geçiyor (1 doküman)

        $\displaystyle IDF(\text{"raporlama"}) = \log_e\left(\frac{3}{1}\right) = \log_e(3) \approx 1.10$

    **Adım 3: TF-IDF Değerlerinin Hesaplaması (TF x IDF)**

    *   **D1 için:**
        *   TF-IDF("veri", D1) = 0.50 * 0.41 = 0.205
        *   TF-IDF("madencilik", D1) = 0.25 * 0.41 = 0.1025
        *   TF-IDF("analiz", D1) = 0.25 * 0.41 = 0.1025
        *   TF-IDF("metin", D1) = 0 * 1.10 = 0
        *   TF-IDF("uygulama", D1) = 0 * 1.10 = 0
        *   TF-IDF("raporlama", D1) = 0 * 1.10 = 0

    *   **D2 için:**
        *   TF-IDF("veri", D2) = 0 * 0.41 = 0
        *   TF-IDF("madencilik", D2) = 0.33 * 0.41 = 0.1353
        *   TF-IDF("analiz", D2) = 0 * 0.41 = 0
        *   TF-IDF("metin", D2) = 0.33 * 1.10 = 0.363
        *   TF-IDF("uygulama", D2) = 0.33 * 1.10 = 0.363
        *   TF-IDF("raporlama", D2) = 0 * 1.10 = 0

    *   **D3 için:**
        *   TF-IDF("veri", D3) = 0.33 * 0.41 = 0.1353
        *   TF-IDF("madencilik", D3) = 0 * 0.41 = 0
        *   TF-IDF("analiz", D3) = 0.33 * 0.41 = 0.1353
        *   TF-IDF("metin", D3) = 0 * 1.10 = 0
        *   TF-IDF("uygulama", D3) = 0 * 1.10 = 0
        *   TF-IDF("raporlama", D3) = 0.33 * 1.10 = 0.363

    Bu hesaplamalar sonucunda elde edilen Belge-Terim Matrisi (yaklaşık değerlerle):

    | Doküman | veri | madencilik | analiz | metin | uygulama | raporlama |
    | :--- | :--: | :---: | :---: | :---: | :---: | :---: |
    | **D1** | 0.21 | 0.10 | 0.10 | 0.00 | 0.00 | 0.00 |
    | **D2** | 0.00 | 0.14 | 0.00 | 0.36 | 0.36 | 0.00 |
    | **D3** | 0.14 | 0.00 | 0.14 | 0.00 | 0.00 | 0.36 |

    *   **Not:** TF-IDF hesaplamalarında kullanılan normalizasyon yöntemleri (örneğin, L2 normalizasyonu) veya logaritma tabanı farklılık gösterebilir. Bu durum, farklı araçlar veya kütüphaneler arasında küçük sayısal farklılıklara yol açabilir, ancak temel mantık ve kelimelerin göreceli önemi aynı kalır.

    *   **Yorum:** Bu tablo, her bir dokümanı (satır) artık bir sayı vektörü olarak temsil etmektedir. Örneğin, D1 dokümanı `[0.21, 0.10, 0.10, 0.00, 0.00, 0.00]` vektörü ile ifade edilir. Değerler, o kelimenin o doküman için ne kadar "karakteristik" olduğunu gösterir. "Raporlama" kelimesi sadece D3'te geçtiği için yüksek bir ağırlığa (0.36) sahiptir. "Veri" kelimesi D1'de iki kez geçtiği için (yüksek terim frekansı), D1 için diğer kelimelere göre daha yüksek bir ağırlığa (0.21) sahiptir.

<a id="kosinus"></a>

### 17.1.3. Dokümanlar Arası Benzerlik: Kosinüs Benzerliği

Dokümanlar sayı vektörlerine dönüştürüldükten sonra iki doküman arasındaki benzerlik ölçülebilir. Metin madenciliğinde en yaygın ölçüt **kosinüs benzerliği (cosine similarity)**'dir. İki vektör arasındaki açının kosinüsünü hesaplar:

$$
\cos(A, B) = \frac{A \cdot B}{\lVert A \rVert \, \lVert B \rVert} = \frac{\sum_{i=1}^{p} a_i b_i}{\sqrt{\sum_{i=1}^{p} a_i^2} \; \sqrt{\sum_{i=1}^{p} b_i^2}}
$$

```math
\underbrace{\cos(A, B)}_{\substack{\text{A ile B arasındaki}\\\text{açının kosinüsü}}} = \frac{\overbrace{\sum_{i=1}^{p} a_i b_i}^{\substack{\text{iç çarpım: aynı sıradaki}\\\text{değerlerin çarpımlarının toplamı}}}}{\underbrace{\sqrt{\sum_{i=1}^{p} a_i^2}}_{\substack{\text{A vektörünün}\\\text{uzunluğu } \lVert A \rVert}} \; \underbrace{\sqrt{\sum_{i=1}^{p} b_i^2}}_{\substack{\text{B vektörünün}\\\text{uzunluğu } \lVert B \rVert}}}
```

**Ne anlatıyor?** Pay, iki vektörün aynı sıradaki değerlerinin çarpımlarının toplamıdır (iç çarpım); payda ise vektörlerin uzunluklarının çarpımıdır. Bu bölme iki vektör arasındaki açının kosinüsünü verir; dolayısıyla kosinüs benzerliği vektörlerin uzunluğuna değil **yönüne** bakar. TF-IDF değerleri negatif olmadığından sonuç 0 ile 1 arasındadır: 1, iki dokümanın kelimeleri aynı oranlarda içerdiğini; 0, hiçbir ortak kelime bulunmadığını gösterir. Bir doküman, kelime oranları korunarak iki kat uzatılırsa ham sayımlarla hesaplanan Öklid uzaklığı büyür, kosinüs benzerliği ise değişmez. Metin uzunluklarının çok farklı olabildiği metin madenciliğinde kosinüs benzerliğinin tercih edilmesinin nedeni budur (bkz. 15.2.8.5).

**Sayısal örnek:** 17.1.2'deki D1 ve D3 dokümanları karşılaştırılsın. Hesaplamada yuvarlanmamış TF-IDF değerleri kullanılmıştır ($\ln 1.5 \approx 0.4055$, $\ln 3 \approx 1.0986$):

- D1 = [0.2027, 0.1014, 0.1014, 0, 0, 0]
- D3 = [0.1352, 0, 0.1352, 0, 0, 0.3662]

- İç çarpım: 0.2027 × 0.1352 + 0.1014 × 0.1352 ≈ 0.0411 (yalnızca ortak kelimeler "veri" ve "analiz" katkı yapar)
- Uzunluklar: ‖D1‖ ≈ 0.2483, ‖D3‖ ≈ 0.4131
- cos(D1, D3) ≈ 0.0411 / (0.2483 × 0.4131) ≈ **0.401**

Aynı yolla cos(D1, D2) ≈ 0.103 (tek ortak kelime: "madencilik") ve cos(D2, D3) = 0 (ortak kelime yok) bulunur. En benzer çift, iki ortak kelimesi olan D1 ve D3'tür.
***

## 17.2. WEKA Laboratuvar Uygulaması: Reuters Haberlerini Sınıflandırma

Önceki bölümlerde satırları ve sütunları belli, düzenli tablolarla çalışılmıştır. Gerçek dünyada ise veri çoğu zaman bir haber metni, bir e-posta veya bir sosyal medya iletisi biçimindedir. Bu uygulamada harf dizilerinden oluşan metinler, bilgisayarın işleyebileceği sayısal bir temsile dönüştürülmekte ve sınıflandırılmaktadır.

Kullanılan veri, WEKA ile birlikte gelen "ReutersGrain" veri setidir. Amaç, bir haberin "tahıl" (grain) konusuyla ilgili olup olmadığını ayırt eden bir model kurmaktır. Aşağıdaki çıktılar WEKA 3.8.6 ile alınmıştır.

### 17.2.1. Hazırlık: Veri Setini Tanıma

WEKA'nın kurulu olduğu dizindeki `data` klasöründe iki dosya bulunur:

1. **ReutersGrain-train.arff:** Eğitim seti (1554 haber). Model bu dosyayla eğitilir.
2. **ReutersGrain-test.arff:** Test seti (604 haber). Modelin daha önce görmediği haberler üzerindeki başarısı bu dosyayla ölçülür.

Her kayıt iki öznitelikten oluşur: Haberin metnini içeren `Text` (string) özniteliği ve sınıf özniteliği `class-att`. Sınıf özniteliği iki değer alır: **1** = haber tahılla ilgilidir, **0** = haber tahılla ilgili değildir. Veri dengesizdir: Eğitim setindeki haberlerin 103'ü, test setindekilerin ise yalnızca 57'si tahılla ilgilidir.

### 17.2.2. Eğitim ve Test Setinin Uyumu: FilteredClassifier

Metin sınıflandırmada sık yapılan bir hata, eğitim ve test setlerini birbirinden bağımsız olarak kelimelere ayırmaktır. Her set kendi kelime sözlüğünü oluşturduğundan iki setin öznitelikleri farklı olur. Örneğin `StringToWordVector` filtresi iki dosyaya ayrı ayrı uygulandığında eğitim seti 1796, test seti 1485 öznitelik içerir ve WEKA modeli değerlendirirken iki setin uyumsuz olduğunu bildiren bir hata verir (komut satırında: "Train and test file not compatible! Different number of attributes: 1796 != 1485").

Sözlüğü eğitim ve test setlerinin birleşiminden oluşturmak ise başka bir hataya yol açar: Test setindeki bilgi eğitime sızar. Bu duruma **veri sızıntısı (data leakage)** denir ve modelin başarısını olduğundan yüksek gösterir.

WEKA'daki **FilteredClassifier** iki sorunu birlikte çözer: Filtreyi (kelime sözlüğünü ve ağırlıkları) yalnızca eğitim setinden öğrenir ve test seti geldiğinde aynı dönüşümü ona da uygular. Eğitimde görülmemiş kelimeler test setinde yok sayılır.

**Kurulum:**

1. WEKA **Explorer** ekranını açın.
2. "Open file..." ile **ReutersGrain-train.arff** dosyasını yükleyin.
3. **Classify** sekmesine geçin.
4. "Classifier" bölümündeki **Choose** düğmesine tıklayın ve listeden **meta > FilteredClassifier** seçeneğini bulun.
5. FilteredClassifier yazısının üzerine tıklayarak ayar penceresini açın.

### 17.2.3. Modeli İnşa Etmek: Kelimelerden Sayılara

Ayar penceresinde iki temel bölüm vardır: `classifier` (sınıflandırıcı) ve `filter` (filtre).

**A. Sınıflandırıcı seçimi:** Metin sınıflandırmada, kelimelerin geçme sıklığına dayalı olasılık hesabı yapan algoritmalar iyi sonuç verir. `classifier` kısmına tıklayın ve **bayes > NaiveBayesMultinomial** seçin. Bu algoritma, Naive Bayes'in (bkz. 14) kelime sayımları için uyarlanmış biçimidir.

**B. Filtre ayarları (vektörleştirme):** `filter` kısmına tıklayın ve **unsupervised > attribute > StringToWordVector** seçin. Ardından filtrenin ayarlarını açmak için StringToWordVector yazısına tıklayın.

**Sayıları ve noktalama işaretlerini ayıklamak (tokenizer):** Haber metinlerinde tarihler (1990), fiyatlar ($500) veya oranlar (%20) sık geçer. Ancak "1990" yılı, bir haberin tahılla ilgili olup olmadığını belirlemede genellikle yanıltıcıdır; çünkü bir petrol haberi de 1990'da yazılmış olabilir. Yalnızca kelimelere odaklanmak için `tokenizer` ayarı değiştirilir:

1. `tokenizer` satırındaki düğmeye tıklayın ve **AlphabeticTokenizer** seçin.
2. Bu parçalayıcı (tokenizer), yalnızca ardışık harflerden oluşan dizileri birim (token) olarak alır; sayılar, noktalama işaretleri ve özel karakterler atılır.

Bu ayar bir parçalama (tokenization) ayarıdır; kelimeleri köklerine indirmez. Kök bulma (stemming, bkz. 17.1.2) için `StringToWordVector` filtresinin ayrı `stemmer` parametresi kullanılır (örneğin `LovinsStemmer`).

### 17.2.4. Senaryo 1: Kelime Sayımı (Word Counts)

İlk deneyde şu mantık kurulur: "Bir kelime bir haberde ne kadar çok geçiyorsa o haber için o kadar önemlidir."

StringToWordVector ayarlarında:

* **outputWordCounts**: **True** (yalnızca var/yok değil, kelimenin kaç kez geçtiği sayılır).
* **IDFTransform**: **False** (ağırlıklandırma yapılmaz).
* **TFTransform**: **False**.
* **attributeIndices**: first-last (varsayılan değer kalabilir).

**Testi başlatma:**

1. Ayarlara "OK" diyerek çıkın.
2. Classify ekranında **Test options** bölümüne gelin.
3. **Supplied test set** seçeneğini işaretleyin ve "Set..." düğmesinden **ReutersGrain-test.arff** dosyasını gösterin.
4. **Start** düğmesine basın.

**Sonuçlar:**

```
Correctly Classified Instances         559               92.5497 %

   a   b   <-- classified as
 504  43 |   a = 0
   2  55 |   b = 1
```

Tahılla ilgili haberler (1) pozitif sınıf kabul edilirse: Gerçek Pozitif = 55, Sahte Negatif = 2, Sahte Pozitif = 43, Gerçek Negatif = 504. Model 57 tahıl haberinin 55'ini yakalamıştır (duyarlılık = 55/57 ≈ 0.965), ancak "tahıl" dediği 98 haberin yalnızca 55'i gerçekten tahılla ilgilidir (hassasiyet = 55/98 ≈ 0.561).

**Dikkat:** Test setindeki 604 haberin 547'si tahılla ilgili değildir. Her habere "tahıl değil" diyen bir model bile 547/604 ≈ %90.6 doğruluk elde ederdi. Dengesiz verilerde yalnızca doğruluğa bakmak yanıltıcıdır; karmaşıklık matrisi mutlaka incelenmelidir.

### 17.2.5. Senaryo 2: Kelime Ağırlıklandırma (TF-IDF)

"ve", "veya", "bir" gibi kelimeler her metinde çok kez geçer ama ayırt edici bilgi taşımaz. Buna karşılık "hasat" kelimesi az geçer ama çok şey anlatır. TF-IDF (bkz. 17.1.2), sık geçen sıradan kelimelerin ağırlığını azaltıp nadir ve ayırt edici kelimelerin ağırlığını artırır.

FilteredClassifier > filter > StringToWordVector ayarlarına dönün:

* **IDFTransform**: **True**.
* **TFTransform**: **True**.
* **outputWordCounts**: **True** kalmalıdır.
* Tokenizer yine **AlphabeticTokenizer** olarak kalsın.

**Sonuçlar:**

```
Correctly Classified Instances         564               93.3775 %

   a   b   <-- classified as
 509  38 |   a = 0
   2  55 |   b = 1
```

**Karşılaştırma:** TF-IDF ile doğruluk %92.55'ten %93.38'e çıkmıştır. Yakalanan tahıl haberi sayısı aynıdır (55/57), ancak sahte pozitiflerin sayısı 43'ten 38'e inmiş ve hassasiyet 55/93 ≈ 0.591'e yükselmiştir. NaiveBayesMultinomial aslında tam sayılarla (kelime sayımlarıyla) çalışmak üzere tasarlanmıştır; TF-IDF ise ondalıklı değerler üretir. WEKA bu değerleri işleyebilir ve bu veri setinde TF-IDF küçük bir iyileşme sağlamıştır; farklı veri setlerinde sonuç değişebilir.

### 17.2.6. Değerlendirme

Bu uygulamada bir metin yığınından sınıflandırma modeli kurulmuş, sayılar ayıklanarak (AlphabeticTokenizer) veri sadeleştirilmiş ve iki farklı temsil (kelime sayımı ve TF-IDF) karşılaştırılmıştır. Uygulamanın temel dersi şudur: Makine öğrenmesinde tek bir "sihirli düğme" yoktur. Veri ne kadar iyi temizlenir ve probleme uygun biçimde temsil edilirse model o kadar başarılı olur. Ayrıca dengesiz verilerde doğruluk tek başına yeterli bir ölçüt değildir.

Bu adımların kendi bilgisayarınızda tekrarlanması ve farklı sınıflandırıcılarla (örneğin J48, SMO) sonuçların karşılaştırılması önerilir.

---

[← 16. WEKA ile Birliktelik Kuralı Madenciliği](16-birliktelik-kurallari.md) · [İçindekiler](../Ders_Notu.md) · [18. R Yazılımında Uygulamalar →](18-r-uygulamalari.md)
