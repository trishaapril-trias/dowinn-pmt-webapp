import Nav from '@components/Nav'
import '@styles/globals.css'
import { Toaster } from '@node_modules/react-hot-toast/dist'


export const metadata = {
    title: 'Project Management Tool',
    description: 'Monitor Task'
}

const RootLayout = ({ children }) => {
  return (
    <html lang='en'>
        <body>
            <Toaster position='top-right' reverseOrder={false}/>
            <div className='main'>
                <div className='gradient'/>
            </div>
            <main className='app'>
               <Nav/> 
                {children}
            </main>
            
        </body>
    </html>
  )
}

export default RootLayout