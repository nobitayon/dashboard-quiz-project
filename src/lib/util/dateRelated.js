function parseStringIntoISO(theTime, timeZoneOffset) {
    let now
    if (theTime === null) {
        now = new Date();
    } else {
        now = new Date(theTime)
    }

    const adjustedTime = new Date(now.getTime() + (timeZoneOffset * 60000));
    const year = adjustedTime.getFullYear();
    const month = String(adjustedTime.getMonth() + 1).padStart(2, '0');
    const day = String(adjustedTime.getDate()).padStart(2, '0');
    const hours = String(adjustedTime.getHours()).padStart(2, '0');
    const minutes = String(adjustedTime.getMinutes()).padStart(2, '0');
    const seconds = String(adjustedTime.getSeconds()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
}

export function convertToUnix(dateStringUTC){
    let isoSometime = parseStringIntoISO(dateStringUTC, -420)
    isoSometime = new Date(isoSometime)
    return isoSometime.getTime()
}

export function convertDateNowToUnix(){
    let isoNow = parseStringIntoISO(new Date(), 0)
    isoNow = new Date(isoNow)
    return isoNow.getTime()
}




export default {convertToUnix, convertDateNowToUnix}