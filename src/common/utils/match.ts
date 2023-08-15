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
