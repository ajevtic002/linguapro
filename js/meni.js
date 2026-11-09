// meni.js – otvaranje i zatvaranje navigacionog menija na manjim ekranima

const meniDugme = document.querySelector('.meni-dugme');
const navigacija = document.querySelector('.navigacija');

meniDugme.addEventListener('click', function () {
  const otvoren = navigacija.classList.toggle('otvoren');
  meniDugme.classList.toggle('otvoren', otvoren);
  meniDugme.setAttribute('aria-expanded', otvoren);
  meniDugme.setAttribute('aria-label', otvoren ? 'Zatvori meni' : 'Otvori meni');
});

// Zatvaranje menija tasterom Escape
document.addEventListener('keydown', function (dogadjaj) {
  if (dogadjaj.key === 'Escape' && navigacija.classList.contains('otvoren')) {
    navigacija.classList.remove('otvoren');
    meniDugme.classList.remove('otvoren');
    meniDugme.setAttribute('aria-expanded', 'false');
    meniDugme.focus();
  }
});
