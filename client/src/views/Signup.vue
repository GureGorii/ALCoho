<template>
  <div class="container top-0 position-sticky z-index-sticky">
    <div class="row">
      <div class="col-12">
        <navbar isBtn="bg-gradient-light" />
      </div>
    </div>
  </div>
  <main class="main-content mt-0">
    <div class="page-header align-items-start min-vh-50 pt-5 pb-11 m-3 border-radius-lg" style="background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signup-cover.jpg'); background-position: top;">
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-5 text-center">
            <h1 class="text-white mb-2 mt-5">健康第一！！</h1>
            <p
              class="text-white"
            >登録しようとしたあなたは偉いです</p>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row mt-lg-n10 mt-md-n11 mt-n10 justify-content-center">
        <div class="col-xl-4 col-lg-5 col-md-7 mx-auto">
          <div class="card z-index-0">
            <div class="card-header text-center pt-4">
              <h4>アカウントを登録</h4>
            </div>
            <div class="card-body">
              <h7>情報を入力してください</h7>
              <form role="form" @submit.prevent="submit">
                <input type="text" placeholder="iD" v-model="user.userId" class="input-form"/>
                <input type="password" placeholder="Password" v-model="user.password" class="input-form"/>
                <argon-checkbox checked>
                  <label class="form-check-label" for="flexCheckDefault">
                    I agree the
                    <a
                      href="javascript:;"
                      class="text-dark font-weight-bolder"
                    >Terms and Conditions</a>
                  </label>
                </argon-checkbox>
                <div class="text-center">
                  <argon-button fullWidth color="dark" variant="gradient" class="my-4 mb-2">Sign up</argon-button>
                </div>
                <p class="text-sm mt-3 mb-0">
                  Already have an account?
                  <a href="https://0bc8d0957737489bbf37971f840b3cf1.vfs.cloud9.ap-northeast-1.amazonaws.com/signin" class="text-dark font-weight-bolder">Sign in</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <app-footer />
</template>

<script>
  import Navbar from "@/examples/PageLayout/Navbar.vue";
  import AppFooter from "@/examples/PageLayout/Footer.vue";
  import ArgonInput from "@/components/ArgonInput.vue";
  import ArgonCheckbox from "@/components/ArgonCheckbox.vue";
  import ArgonButton from "@/components/ArgonButton.vue";
  import { baseUrl } from '@/assets/config.js';
  import axios from "axios";
  const body = document.getElementsByTagName("body")[0];

  export default {
    name: "signin",
    components: {
      Navbar,
      AppFooter,
      ArgonInput,
      ArgonCheckbox,
      ArgonButton,
    },
    data() {
      return {
        user: {
          userId: null,
          password: null
        }
      }
    },
    methods: {
      async submit() {
        //新規登録処理
        // リクエストボディを指定する
        const requestBody = {
          userId: this.user.userId,
          password: this.user.password,
        };

        try {
          const res = await axios.post(baseUrl + '/user/signup', requestBody);
          // 成功時の処理
          this.$router.push({ path: "/signin",})
          console.log(res.data);
        }
        catch (e) {
          // エラー時の処理
        }
      }
    },
    created() {
      this.$store.state.hideConfigButton = true;
      this.$store.state.showNavbar = false;
      this.$store.state.showSidenav = false;
      this.$store.state.showFooter = false;
      body.classList.remove("bg-gray-100");
    },
    beforeUnmount() {
      this.$store.state.hideConfigButton = false;
      this.$store.state.showNavbar = true;
      this.$store.state.showSidenav = true;
      this.$store.state.showFooter = true;
      body.classList.add("bg-gray-100");
    },
  };
</script>

<style scoped>
.input-form {
  text-align: center;
  min-width: 100%;
  border-radius: 5px;
  border: solid 1px;
  margin-bottom: 5px;
}

</style>