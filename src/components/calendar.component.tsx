'use client'
import 'react-calendar-heatmap/dist/styles.css'

import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import CalendarHeatmap from 'react-calendar-heatmap'

import styles from '@/app/global.module.css'
import { AnswerResult } from '@/common/models/answer_result.model'

type Props = {
  answerList: AnswerResult[]
}

export default function Calendar({ answerList }: Props) {
  // 今日の日付を取得
  const today = new Date()
  // 6ヶ月前の日付を計算
  const sixMonthAgo = new Date(
    today.getFullYear(),
    today.getMonth() - 6,
    today.getDate()
  )

  // 投稿した日付の数をカウント
  const countsByDate: Record<string, number> = {}
  answerList.forEach(({ executedAt }) => {
    if (!countsByDate[format(executedAt, 'yyyy-MM-dd')]) {
      countsByDate[format(executedAt, 'yyyy-MM-dd')] = 0
    }
    countsByDate[format(executedAt, 'yyyy-MM-dd')] += 1
  })
  const [results, setResults] = useState<{ date: string; count: number }[]>([])

  useEffect(() => {
    const data = answerList.map((e) => {
      const date = format(e.executedAt, 'yyyy-MM-dd')
      const count: number = countsByDate[date] || 0
      return {
        date,
        count,
      }
    })
    setResults(data)
  }, [])

  return (
    <CalendarHeatmap
      startDate={sixMonthAgo}
      endDate={today}
      values={results}
      classForValue={(value) => {
        if (!value) {
          return styles.color_empty
        }

        // 投稿数に応じてカレンダーの色を変える
        switch (value.count) {
          case 1:
            return styles.color_scale_1
          case 2:
            return styles.color_scale_2
          case 3:
            return styles.color_scale_3
          default:
            if (value.count >= 4) {
              return styles.color_scale_4
            }
        }
      }}
    />
  )
}
