/** ログインユーザ */
export type User = {
  /** ユーザId */
  uid: string
  /** ユーザ名 */
  username: string
  /** メールアドレス */
  email: string
  /** 定期メール送信フラグ */
  permSendEmail: boolean
  /** アクティブフラグ */
  isActive: boolean
}
