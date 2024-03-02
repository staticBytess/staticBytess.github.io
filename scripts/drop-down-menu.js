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