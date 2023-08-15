<template>
  <div class="card">
    <div class="card-header pb-0">
      <div class="row">
        <div class="col-lg-6 col-7">
          <h6>Report</h6>
          <div>
            <select class="form-control form-select" v-model="module_id">
              <option value="0">--Select a module to generate report--</option>
              <option name="survey_id" v-for="mod in modules" :key="mod.id" :value="mod.id">{{ mod.name }}</option>
            </select>
          </div>
        </div>
        <div class="col-lg-6 col-5 my-auto text-end">
          <div class="dropdown float-lg-end pe-4">
            <a
              class="cursor-pointer"
              id="dropdownTable"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="fa fa-ellipsis-v text-secondary" aria-hidden="true"></i>
            </a>
            <ul
              class="dropdown-menu px-2 py-3 ms-sm-n4 ms-n5"
              aria-labelledby="dropdownTable"
            >
              <li>
                <a class="dropdown-item border-radius-md" href="javascript:;"
                  >Action</a
                >
              </li>
              <li>
                <a class="dropdown-item border-radius-md" href="javascript:;"
                  >Another action</a
                >
              </li>
              <li>
                <a class="dropdown-item border-radius-md" href="javascript:;"
                  >Something else here</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="card-body px-0 pb-2">
      <div v-if="module_id != '0'" class="table-responsive">
        <table class="table align-items-center mb-0">
          <thead>
            <tr>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Report Table or Section
              </th>
              <th
                class="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2"
              >
                Description
              </th>
              <th
                class="text-center text-uppercase text-secondary text-xxs font-weight-bolder opacity-7"
              >
                Generate Report
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div class="d-flex px-2 py-1">
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">Survey Completions</h6>
                  </div>
                </div>
              </td>
 
              <td class="text-sm">
                <span class="text-xs font-weight-bold">Surveys Completed by Module</span>
              </td>
              <td class="align-middle">
                <div class="d-flex align-items-center justify-content-center">
                  <span class="text-xs font-weight-bold mx-2" @click="generateCompletions">Download</span>
                </div>
              </td>
            </tr>
            <!-- <tr>
              <td>
                <div class="d-flex px-2 py-1">
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">Table 3-2-A</h6>
                  </div>
                </div>
              </td>
              <td class="text-sm">
                <span class="text-xs font-weight-bold">Survey Section 1: Demographic Profile of Participants</span>
              </td>
              <td class="align-middle">
                <div class="d-flex align-items-center justify-content-center">
                  <span class="text-xs font-weight-bold mx-2" @click="generateDemographic">Download</span>
                </div>
              </td>
            </tr> -->
            <tr>
              <td>
                <div class="d-flex px-2 py-1">
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">Table 3-2-C</h6>
                  </div>
                </div>
              </td>
  
              <td class="text-sm">
                <span class="text-xs font-weight-bold">Survey Section 1: Technology Platforms Used to Access Courseware</span>
              </td>
              <td class="align-middle">
                <div class="d-flex align-items-center justify-content-center">
                  <span class="text-xs font-weight-bold mx-2" @click="generatePlatform">Download</span>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="d-flex px-2 py-1">
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">Section 2 Data (Appendix N)</h6>
                  </div>
                </div>
              </td>
  
              <td class="text-sm">
                <span style="text-wrap: wrap;" class="text-xs font-weight-bold">Survey Section 2: Technical Problems / Other Error(s) Encountered
NOTE: This report only generates issues that have been addressed.</span>
              </td>
              <td class="align-middle">
                <div class="d-flex align-items-center justify-content-center">
                  <span class="text-xs font-weight-bold mx-2" @click="generateBugs">Download</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import setTooltip from "@/assets/js/tooltip.js";
import img1 from "../../assets/img/small-logos/logo-xd.svg";
import img2 from "../../assets/img/team-1.jpg";
import img3 from "@/assets/img/team-2.jpg";
import img4 from "../../assets/img/team-3.jpg";
import img5 from "../../assets/img/team-4.jpg";
import img6 from "../../assets/img/small-logos/logo-atlassian.svg";
import img7 from "../../assets/img/team-2.jpg";
import img8 from "../../assets/img/team-4.jpg";
import img9 from "../../assets/img/small-logos/logo-slack.svg";
import img10 from "../../assets/img/team-3.jpg";
import img11 from "../../assets/img/team-1.jpg";
import img12 from "../../assets/img/small-logos/logo-spotify.svg";
import img13 from "../../assets/img/team-4.jpg";
import img14 from "../../assets/img/team-3.jpg";
import img15 from "../../assets/img/team-4.jpg";
import img16 from "../../assets/img/team-1.jpg";
import img17 from "../../assets/img/small-logos/logo-jira.svg";
import img18 from "../../assets/img/team-4.jpg";
import img19 from "../../assets/img/small-logos/logo-invision.svg";
import img20 from "../../assets/img/team-1.jpg";
import img21 from "../../assets/img/team-4.jpg";
// import test_doc from "../../assets/templates/test_doc.zip";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { saveAs } from "file-saver";
import axios from "axios";
import _ from 'lodash';
import moment from "moment";
import { computed } from 'vue';
import { useStore } from "vuex";
export default {
  name: "projects-card",
  data() {
    return {
      img1,
      img2,
      img3,
      img4,
      img5,
      img6,
      img7,
      img8,
      img9,
      img10,
      img11,
      img12,
      img13,
      img14,
      img15,
      img16,
      img17,
      img18,
      img19,
      img20,
      img21,
      module_id: 0,
      state: {
        name: 'San Luis Potosi',
        map: 'data:image/png;base64',
        municipalities: [
          {name:'San Luis Potosi', population: 824000}, 
          {name:'Rio Verde', population: 160000},
          {name:'Cd Valles', population: 176000},
          {name:'Matehuala', population:82726}
        ],
        tourist_attractions: [
          'Tamtoc', 'Sótano de las Golondrinas', 'Cascada de Tamul' 
        ]
      }
    };
  },
  components: {

  },
  mounted() {
    setTooltip();
  },
  setup() {
    const store = useStore();

    let modules = computed(function () {
      return store.getters.getModules
    });


    return {
      modules
    }
  },
  methods: {
    async generateCompletions() {
      try {
        const templatePath = "/files/survey_completions.docx"; // Path to your docx template

        // Load the template
        const response = await fetch(templatePath);
        const templateBuffer = await response.arrayBuffer();
        console.log(templateBuffer);
        const zip = new PizZip(templateBuffer);

        axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.user.data.jwt}`;
        const data = await axios.get(`https://psb.sitebix.com/api/submissions?filters[survey][module][id][$eq]=${this.module_id}&populate[survey][populate][module]=id&populate=user`);
        const account = await axios.get(`https://psb.sitebix.com/api/accounts/${this.$store.state.accountId}`);
        // // Replace a placeholder in the template with the asset content
        console.log(data.data);
        const doc = new Docxtemplater().loadZip(zip);
        const arr = _.uniqBy(data.data.data, 'feedback');
        console.log('ARR: ', arr);
        //arr.push(data.data.data, {account_name: data.data.data[0].survey.module.account.name})
        doc.setData({data: arr, account_name: account.data.data.name, 
          day: moment(new Date()).format('dddd'),
          date: moment(new Date()).format("MMMM Do, YYYY"),
        time: moment().format('LT')});
        doc.render();
        const generatedContent = doc.getZip().generate({
            type: "blob",
            mimeType:
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          });
        saveAs(generatedContent, `survey_completions-${Date.now()}.docx`);

        console.log('Document generated successfully.');
      } catch (error) {
        console.log('ERROR: ', error);
      }

    },
    async generateDemographic() {
      try {
        const templatePath = "/files/Table 3-2-A.docx"; // Path to your docx template

        // Load the template
        const response = await fetch(templatePath);
        const templateBuffer = await response.arrayBuffer();
        console.log(templateBuffer);
        const zip = new PizZip(templateBuffer);

        axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.user.data.jwt}`;
        const data = await axios.get('https://psb.sitebix.com/api/user-submissions?populate[user_question][populate][user_template][fields][0]=id&populate[user_question][fields][0]=question&populate[user_answers][fields][0]=answer&populate[user][fields][1]=username');
        const account = await axios.get(`https://psb.sitebix.com/api/accounts/${this.$store.state.accountId}`);
        // // Replace a placeholder in the template with the asset content
        console.log(data.data);
        const doc = new Docxtemplater().loadZip(zip);
        const arr = _.groupBy(data.data.data, user => user.user.id);
       // const answers = _.map(data.data.data, 'user_answers');

        console.log('ARR: ', arr);
        //arr.push(data.data.data, {account_name: data.data.data[0].survey.module.account.name})
        doc.setData({data: Object.values(arr), template: account.data.data.name});
        doc.render();
        // const generatedContent = doc.getZip().generate({
        //     type: "blob",
        //     mimeType:
        //       "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        //   });
        // saveAs(generatedContent, `Table_3_2_A-${Date.now()}.docx`);

        console.log('Document generated successfully.');
      } catch (error) {
        console.log('ERROR: ', error);
      }

    },
    async generatePlatform() {
      try {
        const templatePath = "/files/Table 3-2-C.docx"; // Path to your docx template

        // Load the template
        const response = await fetch(templatePath);
        const templateBuffer = await response.arrayBuffer();
        console.log(templateBuffer);
        const zip = new PizZip(templateBuffer);

        axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.user.data.jwt}`;
        const data = await axios.get(`https://psb.sitebix.com/api/submissions?populate=user`);
        // // Replace a placeholder in the template with the asset content
        console.log(data.data);
        const doc = new Docxtemplater().loadZip(zip);
        const arr = _.uniqBy(data.data.data, 'feedback');
        const browsers = _.uniq(_.map(data.data.data, 'deviceBrowser'));
        console.log('ARR: ', arr);
        //arr.push(data.data.data, {account_name: data.data.data[0].survey.module.account.name})
        doc.setData({data: arr, browsers: browsers, 
          percent_pc: 0,
          percent_mac: 0,
          percent_ios: 0,
          percent_android: 0,
          mobile_ios: 0,
          tablet_ios: 0,
          mobile_android: 0,
          tablet_android: 0,
          pc_ie: 0,
          pc_me: 0,
          pc_gc: 0,
          pc_mf: 0,
          pc_other: 0,
          mac_gc: 0,
          mac_mf: 0,
          mac_safari: 0,
          mac_other: 0,
          ios_me: 0,
          ios_gc: 0,
          ios_mf: 0,
          ios_safari: 0,
          ios_other: 0,
          android_me: 0,
          android_gc: 0,
          android_mf: 0,
          android_other: 0,
          day: moment(new Date()).format('dddd'),
          date: moment(new Date()).format("MMMM Do, YYYY"),
        time: moment().format('LT')});
        doc.render();
        const generatedContent = doc.getZip().generate({
            type: "blob",
            mimeType:
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          });
        saveAs(generatedContent, `survey_completions-${Date.now()}.docx`);

        console.log('Document generated successfully.');
      } catch (error) {
        console.log('ERROR: ', error);
      }

    },
    async generateBugs() {
      try {
        const templatePath = "/files/bugs.docx"; // Path to your docx template

        // Load the template
        const response = await fetch(templatePath);
        const templateBuffer = await response.arrayBuffer();
        console.log(templateBuffer);
        const zip = new PizZip(templateBuffer);

        axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.user.data.jwt}`;
        const data = await axios.get(`https://psb.sitebix.com/api/bugs`);
        // // Replace a placeholder in the template with the asset content
        console.log(data.data);
        const doc = new Docxtemplater().loadZip(zip);
        //arr.push(data.data.data, {account_name: data.data.data[0].survey.module.account.name})
        doc.setData({data: data.data.data});
        doc.render();
        const generatedContent = doc.getZip().generate({
            type: "blob",
            mimeType:
              "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          });
        saveAs(generatedContent, `technical_issues-${Date.now()}.docx`);

        console.log('Document generated successfully.');
      } catch (error) {
        console.log('ERROR: ', error);
      }

    },
  }
};
</script>
<style>
.text-xs{
  cursor: pointer;
}
</style>