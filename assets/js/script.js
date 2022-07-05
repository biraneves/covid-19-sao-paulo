function formatNumber(num) {

    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1&nbsp;');

}

async function fetchCovidData() {

    const fetchInit = {
        method: 'GET',
    };

    const res = await fetch("https://covid19-brazil-api.vercel.app/api/report/v1/brazil/uf/sp", fetchInit);
    const rec = await res.json();

    let date = new Date(rec.datetime)

    let day = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate());
    let month = ((date.getMonth() + 1) < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1);
    let year = date.getFullYear();

    document.getElementById("date").innerHTML = day + "/" + month + "/" + year;
    document.getElementById("cases").innerHTML = formatNumber(rec.cases);
    document.getElementById("deaths").innerHTML = formatNumber(rec.deaths);
    document.getElementById("suspects").innerHTML = formatNumber(rec.suspects);

}

fetchCovidData();