'use client'
import 'react-calendar-heatmap/dist/styles.css'

import { useEffect, useState } from 'react'
import CalendarHeatmap from 'react-calendar-heatmap'

import styles from '@/app/global.module.css'

type Props = {
  articleList: any[]
}

export default function Calendar({ articleList }: Props) {
  // 今日の日付を取得
  const today = new Date()
  // 三カ月前の日付を計算
  const sixMonthAgo = new Date(
    today.getFullYear(),
    today.getMonth() - 6,
    today.getDate()
  )

  // 投稿した日付の数をカウント
  const countsByDate: Record<string, number> = {}
  articleList.forEach(({ createdAt }) => {
    if (!countsByDate[createdAt]) {
      countsByDate[createdAt] = 0
    }
    countsByDate[createdAt] += 1
  })
  const [articles, setArticles] = useState<{ date: string; count: number }[]>(
    []
  )

  useEffect(() => {
    const data = articleList.map((e) => {
      const date = e.createdAt
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
