// const chi = require('chi-squared');

function testAlghoritmWithChiSquare(boundaries, getProbabilityForRange, functionToTest, n = 1000) {
    const k = boundaries.length;
    const frequencies = new Array(k).fill(0);
    const probablities = new Array(k).fill(0);

    for (let i = 0; i < n; i++) {
        const x = functionToTest();

        for (let j = 0; j < k - 1; j++) {
            if (x > boundaries[j] && (x <= boundaries[j + 1])) {
                frequencies[j]++;
            }
        }
    }

    for (let i = 0; i < k - 1; i++) {
        probablities[i] = getProbabilityForRange(boundaries[i], boundaries[i + 1]);
    }

    let factChi2 = 0;

    for (let i = 0; i < k - 1; i++) {
        factChi2 += (Math.pow(frequencies[i], 2) / (n * probablities[i]));
    }

    factChi2 -= n;

    console.log("хи-квадрат: ", factChi2, ", альфа = ", 0.05, ", s = ", k - 1); 
}

module.exports = testAlghoritmWithChiSquare;
    