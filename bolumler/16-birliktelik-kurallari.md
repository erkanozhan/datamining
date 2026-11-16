# 16. WEKA ile Birliktelik Kuralı Madenciliği

Birliktelik kuralı madenciliği (association rule mining), hangi ögelerin birlikte sık görüldüğünü bulmayı amaçlar. Bu bölümde küçük bir veri seti üzerinde önce sayımlar elle yapılmakta, ardından aynı analiz WEKA ile tekrarlanmaktadır. Çıktılar WEKA 3.8.6 ile alınmıştır.

## 16.1. Veri Kümesi

Beş işlem (transaction) ve bu işlemlerde yer alan ögeler aşağıdadır. Her işlem bir öge **kümesi** olduğundan bir öge bir işlemde en fazla bir kez yer alır:

| İşlem ID | Ögeler |
|----------|---------|
| T1 | M, O, N, K, E, Y |
| T2 | D, O, N, K, E, Y |
| T3 | M, A, K, E |
| T4 | M, U, C, K, Y |
| T5 | C, O, K, I, E |

## 16.2. Veriyi Anlamak

Her satır bir alışveriş sepeti veya bir işlem olarak düşünülebilir. Örneğin T1 işleminde {M, O, N, K, E, Y} ögeleri birlikte bulunur. Amaç, hangi ögelerin sıklıkla birlikte göründüğünü bulmaktır.

Birkaç örnek:
- K ögesi: T1, T2, T3, T4 ve T5'te, yani **tüm işlemlerde** görünür (5/5).
- E ögesi: T1, T2, T3 ve T5'te görünür (4/5).
- M ögesi: T1, T3 ve T4'te görünür (3/5).

## 16.3. Destek, Güven ve Temel Tanımlar

Bir $A \rightarrow B$ kuralı "A'yı içeren işlemler B'yi de içerir" anlamına gelir. A'ya kuralın **öncülü** (antecedent), B'ye **sonucu** (consequent) denir. N toplam işlem sayısı olmak üzere:

$$
\text{Destek}(A \rightarrow B) = \frac{\text{A ve B'yi birlikte içeren işlem sayısı}}{N} \qquad \text{Güven}(A \rightarrow B) = \frac{\text{A ve B'yi birlikte içeren işlem sayısı}}{\text{A'yı içeren işlem sayısı}}
$$

```math
\begin{aligned}
\underbrace{\text{Destek}(A \rightarrow B)}_{\substack{\text{kuralın verinin ne kadarında}\\\text{geçerli olduğu}}} &= \frac{\overbrace{\text{A ve B'yi birlikte içeren işlem sayısı}}^{\text{kuralın doğrulandığı işlemler}}}{\underbrace{N}_{\text{toplam işlem sayısı}}} \\[1em]
\underbrace{\text{Güven}(A \rightarrow B)}_{\substack{\text{A görüldüğünde B'nin de}\\\text{görülme oranı: } P(B \mid A)}} &= \frac{\overbrace{\text{A ve B'yi birlikte içeren işlem sayısı}}^{\text{kuralın doğrulandığı işlemler}}}{\underbrace{\text{A'yı içeren işlem sayısı}}_{\text{öncülün görüldüğü işlemler}}}
\end{aligned}
```

**Ne anlatıyor?** Destek (support), kuralın verinin ne kadarında geçerli olduğunu; güven (confidence) ise öncül görüldüğünde sonucun da görülme oranını, yani $P(B \mid A)$ değerini ölçer. Destek eşiğini geçen öge kümelerine **sık öge kümesi** (frequent itemset) denir; WEKA bunlara "large itemset" adını verir.

**Örnek:** {K, E} öge kümesi T1, T2, T3 ve T5'te bulunur; desteği 4/5 = 0.8'dir. E → K kuralının güveni 4/4 = 1'dir (E içeren 4 işlemin hepsinde K vardır). K → E kuralının güveni ise 4/5 = 0.8'dir (K içeren 5 işlemin 4'ünde E vardır). Aynı iki öge için kuralın yönü güveni değiştirir.

## 16.4. WEKA İçin Veri Formatı

WEKA'da birliktelik kuralı analizi için veri ARFF (Attribute-Relation File Format) dosyası olarak hazırlanır.

### 16.4.1. ARFF Dosyası Oluşturma

Bir metin editörü açın ve aşağıdaki yapıyı oluşturun. Her öge (harf) tek değerli (yalnızca `1` değerini alabilen) bir nominal öznitelik olarak tanımlanır. İşlemde bulunmayan ögeler için WEKA'daki eksik değer gösterimi olan `?` (soru işareti) kullanılır.

```arff
@relation market_basket

@attribute M {1}
@attribute O {1}
@attribute N {1}
@attribute K {1}
@attribute E {1}
@attribute Y {1}
@attribute D {1}
@attribute A {1}
@attribute U {1}
@attribute C {1}
@attribute I {1}

@data
1,1,1,1,1,1,?,?,?,?,?
?,1,1,1,1,1,1,?,?,?,?
1,?,?,1,1,?,?,1,?,?,?
1,?,?,1,?,1,?,?,1,1,?
?,1,?,1,1,?,?,?,?,1,1
```

**Dikkat:** Öznitelik tanımında `?` değer listesine yazılmamalıdır. `{1, '?'}` biçiminde bir tanım, `?` karakterini ikinci bir nominal değer hâline getirir. Bu durumda WEKA'nın FPGrowth algoritması, "öge var" anlamına gelen değeri varsayılan olarak ikinci değer kabul ettiğinden (`positiveIndex = 2`) hiçbir öge bulamaz ve "No rules found!" iletisi verir.

**Veri satırlarının açıklaması:**
- İlk satır (T1): M, O, N, K, E, Y ögeleri var. D, A, U, C, I ögeleri yok.
- İkinci satır (T2): O, N, K, E, Y, D ögeleri var. M, A, U, C, I ögeleri yok.
- Üçüncü satır (T3): M, K, E, A ögeleri var. O, N, Y, D, U, C, I ögeleri yok.
- Dördüncü satır (T4): M, K, Y, U, C ögeleri var. O, N, E, D, A, I ögeleri yok.
- Beşinci satır (T5): O, K, E, C, I ögeleri var. M, N, Y, D, A, U ögeleri yok.

Bu dosyayı `market_data.arff` adıyla kaydedin.

## 16.5. WEKA'da Analiz Adımları

### 16.5.1. Veriyi Yüklemek

WEKA'yı açın ve Explorer'ı seçin:

1. "Preprocess" sekmesinde **Open file** düğmesine tıklayın.
2. `market_data.arff` dosyasını seçin.
3. Verideki öznitelikleri inceleyin.

Her özniteliğin istatistikleri görülebilir. Örneğin E özniteliği seçildiğinde 4 işlemde 1 değerini aldığı (Missing: 1) görülür.

### 16.5.2. Apriori Algoritmasını Çalıştırmak

Apriori, birliktelik kurallarını bulmak için kullanılan klasik bir algoritmadır.

1. **Associate** sekmesine geçin.
2. **Choose** düğmesine tıklayın ve `weka.associations.Apriori` algoritmasını seçin.
3. Algoritma adının yazılı olduğu kutuya tıklayarak parametreleri açın.

#### 16.5.2.1. Önemli Parametreler

WEKA'daki Apriori uygulamasında doğrudan "minSupport" adlı bir parametre **yoktur**. Algoritma, destek eşiğini yinelemeli olarak düşürür: `upperBoundMinSupport` değerinden başlar, her döngüde eşiği `delta` kadar azaltır ve `numRules` sayıda kural bulduğunda ya da eşik `lowerBoundMinSupport` değerine indiğinde durur.

| Parametre | Varsayılan | Anlamı |
| :--- | :---: | :--- |
| `upperBoundMinSupport` | 1.0 | Destek eşiğinin başlangıç değeri. Desteği bu değerin **üzerinde** kalan öge kümeleri de elenir; bu nedenle genellikle 1.0 bırakılır. |
| `delta` | 0.05 | Her döngüde destek eşiğinin ne kadar azaltılacağı. |
| `lowerBoundMinSupport` | 0.1 | Destek eşiğinin inebileceği en düşük değer. |
| `numRules` | 10 | Bulunması istenen kural sayısı. Bu sayıya ulaşılınca algoritma durur. |
| `metricType` | Confidence | Kuralların sıralanacağı ve eşikle karşılaştırılacağı ölçüt (Confidence, Lift, Leverage, Conviction). |
| `minMetric` | 0.9 | Seçilen ölçüt için en düşük değer (güven için 0.9 = %90). |
| `outputItemSets` | False | True yapılırsa sık öge kümeleri de listelenir. |
| `car` | False | True yapılırsa yalnızca sınıf özniteliğini sonuç olarak içeren kurallar (class association rules) üretilir. |
| `removeAllMissingCols` | False | Tüm değerleri eksik olan sütunları kaldırır. |

Deneme: `upperBoundMinSupport` = 0.6 yapıldığında desteği 0.8 olan {K, E} öge kümesi elenir ve E → K kuralı çıktıdan kaybolur. Bu nedenle destek eşiği `upperBoundMinSupport` ile değil, `lowerBoundMinSupport` ve `numRules` ile ayarlanmalıdır.

Başlangıç için şu değerleri deneyin (diğerleri varsayılan kalsın):
- `lowerBoundMinSupport`: 0.4 (5 işlemin 2'si)
- `minMetric` (güven): 0.7
- `numRules`: 10

### 16.5.3. Sonuçları Yorumlamak

**Start** düğmesine basıldığında aşağıdaki çıktı elde edilir:

```
Apriori
=======

Minimum support: 0.7 (3 instances)
Minimum metric <confidence>: 0.7
Number of cycles performed: 6

Generated sets of large itemsets:

Size of set of large itemsets L(1): 5

Size of set of large itemsets L(2): 5

Size of set of large itemsets L(3): 1

Best rules found:

 1. E=1 4 ==> K=1 4    <conf:(1)> lift:(1) lev:(0) [0] conv:(0)
 2. M=1 3 ==> K=1 3    <conf:(1)> lift:(1) lev:(0) [0] conv:(0)
 3. O=1 3 ==> K=1 3    <conf:(1)> lift:(1) lev:(0) [0] conv:(0)
 4. O=1 3 ==> E=1 3    <conf:(1)> lift:(1.25) lev:(0.12) [0] conv:(0.6)
 5. Y=1 3 ==> K=1 3    <conf:(1)> lift:(1) lev:(0) [0] conv:(0)
 6. O=1 E=1 3 ==> K=1 3    <conf:(1)> lift:(1) lev:(0) [0] conv:(0)
 7. O=1 K=1 3 ==> E=1 3    <conf:(1)> lift:(1.25) lev:(0.12) [0] conv:(0.6)
 8. O=1 3 ==> K=1 E=1 3    <conf:(1)> lift:(1.25) lev:(0.12) [0] conv:(0.6)
 9. K=1 5 ==> E=1 4    <conf:(0.8)> lift:(1) lev:(0) [0] conv:(0.5)
10. E=1 4 ==> O=1 3    <conf:(0.75)> lift:(1.25) lev:(0.12) [0] conv:(0.8)
```

**Çıktının okunması:**
- **Minimum support: 0.7 (3 instances):** Alt sınır 0.4 olarak verilmesine karşın algoritma, eşik 0.7'ye indiğinde (5 × 0.7 = 3.5; WEKA bu eşiği parantez içinde görüldüğü gibi 3 işlem olarak uygular) 10 kurala ulaştığı için durmuştur. `numRules` artırılırsa eşik daha da düşer (bkz. 16.6).
- **L(1), L(2), L(3):** Sırasıyla 1, 2 ve 3 ögeli sık öge kümelerinin sayısıdır.
- **`O=1 3 ==> E=1 3`:** Öncülün (O) 3 işlemde geçtiğini, öncül ile sonucun (O ve E) birlikte de 3 işlemde geçtiğini gösterir. Güven = 3/3 = 1.
- **`K=1 5 ==> E=1 4  <conf:(0.8)>`:** K 5 işlemde, K ve E birlikte 4 işlemde geçer; güven 4/5 = 0.8'dir.
- **`E=1 4 ==> O=1 3  <conf:(0.75)>`:** E 4 işlemde, E ve O birlikte 3 işlemde geçer; güven 3/4 = 0.75'tir.
- **`lift`, `lev`, `conv`:** Kuralın ilginçliğini ölçen ek ölçütlerdir. Lift 16.7'de açıklanmaktadır.

**Önemli gözlem:** K tüm işlemlerde bulunduğundan, sonucu K olan kuralların (1, 2, 3, 5 ve 6 numaralı kurallar) güveni 1 olsa da lift değeri 1'dir. Bu kurallar yeni bir bilgi taşımaz: K zaten her sepette vardır. Yalnızca güvene bakmak bu nedenle yanıltıcı olabilir.

## 16.6. Farklı Parametre Değerleri Denemek

Destek eşiği düşürülürse daha fazla kural bulunur, ancak bu kurallar daha az işlemde geçerlidir. Eşik yükseltilirse yalnızca çok sık görülen öge birleşimleri kalır.

### 16.6.1. Düşük Destek Örneği

`lowerBoundMinSupport` = 0.3, `minMetric` = 0.6 ve `numRules` = 200 ile çalıştırıldığında algoritma eşiği 0.3'e kadar düşürür ("Minimum support: 0.3 (2 instances)"). Bu durumda 7 tek ögeli, 14 iki ögeli, 12 üç ögeli, 5 dört ögeli ve 1 beş ögeli sık öge kümesi bulunur. Listede şu kural da yer alır:

```
105. M=1 3 ==> E=1 2    <conf:(0.67)> lift:(0.83) lev:(-0.08) [0] conv:(0.3)
```

M, 3 işlemde görünür (T1, T3, T4). Bu 3 işlemin 2'sinde E de vardır (T1, T3). Güven: 2/3 ≈ 0.67. Kuralın lift değerinin 1'in altında olduğuna dikkat edilmelidir (bkz. 16.7).

### 16.6.2. Yüksek Destek Örneği

Destek eşiği 0.6 (5 işlemin 3'ü) olarak belirlenirse bir öge kümesinin en az 3 işlemde görünmesi gerekir. Önce sayımlar elle yapılır.

**Tek ögeler:**
- K: 5 işlemde (T1, T2, T3, T4, T5) ✓
- E: 4 işlemde (T1, T2, T3, T5) ✓
- M: 3 işlemde (T1, T3, T4) ✓
- O: 3 işlemde (T1, T2, T5) ✓
- Y: 3 işlemde (T1, T2, T4) ✓
- N: 2 işlemde (T1, T2) ✗
- C: 2 işlemde (T4, T5) ✗
- D, A, U, I: 1'er işlemde ✗

Sık tek ögeler: K, E, M, O, Y (L(1) = 5).

**İki ögeli kümeler** (Apriori ilkesi gereği yalnızca sık tek ögelerden oluşturulur):

- K ve E: T1, T2, T3, T5 = 4 işlem ✓
- K ve M: T1, T3, T4 = 3 işlem ✓
- K ve O: T1, T2, T5 = 3 işlem ✓
- K ve Y: T1, T2, T4 = 3 işlem ✓
- E ve O: T1, T2, T5 = 3 işlem ✓
- E ve Y: T1, T2 = 2 işlem ✗
- E ve M: T1, T3 = 2 işlem ✗
- O ve Y: T1, T2 = 2 işlem ✗
- M ve Y: T1, T4 = 2 işlem ✗
- M ve O: T1 = 1 işlem ✗

Sık iki ögeli kümeler: {K, E}, {K, M}, {K, O}, {K, Y}, {E, O} (L(2) = 5).

**Üç ögeli kümeler:**

- K, E ve O: T1, T2, T5 = 3 işlem ✓
- Diğer adayların (örneğin {K, E, Y}, {K, M, Y}) her biri en fazla 2 işlemde geçer ✗

Sık üç ögeli küme: {K, E, O} (L(3) = 1).

**WEKA ile doğrulama:** `lowerBoundMinSupport` = 0.6, `minMetric` = 0.7 ve `numRules` = 50 ile çalıştırıldığında (eşiğin 0.6'ya kadar inebilmesi için `numRules` büyük seçilmiştir) çıktı şöyledir:

```
Apriori
=======

Minimum support: 0.6 (3 instances)
Minimum metric <confidence>: 0.7
Number of cycles performed: 8

Generated sets of large itemsets:

Size of set of large itemsets L(1): 5

Size of set of large itemsets L(2): 5

Size of set of large itemsets L(3): 1

Best rules found:

 1. E=1 4 ==> K=1 4    <conf:(1)> lift:(1) lev:(0) [0] conv:(0)
 2. M=1 3 ==> K=1 3    <conf:(1)> lift:(1) lev:(0) [0] conv:(0)
 3. O=1 3 ==> K=1 3    <conf:(1)> lift:(1) lev:(0) [0] conv:(0)
 4. O=1 3 ==> E=1 3    <conf:(1)> lift:(1.25) lev:(0.12) [0] conv:(0.6)
 5. Y=1 3 ==> K=1 3    <conf:(1)> lift:(1) lev:(0) [0] conv:(0)
 6. O=1 E=1 3 ==> K=1 3    <conf:(1)> lift:(1) lev:(0) [0] conv:(0)
 7. O=1 K=1 3 ==> E=1 3    <conf:(1)> lift:(1.25) lev:(0.12) [0] conv:(0.6)
 8. O=1 3 ==> K=1 E=1 3    <conf:(1)> lift:(1.25) lev:(0.12) [0] conv:(0.6)
 9. K=1 5 ==> E=1 4    <conf:(0.8)> lift:(1) lev:(0) [0] conv:(0.5)
10. E=1 4 ==> O=1 3    <conf:(0.75)> lift:(1.25) lev:(0.12) [0] conv:(0.8)
11. K=1 E=1 4 ==> O=1 3    <conf:(0.75)> lift:(1.25) lev:(0.12) [0] conv:(0.8)
12. E=1 4 ==> O=1 K=1 3    <conf:(0.75)> lift:(1.25) lev:(0.12) [0] conv:(0.8)
```

Elle bulunan L(1) = 5, L(2) = 5 ve L(3) = 1 değerleri WEKA çıktısıyla aynıdır.

**Kuralların yorumu:**

- **Kural 1:** E, 4 işlemde vardır ve E olan tüm işlemlerde K de vardır. Güven: 4/4 = 1.
- **Kural 4:** O, 3 işlemde vardır ve O olan tüm işlemlerde E de vardır. Güven: 3/3 = 1.
- **Kural 6:** O ve E birlikte 3 işlemde vardır; bu işlemlerin hepsinde K de vardır. Güven: 1.
- **Kural 9:** K, 5 işlemde vardır; bunların 4'ünde E de vardır. Güven: 4/5 = 0.8.
- **Kural 11:** K ve E birlikte 4 işlemde vardır; bunların 3'ünde O da vardır. Güven: 3/4 = 0.75.

**Önemli gözlem:** O görüldüğünde hem K hem E de görülür; O ile E arasındaki ilişki (lift = 1.25) dikkat çekicidir. K ise her işlemde bulunduğu için K'yı içeren kurallar yüksek güvenli olsa da yeni bir bilgi taşımaz (lift = 1).

## 16.7. Lift Değeri: Kuralların Gerçek Anlamını Keşfetmek

Birliktelik kurallarını incelerken yalnızca destek ve güven değerlerine bakmak yanıltıcı olabilir. Bir kuralın gerçekten ilginç olup olmadığını anlamak için **lift** değerine bakılır.

Bir markette "ekmek alanların %80'i süt de alır" biçiminde bir kural bulunduğu varsayılsın. Bu kural güçlü görünür. Ancak markete gelen herkesin zaten %90'ı süt alıyorsa, ekmek almanın süt alma olasılığını artırdığı söylenemez; tersine, ekmek alanlar ortalamadan daha az süt almaktadır. Lift değeri, bir kuralın rastlantısal bir durumdan mı ibaret olduğunu yoksa gerçekten anlamlı bir ilişkiyi mi gösterdiğini ortaya koyar.

### 16.7.1. Lift Değeri Ne Anlatır?

Lift, kuralın öncülünün (antecedent) sonucu (consequent) tahmin etme gücünün, sonucun tek başına görülme olasılığına göre ne kadar arttığını gösterir:

*   **Lift > 1:** Öncül, sonucun görülme olasılığını **artırır**. Kural rastlantının ötesinde bir ilişkiyi yansıtır. Değer ne kadar büyükse ilişki o kadar güçlüdür.
*   **Lift = 1:** Öncül ile sonuç **bağımsızdır**. Öncülün varlığı, sonucun görülme olasılığını ne artırır ne de azaltır.
*   **Lift < 1:** Öncül, sonucun görülme olasılığını **azaltır**. Ögeler arasında negatif bir ilişki vardır; öncülün varlığı sonucun daha az görüleceğine işaret eder. Bu durum, iki ögenin hiç birlikte görülmediği anlamına gelmez.

### 16.7.2. Lift Değeri Nasıl Hesaplanır?

Lift değeri, kuralın güveninin, sonucun desteğine bölünmesiyle hesaplanır. Bir $A \rightarrow B$ kuralı için:

$$
\text{Lift}(A \rightarrow B) = \frac{\text{Confidence}(A \rightarrow B)}{\text{Support}(B)} = \frac{P(B|A)}{P(B)}
$$

```math
\text{Lift}(A \rightarrow B) = \frac{\overbrace{\text{Confidence}(A \rightarrow B)}^{\substack{\text{A alanlarda}\\\text{B oranı}}}}{\underbrace{\text{Support}(B)}_{\substack{\text{tüm işlemlerde}\\\text{B oranı}}}} = \frac{\overbrace{P(B \mid A)}^{\substack{\text{A verildiğinde}\\\text{B'nin olasılığı}}}}{\underbrace{P(B)}_{\substack{\text{B'nin genel}\\\text{olasılığı}}}}
```

**Ne anlatıyor?** Lift, A'yı alan müşterilerin B'yi genel müşteri kitlesine göre **kaç kat** daha sık aldığını gösterir: A alanlar arasındaki B oranı, tüm işlemlerdeki B oranına bölünür. $P(B \mid A)$ ile $P(A \mid B)$ genellikle farklıdır: Burada koşul ("verilen") A'dır.

Burada:
*   `Confidence(A → B)`: A ögesi görüldüğünde B ögesinin de görülme olasılığıdır, yani $P(B|A)$.
*   `Support(B)`: B ögesinin tüm veri setinde görülme olasılığıdır, yani $P(B)$.

**Örnek 1 (lift > 1):** 16.6.2'deki 11 numaralı kural, `K=1 E=1 ==> O=1`:
*   `Confidence(K, E → O)` = 3/4 = 0.75 (K ve E'nin birlikte bulunduğu 4 işlemin 3'ünde O vardır).
*   `Support(O)` = 3/5 = 0.6 (O, işlemlerin %60'ında görülür).

$$
\text{Lift}(K, E \rightarrow O) = \frac{0.75}{0.6} = 1.25
$$

K ve E birlikte görüldüğünde O'nun görülme olasılığı, O'nun genel görülme olasılığından %25 daha yüksektir. WEKA çıktısındaki `lift:(1.25)` değeri de bunu doğrular.

**Örnek 2 (lift < 1):** `K, E → Y` kuralı:
*   `Confidence(K, E → Y)` = 2/4 = 0.5 (K ve E'nin birlikte bulunduğu T1, T2, T3 ve T5 işlemlerinden yalnızca T1 ve T2'de Y vardır).
*   `Support(Y)` = 3/5 = 0.6.

$$
\text{Lift}(K, E \rightarrow Y) = \frac{0.5}{0.6} \approx 0.83
$$

K ve E'yi birlikte alanlar, Y'yi genel kitleden **daha az** almaktadır. Güveni %50 olan bu kural ilk bakışta işe yarar görünse de lift değeri iki ögenin arasında negatif bir ilişki olduğunu gösterir. 16.6.1'deki `M → E` kuralı da (güven 0.67, lift 0.83) aynı durumdadır.

**WEKA'da lift ile sıralama:** `metricType` parametresi `Lift` yapılırsa kurallar lift değerine göre sıralanır ve `minMetric` eşiği lift için uygulanır. Örneğin `metricType` = Lift, `minMetric` = 1.1, `lowerBoundMinSupport` = 0.4 ile çıktının başı şöyledir:

```
Minimum support: 0.5 (2 instances)
Minimum metric <lift>: 1.1
Number of cycles performed: 10
...
Best rules found:

 1. N=1 2 ==> O=1 Y=1 2    conf:(1) < lift:(2.5)> lev:(0.24) [1] conv:(1.2)
 2. O=1 Y=1 2 ==> N=1 2    conf:(1) < lift:(2.5)> lev:(0.24) [1] conv:(1.2)
 ...
```

N ögesi yalnızca T1 ve T2'de, {O, Y} çifti de yalnızca T1 ve T2'de birlikte görülür. Güven 2/2 = 1, {O, Y}'nin desteği 2/5 = 0.4 olduğundan lift = 1 / 0.4 = 2.5'tir. Yüksek lift değerli kuralların düşük destekli olabileceği unutulmamalıdır: Bu kural yalnızca iki işleme dayanır.

## 16.8. Algoritma Parametrelerinin Tam Listesi

Apriori seçiliyken algoritma adına tıklandığında açılan pencerede parametrelerin varsayılan değerleri şöyledir:

```
car: False
classIndex: -1
delta: 0.05
doNotCheckCapabilities: False
lowerBoundMinSupport: 0.1
metricType: Confidence
minMetric: 0.9
numRules: 10
outputItemSets: False
removeAllMissingCols: False
significanceLevel: -1.0
treatZeroAsMissing: False
upperBoundMinSupport: 1.0
verbose: False
```

**car (Class Association Rules):** Yalnızca sınıf özniteliğini sonuç olarak içeren kurallar üretir. Bu örnekte False olmalıdır.

**delta:** Her döngüde destek eşiğinin ne kadar azaltılacağı. Varsayılan değer olan 0.05 genellikle yeterlidir.

**lowerBoundMinSupport / upperBoundMinSupport:** Destek eşiğinin alt ve üst sınırları (bkz. 16.5.2.1).

**numRules:** İstenen kural sayısı.

**outputItemSets:** True yapılırsa yalnızca kurallar değil, sık öge kümeleri de listelenir.

**treatZeroAsMissing:** True yapılırsa nominal özniteliklerin ilk değeri eksik değer gibi işlenir. Ögelerin 0/1 ile kodlandığı veri setlerinde "0" değerlerinin kural üretmemesi için kullanılır.

## 16.9. Sonuçları Kaydetmek

WEKA'da sonuçlar metin dosyası olarak kaydedilebilir:

1. **Result list** panelinde sonucun üzerine sağ tıklayın.
2. **Save result buffer** seçeneğini seçin.
3. Sonucu bir metin dosyası olarak kaydedin.

## 16.10. İpuçları

1. **Veri Hazırlığı:** Gerçek uygulamalarda veri çoğunlukla CSV biçimindedir. Bu durumda veri bir Python betiği veya elektronik tablo programı ile ARFF biçimine dönüştürülebilir ya da WEKA'nın CSV yükleyicisi kullanılabilir.

2. **Parametre Ayarı:** Farklı `lowerBoundMinSupport`, `minMetric` ve `numRules` değerleri denenmelidir. Çok fazla kural çıkıyorsa eşikler artırılmalı, hiç kural bulunamıyorsa azaltılmalıdır.

3. **Kural Değerlendirme:** Yalnızca güvene bakılmamalı; lift değeri 1'e yakın veya 1'in altında olan kurallar dikkatle yorumlanmalıdır.

4. **Karşılaştırma:** Apriori dışında FPGrowth algoritması da denenebilir. İki algoritma aynı sık öge kümelerini bulur; FPGrowth bunu daha az veri taramasıyla yapar.

## 16.11. Alternatif: FPGrowth Algoritması

FPGrowth, sık öge kümelerini aday küme üretmeden, veriyi sıkıştırılmış bir ağaç yapısında (FP-tree) tutarak bulur. Veri tabanını yalnızca iki kez taradığından büyük veri kümelerinde Apriori'den genellikle daha hızlıdır.

1. **Associate** sekmesinde **Choose** düğmesine tıklayın.
2. `weka.associations.FPGrowth` seçin.
3. Parametreleri ayarlayın (`lowerBoundMinSupport`, `minMetric`, `numRules`). FPGrowth, "öge var" anlamına gelen değeri `positiveIndex` parametresinden okur; bu nottaki tek değerli `{1}` tanımıyla varsayılan ayarlar doğru çalışır.
4. **Start** düğmesine basın.

## 16.12. Sık Karşılaşılan Sorunlar

**Sorun:** "No large itemsets and rules found!" iletisi

**Çözüm:** `lowerBoundMinSupport` değerini azaltın. Veri kümesi küçükse 0.2 veya daha düşük bir değer deneyin.

**Sorun:** FPGrowth "No rules found!" iletisi veriyor

**Çözüm:** Öznitelik tanımlarını kontrol edin. `{1, '?'}` gibi iki değerli tanımlar yerine `{1}` kullanın veya `positiveIndex` parametresini "öge var" anlamına gelen değerin sırasına ayarlayın (bkz. 16.4.1).

**Sorun:** Çok fazla kural üretiliyor

**Çözüm:** `lowerBoundMinSupport` veya `minMetric` değerlerini artırın; `numRules` parametresini azaltın.

**Sorun:** ARFF dosyası yüklenmiyor

**Çözüm:** Dosya biçimini kontrol edin. `@relation`, `@attribute` ve `@data` bölümlerinin doğru sırada olduğundan emin olun.

## 16.13. Özet

WEKA'da birliktelik kuralı analizi için:

1. Veri ARFF biçimine dönüştürülür.
2. Apriori veya FPGrowth algoritması seçilir.
3. Destek ve güven eşikleri (`lowerBoundMinSupport`, `minMetric`, `numRules`) ayarlanır.
4. Kurallar destek ve güven değerleriyle yorumlanır.
5. Lift değerine bakılarak kuralın gerçekten anlamlı olup olmadığı değerlendirilir.

Bu yöntem, market sepeti analizinden metin madenciliğine, web analizinden biyoinformatiğe kadar birçok alanda kullanılır.

---

[← 15. Kümeleme Analizi](15-kumeleme.md) · [İçindekiler](../Ders_Notu.md) · [17. Metin Madenciliği →](17-metin-madenciligi.md)
