const imitateSearchTime = require('./imitateSearchTime');
const imitateInformationReadingVolume = require("./imitateInformationReadingVolume");
const testAlghoritmWithBarGram = require("./testAlghoritmWithBarGram");
const testAlghoritmWithChiSquare = require("./testAlghoritmWithChiSquare");
const imitateRequestToDBDuration = require("./imitateRequestToDBDuration");

const A = 0.2;
const B = 1.4;


// 1.2.2

// Тест алгоритма имитации времени поиска:
const imitateSearchTimeResults = [];
for (let i = 0; i < 5; i++) {
    imitateSearchTimeResults.push(imitateSearchTime(A, B, Math.random()));
}

console.log("имитация времени поиска:")
console.table(imitateSearchTimeResults);

// Тест алгоритма имитации объёма чтения информации: :
const imitateInformationReadingVolumeResults = [];
for (let i = 0; i < 5; i++) {
    imitateInformationReadingVolumeResults.push(imitateInformationReadingVolume(Math.random()));
}

console.log("имитация объёма чтения информации:")
console.table(imitateInformationReadingVolumeResults);


// 1.2.3 
// 1. Проверка алгоритмов на основе гистограммы

// 1) Проверка алгоритма имитации времени поиска:
// Xmin = 0.2, Xmax = 1.4. Разобьём диапазон на 
// k = 12 интервалов, d = 0.1 ([0.2; 0.3], [0.3; 0.4] ... [1.3; 1.4])
console.log("\n\n");

const boundaries1 = [0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0, 1.1, 1.2, 1.3, 1.4];
console.log("Проверка алгоритма имитации времени поиска:");
testAlghoritmWithBarGram(0.1, boundaries1, () => {
    return imitateSearchTime(A, B, Math.random());
});

console.log("\n\n");

// 2) Проверка алгоритма имитации времени поиска:
// Xmin = 200, Xmax = 1200. Разобьём диапазон на 
// k = 10 интервалов, d = 100 ([200; 300], [300; 400] ... [1100; 1200])
const boundaries2 = [200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200];

console.log("\n\n");

console.log("Проверка алгоритма имитации объёма чтения информации:");
testAlghoritmWithBarGram(100, boundaries2, () => {
    return imitateInformationReadingVolume(Math.random());
});

console.log("\n\n");

// 2. Проверка алгоритмов на основе хи-квадрат

// 1) Проверка алгоритма имитации времени поиска:
// Xmin = 0.2, Xmax = 1.4. Разобьём диапазон на 
// k = 12 интервалов, d = 0.1 ([0.2; 0.3], [0.3; 0.4] ... [1.3; 1.4])
console.log("\n\n");

console.log("Проверка алгоритма имитации времени поиска:");
testAlghoritmWithChiSquare(boundaries1, (a, b) => {
    // F(b) - F(a)

    const F = (x) => {
        if (x < A) { 
            return 0;
        } else if (x >= A && x < B) {
            return (x - A) / (B - A);
        } else {
            return 1;
        }
    }

    return (F(b) - F(a));
}, () => {
    return imitateSearchTime(A, B, Math.random());
});

console.log("\n\n");

// 2) Проверка алгоритма имитации времени поиска:
// Xmin = 200, Xmax = 1200. Разобьём диапазон на 
// k = 10 интервалов, d = 100 ([200; 300], [300; 400] ... [1100; 1200])

console.log("\n\n");

console.log("Проверка алгоритма имитации объёма чтения информации:");
testAlghoritmWithChiSquare(boundaries2, (a, b) => {
    // F(b) - F(a)

    const F = (x) => {
        if (x < 200) { 
            return 0;
        } else if (x >= 200 && x < 400) {
            return (0.001 * x - 0.2);
        } else if (x >= 400 && x < 800) {
            return (0.0015 * x - 0.4);
        } else if (x >= 800 && x < 1200) {
            return (0.0005 * x + 0.4);
        } else {
            return 1;
        }
    }

    return (F(b) - F(a));
} ,() => {
    return imitateInformationReadingVolume(Math.random());
});

console.log("\n\n");



// 1.2.5 Решение задачи на основе метода Монте-Карло.
console.log("Решение задачи на основе метода Монте-Карло:");
const numberOfImitations = 20000;
const imitatedDurations = [];
let sumDuration = 0;
let numberOfDurationMoreThen3ms = 0;

for (let i = 0; i < numberOfImitations; i++) {
    const requestDuration = imitateRequestToDBDuration();

    sumDuration += requestDuration;
    imitatedDurations.push({"Время Запроса, МС:": requestDuration});

    if (requestDuration > 3) {
        numberOfDurationMoreThen3ms++;
    }
}


console.log("Перывые 10 имитаций: ");
console.table(imitatedDurations.slice(0, 10));

const averageRequestDuration = sumDuration / numberOfImitations;

console.log(`а) Среднее время запроса: ${averageRequestDuration} мс.`);
console.log(`б) вероятность того, что время ответа на запрос превысит 3 мс: ${
        numberOfDurationMoreThen3ms / numberOfImitations
}`);
