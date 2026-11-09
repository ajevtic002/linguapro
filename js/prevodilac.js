// prevodilac.js – prevođenje teksta pomoću besplatnog servisa MyMemory
// Servis ne zahteva API ključ, pa se može bezbedno pozivati iz pregledača.
// Dokumentacija: https://mymemory.translated.net/doc/spec.php

const forma = document.getElementById('forma-prevod');
const unos = document.getElementById('tekst-unos');
const izlaz = document.getElementById('tekst-prevod');
const izvorni = document.getElementById('izvorni-jezik');
const ciljni = document.getElementById('ciljni-jezik');
const dugmePrevedi = document.getElementById('dugme-prevedi');
const brojZnakova = document.getElementById('broj-znakova');

// Brojač unetih znakova
unos.addEventListener('input', function () {
  brojZnakova.textContent = unos.value.length;
});

// Zamena izvornog i ciljnog jezika
document.getElementById('dugme-zamena').addEventListener('click', function () {
  const privremeno = izvorni.value;
  izvorni.value = ciljni.value;
  ciljni.value = privremeno;
});

async function prevedi(tekst, sa, na) {
  const adresa = 'https://api.mymemory.translated.net/get?q=' +
    encodeURIComponent(tekst) + '&langpair=' + sa + '|' + na;

  const odgovor = await fetch(adresa);
  if (!odgovor.ok) {
    throw new Error('Servis trenutno nije dostupan.');
  }
  const podaci = await odgovor.json();
  if (podaci.responseStatus !== 200) {
    throw new Error(podaci.responseDetails || 'Prevod nije uspeo.');
  }
  return podaci.responseData.translatedText;
}

forma.addEventListener('submit', async function (dogadjaj) {
  dogadjaj.preventDefault();

  const tekst = unos.value.trim();
  if (tekst === '') {
    izlaz.textContent = 'Unesite tekst za prevod.';
    return;
  }
  if (izvorni.value === ciljni.value) {
    izlaz.textContent = 'Izvorni i ciljni jezik moraju biti različiti.';
    return;
  }

  dugmePrevedi.disabled = true;
  dugmePrevedi.textContent = 'Prevodim...';
  izlaz.textContent = '...';

  try {
    izlaz.textContent = await prevedi(tekst, izvorni.value, ciljni.value);
  } catch (greska) {
    izlaz.textContent = 'Prevod trenutno nije moguć. Proverite internet vezu i pokušajte ponovo.';
    console.error(greska);
  } finally {
    dugmePrevedi.disabled = false;
    dugmePrevedi.textContent = 'Prevedi';
  }
});
