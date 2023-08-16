import { AuthGuard } from '@/common/providers/auth_guard'
import Header from '@/components/header.component'
import Main from '@/components/main.component'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <AuthGuard>
        <Header />
        <Main>{children}</Main>
      </AuthGuard>
    </>
  )
}
