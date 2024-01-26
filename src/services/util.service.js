import ColorThief from 'colorthief'

export const utilService = {
    makeId,
    getImgUrl,
    makeLorem,
    getRandomIntInclusive,
    debounce,
    randomPastTime,
    saveToStorage,
    loadFromStorage,
    getDateToDisplay,
    getDominantColorFromImage,
    darkenColor

}

function getMonthName(date) {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ]
    return monthNames[date.getMonth()]
}


function getDateToDisplay(timestamp, isFullDate = false) {
    const date = new Date(timestamp)
    const minutes = date.getMinutes()
    const hours = date.getHours()
    const year = date.getFullYear()
    const month = date.getMonth()
    const dayOfMonth = date.getDate()

    if (isFullDate) {
        return `${getMonthName(date)} ${dayOfMonth}, ${year}`
    }

    const currentDate = new Date();
    /*check if today*/
    if ((dayOfMonth === currentDate.getDate() &&
        month === currentDate.getMonth() &&
        year === currentDate.getFullYear())) {
        return `${hours}:${minutes.toString().padStart(2, '0')}`
    }
    /*this year*/
    if (year == currentDate.getFullYear()) {
        return `${getMonthName(date)} ${dayOfMonth} `
    }
    /*not this year*/
    return `${year}`
}

function getImgUrl(name) {
    const path = `/src/assets/imgs/${name}`
    const modules = import.meta.glob('/src/assets/imgs/*', { eager: true })
    const mod = modules[path]
    return mod.default
}

/*--------color manipulation ---------------*/

async function getDominantColorFromImage(imageUrl) {
    const colorThief = new ColorThief()
    const image = new Image()
    image.crossOrigin = 'Anonymous'
    image.src = imageUrl

    return new Promise((resolve, reject) => {
        image.onload = () => {
            const dominantColor = colorThief.getColor(image);
            const relaxedColor = _relaxColor(dominantColor, 100);
            resolve(`rgb(${relaxedColor[0]}, ${relaxedColor[1]}, ${relaxedColor[2]})`);
        }

        image.onerror = () => {
            reject('Error loading image');
        }
    })
}


function _relaxColor(color, relaxationFactor) {
    const [r, g, b] = color;

    // Calculate the relaxed RGB values by reducing each channel
    const relaxedR = r - relaxationFactor;
    const relaxedG = g - relaxationFactor;
    const relaxedB = b - relaxationFactor;

    // Ensure that RGB values are within the valid range [0, 255]
    const relaxedColor = [
        Math.max(0, Math.min(255, relaxedR)),
        Math.max(0, Math.min(255, relaxedG)),
        Math.max(0, Math.min(255, relaxedB)),
    ];

    return relaxedColor;
}

function darkenColor(rgbString, darkenPercent=40) {
    // Parse the RGB string to extract red, green, and blue values
    const rgbValues = rgbString.match(/\d+/g).map(Number);

    // Calculate the darkened values
    const darkened = rgbValues.map(value => {
        return Math.max(Math.min(Math.floor(value * (1 - darkenPercent / 100)), 255), 0);
    });

    // Combine the darkened values back into an RGB string
    return `rgb(${darkened[0]}, ${darkened[1]}, ${darkened[2]})`;
}


//-----------------------------------------------------------------












function makeId(length = 6) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }

    return txt
}

function makeLorem(size = 100) {
    var words = ['The sky', 'above', 'the port', 'was', 'the color of television', 'tuned', 'to', 'a dead channel', '.', 'All', 'this happened', 'more or less', '.', 'I', 'had', 'the story', 'bit by bit', 'from various people', 'and', 'as generally', 'happens', 'in such cases', 'each time', 'it', 'was', 'a different story', '.', 'It', 'was', 'a pleasure', 'to', 'burn']
    var txt = ''
    while (size > 0) {
        size--
        txt += words[Math.floor(Math.random() * words.length)] + ' '
    }
    return txt
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min //The maximum is inclusive and the minimum is inclusive 
}


function randomPastTime() {
    const HOUR = 1000 * 60 * 60
    const DAY = 1000 * 60 * 60 * 24
    const WEEK = 1000 * 60 * 60 * 24 * 7

    const pastTime = getRandomIntInclusive(HOUR, WEEK)
    return Date.now() - pastTime
}

function debounce(func, timeout = 300) {
    let timer
    return (...args) => {
        clearTimeout(timer)
        timer = setTimeout(() => { func.apply(this, args) }, timeout)
    }
}

function saveToStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function loadFromStorage(key) {
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

