import request from '@/common/request';

export function loginByAccount(account, password) {
  const data = {
    account,
    password,
  };
  return request({
    url: '/login/login',
    method: 'post',
    data,
  });
}
export function loginGetInfo() {
  return request({
    url: '/Home/Login/login',
    method: 'post',
  });
}
export function logout() {
  return request({
    url: '/Home/Login/logout',
    method: 'get',
  });
}
// export default loginByAccount;
