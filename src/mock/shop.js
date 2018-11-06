import Mock from 'mockjs';

export default {
  getList: () => {
    const Random = Mock.Random;
    const data = Mock.mock({
      'list|8': [
        {
          // shop_id: '@guid()',
          shop_title: '@cname',
          'rate|1-5': 5,
          'total_sales|1-1000': 1000,
          tel: /^1[385][1-9]\d{8}/,
          // 'distance|1-10': 10,
          // 'transportTime|10-30': 10,
          'threshold|10-30': 10, // 起送门槛
          'freight|0-30': 30, // 运费
          // 'perCapita|0-30': 30, // 人均
          photo: Random.image('100x100'),
          announcement: Random.csentence(8),
        },
      ],
      status: true,
    });
    return data;
  },
  getShop: () => {
    const Random = Mock.Random;
    const data = Mock.mock({
      id: Random.increment(),
      announcement: '@cname',
      'threshold|50-100': 100,
      shop_title: '@cname',
      'shop_catalog|10': [
        {
          title: '@cname',
          value: '@guid()',
        },
      ],

      'rate|1-5': 5,
      'sales|1-1000': 1000,
      'distance|1-10': 10,
      'transportTime|10-30': 10,
      'threshold|10-30': 10, // 起送门槛
      'freight|0-30': 30, // 运费
      'perCapita|0-30': 30, // 人均
      'food_list|10-20': [
        {
          title: '@cname',
          id: '@id()',
          shop_id: '1',
          'month_sale|1-1000': 1000,
          'like|1-1000': 1000,
          photo: Random.image('100x100'),
          description: Random.csentence(8),
          'price|1-5': 5,
          spec_arr: [
            {
              type_name: '规格',
              type_default: 0,
              type_content: [
                {
                  label: '小碗',
                  'price|1-5': 5,
                },
                {
                  label: '大碗',
                  'price|1-5': 5,
                },
              ],
            },
            {
              type_name: '辣度',
              type_default: 1,
              type_content: [
                {
                  label: '不辣',
                  'price|1-5': 5,
                },
                {
                  label: '微辣',
                  'price|1-5': 5,
                },
                {
                  label: '中辣',
                  'price|1-5': 5,
                },
              ],
            },

            {
              type_name: '面粉，选择',
              type_default: 1,
              type_content: [
                {
                  label: '小面',
                  'price|1-15': 5,
                },
                {
                  label: '大面',
                  'price|1-15': 5,
                },
                {
                  label: '粉',
                  'price|1-15': 5,
                },
              ],
            },
          ],
        },
      ],
      status: true,
    });
    data.food_list.forEach(item => {
      item.spec_arr = JSON.stringify(item.spec_arr);
    });
    let resp = { data: data, status: true };
    console.log(resp);
    return resp;
  },
};
