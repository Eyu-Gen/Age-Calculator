let submitBtn = document.getElementById("submitBtn");
let inputs = document.getElementsByClassName("inputValue");
let emptyError = document.getElementsByClassName("empty");
let invalidError = document.getElementsByClassName("invalid");
let labels = document.getElementsByClassName("label");
let style = document.createElement("style");
let isValid = true;

submitBtn.addEventListener("click", function() {
    isValid = true; 

    for (let i = 0; i < inputs.length; i++) {
        let inputValue = inputs[i].value;
        let inputName = inputs[i].getAttribute("name");

        if (inputValue.length == 0) {
            emptyError[i].style.display = "block";
            invalidError[i].style.display = "none";
            isValid = false;
            error();
        } else if ((inputName === "day" && (inputValue < 1 || inputValue > 31) ||
                   (inputName === "month" && (inputValue < 1 || inputValue > 12))) ||
                   (inputName === "year" && (inputValue < 1924 || inputValue > new Date().getFullYear()))) {
            invalidError[i].style.display = "block";
            emptyError[i].style.display = "none";
            isValid = false;
            invalid(i);
        } else {
            emptyError[i].style.display = "none";
            invalidError[i].style.display = "none";
        }
    }

    if (isValid) {
        calculateAge();
    }

    function error() {
        for(let i = 0; i < inputs.length; i++) {
            inputs[i].style.borderColor = "var(--primaryLighterColor)";
            labels[i].style.color = "var(--primaryLighterColor)";
            style.innerHTML = `
                .inputValue::placeholder {
                    color: var(--primaryLighterColor);
                }
            `;
            document.head.appendChild(style);
        }
    }

    function invalid(i) {
        inputs[i].style.borderColor = "var(--primaryLighterColor)";
        inputs[i].style.color = "var(--primaryLighterColor)";
        labels[i].style.color = "var(--primaryLighterColor)";
    }
});

for (let i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener("click", function() {
        emptyError[i].style.display = "none";
        invalidError[i].style.display = "none";
        inputs[i].style.borderColor = "var(--naturalLighterColor)";
        inputs[i].style.color = "black";
        labels[i].style.color = "var(--naturalSmokeColor)";
        style.innerHTML = `
            .inputValue::placeholder {
                color: var(--naturalSmokeColor);
            }
        `;
        document.head.appendChild(style);
    });
}

function calculateAge() {
    let date = parseInt(document.querySelector('[name="day"]').value);
    let month = parseInt(document.querySelector('[name="month"]').value) - 1; 
    let year = parseInt(document.querySelector('[name="year"]').value);
    
    let today = new Date();
    
    let y = today.getFullYear() - year;
    let m = today.getMonth() - month;
    let d = today.getDate() - date;
    
    if (d < 0) {
        m--;
        let prevMonthLastDay = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        d = prevMonthLastDay + d;
    }

    if (m < 0) {
        y--;
        m = 12 + m;
    }

    let output = document.getElementsByClassName("outputValue");
    output[0].innerHTML = y.toString().padStart(2, '0');
    output[1].innerHTML = m.toString().padStart(2, '0');
    output[2].innerHTML = d.toString().padStart(2, '0');
};

