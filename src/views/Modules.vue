<template>
    <div class="py-4 container-fluid">
      <div class="row">
        <div class="col-12">
          <modules-table />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import ModulesTable from "./components/ModulesTable";
  
  export default {
    name: "modules",
    components: {
      ModulesTable,
    },
  };
  </script>
  