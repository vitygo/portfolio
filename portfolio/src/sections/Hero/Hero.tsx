
import styles from './Hero.module.css'
import AsciiMobile from './AsciiMobile'






function Hero() {

  return (
    <section
      className={styles.hero}
    >
 

     

    <div className={styles.asciiWrap}>
          <AsciiMobile />
        </div>

     
    </section>
  )
}

export default Hero