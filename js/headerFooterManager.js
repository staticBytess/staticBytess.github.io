
class myHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div class="topHeader">
            <a class="active" href="index.html">Home</a>
            <a href="projects.html">Projects</a>
            <a href="contact.html">Contact</a>
            <a href="about.html">About</a>
        </div>
        `
        
    }
}

class myFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        
        `
        
    }
}

customElements.define('my-header', myHeader)
customElements.define('my-footer', myHeader)


