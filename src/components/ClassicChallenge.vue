<template>
  <v-content class="container">
    <challenge-streak/>
    <classic-question :question="question"/>
    <classic-input/>
  </v-content>
</template>

<script lang="ts">
import Vue from "vue";
import ClassicInput from "./ClassicInput.vue";
import ClassicQuestion from "./ClassicQuestion.vue";
import ChallengeStreak from "./ChallengeStreak.vue";
import math from "mathjs";
import Component from "vue-class-component";
import { State, Getter, Mutation, Action } from "vuex-class";
import {
  PracticeState,
  PracticeModule,
  PracticeActions,
  PracticeGetters,
  PractcieOptions
} from "../store/modules/practice";
import { Operator } from "@/engine/math_questions/expression/models";
import { Difficulty, ChallengeType } from "@/engine/models/math_question";
import { Prop } from "vue-property-decorator";
import { mapGetters } from "vuex";

const namespace: string = "practice";

export default Vue.extend({
  components: {
    ClassicInput,
    ClassicQuestion,
    ChallengeStreak
  },
  props: {
    challengeTypes: Array as () => Array<ChallengeType>,
    operators: Array as () => Array<Operator>,
    difficulty: String
  },
  mounted() {
    this.$store.dispatch(PracticeActions.INIT, {
      operators: this.operators,
      difficulty: this.difficulty,
      challengeTypes: this.challengeTypes
    } as PractcieOptions);
    this.$store.dispatch(PracticeActions.NEW_QUESTION);
  },
  computed: {
    ...mapGetters({
      question: PracticeGetters.QUESTION_LATEX,
      streak: PracticeGetters.STREAK
    })
  }
});
</script>


<style scoped>
.container {
  max-width: 600px;
  max-height: 85%;
}
</style>

