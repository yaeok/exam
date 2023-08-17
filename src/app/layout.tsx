import styles from '@/app/global.module.css'
import { AuthContextProvider } from '@/common/providers/auth_providers'
import DesignProvider from '@/common/providers/design_provider'

import type { Metadata } from 'next'

let description = '資格試験対策用のwebアプリです。\n'
description += 'IT系の資格試験の過去問に特化しています。'
description += '本アプリは非公式であり、個人で運営しています。'

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
