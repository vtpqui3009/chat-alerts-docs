// Builds the "On this page" list from the h2 headings of a doc page.
(function () {
  var toc = document.querySelector('.toc');
  var list = toc && toc.querySelector('.toc-list');
  var heads = document.querySelectorAll('.prose h2[id]');
  if (!list || heads.length < 3) return;
  heads.forEach(function (h) {
    var li = document.createElement('li');
    var a = document.createElement('a');
    a.href = '#' + h.id;
    a.textContent = h.textContent;
    li.appendChild(a);
    list.appendChild(li);
  });
  toc.hidden = false;
  if (window.matchMedia('(max-width: 899px)').matches) toc.querySelector('details').open = false;
  var links = list.querySelectorAll('a');
  if (!('IntersectionObserver' in window)) return;
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      links.forEach(function (l) { l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id); });
    });
  }, { rootMargin: '0px 0px -70% 0px' });
  heads.forEach(function (h) { io.observe(h); });
})();
