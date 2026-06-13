const floatingIllustrations = [
  { src: "image copy 6.png",  x: "8%",  y: "15%",  size: 120, rot: -12 },
  { src: "image copy 12.png", x: "85%", y: "10%",  size: 110, rot: 8 },
  { src: "image copy 10.png", x: "15%", y: "72%",  size: 130, rot: 15 },
  { src: "image.png",         x: "78%", y: "75%",  size: 105, rot: -8 },
  { src: "image copy 13.png", x: "48%", y: "5%",   size: 95,  rot: -18 },
  { src: "image copy 3.png",  x: "3%",  y: "45%",  size: 115, rot: -6 },
];

export default function FreeTrial() {
  return (
    <section id="free-trial" className="section section--light">
      <div className="cta-container">
        <div className="cta-words">
          <span className="cta-word cta-word--1">YOUR</span>
          <span className="cta-word cta-word--2">FIRST</span>
          <span className="cta-word cta-word--3">LESSON</span>
          <span className="cta-word cta-word--4">IS</span>
          <span className="cta-word cta-word--5">FREE</span>
        </div>
        <div className="cta-bottom">
          <div className="btn-playful-wrap btn-playful-wrap--large">
            <span className="free-sticker free-sticker--large">FREE</span>
            <a
              href="https://wa.me/94701150250?text=Hi%20Kavina!%20I%27d%20love%20to%20book%20a%20free%20trial%20session%20%F0%9F%99%8C"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-playful btn-playful--coral btn-playful--large"
            >
              Book Your Free Session
            </a>
          </div>

          <p className="cta-subtext">No commitment. No card. Just math.</p>

          <a href="tel:0701150250" className="phone-playful phone-playful--large">
            <span className="phone-playful__icon">📞</span>
            <span className="phone-playful__number">070 115 0250</span>
          </a>

          <p className="cta-trust">Trusted by 50+ Sri Lankan parents</p>
        </div>
      </div>

      <div className="floating-symbols" aria-hidden="true">
        {floatingIllustrations.map((s, i) => (
          <img
            key={i}
            className="float-sym-img"
            src={`/assets/images/image-flowing/${s.src}`}
            alt=""
            draggable="false"
            style={{
              left: s.x,
              top: s.y,
              width: `${s.size}px`,
              transform: `rotate(${s.rot}deg)`,
            }}
          />
        ))}
      </div>
    </section>
  );
}
