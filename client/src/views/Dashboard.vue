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

            <card :title="stats.users.title" :value="sdata.id[num].step" :percentage="stats.users.percentage" :iconClass="stats.users.iconClass" :iconBackground="stats.users.iconBackground" :detail="stats.users.detail" directionReverse></card>
          </div>
          <!-- カロリー -->
          <div class="col-lg-4">
            <card :title="stats.clients.title" :value="sdata.id[num].aDayCalorie" :percentage="stats.clients.percentage" :iconClass="stats.clients.iconClass" :iconBackground="stats.clients.iconBackground" :percentageColor="stats.clients.percentageColor" :detail="stats.clients.detail" directionReverse></card>

          </div>
        </div>
        <div class="row">
          <!-- 飲酒量  -->
          <div class="col-lg-5">

            <card :title="stats.drink.title" :value="(sdata.id[num].aDayCalorie /140).toFixed(3)" :percentage="stats.drink.percentage" :iconClass="stats.drink.iconClass" :iconBackground="stats.drink.iconBackground" :percentageColor="stats.drink.percentageColor" :detail="stats.drink.detail" directionReverse>

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

                <!--<p>今日の飲めるお酒!!: <span>ビール✖︎2</span></p -->
                <div class="cup"></div>

              </div>
              <!-- <carousel /> -->
            </div>
          </div>
          <div class="col-lg-7 mb-lg">
            <!-- line chart -->
            <div class="card z-index-2">
              <gradient-line-chart />
            </div> <!-- -->
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
                          <p class="mb-0 text-xs font-weight-bold">消費カロリー(kcal):</p>
                          <h6 class="mb-0 text-sm">{{ sale.cal }}</h6>
                        </div>
                      </td>
                      <td class="text-sm align-middle">
                        <div class="text-center col">
                          <p class="mb-0 text-xs font-weight-bold">今日飲んで良い量 (杯):</p>
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
  // import RegistCard from "./components/RegistCard.vue";
  import ArgonButton from "@/components/ArgonButton.vue";
  import PI from "@/assets/img/icons/flags/personicon.png";
  import createNum from '../logic/createNum.js'
  let d = new Date();
  let year = d.getUTCFullYear();
  let month = d.getUTCMonth() + 1;
  let day = d.getUTCDate();
  let time = year + '年' + month + '月' + day + '日';
  const numArray = createNum
  export default {
    name: "dashboard-default",
    data() {
      return {
        num: numArray[7],
        stats: {
          money: {
            title: "日付",
            value: time,
            iconClass: "ni ni-calendar-grid-58",
            iconBackground: "bg-gradient-primary",
          },
          users: {
            title: "歩数 (歩)",
            value: "2,300" + "歩",
            percentage: "+3%",
            iconClass: "ni ni-user-run",
            iconBackground: "bg-gradient-danger",
            detail: "前日比",
          },
          clients: {
            title: "消費カロリー(kcal)",
            value: "3,000" + "kcal",
            percentage: "-2%",
            iconClass: "fa fa-cutlery",
            percentageColor: "text-danger",
            iconBackground: "bg-gradient-success",
            detail: "前日比",
          },
          drink: {
            title: "今日飲んで良い量 (杯)", //こっち
            value: "ビール" + "3" + "杯",
            percentage: "-2%",
            iconClass: "fa fa-beer",
            percentageColor: "text-danger",
            iconBackground: "bg-gradient-warning",
            detail: "前日比",
          },
        },
        sales: {
          us: {
            name: "ハイボール愛子",
            step: "2,500",
            cal: "23",
            drink: (23 / 140).toFixed(3),
            flag: PI,
          },
          germany: {
            name: "角打ち太郎",
            step: "3,900",
            cal: "40.4",
            drink: (40.4 / 140).toFixed(3),
            flag: PI,
          },
          britain: {
            name: "歩く太郎",
            step: "1,400",
            cal: "19.7",
            drink: (19.7 / 140).toFixed(3),
            flag: PI,
          },
          brasil: {
            name: "お酒好き太郎",
            step: "16,200",
            cal: "193.96",
            drink: (193.96 /140).toFixed(3),
            flag: PI,
          },
        },
        sdata: {
          id: [
            {
              index: 0,
              date: 1, //
              step: 514, //
              aDayCalorie: (514 / 100 * 3.5).toFixed(3), //  100歩で3.5Kcal
              basalMetabolism: 1530
          },

            {
              index: 1,
              date: 2,
              step: 14913,
              aDayCalorie: (14913 / 100 * 3.5).toFixed(3),
              basalMetabolism: 1530
          },

            {
              index: 2,
              date: 3,
              step: 9786,
              aDayCalorie: (9786 / 100 * 3.5).toFixed(3),
              basalMetabolism: 1530
          },

            {
              index: 3,
              date: 4,
              step: 3631,
              aDayCalorie: (3631 / 100 * 3.5).toFixed(3),
              basalMetabolism: 1530
          },

            {
              index: 4,
              date: 5,
              step: 2393,
              aDayCalorie: (2393 / 100 * 3.5).toFixed(3),
              basalMetabolism: 1530
          },

            {
              index: 5,
              date: 6,
              step: 6260,
              aDayCalorie: (6260 / 100 * 3.5).toFixed(3),
              basalMetabolism: 1530
          },

            {
              index: 6,
              date: 7,
              step: 5933,
              aDayCalorie: (5933 / 100 * 3.5).toFixed(3),
              basalMetabolism: 1530
          },

            {
              index: 7,
              date: 8,
              step: 6974,
              aDayCalorie: (6974 / 100 * 3.5).toFixed(3),
              basalMetabolism: 1530
          },

            {
              index: 8,
              date: 9,
              step: 8460,
              aDayCalorie: (8460 / 100 * 3.5).toFixed(3),
              basalMetabolism: 1530
          },

            {
              index: 9,
              date: 10,
              step: 6539,
              aDayCalorie: (6539 / 100 * 3.5).toFixed(3),
              basalMetabolism: 1530
          },

            {
              index: 10,
              date: 11,
              step: 7187,
              aDayCalorie: (7187 / 100 * 3.5).toFixed(3),
              basalMetabolism: 1530
          },

            {
              index: 11,
              date: 12,
              step: 11763,
              aDayCalorie: (11763 / 100 * 3.5).toFixed(3),
              basalMetabolism: 1530
          },

            {
              index: 12,
              date: 13,
              step: 14322,
              aDayCalorie: (14322 / 100 * 3.5).toFixed(3),
              basalMetabolism: 1530
          },

            {
              index: 13,
              date: 14,
              step: 881,
              aDayCalorie: (881 / 100 * 3.5).toFixed(3),
              basalMetabolism: 1530
          },

            {
              index: 14,
              date: 15,
              step: 6517,
              aDayCalorie: (6571 / 100 * 3.5).toFixed(3),
              basalMetabolism: 1530
          },

            {
              index: 15,
              date: 16,
              step: 1946,
              aDayCalorie: (1946 / 100 * 3.5).toFixed(3),
              basalMetabolism: 1530
          },

            {
              index: 16,
              date: 17,
              step: 8185,
              aDayCalorie: (8185 / 100 * 3.5).toFixed(3),
              basalMetabolism: 1530
          },

            {
              index: 17,
              date: 18,
              step: 13227,
              aDayCalorie: (13227 / 100 * 3.5).toFixed(3),
              basalMetabolism: 1530
          },

            {
              index: 18,
              date: 19,
              step: 411,
              aDayCalorie: (411 / 100 * 3.5).toFixed(3),
              basalMetabolism: 1530
          },

            {
              index: 19,
              date: 20,
              step: 9185,
              aDayCalorie: (9185 / 100 * 3.5).toFixed(3),
              basalMetabolism: 1530
          },

            {
              index: 20,
              date: 21,
              step: 3340,
              aDayCalorie: (3340 / 100 * 3.5).toFixed(3),
              basalMetabolism: 1530
          },

            {
              index: 21,
              date: 22,
              step: 1201,
              aDayCalorie: (1201 / 100 * 3.5).toFixed(3),
              basalMetabolism: 1530
          },

            {
              index: 22,
              date: 23,
              step: 9604,
              aDayCalorie: (9604 / 100 * 3.5).toFixed(3),
              basalMetabolism: 1530
          },

            {
              index: 23,
              date: 24,
              step: 8552,
              aDayCalorie: (8552 / 100 * 3.5).toFixed(3),
              basalMetabolism: 1530
          },

            {
              index: 24,
              date: 25,
              step: 307,
              aDayCalorie: (307 / 100 * 3.5).toFixed(3),
              basalMetabolism: 1530
          },

            {
              index: 25,
              date: 26,
              step: 8455,
              aDayCalorie: (8455 / 100 * 3.5).toFixed(3),
              basalMetabolism: 1530
          },

            {
              index: 26,
              date: 27,
              step: 9560,
              aDayCalorie: (9560 / 100 * 3.5).toFixed(3),
              basalMetabolism: 1530
          },

            {
              index: 27,
              date: 28,
              step: 9376,
              aDayCalorie: (9376 / 100 * 3.5).toFixed(3),
              basalMetabolism: 1530
          },

            {
              index: 28,
              date: 29,
              step: 3111,
              aDayCalorie: (3111 / 100 * 3.5).toFixed(3),
              basalMetabolism: 1530
          },

            {
              index: 29,
              date: 30,
              step: 8700,
              aDayCalorie: (8700 / 100 * 3.5).toFixed(3),
              basalMetabolism: 1530
          }
        ]

        },
      };
    },
    components: {
      Card,
      GradientLineChart,
      //Carousel,
      RankingCard,
      //RegistCard,
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
