/* ==============================================================
Externe JavaScript-Datei für:
   - Galerie-Logik, Modal-Handling und Navigation
   - Funktionen: Galerie erstellen, Modal öffnen/schließen, Bildnavigation
============================================================== */

/* -------------------------
1) Bilddaten-Array
   - Enthält alle Bilder, die in der Galerie angezeigt werden
   - Jedes Objekt hat:
     src: Pfad zum Bild
     alt: Alternativtext für Barrierefreiheit
     caption: Bildbeschreibung
------------------------- */
const images = [
    { src: 'img/beach_01.jpg', alt: 'Strand 1', caption: 'Ein schöner Strand' },
    { src: 'img/beach_02.jpg', alt: 'Strand 2', caption: 'Sonnenuntergang am Strand' },
    { src: 'img/city.jpg', alt: 'Stadt 1', caption: 'Moderne Stadtansicht' },
    { src: 'img/dolomites.jpg', alt: 'Dolomiten', caption: 'Berge der Dolomiten' },
    { src: 'img/fassa-valley.jpg', alt: 'Fassatal', caption: 'Landschaft im Fassatal' },
    { src: 'img/forest.jpg', alt: 'Wald', caption: 'Dichter Wald' },
    { src: 'img/mountain_01.jpg', alt: 'Berge 1', caption: 'Majestätische Berge' },
    { src: 'img/mountain_02.jpg', alt: 'Berge 2', caption: 'Imposante Berge' },
    { src: 'img/sailboat.jpg', alt: 'Segelboot', caption: 'Segelboot auf dem Meer' },
    { src: 'img/waves.jpg', alt: 'Wellen', caption: 'Kraftvolle Meereswellen' }
];

/* -------------------------
2) Status & DOM-Referenzen
   - Speichert den aktuellen Zustand der Modal-Galerie
   - Referenzen auf wichtige HTML-Elemente für einfache Manipulation
------------------------- */
let currentImageIndex = 0; // Startindex des aktuell angezeigten Bildes

// DOM-Elemente für Modal
const modal = document.getElementById('imageModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const closeBtn = document.getElementById('closeModal');
const gallery = document.getElementById('gallery'); // Galerie-Container

/* -------------------------
3) Galerie erstellen
   - Fügt alle Bilder dynamisch in die Galerie ein
   - Fügt Klick-Eventlistener für jedes Bild hinzu
------------------------- */
function createGallery() {
    // map() erzeugt HTML für jedes Bild
    const galleryHTML = images.map((image, index) => `
        <div class="photo" data-id="${index}">
            <img src="${image.src}" alt="${image.alt}">
        </div>
    `).join(''); // join("") verbindet alle Strings zu einem HTML-Block

    gallery.innerHTML = galleryHTML; // fügt die Bilder in den DOM ein

    // EventListener für jedes Bild, um Modal zu öffnen
    document.querySelectorAll('.photo').forEach(photo => {
        photo.addEventListener('click', () => {
            const id = parseInt(photo.getAttribute('data-id')); // Index aus data-id
            openModal(id); // Modal öffnen mit diesem Bild
        });
    });
}

/* -------------------------
4) Modal öffnen & schließen
   - openModal(): zeigt Modal an und sperrt Scrollen im Hintergrund
   - closeModal(): versteckt Modal und erlaubt Scrollen wieder
------------------------- */
function openModal(imageId) {
    currentImageIndex = imageId; // speichert aktuellen Index
    updateModal(); // Modal-Inhalt aktualisieren
    modal.classList.add('active'); // sichtbar machen
    document.body.style.overflow = 'hidden'; // Scrollen verhindern
}

function closeModal() {
    modal.classList.remove('active'); // Modal verstecken
    document.body.style.overflow = 'auto'; // Scrollen wieder erlauben
}

/* -------------------------
5) Modal-Inhalt aktualisieren
   - Bild, Titel und Zähler anpassen
   - Buttons ggf. deaktivieren, wenn Anfang/Ende erreicht
------------------------- */
function updateModal() {
    const image = images[currentImageIndex]; // aktuelles Bild
    modalImage.src = image.src;
    modalImage.alt = image.alt;
    modalTitle.textContent = image.caption;

    // ✅ Zähler aktualisieren (z.B. 3/10)
    const modalCounter = document.getElementById('modalCounter');
    modalCounter.textContent = `${currentImageIndex + 1}/${images.length}`;

    // Buttons deaktivieren am Anfang oder Ende
    prevBtn.disabled = currentImageIndex === 0;
    nextBtn.disabled = currentImageIndex === images.length - 1;
}

/* -------------------------
6) Navigation: nächstes / vorheriges Bild
   - showNextImage(): geht einen Index nach rechts
   - showPrevImage(): geht einen Index nach links
------------------------- */
function showNextImage() {
    if (currentImageIndex < images.length - 1) {
        currentImageIndex++;
        updateModal();
    }
}

function showPrevImage() {
    if (currentImageIndex > 0) {
        currentImageIndex--;
        updateModal();
    }
}

/* -------------------------
7) Event-Listener
   - Klicks auf Buttons und Hintergrund
   - Keyboard-Steuerung (Escape, Pfeile)
------------------------- */
closeBtn.addEventListener('click', closeModal);
prevBtn.addEventListener('click', showPrevImage);
nextBtn.addEventListener('click', showNextImage);

// Klick auf Overlay schließt Modal // Klick außerhalb des Modal-Inhalts schließt das Modal
modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
});

// Keyboard-Steuerung für Modal
document.addEventListener('keydown', (e) => {
    if (modal.classList.contains('active')) {
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') showPrevImage();
        if (e.key === 'ArrowRight') showNextImage();
    }
});

/* -------------------------
8) Initialisierung
   - Galerie erstellen, alles startklar
------------------------- */
createGallery();

