function validReport() {
    if (!document.querySelector('.report_ReportAttack')) {
        UI.ErrorMessage("Please, open a valid battle report.", 5000);
        return false;
    }
    return true;
}

function extractDataFromReport() {
    const report = {};
    
    //Report
    report.reportID = location.search.match(/view=(\d+)/)[1]; 
    report.time = document.querySelector('table.vis'); 

    // Attacker
    const attacker = document.getElementById('attack_info_att');
    const attLinks = attacker.querySelectorAll('a');
    report.attackerName = attLinks[0].textContent;
    report.attackerID = attLinks[0].href.match(/id=(\d+)/)[1];
    report.attackerVillage = attLinks[1].textContent.match(/(\d+)\|(\d+)/g)[0];
    
    // Defender
    const defender = document.getElementById('attack_info_def');
    const defLinks = defender.querySelectorAll('a');
    report.defenderName = defLinks[0].textContent;
    report.defenderID = defLinks[0].href.match(/id=(\d+)/)[1];
    report.defenderVillage = defLinks[1].textContent.match(/(\d+)\|(\d+)/g)[0];
    
    console.log(report);
}

function main () {
    const params = new URLSearchParams(window.location.search);
    const screen = params.get('screen');

    switch (screen) {
        case 'report':
            validReport() ? extractDataFromReport() : null;
            break;
        default:
            UI.ErrorMessage("Incorrect screen.", 5000);
            break;
    }
}

main();