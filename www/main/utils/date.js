export function getDatetime(currentdate, isFilename) {
        let date =
            (currentdate.getFullYear() < 10 ? '0' : '') + currentdate.getFullYear() + "-"
            + ((currentdate.getMonth() + 1) < 10 ? '0' : '') + (currentdate.getMonth() + 1) + "-"
            + (currentdate.getDate() < 10 ? '0' : '') + currentdate.getDate();
        let datetime =
            date + (isFilename === true ? '_' : ' ')
            + (currentdate.getHours() < 10 ? '0' : '') + currentdate.getHours() + (isFilename === true ? "-" : ":")
            + (currentdate.getMinutes() < 10 ? '0' : '') + currentdate.getMinutes() + (isFilename === true ? "-" : ":")
            + (currentdate.getSeconds() < 10 ? '0' : '') + currentdate.getSeconds() + (isFilename === true ? "" : ":")
            + (currentdate.getMilliseconds() < 100 ? (currentdate.getMilliseconds() < 10 ? '00' : '0') : '') + (isFilename === true ? "" : + currentdate.getMilliseconds());
        return datetime;
}

export function getDate(currentdate) {
    let date =
        (currentdate.getFullYear() < 10 ? '0' : '') + currentdate.getFullYear() + "-"
        + ((currentdate.getMonth() + 1) < 10 ? '0' : '') + (currentdate.getMonth() + 1) + "-"
        + (currentdate.getDate() < 10 ? '0' : '') + currentdate.getDate();
    return date;
}