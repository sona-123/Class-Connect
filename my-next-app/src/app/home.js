'use client';
import { useState } from "react";

export default function Home1() {
  const [result, setResult] = useState();
  const [loading, setLoading] = useState(false);

  const sendEmail = () => {
    setLoading(true);
  
    fetch('/api/emails', {
      method: 'POST',
    })
      .then(response => response.json())
      .then(data => setResult(data))
      .catch(error => setResult(error))
      .finally(() => setLoading(false));
  };
  

  return (
    <div className="p-4">
      <div className="my-4">{JSON.stringify(result)}</div>
      {loading && <div className="my-4">Processing...</div>}
      <button
        onClick={sendEmail}
        className="bg-blue-500 rounded p-3"
      >
        Send email
      </button>
    </div>
  );
}
