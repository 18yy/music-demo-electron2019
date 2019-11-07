export function MillisecondToDate (time) {
    time = time/1000;
    let timeStr = '';
    let stringFormat = (i) => {
        return i < 10 ? `0${i}` : `${i}`;
    }
    let minuteTime = 0;
    let secondTime = 0;
    let hourTime = 0;
    if(time < 60) {
        timeStr = `00:${stringFormat(time)}`
    } else if(time >= 60 && time < 3600) {
        minuteTime = parseInt(time / 60);
        secondTime = parseInt(time % 60);
        timeStr = `${stringFormat(minuteTime)}:${stringFormat(secondTime)}`;
    } else if(time >= 3600) {
        let _t = parseInt(time % 3600);
        hourTime = parseInt(time / 3600);
        minuteTime = parseInt(_t / 60);
        secondTime = parseInt(_t % 60);
        timeStr = `${stringFormat(hourTime)}:${stringFormat(minuteTime)}:${stringFormat(secondTime)}`
    }
    return timeStr;
    }