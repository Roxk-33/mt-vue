import Mock from 'mockjs';
import shopAPI from './shop';
// Mock.setup({
//   timeout: '350-600'
// })

// 店铺相关
// Mock.mock(/\/shop\/list/, 'get', shopAPI.getList);
Mock.mock(/\/shop\/shop/, 'get', shopAPI.getShop);

export default Mock;
