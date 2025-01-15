const zeldaCharacters = [
    "Link", "Zelda", "Ganondorf"
];

document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('searchBar');
    const autocompleteList = document.getElementById('autocompleteList');

    searchBar.addEventListener('input', () => {
        const query = searchBar.value.toLowerCase().trim();
        autocompleteList.innerHTML = ''; // Vorherige Vorschläge löschen

        if (query.length === 0) {
            autocompleteList.style.display = 'none';
            return;
        }

        const filteredCharacters = zeldaCharacters.filter(character => 
            character.toLowerCase().includes(query)
        );

        if (filteredCharacters.length === 0) {
            autocompleteList.style.display = 'none';
            return;
        }

        filteredCharacters.forEach(character => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item list-group-item-action';

            // Datei-Link erstellen (Großer Anfangsbuchstabe und Leerzeichen mit Bindestrichen ersetzen)
            const characterFileName = character
                .replace(/[äöüß]/g, match => ({ 'ä': 'ae', 'ö': 'oe', 'ü': 'ue', 'ß': 'ss' }[match])) // Umlaute ersetzen
                .replace(/ /g, '-');

            // Dynamischer Pfad basierend auf dem aktuellen Standort
            const currentPath = window.location.pathname;
            const basePath = currentPath.includes('character-websites') ? '.' : './character-websites';

            listItem.innerHTML = `<a href="${basePath}/${characterFileName}.html">${character}</a>`;
            autocompleteList.appendChild(listItem);
        });

        autocompleteList.style.display = 'block';
    });

    // Versteckt die Vorschläge, wenn der Benutzer außerhalb klickt
    document.addEventListener('click', (event) => {
        if (!autocompleteList.contains(event.target) && event.target !== searchBar) {
            autocompleteList.style.display = 'none';
        }
    });
});
