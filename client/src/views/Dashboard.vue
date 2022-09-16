<template>
   <div class="py-4 container-fluid">
    <div class="row">
      <div class="col-lg-12">
        <div class="row">
          <!-- 日付-->
          <div class="col-lg-4">
            <card
              :title="stats.money.title"
              :value="stats.money.value"
              :percentage="stats.money.percentage"
              :iconClass="stats.money.iconClass"
              :iconBackground="stats.money.iconBackground"
              :detail="stats.money.detail"
              directionReverse
            ></card>
          </div>
          <!-- 今日の歩数 -->
          <div class="col-lg-4">
            <card
              :title="stats.users.title"
              :value="sdata.id[num].step"
              :percentage="stats.users.percentage"
              :iconClass="stats.users.iconClass"
              :iconBackground="stats.users.iconBackground"
              :detail="stats.users.detail"
              directionReverse
            ></card>
          </div>
          <!-- カロリー -->
          <div class="col-lg-4">
            <card
              :title="stats.clients.title"
              :value="sdata.id[num].aDayCalorie"
              :percentage="stats.clients.percentage"
              :iconClass="stats.clients.iconClass"
              :iconBackground="stats.clients.iconBackground"
              :percentageColor="stats.clients.percentageColor"
              :detail="stats.clients.detail"
              directionReverse
            ></card>
          </div>
        </div>
        <div class="row">
          <!-- 飲酒量  -->
          <div class="col-lg-5">
            <card
              :title="stats.drink.title"
              :value="stats.drink.value"
              :percentage="stats.drink.percentage"
              :iconClass="stats.drink.iconClass"
              :iconBackground="stats.drink.iconBackground"
              :percentageColor="stats.drink.percentageColor"
              :detail="stats.drink.detail"
              directionReverse
            >
            </card>
            <!-- <carousel /> -->
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
//import { num } from '/src/examples/Charts/GradientLineChart.vue';

import PI from "@/assets/img/icons/flags/personicon.png";

let d = new Date();
let year = d.getUTCFullYear();
let month = d.getUTCMonth() + 1;
let day = d.getUTCDate();
//var num = Math.floor( Math.random() * 30 );

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
          title: "消費カロリー(kcal)",
          value: "3,000" + "kcal",
          percentage: "-2%",
          iconClass: "fa fa-cutlery",
          percentageColor: "text-danger",
          iconBackground: "bg-gradient-success",
          detail: "前日比",
        },
        drink: {
          title: "飲酒可能量",
          value: "ビール" + "3,000" + "杯",
          percentage: "-2%",
          value2: "ハイボール" + "4000" + "杯",
          percentage2: "-5%",
          value3: "レモンサワー" + "3700" + "杯",
          percentage3: "-4%",
          iconClass: "fa fa-beer",
          percentageColor: "text-danger",
          iconBackground: "bg-gradient-warning",
          detail: "前日比",
        },
      },
      sales: {
        us: {
          name: "Yamada Taro",
          step: 2500,
          cal: "$230,900",
          drink: "29.9%",
          flag: PI,

        },
        germany: {
          name: "Germany",
          step: "3.900",
          cal: "$440,000",
          drink: "40.22%",
          flag: PI,

        },
        britain: {
          name: "Great Britain",
          step: "1.400",
          cal: "$190,700",
          drink: "23.44%",
          flag: PI,

        },
        brasil: {
          name: "Brasil",
          step: "562",
          cal: "$143,960",
          drink: "32.14%",
          flag: PI,

        },
      },
      
      sdata:
      {
        id:[
          {
            index: 0,
            date: 1, //
            step: 514,  //
            aDayCalorie: 514/100*3.5, //  100歩で3.5Kcal
            basalMetabolism: 1530
          },

          {
            index: 1,
            date: 2,
            step: 14913,
            aDayCalorie: 14913/100*3.5,
            basalMetabolism: 1530
          },

          {
            index: 2,
            date: 3,
            step: 9786,
            aDayCalorie: 9786/100*3.5,
            basalMetabolism: 1530
          },

          {
            index: 3,
            date: 4,
            step: 3631,
            aDayCalorie: 3631/100*3.5,
            basalMetabolism: 1530
          },

          {
            index: 4,
            date: 5,
            step: 2393,
            aDayCalorie: 2393/100*3.5,
            basalMetabolism: 1530
          },

          {
            index: 5,
            date: 6,
            step: 6260,
            aDayCalorie: 6260/100*3.5,
            basalMetabolism: 1530
          },

          {
            index: 6,
            date: 7,
            step: 5933,
            aDayCalorie: 5933/100*3.5,
            basalMetabolism: 1530
          },

          {
            index: 7,
            date: 8,
            step: 6974,
            aDayCalorie: 6974/100*3.5,
            basalMetabolism: 1530
          },

          {
            index: 8,
            date: 9,
            step: 8460,
            aDayCalorie: 8460/100*3.5,
            basalMetabolism: 1530
          },

          {
            index: 9,
            date: 10,
            step: 6539,
            aDayCalorie: 6539/100*3.5,
            basalMetabolism: 1530
          },

          {
            index: 10,
            date: 11,
            step: 7187,
            aDayCalorie: 7187/100*3.5,
            basalMetabolism: 1530
          },

          {
            index: 11,
            date: 12,
            step: 11763,
            aDayCalorie: 11763/100*3.5,
            basalMetabolism: 1530
          },

          {
            index: 12,
            date: 13,
            step: 14322,
            aDayCalorie: 14322/100*3.5,
            basalMetabolism: 1530
          },

          {
            index: 13,
            date: 14,
            step: 881,
            aDayCalorie: 881,
            basalMetabolism: 1530
          },

          {
            index: 14,
            date: 15,
            step: 6517,
            aDayCalorie: 6571/100*3.5,
            basalMetabolism: 1530
          },

          {
            index: 15,
            date: 16,
            step: 1946,
            aDayCalorie: 1946/100*3.5,
            basalMetabolism: 1530
          },

          {
            index: 16,
            date: 17,
            step: 8185,
            aDayCalorie: 8185/100*3.5,
            basalMetabolism: 1530
          },

          {
            index: 17,
            date: 18,
            step: 13227,
            aDayCalorie: (13227/100)*3.5,
            basalMetabolism: 1530
          },

          {
            index: 18,
            date: 19,
            step: 411,
            aDayCalorie: 411/100*3.5,
            basalMetabolism: 1530
          },

          {
            index: 19,
            date: 20,
            step: 9185,
            aDayCalorie: 9185/100*3.5,
            basalMetabolism: 1530
          },

          {
            index: 20,
            date: 21,
            step: 3340,
            aDayCalorie: 3340/100*3.5,
            basalMetabolism: 1530
          },

          {
            index: 21,
            date: 22,
            step: 1201,
            aDayCalorie: 1201/100*3.5,
            basalMetabolism: 1530
          },

          {
            index: 22,
            date: 23,
            step: 9604,
            aDayCalorie: 9604/100*3.5,
            basalMetabolism: 1530
          },

          {
            index: 23,
            date: 24,
            step: 8552,
            aDayCalorie: 8552/100*3.5,
            basalMetabolism: 1530
          },

          {
            index: 24,
            date: 25,
            step: 307,
            aDayCalorie: 307/100*3.5,
            basalMetabolism: 1530
          },

          {
            index: 25,
            date: 26,
            step: 8455,
            aDayCalorie: 8455/100*3.5,
            basalMetabolism: 1530
          },

          {
            index: 26,
            date: 27,
            step: 9560,
            aDayCalorie: 9560/100*3.5,
            basalMetabolism: 1530
          },

          {
            index: 27,
            date: 28,
            step: 9376,
            aDayCalorie: 9376/100*3.5,
            basalMetabolism: 1530
          },

          {
            index: 28,
            date: 29,
            step: 3111,
            aDayCalorie: 3111/100*3.5,
            basalMetabolism: 1530
          },

          {
            index: 29,
            date: 30,
            step: 8700,
            aDayCalorie: 8700/100*3.5,
            basalMetabolism: 1530
          }
          ]
       
    },
      
    };
  },
  computed:{
    num:function(){
      return Math.floor( Math.random() * 30 )
    }
  },
  components: {
    Card,
    GradientLineChart,
    //Carousel,
    RankingCard,
  },
};
</script>
