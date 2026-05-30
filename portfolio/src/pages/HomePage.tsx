import Nav from '@/components/Nav/Nav'
import Footer from '@/components/Footer/Footer'
import Hero from '@/sections/Hero/Hero'
import Projects from '@/sections/Projects/Projects'
import Experience from '@/sections/Experience/Experience'
import Stack from '@/sections/Stack/Stack'
import Community from '@/sections/Community/Community'
import Contact from '@/sections/Contact/Contact'
import useReveal from '@/hooks/useReveal'
import CursorTrail from '@/components/CursorTrail/CursorTrail'

function HomePage() {
    useReveal()
  return (
    <>
      <Nav />
      <CursorTrail />
      <main>
        <Hero />
        <Projects />
        <Experience />
        <Stack />
        <Community />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default HomePage