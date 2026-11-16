// Web sürümünün (index.html) ve yazdırma sayfasının (yazdir.html) ortak docsify ayarları.
// yazdir.html bu dosyadan önce window.NOT_YAZDIR = true tanımlar.
(function () {
  var YAZDIR = !!window.NOT_YAZDIR;

  // GitHub uyarı kutularını (> [!CAUTION] vb.) docsify'da da renkli göster
  function uyariKutulari(hook) {
    var basliklar = { NOTE: 'Not', TIP: 'İpucu', IMPORTANT: 'Önemli', WARNING: 'Uyarı', CAUTION: 'Dikkat' };
    hook.afterEach(function (html) {
      return html.replace(/<blockquote>\s*<p>\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*(<br\s*\/?>)?/g, function (_, tur) {
        return '<blockquote class="uyari uyari-' + tur.toLowerCase() + '"><p><span class="uyari-baslik">' + basliklar[tur] + '</span>';
      });
    });
  }

  // bolumler/ klasöründeki sayfalarda HTML ile eklenen görsellerin yolu "../images/..." biçimindedir
  // (GitHub'da doğru görünsün diye). Site sayfası kök klasörde çalıştığı için baştaki "../" kaldırılır.
  function altKlasorYollari(hook, vm) {
    hook.afterEach(function (html) {
      var dosya = (vm.route && vm.route.file) || '';
      if (dosya.indexOf('/') === -1) return html;
      return html.replace(/(src|href)="\.\.\//g, '$1="');
    });
  }

  // Sayfa her çizildiğinde mermaid diyagramlarını oluştur
  function mermaidCiz(hook) {
    hook.doneEach(function () {
      if (window.mermaid) {
        window.mermaid.run({ querySelector: '.mermaid' });
      }
    });
  }

  window.$docsify = {
    name: 'Veri Madenciliği',
    repo: 'https://github.com/erkanozhan/datamining',
    homepage: 'Ders_Notu.md',
    loadSidebar: !YAZDIR,
    alias: { '/.*/_sidebar.md': '/_sidebar.md' },
    subMaxLevel: 2,
    relativePath: true,
    auto2top: true,
    executeScript: true,
    search: {
      paths: 'auto',
      depth: 3,
      placeholder: 'Notta ara',
      noData: 'Sonuç bulunamadı'
    },
    plugins: [uyariKutulari, altKlasorYollari, mermaidCiz],
    markdown: {
      renderer: {
        code: function (code, lang) {
          if (lang === 'mermaid') {
            return '<div class="mermaid">' + code + '</div>';
          }
          // ```math blokları (GitHub'ın display formül biçimi) → KaTeX ile çiz
          if (lang === 'math' && window.katex) {
            return '<div class="math-blok">' +
              window.katex.renderToString(code, { displayMode: true, throwOnError: false }) +
              '</div>';
          }
          return this.origin.code.apply(this, arguments);
        }
      }
    }
  };
})();
