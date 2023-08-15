/**
 * ユーザが回答した選択肢が正解かどうかを判定する
 * @param solutions 選択した回答リスト
 * @param answerList 正答リスト
 * @returns boolean
 */
export const funcMatchSolutions = (args: {
  solutions: string[]
  answerList: string[]
}): boolean => {
  for (const solution of args.solutions) {
    if (!args.answerList.includes(solution)) {
      return false
    }
  }
  return true
}
