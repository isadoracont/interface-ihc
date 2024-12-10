document.addEventListener("DOMContentLoaded", function () {
    const searchToggle = document.querySelector(".search-toggle");
    const backButton = document.querySelector(".back-button");
    const header = document.querySelector("header");

    // Show the search bar in mobile search mode
    searchToggle.addEventListener("click", () => {
        header.classList.add("mobile-search");
    });

    // Hide the search bar and return to the default header
    backButton.addEventListener("click", () => {
        header.classList.remove("mobile-search");
    });

    const barsToggle = document.querySelectorAll(".bars-toggle");
    const sidebar = document.querySelector(".sidebar");
    const overlay = document.createElement("div");

    // Create an overlay element
    overlay.className = "sidebar-overlay";
    document.body.appendChild(overlay);

    // Show the search bar in mobile search mode
    searchToggle.addEventListener("click", () => {
        header.classList.add("mobile-search");
        barsToggle.classList.add("d-none"); // Hide the bars-toggle button
    });

    // Hide the search bar and return to the default header
    backButton.addEventListener("click", () => {
        header.classList.remove("mobile-search");
        barsToggle.classList.remove("d-none"); // Show the bars-toggle button
    });

    // Toggle sidebar visibility for all .bars-toggle buttons
    barsToggle.forEach(button => {
        button.addEventListener("click", () => {
            if (sidebar.classList.contains("open")) {
                sidebar.classList.remove("open");
                overlay.classList.remove("visible");
            } else {
                sidebar.classList.add("open");
                overlay.classList.add("visible");
            }
        });
    });

    // Hide sidebar when clicking outside or on the overlay
    overlay.addEventListener("click", () => {
        sidebar.classList.remove("open");
        overlay.classList.remove("visible");
    });

});
