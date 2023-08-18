/**
 * 指定した範囲の乱数を重複無で生成する
 * @param count 生成する乱数の個数
 * @param min 最小値
 * @param max 最大値
 * @returns number[]
 */
export const generateUniqueRandomNumbers = (args: {
  count: number
  min: number
  max: number
}): number[] => {
  if (args.count > args.max - args.min + 1) {
    throw new Error(
      'Cannot generate unique random numbers with the given range and count.'
    )
  }

  /** 重複しないようにSetを宣言 */
  const uniqueNumbers: Set<number> = new Set()

  /** 生成した配列のサイズが指定した個数に達したらループを抜ける */
  while (uniqueNumbers.size < args.count) {
    const randomNumber =
      Math.floor(Math.random() * (args.max - args.min + 1)) + args.min
    uniqueNumbers.add(randomNumber)
  }

  return Array.from(uniqueNumbers)
}
