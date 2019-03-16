export function deepClone(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error arguments', 'shallowClone');
  }
  const targetObj = source.constructor === Array ? [] : {};
  Object.keys(source).forEach(keys => {
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
  Object.keys(target).forEach(key => {
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
    if (key === 'a') {
      return ['一', '二', '三', '四', '五', '六', '日'][value - 1];
    }
    if (result.length > 0 && value < 10) {
      value = `0${value}`;
    }
    return value || 0;
  });
  return time_str;
}
/**
 * @description {{计算时间差值}}
 * @param {*} startTime 开始时间 若为空着默认为Date.now()
 * @param {*} endTime   结束时间
 */
export function calTime(startTime = null, endTime) {
  if (startTime === null) {
    startTime = new Date();
  } else {
    startTime = new Date(startTime);
  }
  endTime = new Date(endTime);
  let time = endTime - startTime;
  return time;
}
export function getDelayTime(delay = 15) {
  const date = new Date();
  date.setMinutes(date.getMinutes() + delay);
  const format = '{y}-{m}-{d} {h}:{i}';
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
  };
  const time_str = format.replace(/{(y|m|d|h|i)+}/g, (result, key) => {
    let value = formatObj[key];
    if (key === 'a') {
      return ['一', '二', '三', '四', '五', '六', '日'][value - 1];
    }
    if (result.length > 0 && value < 10) {
      value = `0${value}`;
    }
    return value || 0;
  });
  return time_str;
}
// 检验新用户名
export function validateUserName(name) {
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
export function validatePsw(psw, pswRe) {
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
  // if (!reg.test(psw)) {
  //   result.msg = '密码须包含数字、字母、符号至少两种或以上的元素';
  //   return result;
  // }
  result.status = true;
  return result;
}
// 手机号
export function validateTel(tel) {
  // 消除空格
  tel = tel.replace(/\s+/g, '');
  const reg = /^1(3|4|5|7|8)\d{9}$/;
  return { status: reg.test(tel), tel };
}

export function getRect(el) {
  if (el instanceof window.SVGElement) {
    const rect = el.getBoundingClientRect();
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    };
  }
  return {
    top: el.offsetTop,
    left: el.offsetLeft,
    width: el.offsetWidth,
    height: el.offsetHeight,
  };
}
const TokenKey = 'Mt-Token';

export function getToken() {
  return localStorage.getItem(TokenKey);
}

export function setToken(token) {
  return localStorage.setItem(TokenKey, token);
}

export function removeToken() {
  return localStorage.removeItem(TokenKey);
}

const camelizeRE = /-(\w)/g;
export function camelize(str) {
  str = String(str);
  return str.replace(camelizeRE, function(m, c) {
    return c ? c.toUpperCase() : '';
  });
}

export function scrollTo(y, time = 0) {
  const _y = document.documentElement.scrollTop || window.pageYOffset;
  const offset = y - _y > 0 ? 1 : -1; // 1为向上，-1为向下
  if (!time) {
    console.log(y);
    window.pageYOffset = y;
    document.documentElement.scrollTop = y;
    return;
  }
}
// 是否在营业时间，通过00:00:00到xxx时间戳对比
// 0 : 营业中
// 1 : 已休息
export function isBusinessHours(businessHours, colsingHours) {
  businessHours = new Date(businessHours);
  colsingHours = new Date(colsingHours);

  // 获取营业时间 00:00:00的时间戳
  let tempObj = new Date(businessHours);
  tempObj.setHours(0);
  tempObj.setMinutes(0);
  tempObj.setSeconds(0);
  tempObj.setMilliseconds(0);
  const businessHoursStamp = businessHours.getTime() - tempObj.getTime();
  const colsingHoursStamp = colsingHours.getTime() - tempObj.getTime();
  const nowDate = new Date();

  // 获取今日时间 00:00:00的时间戳
  tempObj = new Date();
  tempObj.setHours(0);
  tempObj.setMinutes(0);
  tempObj.setSeconds(0);
  tempObj.setMilliseconds(0);
  const nowDateStamp = nowDate.getTime() - tempObj.getTime();
  if (businessHoursStamp < nowDateStamp && colsingHoursStamp > nowDateStamp) return 0;
  return 1;
}
