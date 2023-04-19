function includeHTML() {
    var a, i, element, file, xhttp;
    a = document.getElementById("*");
    for (i=0; i<z.length; i++) {
        element = z[i];
        file = element.getAttribute("include-html");
        if (file) {
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        element.includeHTML = this.responseText;
                    }
                    element.removeAttribute("include-html");
                    includeHTML();
                }
            }
            xhttp.open("GET", file, true);
            xhttp.send();
            return;
        }
    }
}

