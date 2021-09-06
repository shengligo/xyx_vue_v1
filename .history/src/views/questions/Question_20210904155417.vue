<template>
  <div id="question">
    <div class="bodyCenter">
      <div class="bodyright">

      </div>
      <div class="bodyleft">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'question'
}
</script>

<style scoped>
#question {
  width: 100%;
  height: 100%;
  margin-top: 20px;
  background-color: rgb(243, 244, 245);

}
.bodyCenter {
  width: 60%;
  height: 500px;
  margin: 0 auto;
  display: flex;
  border: 1px solid red;
}
.bodyright {
  border: 1px solid blue;
  /* width: 40%; */
  flex: 2;
  height: 500px;

}
.bodyleft {
  border: 1px solid blue;
  /* width: 20%; */
  flex: 1;
  height: 500px;
}
</style>









