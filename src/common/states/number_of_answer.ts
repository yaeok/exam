import { atom } from 'recoil'

export const numberOfAnswerState = atom<number>({
  key: 'number-of-answer-state',
  default: 0,
})
