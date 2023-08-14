import { atom } from 'recoil'

export const answerResultState = atom<boolean[]>({
  key: 'answer-result-list-state',
  default: [],
})
