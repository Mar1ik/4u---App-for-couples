import { useEffect, useState } from 'react';

export type PetType = 'cat' | 'dog' | 'lion' | 'shark' | 'flame';

export interface PetData {
  type: PetType;
  name: string;
  emoji: string;
  color: string;
  secondaryColor: string;
}

export const PET_TYPES: PetData[] = [
  { type: 'cat', name: 'Кошечка', emoji: '🐱', color: '#FF6B9D', secondaryColor: '#FFB3D9' },
  { type: 'dog', name: 'Собачка', emoji: '🐶', color: '#FFB86B', secondaryColor: '#FFE0B3' },
  { type: 'lion', name: 'Львенок', emoji: '🦁', color: '#FFE66B', secondaryColor: '#FFF5B3' },
  { type: 'shark', name: 'Акулка', emoji: '🦈', color: '#6BB8FF', secondaryColor: '#B3DDFF' },
  { type: 'flame', name: 'Огонек', emoji: '🔥', color: '#FF6B00', secondaryColor: '#FFB300' },
];

interface PetProps {
  type: PetType;
  color?: string;
  secondaryColor?: string;
  mood: 'happy' | 'neutral' | 'sad' | 'sleeping' | 'excited';
  size?: number;
}

export function Pet({ type, color, secondaryColor, mood, size = 100 }: PetProps) {
  const petData = PET_TYPES.find(p => p.type === type) || PET_TYPES[0];
  const primaryColor = color || petData.color;
  const secColor = secondaryColor || petData.secondaryColor;

  if (type === 'flame') {
    return <FlamePet mood={mood} size={size} color={primaryColor} secondaryColor={secColor} />;
  }

  return <PixelPet type={type} color={primaryColor} secondaryColor={secColor} mood={mood} size={size} />;
}

// Анимированный огонек как в TikTok
function FlamePet({ mood, size, color, secondaryColor }: { mood: string; size: number; color: string; secondaryColor: string }) {
  const [animationFrame, setAnimationFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimationFrame(prev => (prev + 1) % 120);
    }, 33); // ~30 FPS для плавной анимации
    return () => clearInterval(interval);
  }, []);

  const getFlameHeight = (base: number, variation: number, offset: number = 0) => {
    return base + Math.sin((animationFrame + offset) * 0.15) * variation;
  };

  const getFlameWidth = (base: number, variation: number, offset: number = 0) => {
    return base + Math.cos((animationFrame + offset) * 0.12) * variation;
  };

  const getFlameX = (base: number, variation: number, offset: number = 0) => {
    return base + Math.sin((animationFrame + offset) * 0.1) * variation;
  };

  const centerY = 100;
  const baseHeight = 80;

  return (
    <div style={{ width: size, height: size, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg width={size} height={size} viewBox="0 0 100 120" style={{ overflow: 'visible' }}>
        {/* Левое пламя */}
        <path
          d={`M ${getFlameX(45, 2, 0)} ${centerY - getFlameHeight(15, 3, 0)} 
              Q ${getFlameX(40, 3, 5)} ${centerY - getFlameHeight(30, 5, 5)} 
                ${getFlameX(35, 4, 10)} ${centerY - getFlameHeight(45, 7, 10)}
              Q ${getFlameX(38, 2, 15)} ${centerY - getFlameHeight(60, 8, 15)} 
                ${getFlameX(45, 1, 20)} ${centerY - getFlameHeight(70, 10, 20)}
              Q ${getFlameX(48, 2, 25)} ${centerY - getFlameHeight(65, 8, 25)} 
                ${getFlameX(50, 1, 30)} ${centerY - getFlameHeight(50, 6, 30)}
              Q ${getFlameX(48, 2, 35)} ${centerY - getFlameHeight(30, 4, 35)} 
                ${getFlameX(45, 2, 0)} ${centerY - getFlameHeight(15, 3, 0)}
              Z`}
          fill={color}
          opacity={0.95}
          style={{
            filter: 'blur(0.5px)',
            transformOrigin: '50% 100%',
          }}
        />
        
        {/* Центральное пламя */}
        <path
          d={`M ${getFlameX(50, 1, 0)} ${centerY - getFlameHeight(20, 4, 0)} 
              Q ${getFlameX(48, 2, 8)} ${centerY - getFlameHeight(40, 6, 8)} 
                ${getFlameX(45, 3, 16)} ${centerY - getFlameHeight(55, 8, 16)}
              Q ${getFlameX(48, 2, 24)} ${centerY - getFlameHeight(70, 10, 24)} 
                ${getFlameX(50, 0, 32)} ${centerY - getFlameHeight(80, 12, 32)}
              Q ${getFlameX(52, 2, 40)} ${centerY - getFlameHeight(70, 10, 40)} 
                ${getFlameX(55, 3, 48)} ${centerY - getFlameHeight(55, 8, 48)}
              Q ${getFlameX(52, 2, 56)} ${centerY - getFlameHeight(40, 6, 56)} 
                ${getFlameX(50, 1, 0)} ${centerY - getFlameHeight(20, 4, 0)}
              Z`}
          fill={secondaryColor}
          opacity={0.85}
        />

        {/* Правое пламя */}
        <path
          d={`M ${getFlameX(55, 2, 0)} ${centerY - getFlameHeight(15, 3, 0)} 
              Q ${getFlameX(60, 3, 5)} ${centerY - getFlameHeight(30, 5, 5)} 
                ${getFlameX(65, 4, 10)} ${centerY - getFlameHeight(45, 7, 10)}
              Q ${getFlameX(62, 2, 15)} ${centerY - getFlameHeight(60, 8, 15)} 
                ${getFlameX(55, 1, 20)} ${centerY - getFlameHeight(70, 10, 20)}
              Q ${getFlameX(52, 2, 25)} ${centerY - getFlameHeight(65, 8, 25)} 
                ${getFlameX(50, 1, 30)} ${centerY - getFlameHeight(50, 6, 30)}
              Q ${getFlameX(52, 2, 35)} ${centerY - getFlameHeight(30, 4, 35)} 
                ${getFlameX(55, 2, 0)} ${centerY - getFlameHeight(15, 3, 0)}
              Z`}
          fill={color}
          opacity={0.95}
          style={{
            filter: 'blur(0.5px)',
            transformOrigin: '50% 100%',
          }}
        />

        {/* Яркое ядро */}
        <ellipse
          cx={getFlameX(50, 1, 0)}
          cy={centerY - getFlameHeight(65, 6, 0)}
          rx={getFlameWidth(8, 2, 0)}
          ry={getFlameHeight(18, 4, 0)}
          fill="#FFFF00"
          opacity={0.8}
        />
        <ellipse
          cx={getFlameX(50, 0.5, 0)}
          cy={centerY - getFlameHeight(70, 5, 0)}
          rx={getFlameWidth(5, 1, 0)}
          ry={getFlameHeight(12, 3, 0)}
          fill="#FFFFFF"
          opacity={0.9}
        />

        {/* Глаза для настроения */}
        {mood === 'happy' && (
          <>
            <circle cx={getFlameX(45, 1, 0)} cy={centerY - getFlameHeight(55, 4, 0)} r={2.5} fill="#000" />
            <circle cx={getFlameX(55, 1, 0)} cy={centerY - getFlameHeight(55, 4, 0)} r={2.5} fill="#000" />
            <path
              d={`M ${getFlameX(42, 1, 0)} ${centerY - getFlameHeight(50, 4, 0)} Q ${getFlameX(50, 0, 0)} ${centerY - getFlameHeight(45, 4, 0)} ${getFlameX(58, 1, 0)} ${centerY - getFlameHeight(50, 4, 0)}`}
              stroke="#000"
              strokeWidth="2"
              fill="none"
            />
          </>
        )}
        {mood === 'sad' && (
          <>
            <circle cx={getFlameX(45, 1, 0)} cy={centerY - getFlameHeight(55, 4, 0)} r={2.5} fill="#000" />
            <circle cx={getFlameX(55, 1, 0)} cy={centerY - getFlameHeight(55, 4, 0)} r={2.5} fill="#000" />
            <path
              d={`M ${getFlameX(42, 1, 0)} ${centerY - getFlameHeight(60, 4, 0)} Q ${getFlameX(50, 0, 0)} ${centerY - getFlameHeight(65, 4, 0)} ${getFlameX(58, 1, 0)} ${centerY - getFlameHeight(60, 4, 0)}`}
              stroke="#000"
              strokeWidth="2"
              fill="none"
            />
          </>
        )}
        {mood === 'sleeping' && (
          <>
            <line
              x1={getFlameX(43, 1, 0)}
              y1={centerY - getFlameHeight(55, 4, 0)}
              x2={getFlameX(47, 1, 0)}
              y2={centerY - getFlameHeight(55, 4, 0)}
              stroke="#000"
              strokeWidth="2.5"
            />
            <line
              x1={getFlameX(53, 1, 0)}
              y1={centerY - getFlameHeight(55, 4, 0)}
              x2={getFlameX(57, 1, 0)}
              y2={centerY - getFlameHeight(55, 4, 0)}
              stroke="#000"
              strokeWidth="2.5"
            />
          </>
        )}
        {mood === 'excited' && (
          <>
            <circle cx={getFlameX(45, 1, 0)} cy={centerY - getFlameHeight(55, 4, 0)} r={3} fill="#000" />
            <circle cx={getFlameX(55, 1, 0)} cy={centerY - getFlameHeight(55, 4, 0)} r={3} fill="#000" />
            <circle cx={getFlameX(43, 1, 0)} cy={centerY - getFlameHeight(53, 4, 0)} r={1} fill="#fff" />
            <circle cx={getFlameX(57, 1, 0)} cy={centerY - getFlameHeight(53, 4, 0)} r={1} fill="#fff" />
            <path
              d={`M ${getFlameX(40, 1, 0)} ${centerY - getFlameHeight(48, 4, 0)} Q ${getFlameX(50, 0, 0)} ${centerY - getFlameHeight(42, 4, 0)} ${getFlameX(60, 1, 0)} ${centerY - getFlameHeight(48, 4, 0)}`}
              stroke="#000"
              strokeWidth="2"
              fill="none"
            />
          </>
        )}
      </svg>
    </div>
  );
}

// Pixel Pet с разными типами
function PixelPet({ type, color, secondaryColor, mood, size }: { type: PetType; color: string; secondaryColor: string; mood: string; size: number }) {
  const pixelSize = size / 16;

  const getBodyPixels = (): number[][] => {
    switch (type) {
      case 'cat':
        // Кошечка с треугольными ушками
        return [
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0],
          [0,0,0,1,1,2,2,2,2,2,2,1,1,0,0,0],
          [0,0,1,3,3,2,2,2,2,2,2,3,3,1,0,0],
          [0,1,3,3,2,2,2,2,2,2,2,2,3,3,1,0],
          [0,1,2,2,2,2,2,2,2,2,2,2,2,2,1,0],
          [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
          [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
          [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
          [1,2,2,2,2,4,4,4,4,4,4,2,2,2,2,1],
          [0,1,2,2,2,2,4,4,4,4,2,2,2,2,1,0],
          [0,0,1,2,2,2,2,2,2,2,2,2,2,1,0,0],
          [0,0,0,1,1,2,2,2,2,2,2,1,1,0,0,0],
          [0,0,1,2,2,1,2,2,2,2,1,2,2,1,0,0],
          [0,1,2,2,2,1,0,0,0,0,1,2,2,2,1,0],
          [1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1],
        ];
      case 'dog':
        // Собачка с висячими ушками
        return [
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0],
          [0,0,0,1,1,2,2,2,2,2,2,1,1,0,0,0],
          [0,0,1,3,3,2,2,2,2,2,2,3,3,1,0,0],
          [0,1,3,3,3,2,2,2,2,2,2,3,3,3,1,0],
          [0,1,3,3,2,2,2,2,2,2,2,2,3,3,1,0],
          [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
          [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
          [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
          [1,2,2,2,2,4,4,4,4,4,4,2,2,2,2,1],
          [0,1,2,2,2,2,4,4,4,4,2,2,2,2,1,0],
          [0,0,1,2,2,2,2,2,2,2,2,2,2,1,0,0],
          [0,0,0,1,1,2,2,2,2,2,2,1,1,0,0,0],
          [0,0,1,2,2,1,2,2,2,2,1,2,2,1,0,0],
          [0,1,2,2,2,1,0,0,0,0,1,2,2,2,1,0],
          [1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1],
        ];
      case 'lion':
        // Львенок с большой гривой
        return [
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,1,1,1,1,1,1,1,1,1,1,0,0,0],
          [0,0,1,3,3,3,3,2,2,3,3,3,3,1,0,0],
          [0,1,3,3,3,2,2,2,2,2,2,3,3,3,1,0],
          [0,1,3,3,2,2,2,2,2,2,2,2,3,3,1,0],
          [1,3,2,2,2,2,2,2,2,2,2,2,2,2,3,1],
          [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
          [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
          [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
          [1,2,2,2,2,4,4,4,4,4,4,2,2,2,2,1],
          [0,1,2,2,2,2,4,4,4,4,2,2,2,2,1,0],
          [0,0,1,2,2,2,2,2,2,2,2,2,2,1,0,0],
          [0,0,0,1,1,2,2,2,2,2,2,1,1,0,0,0],
          [0,0,1,2,2,1,2,2,2,2,1,2,2,1,0,0],
          [0,1,2,2,2,1,0,0,0,0,1,2,2,2,1,0],
          [1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1],
        ];
      case 'shark':
        // Акулка с треугольной формой, плавниками и зубами
        return [
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0],
          [0,0,0,0,0,1,1,2,2,1,1,0,0,0,0,0],
          [0,0,0,1,1,2,2,2,2,2,2,1,1,0,0,0],
          [0,0,1,2,2,2,2,2,2,2,2,2,2,1,0,0],
          [0,1,2,2,2,2,2,2,2,2,2,2,2,2,1,0],
          [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
          [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
          [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
          [1,2,2,2,2,4,4,4,4,4,4,2,2,2,2,1],
          [0,1,2,2,2,2,4,4,4,4,2,2,2,2,1,0],
          [0,0,1,2,2,2,2,2,2,2,2,2,2,1,0,0],
          [0,0,0,1,1,2,2,2,2,2,2,1,1,0,0,0],
          [0,0,1,2,2,1,2,2,2,2,1,2,2,1,0,0],
          [0,1,2,2,2,1,0,0,0,0,1,2,2,2,1,0],
          [1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1],
        ];
      default:
        // Базовый дизайн (кошечка)
        return [
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0],
          [0,0,0,1,1,2,2,2,2,2,2,1,1,0,0,0],
          [0,0,1,3,3,2,2,2,2,2,2,3,3,1,0,0],
          [0,1,3,3,2,2,2,2,2,2,2,2,3,3,1,0],
          [0,1,2,2,2,2,2,2,2,2,2,2,2,2,1,0],
          [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
          [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
          [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
          [1,2,2,2,2,4,4,4,4,4,4,2,2,2,2,1],
          [0,1,2,2,2,2,4,4,4,4,2,2,2,2,1,0],
          [0,0,1,2,2,2,2,2,2,2,2,2,2,1,0,0],
          [0,0,0,1,1,2,2,2,2,2,2,1,1,0,0,0],
          [0,0,1,2,2,1,2,2,2,2,1,2,2,1,0,0],
          [0,1,2,2,2,1,0,0,0,0,1,2,2,2,1,0],
          [1,1,1,1,0,0,0,0,0,0,0,0,1,1,1,1],
        ];
    }
  };

  const getEyePixels = (): number[][] => {
    // Глаза накладываются поверх тела, поэтому используем значение 6 для глаз
    const empty = Array(16).fill(0).map(() => Array(16).fill(0));
    
    switch (mood) {
      case 'happy':
        // Счастливые глаза (закрытые, изогнутые)
        empty[3][5] = 5; empty[3][6] = 5; empty[3][9] = 5; empty[3][10] = 5;
        empty[4][5] = 5; empty[4][6] = 5; empty[4][9] = 5; empty[4][10] = 5;
        return empty;
      case 'sleeping':
        // Спящие глаза (горизонтальные линии)
        empty[4][5] = 5; empty[4][6] = 5; empty[4][9] = 5; empty[4][10] = 5;
        return empty;
      case 'excited':
        // Возбужденные глаза (большие и круглые)
        empty[3][5] = 5; empty[3][6] = 5; empty[3][9] = 5; empty[3][10] = 5;
        empty[4][5] = 5; empty[4][6] = 5; empty[4][9] = 5; empty[4][10] = 5;
        empty[3][4] = 5; empty[3][11] = 5;
        empty[4][4] = 5; empty[4][11] = 5;
        return empty;
      default:
        // Нейтральные глаза (обычные)
        empty[3][5] = 5; empty[3][6] = 5; empty[3][9] = 5; empty[3][10] = 5;
        empty[4][5] = 5; empty[4][6] = 5; empty[4][9] = 5; empty[4][10] = 5;
        return empty;
    }
  };

  const bodyPixels = getBodyPixels();
  const eyePixels = getEyePixels();

  const getColor = (value: number) => {
    switch (value) {
      case 1: return '#000000';
      case 2: return color;
      case 3: return secondaryColor;
      case 4: return mood === 'happy' ? '#FF69B4' : '#FFB6C1';
      case 5: return '#000000';
      default: return 'transparent';
    }
  };

  return (
    <div style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 16 16">
        {bodyPixels.map((row, y) =>
          row.map((cell, x) => {
            if (cell === 0) return null;
            return (
              <rect
                key={`body-${y}-${x}`}
                x={x}
                y={y}
                width={1}
                height={1}
                fill={getColor(cell)}
              />
            );
          })
        )}
        {eyePixels.map((row, y) =>
          row.map((cell, x) => {
            if (cell === 0) return null;
            return (
              <rect
                key={`eye-${y}-${x}`}
                x={x}
                y={y}
                width={1}
                height={1}
                fill={getColor(cell)}
              />
            );
          })
        )}
      </svg>
    </div>
  );
}

