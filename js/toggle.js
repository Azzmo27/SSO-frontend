// Funktion til at åbne og lukke bokse
function toggleBox(boxId) {
    var box = document.getElementById(boxId);
    var icon = box.previousElementSibling.querySelector('.toggle-icon');

    // Skift mellem at vise og skjule boksen
    if (box.classList.contains('hidden')) {
        box.classList.remove('hidden');
        icon.classList.add('open');  // Rotér pilen
    } else {
        box.classList.add('hidden');
        icon.classList.remove('open');  // Fjern rotation af pilen
    }
}
