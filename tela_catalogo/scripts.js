document.addEventListener("DOMContentLoaded", function () {
    const searchToggle = document.querySelector(".search-toggle");
    const backButton = document.querySelector(".back-button");
    const header = document.querySelector("header");
    const searchInput = document.querySelector(".search-bar input"); // Input field in the search bar

    const barsToggle = document.querySelectorAll(".bars-toggle");
    const sidebar = document.querySelector(".sidebar");
    const overlay = document.createElement("div");

    // Create an overlay element
    overlay.className = "sidebar-overlay";
    document.body.appendChild(overlay);

    // Function to toggle focusability of sidebar elements
    function toggleSidebarFocus(isOpen) {
        const focusableElements = sidebar.querySelectorAll("a, button, input, select, textarea");
        focusableElements.forEach(el => {
            if (isOpen) {
                el.removeAttribute("tabindex");
            } else {
                el.setAttribute("tabindex", "-1");
            }
        });
    }

    // Function to update focusability based on screen size
    function updateSidebarFocus() {
        const isDesktop = window.innerWidth >= 768; // Adjust breakpoint as needed
        if (isDesktop) {
            toggleSidebarFocus(true); // Ensure sidebar is focusable on desktop
        } else {
            toggleSidebarFocus(sidebar.classList.contains("open"));
        }
    }

    // Trap focus inside the sidebar
    function trapFocus(event) {
        const focusableElements = sidebar.querySelectorAll("a, button, input, select, textarea");
        const firstFocusable = focusableElements[0];
        const lastFocusable = focusableElements[focusableElements.length - 1];

        if (event.shiftKey && document.activeElement === firstFocusable) {
            // If Shift + Tab on the first focusable element, move focus to the last
            event.preventDefault();
            lastFocusable.focus();
        } else if (!event.shiftKey && document.activeElement === lastFocusable) {
            // If Tab on the last focusable element, move focus to the first
            event.preventDefault();
            firstFocusable.focus();
        }
    }

    // Show the search bar in mobile search mode
    searchToggle.addEventListener("click", () => {
        header.classList.add("mobile-search");
        searchInput.focus(); // Focus on the search input
    });

    // Hide the search bar and return to the default header
    backButton.addEventListener("click", () => {
        header.classList.remove("mobile-search");
    });

    // Show sidebar
    barsToggle.forEach(button => {
        button.addEventListener("click", () => {
            if (!sidebar.classList.contains("open")) {
                sidebar.classList.add("open");
                overlay.classList.add("visible");
                toggleSidebarFocus(true);
                sidebar.querySelector(".bars-toggle").focus(); // Focus on close button
                document.addEventListener("keydown", trapFocus);
            }
        });
    });

    // Hide sidebar
    function closeSidebar() {
        sidebar.classList.remove("open");
        overlay.classList.remove("visible");
        toggleSidebarFocus(false);
        document.removeEventListener("keydown", trapFocus);
        barsToggle[0].focus(); // Return focus to the toggle button
    }

    sidebar.querySelector(".bars-toggle").addEventListener("click", closeSidebar);
    overlay.addEventListener("click", closeSidebar);

    // Update focusability on page load and window resize
    updateSidebarFocus();
    window.addEventListener("resize", updateSidebarFocus);
});
