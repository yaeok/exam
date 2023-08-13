import { atom } from 'recoil';

import { Question } from '@/common/models/question.model';

type Certification = {
  id: string,
  name: string,

}

export const certificationState = atom<Question[]>({
  key: 'certification-state',
  default: [],
})
