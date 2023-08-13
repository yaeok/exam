import { AuthGuard } from '@/common/providers/auth_guard'
import Footer from '@/components/footer.component'
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
        <Footer />
      </AuthGuard>
    </>
  )
}
