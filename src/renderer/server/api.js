import services from './server'

//获取所有榜单
function getLists(fn) {
  services.get('/toplist/detail')
    .then(function (res) {
      fn(false, res);
    }).catch(function (err) {
      fn(err);
    });
}

//获取榜单里的所有音乐
function getMusicLists(fn, id) {
  services.get('/playlist/detail?id=' + id)
    .then(function (res) {
      fn(false, res);
    }).catch(function (err) {
      fn(err);
    });
}

//获取音乐的播放url
function getMusicUrl(fn, id) {
  services.get('/song/url?id=' + id)
    .then(function (res) {
      fn(false, res);
    }).catch(function (err) {
      fn(err);
    });
}

//获取歌词
function getMusicIyric(fn, id) {
  services.get('/lyric?id=' + id)
    .then(function (res) {
      fn(false, res);
    }).catch(function (err) {
      fn(err);
    });
}
export {
  getLists,
  getMusicLists,
  getMusicUrl,
  getMusicIyric
}