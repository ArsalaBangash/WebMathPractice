<template>
  <span class="streak">Streak: {{streak}}</span>
</template>

<script lang="ts">
  import Vue from "vue";
  import {mapGetters} from "vuex";
  import {PracticeGetters} from "@/store/modules/practice/practice";

  export default Vue.extend({
    name: "challenge-streak",
    computed: {
      ...mapGetters({streak: PracticeGetters.STREAK})
    }
  });
</script>


<style scoped>
  .streak {
    font-family: "Montserrat", sans-serif;
    font-size: 2em;
    margin: 16px;
  }
</style>

