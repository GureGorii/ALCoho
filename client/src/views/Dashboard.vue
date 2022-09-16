<template>
  <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="row">
          <!-- 日付-->
          <div class="col-lg-4">
            <card :title="stats.money.title" :value="stats.money.value" :percentage="stats.money.percentage" :iconClass="stats.money.iconClass" :iconBackground="stats.money.iconBackground" :detail="stats.money.detail" directionReverse></card>
            <!--
            <div class="col">
              <regist-card class="mt-4" />
            </div>
            -->
          </div>
          <!-- 今日の歩数 -->
          <div class="col-lg-4">
            <card :title="stats.users.title" :value="stats.users.value" :percentage="stats.users.percentage" :iconClass="stats.users.iconClass" :iconBackground="stats.users.iconBackground" :detail="stats.users.detail" directionReverse></card>
          </div>
          <!-- カロリー -->
          <div class="col-lg-4">
            <card :title="stats.clients.title" :value="stats.clients.value" :percentage="stats.clients.percentage" :iconClass="stats.clients.iconClass" :iconBackground="stats.clients.iconBackground" :percentageColor="stats.clients.percentageColor" :detail="stats.clients.detail" directionReverse></card>
          </div>
        </div>
        <div class="row">
          <!-- 飲酒量  -->
          <div class="col-lg-5">
            <card :title="stats.drink.title" :value="stats.drink.value" :percentage="stats.drink.percentage" :value2="stats.drink.value2" :percentage2="stats.drink.percentage2" :value3="stats.drink.value3" :percentage3="stats.drink.percentage3" :iconClass="stats.drink.iconClass" :iconBackground="stats.drink.iconBackground" :percentageColor="stats.drink.percentageColor" :detail="stats.drink.detail" directionReverse>
            </card>
              <div class="col">
              <!--飲酒メーター-->
              <div class="cup-card">
                <div class="col-15 d-flex align-items-left">
                  <h6 class="mb-0">飲酒記録</h6>
                  <div class="col text-end align-items-right">
                    <argon-button color="success" size="sm" variant="outline" @click="frmCreateAccountPopup.show(true)">
                      登録
                    </argon-button>
                  </div>
                </div>
                
                <p>今日の飲めるお酒!!: <span>ビール✖︎2</span></p>
                <div class="cup"></div>
                
              </div>
              <!-- <carousel /> -->
            </div>
          </div>
          <div class="col-lg-7 mb-lg">
            <!-- line chart -->
            <div class="card z-index-2">
              <gradient-line-chart />
            </div>
          </div>
        </div>
        <div class="row mt-4">
          <div class="col-lg-7 mb-lg-0 mb-4">
            <div class="card">
              <div class="p-3 pb-0 card-header">
                <div class="d-flex justify-content-between">
                  <h6 class="mb-2">フレンド</h6>
                </div>
              </div>
              <div class="table-responsive">
                <table class="table align-items-center">
                  <tbody>
                    <tr v-for="(sale, index) in sales" :key="index">
                      <td class="w-30">
                        <div class="px-2 py-1 d-flex align-items-center">
                          <div>
                            <img :src="sale.flag" alt="person icon" />
                          </div>
                          <div class="ms-4">
                            <p class="mb-0 text-xs font-weight-bold">名前:</p>
                            <h6 class="mb-0 text-sm">{{ sale.name }}</h6>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div class="text-center">
                          <p class="mb-0 text-xs font-weight-bold">歩数:</p>
                          <h6 class="mb-0 text-sm">{{ sale.step }}</h6>
                        </div>
                      </td>
                      <td>
                        <div class="text-center">
                          <p class="mb-0 text-xs font-weight-bold">消費カロリー:</p>
                          <h6 class="mb-0 text-sm">{{ sale.cal }}</h6>
                        </div>
                      </td>
                      <td class="text-sm align-middle">
                        <div class="text-center col">
                          <p class="mb-0 text-xs font-weight-bold">飲酒可能量:</p>
                          <h6 class="mb-0 text-sm">{{ sale.drink }}</h6>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div class="col-lg-5">
            <ranking-card />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Card from "@/examples/Cards/Card.vue";
  import GradientLineChart from "@/examples/Charts/GradientLineChart.vue";
  // import Carousel from "./components/Carousel.vue";
  import RankingCard from "./components/CategoriesCard.vue";
  // import RegistCard from "./components/RegistCard.vue" ;
  import ArgonButton from "@/components/ArgonButton.vue";
  import PI from "@/assets/img/icons/flags/personicon.png";
  let d = new Date();
  let year = d.getUTCFullYear();
  let month = d.getUTCMonth() + 1;
  let day = d.getUTCDate();
  let time = year + '年' + month + '月' + day + '日';
  export default {
    name: "dashboard-default",
    data() {
      return {
        stats: {
          money: {
            value: time,
            iconClass: "ni ni-calendar-grid-58",
            iconBackground: "bg-gradient-primary",
          },
          users: {
            title: "歩数",
            value: "2,300" + "歩",
            percentage: "+3%",
            iconClass: "ni ni-user-run",
            iconBackground: "bg-gradient-danger",
            detail: "前週比",
          },
          clients: {
            title: "消費カロリー",
            value: "3,000" + "kcal",
            percentage: "-2%",
            iconClass: "fa fa-cutlery",
            percentageColor: "text-danger",
            iconBackground: "bg-gradient-success",
            detail: "前日比",
          },
          drink: {
            title: "飲酒可能量",
            value: "ビール" + "3" + "杯",
            percentage: "-2%",
            value2: "ハイボール" + "4" + "杯",
            percentage2: "-5%",
            value3: "レモンサワー" + "3.7" + "杯",
            percentage3: "-4%",
            iconClass: "fa fa-beer",
            percentageColor: "text-danger",
            iconBackground: "bg-gradient-warning",
            detail: "前日比",
          },
        },
        sales: {
          us: {
            name: "ハイボール愛子",
            step: 2500,
            cal: "230,900",
            drink: "29.9%",
            flag: PI,
          },
          germany: {
            name: "角打ち太郎",
            step: "3.900",
            cal: "440,000",
            drink: "40.22%",
            flag: PI,
          },
          britain: {
            name: "歩く太郎",
            step: "1.400",
            cal: "190,700",
            drink: "23.44%",
            flag: PI,
          },
          brasil: {
            name: "お酒好き太郎",
            step: "562",
            cal: "143,960",
            drink: "32.14%",
            flag: PI,
          },
        },
      };
    },
    components: {
      Card,
      GradientLineChart,
      //Carousel,
      RankingCard,
      // RegistCard,
      ArgonButton,
    },
  };
</script>
<style scope>
  .cup-card {
    border: 0 solid rgba(0, 0, 0, 0.125);
    border-radius: 1rem;
    border-bottom: 0 solid rgba(0, 0, 0, 0.125);
    background-color: #fff;
    background-clip: border-box;
    /*box-sizing: border-box;*/
    height: 255px;
    padding: 1.5rem;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.125);
    margin-bottom: 25px;
  }
  .cup {
    width: 100px;
    /* コップの横幅を指定 */
    height: 200px;
    /* コップの高さを指定 */
    border: solid 1px #999;
    /* コップの縁を描画 */
    border-top: none;
    /* コップの上は線を消す */
    background: linear-gradient(transparent 30%, #BF923B 30%);
    margin: 0 auto;
  }
</style>