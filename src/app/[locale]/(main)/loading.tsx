export default function Loading() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "#100c07" }}
    >
      <div className="flex flex-col items-center" style={{ gap: "18px" }}>
        <span className="live-dot" style={{ width: 6, height: 6 }} />
        <p
          className="font-mono"
          style={{
            fontSize: "9px",
            letterSpacing: "0.32em",
            color: "rgba(210,152,38,0.48)",
          }}
        >
          東京
        </p>
      </div>
    </div>
  );
}
