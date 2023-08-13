import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist'

import { User } from '@/common/models/user.model'

const { persistAtom } = recoilPersist({
  key: 'user-recoil-persist',
  storage: typeof window === 'undefined' ? undefined : sessionStorage,
})

export const userState = atom<User | null>({
  key: 'user-state',
  default: null,
  effects_UNSTABLE: [persistAtom],
})
