
export interface FortuneWheelProps {}

export interface FortuneWheelSegment {
  value: number;
  color: string;
}

// This is the type that's being imported in FortuneWheelDisplay.tsx
export type Segment = FortuneWheelSegment;
