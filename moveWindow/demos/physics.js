window.moveTo(screen.availWidth, screen.availHeight);
let defaultPos = [window.screenX, window.screenY];

window.moveTo(screen.availWidth, 0);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function physicsTest() {
    let accel = 0;
    while (true) {
        accel = accel + 0.7;

        window.moveBy(0, accel);

        if (window.screenY == defaultPos[1]) {
            accel = 0;
        }

        await sleep(10);
    }
}

physicsTest();