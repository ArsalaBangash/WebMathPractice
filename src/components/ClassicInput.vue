<template>
  <div>
    <v-container>
      <v-text-field
        v-model="answer"
        class="answer-input"
        single-line
        autofocus
        placeholder="Enter Answer Here"
        color="primary"
        clearable
        @click:clear="clearAnswer"
      />
    </v-container>

    <v-container class="input-container">
      <v-btn
        v-on:click="inputSymbol(symbol)"
        v-for="symbol in [7, 8, 9]"
        v-bind:key="symbol"
        class="headline"
        depressed
        large
        color="primary"
      >{{symbol}}</v-btn>

      <v-btn v-on:click="backspace" class="headline" depressed large color="primary">
        <v-icon dark>backspace</v-icon>
      </v-btn>
      <v-btn
        v-on:click="inputSymbol(symbol)"
        class="headline"
        v-bind:key="symbol"
        v-for="symbol in [4, 5, 6, '-']"
        depressed
        large
        color="primary"
      >{{symbol}}</v-btn>
      <v-btn
        v-on:click="inputSymbol(symbol)"
        class="headline"
        v-for="symbol in [1, 2, 3, '.']"
        depressed
        v-bind:key="symbol"
        large
        color="primary"
      >{{symbol}}</v-btn>
      <v-btn v-on:click="inputSymbol(0)" class="zero headline" depressed large color="primary">0</v-btn>
      <v-btn
        v-on:click="inputSymbol(symbol)"
        class="headline"
        v-for="symbol in ['(', ')']"
        depressed
        v-bind:key="symbol"
        large
        color="primary"
      >{{symbol}}</v-btn>
      <v-btn
        v-on:click="checkAnswer"
        class="check-button headline"
        depressed
        large
        color="green"
        dark
      >
        <v-icon dark left>check_circle</v-icon>Check
      </v-btn>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import { PracticeGetters, PracticeActions } from "@/store/modules/practice";
export default Vue.extend({
  name: "classic-input",
  data() {
    return {
      inputTags: [7, 8, 9, "⌫", 4, 5, 6, "-", 1, 2, 3, ".", 0, "(", ")", ""],
      text: "" as String
    };
  },
  methods: {
    inputSymbol: function(symbol: string) {
      this.$store.dispatch(
        PracticeActions.SET_ANSWER,
        this.answer.concat(symbol)
      );
    },
    backspace: function() {
      this.$store.dispatch(
        PracticeActions.SET_ANSWER,
        this.answer.slice(0, -1)
      );
    },
    clearAnswer: function() {
      this.$store.dispatch(PracticeActions.SET_ANSWER, "");
    },
    ...mapActions({
      checkAnswer: PracticeActions.CHECK_ANSWER
    })
  },
  computed: {
    ...mapGetters({
      answer: PracticeGetters.ANSWER
    })
  }
});
</script>

<style>
.v-text-field__slot {
  margin-bottom: 12px;
}
.answer-input {
  font-size: 3em;
}
.input-container {
  margin-top: -24px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(5, 1fr);
}

.zero {
  grid-column: 1 / 3;
}

.margin-10 {
  margin: 10px;
}

.answer-input {
  margin: 8px;
}

.check-button {
  grid-column: 1 / -1;
}
</style>
