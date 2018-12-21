<template>
    <div class="mainView">
        <div class="ui sidebar vertical menu">
            <main-view-sidebar-content></main-view-sidebar-content>
        </div>
        <div class="pusher">
            <div class="ui basic center aligned segment">
                <div class="ui button" @click="toggleSideBar()">
                    <i class="bars icon"></i>
                    Menu
                </div>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
  import MainViewSidebarContent from './components/main-view-sidebar-content/MainViewSidebarContent';

  export default {
    name: 'main-view-mobile',
    components: {MainViewSidebarContent},
    methods: {
      toggleSideBar() {
        $('.ui.sidebar').sidebar('toggle');
      }
    }
  }
</script>
<style scoped>
    .ui.sidebar.menu {
        background-color: var(--colorExciting);
        border-right: 1px solid var(--colorDramatic);
    }

    .pusher {
        background-color: var(--colorExciting);
    }

    .ui.button {
        background-color: var(--colorDramatic);
        color: white;
    }
</style>