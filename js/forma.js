// forma.js – slanje prijave na e-mail preko servisa FormSubmit (https://formsubmit.co)
// Forma radi i bez JavaScripta (klasičan POST na adresu iz atributa action).
// Skripta samo omogućava slanje bez napuštanja stranice i prikaz poruke korisniku.

const formaUpis = document.getElementById('forma-upis');
const porukaForme = document.getElementById('poruka-forme');
const dugmePosalji = document.getElementById('dugme-posalji');

function prikaziPoruku(tekst, vrsta) {
  porukaForme.textContent = tekst;
  porukaForme.className = 'poruka poruka--' + vrsta;
}

formaUpis.addEventListener('submit', async function (dogadjaj) {
  dogadjaj.preventDefault();

  // Ugrađena HTML5 validacija (required, type="email", pattern...)
  if (!formaUpis.checkValidity()) {
    formaUpis.reportValidity();
    return;
  }

  dugmePosalji.disabled = true;
  dugmePosalji.textContent = 'Šaljem...';

  // AJAX adresa servisa: /ajax/ se dodaje ispred e-mail adrese
  const adresa = formaUpis.action.replace('formsubmit.co/', 'formsubmit.co/ajax/');

  try {
    const odgovor = await fetch(adresa, {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(formaUpis),
    });
    if (!odgovor.ok) throw new Error();

    prikaziPoruku('Hvala! Prijava je uspešno poslata. Javićemo ti se u roku od 24 sata.', 'uspeh');
    formaUpis.reset();
  } catch (greska) {
    prikaziPoruku('Došlo je do greške pri slanju. Pokušaj ponovo ili nas pozovi telefonom.', 'greska');
  } finally {
    dugmePosalji.disabled = false;
    dugmePosalji.textContent = 'Pošalji prijavu';
  }
});

// Ako je korisnik stigao sa stranice testa, unapred popuni kurs i nivo
const parametri = new URLSearchParams(window.location.search);
if (parametri.get('kurs')) document.getElementById('kurs').value = parametri.get('kurs');
if (parametri.get('nivo')) document.getElementById('nivo').value = parametri.get('nivo');
