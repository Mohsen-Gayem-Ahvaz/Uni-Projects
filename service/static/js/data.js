const laptopInfoUrls = [
    "http://mohsenga.pythonanywhere.com/static/dataset/laptop_info.csv",
    "http://127.0.0.1:5050/static/dataset/laptop_info.csv"
];
let laptopTb;
let laptopTbCont;
let laptopTbLoaing;
let queryForm;
let higherPriceInput;
let lowerPriceInput;

let laptopData = [];
let orderedPrices = [];

async function download_csv(url) {
    const resp = await fetch(url)
        .then(resp => resp.text())
        .then(value => Papa.parse(value))
        .catch(err => console.log(err));

    return resp;
}

async function reloadData(){
    let csvResp = download_csv(laptopInfoUrls[0]);
    await csvResp.then((value) => {
        if (value.errors.length > 0){
            console.log(value.errors)
            return;
        }

        laptopData = value.data;
        laptopData.shift();
        laptopData.pop();
        for (let index = 0; index < laptopData.length ; index++){
            let currRow = laptopTb.insertRow(index)
            currRow.insertCell(0).innerHTML = index+1;
            for (let cell = 0; cell <= 5;cell+=1){
                currRow.insertCell(cell+1).innerHTML = laptopData[index][cell];
            }
            orderedPrices.push(currRow.cells[6].innerHTML);
            orderedPrices.sort();
        }
        laptopTbLoaing.style.display = "none";
        laptopTbCont.style.display = "block";
    }).catch(err => {
        console.log(err)
    })
}

function getAvg(){
    var avgResultEl = document.getElementById("avg-result");
    let total = 0.0;
    let avg = 0.0;
    for (let index = 0; index < laptopTb.rows.length ;index++){
        let currCell = laptopTb.rows[index].cells[6].innerHTML
        total += parseFloat(currCell);
    }
    avg = total/laptopTb.rows.length;
    avgResultEl.innerHTML = `Avg : ${avg.toFixed(4)}`;
    return avg;
}

function getVariance(){
    var varianceResultEl = document.getElementById("variance-result");
    let avg = getAvg();
    let total = 0.0;
    let variance = 0.0;
    for (let index = 0; index < laptopTb.rows.length ;index++){
        let currCell = laptopTb.rows[index].cells[6].innerHTML;
        //console.log(`Pow(${parseFloat(currCell)} - ${avg}): ${Math.pow(parseFloat(currCell) - avg, 2)}`);
        total += Math.pow(parseFloat(currCell) - avg, 2);
    }
    variance = total/laptopTb.rows.length;
    varianceResultEl.innerHTML = `Variance : ${variance.toFixed(4)}`;
    return variance;
}

function markHigherPrices(){
    let perc = parseFloat(higherPriceInput.value)
    let higherLimitIndex = ((perc*orderedPrices.length)/100).toFixed(0);
    let higherLimit = orderedPrices[orderedPrices.length - higherLimitIndex]
    for (let index = 0; index < laptopTb.rows.length ;index++){
        let currCell = laptopTb.rows[index].cells[6];
        if(window.getComputedStyle(currCell).backgroundColor === "rgb(239, 123, 123)"){
            currCell.style.backgroundColor = "transparent";
        }
        if (parseFloat(currCell.innerHTML) >= higherLimit){
            currCell.style.backgroundColor = "rgb(239, 123, 123)";
        }
    }
}

function markLowerPrices(){
    let perc = parseFloat(lowerPriceInput.value)
    let lowerLimitIndex = ((perc*orderedPrices.length)/100).toFixed(0) - 1;
    let lowerLimit = orderedPrices[lowerLimitIndex]
    for (let index = 0; index < laptopTb.rows.length ;index++){
        let currCell = laptopTb.rows[index].cells[6];
        if(window.getComputedStyle(currCell).backgroundColor === "rgb(236, 236, 125)"){
            currCell.style.backgroundColor = "transparent";
        }
        if (parseFloat(currCell.innerHTML) <= lowerLimit){
            currCell.style.backgroundColor = "rgb(236, 236, 125)";
        }
    }
}

window.addEventListener("DOMContentLoaded", async () => {
    laptopTb = document.getElementById("laptops-tbody");
    laptopTbCont = document.getElementById("laptops-table-container");
    laptopTbLoaing = document.getElementById("laptops-table-loading");
    higherPriceInput = document.getElementById("higher-price-input");
    lowerPriceInput = document.getElementById("lower-price-input");
    queryForm = document.getElementById("query-form");
    queryForm.addEventListener("submit", event => { event.preventDefault(); })
    await reloadData();
}, false);
