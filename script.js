let submitBtn = document.getElementById("submitBtn");
let input = document.getElementsByClassName("inputValue");
let emptyError = document.getElementsByClassName("empty");
let invalidError = document.getElementsByClassName("invalid");
let label = document.getElementsByClassName("label");
let style = document.createElement("style");

submitBtn.addEventListener("click", function() {
    for (let i = 0; i < input.length; i++) {
        let inputValue = input[i].value;

        if (inputValue.length == 0) {
            emptyError[i].style.display = "block";
            error();
        }

        if(i === 0) {
            if(inputValue[i] > 31 || inputValue[i] < 1) {
                invalidError[i].style.display = "block";
                error();
            }
        }
    }
});

function error() {
    for(let i = 0; i < input.length; i++) {
        input[i].style.borderColor = "var(--primaryLighterColor)";
        label[i].style.color = "var(--primaryLighterColor)";
        style.innerHTML = `
            .inputValue::placeholder {
                color: var(--primaryLighterColor);
            }
            `;
        document.head.appendChild(style);
    }
}

for (let i = 0; i < input.length; i++) {
    input[i].addEventListener("click", function() {
        emptyError[i].style.display = "none";
        input[i].style.borderColor = "var(--naturalLighterColor)";
        label[i].style.color = "var(--naturalSmokeColor)";
        style.innerHTML = `
            .inputValue::placeholder {
                color: var(--naturalSmokeColor);
            }
        `;
        document.head.appendChild(style);
    });
}
