// Filtro por linha de pesquisa na página de publicações (sem a página funciona igual, só sem filtro).
(function () {
  var buttons = document.querySelectorAll('.filters button');
  if (!buttons.length) return;
  function apply(f) {
    buttons.forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.f === f)); });
    document.querySelectorAll('.pub').forEach(function (li) {
      var lines = li.dataset.lines.split(' ');
      li.hidden = !(f === 'all' || lines.indexOf(f) !== -1);
    });
    document.querySelectorAll('.pub-group').forEach(function (g) {
      g.hidden = !g.querySelector('.pub:not([hidden])');
    });
    try { history.replaceState(null, '', f === 'all' ? location.pathname : '#line-' + f); } catch (e) {}
  }
  buttons.forEach(function (b) { b.addEventListener('click', function () { apply(b.dataset.f); }); });
  var m = location.hash.match(/^#line-(\d)$/);
  if (m) apply(m[1]);
})();
