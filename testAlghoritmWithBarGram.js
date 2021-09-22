const babar = require('babar');

function testAlghoritmWithBarGram(d, boundaries, functionToTest, n = 10000) {
    const k = boundaries.length;
    const relativefFequencies = new Array(k).fill(0);
    const frequencies = new Array(k).fill(0);

    for (let i = 0; i < n; i++) {
        const x = functionToTest();

        for (let j = 0; j < k; j++) {
            if (x > boundaries[j] && (x <= boundaries[j + 1])) {
                frequencies[j]++;
            }
        }
    }

    for (let i = 0; i < k; i++) {
        relativefFequencies[i] = frequencies[i] / (n * d);
    }

    const stats = [];

    for (let i = 0; i < k - 1; i++) {
        stats.push({
            "Интревал": `${boundaries[i]} - ${boundaries[i + 1]}`,
            "Частота, mi": frequencies[i],
            "Относительная частота, fi": relativefFequencies[i],
        })
    }

    console.table(stats);

    let resToDraw = relativefFequencies.map((f, i) => ([boundaries[i], f]));
    // resToDraw.forEach((res) => console.log(res));

    console.log(babar(resToDraw, {
    color: 'green',
    grid: 'white',
    width: 100,
    height: 20,
    minX: boundaries[0],
    caption: 'f(x)',
    }));
}

module.exports = testAlghoritmWithBarGram;
    