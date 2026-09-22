import { motion, useReducedMotion } from 'motion/react';
import React from 'react';

interface SectionReveal3DProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  viewportAmount?: number | 'some' | 'all';
  id?: string;
}

export const revealItem3DVariants = {
  hidden: {
    opacity: 0,
    y: 32,
    scale: 0.97,
    rotateX: 7,
    transformPerspective: 1000
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transformPerspective: 1000,
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1] as any
    }
  }
};

export default function SectionReveal3D({
  children,
  className = '',
  delay = 0,
  staggerDelay = 0.1,
  viewportAmount = 0.15,
  id
}: SectionReveal3DProps) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: shouldReduceMotion
      ? { opacity: 0 }
      : {
          opacity: 0,
          y: 40,
          scale: 0.95,
          rotateX: 8,
          transformPerspective: 1000
        },
    visible: shouldReduceMotion
      ? {
          opacity: 1,
          transition: {
            duration: 0.5,
            staggerChildren: staggerDelay,
            delayChildren: delay
          }
        }
      : {
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          transformPerspective: 1000,
          transition: {
            duration: 0.95,
            ease: [0.16, 1, 0.3, 1] as any,
            staggerChildren: staggerDelay,
            delayChildren: delay
          }
        }
  };

  return (
    <motion.div
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: viewportAmount }}
      variants={containerVariants}
      className={`relative ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        willChange: 'transform, opacity'
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem3D({
  children,
  className = '',
  customVariants
}: {
  children: React.ReactNode;
  className?: string;
  customVariants?: any;
  key?: React.Key;
}) {
  const shouldReduceMotion = useReducedMotion();

  const itemVariants = shouldReduceMotion
    ? {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.5 } }
      }
    : (customVariants || revealItem3DVariants);

  return (
    <motion.div
      variants={itemVariants}
      className={className}
      style={{
        transformStyle: 'preserve-3d',
        willChange: 'transform, opacity'
      }}
    >
      {children}
    </motion.div>
  );
}
