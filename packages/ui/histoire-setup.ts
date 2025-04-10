import "@angelblanco/tailwind";
import "@angelblanco/fonts";
import HistoireWrapper from "./HistoireWrapper.vue";
import { defineSetupVue3 } from "@histoire/plugin-vue";

export const setupVue3 = defineSetupVue3(({ addWrapper }) => {
  addWrapper(HistoireWrapper);
});
