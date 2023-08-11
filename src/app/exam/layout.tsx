import Header from '@/components/header.component'
import Main from '@/components/main.component'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <Main>{children}</Main>
    </>
  )
}
