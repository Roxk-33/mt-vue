import Mock from 'mockjs';

export default {
  getList: () => {
    const Random = Mock.Random;
    const data = Mock.mock({
      'list|8': [
        {
          shop_id: '@guid()',
          shop_title: '@cname',
          'rate|1-5': 5,
          'sales|1-1000': 1000,
          'distance|1-10': 10,
          'transportTime|10-30': 10,
          'threshold|10-30': 10, // 起送门槛
          'freight|0-30': 30, // 运费
          'perCapita|0-30': 30, // 人均
          photo: Random.image('100x100'),
        },
      ],
      status: true,
    });
    return data;
  },
  getShop: () => {
    const Random = Mock.Random;
    const data = Mock.mock({
      info: {
        shop_id: '@guid()',
        shop_announcement: '@cname',
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
      },
      'food_list|10-20': [
        {
          food_title: '@cname',
          food_id: '@guid()',
          'food_sales|1-1000': 1000,
          'like|1-1000': 1000,
          photo: Random.image('100x100'),
          'food_price|1-100': 100,
          type: [
            {
              type_name: '规格',
              type_default: 0,
              type_content: [
                {
                  label: '小碗',
                  price: '1',
                },
                {
                  label: '大碗',
                  price: '2',
                },
              ],
            },
            {
              type_name: '辣度',
              type_default: 1,
              type_content: [
                {
                  label: '不辣',
                  price: 3,
                },
                {
                  label: '微辣',
                  price: 2,
                },
                {
                  label: '中辣',
                  price: '1',
                },
              ],
            },
            {
              type_name: '面粉，选择',
              type_default: 1,
              type_content: [
                {
                  label: '小面',
                  price: '12',
                },
                {
                  label: '大面',
                  price: '11',
                },
                {
                  label: '粉',
                  price: '12',
                },
              ],
            },
            {
              type_name: '面粉，选择',
              type_default: 1,
              type_content: [
                {
                  label: '小面',
                  price: '12',
                },
                {
                  label: '大面',
                  price: '11',
                },
                {
                  label: '粉',
                  price: '12',
                },
              ],
            },
            {
              type_name: '面粉，选择',
              type_default: 1,
              type_content: [
                {
                  label: '小面',
                  price: '12',
                },
                {
                  label: '大面',
                  price: '11',
                },
                {
                  label: '粉',
                  price: '12',
                },
              ],
            },
          ],
        },
      ],
      status: true,
    });
    console.log(data);
    return data;
  },
};
