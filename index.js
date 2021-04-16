export function generateArray(start, end) {
  return Array.from(new Array(+end + 1).keys()).slice(+start);
}

export function deepClone(source) {
  if (getValueType(source) !== 'Object' && getValueType(source) !== 'Array') {
    throw new Error('error arguments', 'shallowClone');
  }
  const targetObj = getValueType(source) === 'Array' ? [] : {};
  for (const keys in source) {
    if (getValueType(source) === 'Date') {
      targetObj[keys] = new Date(source[keys].valueOf());
    } else if (getValueType(source) === 'RegExp') {
      const reg = source[keys];
      const pattern = reg.valueOf();
      const flagMap = { global: 'g', ignoreCase: 'i', multiline: 'm' };
      const flags = Object.keys(flagMap).reduce((acc, key) => {
        acc += reg[key] ? flagMap[key] : '';
        return acc;
      }, '');
      targetObj[keys] = new RegExp(pattern.source, flags);
    } else if (getValueType(source[keys]) === 'Object' || getValueType(source[keys]) === 'Array') {
      targetObj[keys] = deepClone(source[keys]);
    } else {
      targetObj[keys] = source[keys];
    }
  }
  return targetObj;
}
export function dateFormat(time, fmt = 'yyyy-MM-dd hh:mm') {
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if (('' + time).length === 10) time = parseInt(time, 10) * 1000;
    date = new Date(time);
  }

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  let o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  };
  for (let k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
    }
  }
  return fmt;
}

function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}

export function filterProp(props = {}, whites = []) {
  return Object.keys(props).reduce((acc, key) => {
    if (props[key] || whites.some(value => value === key)) {
      acc[key] = props[key];
    }
    return acc;
  }, {});
}
