const imitateSearchTime = require('./imitateSearchTime');
const imitateInformationReadingVolume = require("./imitateInformationReadingVolume");

const A = 0.2;
const B = 1.4;

// Скорость считывания информации с диска V = 10 Мбит/с
// 1 символ занимает 1 байт = 8 бит -> V = 10/8 * 10^6 символов / с
const V = 10e6 / 8 // символов / с

function imitateRequestToDBDuration() {
    let requestDurartion = 0;

    // поиск информации в БД1
    requestDurartion += imitateSearchTime(A, B, Math.random());

    if (Math.random() > 0.6) {
        // поиск информации в БД2
        requestDurartion += imitateSearchTime(A, B, Math.random());

        if (Math.random() > 0.8) {
            // поиск информации в БД3
            requestDurartion += imitateSearchTime(A, B, Math.random());
        }
    }

    // время считывания информации
    const informationValue = imitateInformationReadingVolume(Math.random())
    requestDurartion += ((informationValue / V) * 1000) // сек -> мс

    return requestDurartion; //МС
}


module.exports = imitateRequestToDBDuration;
    