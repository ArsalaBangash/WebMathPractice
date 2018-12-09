import {
  Module,
  GetterTree,
  MutationTree,
  ActionTree,
  ActionContext,
} from 'vuex';
import { RootState } from '../store';
import {
  ChallengeModel,
  ChallengeParams,
  Difficulty,
  ChallengeType,
} from '@/engine/models/math_question';
import { generateExpressionChallenge } from '../../engine/math_questions/expression';
import { Operator } from '@/engine/math_questions/expression/models';
import math from 'mathjs';

export interface PractcieOptions {
  difficulty: Difficulty;
  operators: Operator[];
  challengeTypes: ChallengeType[];
}

export enum PracticeGetters {
  QUESTION_LATEX = 'questionLatex',
  ANSWER = 'answer',
  STREAK = 'streak',
}

export enum PracticeActions {
  INIT = 'init',
  NEW_QUESTION = 'newQuestion',
  SET_ANSWER = 'setAnswer',
  CHECK_ANSWER = 'checkAnswer',
  ON_CORRECT = 'onCorrect',
  ON_INCORRECT = 'onIncorrect',
}

enum PracticeMutations {
  SET_PRACTICE_OPTIONS = 'setPracticeOptions',
  SET_QUESTION = 'setQuestion',
  SET_ANSWER = 'setAnswer',
  SET_STREAK = 'setStreak',
}

export interface PracticeState {
  question: ChallengeModel;
  difficulty: Difficulty;
  operators: Operator[];
  challengeTypes: ChallengeType[];
  answer: string;
  streak: number;
}

const getters: GetterTree<PracticeState, any> = {
  questionLatex: (state) => state.question.latex,
  answer: (state) => state.answer,
  streak: (state) => state.streak,
};

const mutations: MutationTree<PracticeState> = {
  setQuestion(state: PracticeState, question: ChallengeModel) {
    state.question = Object.assign({}, question);
  },
  setAnswer(state: PracticeState, answer: string) {
    state.answer = answer;
  },
  setStreak(state: PracticeState, streak: number) {
    state.streak = streak;
  },
  setPracticeOptions(state: PracticeState, options: PractcieOptions) {
    state.operators = options.operators;
    state.challengeTypes = options.challengeTypes;
    state.difficulty = options.difficulty;
  },
};

const newQuestion = (difficulty: Difficulty, operators: Operator[]) => {
  return generateExpressionChallenge({ difficulty, operators });
};

const actions: ActionTree<PracticeState, any> = {
  init(context, options: PracticeActions) {
    context.commit(PracticeMutations.SET_PRACTICE_OPTIONS, options);
  },
  newQuestion(context) {
    context.commit(
      PracticeMutations.SET_QUESTION,
      newQuestion(context.state.difficulty, context.state.operators),
    );
  },
  setAnswer(context, answer: string) {
    context.commit(PracticeMutations.SET_ANSWER, answer);
  },
  checkAnswer(context) {
    if (
      math.eval(`${context.state.answer} == ${context.state.question.infix}`)
    ) {
      context.dispatch(PracticeActions.ON_CORRECT);
    } else {
      context.dispatch(PracticeActions.ON_INCORRECT);
    }
  },
  onCorrect(context) {
    context.commit(PracticeMutations.SET_STREAK, context.state.streak + 1);
    context.commit(PracticeMutations.SET_ANSWER, '');
    context.dispatch(PracticeActions.NEW_QUESTION);
  },
  onIncorrect(context) {
    context.commit(PracticeMutations.SET_STREAK, 0);
    context.commit(PracticeMutations.SET_ANSWER, '');
  },
};

export const PracticeModule: Module<PracticeState, RootState> = {
  state: {
    question: {} as ChallengeModel,
    difficulty: Difficulty.Normal,
    operators: [],
    challengeTypes: [],
    answer: '',
    streak: 0,
  },
  getters,
  actions,
  mutations,
};
