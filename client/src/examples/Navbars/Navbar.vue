<template>
  <nav class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl" :class="
      this.$store.state.isRTL ? 'top-0 position-sticky z-index-sticky' : ''
    " v-bind="$attrs" id="navbarBlur" data-scroll="true">
    <div class="px-3 py-1 container-fluid">
      <breadcrumbs :currentPage="currentRouteName" textWhite="text-white" />
      <div class="mt-2 collapse navbar-collapse mt-sm-0 me-md-0 me-sm-4" :class="this.$store.state.isRTL ? 'px-0' : 'me-sm-4'" id="navbar">
        <div class="pe-md-3 d-flex align-items-center" :class="this.$store.state.isRTL ? 'me-md-auto' : 'ms-md-auto'">
        </div>
        <ul class="navbar-nav justify-content-end">
          <li class="nav-item d-xl-none ps-3 d-flex align-items-center">
            <a href="#" @click="toggleSidebar" class="p-0 nav-link text-white" id="iconNavbarSidenav">
              <div class="sidenav-toggler-inner">
                <i class="sidenav-toggler-line bg-white"></i>
                <i class="sidenav-toggler-line bg-white"></i>
                <i class="sidenav-toggler-line bg-white"></i>
              </div>
            </a>
          </li>
          <li class="px-3 nav-item d-flex align-items-center">
            <a class="p-0 nav-link text-white" @click="toggleConfigurator">
              <i class="cursor-pointer fa fa-cog fixed-plugin-button-nav"></i>
            </a>
          </li>
          <li class="nav-item dropdown d-flex align-items-center" :class="this.$store.state.isRTL ? 'ps-2' : 'pe-2'">
            <a href="#" class="p-0 nav-link text-white" :class="[showMenu ? 'show' : '']" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false" @click="showMenu = !showMenu">
              <i class="cursor-pointer fa fa-bell"></i>
            </a>
            <ul class="px-2 py-3 dropdown-menu dropdown-menu-end me-sm-n4" :class="showMenu ? 'show' : ''" aria-labelledby="dropdownMenuButton">
              <li class="mb-2">
                <a class="dropdown-item border-radius-md" href="javascript:;">
                  <div class="py-1 d-flex">
                    <div class="d-flex flex-column justify-content-center">
                      <h6 class="mb-1 text-sm font-weight-normal">
                        <span class="font-weight-bold">今日の歩数: </span>5600歩<br />
                        <span>今日もお疲れ様です！</span>
                      </h6>
                      <p class="mb-0 text-xs text-secondary">
                        <i class="fa fa-clock me-1"></i>
                        13 minutes ago
                      </p>
                    </div>
                  </div>
                </a>
              </li>
              <li class="mb-2">
                <a class="dropdown-item border-radius-md" href="javascript:;">
                  <div class="py-1 d-flex">
                    <div class="d-flex flex-column justify-content-center">
                      <h6 class="mb-1 text-sm font-weight-normal">
                        <span class="font-weight-bold">今日の歩数: </span>10056歩<br />
                        <span>おめでとうございます！！目標達成！！<br />頑張ったあなたにお得なクーポンをプレゼントします!!</span>
                      </h6>
                      <p class="mb-0 text-xs text-secondary">
                        <i class="fa fa-clock me-1"></i>
                        1 day ago
                      </p>
                    </div>
                  </div>
                </a>
              </li>
              <li>
                <a class="dropdown-item border-radius-md" href="javascript:;">
                  <div class="py-1 d-flex">
                    <div class="d-flex flex-column justify-content-center">
                      <h6 class="mb-1 text-sm font-weight-normal">
                        <span class="font-weight-bold">今日の歩数: </span>8000歩<br />
                        <span>お疲れ様です!!今日は少し飲みすぎてしまいましたね。。<br />明日は今日よりも5分長く歩いてみましょう!</span>
                      </h6>
                      <p class="mb-0 text-xs text-secondary">
                        <i class="fa fa-clock me-1"></i>
                        2 day ago
                      </p>
                    </div>
                  </div>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
  import Breadcrumbs from "../Breadcrumbs.vue";
  import { mapMutations, mapActions } from "vuex";

  export default {
    name: "navbar",
    data() {
      return {
        showMenu: false
      };
    },
    props: ["minNav", "textWhite"],
    created() {
      this.minNav;
    },
    methods: {
      ...mapMutations(["navbarMinimize", "toggleConfigurator"]),
      ...mapActions(["toggleSidebarColor"]),

      toggleSidebar() {
        this.toggleSidebarColor("bg-white");
        this.navbarMinimize();
      }
    },
    components: {
      Breadcrumbs
    },
    computed: {
      currentRouteName() {
        return this.$route.name;
      }
    }
  };
</script>
