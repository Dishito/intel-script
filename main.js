function main() {
    const params = new URLSearchParams(window.location.search);
    const screen = params.get('screen');

    switch (screen) {
        case 'report':
            validReport() ? processReport() : null;
            break;
        default:
            UI.ErrorMessage("Incorrect screen.", 5000);
            break;
    }
}

function validReport() {
    if (!document.querySelector('.report_ReportAttack')) {
        UI.ErrorMessage("Please, open a valid battle report.", 5000);
        return false;
    }
    return true;
}

function processReport() {
    const report = {attUnitsQ: {}, attUnitsL: {}, defUnitsQ: {}, defUnitsL: {}};

    report.reportID = location.search.match(/view=(\d+)/)[1]; 

    //alreadySaved(report.reportID) ? return : null;
    
    extractData(report);
    //saveReport(report);
}

function extractData(report) {
    const units = Object.values(game_data.units);

    //Report data 
    const timeCell = document.querySelectorAll('table.vis tbody')[3].rows[1].cells[1].innerText;
    report.reportTime = timeCell;    
    

    // Attacker data 
    const attacker = document.getElementById('attack_info_att');
    const attLinks = attacker.querySelectorAll('a');
    const attUnitsQ = document.querySelector('#attack_info_att_units tr:nth-of-type(2)');
    const attUnitsL = document.querySelector('#attack_info_att_units tr:nth-of-type(3)');

    report.attName = attLinks[0].textContent;
    report.attID = attLinks[0].href.match(/id=(\d+)/)[1];
    report.attVillage = attLinks[1].textContent.match(/(\d+)\|(\d+)/g)[0];

    units.forEach(unit => {
        const cell = attUnitsQ.querySelector(`td.unit-item-${unit}`);
        if(cell){
            report.attUnitsQ[unit] = cell.innerText;
        }
    });

    units.forEach(unit => {
        const cell = attUnitsL.querySelector(`td.unit-item-${unit}`);
        if(cell){
            report.attUnitsL[unit] = cell.innerText;
        }
    });
    
    // Defender data 
    const defender = document.getElementById('attack_info_def');
    const defLinks = defender.querySelectorAll('a');
    const defUnitsQ = document.querySelector('#attack_info_def_units tr:nth-of-type(2)');
    const defUnitsL = document.querySelector('#attack_info_def_units tr:nth-of-type(3)');

    report.defName = defLinks[0].textContent;
    report.defID = defLinks[0].href.match(/id=(\d+)/)[1];
    report.defVillage = defLinks[1].textContent.match(/(\d+)\|(\d+)/g)[0];

    units.forEach(unit => {
        const cell = defUnitsQ.querySelector(`td.unit-item-${unit}`);
        if(cell){
            report.defUnitsQ[unit] = cell.innerText;
        }
    });

    units.forEach(unit => {
        const cell = defUnitsL.querySelector(`td.unit-item-${unit}`);
        if(cell){
            report.defUnitsL[unit] = cell.innerText;
        }
    });

    //Village data
    const resoures = document.querySelector('#attack_spy_resources span')?.innerText;

    console.log(report);
}

main();






const d = document.querySelector('#report_export_code');
console.log(d.innerHTML);
const b = d.innerHTML.match(/export](.*?)\[\/report_export\]/);
console.log(b[1]);





var htmlInforme = '<div><table><tbody><tr><td>Enviado: 13.05.26 03:20:43</td><td><img src="https://dses.innogamescdn.com/asset/6ce2ab95/graphic/unit/unit_axe.webp" class="" data-title="Soldado con hacha"></td></tr></tbody></table></div>';

Dialog.show(
    'mi_reporte',
    htmlInforme,  // cadena HTML
    null,
    {
        allow_close: true,
        show_close_button: true,
        auto_width: false,
        overlay: false
    }
);








const deleteRequest = indexedDB.deleteDatabase("inteliDB");

deleteRequest.onsuccess = () => {
    console.log("Se borró correctamente la base de datos.");
}

deleteRequest.onerror = (e) => {
    console.error("Error al borrar la base de datos", e);
}

const openRequest = indexedDB.open("inteliDB", 1);

openRequest.onupgradeneeded = (event) => {
    const db = openRequest.result;

    db.createObjectStore('reports',{keyPath: 'reportID'});
    console.log(db);
}

openRequest.onsuccess = (event) => {
    console.log("Open correcto.");
}

openRequest.onblocked = (event) => {
    console.log("Error al abrir la base de datos. Recargue la pestaña.");
}