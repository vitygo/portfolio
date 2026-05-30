import styles from './Community.module.css'

function Community() {
  return (
    <section id="community" className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.label}>Community</p>
        <h2 className={styles.title}>Beyond the code.</h2>
        <p className={styles.subtitle}>
          Tech is built by people. I show up, connect, and learn in the open.
        </p>

        <div className={styles.grid}>

          {/* Featured — Meet.js */}
          <div className={`${styles.card} ${styles.cardFeatured}`}>
            <div className={styles.icon}>
              <i className="ti ti-users" aria-hidden="true" />
            </div>
            <h3 className={styles.cardTitle}>Meet.js Kraków</h3>
            <p className={styles.cardDesc}>
              Co-hosting local JavaScript meetups in Kraków. Helping organize events, coordinate speakers, and build a space where the JS community can share, learn, and connect.
            </p>
            <div className={styles.cardMeta}>
              <span>Co-host</span>
              <span className={styles.metaDot} />
              <span>Kraków, Poland</span>
            </div>
          </div>

          {/* Conferences */}
          <div className={styles.card}>
            <div className={styles.icon}>
              <i className="ti ti-microphone" aria-hidden="true" />
            </div>
            <h3 className={styles.cardTitle}>Conference Attendee</h3>
            <p className={styles.cardDesc}>
              I love showing up to conferences — not just to learn, but to meet people. Every event is a chance to talk to someone who's solved a problem I haven't faced yet.
            </p>
            <div className={styles.cardMeta}>
              <span>JS, React, web dev</span>
              <span className={styles.metaDot} />
              <span>Active</span>
            </div>
          </div>

          {/* Learning */}
          <div className={styles.card}>
            <div className={styles.icon}>
              <i className="ti ti-seeding" aria-hidden="true" />
            </div>
            <h3 className={styles.cardTitle}>Always Learning</h3>
            <p className={styles.cardDesc}>
              I believe the best developers never stop being students. New tools, new patterns, new people — I stay curious and pick things up fast.
            </p>
            <div className={styles.cardMeta}>
              <span>Currently</span>
              <span className={styles.metaDot} />
              <span>AI integration & architecture</span>
            </div>
          </div>

          {/* CTA card */}
          <div className={`${styles.card} ${styles.cardCta}`}>
            <div>
              <p className={styles.ctaLabel}>Want to connect?</p>
              <h3 className={styles.ctaTitle}>
                Let's meet at the next meetup or grab a coffee.
              </h3>
            </div>
            <a href="mailto:your@email.com" className={styles.btn}>
              Say hello
            </a>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Community