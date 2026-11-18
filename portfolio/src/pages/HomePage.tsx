import Nav from '@/components/Nav/Nav'
import Footer from '@/components/Footer/Footer'
import Hero from '@/sections/Hero/Hero'
import useReveal from '@/hooks/useReveal'
import CursorTrail from '@/components/CursorTrail/CursorTrail'
import Noise from '@/components/Noise/Noise'

import BackToTop from '@/components/BackToTop/BackToTop'




function HomePage() {
    useReveal()
  return (
    <>
      <Nav />
      <CursorTrail />
      <BackToTop />
      <Noise />
      <main>
        <Hero />
     
 
   
       
   
      </main>
      <Footer />
    </>
  )
}

export default HomePage