const DATE_UNITS = {
    year: 60 * 60 * 24 * 365,
    month: 60 * 60 * 24 * 30,
    day: 60 * 60 * 24,
    hour: 60 * 60,
    minute: 60,
    second: 1,
}

/**
 * @param {number} timestamp evento que ocurrio hace un determinado tiempo en milisegundos
*/
const getSeconds = (timestamp: number | string) => {
    if (typeof timestamp === 'string')
        timestamp = parseInt(timestamp)

    const timePassed = (Date.now() - timestamp) / 1000
    return timePassed
}


const getUnitAndValueDate = (timePassed: number | string) => {
    if (typeof timePassed === 'string')
        timePassed = parseInt(timePassed)
    for (const [unit, secondsInUnit] of Object.entries(DATE_UNITS)) {
        if (timePassed > secondsInUnit || unit === 'second') {
            const value = Math.floor(timePassed / secondsInUnit) * -1
            return { value, unit }
        }
    }
}

export const getTimeAgo = (timestamp: number | string) => {
    if (typeof timestamp === 'string')
        timestamp = parseInt(timestamp)

    const rtf = new Intl.RelativeTimeFormat("en", { localeMatcher: 'best fit', style: "long" });
    const timePassed = getSeconds(timestamp)
    const { value, unit } = getUnitAndValueDate(timePassed)
    console.log(value, unit)
    return rtf.format(value, unit)
}