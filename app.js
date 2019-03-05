const inputBox = document.querySelector(".menu .input input");
const outputBox = document.querySelector(".menu .input .output");
const optionBtn = document.querySelector(".menu .option .opt_btn");
const setBtn = document.querySelector(".menu .set .opt_btn");
const saveBtn = document.querySelector(".menu .save .opt_btn");
const clearBtn = document.querySelector(".menu .clear .opt_btn");
const showBtn = document.querySelector(".menu .show .opt_btn");
const calBtn = document.querySelector(".menu .cal #cal_btn");
const minBtn = document.querySelector(".menu .cal #min");
const reloadBtn = document.querySelector(".menu .reload .opt_btn");
const menuBtn = document.getElementsByClassName("opt_hide");
const local = localStorage;

let date = new Date();
let nowMonth = date.getMonth() + 1;
let nowDate = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();
if (nowMonth < 10) {
    nowMonth = "0" + nowMonth;
}

// hide all menu-based buttons
Array.from(menuBtn).forEach(e => {
    e.style.display = "none";
});

// add default style for later use
optionBtn.style.color = "rgb(255, 255, 255)";
minBtn.style.color = "rgb(255, 255, 255)";

function daysInMonth(year, month) {
    return parseInt(new Date(year, month + 1, 0).getDate());
}

function reload() {
    setTimeout(() => location.reload(), 2000);
}

function pressEffect(btn) {
    if (btn.style.color == "rgb(255, 255, 255)") {
        btn.style.color = "#0aa1ed";
        btn.style.border = "5px solid #0aa1ed";
        btn.style.backgroundColor = "#fff";
    } else {
        btn.style.color = "#fff";
        btn.style.border = "5px solid #fff";
        btn.style.backgroundColor = "#292c34";
    }
}

// option button
optionBtn.addEventListener('click', function() {
    pressEffect(optionBtn);

    Array.from(menuBtn).forEach(e => {
        if(e.style.display == "none") { 
            e.style.display = "block";
        } else {
            e.style.display = "none";
        }
    });
});

//set button
setBtn.addEventListener('click', () => {
    let money = inputBox.value;
    local.setItem("myAccount", money);
    outputBox.innerHTML = `Done Setting!`;
    reload();
});

// save button
saveBtn.addEventListener('click', () => {
    let deposit = parseInt(inputBox.value);
    let account = parseInt(local.getItem('myAccount'));
    let newBalance = account + deposit;
    local.setItem('myAccount', newBalance);
    outputBox.innerHTML = `Done Recording!`;
    reload();
});

// display balance button
showBtn.addEventListener('click', () => {
    let balance = local.getItem("myAccount");
    outputBox.innerHTML = `balance : ${balance}`;
});

// calculate button
calBtn.addEventListener('click', () => {
    let left = local.getItem("myAccount");
    let remain = daysInMonth(year, month);
    remain -= date.getDate();
    if(minBtn.style.backgroundColor == "rgb(255, 255, 255)") {
        left -= 3000;
    }
    left /= remain;
    left = left.toFixed(4);
    outputBox.innerHTML = `${remain} days spend ${left} each`;
});

// min button change css function
minBtn.addEventListener('click', () => {
    pressEffect(minBtn);
});

// clear button
clearBtn.addEventListener('click', () => {
    let check = confirm(`Are you sure you want to clear data?`);
    if (check) local.clear();
    reload();
});

// reload button
reloadBtn.addEventListener('click', () => location.reload());