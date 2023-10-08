<template>
  <div class="printContainer">
    <div class="header">header</div>
    <div class="body">body</div>
    <div class="footer">footer</div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
export default defineComponent({
  setup() {
    const count = ref(1);
    function log1() {
      console.log(1);
    }
    return {
        count,
        log1
    }
  },
});
</script>

<style>
.printContainer {
  border: 1px solid black;
  height: 98vh;
  width: 100%;
}
</style>