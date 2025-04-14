<template>
  <div>
    <div class="m-3 ">
      <div class="elite-grid-container">
        <elite-grid
            :is-rounded="true"
            :is-group-separate-head="true"
            action-width="200px"
            :columns="data_column"
            :show-loader="isDataLoader"
            :show-header="false"
            :hide-pagination="true"
            :show-action-column="false"
            :grid-data="gridData"
            :is-show-row-index-column="true"
            @loadData="eliteGridLoadData"
        >
          <template v-slot:slot-loader>
            <APBDGridLoader msg="Loading Role Access"/>
          </template>
          <template v-slot:slottitle="titleslotProps">
            {{ titleslotProps.rowitem.title }} <i
              v-tooltip="this.$translateGettext(titleslotProps.rowitem.tooltip_note)"
              class="vps vps-help-circle apbd-pointer"></i>
          </template>
          <template v-slot:slotconfigure="{val}">
            <VDropdown>
              <button class="btn btn-sm btn-outline-dark">Add</button>
              <template #popper>
                <input class="tooltip-content"  placeholder="Tooltip content" />
              </template>
            </VDropdown>
          </template>
          <template v-slot:slotaction>
            <button  class="btn btn-grid-act btn-sm btn-danger" type="button" @click="editAppAccount(rowitem.id)"> <i class="vps vps-pos-receipt fas fa-pencil "></i> Delete</button>
          </template>
<!--          <template v-slot:actionProperty="{rowitem}">-->
<!--            <div class="d-flex gap-1 justify-content-center">-->
<!--              <button  class="btn btn-grid-act  btn-sm btn-danger" type="button" @click="editAppAccount(rowitem.id)"> <i class="vps vps-pos-receipt fas fa-pencil "></i> Delete</button>-->
<!--            </div>-->
<!--          </template>-->

<!--          <template v-slot:[`slot${role.slug}`]="slotProps" v-for="role in roles">-->
<!--            <span-->
<!--                :class="(slotProps.rowitem[role.slug]=='Y'?' text-theme ':' text-danger ')+ (role.is_editable=='Y'?' apbd-pointer':' apbd-text-bold')"-->
<!--                @click="changePermission(slotProps.rowitem,role)">-->
<!--              <i class="vps " :class="slotProps.rowitem[role.slug]=='Y'?'vps-check':'vps-x'"></i>-->
<!--            </span>-->
<!--          </template>-->
        </elite-grid>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "@/components/Modal";
import EliteGrid from '@appsbd/vue3-elite-grid';
import {EliteColumnModel} from '@appsbd/vue3-elite-grid';
import APBDGridLoader from "@/components/APBDGridLoader";
import ResponseMsg from "@/components/ResponseMsg";
import Multiselect from '@vueform/multiselect';
import {mapStores} from 'pinia'
import {useRewardRulesStore} from '@/modules/RewardRules/RewardRulesStore'

export default {
  name: "RewardPointsRules",
  components: {
    ResponseMsg,
    APBDGridLoader,
    Modal,
    Multiselect,
    EliteGrid
  },
  data() {
    return {
      module_id: "POS_Role",
      isShowModal: false,
      isShowCopyModal: false,
      isShowCounterModal: false,
      isShowLoader: false,
      isDataLoader: false,
      msg: {},
      selectedOutlet: {
        id: '',
        name: '',
        contact_no: '',
        address: '',
        country: ''
      },
      gridData: {
        page: 1,
        total: 1,
        records: 0,
        limit: 100,
        rowdata: [
          {group_title:'User Rules',title:'User',configure:'User',status:'Active'},
          {group_title:'Order Rules',title:'Order',configure:'Order',status:'Active'},
          {group_title:'Affiliate Rules',title:'Affiliate',configure:'Affiliate',status:'Inactive'}
        ]
      },
      add_props: {},
      currentProps: {},
      // roles: ['User', 'Order', 'Affiliation'],
      data_column:[
        EliteColumnModel.getColumn({name: "group_title", title: "Module", width: '200px', is_group_by: true}),
        EliteColumnModel.getColumn({name: "title", title: "Title", width: '200px'}),
        EliteColumnModel.getColumn({name: "configure", title: "Configure", width: '200px'}),
        EliteColumnModel.getColumn({name: "status", title: "Status", width: '200px'}),
        EliteColumnModel.getColumn({name: "action", title: "Action", width: '200px'}),

      ],
      customFields:[
        {
          id:'1',
          label:'Test text field',
          help_text:'Simple Text',
          is_required:'Y',
          type:'T',//T=Textbox,N=Numeric,D=Date,S=Switch,R=Radio,W=Dropdown,E=Text/Instruction,U=URL Input
          options:[],
          opt_limit:'',
          status:'A',
          des:''
        },
        {
          id:'2',
          label:'Test number field',
          help_text:'Testing Number',
          is_required:'Y',
          type:'N',//T=Textbox,N=Numeric,D=Date,S=Switch,R=Radio,W=Dropdown,E=Text/Instruction,U=URL Input
          options:[],
          opt_limit:'',
          status:'A',
          des:''
        },
        {
          id:'3',
          label:'Test Date',
          help_text:'Testing Date',
          is_required:'Y',
          type:'D',//T=Textbox,N=Numeric,D=Date,S=Switch,R=Radio,W=Dropdown,E=Text/Instruction,U=URL Input
          options:[],
          opt_limit:'',
          status:'A',
          des:''
        },
        {
          id:'4',
          label:'Test Radio',
          help_text:'',
          is_required:'Y',
          type:'R',//T=Textbox,N=Numeric,D=Date,S=Switch,R=Radio,W=Dropdown,E=Text/Instruction,U=URL Input
          options:[
            {id:1,val:'test',is_selected:'Y'},
            {id:2,val:'Select',is_selected:'N'},
            {id:3,val:'Test 3',is_selected:'N'},
          ],
          opt_limit:'',
          status:'A',
          des:''
        },
        {
          id:'5',
          label:'Test',
          help_text:'Simple Dropdown',
          is_required:'Y',
          type:'W',//T=Textbox,N=Numeric,D=Date,S=Switch,R=Radio,W=Dropdown,E=Text/Instruction,U=URL Input
          options:[
            {id:1,val:'test',is_selected:'Y'},
            {id:2,val:'Select',is_selected:'N'},
            {id:3,val:'Test 3',is_selected:'N'},
          ],
          opt_limit:'',
          status:'A',
          des:''
        },
        {
          id:'6',
          label:'Text-area',
          help_text:'Text area description',
          is_required:'Y',
          type:'E',//T=Textbox,N=Numeric,D=Date,S=Switch,R=Radio,W=Dropdown,E=Text/Instruction,U=URL Input
          options:[
          ],
          opt_limit:'',
          status:'A',
          des:''
        },
        {
          id:'7',
          label:'Url',
          help_text:'https://example.com',
          is_required:'Y',
          type:'U',//T=Textbox,N=Numeric,D=Date,S=Switch,R=Radio,W=Dropdown,E=Text/Instruction,U=URL Input
          options:[
          ],
          opt_limit:'',
          status:'A',
          des:''
        },
        {
          id:'8',
          label:'Check',
          help_text:'',
          is_required:'Y',
          type:'S',//T=Textbox,N=Numeric,D=Date,S=Switch,R=Radio,W=Dropdown,E=Text/Instruction,U=URL Input
          options:[
          ],
          is_on:'N',
          opt_limit:'',
          status:'A',
          des:''
        },
        {
          id:'9',
          label:'Check Box',
          help_text:'',
          is_required:'Y',
          type:'C',//T=Textbox,N=Numeric,D=Date,S=Switch,R=Radio,W=Dropdown,E=Text/Instruction,U=URL Input
          options:[
            {id:1,val:"Check 1",is_selected: 'Y'},
            {id:2,val:"Check 2",is_selected: 'N'},
            {id:3,val:"Check 3",is_selected: 'Y'},
            {id:4,val:"Check 4",is_selected: 'N'}

          ],
          is_on:'',
          opt_limit:3,
          status:'A',
          des:''
        },
      ]

    }
  },
  computed: {
    ...mapStores(useRewardRulesStore),
    changedFormData() {
      return Object.keys(this.add_props).reduce((formData, field) => {
        if (this.add_props[field] !== this.currentProps[field]) {
          formData[field] = this.add_props[field];
        }
        return formData;
      }, {});
    },

  },
  methods:{
    eliteGridLoadData(gparam) {
      this.gridData.limit = gparam.limit;
      this.gridData.page = gparam.page;
      this.loadGridData();

    },
    async loadGridData(){
      this.isDataLoader = true;
      try {
        let response = await this.rewardRulesStore.getRulesData();
        if (response) {
          this.gridData.records = response.records;
          this.gridData.total = response.total;
          this.gridData.rowdata = response.rowdata;
        }
      } catch (e) {

      }
      this.isDataLoader = false;

    }
  }
}
</script>

<style scoped>

</style>