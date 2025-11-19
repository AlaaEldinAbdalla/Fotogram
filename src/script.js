
// Externe JS-Datei → Projekt Fotogram 
/*  ----------------- Bilder einfügen - there Steps  -------------- */
// 1️⃣ Bilderliste → 
const bilderListe = [
    { src: './img/beach_01.jpg', alt: 'Strand 1', caption: 'Traumhafter Strand' },
    { src: './img/beach_02.jpg', alt: 'Strand 2', caption: 'Sonnenuntergang am Strand' },
    { src: './img/city.jpg', alt: 'Stadt', caption: 'Lebendige Stadtansicht' },
    { src: './img/dolomites.jpg', alt: 'Dolomiten', caption: 'Majestätische Berge' },
    { src: './img/fassa-valley.jpg', alt: 'Fassatal', caption: 'Idyllisches Tal' },
    { src: './img/forest.jpg', alt: 'Wald', caption: 'Dichter Wald' },
    { src: './img/mountain_01.jpg', alt: 'Berg 1', caption: 'Atemberaubende Berglandschaft' },
    { src: './img/mountain_02.jpg', alt: 'Berg 2', caption: 'Schneebedeckte Gipfel' },
    { src: './img/sailboat.jpg', alt: 'Segelboot', caption: 'Segelboot auf dem Meer' },
    { src: './img/waves.jpg', alt: 'Wellen', caption: 'Kraftvolle Meereswellen' }
];
// 2️⃣ DOM-Schnittstelle → Bilder-Container auswählen
const bilderContainer = document.getElementById('bilder-container');
// 3️⃣ Bilder Funktion → zum Eifügen der Bilder in den Container:
function bildereinfuegenFuntion (bilderListe) {
    bilderListe.forEach(function(bild) {
        const neuesBild = document.createElement('img'); 
        neuesBild.src = bild.src;
        neuesBild.alt = bild.alt;
        neuesBild.title = bild.caption;
        neuesBild.classList.add('container-img'); 
        bilderContainer.appendChild(neuesBild); 
    });  
}      bildereinfuegenFuntion(bilderListe);
/*  ---------------- Dialog-Bereich -------------------------------- */
// 1️⃣ Dom-Schnittstelle, die der Dialog braucht:
const bilderDialog = document.getElementById('bilder-dialog');
const dialogImg = document.getElementById('dialog-img');
const dialogTitle = document.getElementById('dialog-title');
const closeButton = document.getElementById('close-dialog');
// 2️⃣ Dialog Öffnen 
function openDialog() {
    const alleBilder = document.querySelectorAll('.container-img'); 
    alleBilder.forEach(function(bild) {
        bild.addEventListener('click', function() {
            dialogImg.src = bild.src;            
            dialogTitle.textContent = bild.title;
            bilderDialog.showModal();                   
        });
    });
} openDialog();
// 3️⃣ Dialog Schließen 
function closeDialog(bilderDialog, closeButton) {

    const schliessungsDauer = 1000; // Dauer des Closing (1s, passend zu CSS)

    // Über den Schließ-Button:
    closeButton.addEventListener('click', function() {

        bilderDialog.classList.add('closing');

        setTimeout(function() {
            bilderDialog.close();
            bilderDialog.classList.remove('closing');
        }, schliessungsDauer);

    });

    // Über den Klick außerhalb:
    bilderDialog.addEventListener('click', function(event) {
        if (event.target === bilderDialog) {

            bilderDialog.classList.add('closing');

            setTimeout(function() {
                bilderDialog.close();
                bilderDialog.classList.remove('closing');
            }, schliessungsDauer);
        }
    });

    // Über die Escape-Taste:
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && bilderDialog.open) {

            bilderDialog.classList.add('closing');

            setTimeout(function() {
                bilderDialog.close();
                bilderDialog.classList.remove('closing');
            }, schliessungsDauer);
        }
    });

} closeDialog(bilderDialog, closeButton);
/* ---------------- Navigation + Zähler-Funktion ------------------- */
// DOM-Elemente, die der Zähler braucht:
const prevButton = document.getElementById('prevBtn');
const nextButton = document.getElementById('nextBtn');
const alleBilder = document.querySelectorAll('.container-img'); 
let aktuellerIndex = 0; // aktuelles Bild
function aktuelleBildnummer() {
    const dialogZaehler = document.getElementById('dialogZaehler');
    const bild = alleBilder[aktuellerIndex];

    // Bild + Titel aktualisieren
    dialogImg.src = bild.src;
    dialogImg.alt = bild.alt;
    dialogTitle.textContent = bild.title;

    // ✅ Zähler aktualisieren (z.B. 6 / 10)
    dialogZaehler.textContent = `${aktuellerIndex + 1} / ${alleBilder.length}`;
    // Buttons aktivieren/deaktivieren am Anfang / Ende
    prevButton.disabled = aktuellerIndex === 0;
    nextButton.disabled = aktuellerIndex === alleBilder.length - 1;
}
/* --------------- Navigation-Funktionen --------------------------- */
function showNextPicture() {
    if (aktuellerIndex < alleBilder.length - 1) {
        aktuellerIndex++;
        aktuelleBildnummer();
    }
}
function showPrevPicture() {
    if (aktuellerIndex > 0) {
        aktuellerIndex--;
        aktuelleBildnummer();
    }
}
/* ---------------- Event-Listener hinzufügen ----------------------- */
nextButton.addEventListener('click', showNextPicture);
prevButton.addEventListener('click', showPrevPicture);
// Beim Klick auf ein Bild: öffne Dialog und zeige Zähler
alleBilder.forEach(function(bild, index) {
    bild.addEventListener('click', function() {
        aktuellerIndex = index;
        bilderDialog.showModal();
        aktuelleBildnummer();
    });
});

