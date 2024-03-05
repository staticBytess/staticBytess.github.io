class myHeader extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div id="socials">
                <a class="logos" href="https://github.com/staticBytess">
                    <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png">
                </a>
                <a class="logos" href="https://www.linkedin.com/in/david-vigil-1753282b6">
                    <img src="https://cdn-icons-png.flaticon.com/512/61/61109.png">
                </a>
            </div>
        `
    }
}


class myFooter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div id="myfooter">
            <footer>
                <p>Developed by David Vigil</p>
            </footer>
        </div>
        `
    }
}


customElements.define('my-header', myHeader)
customElements.define('my-footer', myFooter)
customElements.define('drop-down', dropDownMenu)





