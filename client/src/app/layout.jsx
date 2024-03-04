import { Poppins } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar/Navbar'
import AuthProvider from './components/AuthProvider/AuthProvider'
import Footer from './components/Footer/Footer';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata = {
  title: 'RAGE AGRIHELP',
  description: 'Farmer Paradise',
  
}


export default function RootLayout({ children }) {

  return (

    <>

      <html lang="en">
      
        <AuthProvider>

          <body className={poppins.className}>
            <Navbar></Navbar>
            <div className='mt-32'>
              {children}
            </div>

          </body>
        </AuthProvider>
      </html>
    </>
  )
}
