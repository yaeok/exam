import styles from '@/app/globals.module.css'
import DesignProvider from '@/common/providers/design_provider'

import type { Metadata } from 'next'

let description = '資格試験対策用のwebアプリです。\n'
description += 'IT系の資格試験の過去問に特化しています。'
description += '本アプリは非公式であり、個人で運営しています。'

export const metadata: Metadata = {
  title: '資格対策アプリ',
  description: description,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='ja'>
      <body className={styles.body}>
        <DesignProvider>{children}</DesignProvider>
      </body>
    </html>
  )
}
