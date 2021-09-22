function imitateInformationReadingVolume(R) {
    if (R >= 0 && R < 0.2) {
        return Math.floor((R + 0.2) / 0.001);
    } else if (R >= 0.2 && R < 0.8) {
        return Math.floor((R + 0.4) / 0.0015);
    } else if (R >= 0.8 && R < 1) {
        return Math.floor((R - 0.4) / 0.0005);
    }

    throw("parametr R has warong value! ") //Erorr;
}

module.exports = imitateInformationReadingVolume;
    