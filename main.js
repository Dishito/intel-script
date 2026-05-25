const main = async () => {
    const db = await initDB();

    const params = new URLSearchParams(window.location.search);
    const screen = params.get('screen');

    switch (screen) {
        case 'report':
            if (validReport()) process(db);
            break;
        default:
            UI.ErrorMessage("Incorrect screen.", 5000);
            break;
    }
}

const initDB = () => {
    return new Promise((resolve, reject) => {
        const req = indexedDB.open("intelliDB", 1);

        req.onupgradeneeded = () => {
            const db = req.result;

            if (!db.objectStoreNames.contains('reports')) { 
                db.createObjectStore('reports', {keyPath: 'reportID'}); 
            }
            if (!db.objectStoreNames.contains('villages')) { 
                db.createObjectStore('villages', {keyPath: 'villageID'}); 
            }
        };

        req.onerror = () => {
            console.error("Error", req.error);
            reject(req.error);
        };

        req.onsuccess = () => {
            const db = req.result;

            db.onversionchange = () => {
                db.close();
                alert("La base de datos está desactualizada, por favor recargue la página.")
            };

            resolve(db);
        };
    });
}

const validReport = () => {
    if (!document.querySelector('.report_ReportAttack')) {
        UI.ErrorMessage("Please, open a valid battle report.", 5000);
        return false;
    }
    return true;
}

const process = (db) => {
    const report = {
        reportID: null,
        reportTime: null,
        attName: null,  
        attID: null,    
        attVillage: null, 
        attVillageID: null,
        attUnitsQ: {},  
        attUnitsL: {},
        defName: null,  
        defID: null,    
        defVillage: null,
        defVillageID: null,
        defUnitsQ: {},  
        defUnitsL: {},
        buildings: {},
        resources: null,
    };

    report.reportID = location.search?.match(/view=(\d+)/)?.[1] ?? null;
    
    extractData(report);
    saveReport(report, db);
}

const extractData = (report) => {
    const units = Object.values(game_data.units);

    //Report data 
    const timeRow = document.querySelectorAll('table.vis tbody')[3];
    report.reportTime = timeRow?.rows[1]?.cells[1]?.innerText ?? null;    
    

    // Attacker
    const attacker = document.getElementById('attack_info_att');

    const attLinks = attacker?.querySelectorAll('a');
    report.attName = attLinks?.[0]?.textContent;
    report.attID = attLinks?.[0]?.href.match(/id=(\d+)/)?.[1];
    report.attVillage = attLinks?.[1]?.textContent.match(/(\d+)\|(\d+)/g)?.[0] ?? null;
    
    const attUnitsQ = document.querySelector('#attack_info_att_units tr:nth-of-type(2)');
    const attUnitsL = document.querySelector('#attack_info_att_units tr:nth-of-type(3)');

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

const saveReport = (report, db) => {
    const tx = db.transaction('reports', 'readwrite');
    const reports = tx.objectStore('reports');
    const request = reports.add(report);

    request.onsuccess = () => {
        console.log("Report saved successfully.");
    };

    request.onerror = () => {
        console.error("Error saving report", request.error);
    };
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



const openRequest = indexedDB.open("inteliDB", 1);

openRequest.onupgradeneeded = function() {
    const db = openRequest.result;

    if (!db.objectStoreNames.contains('reports')) { 
        db.createObjectStore('reports', {keyPath: 'reportID'}); 
    }

    if (!db.objectStoreNames.contains('villages')) { 
        db.createObjectStore('villages', {keyPath: 'villageID'}); 
    }
};

openRequest.onerror = function() {
  console.error("Error", openRequest.error);
};

openRequest.onsuccess = function() {
    const db = openRequest.result;

    db.onversionchange = function() {
        db.close();
        alert("La base de datos está desactualizada, por favor recargue la página.")
    };
};




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