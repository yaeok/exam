import styles from '@/app/global.module.css'
import { AuthContextProvider } from '@/common/providers/auth_providers'
import DesignProvider from '@/common/providers/design_provider'

import type { Metadata } from 'next'

let description = '資格試験対策用のwebアプリshikakunです。\n'
description += 'IT系の資格試験の予想問題です。'
description += '本アプリは非公式であり、個人で運営しています。'
description += '出題される問題はあくまで予想問題であり、'
description += '本番試験で必ずしも出題されるとは限りません。'

export const metadata: Metadata = {
  title: 'shikakun',
  description: description,
  applicationName: 'shikakun',
  keywords: [
    'shikakun',
    '資格',
    '過去問',
    'IT',
    'IT資格',
    'IT過去問',
    'Salesforce',
    'Google Cloud Platform',
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='ja'>
      <body className={styles.body}>
        <DesignProvider>
          <AuthContextProvider>{children}</AuthContextProvider>
        </DesignProvider>
      </body>
    </html>
  )
}
