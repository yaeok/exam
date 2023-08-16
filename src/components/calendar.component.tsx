'use client'
import 'react-calendar-heatmap/dist/styles.css'

import { useEffect, useState } from 'react'
import CalendarHeatmap from 'react-calendar-heatmap'

import styles from '@/app/global.module.css'

type Props = {
  answerList: any[]
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
    if (!countsByDate[executedAt]) {
      countsByDate[executedAt] = 0
    }
    countsByDate[executedAt] += 1
  })
  const [articles, setArticles] = useState<{ date: string; count: number }[]>(
    []
  )

  useEffect(() => {
    const data = answerList.map((e) => {
      const date = e.executedAt
      const count: number = countsByDate[date] || 0
      return {
        date,
        count,
      }
    })
    setArticles(data)
  }, [])

  return (
    <CalendarHeatmap
      startDate={sixMonthAgo}
      endDate={today}
      values={articles}
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
