import { atom } from 'recoil'

import { Question } from '@/common/models/question.model'

export const questionsState = atom<Question[]>({
  key: 'question-list-state',
  default: [],
})
