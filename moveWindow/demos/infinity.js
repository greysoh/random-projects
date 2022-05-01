let time = 0;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function main() {
    while (true) {
        x = Math.cos(time);
        y = Math.sin(2*time) / 2;

        console.log(x*1000, y*1000);
        window.moveTo(x*1000+50, y*1000);

        await sleep(100);
    }
}

async function timeLoop() {
    while (true) {
        await sleep(1);
        time = time + 1;
    }
}

timeLoop();
main();

