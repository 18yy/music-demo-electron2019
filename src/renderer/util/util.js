function timeToDate(now, time) {
    time = parseInt(time);
    if (!now) {
        time = time / 1000;
    }
    let timeStr = '';
    let stringFormat = (i) => {
        return i < 10 ? `0${i}` : `${i}`;
    }
    let minuteTime = 0;
    let secondTime = 0;
    let hourTime = 0;
    if (time < 60) {
        timeStr = `00:${stringFormat(time)}`
    } else if (time >= 60 && time < 3600) {
        minuteTime = parseInt(time / 60);
        secondTime = parseInt(time % 60);
        timeStr = `${stringFormat(minuteTime)}:${stringFormat(secondTime)}`;
    } else if (time >= 3600) {
        let _t = parseInt(time % 3600);
        hourTime = parseInt(time / 3600);
        minuteTime = parseInt(_t / 60);
        secondTime = parseInt(_t % 60);
        timeStr = `${stringFormat(hourTime)}:${stringFormat(minuteTime)}:${stringFormat(secondTime)}`
    }
    return timeStr;
}
function parseLyric (lyric) {

    var lyricArr = lyric.replace(/&#\d+;/g, function (char) {
      return String.fromCharCode(char.substring(2, char.length - 1))
    }).split('\n')
    // 定义一个歌词对象
    var lyricObj = {}
    // 将这个歌词的数组 解析成对象的形式，里面的一些无用数据给删掉。时间戳给弄成秒的单位
    for (var i = 0; i < lyricArr.length; i++) {
      var lyric = lyricArr[i]
      var timeReg = /\[\d*\:\d*\.\d*\]/
      var timeText = lyric.match(timeReg)
  
      if (!timeText) {
        continue
      }
      var text = lyric.replace(timeReg, '')
      if (!text) {
        continue
      }
      // 将上面得到的时间戳  timeText[0] 将它转换成 秒数的单位。
      var time = timeText[0]
  
      var min = parseInt(String(time.match(/\[\d*\:/)).substring(1))
      var sec = parseInt(String(time.match(/\:\d*\./)).substring(1))
      time = min * 60 + sec
      lyricObj[time] = {
        'text': text
      }
    }
  
    return lyricObj
  }

  export {
    timeToDate,
    parseLyric

  }