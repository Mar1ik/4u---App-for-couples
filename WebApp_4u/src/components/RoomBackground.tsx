export function RoomBackground() {
  return (
    <svg 
      width="100%" 
      height="100%" 
      viewBox="0 0 400 400" 
      className="absolute inset-0 -z-10"
      preserveAspectRatio="xMidYMid slice"
    >
      {/* Floor */}
      <rect x="0" y="280" width="400" height="120" fill="#D4A574" />
      
      {/* Floor boards */}
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <line 
          key={`floor-${i}`}
          x1={i * 50} 
          y1="280" 
          x2={i * 50} 
          y2="400" 
          stroke="#B8935F" 
          strokeWidth="2"
        />
      ))}
      
      {/* Wall */}
      <rect x="0" y="0" width="400" height="280" fill="#E8D5C4" />
      
      {/* Wall pattern */}
      <pattern id="wallpaper" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
        <circle cx="20" cy="20" r="3" fill="#F5E6D3" opacity="0.5" />
      </pattern>
      <rect x="0" y="0" width="400" height="280" fill="url(#wallpaper)" />
      
      {/* Window */}
      <g>
        <rect x="280" y="40" width="100" height="120" fill="#B3D9FF" stroke="#8B6914" strokeWidth="6" />
        <line x1="330" y1="40" x2="330" y2="160" stroke="#8B6914" strokeWidth="4" />
        <line x1="280" y1="100" x2="380" y2="100" stroke="#8B6914" strokeWidth="4" />
        {/* Window panes reflection */}
        <rect x="285" y="45" width="40" height="20" fill="#E6F3FF" opacity="0.6" />
        <rect x="335" y="105" width="40" height="20" fill="#E6F3FF" opacity="0.6" />
      </g>
      
      {/* Picture frame */}
      <g>
        <rect x="30" y="60" width="80" height="60" fill="#FFD1DC" stroke="#8B6914" strokeWidth="4" />
        {/* Heart in frame */}
        <path 
          d="M 55 85 C 55 80, 60 75, 65 75 C 68 75, 70 77, 70 80 C 70 77, 72 75, 75 75 C 80 75, 85 80, 85 85 C 85 95, 70 105, 70 105 C 70 105, 55 95, 55 85 Z" 
          fill="#FF69B4"
        />
      </g>
      
      {/* Plant pot */}
      <g>
        <rect x="320" y="240" width="50" height="40" fill="#CD853F" stroke="#8B4513" strokeWidth="2" />
        {/* Plant leaves */}
        <ellipse cx="335" cy="235" rx="8" ry="15" fill="#228B22" />
        <ellipse cx="345" cy="230" rx="10" ry="18" fill="#32CD32" />
        <ellipse cx="355" cy="235" rx="8" ry="15" fill="#228B22" />
      </g>
      
      {/* Rug */}
      <g>
        <ellipse cx="150" cy="330" rx="80" ry="40" fill="#C77" opacity="0.8" />
        <ellipse cx="150" cy="330" rx="65" ry="30" fill="#D99" opacity="0.7" />
      </g>
      
      {/* Baseboard */}
      <rect x="0" y="270" width="400" height="10" fill="#8B6914" />
    </svg>
  );
}
