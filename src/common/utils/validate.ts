// バリデーションタイプ
type Validate = {
  isSuccess: boolean
  message: string
}

// サインイン画面のバリデーション
export const validateSignInScreen = (
  email: string,
  password: string
): Validate => {
  if (!email) {
    return { isSuccess: false, message: 'メールアドレスを入力してください' }
  }
  if (!password) {
    return { isSuccess: false, message: 'パスワードを入力してください' }
  }
  return { isSuccess: true, message: '' }
}

// サインアップ画面のバリデーション
export const validateSignUpScreen = (args: {
  username: string
  email: string
  password: string
  confirmPassword: string
}): Validate => {
  if (!args.username) {
    return { isSuccess: false, message: 'ユーザー名を入力してください' }
  }
  if (!args.email) {
    return { isSuccess: false, message: 'メールアドレスを入力してください' }
  }
  if (!args.password) {
    return { isSuccess: false, message: 'パスワードを入力してください' }
  }
  if (!args.confirmPassword) {
    return { isSuccess: false, message: '確認用パスワードを入力してください' }
  }
  if (args.password !== args.confirmPassword) {
    return { isSuccess: false, message: 'パスワードが一致しません' }
  }
  return { isSuccess: true, message: '' }
}
