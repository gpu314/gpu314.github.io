document.addEventListener("DOMContentLoaded", function () {
    var curr = window.location.pathname.split("/").pop();
    var nav = document.querySelectorAll(".navbar-nav a");
    nav.forEach(function (n) {
        var page = n.getAttribute("href").split("/").pop();
        if (page === curr) {
            item.classList.add("active");
        } else {
            item.classList.remove("active");
        }
    });
});
