import React, { useEffect, useRef, useState } from "react";
import { Particle, MistCloud } from "../types";

interface CinematicCanvasProps {
  progress: number; // 0 to 1
  isPlaying: boolean;
  speed: number;
  cameraDolly: boolean;
}

export const CinematicCanvas: React.FC<CinematicCanvasProps> = ({
  progress,
  isPlaying,
  speed,
  cameraDolly,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const particlesRef = useRef<Particle[]>([]);
  const mistCloudsRef = useRef<MistCloud[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const timeRef = useRef<number>(0);
  const zoomRef = useRef<number>(1.0);

  // Keep track of dimensions
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Initialize particles
  const initParticles = (width: number, height: number) => {
    const particles: Particle[] = [];
    const count = 150;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 1.5 + 0.3,
        speedX: (Math.random() - 0.5) * 0.15,
        speedY: -(Math.random() * 0.25 + 0.05), // upward drift
        alpha: 0,
        maxAlpha: Math.random() * 0.6 + 0.1,
        oscillationSpeed: Math.random() * 0.02 + 0.005,
        oscillationDistance: Math.random() * 15 + 5,
        angle: Math.random() * Math.PI * 2,
      });
    }
    particlesRef.current = particles;
  };

  // Initialize mist clouds
  const initMist = (width: number, height: number) => {
    const clouds: MistCloud[] = [];
    const count = 12;
    const horizonY = height * 0.52;

    for (let i = 0; i < count; i++) {
      clouds.push({
        x: (Math.random() * 1.2 - 0.1) * width,
        y: horizonY + (Math.random() - 0.5) * 15,
        radius: Math.random() * 80 + 60,
        vx: (Math.random() - 0.5) * 0.08,
        alpha: Math.random() * 0.18 + 0.04,
        color:
          Math.random() > 0.5
            ? "rgba(212, 175, 55, 0.06)"
            : "rgba(112, 139, 200, 0.04)",
      });
    }
    mistCloudsRef.current = clouds;
  };

  // Handle ResizeObserver
  useEffect(() => {
    if (!containerRef.current) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect;
        setDimensions({ width, height });

        // Update canvas sizing
        if (canvasRef.current) {
          canvasRef.current.width = width;
          canvasRef.current.height = height;
        }

        // Initialize elements
        initParticles(width, height);
        initMist(width, height);
      }
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  // Primary rendering and animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const render = () => {
      const { width, height } = dimensions;
      if (width === 0 || height === 0) {
        animationFrameRef.current = requestAnimationFrame(render);
        return;
      }

      // 1. Advance Time
      if (isPlaying) {
        timeRef.current += 1.0 * speed;
        if (cameraDolly) {
          zoomRef.current += 0.00008 * speed;
          // Loop zoom subtly so it never stretches too much
          if (zoomRef.current > 1.1) {
            zoomRef.current = 1.0;
          }
        }
      }

      const time = timeRef.current;
      const zoom = zoomRef.current;
      const horizonY = height * 0.52;

      // Clear the canvas with solid background (Midnight Navy from Natural Tones theme)
      ctx.fillStyle = "#050A1A";
      ctx.fillRect(0, 0, width, height);

      // Save context for camera dolly scale
      ctx.save();
      if (cameraDolly) {
        // Translate to horizon center to perform zoom from the horizon
        ctx.translate(width / 2, horizonY);
        ctx.scale(zoom, zoom);
        ctx.translate(-width / 2, -horizonY);
      }

      // ==========================================
      // 2. DRAW SKY GRADIENT
      // ==========================================
      const skyGrad = ctx.createLinearGradient(0, 0, 0, horizonY);

      // Interpolate sky colors based on sunrise progress
      // Top of sky: stays deep dark navy (Natural Tones #02050D)
      skyGrad.addColorStop(0, "#02050D");

      // Mid sky (Natural Tones #050A1A base with progress interpolation)
      const midSkyNavyR = Math.round(5 + progress * 15); // 5 -> 20
      const midSkyNavyG = Math.round(10 + progress * 20); // 10 -> 30
      const midSkyNavyB = Math.round(26 + progress * 25); // 26 -> 51
      skyGrad.addColorStop(
        0.6,
        `rgb(${midSkyNavyR}, ${midSkyNavyG}, ${midSkyNavyB})`,
      );

      // Just above horizon (transition area with Natural Tones #1A1208 warmth)
      if (progress < 0.25) {
        // Pre-dawn: deep indigo to gold line with subtle wood/earth tones
        const p = progress / 0.25;
        const col1 = `rgba(26, 18, 8, ${1 - p})`; // #1A1208 representation
        const col2 = `rgba(212, 175, 55, ${p * 0.45})`; // soft golden copper
        skyGrad.addColorStop(0.9, col1);
        skyGrad.addColorStop(1.0, col2);
      } else {
        // Sunrise: glowing transition with vibrant gold-orange layers
        const factor = (progress - 0.25) / 0.75;
        // Blend from Natural Tones #1A1208 warm gold to brilliant liquid gold near the horizon
        const r = Math.round(186 + factor * 69); // 186 -> 255
        const g = Math.round(120 + factor * 110); // 120 -> 230
        const b = Math.round(48 + factor * 113); // 48 -> 161
        skyGrad.addColorStop(
          0.85,
          `rgba(${r - 90}, ${g - 50}, ${b - 20}, 0.5)`,
        );
        skyGrad.addColorStop(1.0, `rgb(${r}, ${g}, ${b})`);
      }

      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, horizonY);

      // ==========================================
      // 3. DRAW RISING SUN
      // ==========================================
      // Sun Y: goes from horizonY + 50 (below) to horizonY - 45 (approx 1/3 above horizon)
      const sunMaxHeight = 35; // height above horizon
      const sunMinHeight = -65; // depth below horizon
      const sunY =
        horizonY - (sunMinHeight + progress * (sunMaxHeight - sunMinHeight));
      const sunRadius = Math.min(width, height) * 0.055 + 10; // Responsive sun radius (around 50px)

      // Draw sun if its glow touches the sky
      if (progress > 0.0) {
        // Draw volumetric sun atmosphere glow (behind sun disk)
        const atmosGlow = ctx.createRadialGradient(
          width / 2,
          sunY,
          2,
          width / 2,
          sunY,
          sunRadius * (4 + progress * 6),
        );

        // Pure gold to transparent orange/navy
        atmosGlow.addColorStop(
          0,
          `rgba(255, 245, 215, ${0.45 + progress * 0.35})`,
        );
        atmosGlow.addColorStop(
          0.15,
          `rgba(255, 200, 110, ${0.3 + progress * 0.45})`,
        );
        atmosGlow.addColorStop(0.4, `rgba(212, 175, 55, ${0.12 * progress})`);
        atmosGlow.addColorStop(1.0, "rgba(4, 8, 20, 0)");

        ctx.fillStyle = atmosGlow;
        ctx.beginPath();
        ctx.arc(
          width / 2,
          sunY,
          sunRadius * (4 + progress * 6),
          0,
          Math.PI * 2,
        );
        ctx.fill();

        // Draw Volumetric Light Rays (God Rays) passing through the mist
        if (progress > 0.25) {
          const rayCount = 10;
          const rayProgress = (progress - 0.25) / 0.75; // 0 to 1
          const maxRayLength = Math.max(width, height) * 0.7;

          ctx.save();
          // Clip rays so they only render above the horizon line
          ctx.beginPath();
          ctx.rect(0, 0, width, horizonY);
          ctx.clip();

          for (let r = 0; r < rayCount; r++) {
            // Ray angle sweeps slowly
            const angleOffset = Math.sin(time * 0.003 + r * 15) * 0.04;
            const centerAngle =
              Math.PI + (r / (rayCount - 1)) * Math.PI + angleOffset;
            const rayWidth = 0.08 + Math.sin(time * 0.005 + r) * 0.02;

            const x1 =
              width / 2 + Math.cos(centerAngle - rayWidth) * maxRayLength;
            const y1 = sunY + Math.sin(centerAngle - rayWidth) * maxRayLength;
            const x2 =
              width / 2 + Math.cos(centerAngle + rayWidth) * maxRayLength;
            const y2 = sunY + Math.sin(centerAngle + rayWidth) * maxRayLength;

            const rayGrad = ctx.createRadialGradient(
              width / 2,
              sunY,
              sunRadius,
              width / 2,
              sunY,
              maxRayLength,
            );

            const rayAlpha =
              (0.07 * Math.sin(time * 0.002 + r * 2.5) + 0.12) * rayProgress;
            rayGrad.addColorStop(0, `rgba(255, 225, 150, ${rayAlpha})`);
            rayGrad.addColorStop(0.5, `rgba(212, 175, 55, ${rayAlpha * 0.3})`);
            rayGrad.addColorStop(1.0, "rgba(4, 8, 20, 0)");

            ctx.fillStyle = rayGrad;
            ctx.beginPath();
            ctx.moveTo(width / 2, sunY);
            ctx.lineTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.closePath();
            ctx.fill();
          }
          ctx.restore();
        }

        // Draw Sun Disk (only if above horizon, or clipped)
        if (sunY - sunRadius < horizonY) {
          ctx.save();
          // Clip to above horizon
          ctx.beginPath();
          ctx.rect(0, 0, width, horizonY);
          ctx.clip();

          const sunDiskGrad = ctx.createRadialGradient(
            width / 2,
            sunY,
            0,
            width / 2,
            sunY,
            sunRadius,
          );
          sunDiskGrad.addColorStop(0, "#ffffff");
          sunDiskGrad.addColorStop(0.4, "#fffaf0");
          sunDiskGrad.addColorStop(0.85, "#ffe8a3");
          sunDiskGrad.addColorStop(1.0, "#ffd38a");

          ctx.fillStyle = sunDiskGrad;
          ctx.beginPath();
          ctx.arc(width / 2, sunY, sunRadius, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      // ==========================================
      // 4. DRAW FLOATING MIST
      // ==========================================
      mistCloudsRef.current.forEach((cloud) => {
        // Move cloud
        if (isPlaying) {
          cloud.x += cloud.vx * speed;
          if (cloud.x - cloud.radius > width) cloud.x = -cloud.radius;
          if (cloud.x + cloud.radius < 0) cloud.x = width + cloud.radius;
        }

        const mistGrad = ctx.createRadialGradient(
          cloud.x,
          cloud.y,
          0,
          cloud.x,
          cloud.y,
          cloud.radius,
        );

        // Modulate alpha based on progress: mist is visible in first light, slightly glows in gold dawn
        const currentAlpha = cloud.alpha * (0.6 + progress * 0.4);
        mistGrad.addColorStop(
          0,
          cloud.color.replace(/[\d.]+\)$/, `${currentAlpha})`),
        );
        mistGrad.addColorStop(
          0.5,
          cloud.color.replace(/[\d.]+\)$/, `${currentAlpha * 0.45})`),
        );
        mistGrad.addColorStop(1.0, "rgba(4, 8, 20, 0)");

        ctx.fillStyle = mistGrad;
        ctx.beginPath();
        ctx.arc(cloud.x, cloud.y, cloud.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // ==========================================
      // 5. DRAW OCEAN (POLISHED OBSIDIAN GLASS)
      // ==========================================
      // Base water background (Natural Tones #0A1020 -> #020408)
      const oceanGrad = ctx.createLinearGradient(0, horizonY, 0, height);
      oceanGrad.addColorStop(0, "#0A1020");
      oceanGrad.addColorStop(1, "#020408");
      ctx.fillStyle = oceanGrad;
      ctx.fillRect(0, horizonY, width, height - horizonY);

      // Microscopic ripples & Molten Gold Reflection
      // To simulate hyper-realistic molten gold reflections on obsidian glass,
      // we draw horizontal reflection lines with high-frequency sine-wave modulation.
      const waterHeight = height - horizonY;
      const step = 2; // For smooth resolution and performance

      for (let y = horizonY; y < height; y += step) {
        const screenY = y;
        const t = (y - horizonY) / waterHeight; // 0 to 1 distance factor

        // Golden reflection from the rising sun
        if (progress > 0.05) {
          // Reflection width: starts thin at the horizon, broadens closer to the camera
          // But perspective keeps it structurally bound
          const baseWidth = width * 0.045 + t * width * 0.14;

          // Microscopic ripples wave calculations:
          // Wave frequency increases towards the horizon (perspective compression)
          const freq = 1.5 / (t + 0.05) + Math.sin(time * 0.01) * 0.1;
          const wavePhase1 = Math.sin(screenY * 0.5 + time * 0.05) * 1.5;
          const wavePhase2 = Math.cos(screenY * 0.12 - time * 0.035) * 2.0;

          // Generate micro ripple value
          const rippleValue =
            Math.sin(screenY * freq * 0.08 + time * 0.08 + wavePhase1) *
            Math.cos(screenY * freq * 0.03 - time * 0.04 + wavePhase2);

          // Amplitude of ripple diminishes towards horizon, also less active at bottom
          const rippleAmp = 0.5 + 0.5 * Math.sin(Math.PI * t); // peaking in middle-ground

          // Width of reflection flare at this y
          const flareWidth = baseWidth * (1 + rippleValue * 0.25 * rippleAmp);

          // Reflection alpha: stronger when sun is higher
          const reflectionBaseAlpha = 0.85 * Math.pow(progress, 1.2);

          // Calculate horizontal reflection gradient centered on screen width
          const center = width / 2;
          const startX = Math.max(0, center - flareWidth);
          const endX = Math.min(width, center + flareWidth);

          if (endX - startX > 0.5) {
            const reflectGrad = ctx.createLinearGradient(startX, 0, endX, 0);

            // Core of the sun reflection: molten gold
            const alphaFactor =
              reflectionBaseAlpha *
              (0.35 + (1.0 - t * 0.6) * 0.6) *
              (1.0 + rippleValue * 0.3 * rippleAmp);
            const coreAlpha = alphaFactor;
            const midAlpha = alphaFactor * 0.4;
            const edgeAlpha = 0;

            // Compute dynamic gold-orange colors based on progress
            const r = Math.round(212 + progress * 43); // 212 -> 255
            const g = Math.round(175 + progress * 60); // 175 -> 235
            const b = Math.round(55 + progress * 106); // 55 -> 161

            reflectGrad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${edgeAlpha})`);
            reflectGrad.addColorStop(
              0.35,
              `rgba(${r}, ${g - 25}, ${b - 20}, ${midAlpha * 0.5})`,
            );
            reflectGrad.addColorStop(
              0.5,
              `rgba(${r + 20}, ${g + 10}, ${b + 40}, ${coreAlpha})`,
            ); // Bright white-gold core
            reflectGrad.addColorStop(
              0.65,
              `rgba(${r}, ${g - 25}, ${b - 20}, ${midAlpha * 0.5})`,
            );
            reflectGrad.addColorStop(1, `rgba(${r}, ${g}, ${b}, ${edgeAlpha})`);

            ctx.fillStyle = reflectGrad;
            // Draw a thin horizontal slice
            ctx.fillRect(startX, screenY, flareWidth * 2, step);
          }
        }

        // Draw general obsidian glass dark reflections/specular highlights
        const ambientRipple =
          Math.sin(screenY * 0.2 - time * 0.04) *
          Math.cos(screenY * 0.05 + time * 0.02);
        if (ambientRipple > 0.75) {
          const ambientAlpha = 0.03 * (1.0 - t) * (ambientRipple - 0.75);
          ctx.fillStyle = `rgba(161, 178, 220, ${ambientAlpha})`;
          ctx.fillRect(0, screenY, width, step);
        }
      }

      // ==========================================
      // 6. DRAW MICROSCOPIC GOLDEN PARTICLES (KNOWLEDGE FLYING)
      // ==========================================
      particlesRef.current.forEach((p) => {
        // Move particle
        if (isPlaying) {
          p.y += p.speedY * speed;
          p.angle += p.oscillationSpeed * speed;
          p.x += (p.speedX + Math.sin(p.angle) * 0.15) * speed;

          // Fade-in particle gradually
          if (p.alpha < p.maxAlpha) {
            p.alpha += 0.005 * speed;
          }

          // Camera Dolly-in 3D effect:
          // Particles move slightly faster and expand as they get closer to the camera
          if (cameraDolly) {
            p.size = Math.max(0.2, p.size) * (1.0 + 0.00025 * speed);
          }

          // Boundary checks & respawning
          if (p.y < 0 || p.x < -10 || p.x > width + 10) {
            // Respawn at the bottom/horizon
            p.y = horizonY + Math.random() * (height - horizonY);
            p.x = Math.random() * width;
            p.alpha = 0;
            p.size = Math.random() * 1.5 + 0.3;
            p.speedY = -(Math.random() * 0.2 + 0.05);
          }
        }

        // Dynamic gold-yellow gradient for particles based on progress
        const alpha = p.alpha * (0.3 + progress * 0.7); // brighter at dawn
        const r = Math.round(212 + progress * 43);
        const g = Math.round(175 + progress * 50);
        const b = Math.round(55 + progress * 45);

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        // Optional micro-glow for larger particles
        if (p.size > 1.2 && progress > 0.4) {
          ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha * 0.2})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      ctx.restore(); // Restore camera dolly save

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [dimensions, progress, isPlaying, speed, cameraDolly]);

  return (
    <div
      ref={containerRef}
      id="cinematic-canvas-container"
      className="absolute inset-0 w-full h-full overflow-hidden bg-navy-950"
    >
      <canvas
        ref={canvasRef}
        id="cinematic-rendering-stage"
        className="block w-full h-full select-none pointer-events-none"
      />
    </div>
  );
};
