function main () {
    const params = new URLSearchParams(window.location.search);
    const screen = params.get('screen');

    switch (screen) {
        case 'report':
            let check = params.has('view');
            !check ? alert('Incorrect screen.') : alert('Ok')
            UI.ErrorMessage(_t("verifyReportPage"), 5000);
            break;
        default:
            alert('Incorrect screen.');
            break;
    }
}

main();