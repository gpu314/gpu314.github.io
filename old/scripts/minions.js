const myImage = document.querySelector("img");

myImage.onclick = () => {
    const mySrc = myImage.getAttribute("src");
    if (mySrc === "images/minions.png") {
        myImage.setAttribute("src", "images/minions2.png");
    } else {
        myImage.setAttribute("src", "images/minions.png");
    }
}

let myButton = document.querySelector("button");
let myHeading = document.querySelector("h1");

function setUserName() {
    const myName = prompt("Enter name: ");
    if (!myName) {
        setUserName();
    } else {
        localStorage.setItem("name", myName);
        myHeading.textContent = `Hi ${myName}, these are Minions!`;
    }
}

if (!localStorage.getItem("name")) {
    setUserName();
} else {
    const storedName = localStorage.getItem("name");
    myHeading.textContent = `Hi ${storedName}, these are Minions!`;
}

myButton.onclick = () => {
    setUserName();
};