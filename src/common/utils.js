export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone');
  }
  const targetObj = source.constructor === Array ? [] : {};
  Object.keys(source).forEach((keys) => {
    if (source[keys] && typeof source[keys] === 'object') {
      targetObj[keys] = source[keys].constructor === Array ? [] : {};
      targetObj[keys] = deepClone(source[keys]);
    } else {
      targetObj[keys] = source[keys];
    }
  });
  return targetObj;
}
export function formatURL(url, target) {
  Object.keys(target).forEach((key) => {
    url = url.replace(`:${key}`, target[key]);
  });
  return url;
}
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    if (`${time}`.length === 10) time = parseInt(time) * 1000;
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    if (key === 'a') { return ['一', '二', '三', '四', '五', '六', '日'][value - 1]; }
    if (result.length > 0 && value < 10) {
      value = `0${value}`;
    }
    return value || 0;
  });
  return time_str;
}

export function getTime(delay = 15) {
  const date = new Date();
  date.setMinutes(date.getMinutes() + delay);
  const format = '{y}-{m}-{d} {h}:{i}';
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes() ,
  };
  const time_str = format.replace(/{(y|m|d|h|i)+}/g, (result, key) => {
    let value = formatObj[key];
    if (key === 'a') { return ['一', '二', '三', '四', '五', '六', '日'][value - 1]; }
    if (result.length > 0 && value < 10) {
      value = `0${value}`;
    }
    return value || 0;
  });
  return time_str;
}
// 检验新用户名
export function testUserName(name) {
  const len = name.length;
  const reg = /^[a-zA-Z\u4e00-\u9fa5]+$/;
  const minLen = 4;


  const maxLen = 16;
  const result = {
    status: false,
    msg: '',
  };
  if (len < minLen || len > maxLen) {
    result.msg = '长度不符合要求';
    return result;
  }
  if (!reg.test(name)) {
    result.msg = '内容不符合要求';
    return result;
  }
  result.status = true;
  return result;
}
// 检验密码
export function testPsw(psw, pswRe) {
  const len = psw.length;
  const minLen = 8;


  const maxLen = 32;
  const reg = /(\d+(a-zA-Z)+)/;

  let result = {
    status: false,
    msg: '',
  };
  if (len < minLen || len > maxLen) {
    result.msg = '长度不符合要求';
    return result;
  }
  if (psw !== pswRe) {
    result.msg = '密码不一样';
    return result;
  }
  if (!reg.test(name)) {
    result.msg = '密码须包含数字、字母、符号至少两种或以上的元素';
    return result;
  }
  result = true;
  return result;
}
// 手机号
export function testTel(tel) {
  // 消除空格
  tel = tel.replace(/\s+/g, '');
  const reg = /^1(3|4|5|7|8)\d{9}$/;
  return { status: reg.test(tel), tel };
}
export function formatTel(tel) {
  // 消除空格
  const reg1 = /\s+/g;

  // TODO:表现效果不佳，空格应该从左到右出现
  const reg2 = /(\d)(?=(\d{3})+(\.|$))/g;
  tel = tel.replace(reg1, '');
  return tel.replace(reg2, $1 => `${$1} `);
}
