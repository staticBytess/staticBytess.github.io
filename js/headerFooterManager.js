class myHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div id="topHeader">
            <a href="index.html">Menu</a>
            <a href="home.html">Home</a>
            <a href="projects.html">Projects</a>
            <a href="contact.html">Contact</a>
            <a href="about.html">About</a>
            <link rel="stylesheet" type="text/css" href="style.css" />
        </div>
        `
    }
}

class dropDownMenu extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
                <a href="projects.html" onmouseenter="myFunction()" class="dropbtn">Projects</a>
                <div id="myDropdown" class="dropdown-content">
                    <a href="piCar.html">Raspberry Pi "Car"</a>
                    <a href="website.html">Portfolio Website</a>
                    <a href="#">Reaction Time Game</a>
                </div>
        `
    }
}


class myFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div id="myfooter">
            <footer>
                <p>Created and maintained by David Vigil</p>
            </footer>
        </div>
        `
    }
}

customElements.define('my-header', myHeader)
customElements.define('my-footer', myFooter)
customElements.define('drop-down', dropDownMenu)





