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
  email: string
  password: string
  confirmPassword: string
}): Validate => {
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

// お問い合わせ画面のバリデーション
export const validateContactScreen = (args: {
  title: string
  content: string
}): Validate => {
  if (!args.title) {
    return { isSuccess: false, message: 'タイトルを入力してください' }
  }
  if (!args.content) {
    return { isSuccess: false, message: '内容を入力してください' }
  }
  return { isSuccess: true, message: '' }
}
