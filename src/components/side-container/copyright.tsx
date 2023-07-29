export default function Copyright() {
  return (
    <div className="copyright-container">
      <p className="copyright-date">
        &copy; {new Date().getFullYear()}{" "}
        <span className="copyright-name">Jatin Kalsi</span>
      </p>
    </div>
  );
}
