import { atom } from 'recoil'

/**
 * 問題回答中の回答数を管理するState
 */
export const numberOfAnswerState = atom<number>({
  key: 'number-of-answer-state',
  default: 0,
})
