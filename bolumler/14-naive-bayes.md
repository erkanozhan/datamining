# 14. Olasılık Temelli Tahminler: Naive Bayes Sınıflandırıcısı

Bu bölümde, elimizdeki verilerden yola çıkarak yeni kayıtlar hakkında olasılığa dayalı tahminler yapmayı sağlayan **Naive Bayes sınıflandırıcısı** ele alınmaktadır. Adındaki "naive" (saf) sözcüğü yanıltıcı olmamalıdır; yöntem basit olmasına karşın oldukça güçlüdür. Bir dedektifin elindeki ipuçlarını birleştirerek bir sonuca varması gibi çalışır.

## 14.1. Naive Bayes: Ortaya Çıkışı ve Temelleri

Kısa tarihçe:
- Temel fikir Bayes teoremiyle başlar (Thomas Bayes, 18. yüzyıl). Laplace bu fikri genelleştirdi. Makine öğrenmesi bağlamında “Naive Bayes” adı, koşullu bağımsızlık (naive = saf) varsayımından gelir; basit ama pratik bir sınıflandırma yöntemi olarak e-postada spam tespiti, metin sınıflandırma vb. alanlarda yaygın kullanıldı.

 
- Yöntemin sezgisi şöyledir: Geçmiş örneklerden her sınıf için bir "profil" çıkarılır (ör. spam ve spam olmayan e-postalar). Yeni bir örnek geldiğinde, bu örneğin her özelliğinin ilgili sınıfta görülme olasılıkları çarpılır ve en yüksek sonucu veren sınıf seçilir. Yöntem, özelliklerin sınıf bilindiğinde birbirinden bağımsız olduğunu varsayar; bu varsayım gerçek hayatta her zaman doğru değildir, ancak pek çok pratik problemde yeterince iyi sonuç verir.

### 14.1.1. Matematiksel Temel

Temel Bayes bağıntısı:
```math
\displaystyle P(C \mid X) = \frac{P(X \mid C)\,P(C)}{P(X)}
```

```math
\underbrace{P(C \mid X)}_{\substack{\text{sonsal: X'i gördükten}\\\text{sonra C'nin olasılığı}}} = \frac{\overbrace{P(X \mid C)}^{\text{olabilirlik}}\;\overbrace{P(C)}^{\text{önsel}}}{\underbrace{P(X)}_{\substack{\text{kanıt: X'i görme olasılığı}\\\text{(tüm sınıflar için aynı)}}}}
```

**Ne anlatıyor?** Bayes teoremi, X gözlendikten sonra C sınıfının olasılığını (sonsal) hesaplar: C sınıfında X'i görme olasılığı (olabilirlik) sınıfın önsel olasılığıyla çarpılır ve X'i görme olasılığına (kanıt) bölünerek ölçeklenir. **Dikkat:** $P(C \mid X)$ ile $P(X \mid C)$ aynı şey değildir. "Spam bir e-postada 'kazandınız' kelimesinin geçme olasılığı" ile "'kazandınız' geçen bir e-postanın spam olma olasılığı" farklı sorulardır. Bayes teoremi, birinden diğerine geçmenin yoludur.

- P(C | X): Posterior — X gözlemi verildiğinde C sınıfında olma olasılığı (aranan değer).
- P(X | C): Likelihood — eğer sınıf C doğruysa X gözlemini elde etme olasılığı.
- P(C): Prior — sınıf C'nin önsel olasılığı (veri kümesindeki frekansla tahmin edilir).
- P(X): Evidence — X gözleminin toplam olasılığı (tüm sınıflara göre normalize eder; sınıfları karşılaştırırken sabittir, genelde ihmal edilir).

```math
\displaystyle P(X \mid C) \;=\; \prod_{i=1}^{n} P(x_i \mid C)
```

```math
\underbrace{P(X \mid C)}_{\substack{\text{C sınıfında tüm özelliklerin}\\\text{birlikte görülme olasılığı}}} = \underbrace{\prod_{i=1}^{n}}_{\substack{\text{i = 1'den n'ye kadar}\\\text{hepsini çarp}}} \overbrace{P(x_i \mid C)}^{\substack{\text{C sınıfında i. özelliğin}\\\text{görülme olasılığı}}}
```

**Ne anlatıyor?** Özellikler, sınıf bilindiğinde birbirinden bağımsız kabul edilir; bu nedenle tüm özelliklerin C sınıfında birlikte görülme olasılığı, her özelliğin C sınıfındaki olasılığı tek tek çarpılarak bulunur. Yönteme "naive" (saf) adını veren basitleştirme budur. Büyük $\Pi$ ("pi") burada 3.14 sayısı değildir; $\Sigma$'nın toplama yaptığı gibi çarpma yapar. Aşağıdaki bilgisayar satın alma örneğinde "evet" sınıfı için: $P(X \mid \text{evet}) = \frac{2}{9} \cdot \frac{4}{9} \cdot \frac{6}{9} \cdot \frac{6}{9} \approx 0.044$.

- x_i: X gözleminin i'inci bileşeni (özelliği). Yani X = (x_1, ..., x_n).
- Ürün (∏): Koşullu bağımsızlık varsayımı altında

    $\displaystyle P(X\mid C)=\prod_ {i=1}^{n}P(x_i\mid C)\thinspace .$

- Hesaplama notu: Sayısal stabilite için genellikle log alınır:

    $\displaystyle \text{score}_ c=\log P(C=c)+\sum_ {i=1}^{n}\log P(x_i\mid C=c)\thinspace .$

Sınıflandırma karar kuralı (özellikle P(X) ihmal edilince):
```math
\displaystyle \hat{C} = \arg\max_{c}\; P(C=c)\,\prod_{i=1}^{n} P(x_i \mid C=c)
```

```math
\underbrace{\hat{C}}_{\substack{\text{tahmin edilen}\\\text{sınıf}}} = \underbrace{\arg\max_{c}}_{\substack{\text{değeri en büyük}\\\text{yapan c'yi seç}}}\; \overbrace{P(C=c)}^{\text{önsel}}\,\overbrace{\prod_{i=1}^{n} P(x_i \mid C=c)}^{\text{olasılıkların çarpımı}}
```

**Ne anlatıyor?** Her sınıf için önsel olasılık ile özellik olasılıklarının çarpımından oluşan bir skor hesaplanır ve en büyük skoru veren sınıf tahmin olarak seçilir. $\arg\max$ skorun kendisini değil, **sınıfın adını** verir. Bayes formülündeki $P(X)$ paydası burada yoktur: Tüm sınıflar için aynı olduğundan sıralamayı değiştirmez. Bilgisayar örneğinde skorlar "evet" için ≈ 0.028, "hayır" için ≈ 0.0069'dur; dolayısıyla $\hat{C} = \text{evet}$.

- argmax_c: En yüksek skoru veren sınıfı seç.

Sayısal stabilite ve uygulamada yaygın form:

```math
\displaystyle \text{score}_c \;=\; \log P(C=c) \;+\; \sum_{i=1}^{n} \log P(x_i \mid C=c)
```

```math
\underbrace{\text{score}_c}_{\substack{\text{c sınıfının}\\\text{log-skoru}}} = \overbrace{\log P(C=c)}^{\text{önselin log'u}} + \underbrace{\sum_{i=1}^{n} \log P(x_i \mid C=c)}_{\substack{\text{çarpım yerine}\\\text{log'ların toplamı}}}
```

**Ne anlatıyor?** Bu skor, karar kuralındaki çarpımın logaritmasıdır: $\log(a \cdot b) = \log a + \log b$ olduğu için çok sayıda küçük olasılığın çarpımı, log'larının toplamına dönüşür ve sonuç sıfıra yuvarlanmaz. Logaritma artan bir fonksiyon olduğundan sınıfların sıralaması değişmez. Olasılıklar 1'den küçük olduğundan log'ları **negatiftir**; en büyük (sıfıra en yakın) skor kazanır. Bilgisayar örneğinde doğal log ile "evet" skoru ≈ −3.568, "hayır" skoru ≈ −4.982 çıkar; yine "evet" kazanır. $e^{-3.568} \approx 0.028$ olduğuna dikkat edilmelidir: Bu, çarpımla bulunan skorun aynısıdır.

 Birden fazla küçük olasılığı (ör. pek çok kelime için P( kelime | sınıf )) birbirleriyle çarptığınızda ortaya çıkan sayı bilgisayarın ondalık gösterim aralığının çok altına düşebilir — buna "alt akış" (underflow) denir. Bu durumda çarpım sıfıra yuvarlanır ve bilgiler kaybolur. Log almak bu sorunu çözer: çarpma işlemi toplamaya dönüşür (log(a·b)=log a + log b), böylece çok küçük çarpımlar yerine makul büyüklükte sayılarla toplama yaparsınız ve sayısal kararlılığı korursunuz. Ayrıca argmax ile sınıflandırma yapıyorsanız, hangi sınıfın skoru daha büyük olduğunu bulmak için log almamız sonucu değiştirmez; çarpımların log'larını toplamak yeterlidir.

Bilgisayarlarda kayan nokta (floating-point) aritmetiği sınırlı dinamik aralığa sahiptir; örneğin 10^(-300) civarındaki değerler güvenli olsa da 10^(-1000) gibi değerler sıfıra yuvarlanır. Naive Bayes'te çok sayıda bağımsız özellik için P(X|C)=∏i P(xi|C) hesaplanırken bu durum sık meydana gelir. Log-olasılık kullanmak şöyle avantajlar sağlar:
- Sayısal kararlılık: Üstel küçüklükler yerine log'ların toplamı tutulur, alt/üst akış riski çok azalır.
- Hesaplama verimliliği: Çarpma yerine toplama yapıldığı için log işlemi ile sayısal hata birikimi azalır; argmax için P(X) (normalizasyon) atılabilir.
- İfade kolaylığı: Skor = log P(C) + Σ_i log P(x_i | C) formu hem anlaşılır hem de doğrudan uygulanır. Sürekli özelliklerde Gaussian varsayımı varsa, log-normalizasyon terimleri log'a alınınca kareli terimler ortaya çıkar ve hesaplama daha stabildir.

Normalizasyon gerektiğinde (ör. gerçek posteriyorları elde etmek isterseniz), log-sum-exp tekniği kullanılır:
log Σ_j exp(s_j) = m + log Σ_j exp(s_j − m),
burada m = max_j s_j. Bu küçük bir öteleme ile exp(·) sırasında oluşabilecek taşma/alt akışı engeller.

- Hangi log tabanını kullandığınız argmax açısından önemli değildir; genellikle doğal log (ln) tercih edilir.
- Laplace (add‑1) smoothing ile hesaplanan frekanslar da log alındıktan sonra doğrudan toplanır.
- Çift hassasiyet (double) kullanmak yardımcıdır ama binlerce özelliğin çarpımı için log yine gereklidir.

Özetle: Log-olasılık hem sayısal açıdan güvenli hem de matematiksel olarak doğal bir yaklaşımdır; Naive Bayes ve benzeri modellerde standart uygulamadır.

### 14.1.2. Pratik Notlar ve Uygulama Ayrıntıları

- Olasılık tahmini: Kategorik özelliklerde frekans temelli (say/total). Hiç görülmeyen değerler için Laplace (add-1) smoothing kullanılır: P = (count + 1) / (N + K).
- Sürekli özellikler: Genellikle her sınıf için Gaussian (normal) dağılım varsayılır; P(x_i|C) ~ N(μ_{C,i}, σ_{C,i}^2).
- Bağımsızlık varsayımı gerçekçi değilse bile yöntem hâlâ güçlü olabilir; metin verilerinde özelliklerin (kelime varlığı) kısmi bağımsızlığı nedeniyle özellikle etkilidir.
- Dezavantajlar: Çok güçlü bağımlılıklar varsa performans düşer; özellik seçimi veya birleştirme gerekebilir.
- Performans ölçümü: Çapraz doğrulama, doğruluk, hassasiyet/duyarlılık, F1 gibi metriklerle değerlendirilir.

Sonuç olarak Naive Bayes, yorumlaması kolay, hızlı ve az veriyle çalışabilen bir yöntemdir. Dikkat edilmesi gereken ana nokta, bağımsızlık varsayımının güçlü bir varsayım olduğudur; uygulamada bunu akılda tutup gerekirse özellik mühendisliği ve smoothing yöntemleri kullanılır.

## 14.2. Örnek Uygulama: Bilgisayar Satın Alma Tahmini

Bir bilgisayar mağazasının elinde geçmiş müşterilerine ait bir tablo bulunmaktadır. Bu tabloda müşterilerin yaşı, geliri, öğrenci olup olmadığı ve kredibilitesi ile bilgisayar alıp almadıkları (`evet` ya da `hayır`) yer almaktadır.

### 14.2.1. Örnek 1: Bilgisayar Satın Alma Veri Seti

Veri dosyası: [`datasets/2-Bilgisayaralimi-naivebayes-nominal.csv`](https://github.com/erkanozhan/datamining/blob/main/datasets/2-Bilgisayaralimi-naivebayes-nominal.csv)

| yas | gelir | ogrencimi | kredibilite | bilgisayar_alimi |
| :--- | :--- | :--- | :--- | :--- |
| genc | yuksek | hayir | kotu | hayir |
| genc | yuksek | hayir | iyi | hayir |
| orta_yasli | yuksek | hayir | kotu | evet |
| yasli | orta | hayir | kotu | evet |
| yasli | dusuk | evet | kotu | evet |
| yasli | dusuk | evet | iyi | hayir |
| orta_yasli | dusuk | evet | iyi | evet |
| genc | orta | hayir | kotu | hayir |
| genc | dusuk | evet | kotu | evet |
| yasli | orta | evet | kotu | evet |
| genc | orta | evet | iyi | evet |
| orta_yasli | orta | hayir | iyi | evet |
| orta_yasli | yuksek | evet | kotu | evet |
| yasli | orta | hayir | iyi | hayir |

---

Bu tablo, bir mağazanın geçmiş müşteri kayıtlarını içermektedir. Her satır mağazaya gelmiş farklı bir kişiyi temsil eder; sütunlar ise o kişiye ait bilinen özellikleri ve kişinin bilgisayar alıp almadığını gösterir. `bilgisayar_alimi` sütunu "sonuç" ya da "hedef" sütunudur. Amaç, diğer sütunlardaki bilgilere bakarak bu sütunu tahmin etmektir. Aşağıdaki olasılık hesaplamalarının tamamı, bu tablodaki "evet" ve "hayır"ların, "genç" ve "yaşlı"ların sayılmasıyla yapılır. Bu tablo, algoritmanın deneyim kazandığı bir ders kitabı işlevi görür.


> [!IMPORTANT]
> **Soru:** Mağazaya özellikleri aşağıda verilen yeni bir müşteri gelmiştir. Bu müşteri bilgisayar satın alır mı, almaz mı? Müşterinin sınıfı (`bilgisayar_alimi`) bilinmemektedir; yukarıdaki 14 kayıttan öğrenilen olasılıklarla Naive Bayes yöntemiyle tahmin edilecektir.
>
> | Müşteri | yas | gelir | ogrencimi | kredibilite | bilgisayar_alimi |
> | :---: | :--- | :--- | :--- | :--- | :---: |
> | **15 (yeni müşteri)** | genc | orta | evet | kotu | **?** |

Naive Bayes bu soruyu olasılık hesabıyla yanıtlar. Yeni müşterinin dört özelliği (yaş = genç, gelir = orta, öğrenci = evet, kredibilite = kötü) için veriden elde edilen olasılıklar şunlardır:

- Önsel olasılıklar:
    - P(evet) = 9/14 ≈ 0.643
    - P(hayır) = 5/14 ≈ 0.357

- Koşullu olasılıklar:
    - Yaş = genç:
        - P(genç | evet) = 2/9 ≈ 0.222
        - P(genç | hayır) = 3/5 = 0.600
    - Gelir = orta:
        - P(orta | evet) = 4/9 ≈ 0.444
        - P(orta | hayır) = 2/5 = 0.400
    - Öğrenci = evet:
        - P(öğrenci | evet) = 6/9 = 0.667
        - P(öğrenci | hayır) = 1/5 = 0.200
    - Kredi = kötü:
        - P(kötü | evet) = 6/9 = 0.667
        - P(kötü | hayır) = 2/5 = 0.400

Bu olasılıklar Naive Bayes yaklaşımıyla birleştirilir. Her sınıf için puan (score) = P(sınıf) × Π P(özellik | sınıf).

- "evet" sınıfı:
    - Score = (9/14) × (2/9) × (4/9) × (6/9) × (6/9)
    - Yaklaşık = 0.643 × 0.222 × 0.444 × 0.667 × 0.667 ≈ 0.028

- "hayır" sınıfı:
    - Score = (5/14) × (3/5) × (2/5) × (1/5) × (2/5)
    - Yaklaşık = 0.357 × 0.600 × 0.400 × 0.200 × 0.400 ≈ 0.0069

**Karar Anı:**
"evet" sınıfının skoru (**0.028**), "hayır" sınıfının skorundan (**0.0069**) yaklaşık dört kat büyüktür. Bu nedenle Naive Bayes, eldeki tüm özellikleri birlikte değerlendirerek yeni müşterinin **bilgisayar alma olasılığının daha yüksek** olduğuna karar verir. İki skor, toplamlarına bölünerek olasılığa dönüştürülürse P(evet | X) = 0.0282 / (0.0282 + 0.0069) ≈ 0.80 bulunur.

> [!TIP]
> **Cevap:** Yeni müşteri **bilgisayar satın alır (bilgisayar_alimi = evet)**; modelin bu karara güveni yaklaşık %80'dir.

- Bu hesaplama, özelliklerin sınıf verildiğinde koşullu bağımsız olduğunu varsayar; gerçek hayatta tam doğru olmayabilir ama çoğu durumda işe yarar.
- Birden çok özellik olduğunda çarpımlar çok küçük değerlere düşebilir; uygulamada log-olasılık kullanılır:
    - score_c = log P(c) + Σ log P(x_i | c); büyük olan skoru seçmek yeterlidir.

---

Naive Bayes sınıflandırıcısı, temelini olasılık teorisindeki **Bayes Teoremi**'nden alır. Teorem bize, bir hipotezin olasılığını yeni kanıtlar ışığında nasıl güncelleyeceğimizi söyler. Formülümüz şöyledir:

$P(C\mid X)=\dfrac{P(X\mid C)\thinspace P(C)}{P(X)}$

Bu formüldeki terimleri bizim örneğimize uyarlayalım:
*   `C`: Sınıf (yani `bilgisayar_alimi=evet` veya `bilgisayar_alimi=hayır`).
*   `X`: Gözlemlenen veri, yani yeni müşterinin özellikleri `(genç, orta, evet, kötü)`.
*   `P(C|X)`: **Sonsal Olasılık (Posterior Probability):** Aradığımız şey budur. `X` verisi verildiğinde bu verinin `C` sınıfına ait olma olasılığı.
*   `P(C)`: **Önsel Olasılık (Prior Probability):** Herhangi bir veri görmeden önce `C` sınıfının genel olasılığı. (Yukarıda hesaplanan 9/14 ve 5/14 değerleri).
*   `P(X|C)`: **Olabilirlik (Likelihood):** `C` sınıfı doğruysa, `X` verisini gözlemleme olasılığımız.
*   `P(X)`: **Kanıt Olasılığı (Evidence):** `X` verisini gözlemlemenin genel olasılığı. Bu değer, tüm sınıflar için sabittir, bu yüzden sınıflandırma yaparken karşılaştırma amacıyla genellikle ihmal edilebilir. Bizim için önemli olan `P(X|C) * P(C)` çarpımını maksimize etmektir.
  
### 14.2.2. Örnek 2: Bilgisayar Riski Tahmini

Gerçek dünyada veri madenciliği algoritmaları on binlerce, hatta milyonlarca kayıtla beslenir. Veri kelimesinin İngilizcesi olan *data*, Latince *datum* (verilen şey, bilinen gerçek) kelimesinin çoğuludur. Sisteme ne kadar çok ve tutarlı "bilinen gerçek" verilirse modelin belirsizliği o oranda azalır.

Aşağıdaki tablo, 20 bilgisayar kullanıcısının mesleğini, işletim sistemini, antivirüs kullanıp kullanmadığını, yaş grubunu, tarayıcısını ve bilgisayarının güvenlik riskini içermektedir. Tabloda, şirket bilgisayarlarında genellikle antivirüs kullanıldığı ve güvenlik bilinci düşük kullanıcıların eski tip tarayıcılarla daha çok risk taşıdığı gibi durumlar yer almaktadır. Veri dosyası: [`datasets/Bilgisayar_Risk_NaiveBayes.csv`](https://github.com/erkanozhan/datamining/blob/main/datasets/Bilgisayar_Risk_NaiveBayes.csv)

| meslek | isl sistemi | Antivirüs Kullanıyor? | Yaş | Browser | Risk |
| :--- | :--- | :--- | :--- | :--- | :--- |
| ogrenci | win | Evet | Genc | IE | Yuksek |
| ev | win | Hayir | Orta | Chrome | Yuksek |
| sirket | mac | Evet | Yasli | Safari | Dusuk |
| ev | mac | Hayir | Orta | Safari | Dusuk |
| ogrenci | mac | Hayir | Genc | Firefox | Yuksek |
| ogrenci | Linux | Hayir | Genc | Firefox | Dusuk |
| sirket | win | Evet | Genc | Chrome | Dusuk |
| sirket | win | Hayir | Yasli | IE | Yuksek |
| ogrenci | win | Evet | Orta | IE | Dusuk |
| sirket | win | Evet | Orta | Chrome | Dusuk |
| ev | Linux | Hayir | Genc | Chrome | Dusuk |
| ogrenci | mac | Evet | Genc | Safari | Dusuk |
| ev | win | Hayir | Yasli | IE | Yuksek |
| sirket | mac | Evet | Orta | Safari | Dusuk |
| ogrenci | win | Hayir | Genc | Chrome | Yuksek |
| ev | win | Evet | Orta | Firefox | Dusuk |
| sirket | Linux | Evet | Yasli | Firefox | Dusuk |
| ogrenci | Linux | Evet | Orta | Chrome | Dusuk |
| ev | mac | Hayir | Yasli | Safari | Dusuk |
| ev | win | Hayir | Orta | IE | Yuksek |

> [!IMPORTANT]
> **Soru:** Aşağıdaki yeni kullanıcının ($X$) bilgisayarının güvenlik riski yüksek midir, düşük müdür? Bu kaydın sınıfı (Risk) bilinmemektedir; yukarıdaki 20 kayıttan öğrenilen olasılıklarla Naive Bayes yöntemiyle tahmin edilecektir.
>
> | Kayıt | meslek | isl sistemi | Antivirüs Kullanıyor? | Yaş | Browser | Risk |
> | :---: | :--- | :--- | :--- | :--- | :--- | :---: |
> | **21 (yeni kayıt, $X$)** | ogrenci | win | Hayir | Orta | IE | **?** |

Naive Bayes algoritmasının adımları bu veri seti için sırasıyla uygulanmaktadır.

#### 14.2.2.1. Önsel Olasılıkların (Prior Probabilities) Hesaplanması

Tabloda toplam 20 kayıt bulunmaktadır.
* Risk seviyesi "Yüksek" olan kayıt sayısı: 7
* Risk seviyesi "Düşük" olan kayıt sayısı: 13

Bu durumda önsel olasılıklar şöyledir:
$$P(\text{Yüksek}) = \frac{7}{20}$$

$$P(\text{Düşük}) = \frac{13}{20}$$

#### 14.2.2.2. Koşullu Olasılıkların (Likelihood) Hesaplanması

$X$ kaydındaki değerlerin yüksek ve düşük risk gruplarındaki dağılımları sayılır.

**Riskin "Yüksek" Olduğu Durumlar İçin (Toplam 7 kayıt):**
* Yüksek riskli kayıtlarda mesleği öğrenci olanların olasılığı: $P(\text{ogrenci} | \text{Yüksek}) = \frac{3}{7}$
* Yüksek riskli kayıtlarda Windows kullananların olasılığı: $P(\text{win} | \text{Yüksek}) = \frac{6}{7}$
* Yüksek riskli kayıtlarda Antivirüs kullanmayanların (Hayir) olasılığı: $P(\text{Hayir} | \text{Yüksek}) = \frac{6}{7}$
* Yüksek riskli kayıtlarda yaşı orta olanların olasılığı: $P(\text{Orta} | \text{Yüksek}) = \frac{2}{7}$
* Yüksek riskli kayıtlarda IE kullananların olasılığı: $P(\text{IE} | \text{Yüksek}) = \frac{4}{7}$

**Riskin "Düşük" Olduğu Durumlar İçin (Toplam 13 kayıt):**
* Düşük riskli kayıtlarda mesleği öğrenci olanların olasılığı: $P(\text{ogrenci} | \text{Düşük}) = \frac{4}{13}$
* Düşük riskli kayıtlarda Windows kullananların olasılığı: $P(\text{win} | \text{Düşük}) = \frac{4}{13}$
* Düşük riskli kayıtlarda Antivirüs kullanmayanların (Hayir) olasılığı: $P(\text{Hayir} | \text{Düşük}) = \frac{4}{13}$
* Düşük riskli kayıtlarda yaşı orta olanların olasılığı: $P(\text{Orta} | \text{Düşük}) = \frac{6}{13}$
* Düşük riskli kayıtlarda IE kullananların olasılığı: $P(\text{IE} | \text{Düşük}) = \frac{1}{13}$

#### 14.2.2.3. Sonsal Olasılıkların (Posterior Probabilities) Hesaplanması

Gözlenen özelliklerin bir araya gelmesiyle ortaya çıkan skorlar hesaplanır.

**Yüksek Sınıfı İçin Çarpım:**
$$P(X | \text{Yüksek}) \cdot P(\text{Yüksek}) = \left(\frac{3}{7}\right) \cdot \left(\frac{6}{7}\right) \cdot \left(\frac{6}{7}\right) \cdot \left(\frac{2}{7}\right) \cdot \left(\frac{4}{7}\right) \cdot \left(\frac{7}{20}\right)$$

$$P(X | \text{Yüksek}) \cdot P(\text{Yüksek}) = \frac{6048}{336140} \approx 0.01799$$

**Düşük Sınıfı İçin Çarpım:**
$$P(X | \text{Düşük}) \cdot P(\text{Düşük}) = \left(\frac{4}{13}\right) \cdot \left(\frac{4}{13}\right) \cdot \left(\frac{4}{13}\right) \cdot \left(\frac{6}{13}\right) \cdot \left(\frac{1}{13}\right) \cdot \left(\frac{13}{20}\right)$$

$$P(X | \text{Düşük}) \cdot P(\text{Düşük}) = \frac{4992}{7425860} \approx 0.00067$$

#### 14.2.2.4. Değerlendirme

Hesaplamalar sonucunda $0.01799 > 0.00067$ bulunmuştur; model $X$ kaydını **Yüksek** risk grubuna atar. Yüksek sınıfının skoru, Düşük sınıfının skorundan yaklaşık 27 kat büyüktür. Bu farkın temel nedeni, veride antivirüs kullanmamanın (Yüksek sınıfında 6/7, Düşük sınıfında 4/13), Windows kullanımının (6/7'ye karşı 4/13) ve IE tarayıcısının (4/7'ye karşı 1/13) yüksek riskle birlikte görülmesidir. İki skor toplamlarına bölünerek olasılığa dönüştürülürse $P(\text{Yüksek} \mid X) = 0.01799 / (0.01799 + 0.00067) \approx 0.964$ bulunur.

> [!TIP]
> **Cevap:** Yeni kullanıcının bilgisayarı **yüksek risk (Risk = Yuksek)** grubundadır; modelin bu karara güveni yaklaşık %96'dır.

### 14.2.3. "Naive" (Saf) Varsayım
Algoritmanın en kritik noktası, `X` vektöründeki özelliklerin (`x_1, x_2, ..., x_n`) sınıf verildiğinde **koşullu olarak bağımsız** olduğunu varsaymasıdır. Bu, `P(X|C)` terimini basitleştirmemizi sağlar:
$$P(X\mid C)=\prod_{i=1}^{n}P(x_i\mid C)$$

### 14.2.4. Laplace Düzeltmesi (Laplace Smoothing)

Naive Bayes'in en önemli savunma mekanizmalarından biri Laplace düzeltmesidir. Modelin, "bilgisayar alır" sınıfındaki müşteriler arasında geliri düşük olan hiç kimseyi görmediği varsayılsın. Tüm özellikleri "evet" sınıfına çok uygun olan, ancak geliri düşük olan yeni bir müşteri geldiğinde `P(gelir=düşük | evet)` terimi sıfır olur. Sıfır, çarpma işleminde diğer tüm çarpanları etkisiz bırakır: Diğer kanıtlar ne kadar güçlü olursa olsun bu tek sıfır, "evet" sınıfının skorunu sıfırlar. Bu durum, modelin sınırlı deneyiminden kaynaklanan bir aşırı özgüven sorunudur.

Bu sorunu çözmek için **Laplace düzeltmesi (Laplace smoothing)** kullanılır. Yöntem basittir: Her değer, sanki daha önce en az bir kez görülmüş gibi sayılır; yani her sayıma `+1` eklenir. Böylece hiçbir olasılık sıfır olmaz. Paya 1 eklendiği için paydanın da ayarlanması gerekir: Paydaya o özelliğin farklı değer sayısı eklenir. Bu sayede model, daha önce hiç karşılaşmadığı bir duruma "imkânsız" demek yerine "düşük olasılıklı" der.

Bu yaklaşım, sadece pratik bir hile değil, aynı zamanda sağlam bir teorik temele de dayanır. Teknik olarak, **sıfır frekans problemi** olarak bilinen bu durum, olasılıkları doğrudan gözlem frekanslarından tahmin ettiğimizde ortaya çıkar. Laplace düzeltmesi, her olası sonuca küçük bir önsel olasılık atayarak bu sorunu çözer. Formül `P = (sayım + 1) / (N + K)` biçiminde ifade edilir. Burada `N` o sınıftaki toplam gözlem sayısı, `K` ise o özellikteki toplam benzersiz değer sayısıdır (örneğin, 'gelir' için 'düşük', 'orta', 'yüksek' olmak üzere K=3). Bu yöntem, modelin eğitim verisinde görmediği olaylara karşı daha esnek ve dayanıklı olmasını sağlar, yani genelleme yeteneğini artırır.

```math
\underbrace{P}_{\substack{\text{düzeltilmiş}\\\text{olasılık}}} = \frac{\overbrace{\text{sayım}}^{\substack{\text{değerin sınıfta}\\\text{görülme sayısı}}} + \overbrace{1}^{\text{sanal gözlem}}}{\underbrace{N}_{\substack{\text{sınıftaki}\\\text{gözlem sayısı}}} + \underbrace{K}_{\substack{\text{özelliğin farklı}\\\text{değer sayısı}}}}
```

**Ne anlatıyor?** Bir değerin sınıftaki görülme sayısına 1 sanal gözlem eklenir; böylece veride hiç görülmemiş bir değerin olasılığı sıfır yerine küçük bir pozitif sayı olur. Paydaya K eklenmesinin nedeni şudur: Özelliğin K değerinin her birine 1 sanal gözlem eklendiği için toplam sayım K kadar artar; böylece olasılıkların toplamı yine 1 olur. Örnek: Bilgisayar satın alma verisinde "hayır" diyen 5 müşterinin hiçbiri orta yaşlı değildir: $P(\text{orta yaşlı} \mid \text{hayır}) = 0/5 = 0$. Yaşın 3 değeri olduğundan (K = 3) düzeltilmiş olasılık $(0 + 1)/(5 + 3) = 1/8 = 0.125$ olur.

**Laplace düzeltmesinin örneğin tamamına uygulanması:** Bilgisayar satın alma örneğindeki yeni müşteri (genç, gelir = orta, öğrenci = evet, kredibilite = kötü) için tüm koşullu olasılıklar düzeltilmiş biçimde yeniden hesaplanabilir. Yaş ve gelirin 3, öğrenci ve kredibilitenin 2 farklı değeri vardır; önsel olasılıklar (9/14 ve 5/14) değiştirilmemiştir.

| Olasılık | "evet" sınıfı (N = 9) | "hayır" sınıfı (N = 5) |
| :--- | :---: | :---: |
| P(yaş = genç \| sınıf) | (2+1)/(9+3) = 3/12 | (3+1)/(5+3) = 4/8 |
| P(gelir = orta \| sınıf) | (4+1)/(9+3) = 5/12 | (2+1)/(5+3) = 3/8 |
| P(öğrenci = evet \| sınıf) | (6+1)/(9+2) = 7/11 | (1+1)/(5+2) = 2/7 |
| P(kredibilite = kötü \| sınıf) | (6+1)/(9+2) = 7/11 | (2+1)/(5+2) = 3/7 |
| **Skor** (önsel × dört olasılığın çarpımı) | ≈ 0.0271 | ≈ 0.0082 |

Düzeltme yapılmadan skorlar 0.0282 ve 0.0069 idi. Düzeltme, sıfır olmayan olasılıkları bir miktar değiştirir, ancak karar aynı kalır: Yeni müşteri yine "evet" sınıfına atanır; P(evet | X) = 0.0271 / (0.0271 + 0.0082) ≈ 0.77 olur. Düzeltmenin asıl etkisi, hiç görülmemiş tek bir değerin skoru sıfırlamasını önlemektir. WEKA'nın `NaiveBayes` sınıflandırıcısı nominal öznitelikler için bu düzeltmeyi varsayılan olarak uygular (bkz. 14.3.5).


## 14.3. WEKA ile Bir Sınıflandırma Uygulaması: Bilgisayar Riski Veri Seti

Bu uygulamada, 14.2.2'deki 20 kayıtlık bilgisayar riski veri seti WEKA'da Naive Bayes ile modellenmekte ve sonuçlar yorumlanmaktadır. Aşağıdaki çıktılar WEKA 3.8.6 ile alınmıştır.

### 14.3.1. Veri Setini WEKA'ya Yükleme

*   **WEKA Explorer'ı Açma:** WEKA programını başlattıktan sonra "Explorer" arayüzünü seçin.
*   **Dosyayı Yükleme:** "Preprocess" sekmesinde "Open URL..." düğmesine tıklayın ve aşağıdaki adresi girin. Dosyayı bilgisayarınıza indirip "Open file..." ile de açabilirsiniz.
    `https://raw.githubusercontent.com/erkanozhan/datamining/main/datasets/Bilgisayar_Risk_NaiveBayes.csv`
*   **Kontrol:** "Current relation" bölümünde 20 kayıt (Instances: 20) ve 6 öznitelik görünür. WEKA son özniteliği (`Risk`) sınıf özniteliği olarak alır. Gerekirse sınıf özniteliği "Classify" sekmesindeki açılır listeden değiştirilebilir.

### 14.3.2. Veri Ön İşleme (Gerekliyse)

*   **Öznitelik Tipleri:** Bu veri setindeki tüm öznitelikler nominaldir. Kategorik olduğu hâlde sayısal algılanan bir öznitelik olsaydı "Filter" bölümündeki `unsupervised > attribute > NumericToNominal` filtresiyle dönüştürülebilirdi.
*   **Eksik Değerler:** Bu veri setinde eksik değer yoktur (her öznitelik için "Missing: 0"). Eksik değer bulunsaydı `unsupervised > attribute > ReplaceMissingValues` filtresi kullanılabilirdi; bu filtre sayısal özniteliklerde eksik değerleri ortalama, nominal özniteliklerde ise mod (en sık değer) ile doldurur. WEKA'nın `NaiveBayes` sınıflandırıcısı eksik değerleri olasılık hesabında yok sayar; bu nedenle Naive Bayes için bu adım zorunlu değildir.

### 14.3.3. Sınıflandırıcı Seçimi ve Yapılandırması: Naive Bayes

*   **"Classify" Sekmesine Geçiş:** WEKA Explorer'da "Classify" sekmesine tıklayın.
*   **Sınıflandırıcı Seçimi:** "Classifier" bölümünde "Choose" düğmesine tıklayın ve `weka.classifiers.bayes.NaiveBayes` sınıflandırıcısını seçin. (Metin verisi gibi frekans tabanlı bir veri olsaydı `NaiveBayesMultinomial` daha uygun olabilirdi; bkz. 17.2.)
*   **Sınıf Özniteliği:** Açılır listede `(Nom) Risk` özniteliğinin seçili olduğundan emin olun.

### 14.3.4. Model Eğitimi ve Değerlendirme

*   **Test Seçenekleri:** "Test options" bölümünde **10 katlı çapraz doğrulama (10-fold cross-validation)** seçilir: `Cross-validation` seçeneğini işaretleyin ve `Folds` değerini `10` olarak bırakın. Veri 10 kata bölünür; model 9 kat ile eğitilip kalan 1 kat ile test edilir ve bu işlem her kat bir kez test için kullanılacak şekilde 10 kez tekrarlanır. 20 kayıtlık bu veri setinde her kat 2 kayıt içerir.
*   **Tekrarlanabilirlik:** Katlara bölme rastgele yapılır. WEKA'nın varsayılan rastgelelik tohumu (random seed) 1'dir ve "More options..." penceresinden değiştirilebilir; tohum sabit kaldıkça aynı sonuçlar elde edilir.
*   **Eğitimi Başlatma:** "Start" düğmesine tıklayın.

### 14.3.5. Sonuçların Yorumlanması

"Classifier output" penceresinin ilk bölümü, tüm veriyle eğitilen modeli gösterir:

```
Naive Bayes Classifier

                         Class
Attribute               Yuksek  Dusuk
                        (0.36) (0.64)
======================================
meslek
  ogrenci                   4.0    5.0
  ev                        4.0    5.0
  sirket                    2.0    6.0
  [total]                  10.0   16.0

isl sistemi
  win                       7.0    5.0
  mac                       2.0    6.0
  Linux                     1.0    5.0
  [total]                  10.0   16.0

Antivirüs Kullanıyor?
  Evet                      2.0   10.0
  Hayir                     7.0    5.0
  [total]                   9.0   15.0

Yaş
  Genc                      4.0    5.0
  Orta                      3.0    7.0
  Yasli                     3.0    4.0
  [total]                  10.0   16.0

Browser
  IE                        5.0    2.0
  Chrome                    3.0    5.0
  Safari                    1.0    6.0
  Firefox                   2.0    4.0
  [total]                  11.0   17.0
```

Tablodaki sayılar, 14.2.4'te anlatılan Laplace düzeltmesinin WEKA tarafından uygulandığını gösterir. Örneğin Yüksek riskli 7 kaydın 6'sı Windows kullanır; tabloda bu değer 6 + 1 = **7.0**, toplam ise 7 + 3 = **10.0** olarak görünür. Dolayısıyla WEKA'nın kullandığı olasılık P(win | Yüksek) = 7/10'dur (elle hesaplanan 6/7 değil). Sınıf önsel olasılığı da aynı biçimde düzeltilmiştir: (7 + 1) / (20 + 2) ≈ 0.36.

Çıktının ikinci bölümü çapraz doğrulama sonuçlarını içerir:

```
=== Stratified cross-validation ===

Correctly Classified Instances          16               80      %
Incorrectly Classified Instances         4               20      %
Kappa statistic                          0.5604
...
Total Number of Instances               20

=== Detailed Accuracy By Class ===

                 TP Rate  FP Rate  Precision  Recall   F-Measure  MCC      ROC Area  PRC Area  Class
                 0.714    0.154    0.714      0.714    0.714      0.560    0.846     0.776     Yuksek
                 0.846    0.286    0.846      0.846    0.846      0.560    0.846     0.919     Dusuk
Weighted Avg.    0.800    0.240    0.800      0.800    0.800      0.560    0.846     0.869

=== Confusion Matrix ===

  a  b   <-- classified as
  5  2 |  a = Yuksek
  2 11 |  b = Dusuk
```

*   **Karmaşıklık Matrisi (Confusion Matrix):** WEKA çıktısında `a` ve `b` harfleri hücreleri değil **sınıfları** gösterir (`a = Yuksek`, `b = Dusuk`). Satırlar gerçek sınıfı, sütunlar tahmin edilen sınıfı verir. "Yuksek" pozitif sınıf kabul edilirse 13.11.1'deki terimlerle:
    *   **Gerçek Pozitif (GP) = 5:** Gerçekte yüksek riskli olan ve yüksek riskli tahmin edilen kayıtlar.
    *   **Sahte Negatif (SN) = 2:** Gerçekte yüksek riskli olduğu hâlde düşük riskli tahmin edilen kayıtlar (kaçırılan riskler).
    *   **Sahte Pozitif (SP) = 2:** Gerçekte düşük riskli olduğu hâlde yüksek riskli tahmin edilen kayıtlar (yanlış alarm).
    *   **Gerçek Negatif (GN) = 11:** Gerçekte düşük riskli olan ve düşük riskli tahmin edilen kayıtlar.

    Güvenlik riski gibi durumlarda sahte negatiflerin (riski kaçırmanın) maliyeti, sahte pozitiflerin (yanlış alarmın) maliyetinden genellikle daha yüksektir.
*   **Performans Ölçütleri** (Yuksek sınıfı için):
    *   **Doğruluk (Accuracy):** (GP + GN) / toplam = (5 + 11) / 20 = 0.80. Sınıf dağılımı dengesiz olduğunda yanıltıcı olabilir.
    *   **Hassasiyet (Precision):** GP / (GP + SP) = 5 / 7 ≈ 0.714. Modelin "yüksek risk" dediği kayıtların ne kadarının gerçekten yüksek riskli olduğunu gösterir.
    *   **Duyarlılık (Recall):** GP / (GP + SN) = 5 / 7 ≈ 0.714. Gerçekte yüksek riskli olan kayıtların ne kadarının yakalandığını gösterir. WEKA'daki "TP Rate" sütunu duyarlılıktır.
    *   **F1 Skoru (F-Measure):** Hassasiyet ile duyarlılığın harmonik ortalamasıdır; burada ikisi eşit olduğundan 0.714'tür.
    *   **ROC Alanı (ROC Area, AUC):** Modelin farklı eşik değerlerinde iki sınıfı ne kadar iyi ayırt ettiğini gösterir; 1'e yakın değerler daha iyi ayırt etme gücü anlamına gelir. Burada 0.846'dır.
*   **Eğitim hatası ile çapraz doğrulama farkı:** Aynı model, eğitimde kullanılan 20 kaydın kendisi üzerinde test edildiğinde 18 kaydı (%90) doğru sınıflandırmaktadır. Çapraz doğrulamada başarı %80'e düşer. Modeli eğitildiği veriyle test etmek başarıyı olduğundan yüksek gösterir; bu nedenle çapraz doğrulama tercih edilir.

### 14.3.6. İyileştirme ve İleri Adımlar

Elde edilen sonuçlar, modelin başlangıç performansını gösterir. Daha iyi bir performans hedefleniyorsa aşağıdaki adımlar düşünülebilir:

*   **Öznitelik Mühendisliği:** Mevcut özniteliklerden yeni, daha anlamlı öznitelikler türetmek veya gereksiz öznitelikleri elemek model performansını artırabilir.
*   **Farklı Sınıflandırıcılar:** Naive Bayes basit ve hızlı bir başlangıç noktasıdır. Karar ağaçları (J48), destek vektör makineleri (SVM) veya rastgele orman (Random Forest) gibi diğer algoritmaları denemek farklı sonuçlar verebilir.
*   **Daha Fazla Veri:** 20 kayıtlık bir veri setinde her kat yalnızca 2 kayıt içerir; sonuçlar bu nedenle büyük ölçüde rastlantıya bağlıdır. Daha fazla kayıt, daha güvenilir bir değerlendirme sağlar.
*   **Veri Dengesizliği:** Pozitif sınıf negatif sınıfa göre çok daha azsa (sınıf dengesizliği), örnekleme (oversampling veya undersampling) teknikleri ya da maliyete duyarlı öğrenme (cost-sensitive learning) yöntemleri uygulanabilir.

---

[← 13. Karar Ağaçları](13-karar-agaclari.md) · [İçindekiler](../Ders_Notu.md) · [15. Kümeleme Analizi →](15-kumeleme.md)
