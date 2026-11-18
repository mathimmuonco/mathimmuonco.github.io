// Ampliação de figuras na própria página (lightbox). Sem JS, o link abre o arquivo da imagem.
(function () {
  var links = document.querySelectorAll('.fig a');
  if (!links.length) return;
  var box = null, lastFocus = null;
  function close() {
    if (!box) return;
    document.body.style.overflow = '';
    box.parentNode.removeChild(box); box = null;
    document.removeEventListener('keydown', onKey);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function onKey(e) { if (e.key === 'Escape') close(); }
  function open(a) {
    var img = a.querySelector('img'); if (!img) return;
    lastFocus = a;
    box = document.createElement('div');
    box.className = 'lightbox'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-modal', 'true');
    var big = document.createElement('img'); big.src = img.currentSrc || img.src; big.alt = img.alt;
    var btn = document.createElement('button'); btn.type = 'button'; btn.setAttribute('aria-label', 'Close'); btn.textContent = '×';
    box.appendChild(big); box.appendChild(btn);
    box.addEventListener('click', close);
    document.body.appendChild(box); document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKey); btn.focus();
  }
  links.forEach(function (a) {
    a.classList.add('zoomable');
    a.addEventListener('click', function (e) { e.preventDefault(); open(a); });
  });
})();
