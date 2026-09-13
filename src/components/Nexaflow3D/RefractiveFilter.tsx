import React, { useEffect, useRef } from 'react';
import { Global3DState } from './state';

/**
 * RefractiveFilter
 * High-performance SVG optical filter pipeline providing:
 * - Dynamic fractal turbulence displacement
 * - Chromatic dispersion (RGB wavelength split)
 * - Edge-weighted radial mask for curvature refraction
 */
export const RefractiveFilter: React.FC = () => {
  const turbRef = useRef<SVGFETurbulenceElement>(null);
  const dispRedRef = useRef<SVGFEDisplacementMapElement>(null);
  const dispBlueRef = useRef<SVGFEDisplacementMapElement>(null);
  const dispGreenRef = useRef<SVGFEDisplacementMapElement>(null);

  useEffect(() => {
    let animId: number;
    let baseTime = 0;

    const animateFilter = () => {
      if (Global3DState.prefersReducedMotion) {
        return;
      }

      baseTime += 0.006;
      
      // Dynamic turbulence modulation based on scroll & pointer velocity
      const velocityMag = Math.sqrt(
        Global3DState.pointerVelocity.x * Global3DState.pointerVelocity.x +
        Global3DState.pointerVelocity.y * Global3DState.pointerVelocity.y
      );
      
      const dynamicScale = (22 + velocityMag * 35 + Global3DState.energyPulse * 15) * Global3DState.refractionIntensity;
      const dispersionSpread = (4.5 + Global3DState.chromaticDispersion * 3.5) * (Global3DState.quality === 'low' ? 0.5 : 1.0);

      // Modulate displacement scales for chromatic dispersion
      if (dispRedRef.current) {
        dispRedRef.current.setAttribute('scale', (dynamicScale + dispersionSpread).toFixed(2));
      }
      if (dispGreenRef.current) {
        dispGreenRef.current.setAttribute('scale', dynamicScale.toFixed(2));
      }
      if (dispBlueRef.current) {
        dispBlueRef.current.setAttribute('scale', Math.max(0, dynamicScale - dispersionSpread).toFixed(2));
      }

      if (turbRef.current) {
        // Organic slow frequency breathing
        const freqX = (0.012 + Math.sin(baseTime * 0.4) * 0.003).toFixed(4);
        const freqY = (0.015 + Math.cos(baseTime * 0.3) * 0.003).toFixed(4);
        turbRef.current.setAttribute('baseFrequency', `${freqX} ${freqY}`);
      }

      animId = requestAnimationFrame(animateFilter);
    };

    animId = requestAnimationFrame(animateFilter);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <svg 
      className="pointer-events-none fixed inset-0 w-0 h-0 opacity-0 overflow-hidden" 
      aria-hidden="true"
    >
      <defs>
        {/* Core Chromatic Refraction Filter */}
        <filter id="nexaflow-core-refraction" x="-50%" y="-50%" width="200%" height="200%" colorInterpolationFilters="sRGB">
          {/* Fractal Noise Turbulence */}
          <feTurbulence
            ref={turbRef}
            type="fractalNoise"
            baseFrequency="0.014 0.016"
            numOctaves="2"
            result="noise"
          />

          {/* Red Channel Displacement (Positive Wavelength Shift) */}
          <feDisplacementMap
            ref={dispRedRef}
            in="SourceGraphic"
            in2="noise"
            scale="26"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displacedRed"
          />
          <feColorMatrix
            in="displacedRed"
            type="matrix"
            values="1 0 0 0 0
                    0 0 0 0 0
                    0 0 0 0 0
                    0 0 0 1 0"
            result="redChannel"
          />

          {/* Green Channel Displacement (Center Wavelength) */}
          <feDisplacementMap
            ref={dispGreenRef}
            in="SourceGraphic"
            in2="noise"
            scale="22"
            xChannelSelector="G"
            yChannelSelector="B"
            result="displacedGreen"
          />
          <feColorMatrix
            in="displacedGreen"
            type="matrix"
            values="0 0 0 0 0
                    0 1 0 0 0
                    0 0 0 0 0
                    0 0 0 1 0"
            result="greenChannel"
          />

          {/* Blue Channel Displacement (Negative Wavelength Shift) */}
          <feDisplacementMap
            ref={dispBlueRef}
            in="SourceGraphic"
            in2="noise"
            scale="18"
            xChannelSelector="B"
            yChannelSelector="R"
            result="displacedBlue"
          />
          <feColorMatrix
            in="displacedBlue"
            type="matrix"
            values="0 0 0 0 0
                    0 0 0 0 0
                    0 0 1 0 0
                    0 0 0 1 0"
            result="blueChannel"
          />

          {/* Combine RGB Channels with Screen Blending */}
          <feBlend in="redChannel" in2="greenChannel" mode="screen" result="rgChannels" />
          <feBlend in="rgChannels" in2="blueChannel" mode="screen" result="rgbCombined" />

          {/* Subtle Contrast & Optical Luminance Enhancement */}
          <feComponentTransfer in="rgbCombined">
            <feFuncR type="linear" slope="1.08" />
            <feFuncG type="linear" slope="1.05" />
            <feFuncB type="linear" slope="1.12" />
          </feComponentTransfer>
        </filter>

        {/* Subtle Lens Edge Refraction Filter for Backdrop */}
        <filter id="nexaflow-lens-edge" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="4" result="blur" />
          <feSpecularLighting in="blur" surfaceScale="5" specularConstant="1.2" specularExponent="20" lightingColor="#ffffff" result="specular">
            <fePointLight x="-50" y="-100" z="200" />
          </feSpecularLighting>
          <feComposite in="specular" in2="SourceAlpha" operator="in" result="specularCut" />
        </filter>
      </defs>
    </svg>
  );
};
