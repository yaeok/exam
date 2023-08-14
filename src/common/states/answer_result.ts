import { atom } from 'recoil'

/**
 * 問題回答中の回答結果を管理するState
 */
export const answerResultState = atom<boolean[]>({
  key: 'answer-result-list-state',
  default: [],
})
