export function date(str, format) {
  var date = new Date(str);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  // 'yyyy-MM-dd hh:mm:ss'
  let output = '';
  output = format.replace('yyyy', year)
    .replace('MM', to2(month))
    .replace('dd', to2(day))
    .replace('hh', to2(hour))
    .replace('mm', to2(minutes))
    .replace('ss', to2(seconds));
  return output;
}

function to2(ipt) {
  return ipt > 9 ? ipt : ('' + 0 + ipt);
}
