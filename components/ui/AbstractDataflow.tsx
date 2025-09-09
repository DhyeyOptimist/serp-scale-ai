'use client';

import { useEffect, useRef } from 'react';

export default function AbstractDataflow() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Enhanced animation setup - fallback to CSS animations if GSAP not available
    if (svgRef.current) {
      try {
        // Try to use GSAP if available (will be installed later)
        // const gsap = require('gsap');
        // const { MotionPathPlugin } = require('gsap/MotionPathPlugin');
        // gsap.registerPlugin(MotionPathPlugin);
        // setupGSAPAnimation();
        
        // Fallback to CSS animations for now
        setupCSSAnimation();
      } catch (error) {
        // Fallback to CSS animations
        setupCSSAnimation();
      }
    }
  }, []);

  const setupCSSAnimation = () => {
    if (svgRef.current) {
      const particles = svgRef.current.querySelectorAll('.data-particle');
      
      particles.forEach((particle, index) => {
        const element = particle as SVGCircleElement;
        element.style.animationDelay = `${index * 1.2}s`;
      });
    }
  };

  // Future GSAP implementation (ready for when GSAP is installed)
  const setupGSAPAnimation = () => {
    // This will be implemented once GSAP is successfully installed
    console.log('GSAP animation ready - will be implemented once GSAP is available');
  };

  return (
    <svg
      ref={svgRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: -1 }}
      viewBox="0 0 1400 900"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* SVG Filters for Enhanced Glow Effects */}
      <defs>
        <filter id="purpleGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
        
        <filter id="greenGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        <filter id="blueGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        {/* Elegant Curved Animation Paths */}
        <path
          id="dataPath1"
          d="M-100,250 Q200,120 500,300 Q800,480 1100,200 Q1300,50 1500,350"
          fill="none"
          stroke="none"
        />
        
        <path
          id="dataPath2"
          d="M-100,550 Q300,350 600,500 Q900,650 1200,400 Q1400,250 1500,600"
          fill="none"
          stroke="none"
        />
        
        <path
          id="dataPath3"
          d="M-100,400 Q400,180 700,450 Q1000,720 1300,300 Q1400,150 1500,450"
          fill="none"
          stroke="none"
        />
        
        <path
          id="dataPath4"
          d="M-100,700 Q350,500 650,300 Q950,100 1250,550 Q1350,700 1500,250"
          fill="none"
          stroke="none"
        />

        <path
          id="dataPath5"
          d="M-100,150 Q250,350 550,200 Q850,50 1150,400 Q1350,600 1500,100"
          fill="none"
          stroke="none"
        />

        {/* Gradient definitions for flowing lines */}
        <linearGradient id="flowGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6952EB" stopOpacity="0">
            <animate attributeName="stop-opacity" values="0;0.6;0" dur="10s" repeatCount="indefinite"/>
          </stop>
          <stop offset="30%" stopColor="#B3FF3B" stopOpacity="0.3">
            <animate attributeName="stop-opacity" values="0.3;0.8;0.3" dur="10s" repeatCount="indefinite"/>
          </stop>
          <stop offset="70%" stopColor="#6952EB" stopOpacity="0.3">
            <animate attributeName="stop-opacity" values="0.3;0.8;0.3" dur="10s" repeatCount="indefinite"/>
          </stop>
          <stop offset="100%" stopColor="#B3FF3B" stopOpacity="0">
            <animate attributeName="stop-opacity" values="0;0.6;0" dur="10s" repeatCount="indefinite"/>
          </stop>
        </linearGradient>

        <linearGradient id="flowGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#B3FF3B" stopOpacity="0">
            <animate attributeName="stop-opacity" values="0;0.5;0" dur="12s" repeatCount="indefinite" begin="2s"/>
          </stop>
          <stop offset="50%" stopColor="#6952EB" stopOpacity="0.2">
            <animate attributeName="stop-opacity" values="0.2;0.7;0.2" dur="12s" repeatCount="indefinite" begin="2s"/>
          </stop>
          <stop offset="100%" stopColor="#B3FF3B" stopOpacity="0">
            <animate attributeName="stop-opacity" values="0;0.5;0" dur="12s" repeatCount="indefinite" begin="2s"/>
          </stop>
        </linearGradient>
      </defs>

      {/* Main Data Particles with Staggered Animations */}
      <circle
        className="data-particle"
        r="5"
        fill="#6952EB"
        filter="url(#purpleGlow)"
        opacity="0"
      >
        <animateMotion
          dur="14s"
          repeatCount="indefinite"
          begin="0s"
        >
          <mpath href="#dataPath1"/>
        </animateMotion>
        <animate
          attributeName="opacity"
          values="0;0.9;0.9;0"
          dur="14s"
          repeatCount="indefinite"
          begin="0s"
        />
        <animate
          attributeName="r"
          values="5;7;5"
          dur="14s"
          repeatCount="indefinite"
          begin="0s"
        />
      </circle>

      <circle
        className="data-particle"
        r="4"
        fill="#B3FF3B"
        filter="url(#greenGlow)"
        opacity="0"
      >
        <animateMotion
          dur="16s"
          repeatCount="indefinite"
          begin="1.2s"
        >
          <mpath href="#dataPath2"/>
        </animateMotion>
        <animate
          attributeName="opacity"
          values="0;0.8;0.8;0"
          dur="16s"
          repeatCount="indefinite"
          begin="1.2s"
        />
        <animate
          attributeName="r"
          values="4;6;4"
          dur="16s"
          repeatCount="indefinite"
          begin="1.2s"
        />
      </circle>

      <circle
        className="data-particle"
        r="6"
        fill="#6952EB"
        filter="url(#purpleGlow)"
        opacity="0"
      >
        <animateMotion
          dur="18s"
          repeatCount="indefinite"
          begin="2.4s"
        >
          <mpath href="#dataPath3"/>
        </animateMotion>
        <animate
          attributeName="opacity"
          values="0;0.7;0.7;0"
          dur="18s"
          repeatCount="indefinite"
          begin="2.4s"
        />
        <animate
          attributeName="r"
          values="6;8;6"
          dur="18s"
          repeatCount="indefinite"
          begin="2.4s"
        />
      </circle>

      <circle
        className="data-particle"
        r="3.5"
        fill="#4A90E2"
        filter="url(#blueGlow)"
        opacity="0"
      >
        <animateMotion
          dur="15s"
          repeatCount="indefinite"
          begin="3.6s"
        >
          <mpath href="#dataPath4"/>
        </animateMotion>
        <animate
          attributeName="opacity"
          values="0;0.85;0.85;0"
          dur="15s"
          repeatCount="indefinite"
          begin="3.6s"
        />
        <animate
          attributeName="r"
          values="3.5;5.5;3.5"
          dur="15s"
          repeatCount="indefinite"
          begin="3.6s"
        />
      </circle>

      {/* Secondary Layer - Smaller Particles for Depth */}
      <circle
        className="data-particle"
        r="2.5"
        fill="#B3FF3B"
        filter="url(#greenGlow)"
        opacity="0"
      >
        <animateMotion
          dur="20s"
          repeatCount="indefinite"
          begin="4.8s"
        >
          <mpath href="#dataPath5"/>
        </animateMotion>
        <animate
          attributeName="opacity"
          values="0;0.6;0.6;0"
          dur="20s"
          repeatCount="indefinite"
          begin="4.8s"
        />
      </circle>

      <circle
        className="data-particle"
        r="3"
        fill="#6952EB"
        filter="url(#purpleGlow)"
        opacity="0"
      >
        <animateMotion
          dur="17s"
          repeatCount="indefinite"
          begin="6s"
        >
          <mpath href="#dataPath1"/>
        </animateMotion>
        <animate
          attributeName="opacity"
          values="0;0.65;0.65;0"
          dur="17s"
          repeatCount="indefinite"
          begin="6s"
        />
      </circle>

      {/* Flowing Connection Lines */}
      <path
        d="M150,450 Q450,250 750,500 Q1050,750 1250,350"
        fill="none"
        stroke="url(#flowGradient1)"
        strokeWidth="1.5"
        opacity="0.4"
      />

      <path
        d="M200,600 Q500,300 800,550 Q1100,800 1300,200"
        fill="none"
        stroke="url(#flowGradient2)"
        strokeWidth="1"
        opacity="0.3"
      />

      {/* Subtle Network Nodes */}
      <circle cx="300" cy="300" r="1.5" fill="#6952EB" opacity="0.4">
        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="6s" repeatCount="indefinite"/>
      </circle>
      <circle cx="700" cy="500" r="1.5" fill="#B3FF3B" opacity="0.4">
        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="8s" repeatCount="indefinite" begin="2s"/>
      </circle>
      <circle cx="1100" cy="350" r="1.5" fill="#6952EB" opacity="0.4">
        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="7s" repeatCount="indefinite" begin="4s"/>
      </circle>
    </svg>
  );
}
