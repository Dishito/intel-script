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
    const units = Object.values(game_data.units);

    //Report data 
    const timeCell = document.querySelectorAll('table.vis tbody')[3].rows[1].cells[1].innerText;
    
    report.reportID = location.search.match(/view=(\d+)/)[1]; 
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

    console.log(report);
}

main();