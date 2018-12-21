<template>
    <div class="mainView">
        <div class="ui sidebar vertical visible menu">
            <main-view-sidebar-content></main-view-sidebar-content>
        </div>
        <div class="pusher">
            <router-view :style="'padding-left: ' + sidebarHeight  + 'px'"></router-view>
        </div>
    </div>
</template>

<script>
  import NetworkInfo from './components/network-info/NetworkInfo';
  import MainViewSidebarContent from './components/main-view-sidebar-content/MainViewSidebarContent';

  export default {
    name: 'main-view-pc',
    components: {MainViewSidebarContent, NetworkInfo},
    data() {
      return {
        sidebarHeight: 100,
      };
    },
    mounted() {
      this.$router.push('/core');
      this.sidebarHeight = $('.ui.sidebar').width();
    },
  }
</script>
<style scoped>
    .ui.sidebar.menu {
        background-color: var(--colorExciting);
        border-right: 1px solid var(--colorDramatic);
    }
</style>