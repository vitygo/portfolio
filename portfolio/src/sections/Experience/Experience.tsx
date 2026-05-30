import styles from './Experience.module.css'

function Experience() {
  return (
    <section id="experience" className={styles.section}>
      <div className={styles.inner}>
        <p className={styles.label}>Experience</p>

        <div className={styles.statement}>
          <h2 className={styles.title}>
            No corporate history.<br />
            Just shipping things.
          </h2>
          <p className={styles.desc}>
            I don't have a LinkedIn full of job titles — I have working projects, a GitHub with actual commits, and the kind of hunger that only comes from building everything yourself from scratch.
          </p>
          <p className={styles.desc}>
            I'm looking for my first commercial role where I can grow fast, contribute from day one, and work with people who care about what they build.
          </p>

          <div className={styles.cards}>
            <div className={styles.card}>
              <i className="ti ti-code" aria-hidden="true" />
              <h3>Self-taught</h3>
              <p>Learned by building — not by watching tutorials. Every concept came from a real problem I needed to solve.</p>
            </div>
            <div className={styles.card}>
              <i className="ti ti-rocket" aria-hidden="true" />
              <h3>Shipped to production</h3>
              <p>Both projects are live, deployed on Render, used by real people. Not just localhost demos.</p>
            </div>
            <div className={styles.card}>
              <i className="ti ti-seeding" aria-hidden="true" />
              <h3>Ready to grow</h3>
              <p>I pick up new tools fast, take feedback well, and show up every day. Give me a chance to prove it.</p>
            </div>
          </div>

          <a href="mailto:your@email.com" className={styles.cta}>
            Give me a shot
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </a>
        </div>

      </div>
    </section>
  )
}

export default Experience





// function Experience() {
//   return (
//     <section id="experience" className={styles.section}>
//       <div className={styles.inner}>
//         <p className={styles.label}>Career</p>
//         <h2 className={styles.title}>Where I've worked.</h2>
//         <p className={styles.subtitle}>
//           Lorem ipsum dolor sit amet, consectetur adipiscing elit ut aliquam.
//         </p>

//         <div className={styles.list}>

//           <div className={styles.item}>
//             <div className={styles.meta}>
//               <p className={styles.company}>Company Name</p>
//               <p className={styles.period}>2024 — Present</p>
//               <span className={`${styles.badge} ${styles.badgeCurrent}`}>Current</span>
//             </div>
//             <div className={styles.body}>
//               <h3 className={styles.role}>Job Title</h3>
//               <p className={styles.desc}>
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation.
//               </p>
//               <div className={styles.highlights}>
//                 <span className={styles.highlight}>React</span>
//                 <span className={styles.highlight}>TypeScript</span>
//                 <span className={styles.highlight}>Node.js</span>
//                 <span className={styles.highlight}>PostgreSQL</span>
//               </div>
//             </div>
//           </div>

//           <div className={styles.item}>
//             <div className={styles.meta}>
//               <p className={styles.company}>Company Name</p>
//               <p className={styles.period}>2022 — 2024</p>
//               <span className={`${styles.badge} ${styles.badgePast}`}>Former</span>
//             </div>
//             <div className={styles.body}>
//               <h3 className={styles.role}>Job Title</h3>
//               <p className={styles.desc}>
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation.
//               </p>
//               <div className={styles.highlights}>
//                 <span className={styles.highlight}>React</span>
//                 <span className={styles.highlight}>TypeScript</span>
//                 <span className={styles.highlight}>Express</span>
//                 <span className={styles.highlight}>Prisma</span>
//               </div>
//             </div>
//           </div>

//           <div className={styles.item}>
//             <div className={styles.meta}>
//               <p className={styles.company}>Company Name</p>
//               <p className={styles.period}>2020 — 2022</p>
//               <span className={`${styles.badge} ${styles.badgePast}`}>Former</span>
//             </div>
//             <div className={styles.body}>
//               <h3 className={styles.role}>Job Title</h3>
//               <p className={styles.desc}>
//                 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation.
//               </p>
//               <div className={styles.highlights}>
//                 <span className={styles.highlight}>Next.js</span>
//                 <span className={styles.highlight}>PostgreSQL</span>
//                 <span className={styles.highlight}>AWS</span>
//                 <span className={styles.highlight}>Stripe</span>
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>
//     </section>
//   )
// }

// export default Experience