export default function ServerLoader({ ready }) {
  return (
    <div
      className={`server-loader${ready ? " server-loader--ready" : ""}`}
      aria-hidden="true"
    />
  );
}
