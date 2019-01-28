<template>
    <div>
        <div class="menuHeader">
            <a href="https://aeternity.com/" target="_blank">
                <img class="ui big centered image cursorPointer" src="../../../../assets/aeLogo.svg">
            </a>
            <h1 class="ui centered header whiteFont dramaticTextShadow aeMonitor cursorPointer" @click="$router.push('/')">AEMonitor</h1>
            <network-info></network-info>
        </div>
        <a class="item" :class="{'active': menuEntry.active}" @click="setActiveMenuEntry(menuEntry)"
           v-for="menuEntry in menu">
            <i :class="menuEntry.icon"></i>
            {{menuEntry.label}}
        </a>
        <div class="footerItem">
            <span class="whiteFont"><i class="globe icon" style="color: lime"></i>Network: <b>{{networkId}}</b></span><br>
            <span class="whiteFont">Next refresh: {{refreshSecondsIntervalLiveCounter}}s</span><br>
            <span class="whiteFont">Refresh every: {{refreshSecondsInterval}}s</span><br>
            <span class="whiteFont" style="font-size: 0.8rem;"><span style="color: var(--colorDramatic);">Made by:</span><a target="_blank" href="https://pthomann.pl"> Przemysław Thomann </a></span> <br>
        </div>
    </div>
</template>
<script>
  import NetworkInfo from '../network-info/NetworkInfo';

  export default {
    name: 'main-view-sidebar-content',
    components: {NetworkInfo},
    data() {
      return {
        refreshSecondsInterval: properties.refetchIntervalMillisecs / 1000,
        refreshSecondsIntervalLiveCounter: properties.refetchIntervalMillisecs / 1000,
        menu: [
          {
            label: 'Core stats',
            icon: 'cogs icon',
            route: '/core',
            active: false,
          },
          {
            label: 'Transaction stats',
            icon: 'random icon',
            route: '/transactions',
            active: false,
          },
          {
            label: 'Token stats',
            icon: 'circle icon',
            route: '/token',
            active: false,
          },
        ]
      };
    },
    methods: {
      setActiveMenuEntry(menuEntry) {
        if (this.isMobile) {
          $('.ui.sidebar').sidebar('toggle'); //hide sidebar
        }
        this.menu.forEach(menuEntry => menuEntry.active = false);
        menuEntry.active = true;
        this.$router.push(menuEntry.route);
      },
      setupNextRefreshIntervalLiveCounter() {
        setInterval(() => {
          this.refreshSecondsIntervalLiveCounter -= 1;
          if (this.refreshSecondsIntervalLiveCounter === 0) {
            this.refreshSecondsIntervalLiveCounter = this.refreshSecondsInterval;
          }
        }, 1000);
      },
      highlightCurrentMenuEntry() {
        const currentMenuEntry = this.menu.filter(menuEntry => menuEntry.route === this.$route.path)[0];
        if (currentMenuEntry !== undefined) {
          currentMenuEntry.active = true;
        } else {
          this.menu[0].active = true; //it's redirected to /core if /
        }
      }
    },
    mounted() {
      this.highlightCurrentMenuEntry();
      this.setupNextRefreshIntervalLiveCounter();
    },
    watch: {
      '$route'() {
        this.refreshSecondsIntervalLiveCounter = this.refreshSecondsInterval;
      }
    },
    computed: {
      networkId() {
        return this.$store.state.networkId;
      },
    },
  };
</script>
<style scoped>
    .image {
        padding-left: 1%;
        padding-right: 1%;
        padding-top: 5%;
        padding-bottom: 5%;
    }
    .menuHeader {
        padding-bottom: 10%;
    }

    .item {
        color: white !important;
    }

    .item:hover {
        background-color: var(--colorDramatic) !important;
        color: white !important;
        -webkit-transition: all 0.3s ease-in !important;
        -moz-transition: all 0.3s ease-in !important;
        transition: all 0.3s ease-in !important;
    }

    .active.item {
        background-color: var(--colorDramatic) !important;
        color: white !important;
        box-shadow: 0px 0px 15px var(--colorDramatic) !important;
    }

    .footerItem {
        bottom: 0 !important;
        position: absolute;
        color: white;
        /*width: 100%;*/
    }

    .aeMonitor {
        font-weight: 500;
    }
</style>