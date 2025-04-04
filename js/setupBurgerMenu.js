function setupBurgerMenu() {
    const sidenav = document.getElementById("mySidenav");
    if (!sidenav) return;
    
    setupOpenButton(sidenav);
    setupCloseButton(sidenav);
    setupNavLinks(sidenav);
}

function setupOpenButton(sidenav) {
    const openBtn = document.getElementById("openBtn");
    if (!openBtn) return;
    
    openBtn.onclick = function() {
        sidenav.classList.add("active");
    };
}

function setupCloseButton(sidenav) {
    const closeBtn = document.getElementById("closeBtn");
    if (!closeBtn) return;
    
    closeBtn.onclick = function() {
        sidenav.classList.remove("active");
    };
}

function setupNavLinks(sidenav) {
    const navLinks = sidenav.getElementsByTagName('a');
    
    for (let i = 0; i < navLinks.length; i++) {
        if (navLinks[i].id !== "closeBtn") {
            navLinks[i].onclick = function() {
                sidenav.classList.remove("active");
            };
        }
    }
}