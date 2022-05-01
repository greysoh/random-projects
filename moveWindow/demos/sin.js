async function main() {
    const twoPi = Math.PI * 2;
    const screenSize = [screen.availWidth, screen.availHeight];
    const height = (screenSize[1] / 2) - 10;
    const width = screenSize[0];

    for (var x = 0; x < width*1.47; x++) {
        let y = height * Math.sin((twoPi * x) / width) + height;

        window.moveTo(x/2, y/2);
    }
}

main();