import Vue from 'vue'

import '@pb/index.scss'
import '@pb/normalize.less'

import './plugins/fontawesome';
import CustomDirectives from './plugins/directives';
export * from './components'

Vue.use(CustomDirectives);
Vue.config.productionTip = false
