import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import {createGettext} from "@jshmrtn/vue3-gettext"
import VeeRules from "./libraries/AppsbdVeeRules";
const gettext = createGettext();
import '@vueform/multiselect/themes/default.css'
import { configure } from 'vee-validate';
import EventBus from './libraries/emitter';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import './assets/css/root.scss'
import './assets/css/style.scss'
import PerfectScrollbar from 'vue3-perfect-scrollbar'
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'
import AppsbdUtls from "@/libraries/AppsbdUtls";
import AppsbdURL from "@/libraries/AppsbdURL";
import {VTooltip, VClosePopper, Dropdown, Tooltip, Menu} from 'floating-vue'
import 'floating-vue/dist/style.css'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { createPinia } from "pinia";

import AppsbdWCHelper from "@/libraries/AppsbdWCHelper";
import ACL from "@/libraries/acl";

import { setupCalendar } from 'v-calendar';

import Multiselect from '@vueform/multiselect'
import '@vueform/multiselect/themes/default.css'

const pinia = createPinia();
configure({
    generateMessage: ({ field }) => {
        return  gettext.interpolate(gettext.$gettext('%{fld_name} is not valid'),{fld_name:field});
    },
    bails: true,
    validateOnInput: true,
    validateOnMount:false,
});


createApp(App)

    .use(pinia)
    .use(ACL)
    .use(PerfectScrollbar)
    .use(router)
    .use(VueSweetalert2)
    .use(VeeRules,gettext)
    .provide("$translate",gettext)
    .use(AppsbdUtls,gettext)
    .use(AppsbdWCHelper)
    .use(AppsbdURL,gettext)
    .use(EventBus)
    .directive('tooltip', VTooltip)
    .directive('close-popper', VClosePopper)
    .component('VDropdown', Dropdown)
    .component('VTooltip', Tooltip)
    .component('VMenu', Menu)
    .use(gettext)
    .use(setupCalendar, {})
    .use(Multiselect)
    .mount('#app')
