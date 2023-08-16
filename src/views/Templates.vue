<template>
    <div class="py-4 container-fluid">
      <div class="row">
        <div class="col-12">
          <templates-table />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import TemplatesTable from "./components/TemplatesTable";
  
  export default {
    name: "templates",
    components: {
      TemplatesTable,
    },
  };
  </script>
  