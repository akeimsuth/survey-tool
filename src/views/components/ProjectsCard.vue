<template>
  <!--Modal-->
  <div v-if="reportEmptyModal" class="modal-overlay">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="userModalLabel">Empty Report</h5>
        <button @click="closeModal" type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <form class="modal-body">
        <h6>No Reports Available or Please select a module</h6>
        <h6>Contact Administrator if you have any issues.</h6>
      </form>
    </div>
  </div>
  <!--END Modal-->
  <div class="card">
    <div class="card-header pb-0">
      <div class="row">
        <div class="col-lg-6 col-7">
          <h6>Report</h6>
          <div style="display: flex; justify-content: space-between; width: 600px">
            <select style="width: 300px" class="form-control form-select mr-4" v-model="module_id">
              <option value="-1">--Select a module to generate report--</option>
              <option value="0">View All Reports</option>
              <option name="module_id" v-for="mod in modules" :key="mod.id" :value="mod">{{ mod.name }}</option>
            </select>
            <select style="width: 200px" class="form-control form-select ml-4" v-model="tag_id">
              <option value="0">--Select Tag Reports--</option>
              <option name="tag_id" v-for="tag in tags" :key="tag.id" :value="tag">{{ tag.tag }}</option>
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
      <div class="table-responsive">
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
            <tr v-if="this.module_id == 0">
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
                  <span class="btn btn-sm btn-outline-primary mb-0 text-xs font-weight-bold mx-2"
                    @click="generateCompletions">Download</span>
                </div>
              </td>
            </tr>
            <tr v-if="this.module_id == 0">
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
                  <span class="btn btn-sm btn-outline-primary mb-0 text-xs font-weight-bold mx-2"
                    @click="generateDemographic">Download</span>
                </div>
              </td>
            </tr>
            <tr v-if="this.module_id == 0">
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
                  <span class="btn btn-sm btn-outline-primary mb-0 text-xs font-weight-bold mx-2"
                    @click="generatePlatform">Download</span>
                </div>
              </td>
            </tr>
            <tr v-if="this.module_id == 0">
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
                  <span class="btn btn-sm btn-outline-primary mb-0 text-xs font-weight-bold mx-2"
                    @click="generateBugs">Download</span>
                </div>
              </td>
            </tr>
            <tr v-if="tag_id != 0">
              <td>
                <div class="d-flex px-2 py-1">
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">Table 3-3-A-1 {{ tag_id.tag }}</h6>
                  </div>
                </div>
              </td>

              <td class="text-sm">
                <span style="text-wrap: wrap;" class="text-xs font-weight-bold">Survey Section 3A: Likert Items for {{
                  tag_id.tag }}
                  modules, by Percentage with User ID</span>
              </td>
              <td class="align-middle">
                <div class="d-flex align-items-center justify-content-center">
                  <span class="btn btn-sm btn-outline-primary mb-0 text-xs font-weight-bold mx-2"
                    @click="generateLIKERT">Download</span>
                </div>
              </td>
            </tr>
            <tr v-if="tag_id != 0">
              <td>
                <div class="d-flex px-2 py-1">
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">Table 3-3-A-2</h6>
                  </div>
                </div>
              </td>

              <td class="text-sm">
                <span style="text-wrap: wrap;" class="text-xs font-weight-bold">Additional Feedback</span>
              </td>
              <td class="align-middle">
                <div class="d-flex align-items-center justify-content-center">
                  <span class="btn btn-sm btn-outline-primary mb-0 text-xs font-weight-bold mx-2"
                    @click="generateFeedback">Download</span>
                </div>
              </td>
            </tr>
            <tr v-if="this.module_id.id">
              <td>
                <div class="d-flex px-2 py-1">
                  <div class="d-flex flex-column justify-content-center">
                    <h6 class="mb-0 text-sm">Table 3-3-A-3 {{ module_id.name }}</h6>
                  </div>
                </div>
              </td>

              <td class="text-sm">
                <span style="text-wrap: wrap;" class="text-xs font-weight-bold">Questionnaire Summary</span>
              </td>
              <td class="align-middle">
                <div class="d-flex align-items-center justify-content-center">
                  <span class="btn btn-sm btn-outline-primary mb-0 text-xs font-weight-bold mx-2"
                    @click="generateSummary">Download</span>
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
// import Docxtemplater from "docxtemplater";
// import PizZip from "pizzip";
import { saveAs } from "file-saver";
import axios from "axios";
import _ from 'lodash';
// import moment from "moment";
import { computed } from 'vue';
import { useStore } from "vuex";
import { Document, Packer, Paragraph, Table, TableCell, TableRow, HeadingLevel, WidthType, ShadingType, AlignmentType } from "@contractmill/docx";
export default {
  name: "projects-card",
  data() {
    return {
      module_id: '-1',
      tag_id: 0,
      user_submissions: [],
      submissions: [],
      reportEmptyModal: false,
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
  async mounted() {
    setTooltip();
    this.$store.dispatch('fetchTags');
    axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.user.data.jwt}`;
    this.user_submissions = await axios.get(`${process.env.VUE_APP_DEV}/user-submissions?populate[user_question][populate][user_template][fields][0]=id&populate[user_question][fields][0]=question&populate[user_answers][fields][0]=answer&populate[user][fields][1]=username`);
    this.submissions = await axios.get(`${process.env.VUE_APP_DEV}/submissions?populate[question][populate][survey][fields][1]=name&populate[question][fields][0]=question&populate[answers][fields][0]=answer&populate[user][fields][1]=username&populate[question][populate]=answers`);
  },
  setup() {
    const store = useStore();

    let modules = computed(function () {
      return store.getters.getModules
    });
    let tags = computed(function () {
      return store.getters.getTags
    });

    return {
      modules,
      tags
    }
  },
  methods: {
    pluckArray(list, prop) {
      return list.map((item) => item[prop]);
    },
    closeModal() {
      this.reportEmptyModal = false;
    },
    calculateDevicePercentage(deviceName, personsArray) {
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
    },
    calculateBrowserPercentage(browserName, deviceName, personsArray) {
      const totalCount = personsArray.length;
      let browserCount = 0;
      // Count occurrences of the provided browser name
      personsArray.forEach(person => {
        const userBrowser = person.deviceBrowser;
        const userDevice = person.devicePlatform;
        if (userBrowser.toLowerCase().includes(browserName.toLowerCase()) && userDevice.toLowerCase().includes(deviceName.toLowerCase())) {
          browserCount++;
        }
      });
      // Calculate the percentage
      const percentage = (browserCount / totalCount) * 100;
      return percentage.toFixed(0);
    },
    calculateAnswerPercentage(data, answerValue) {
      const totalAnswers = data.length;
      let answerCount = 0;

      data.forEach(item => {
        item.answers.forEach(answer => {
          if (answer.answer === answerValue) {
            answerCount++;
          }
        });
      });

      const percentage = (answerCount / totalAnswers) * 100;
      return percentage.toFixed(2); // Return percentage with 2 decimal places
    },
    async generateCompletions() {
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.user.data.jwt}`;
      const data = await axios.get(`${process.env.VUE_APP_DEV}/submissions?populate[survey][populate][module]=id&populate=user`);
      //const data = await axios.get(`${process.env.VUE_APP_DEV}/submissions?filters[survey][module][id][$eq]=${this.module_id.id}&populate[survey][populate][module]=id&populate=user`);
      const arr = _.uniqBy(data.data.data, 'user.id');
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
                text: `${this.module_id.name}`,
                heading: HeadingLevel.HEADING_3,
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

      const header = _.sortBy(_.uniqBy(this.user_submissions.data.data, "user_question.id"), "user_question.order");
      header.unshift({ user_question: { id: 0 }, user: { username: 'USERS' } });
      console.log("header length: ", header.length);
      const usersRow = _.uniqBy(this.user_submissions.data.data, "user.id");
      let tableRows = [];
      let headerRow = {};
      let dataCells = [];
      for (const [index, userItem] of usersRow.entries()) {
        let headerCells = [];
        // create header ROW
        if (index == 0) {
          for (const h of header) {
            let cell;
            if (h.user_question.id == 0) {
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

        for (const [i, top] of header.entries()) {
          if (i !== 0) {
            let answers = [];
            this.user_submissions.data.data.map(data => {
              if (data.user_question.id === top.user_question.id && userItem.user.id === data.user.id) {
                let textValue = this.pluckArray(data.user_answers, 'answer').join(",");
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
        rows: tableRows
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
        saveAs(blob, `demographic-${Date.now()}.docx`);
      });

    },
    async generatePlatform() {
      //const summary = await axios.get(`${process.env.VUE_APP_DEV}/submissions?filters[survey][module][id][$eq]=${this.module_id.id}&populate[question][populate][survey][fields][1]=name&populate[question][fields][0]=question&populate[answers][fields][0]=answer&populate[user][fields][1]=username&populate[question][populate]=answers`);
      const qRow = _.uniqBy(this.submissions.data.data, "user.id");
      console.log('USER: ', qRow);
      let tableRows = [];
      let dataCells = [];
      const devices = ['Windows', 'Mac', 'iOS', 'Android'];
      const browsers = ['Internet Explorer', 'Microsoft Edge', 'Google Chrome', 'Mozilla Firefox', 'Safari']
      //const tRow = _.uniqBy(summary.data.data, "question.survey.id");
      for (const item of qRow) {

        // create header ROW
        let userRow = new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph(item.user.username)],
              columnSpan: 1
            }),
            new TableCell({
              children: [new Paragraph(`${item.devicePlatform}: ${item.deviceBrowser}`)],
              columnSpan: 2
            }),
          ]
        });
        tableRows.push(userRow);
      }

      let platformRow = new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({
              text: 'Percentages By Platform',
              heading: HeadingLevel.HEADING_2,
              alignment: AlignmentType.CENTER
            })],
            shading: {
              fill: "auto",
              type: ShadingType.SOLID,
              color: "f2f2f2",
            },
            columnSpan: 4
          }),
        ]
      });
      tableRows.push(platformRow);

      // create header ROW
      for (const dev of devices) {
        const pcPercent = this.calculateDevicePercentage(dev, qRow)
        let devicesRow = new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph(`Percentage viewed on ${dev} %`)],
              columnSpan: 1
            }),
            new TableCell({
              children: [new Paragraph(`${pcPercent}%`)],
              columnSpan: 1
            }),
          ]
        });
        tableRows.push(devicesRow);
      }

      let questionRow = new TableRow({
        children: [
          new TableCell({
            children: [new Paragraph({
              text: 'Web Browser by Operating System',
              heading: HeadingLevel.HEADING_2,
              alignment: AlignmentType.CENTER
            })],
            shading: {
              fill: "auto",
              type: ShadingType.SOLID,
              color: "f2f2f2",
            },
            columnSpan: 2
          }),
        ]
      });
      tableRows.push(questionRow);

      let devicesRow = new TableRow({
        children: [
          new TableCell({
            children: [],
            columnSpan: 1
          }),
          new TableCell({
            children: [new Paragraph('PC')],
            columnSpan: 1
          }),
          new TableCell({
            children: [new Paragraph('Mac')],
            columnSpan: 1
          }),
          new TableCell({
            children: [new Paragraph('IOS')],
            columnSpan: 1
          }),
          new TableCell({
            children: [new Paragraph('Android')],
            columnSpan: 1
          }),
        ]
      });
      tableRows.push(devicesRow);

      for (let i = 0; i < 5; i++) {
        let dataCell;
        dataCell = new TableCell({
          children: [],
        });
        dataCells.push(dataCell);
      }

      for (const browser of browsers) {
        dataCells[0] = new TableCell({
          children: [new Paragraph(browser)],
          columnSpan: 1
        });

        for (const [i, dev] of devices.entries()) {
          const percent = this.calculateBrowserPercentage(browser, dev, qRow)
          dataCells[i + 1] = new TableCell({
            children: [new Paragraph(`${percent}%`)],
            columnSpan: 1
          })
        }
        tableRows.push(new TableRow({
          children: dataCells
        }));
      }

      //second row
      //   let optionColumns = [];
      //   let questionOptions = [];
      //   for (const [i, a] of questionItem.question.answers.entries()) {
      //     let answerCell = new TableCell({
      //       children: [new Paragraph(a.answer)]
      //     })
      //     optionColumns.push(answerCell);
      //     questionOptions.push({ index: i, id: a.id })
      //   }
      //   let answerOptionRow = new TableRow({
      //     children: optionColumns
      //   });
      //   tableRows.push(answerOptionRow);

      //   // Thrid Row
      //   let thirdCells = [];
      //   for (let i = 0; i < questionOptions.length; i++) {
      //     let dataCell;
      //     dataCell = new TableCell({
      //       children: [],
      //     });
      //     thirdCells.push(dataCell);
      //   }
      //   console.log('ARR: ', thirdCells);
      //   for (const [i, option] of questionOptions.entries()) {
      //     let paragraphs = [];
      //     //let somethingElse = [];
      //     console.log(i);
      //     let counts = 0;

      //     //let num = [];
      //     summary.data.data.map((data) => {
      //       if (data.answers.some((e) => e.id === option.id)) {
      //         counts++;
      //         paragraphs.push(new Paragraph(`${data.user.username}\n`));
      //       } else {
      //         console.log('no match');
      //       }
      //     })

      //     let totalQuestions = summary.data.data.reduce((n, a) => (a.question.id == questionItem.question.id ? n + 1 : n), 0)
      //     console.log('Count: ', totalQuestions);
      //     let percent = counts == 0 ? 0 : (Number(counts) / Number(totalQuestions)) * 100;
      //     paragraphs.unshift(new Paragraph(`${percent}%`));
      //     thirdCells[i] = new TableCell({
      //       children: paragraphs
      //     })
      //   }
      //   let third = new TableRow({
      //     children: thirdCells
      //   })
      //   tableRows.push(third);
      //   console.log("THird: ", thirdCells);
      // }



      const title = new Paragraph({
        text: "Technology Platforms Used to Access Courseware",
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER
      });

      console.log('TABLE: ', tableRows);
      const table = new Table({
        rows: tableRows,
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
              table
            ],
          },
        ],
      });

      console.log(doc);

      Packer.toBlob(doc, true).then((blob) => {
        // saveAs from FileSaver will download the file
        saveAs(blob, `platform-${Date.now()}.docx`);
      });


      // try {
      //   const templatePath = "/files/Table 3-2-C.docx"; // Path to your docx template

      //   // Load the template
      //   const response = await fetch(templatePath);
      //   const templateBuffer = await response.arrayBuffer();
      //   console.log(templateBuffer);
      //   const zip = new PizZip(templateBuffer);

      //   axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.user.data.jwt}`;
      //   const data = await axios.get(`${process.env.VUE_APP_DEV}/submissions?populate=user`);
      //   // // Replace a placeholder in the template with the asset content
      //   console.log(data.data);
      //   const doc = new Docxtemplater().loadZip(zip);
      //   const arr = _.uniqBy(data.data.data, 'user.id');
      //   const browsers = _.uniq(_.map(data.data.data, 'deviceBrowser'));
      //   console.log('ARR: ', arr);

      //   const calculateBrowserPercentage = (browserName, deviceName, personsArray) => {
      //     const totalCount = personsArray.length;
      //     let browserCount = 0;
      //     // Count occurrences of the provided browser name
      //     personsArray.forEach(person => {
      //       const userBrowser = person.deviceBrowser;
      //       const userDevice = person.devicePlatform; // Replace with the actual property name containing the browser name
      //       if (userBrowser.toLowerCase().includes(browserName.toLowerCase()) && userDevice.toLowerCase().includes(deviceName.toLowerCase())) {
      //         browserCount++;
      //       }
      //     });
      //     // Calculate the percentage
      //     const percentage = (browserCount / totalCount) * 100;
      //     return percentage.toFixed(0);
      //   }
      //   const calculateDevicePercentage = (deviceName, personsArray) => {
      //     const totalCount = personsArray.length;
      //     let browserCount = 0;
      //     // Count occurrences of the provided browser name
      //     personsArray.forEach(person => {
      //       const userDevice = person.devicePlatform; // Replace with the actual property name containing the browser name
      //       if (userDevice.toLowerCase().includes(deviceName.toLowerCase())) {
      //         browserCount++;
      //       }
      //     });
      //     // Calculate the percentage
      //     const percentage = (browserCount / totalCount) * 100;
      //     return percentage.toFixed(0);
      //   }
      //   // console.log('Percent: ', calculateBrowserPercentage('Edge',arr));
      //   //arr.push(data.data.data, {account_name: data.data.data[0].survey.module.account.name})
      //   doc.setData({
      //     data: arr, browsers: browsers,
      //     name: this.module_id.name,
      //     percent_pc: calculateDevicePercentage('Windows', arr),
      //     percent_mac: calculateDevicePercentage('Mac', arr),
      //     percent_ios: calculateDevicePercentage('ios', arr),
      //     percent_android: calculateDevicePercentage('Android', arr),
      //     mobile_ios: 0,
      //     tablet_ios: 0,
      //     mobile_android: 0,
      //     tablet_android: 0,
      //     pc_ie: calculateBrowserPercentage('Explorer', 'Windows', arr),
      //     pc_me: calculateBrowserPercentage('Edge', 'Windows', arr),
      //     pc_gc: calculateBrowserPercentage('Chrome', 'Windows', arr),
      //     pc_mf: calculateBrowserPercentage('Firefox', 'Windows', arr),
      //     pc_other: 0,
      //     mac_gc: calculateBrowserPercentage('Chrome', 'Mac', arr),
      //     mac_mf: calculateBrowserPercentage('Firefox', 'Mac', arr),
      //     mac_safari: calculateBrowserPercentage('safari', 'Mac', arr),
      //     mac_other: 0,
      //     ios_me: calculateBrowserPercentage('Edge', 'ios', arr),
      //     ios_gc: calculateBrowserPercentage('Chrome', 'ios', arr),
      //     ios_mf: calculateBrowserPercentage('Firefox', 'ios', arr),
      //     ios_safari: calculateBrowserPercentage('safari', 'ios', arr),
      //     ios_other: 0,
      //     android_me: calculateBrowserPercentage('Edge', 'Android', arr),
      //     android_gc: calculateBrowserPercentage('Chrome', 'Android', arr),
      //     android_mf: calculateBrowserPercentage('Firefox', 'Android', arr),
      //     android_other: 0,
      //     day: moment(new Date()).format('dddd'),
      //     date: moment(new Date()).format("MMMM Do, YYYY"),
      //     time: moment().format('LT')
      //   });
      //   doc.render();
      //   const generatedContent = doc.getZip().generate({
      //     type: "blob",
      //     mimeType:
      //       "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      //   });
      //   saveAs(generatedContent, `survey_completions-${Date.now()}.docx`);

      //   console.log('Document generated successfully.');
      // } catch (error) {
      //   console.log('ERROR: ', error);
      // }

    },
    async generateBugs() {
      axios.defaults.headers.common['Authorization'] = `Bearer ${this.$store.state.user.data.jwt}`;
      const data = await axios.get(`${process.env.VUE_APP_DEV}/bugs?populate[survey][fields][0]=id&populate[survey][fields][1]=name&populate[bug_logs]=*`);
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
                heading: HeadingLevel.HEADING_3,
                alignment: AlignmentType.CENTER
              })],
              shading: {
                  fill: "auto",
                  type: ShadingType.SOLID,
                  color: "f2f2f2",
                },
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
      allRows.push(...titleArr, ...headerRow, ...infoArr);

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
      //   const data = await axios.get(`${process.env.VUE_APP_DEV}/bugs?populate[survey][fields][0]=id&populate[survey][fields][1]=name&populate[bug_logs]=*`);
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
    async generateLIKERT() {
      const submission = await axios.get(`${process.env.VUE_APP_DEV}/submissions?filters[tag][id][$eq]=${this.tag_id.id}&populate[question][populate][survey][fields][1]=name&populate[question][fields][0]=question&populate[answers][fields][0]=answer&populate[user][fields][1]=username&populate[question][populate]=answers`);
      const qRow = _.sortBy(_.uniqBy(submission.data.data, "question.id"), "question.order");
      const tRow = _.uniqBy(submission.data.data, "question.survey.id");
      console.log('TROW: ', tRow);
      let tableRows = [];

      // User - Questions - Answers
      for (const heading of tRow) {

        let headingRow = new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph({
              text: `${this.tag_id.tag} - ${heading.question.survey.name}`,
              heading: HeadingLevel.HEADING_2,
              alignment: AlignmentType.CENTER
            })],
              columnSpan: Number(heading.question.answers.length)
            })
          ]
        });
        tableRows.push(headingRow);

        for (const questionItem of qRow) {

          // create header ROW
          let questionRow = new TableRow({
            children: [
              new TableCell({
                children: [new Paragraph({
              text: questionItem.question.question,
              heading: HeadingLevel.HEADING_3,
              alignment: AlignmentType.CENTER
            })],
                shading: {
                  fill: "auto",
                  type: ShadingType.SOLID,
                  color: "f2f2f2",
                },
                columnSpan: Number(questionItem.question.answers.length)
              })
            ]
          });
          tableRows.push(questionRow);
          //second row
          let optionColumns = [];
          let questionOptions = [];
          for (const [i, a] of questionItem.question.answers.entries()) {
            let answerCell = new TableCell({
              children: [new Paragraph(a.answer)]
            })
            optionColumns.push(answerCell);
            questionOptions.push({ index: i, id: a.id })
          }
          let answerOptionRow = new TableRow({
            children: optionColumns
          });
          tableRows.push(answerOptionRow);

          // Thrid Row
          let thirdCells = [];
          for (let i = 0; i < questionOptions.length; i++) {
            let dataCell;
            dataCell = new TableCell({
              children: [],
            });
            thirdCells.push(dataCell);
          }
          console.log('ARR: ', thirdCells);
          for (const [i, option] of questionOptions.entries()) {
            let paragraphs = [];
            //let somethingElse = [];
            console.log(i);
            let counts = 0;

            //let num = [];
            submission.data.data.map((data) => {
              if (data.answers.some((e) => e.id === option.id)) {
                counts++;
                paragraphs.push(new Paragraph(`${data.user.username}\n`));
              } else {
                console.log('no match');
              }
            })

            let totalQuestions = submission.data.data.reduce((n, a) => (a.question.id == questionItem.question.id ? n + 1 : n), 0)
            console.log('Count: ', totalQuestions);
            let percent = counts == 0 ? 0 : (Number(counts) / Number(totalQuestions)) * 100;
            paragraphs.unshift(new Paragraph(`${percent}%`));
            thirdCells[i] = new TableCell({
              children: paragraphs
            })
          }
          let third = new TableRow({
            children: thirdCells
          })
          tableRows.push(third);
          console.log("THird: ", thirdCells);
        }
      }

      // Questions - Answers - Percentage
      //const data = await axios.get(`${process.env.VUE_APP_DEV}/surveys/1?populate=questions`)


      // Title Row


      const title = new Paragraph({
        text: "LIKERT SCALE RESPONSES BY PERCENTAGE AND USERID",
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER
      });


      const table = new Table({
        rows: tableRows,
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
              table
            ],
          },
        ],
      });

      console.log(doc);

      Packer.toBlob(doc, true).then((blob) => {
        // saveAs from FileSaver will download the file
        saveAs(blob, `likert-${Date.now()}.docx`);
      });

    },
    async generateFeedback() {


      const qRow = _.sortBy(_.uniqBy(this.submissions.data.data, "question.id"), "question.order");
      const uRow = _.uniqBy(this.submissions.data.data, "user.id");
      const feedbackRow = _.uniqBy(this.submissions.data.data, "feedback");
      const tRow = _.uniqBy(this.submissions.data.data, "question.survey.id");
      console.log('FEED: ', feedbackRow);
      let tableRows = [];

      if (!this.module_id.name) {
        this.reportEmptyModal = true;
        return;
      }

      for (const heading of tRow) {

        let headingRow = new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph(`${this.module_id.name} - ${heading.question.survey.name}`)],
              columnSpan: Number(heading.question.answers.length)
            })
          ]
        });
        tableRows.push(headingRow);

        for (const userItem of qRow) {
          let dataCells = [];
          // create header ROW
          console.log("ITEM: ", userItem);
          let questionRow = new TableRow({
            children: [
              new TableCell({
                children: [new Paragraph(userItem.question.question)],
                columnSpan: 2
              })
            ]
          });
          tableRows.push(questionRow);


          for (let i = 0; i < 2; i++) {
            let dataCell;
            dataCell = new TableCell({
              children: [],
            });
            dataCells.push(dataCell);
          }



          for (const top of uRow) {
            feedbackRow.map((data) => {
              if (userItem.question.id === data.question.id && data.user.id === top.user.id) {
                dataCells[1] = new TableCell({
                  children: [
                    new Paragraph(data.feedback || '')
                  ],
                });
                dataCells[0] = new TableCell({
                  children: [new Paragraph(top.user.username)],
                });

              }
            })

            let row = new TableRow({
              children: dataCells,
            });
            tableRows.push(row);
          }



        }
      }
      const table = new Table({
        rows: tableRows
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
      console.log(doc);


      Packer.toBlob(doc, true).then((blob) => {
        // saveAs from FileSaver will download the file
        saveAs(blob, `feeback-${Date.now()}.docx`);
      });

    },
    async generateSummary() {
      const summary = await axios.get(`${process.env.VUE_APP_DEV}/submissions?filters[survey][module][id][$eq]=${this.module_id.id}&populate[question][populate][survey][fields][1]=name&populate[question][fields][0]=question&populate[answers][fields][0]=answer&populate[user][fields][1]=username&populate[question][populate]=answers`);
      const qRow = _.sortBy(_.uniqBy(summary.data.data, "question.id"), "question.order");
      const tRow = _.uniqBy(summary.data.data, "question.survey.id");
      console.log(qRow);
      let tableRows = [];
      if (summary.data.data.length < 1) {
        this.reportEmptyModal = true;
        return;
      }
      // User - Questions - Answers

      if (!this.module_id.name) {
        this.reportEmptyModal = true;
        return;
      }

      for (const heading of tRow) {

        let headingRow = new TableRow({
          children: [
            new TableCell({
              children: [new Paragraph(`${this.module_id.name} - ${heading.question.survey.name}`)],
              columnSpan: Number(heading.question.answers.length)
            })
          ]
        });
        tableRows.push(headingRow);

        for (const questionItem of qRow) {

          // create header ROW
          let questionRow = new TableRow({
            children: [
              new TableCell({
                children: [new Paragraph(questionItem.question.question)],
                columnSpan: Number(questionItem.question.answers.length)
              })
            ]
          });
          tableRows.push(questionRow);
          //second row
          let optionColumns = [];
          let questionOptions = [];
          for (const [i, a] of questionItem.question.answers.entries()) {
            let answerCell = new TableCell({
              children: [new Paragraph(a.answer)]
            })
            optionColumns.push(answerCell);
            questionOptions.push({ index: i, id: a.id })
          }
          let answerOptionRow = new TableRow({
            children: optionColumns
          });
          tableRows.push(answerOptionRow);

          // Thrid Row
          let thirdCells = [];
          for (let i = 0; i < questionOptions.length; i++) {
            let dataCell;
            dataCell = new TableCell({
              children: [],
            });
            thirdCells.push(dataCell);
          }
          console.log('ARR: ', thirdCells);
          for (const [i, option] of questionOptions.entries()) {
            let paragraphs = [];
            //let somethingElse = [];
            console.log(i);
            let counts = 0;

            //let num = [];
            summary.data.data.map((data) => {
              if (data.answers.some((e) => e.id === option.id)) {
                counts++;
                paragraphs.push(new Paragraph(`${data.user.username}\n`));
              } else {
                console.log('no match');
              }
            })

            let totalQuestions = summary.data.data.reduce((n, a) => (a.question.id == questionItem.question.id ? n + 1 : n), 0)
            console.log('Count: ', totalQuestions);
            let percent = counts == 0 ? 0 : (Number(counts) / Number(totalQuestions)) * 100;
            paragraphs.unshift(new Paragraph(`${percent}%`));
            thirdCells[i] = new TableCell({
              children: paragraphs
            })
          }
          let third = new TableRow({
            children: thirdCells
          })
          tableRows.push(third);
          console.log("THird: ", thirdCells);
        }
      }


      const title = new Paragraph({
        text: "Questionnaire Summary",
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER
      });


      const table = new Table({
        rows: tableRows,
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
              table
            ],
          },
        ],
      });

      console.log(doc);

      Packer.toBlob(doc, true).then((blob) => {
        // saveAs from FileSaver will download the file
        saveAs(blob, `likert-${Date.now()}.docx`);
      });

    },
  }
};
</script>
<style>
.text-xs {
  cursor: pointer;
}
</style>