export default function Hero() {
  const symbols = [
    { src: "image copy 12.png", x: "3%",   y: "4%",   size: 220, depth: 0.25, delay: 0,    rot: -8 },
    { src: "image.png",         x: "80%",  y: "2%",   size: 200, depth: 0.45, delay: 0.08,  rot: 12 },
    { src: "image copy 10.png", x: "-4%",  y: "38%",  size: 240, depth: 0.18, delay: 0.16,  rot: -5 },
    { src: "image copy 13.png", x: "83%",  y: "34%",  size: 210, depth: 0.32, delay: 0.24,  rot: 10 },
    { src: "image copy 9.png",  x: "38%",  y: "-2%",  size: 170, depth: 0.5,  delay: 0.32,  rot: -14 },
    { src: "image copy 6.png",  x: "65%",  y: "8%",   size: 145, depth: 0.55, delay: 0.4,   rot: 6 },
    { src: "image copy 7.png",  x: "5%",   y: "68%",  size: 180, depth: 0.4,  delay: 0.48,  rot: -10 },
    { src: "image copy.png",    x: "76%",  y: "65%",  size: 190, depth: 0.35, delay: 0.56,  rot: 15 },
    { src: "image copy 3.png",  x: "58%",  y: "78%",  size: 155, depth: 0.42, delay: 0.64,  rot: -12 },
    { src: "image copy 5.png",  x: "18%",  y: "80%",  size: 140, depth: 0.6,  delay: 0.72,  rot: 8 },
    { src: "image copy 4.png",  x: "92%",  y: "55%",  size: 160, depth: 0.3,  delay: 0.8,   rot: -6 },
    { src: "image copy 2.png",  x: "-5%",  y: "72%",  size: 175, depth: 0.22, delay: 0.88,  rot: 11 },
    { src: "image copy 8.png",  x: "72%",  y: "84%",  size: 130, depth: 0.65, delay: 0.96,  rot: -9 },
    { src: "image copy 11.png", x: "30%",  y: "5%",   size: 135, depth: 0.48, delay: 1.04,  rot: 7 },
  ];

  return (
    <section id="hero" className="section section--light">
      {/* All 14 illustrated symbols — large, fixed, interactive */}
      <div className="hero-symbols" aria-hidden="true">
        {symbols.map((s, i) => (
          <img
            key={i}
            className="hero-sym"
            src={`/assets/images/image-flowing/${s.src}`}
            alt=""
            draggable="false"
            data-depth={s.depth}
            data-home-x={s.x}
            data-home-y={s.y}
            data-rot={s.rot}
            style={{
              left: s.x,
              top: s.y,
              width: `${s.size}px`,
              "--float-delay": `${s.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Contact bar */}
      <div className="hero-top">
        <a href="tel:0760796819" className="hero-top__contact">
          0760796819
        </a>
        <a href="mailto:kmanthuka@gmail.com" className="hero-top__contact">
          kmanthuka@gmail.com
        </a>
      </div>

      {/* Center content */}
      <div className="hero-center">
        <div className="hero-brand-group">
          <h1 className="hero-brand">
            <span className="hero-brand__line">Math</span>
            <span className="hero-brand__line hero-brand__line--accent">Ease</span>
          </h1>
          <p className="hero-subtitle">Maths Made Easy</p>
        </div>

        <p className="hero-hook">
          Your child doesn&rsquo;t need to &ldquo;try harder.&rdquo;
          <br />
          They need someone who makes it click.
        </p>

        <div className="hero-actions">
          <a
            href="https://wa.me/94760796819?text=Hi%20Kavina!%20I%27d%20love%20to%20book%20a%20free%20trial%20session%20%F0%9F%99%8C"
            target="_blank"
            rel="noopener noreferrer"
            className="hero-btn hero-btn--primary"
          >
            Book a Free Lesson
          </a>
          <a href="#reviews" className="hero-btn hero-btn--ghost">
            See Results &darr;
          </a>
        </div>
      </div>

      <div className="hero-trust">
        <div className="hero-trust__item">
          <strong>98%</strong>
          <span>Pass Rate</span>
        </div>
        <div className="hero-trust__divider" aria-hidden="true" />
        <div className="hero-trust__item">
          <strong>50+</strong>
          <span>Students</span>
        </div>
        <div className="hero-trust__divider" aria-hidden="true" />
        <div className="hero-trust__item">
          <strong>4.9&#9733;</strong>
          <span>Rating</span>
        </div>
      </div>

      <div className="scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-arrow">&darr;</div>
      </div>
    </section>
  );
}
