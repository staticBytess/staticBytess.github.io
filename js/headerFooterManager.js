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
customElements.define('start-pack', starterPack)


