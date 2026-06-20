const chapterSymbols = [
  "image copy 13.png",
  "image copy 6.png",
  "image copy 3.png",
  "image copy 12.png",
  "image copy 10.png",
  "image copy 9.png",
  "image copy 5.png",
];

const chapters = [
  {
    n: "01",
    title: "Grade 8 & Above (Edexcel / Cambridge)",
    color: "#ff6b6b",
    desc: "Build strong math foundations early. Clear explanations that make harder topics easier later.",
  },
  {
    n: "02",
    title: "Edexcel IGCSE Mathematics",
    color: "#4ecdc4",
    desc: "Master the Edexcel 9-1 syllabus. Concept clarity, exam strategies, and past paper practice.",
  },
  {
    n: "03",
    title: "Cambridge IGCSE Mathematics",
    color: "#ffe66d",
    desc: "Understand the Cambridge approach. Learn the logic behind questions and common exam patterns.",
  },
  {
    n: "04",
    title: "Edexcel IAL Mathematics",
    color: "#dda0dd",
    desc: "Advanced math, explained step-by-step. Pure math topics broken down for clarity and confidence.",
  },
  {
    n: "05",
    title: "Online Classes",
    color: "#f4a261",
    desc: "Learn from anywhere. Interactive lessons designed to keep students engaged and focused.",
  },
  {
    n: "06",
    title: "Group Classes",
    color: "#e76f51",
    desc: "Learn together. Grow faster. Collaborative sessions where students solve and discuss problems.",
  },
  {
    n: "07",
    title: "Past Paper Revision",
    color: "#90be6d",
    desc: "Practice the questions that matter most. Focused past paper sessions with clear step-by-step solutions.",
  },
];

const stats = [
  { target: "50", suffix: "+", label: "Students Taught" },
  { target: "98", suffix: "%", label: "Pass Rate" },
  { target: "4.9", suffix: "\u2605", label: "Average Rating" },
  { target: "500", suffix: "+", label: "Hours Tutored" },
];

export default function About() {
  return (
    <section id="about" className="section section--dark">
      <div className="about-doodles" aria-hidden="true">
        <img src="/assets/images/image-flowing/image copy 7.png" alt="" className="about-doodle about-doodle--1" draggable="false" />
      </div>

      {/* Psychological hook */}
      <div className="about-hook">
        <span className="section-label section-label--light">ABOUT</span>

        <p className="about-hook__lead">
          Most students don&rsquo;t struggle with math because they&rsquo;re{" "}
          <em className="about-em">&ldquo;bad at it&rdquo;</em>.
        </p>

        <p className="about-hook__text">
          They struggle because somewhere along the way,{" "}
          <span className="about-mark">
            the explanation didn&rsquo;t click.
          </span>
        </p>

        <ul className="about-hook__reasons">
          <li>Maybe the class moved too fast.</li>
          <li>Maybe the teacher skipped steps.</li>
          <li>
            Maybe it was memorising formulas without understanding why they
            work.
          </li>
        </ul>

        <p className="about-hook__text">
          I&rsquo;ve seen it happen hundreds of times.
        </p>

        <p className="about-hook__text">
          And almost every time, the moment a concept is explained properly, you
          can literally see it happen &mdash; that moment where the student
          pauses and says:
        </p>

        <blockquote className="about-hook__quote">
          &ldquo;Oh&hellip; now I get it.&rdquo;
        </blockquote>

        <p className="about-hook__close">
          That&rsquo;s the moment I teach for.
        </p>
      </div>

      {/* Personal intro with photos */}
      <div className="about-intro">
        <div className="about-intro__content">
          <p className="about-intro__greeting">
            Hi, I&rsquo;m <strong>Kavina.</strong>
          </p>
          <p className="about-intro__text">
            I&rsquo;m a math tutor working with students preparing for{" "}
            <span className="about-mark">Edexcel IGCSE and IAL</span> exams. My
            focus is simple: helping students understand{" "}
            <span className="about-mark">the logic behind the math</span> so
            they can solve problems with confidence.
          </p>
          <p className="about-intro__text">
            Over the years I&rsquo;ve worked with{" "}
            <strong className="about-stat-inline">200+ students</strong>,
            helping them improve their understanding, exam performance, and
            confidence with the subject.
          </p>
          <p className="about-intro__close">
            Because when math is explained properly, it stops feeling{" "}
            <em className="about-em">impossible.</em>
          </p>

          <div className="about-socials">
            <a
              href="https://www.linkedin.com/in/kavina-alahapperuma/"
              target="_blank"
              rel="noopener noreferrer"
              className="about-social about-social--linkedin"
              aria-label="Kavina on LinkedIn"
            >
              {/* LinkedIn icon */}
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="about-social__icon">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <span className="about-social__label">LinkedIn</span>
            </a>

            <a
              href="https://kavina.xyz"
              target="_blank"
              rel="noopener noreferrer"
              className="about-social about-social--website"
              aria-label="Kavina's personal website"
            >
              <span className="about-social__web-icon" aria-hidden="true">
                <span className="about-social__web-dot" />
              </span>
              <span className="about-social__label">kavina.xyz</span>
              <span className="about-social__web-arrow" aria-hidden="true">↗</span>
            </a>
          </div>
        </div>

        <div className="about-photo-collage">
          <img
            src="/assets/images/kavina-1.jpg"
            alt="Kavina teaching"
            className="collage-photo"
            draggable="false"
          />
          <img
            src="/assets/images/kavina-2.jpg"
            alt=""
            className="collage-photo"
            draggable="false"
          />
          <img
            src="/assets/images/kavina-3.png"
            alt=""
            className="collage-photo"
            draggable="false"
          />
        </div>
      </div>

      {/* Chapter carousel */}
      <div className="chapters-section">
        <div className="chapters-header">
          <span className="section-label section-label--light">WHAT I TEACH</span>
          <h3 className="chapters-title">Explore the chapters</h3>
        </div>
        <div className="chapters-wrapper">
          <div className="chapters-track">
            {chapters.map((c, i) => (
              <div
                key={c.n}
                className="chapter-card"
                style={{ "--accent": c.color }}
              >
                <img
                  src={`/assets/images/image-flowing/${chapterSymbols[i]}`}
                  alt=""
                  className="chapter-card__sym"
                  draggable="false"
                />
                <span className="chapter-card__number">{c.n}</span>
                <h4>{c.title}</h4>
                <p>{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="stats-section">
        {stats.map((s) => (
          <div key={s.label} className="stat" data-target={s.target}>
            <div className="stat__value">
              <span className="stat__number">0</span>
              <span className="stat__suffix">{s.suffix}</span>
            </div>
            <span className="stat__label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
