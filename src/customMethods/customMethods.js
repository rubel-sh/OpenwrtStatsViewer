// Usage:-
// const a2Lite = findDeviceObject(response <- axios, "Mi-A2-Lite");
// console.log(a2Lite);
export const findDeviceObject = (stateOfRawData, deviceName) => {
    const deviceObject = [];
    stateOfRawData.data.map(data => {
        for (let i = 0; i < data.data.length; i++) {
            if (data.data[i].user === deviceName) {
                return deviceObject.push(data.data[i], data.date)
            }
        }
        return deviceObject

    })
    return deviceObject
}
export const formatBytes = (bytes, decimals = 2) => {
    bytes = parseFloat(bytes);
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}