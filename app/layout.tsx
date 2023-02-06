import './globals.css'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body className='globalBody'>
      <div className='section'>
        <nav className='navbar'>
          <h1>Homie</h1>
        </nav>
        {children}
        </div>
        </body>
    </html>
  )
}
