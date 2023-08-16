<template>
    <div class="py-4 container-fluid">
      <div class="row">
        <div class="col-12">
          <surveys-table />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import SurveysTable from "./components/SurveysTable";
  
  export default {
    name: "surveys",
    components: {
      SurveysTable,
    },
  };
  </script>
  