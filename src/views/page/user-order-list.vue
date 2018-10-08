<template>
  <div class="order-list">
    <order-list-header></order-list-header>
    <div class="order-list-content">

      <order-list-item></order-list-item>
      <order-list-item></order-list-item>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import orderListHeader from '@/views/smart/order-list-header';
import orderListItem from '@/views/smart/order-list-item';

export default {
  name: 'order-list',

  data() {
    return {};
  },
  components: {
    orderListHeader,
    orderListItem,
  },
  methods: {},
};
</script>

<style scoped rel="stylesheet/scss" lang="scss">
.order-list-content {
  margin-top: 85px;
}
</style>
