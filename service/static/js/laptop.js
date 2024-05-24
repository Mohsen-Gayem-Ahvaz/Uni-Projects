console.log("Laptop Script Implemented");

const laptopInfoUrls = [
    "http://mohsenga.pythonanywhere.com/static/dataset/laptop_info.csv",
    "http://127.0.0.1:5050/static/dataset/laptop_info.csv"
]

async function download_csv(url) {

    const resp = await fetch(url)
        .then(resp => resp.text())
        .then(value => Papa.parse(value))
        .catch(err => console.log(err));

    return resp
}

let laptop_data = download_csv(laptopInfoUrls[0]);
laptop_data.then(value => {
    console.log(value.data)
})
