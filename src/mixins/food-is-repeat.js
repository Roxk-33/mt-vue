export default {
  methods: {
    isRepeat(list, target) {
      let indexRepeat = -1;

      if (list.length > 0) {
        list.some((_foodInfo, index) => {
          if (_foodInfo.id === target.id) {
            let _typeSelected = _foodInfo.specArr;
            const specArr = target.specArr;
            specArr.forEach(ele => {
              _typeSelected = _typeSelected.filter(_ele => {
                return ele.label !== _ele.label || ele.price !== _ele.price;
              });
            });

            if (_typeSelected.length === 0) {
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
