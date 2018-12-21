<template>
    <core-view-mobile v-if="isMobile"></core-view-mobile>
    <core-view-pc v-else></core-view-pc>
</template>
<script>
  import CoreViewMobile from './CoreViewMobile';
  import CoreViewPc from './CoreViewPc';
  export default {
    name: 'core-view',
    components: {CoreViewPc, CoreViewMobile},
  }
</script>