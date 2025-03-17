document.addEventListener('DOMContentLoaded', () => {
    const tutorialBtn = document.getElementById('tutorialBtn');
    const helpPopup = document.getElementById('helpPopup');
    const closePopupBtn = document.getElementById('closePopupBtn');

    if (tutorialBtn) {
        tutorialBtn.addEventListener('click', () => {
            helpPopup.style.display = 'flex';
        });
    }

    if (closePopupBtn) {
        closePopupBtn.addEventListener('click', () => {
            helpPopup.style.display = 'none'; 
        });
    }
    window.addEventListener('click', (event) => {
        if (event.target === helpPopup) {
            helpPopup.style.display = 'none';
        }
    });
});