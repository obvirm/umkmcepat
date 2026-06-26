"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
} from "motion/react";

const baseGradient =
  "radial-gradient(circle at 50% 0%, rgba(21,21,21,1) 0%, rgba(21,21,21,0.95) 16%, rgba(33,55,90,0.9) 32%, rgba(71,119,239,0.92) 50%, rgba(236,126,229,0.94) 66%, rgba(255,31,128,0.98) 82%, rgba(255,94,39,1) 100%)";

const shiftedGradient =
  "radial-gradient(circle at 46% 4%, rgba(21,21,21,1) 0%, rgba(21,21,21,0.92) 14%, rgba(40,64,108,0.92) 31%, rgba(92,142,255,0.9) 49%, rgba(224,114,236,0.88) 65%, rgba(255,45,144,0.92) 82%, rgba(255,110,48,0.94) 100%)";

const warmDrift =
  "radial-gradient(ellipse at 24% 76%, rgba(255,31,128,0.34), transparent 34%)";

const coolDrift =
  "radial-gradient(ellipse at 78% 32%, rgba(84,137,255,0.32), transparent 36%)";

export function HeroAuroraBackground() {
  const reduceMotion = useReducedMotion();
  const shiftedX = useMotionValue("0%");
  const shiftedY = useMotionValue("0%");
  const shiftedScale = useMotionValue(1.03);
  const shiftedOpacity = useMotionValue(0.2);
  const driftX = useMotionValue("-2%");
  const driftY = useMotionValue("2%");
  const driftScale = useMotionValue(1);
  const driftOpacity = useMotionValue(0.22);
  const vignetteOpacity = useMotionValue(1);
  const bottomOpacity = useMotionValue(0.94);

  useAnimationFrame((time) => {
    if (reduceMotion) {
      return;
    }

    const slow = time / 1000 / 18;
    const medium = time / 1000 / 23;
    const a = slow * Math.PI * 2;
    const b = medium * Math.PI * 2;

    shiftedX.set(`${Math.cos(a) * 2.6}%`);
    shiftedY.set(`${Math.sin(a) * 1.8}%`);
    shiftedScale.set(1.055 + Math.sin(a + 0.7) * 0.025);
    shiftedOpacity.set(0.26 + (Math.sin(a - 0.4) + 1) * 0.11);

    driftX.set(`${Math.cos(b + 1.4) * 4.2}%`);
    driftY.set(`${Math.sin(b) * 3.2}%`);
    driftScale.set(1.06 + Math.sin(b + 0.3) * 0.06);
    driftOpacity.set(0.24 + (Math.sin(b + 1.1) + 1) * 0.12);

    vignetteOpacity.set(0.94 + (Math.sin(a + 1.8) + 1) * 0.03);
    bottomOpacity.set(0.92 + (Math.sin(b - 0.6) + 1) * 0.04);
  });

  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0" style={{ background: baseGradient }} />

      <motion.div
        className="absolute inset-[-6%]"
        style={{
          background: shiftedGradient,
          opacity: reduceMotion ? 0.2 : shiftedOpacity,
          scale: reduceMotion ? 1.03 : shiftedScale,
          x: reduceMotion ? "0%" : shiftedX,
          y: reduceMotion ? "0%" : shiftedY,
        }}
      />

      <motion.div
        className="absolute inset-[-12%] mix-blend-screen"
        style={{
          background: `${warmDrift}, ${coolDrift}`,
          opacity: reduceMotion ? 0.2 : driftOpacity,
          scale: reduceMotion ? 1.04 : driftScale,
          x: reduceMotion ? "0%" : driftX,
          y: reduceMotion ? "0%" : driftY,
        }}
      />

      <motion.div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 18%, rgba(10,10,10,0.82) 0%, rgba(10,10,10,0.45) 18%, transparent 42%)",
          opacity: reduceMotion ? 1 : vignetteOpacity,
        }}
      />

      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-[#151515] to-transparent" />
      <motion.div
        className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#ff5e27] via-[#ff1f80]/70 to-transparent"
        style={{ opacity: reduceMotion ? 1 : bottomOpacity }}
      />
    </div>
  );
}
