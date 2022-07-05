// Use of a regular expression to format a number with Brazilian rules.
function formatNumber(num) {

    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1&nbsp;');

}

async function fetchCovidData() {

    // Init configuration for fetch function. Here, we assure the use of method GET to call the API.
    const fetchInit = {
        method: 'GET',
    };

    // The API with Covid-19 data for the state of Sao Paulo, Brazil
    const res = await fetch("https://covid19-brazil-api.vercel.app/api/report/v1/brazil/uf/sp", fetchInit);
    const rec = await res.json();

    // Preparing date to be showed
    let date = new Date(rec.datetime)
    let hours = ((date.getHours() + 3) < 10 ? "0" + (date.getHours() + 3) : date.getHours() + 3); // Adjust for Sao Paulo timezone
    let minutes = (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes());
    let day = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());
    let month = ((date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1);
    let year = date.getFullYear();

    // Data presentation
    document.getElementById("date").innerHTML = day + "/" + month + "/" + year + "<br>" + hours + "h " + minutes + "min"; 
    document.getElementById("cases").innerHTML = formatNumber(rec.cases);
    document.getElementById("deaths").innerHTML = formatNumber(rec.deaths);
    document.getElementById("suspects").innerHTML = formatNumber(rec.suspects);
    document.getElementById("refuses").innerHTML = formatNumber(rec.refuses);

}

fetchCovidData();