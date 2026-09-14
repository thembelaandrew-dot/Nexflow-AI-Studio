export type QualityTier = 'low' | 'medium' | 'high';

export interface Global3DStateType {
  scrollProgress: number;
  targetScrollProgress: number;
  pointer: { x: number; y: number };
  targetPointer: { x: number; y: number };
  isMobile: boolean;
  quality: QualityTier;
  initTime: number;
  isInitialized: boolean;
  prefersReducedMotion: boolean;
}

export const Global3DState: Global3DStateType = {
  scrollProgress: 0,
  targetScrollProgress: 0,
  pointer: { x: 0, y: 0 },
  targetPointer: { x: 0, y: 0 },
  isMobile: false,
  quality: 'high',
  initTime: 0,
  isInitialized: false,
  prefersReducedMotion: false,
};
