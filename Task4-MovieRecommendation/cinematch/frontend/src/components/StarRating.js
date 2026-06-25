import { useState } from 'react';

export default function StarRating({ onRate, currentRating }) {
  const [hovered, setHovered] = useState(0);

  return (
    <div>
      {[1, 2, 3, 4, 5].map(star => (
        <span
          key={star}
          onClick={() => onRate(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          style={{ fontSize: '22px', cursor: 'pointer', color: star <= (hovered || currentRating) ? '#f5c518' : '#555' }}
        >
          ★
        </span>
      ))}
    </div>
  );
}