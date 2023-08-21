import { AnswerResultFromFirestore } from '@/common/models/answer_result.model'

export const funcCalculation = (list: AnswerResultFromFirestore[]) => {
  const correctCount = list.reduce((acc, item) => {
    acc += item.numberOfCorrect
    return acc
  }, 0)
  const inCorrectCount = list.reduce((acc, item) => {
    acc += item.numberOfInCorrect
    return acc
  }, 0)
  const correctAnswerRate = Math.round(
    (correctCount / (correctCount + inCorrectCount)) * 100
  )
  return {
    correctCount,
    inCorrectCount,
    correctAnswerRate,
  }
}
