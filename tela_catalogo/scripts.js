function toggleLangMenu() {
    const langMenu = document.getElementById("lang-menu");
    langMenu.style.display = langMenu.style.display === "block" ? "none" : "block";
}

// Fecha o menu se clicar fora dele
window.onclick = function(event) {
    if (!event.target.matches('.lang-select button')) {
        const langMenu = document.getElementById("lang-menu");
        if (langMenu.style.display === "block") {
            langMenu.style.display = "none";
        }
    }
}
