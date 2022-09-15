<template>
  <div class="container top-0 position-sticky z-index-sticky">
    <div class="row">
      <div class="col-12">
        <navbar isBlur="blur  border-radius-lg my-3 py-2 start-0 end-0 mx-4 shadow" v-bind:darkMode="true" isBtn="bg-gradient-success" />
      </div>
    </div>
  </div>
  <main class="mt-0 main-content">
    <section>
      <div class="page-header min-vh-100">
        <div class="container">
          <div class="row">
            <div class="mx-auto col-xl-4 col-lg-5 col-md-7 d-flex flex-column mx-lg-0">
              <div class="card card-plain">
                <div class="pb-0 card-header text-start">
                  <h4 class="font-weight-bolder">Sign In</h4>
                  <p class="mb-0">Enter your email and password to sign in</p>
                </div>
                <div class="card-body">
                  <form role="form" @submit.prevent="submit">
                    <div class="mb-3">
                      <input type="text" placeholder="userId" name="userId" size="lg" v-model="user.userId" class="input-form"/>
                    </div>
                    <div class="mb-3">
                      <input type="password" placeholder="Password" name="password" size="lg" v-model="user.password" class="input-form"/>
                    </div>
                    <div class="text-center">
                      <argon-button class="mt-4" variant="gradient" color="success" fullWidth size="lg" >Sign in</argon-button>
                    </div>
                  </form>
                </div>
                <div class="px-1 pt-0 text-center card-footer px-lg-2">
                  <p class="mx-auto mb-4 text-sm">
                    Don't have an account?
                    <a href="https://0bc8d0957737489bbf37971f840b3cf1.vfs.cloud9.ap-northeast-1.amazonaws.com/signup" class="text-success text-gradient font-weight-bold">Sign up</a>
                  </p>
                </div>
              </div>
            </div>
            <div class="top-0 my-auto text-center col-6 d-lg-flex d-none h-100 pe-0 position-absolute end-0 justify-content-center flex-column">
              <div class="position-relative bg-gradient-primary h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center overflow-hidden" style="background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signin-ill.jpg');
          background-size: cover;">
                <span class="mask bg-gradient-success opacity-6"></span>
                <h4 class="mt-5 text-white font-weight-bolder position-relative">"Attention is the new currency"</h4>
                <p class="text-white position-relative">The more effortless the writing looks, the more effort the writer actually put into the process.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
  import { baseUrl } from '@/assets/config.js';
  import axios from "axios";
  import Navbar from "@/examples/PageLayout/Navbar.vue";;
  import ArgonButton from "@/components/ArgonButton.vue";
  const body = document.getElementsByTagName("body")[0];

  export default {
    name: "signin",
    components: {
      Navbar,
      ArgonButton,
    },
    created() {
      this.$store.state.hideConfigButton = true;
      this.$store.state.showNavbar = false;
      this.$store.state.showSidenav = false;
      this.$store.state.showFooter = false;
      body.classList.remove("bg-gray-100");
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
        console.log('ボタンが押された')
        const headers = { 'Authorization': 'mtiToken' }
        // リクエストボディを指定する
        const requestBody = {
          userId: this.user.userId,
          password: this.user.password,
        };

        try {
          const res = await axios.post(baseUrl + '/user/login', requestBody, { headers });
          console.log(res)
          // 成功時の処理
          window.localStorage.setItem('token', res.data.token);
          window.localStorage.setItem('userId', this.user.userId)
          this.$router.push({ name: "Dashboard",})
          console.log('res.data: ', res.data)
        }
        catch (e) {
          // エラー時の処理
          alert("ログインに失敗しました。")
        }

      }
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
  min-width: 100%;
  border-radius: 5px;
  border: solid 1px;
}

</style>