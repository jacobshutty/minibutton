import Vue from "vue";
import MiniButton from "./MiniButton.vue";

Vue.config.productionTip = false;

new Vue({
  render: h => h(MiniButton)
}).$mount("#app");
