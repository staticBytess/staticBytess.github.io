
class myHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div class="topHeader">
            <a class="active" href="index.html">Home</a>
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
        <footer>
            <p>Instagram</p>
            <p>LinkedIn</p>
        </footer>
        `
        
    }
}

customElements.define('my-header', myHeader)
customElements.define('my-footer', myHeader)


