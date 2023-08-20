import { atom } from 'recoil'

import { AnswerInProgress } from '@/common/models/answer_result.model'

/**
 * 問題回答中の回答結果を管理するState
 */
export const answerResultListState = atom<AnswerInProgress[]>({
  key: 'answer-result-list-state',
  default: [],
})
