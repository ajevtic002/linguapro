// test.js – test nivoa znanja engleskog jezika
// Pitanja su poređana od lakših (A1) ka težim (C1).

const pitanja = [
  { tekst: 'She ___ a teacher.', odgovori: ['am', 'is', 'are', 'be'], tacan: 1 },
  { tekst: 'I ___ coffee every morning.', odgovori: ['drink', 'drinks', 'drinking', 'am drink'], tacan: 0 },
  { tekst: 'There ___ two books on the table.', odgovori: ['is', 'be', 'are', 'am'], tacan: 2 },
  { tekst: 'Yesterday we ___ to the cinema.', odgovori: ['go', 'goes', 'gone', 'went'], tacan: 3 },
  { tekst: 'This bag is ___ than that one.', odgovori: ['more cheap', 'cheaper', 'cheapest', 'most cheap'], tacan: 1 },
  { tekst: 'Look! It ___ outside.', odgovori: ['rains', 'rain', 'is raining', 'rained'], tacan: 2 },
  { tekst: 'Have you ever ___ to London?', odgovori: ['been', 'went', 'go', 'being'], tacan: 0 },
  { tekst: 'If it rains tomorrow, we ___ at home.', odgovori: ['stayed', 'will stay', 'would stay', 'stay will'], tacan: 1 },
  { tekst: 'The report ___ by the manager last week.', odgovori: ['wrote', 'has written', 'was written', 'is writing'], tacan: 2 },
  { tekst: 'I\'m not used to ___ up so early.', odgovori: ['get', 'getting', 'got', 'have got'], tacan: 1 },
  { tekst: 'If I ___ more time, I would learn Japanese.', odgovori: ['have', 'will have', 'had', 'would have'], tacan: 2 },
  { tekst: 'She asked me where ___.', odgovori: ['I lived', 'did I live', 'do I live', 'I am live'], tacan: 0 },
  { tekst: 'By the time we arrived, the film ___.', odgovori: ['already started', 'has already started', 'had already started', 'was already start'], tacan: 2 },
  { tekst: 'Hardly ___ the house when it started to rain.', odgovori: ['I had left', 'had I left', 'I left', 'did I left'], tacan: 1 },
  { tekst: 'The new policy will ___ the way we work.', odgovori: ['bring about', 'bring up', 'bring in for', 'bring off with'], tacan: 0 },
];

// Pragovi: broj tačnih odgovora -> nivo, opis i preporučeni kurs
const nivoi = [
  { min: 0,  nivo: 'A1', opis: 'Početni nivo. Razumeš osnovne reči i fraze i možeš da se predstaviš.', kurs: 'Engleski jezik' },
  { min: 4,  nivo: 'A2', opis: 'Osnovni nivo. Snalaziš se u jednostavnim, svakodnevnim situacijama.', kurs: 'Engleski jezik' },
  { min: 7,  nivo: 'B1', opis: 'Srednji nivo. Razumeš glavne ideje i možeš da opišeš iskustva i planove.', kurs: 'Engleski jezik' },
  { min: 10, nivo: 'B2', opis: 'Viši srednji nivo. Tečno razgovaraš i razumeš složenije tekstove.', kurs: 'Engleski za IT' },
  { min: 13, nivo: 'C1', opis: 'Napredni nivo. Jezik koristiš fleksibilno u poslovnom i akademskom okruženju.', kurs: 'Engleski za IT' },
];

let trenutno = 0;
let brojTacnih = 0;
let izabraniOdgovor = null;

const ekranPocetak = document.getElementById('test-pocetak');
const ekranPitanja = document.getElementById('test-pitanja');
const ekranRezultat = document.getElementById('test-rezultat');
const tekstPitanja = document.getElementById('tekst-pitanja');
const kontejnerOdgovora = document.getElementById('odgovori');
const brojac = document.getElementById('brojac');
const traka = document.getElementById('traka');
const dugmeDalje = document.getElementById('dugme-dalje');

function prikaziPitanje() {
  const pitanje = pitanja[trenutno];
  izabraniOdgovor = null;
  dugmeDalje.disabled = true;
  dugmeDalje.textContent = trenutno === pitanja.length - 1 ? 'Završi test' : 'Sledeće pitanje';

  brojac.textContent = 'Pitanje ' + (trenutno + 1) + ' od ' + pitanja.length;
  traka.style.width = (trenutno / pitanja.length) * 100 + '%';
  tekstPitanja.textContent = (trenutno + 1) + '. ' + pitanje.tekst;

  kontejnerOdgovora.innerHTML = '';
  pitanje.odgovori.forEach(function (odgovor, indeks) {
    const dugme = document.createElement('button');
    dugme.type = 'button';
    dugme.className = 'odgovor';
    dugme.textContent = odgovor;
    dugme.addEventListener('click', function () {
      document.querySelectorAll('.odgovor').forEach(function (d) { d.classList.remove('izabran'); });
      dugme.classList.add('izabran');
      izabraniOdgovor = indeks;
      dugmeDalje.disabled = false;
    });
    kontejnerOdgovora.appendChild(dugme);
  });
}

function prikaziRezultat() {
  let rezultat = nivoi[0];
  nivoi.forEach(function (n) {
    if (brojTacnih >= n.min) rezultat = n;
  });

  document.getElementById('nivo').textContent = rezultat.nivo;
  document.getElementById('opis-nivoa').textContent = rezultat.opis;
  document.getElementById('broj-tacnih').textContent =
    'Tačnih odgovora: ' + brojTacnih + ' od ' + pitanja.length + '. Preporučujemo kurs „' + rezultat.kurs + '“, nivo ' + rezultat.nivo + '.';

  // Link ka upisu prenosi preporučeni kurs i nivo na stranicu sa formom
  document.getElementById('link-upis').href =
    'kontakt.html?kurs=' + encodeURIComponent(rezultat.kurs) + '&nivo=' + rezultat.nivo;

  ekranPitanja.classList.add('skriveno');
  ekranRezultat.classList.remove('skriveno');
}

document.getElementById('dugme-pocni').addEventListener('click', function () {
  ekranPocetak.classList.add('skriveno');
  ekranPitanja.classList.remove('skriveno');
  prikaziPitanje();
});

dugmeDalje.addEventListener('click', function () {
  if (izabraniOdgovor === pitanja[trenutno].tacan) {
    brojTacnih++;
  }
  trenutno++;
  if (trenutno < pitanja.length) {
    prikaziPitanje();
  } else {
    traka.style.width = '100%';
    prikaziRezultat();
  }
});

document.getElementById('dugme-ponovo').addEventListener('click', function () {
  trenutno = 0;
  brojTacnih = 0;
  ekranRezultat.classList.add('skriveno');
  ekranPitanja.classList.remove('skriveno');
  prikaziPitanje();
});
