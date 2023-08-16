<template>
    <div class="py-4 container-fluid">
      <div class="row">
        <div class="col-12">
          <bug-reports-table />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import BugReportsTable from "./components/BugReportsTable";
  
  export default {
    name: "bug-reports",
    components: {
      BugReportsTable,
    },
  };
  </script>
  