export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-doodles" aria-hidden="true">
        <img src="/assets/images/image-flowing/image copy 12.png" alt="" className="footer-doodle footer-doodle--1" draggable="false" />
      </div>
      <div className="footer-wordmark">MATHEASE</div>
      <div className="footer-strip">
        <span className="footer-copy">&copy; 2026 Kavina</span>
        <nav className="footer-links">
          <a href="#">Instagram</a>
          <a href="#">TikTok</a>
          <a href="mailto:kavina@tutoring.com">Email</a>
        </nav>
        <button
          className="footer-top-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
        >
          &uarr;
        </button>
      </div>
    </footer>
  );
}
