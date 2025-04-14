import {defineStore} from "pinia";
import AxiosHelper from "@/libraries/AppsbdAxiosHelper";

export const useRewardRulesStore = defineStore({
    id:'rewardRules',
    state:()=>({}),
    getters:{},
    actions:{
        async getRulesData(){
            // return await AxiosHelper.get(window.apbd_deal.base_url + 'api/root/app_account_list')
            //     .then((resp) => {
            //         this.firstLoaded = false;
            //         return resp?.data;
            //     }).catch((e) => {
            //         return e.response.data;
            //     });
        }
    }
})