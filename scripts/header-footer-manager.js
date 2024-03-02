class myHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div id="topHeader">
            <a href="menu.html">Menu</a>
            <a href="index.html">Home</a>
            <a href="projects.html">Projects</a>
            <a href="contact.html">Contact</a>
            
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





