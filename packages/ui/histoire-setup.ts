import { defineSetupVue3 } from '@histoire/plugin-vue'
import HistoireWrapper from './HistoireWrapper.vue'
import '@angelblanco/tailwind'
import '@angelblanco/fonts'

export const setupVue3 = defineSetupVue3(({ addWrapper }) => {
  addWrapper(HistoireWrapper)
})
