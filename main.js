function validReport() {
    if (!document.querySelector('.report_ReportAttack')) {
        UI.ErrorMessage("Please, open a valid battle report.", 5000);
        return false;
    }
    return true;
}

function extractDataFromReport() {
    const report = {};
    
    const attacker = document.getElementById('attack_info_att');
    const defender = document.getElementById('attack_info_def');
    
    // Atacante
    const attLinks = attacker.querySelectorAll('a');
    report.attacker = attLinks[0].textContent;
    report.attackerVillage = attLinks[1].textContent.match(/(\d+)\|(\d+)/)[0];
    
    // Defensor
    const defLinks = defender.querySelectorAll('a');
    report.defender = defLinks[0].textContent;
    report.defenderVillage = defLinks[1].textContent.match(/(\d+)\|(\d+)/)[0];
    
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