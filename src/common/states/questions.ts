import { atom } from 'recoil'

import { Question } from '@/common/models/question.model'

/**
 * 資格の問題を管理するState
 */
export const questionsState = atom<Question[]>({
  key: 'question-list-state',
  default: [],
})
