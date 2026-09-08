import React, { useEffect, useState } from 'react';

const TAGLINES = [
  'Know where it goes.',
  'Spend smart. Live well.',
  'Every rupee, understood.'
];

export default function Splash({ onFinish }) {
  const [leaving, setLeaving] = useState(false);
  const [tagline] = useState(TAGLINES[Math.floor(Math.random() * TAGLINES.length)]);

  useEffect(() => {
    const t1 = setTimeout(() => setLeaving(true), 1900);
    const t2 = setTimeout(onFinish, 2350);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [onFinish]);

  return (
    <div className={`splash ${leaving ? 'splash-leaving' : ''}`}>
      <div className="splash-orb" />
      <h1 className="splash-title">Spendly</h1>
      <p className="splash-tagline">{tagline}</p>
    </div>
  );
}
