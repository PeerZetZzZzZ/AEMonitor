<template>
    <main-view-mobile v-if="isMobile"></main-view-mobile>
    <main-view-pc v-else></main-view-pc>
</template>

<script>
import MainViewMobile from './MainViewMobile';
import MainViewPc from './MainViewPc';

export default {
  name: 'main-view',
  components: {MainViewPc, MainViewMobile},
  mounted() {
    if (this.$route.path === '/') {
        this.$router.push('/core');
    }
  }
}
</script>