

const laptopInfoUrls = [
    "http://mohsenga.pythonanywhere.com/static/dataset/laptop_info.csv",
    "http://127.0.0.1:5050/static/dataset/laptop_info.csv"
];
var laptopTb;
var laptopData = [];

async function download_csv(url) {
    const resp = await fetch(url)
        .then(resp => resp.text())
        .then(value => Papa.parse(value))
        .catch(err => console.log(err));

    return resp;
}

async function reloadData(){
    let csvResp = download_csv(laptopInfoUrls[1]);

    await csvResp.then((value) => {
        laptopTb = document.getElementById("laptops-tbody");
        laptopData = value.data;

        for (let index = 0; index <= laptopData.length-1; index+=1){
            let currRow = laptopTb.insertRow(index)
            currRow.insertCell(0).innerHTML = index;

            for (let cell = 0; cell <= 5;cell+=1){
                currRow.insertCell(cell+1).innerHTML = laptopData[index][cell];
            }

        }
    })
}

window.addEventListener("DOMContentLoaded", function() {
    reloadData()
}, false);
