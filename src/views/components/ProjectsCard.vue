<template>
  <div class="card">
    <div class="card-header pb-0">
      <div class="row">
        <div class="col-lg-6 col-7">
          <h6>Report</h6>
          <div>
            <select class="form-control form-select" v-model="module_id">
              <option value="0">--Select a module to generate report--</option>
              <option name="survey_id" v-for="mod in modules" :key="mod.id" :value="mod">{{ mod.name }}</option>
            </select>
          </div>
        </div>
        <div class="col-lg-6 col-5 my-auto text-end">
          <div class="dropdown float-lg-end pe-4">
            <a class="cursor-pointer" id="dropdownTable" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="fa fa-ellipsis-v text-secondary" aria-hidden="true"></i>
            </a>
            <ul class="dropdown-menu px-2 py-3 ms-sm-n4 ms-n5" aria-labelledby="dropdownTable">
              <li>
                <a class="dropdown-item border-radius-md" href="javascript:;">Action</a>
              </li>
              <li>
                <a class="dropdown-item border-radius-md" href="javascript:;">Another action</a>
              </li>
              <li>
                <a class="dropdown-item border-radius-md" href="javascript:;">Something else here</a>
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
              <th class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7">
                Report Table or Section
              </th>
              <th class="text-uppercase text-secondary text-xs font-weight-bolder opacity-7 ps-2">
                Description
              </th>
              <th class="text-center text-uppercase text-secondary text-xs font-weight-bolder opacity-7">
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
                  <span class="btn btn-sm btn-outline-primary mb-0 text-xs font-weight-bold mx-2" @click="generateCompletions">Download</span>
                </div>
              </td>
            </tr>
            <tr>
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
                  <span class="btn btn-sm btn-outline-primary mb-0 text-xs font-weight-bold mx-2" @click="generateDemographic">Download</span>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div class="d-flex px-2 py-1">
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">Table 3-2-C</h6>
                  </div>
                </div>
              </td>

              <td class="text-sm">
                <span class="text-xs font-weight-bold">Survey Section 1: Technology Platforms Used to Access
                  Courseware</span>
              </td>
              <td class="align-middle">
                <div class="d-flex align-items-center justify-content-center">
                  <span class="btn btn-sm btn-outline-primary mb-0 text-xs font-weight-bold mx-2" @click="generatePlatform">Download</span>
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
                <span style="text-wrap: wrap;" class="text-xs font-weight-bold">Survey Section 2: Technical Problems /
                  Other Error(s) Encountered
                  NOTE: This report only generates issues that have been addressed.</span>
              </td>
              <td class="align-middle">
                <div class="d-flex align-items-center justify-content-center">
                  <span class="btn btn-sm btn-outline-primary mb-0 text-xs font-weight-bold mx-2" @click="generateBugs">Download</span>
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
// import test_doc from "../../assets/templates/test_doc.zip";
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { saveAs } from "file-saver";
import axios from "axios";
import _ from 'lodash';
import moment from "moment";
import { computed } from 'vue';
import { useStore } from "vuex";
import { Document, Packer, Paragraph, Table, TableCell, TableRow, HeadingLevel, WidthType, ShadingType, AlignmentType, } from "@contractmill/docx";
export default {
  name: "projects-card",
  data() {
    return {
      module_id: 0,
      state: {
        name: 'San Luis Potosi',
        map: 'data:image/png;base64',
        municipalities: [
          { name: 'San Luis Potosi', population: 824000 },
          { name: 'Rio Verde', population: 160000 },
          { name: 'Cd Valles', population: 176000 },
          { name: 'Matehuala', population: 82726 }
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
    const intData = [
      {
        "id": 8,
        "createdAt": "2023-08-14T22:11:57.057Z",
        "updatedAt": "2023-08-14T22:11:57.057Z",
        "publishedAt": "2023-08-14T22:11:57.030Z",
        "devicePlatform": null,
        "deviceBrowser": null,
        "feedback": null,
        "user_question": {
          "id": 9,
          "question": "Your military rank",
          "order": 3,
          "type": "single",
          "createdAt": "2023-08-14T22:08:28.049Z",
          "updatedAt": "2023-08-16T02:07:56.958Z",
          "publishedAt": "2023-08-14T22:08:28.046Z",
          "user_template": {
            "id": 1,
            "name": "Test Template",
            "description": "<h2><strong><em>This is a new template</em></strong></h2>",
            "createdAt": "2023-08-09T20:06:36.717Z",
            "updatedAt": "2023-08-16T10:24:33.029Z",
            "publishedAt": "2023-08-09T20:06:36.715Z",
            "user_questions": [
              {
                "id": 10,
                "question": "Are you a current or former 92F10?"
              },
              {
                "id": 8,
                "question": "Did you complete the tutorial?"
              },
              {
                "id": 7,
                "question": "If you are not a skill level 92F10, the length of time in your present position:"
              },
              {
                "id": 9,
                "question": "Your military rank"
              }
            ]
          }
        },
        "user": {
          "id": 2,
          "username": "user"
        },
        "user_answers": [
          {
            "id": 21,
            "answer": "E-3"
          }
        ]
      },
      {
        "id": 9,
        "createdAt": "2023-08-14T22:11:57.062Z",
        "updatedAt": "2023-08-14T22:11:57.062Z",
        "publishedAt": "2023-08-14T22:11:57.043Z",
        "devicePlatform": null,
        "deviceBrowser": null,
        "feedback": null,
        "user_question": {
          "id": 8,
          "question": "Did you complete the tutorial?",
          "order": 2,
          "type": "single",
          "createdAt": "2023-08-14T22:08:27.712Z",
          "updatedAt": "2023-08-16T02:07:42.738Z",
          "publishedAt": "2023-08-14T22:08:27.710Z",
          "user_template": {
            "id": 1,
            "name": "Test Template",
            "description": "<h2><strong><em>This is a new template</em></strong></h2>",
            "createdAt": "2023-08-09T20:06:36.717Z",
            "updatedAt": "2023-08-16T10:24:33.029Z",
            "publishedAt": "2023-08-09T20:06:36.715Z",
            "user_questions": [
              {
                "id": 10,
                "question": "Are you a current or former 92F10?"
              },
              {
                "id": 8,
                "question": "Did you complete the tutorial?"
              },
              {
                "id": 7,
                "question": "If you are not a skill level 92F10, the length of time in your present position:"
              },
              {
                "id": 9,
                "question": "Your military rank"
              }
            ]
          }
        },
        "user": {
          "id": 2,
          "username": "user"
        },
        "user_answers": [
          {
            "id": 17,
            "answer": "Yes"
          }
        ]
      },
      {
        "id": 10,
        "createdAt": "2023-08-14T22:11:57.066Z",
        "updatedAt": "2023-08-14T22:11:57.066Z",
        "publishedAt": "2023-08-14T22:11:57.052Z",
        "devicePlatform": null,
        "deviceBrowser": null,
        "feedback": null,
        "user_question": {
          "id": 7,
          "question": "If you are not a skill level 92F10, the length of time in your present position:",
          "order": 1,
          "type": "single",
          "createdAt": "2023-08-14T22:08:27.046Z",
          "updatedAt": "2023-08-16T02:07:49.879Z",
          "publishedAt": "2023-08-14T22:08:27.041Z",
          "user_template": {
            "id": 1,
            "name": "Test Template",
            "description": "<h2><strong><em>This is a new template</em></strong></h2>",
            "createdAt": "2023-08-09T20:06:36.717Z",
            "updatedAt": "2023-08-16T10:24:33.029Z",
            "publishedAt": "2023-08-09T20:06:36.715Z",
            "user_questions": [
              {
                "id": 10,
                "question": "Are you a current or former 92F10?"
              },
              {
                "id": 8,
                "question": "Did you complete the tutorial?"
              },
              {
                "id": 7,
                "question": "If you are not a skill level 92F10, the length of time in your present position:"
              },
              {
                "id": 9,
                "question": "Your military rank"
              }
            ]
          }
        },
        "user": {
          "id": 2,
          "username": "user"
        },
        "user_answers": [
          {
            "id": 13,
            "answer": "Less than 5 years"
          }
        ]
      },
      {
        "id": 11,
        "createdAt": "2023-08-14T22:11:57.085Z",
        "updatedAt": "2023-08-14T22:11:57.085Z",
        "publishedAt": "2023-08-14T22:11:57.072Z",
        "devicePlatform": null,
        "deviceBrowser": null,
        "feedback": null,
        "user_question": {
          "id": 10,
          "question": "Are you a current or former 92F10?",
          "order": 4,
          "type": "single",
          "createdAt": "2023-08-14T22:08:28.842Z",
          "updatedAt": "2023-08-16T02:07:28.109Z",
          "publishedAt": "2023-08-14T22:08:28.840Z",
          "user_template": {
            "id": 1,
            "name": "Test Template",
            "description": "<h2><strong><em>This is a new template</em></strong></h2>",
            "createdAt": "2023-08-09T20:06:36.717Z",
            "updatedAt": "2023-08-16T10:24:33.029Z",
            "publishedAt": "2023-08-09T20:06:36.715Z",
            "user_questions": [
              {
                "id": 10,
                "question": "Are you a current or former 92F10?"
              },
              {
                "id": 8,
                "question": "Did you complete the tutorial?"
              },
              {
                "id": 7,
                "question": "If you are not a skill level 92F10, the length of time in your present position:"
              },
              {
                "id": 9,
                "question": "Your military rank"
              }
            ]
          }
        },
        "user": {
          "id": 2,
          "username": "user"
        },
        "user_answers": [
          {
            "id": 25,
            "answer": "Yes"
          }
        ]
      }
    ];
    const header = _.sortBy(_.uniqBy(intData, "user_question.id"), "user_question.order");
    header.unshift({user_question: {id: 0}, user: {username: 'USERS'}});
    console.log("header length: ", header.length);
    const usersRow = _.uniqBy(intData, "user.id");
    let tableRows = [];
    let headerRow = {};
    let dataCells = [];
    for(const [index, userItem] of usersRow.entries()) {
      let headerCells = [];
      // create header ROW
      if(index == 0) {
        for(const h of header) {
          let cell;
          if(h.user_question.id == 0) {
            cell = new TableCell({
                children: [new Paragraph(h.user.username)],
            });
            headerCells.push(cell);
          } else {
            cell = new TableCell({
                children: [new Paragraph(h.user_question.question)],
            });
            headerCells.push(cell);
          }
        }
        headerRow = new TableRow({
            children: headerCells,
        });

        for (let i = 0; i < header.length; i++) {
            let dataCell;
            dataCell = new TableCell({
                children: [],
            });
            dataCells.push(dataCell);
        }
      }

      for(const [i, top] of header.entries()) {
        if(i !== 0) {
          let answers = [];
          intData.map(data => {
            if(data.user_question.id === top.user_question.id) {
              let textValue = this.pluckArray(data.user_answers,'answer').join(",");
              answers.push(new Paragraph(textValue))
            }
          });
          console.log("TheReturn: ", answers);
          dataCells[i] = new TableCell({
            children: answers,
          });
        }
      }

      dataCells[0] = new TableCell({
        children: [new Paragraph(userItem.user.username)],
      });

      let row = new TableRow({
          children: dataCells,
      });
      tableRows.push(row);
    }
 
    tableRows.unshift(headerRow);
   
    const table = new Table({
      rows:  tableRows
    });

    const doc = new Document({
      sections: [
        {
          children: [
            table,
          ],
        },
      ],
    });



    Packer.toBlob(doc, true).then((blob) => {
        // saveAs from FileSaver will download the file
        saveAs(blob, "successSheldon.docx");
    });
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
    pluckArray(list, prop) {
      return list.map((item) => item[prop]);
    },
    async generateCompletions() {
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.user.data.jwt}`;
      const data = await axios.get(`https://psb.sitebix.com/api/submissions?filters[survey][module][id][$eq]=${this.module_id.id}&populate[survey][populate][module]=id&populate=user`);
      const arr = _.uniqBy(data.data.data, 'feedback');
      console.log('ARR: ', arr);


      const title = new Paragraph({
        text: "Report: Surveys Completed",
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER
      });

      // Title Row
      const titleRow = [
        new TableRow({
          tableHeader: true,
          children: [
            new TableCell({
              children: [new Paragraph({
                text: this.module_id.name,
                alignment: AlignmentType.CENTER
              })],
              columnSpan: 3
            })
          ],
        })
      ];
      // Header Row
      const headerRow = [
        new TableRow({
          shading: {
            color: "blue"
          },
          tableHeader: true,
          children: [
            new TableCell({
              children: [new Paragraph('USER')],
              shading: {
                fill: "auto",
                type: ShadingType.SOLID,
                color: "f2f2f2",
              },
            }),
            new TableCell({
              children: [new Paragraph('SURVEY')],
              shading: {
                fill: "auto",
                type: ShadingType.SOLID,
                color: "f2f2f2",
              },
            }),
            new TableCell({
              children: [new Paragraph('COMPLETED DATE')],
              shading: {
                fill: "auto",
                type: ShadingType.SOLID,
                color: "f2f2f2",
              },
            }),
          ],
        }),
      ];
      // DATA Row
      const infoArr = [];

      arr.forEach(item => {
        let row = new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph(item.user.username)],
            }),
            new TableCell({
              children: [new Paragraph(item.survey.name)],
            }),
            new TableCell({
              children: [new Paragraph(new Date(item.createdAt).toDateString())],
            }),
          ],
        });
        infoArr.push(row)
      });

      const allRows = [];
      allRows.push(...titleRow, ...headerRow, ...infoArr);

      const table = new Table({
        rows: allRows,
        width: {
          size: 100,
          type: WidthType.PERCENTAGE,
        },
        alignment: AlignmentType.CENTER,
      });

      const doc = new Document({
        sections: [
          {
            children: [
              title,
              table,
            ],
          },
        ],
      });

      Packer.toBlob(doc).then((blob) => {
        // saveAs from FileSaver will download the file
        saveAs(blob, "example.docx");
      });

    },
    async generateDemographic() {
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.user.data.jwt}`;
      const data = await axios.get(`https://psb.sitebix.com/api/user-submissions?populate[user_question][populate][user_template][fields][0]=id&populate[user_question][fields][0]=question&populate[user_answers][fields][0]=answer&populate[user][fields][1]=username`);
      //const arr = _.uniqBy(data.data.data, 'user');
      const arr = _.groupBy(data.data.data, user => user.user.id);
      //const groupedArray = Object.values(arr);
      console.log('ARR: ', Object.values(arr));

      const questionsArray = [];
      const answersArray = [];
      const transformedData = data.data.data.reduce((result, entry) => {
        const question = entry.user_question.question;
        const answer = entry.user_answers[0]?.answer;
        if (question && answer) {
          questionsArray.push(question);
          if (!_.find(answersArray, entry.user_answers[0]?.answer)) {
            answersArray.push({
              username: entry.user.username,
              question: entry.user_question.question,
              answer: entry.user_answers[0]?.answer
            });
          }
          result[question] = answer;
        }
        return result;
      }, {});
      let merged = _.uniqWith(answersArray, (pre, cur) => {
        if (pre.username == cur.username) {
          cur.answer = cur.answer + "," + pre.answer;
          return true;
        }
        return false;
      });
      //const v = _.sortBy(answersArray, 'question');

      console.log('edited:', merged);
      console.log(transformedData);

      const finalAnswer = _.uniqBy(answersArray, 'user');
      console.log(_.uniqBy(answersArray, 'user'));

      const title = new Paragraph({
        text: "Report: Demographic Profile of Participants",
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER
      });

      // // // Title Row
      // const titleRow = [
      //   new TableRow({
      //       tableHeader: true,
      //       children: [
      //           new TableCell({
      //               children: [new Paragraph({
      //                 text: this.module_id.name,
      //                 alignment: AlignmentType.CENTER
      //               })],
      //               columnSpan: 3
      //           })
      //       ],
      //   })
      // ];
      // // Header Row
      //const headerArr = [];
      const totalQuestions = _.uniq(questionsArray);
      const HeaderRow = [
        new TableRow({
          shading: {
            color: "blue"
          },
          tableHeader: true,
          children: totalQuestions.map((item) =>
            new TableCell({
              children: [new Paragraph(item)],
              shading: {
                fill: "auto",
                type: ShadingType.SOLID,
                color: "f2f2f2",
              },
            }),
          )

        })
      ]
      // // DATA Row
      const infoArr = [];
      finalAnswer.map((item) => {
        let row = new TableRow({
          children: _.uniq(item.answers).map((val) =>
            new TableCell({
              children: [new Paragraph(val)],
            }),
          ),
        });
        infoArr.push(row)

      })

      const allRows = [];
      allRows.push(...HeaderRow, ...infoArr);

      const table = new Table({
        rows: allRows,
        width: {
          size: 100,
          type: WidthType.PERCENTAGE,
        },
        alignment: AlignmentType.CENTER,
      });

      const doc = new Document({
        sections: [
          {
            children: [
              title,
              table,
            ],
          },
        ],
      });

      Packer.toBlob(doc).then((blob) => {
        // saveAs from FileSaver will download the file
        saveAs(blob, "demographic_example.docx");
      });

    },
    async generateDemographic2() {
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
        doc.setData({ data: Object.values(arr), template: account.data.data.name });
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

        const calculateBrowserPercentage = (browserName, deviceName, personsArray) => {
          const totalCount = personsArray.length;
          let browserCount = 0;
          // Count occurrences of the provided browser name
          personsArray.forEach(person => {
            const userBrowser = person.deviceBrowser;
            const userDevice = person.devicePlatform; // Replace with the actual property name containing the browser name
            if (userBrowser.toLowerCase().includes(browserName.toLowerCase()) && userDevice.toLowerCase().includes(deviceName.toLowerCase())) {
              browserCount++;
            }
          });
          // Calculate the percentage
          const percentage = (browserCount / totalCount) * 100;
          return percentage.toFixed(0);
        }
        const calculateDevicePercentage = (deviceName, personsArray) => {
          const totalCount = personsArray.length;
          let browserCount = 0;
          // Count occurrences of the provided browser name
          personsArray.forEach(person => {
            const userDevice = person.devicePlatform; // Replace with the actual property name containing the browser name
            if (userDevice.toLowerCase().includes(deviceName.toLowerCase())) {
              browserCount++;
            }
          });
          // Calculate the percentage
          const percentage = (browserCount / totalCount) * 100;
          return percentage.toFixed(0);
        }
        // console.log('Percent: ', calculateBrowserPercentage('Edge',arr));
        //arr.push(data.data.data, {account_name: data.data.data[0].survey.module.account.name})
        doc.setData({
          data: arr, browsers: browsers,
          name: this.module_id.name,
          percent_pc: calculateDevicePercentage('Windows',arr),
          percent_mac: calculateDevicePercentage('Mac',arr),
          percent_ios: calculateDevicePercentage('ios',arr),
          percent_android: calculateDevicePercentage('Android',arr),
          mobile_ios: 0,
          tablet_ios: 0,
          mobile_android: 0,
          tablet_android: 0,
          pc_ie: calculateBrowserPercentage('Explorer', 'Windows',arr),
          pc_me: calculateBrowserPercentage('Edge','Windows',arr),
          pc_gc: calculateBrowserPercentage('Chrome','Windows',arr),
          pc_mf: calculateBrowserPercentage('Firefox','Windows',arr),
          pc_other: 0,
          mac_gc: calculateBrowserPercentage('Chrome','Mac',arr),
          mac_mf: calculateBrowserPercentage('Firefox','Mac',arr),
          mac_safari: calculateBrowserPercentage('safari','Mac',arr),
          mac_other: 0,
          ios_me: calculateBrowserPercentage('Edge','ios',arr),
          ios_gc: calculateBrowserPercentage('Chrome','ios',arr),
          ios_mf: calculateBrowserPercentage('Firefox','ios',arr),
          ios_safari: calculateBrowserPercentage('safari','ios',arr),
          ios_other: 0,
          android_me: calculateBrowserPercentage('Edge','Android',arr),
          android_gc: calculateBrowserPercentage('Chrome','Android',arr),
          android_mf: calculateBrowserPercentage('Firefox','Android',arr),
          android_other: 0,
          day: moment(new Date()).format('dddd'),
          date: moment(new Date()).format("MMMM Do, YYYY"),
          time: moment().format('LT')
        });
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
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.user.data.jwt}`;
      const data = await axios.get(`https://psb.sitebix.com/api/bugs?populate[survey][fields][0]=id&populate[survey][fields][1]=name&populate[bug_logs]=*`);
      const arr = data.data.data;
      console.log('ARR: ', arr);


      const title = new Paragraph({
        text: "Report: Questionnaire Summary – Technical Problems / Other Error(s) Encountered",
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER
      });
      const titleArr = []
      // Title Row
      arr.forEach(items => {
        let row = new TableRow({
          tableHeader: true,
          children: [
            new TableCell({
              children: [new Paragraph({
                text: items.description,
                alignment: AlignmentType.CENTER
              })],
              columnSpan: 3
            })
          ],
        })
        titleArr.push(row);
      })
      // Header Row
      const headerRow = [
        new TableRow({
          shading: {
            color: "blue"
          },
          tableHeader: true,
          children: [
            new TableCell({
              children: [new Paragraph('COMMENT')],
              shading: {
                fill: "auto",
                type: ShadingType.SOLID,
                color: "f2f2f2",
              },
            }),
            new TableCell({
              children: [new Paragraph('STATUS')],
              shading: {
                fill: "auto",
                type: ShadingType.SOLID,
                color: "f2f2f2",
              },
            }),
            new TableCell({
              children: [new Paragraph('LAST UPDATED DATE')],
              shading: {
                fill: "auto",
                type: ShadingType.SOLID,
                color: "f2f2f2",
              },
            }),
          ],
        }),
      ];
      // DATA Row
      const infoArr = [];

      arr.forEach(items => {
        items.bug_logs.forEach(item => {
          let row = new TableRow({
            children: [
              new TableCell({
                children: [new Paragraph(item.comment)],
              }),
              new TableCell({
                children: [new Paragraph(item.status)],
              }),
              new TableCell({
                children: [new Paragraph(new Date(item.updatedAt).toDateString())],
              }),
            ],
          });
          infoArr.push(row)
        })
      });

      const allRows = [];
      allRows.push(...titleArr,...headerRow, ...infoArr);

      const table = new Table({
        rows: allRows,
        width: {
          size: 100,
          type: WidthType.PERCENTAGE,
        },
        alignment: AlignmentType.CENTER,
      });

      const doc = new Document({
        sections: [
          {
            children: [
              title,
              table,
            ],
          },
        ],
      });

      Packer.toBlob(doc).then((blob) => {
        // saveAs from FileSaver will download the file
        saveAs(blob, "example.docx");
      });
      // try {
      //   const templatePath = "/files/bugs.docx"; // Path to your docx template

      //   // Load the template
      //   const response = await fetch(templatePath);
      //   const templateBuffer = await response.arrayBuffer();
      //   console.log(templateBuffer);
      //   const zip = new PizZip(templateBuffer);

      //   axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.user.data.jwt}`;
      //   const data = await axios.get(`https://psb.sitebix.com/api/bugs?populate[survey][fields][0]=id&populate[survey][fields][1]=name&populate[bug_logs]=*`);
      //   // // Replace a placeholder in the template with the asset content
      //   console.log(data.data);
      //   const doc = new Docxtemplater().loadZip(zip);
      //   //arr.push(data.data.data, {account_name: data.data.data[0].survey.module.account.name})
      //   doc.setData({ data: data.data.data });
      //   doc.render();
      //   const generatedContent = doc.getZip().generate({
      //     type: "blob",
      //     mimeType:
      //       "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      //   });
      //   saveAs(generatedContent, `technical_issues-${Date.now()}.docx`);

      //   console.log('Document generated successfully.');
      // } catch (error) {
      //   console.log('ERROR: ', error);
      // }

    },
  }
};
</script>
<style>
.text-xs {
  cursor: pointer;
}
</style>