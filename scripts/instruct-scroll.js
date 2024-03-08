const element = document.querySelector("div#instruct-down");
const output = document.querySelector("p#output");

element.addEventListener("scroll", (event) => {
    element.opacity = 0;
})