import shopList from './shop-list';
import Vue from 'vue';
export default new Vue({
  components: {
    shopList,
  },
  template: `
        <div>
            <shop-list id="skeleton-shop-list" style="display:none"/>
        </div>
    `,
});
