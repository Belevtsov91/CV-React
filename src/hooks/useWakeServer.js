import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

export function useWakeServer() {
  const [serverReady, setServerReady] = useState(false);
  const [serverError, setServerError] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/api/health`)
      .then((res) => {
        if (res.ok) {
          setServerReady(true);
        } else {
          setServerError(true);
        }
      })
      .catch(() => setServerError(true));
  }, []);

  return { serverReady, serverError };
}
