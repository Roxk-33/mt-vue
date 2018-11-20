// TODO:检测是否有相同规格的商品,两数组之间的对比。当前实现方法并不理想

export default {
  methods: {
    isRepeat(list, target) {
      let indexRepeat = -1;
      if (list.length > 0) {
        list.some((item, index) => {
          if (item.food_id === target.id) {
            const specArrList = item.spec_arr;
            const { specArr } = target;
            // 若规格ID不相同，返回true
            /* eslint-disable */
            const result = specArr.some((id, specIndex) => id != specArrList[specIndex]);
            if (!result) {
              indexRepeat = index;
              return true;
            }
          }
          return false;
        });
      }
      return indexRepeat;
    },
  },
};
