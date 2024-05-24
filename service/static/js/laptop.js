console.log("Laptop Script Implemented");

async function download_csv(url) {
    const reqOptions = {
        headers: new Headers({
            type: "GET",
            dataType: 'csv',
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
        })
    }
    const resp = await fetch(url, reqOptions)
        .then(resp => resp.text())
        .then(value => Papa.parse(value))
        .catch(err => console.log(err));
    return resp
}

let laptop_data = download_csv("http://127.0.0.1:5050/static/dataset/laptop_info.csv");
laptop_data.then(value => {
    console.log(value.data[1078][0])
})
