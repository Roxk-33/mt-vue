import request from '@/common/request';

export function fetchShopList(params) {
  return request({
    url: '/shop/list',
    method: 'get',
    params,
  });
}
export function fetchShopDetail(params) {
  return request({
    url: '/shop/shop',
    method: 'get',
    params,
  });
}
