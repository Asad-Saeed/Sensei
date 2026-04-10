"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import SenseiText from "@/components/ui/SenseiText";

export default function AIModelsDiagram() {
  const t = useTranslations("CustomAIModelsSection");
  const containerRef = useRef<HTMLDivElement>(null);
  const [badgePositions, setBadgePositions] = useState<{
    inputs: Array<{ x: number; y: number; width: number }>;
    outputs: Array<{ x: number; y: number; width: number }>;
  }>({ inputs: [], outputs: [] });

  // Input and output positions (normalized 0-1 coordinates for initial layout)
  // Compact vertical spacing to closely match Figma while keeping readability
  const inputs = [
    { id: 0, y: 0.1 },
    { id: 1, y: 0.21 },
    { id: 2, y: 0.32 },
    { id: 3, y: 0.43 },
    { id: 4, y: 0.54 },
    { id: 5, y: 0.65 },
    { id: 6, y: 0.76 },
  ];

  const outputs = [
    { id: 0, y: 0.15 },
    { id: 1, y: 0.3 },
    { id: 2, y: 0.45 },
    { id: 3, y: 0.6 },
    { id: 4, y: 0.75 },
  ];

  const inputRefs = useRef<(HTMLDivElement | null)[]>([]);
  const outputRefs = useRef<(HTMLDivElement | null)[]>([]);
  const svgRef = useRef<SVGSVGElement>(null);

  // Measure badge positions after render
  useEffect(() => {
    const measurePositions = () => {
      if (!containerRef.current || !svgRef.current) return;

      const svg = svgRef.current;
      const svgViewBox = { width: 1000, height: 600 };

      // Use SVG's coordinate transformation to convert screen to SVG coordinates
      const svgPoint = svg.createSVGPoint();

      const inputPositions = inputRefs.current.map((ref) => {
        if (!ref) return { x: 0, y: 0, width: 0 };
        const rect = ref.getBoundingClientRect();
        // Right edge of badge (where line should connect)
        svgPoint.x = rect.right;
        svgPoint.y = rect.top + rect.height / 2;
        const svgCoord = svgPoint.matrixTransform(
          svg.getScreenCTM()?.inverse(),
        );
        return {
          x: svgCoord.x / svgViewBox.width, // Normalized 0-1
          y: svgCoord.y / svgViewBox.height, // Normalized 0-1
          width: rect.width / svgViewBox.width, // Approximate width
        };
      });

      const outputPositions = outputRefs.current.map((ref) => {
        if (!ref) return { x: 0, y: 0, width: 0 };
        const rect = ref.getBoundingClientRect();
        // Left edge of badge (where line should connect)
        svgPoint.x = rect.left;
        svgPoint.y = rect.top + rect.height / 2;
        const svgCoord = svgPoint.matrixTransform(
          svg.getScreenCTM()?.inverse(),
        );
        return {
          x: svgCoord.x / svgViewBox.width, // Normalized 0-1
          y: svgCoord.y / svgViewBox.height, // Normalized 0-1
          width: rect.width / svgViewBox.width, // Approximate width
        };
      });

      setBadgePositions({
        inputs: inputPositions,
        outputs: outputPositions,
      });
    };

    // Measure after animations complete (all badges have delay up to 0.6s)
    const timeoutId = setTimeout(measurePositions, 800);

    // Re-measure on resize with debounce
    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(measurePositions, 150);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timeoutId);
      clearTimeout(resizeTimeout);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const centerX = 0.5;
  const centerY = 0.5;
  const centerRadius = 50; // Approximate radius of center icon in viewBox units

  // Generate smooth SVG path for curved connection from badge to center
  // Optimized for compact badge spacing
  const getInputPath = (badgePos: { x: number; y: number; width: number }) => {
    const startX = badgePos.x * 1000; // Right edge of badge
    const startY = badgePos.y * 600;
    const endX = centerX * 1000;
    const endY = centerY * 600;

    // Calculate distance and angle from badge to center
    const dx = endX - startX;
    const dy = endY - startY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);

    // Calculate where line touches center circle
    const centerTouchX = endX - centerRadius * Math.cos(angle);
    const centerTouchY = endY - centerRadius * Math.sin(angle);

    // Control points optimized for tighter spacing - smoother, more compact curves
    // First control: extends horizontally from badge, then curves inward
    // Reduced distance for tighter spacing
    const controlDist1 = Math.min(distance * 0.35, 120);
    const controlX1 = startX + controlDist1;
    const controlY1 = startY;

    // Second control: smooth transition toward center
    // Adjusted for better curve with compact layout
    const controlDist2 = Math.min(distance * 0.25, 80);
    const controlX2 = centerTouchX - controlDist2 * Math.cos(angle);
    const controlY2 = centerTouchY - controlDist2 * Math.sin(angle);

    return `M ${startX} ${startY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${centerTouchX} ${centerTouchY}`;
  };

  // Generate smooth SVG path for curved connection from badge to center
  // Optimized for compact badge spacing - reversed direction for green dots
  const getOutputPath = (badgePos: { x: number; y: number; width: number }) => {
    const startX = badgePos.x * 1000; // Left edge of badge
    const startY = badgePos.y * 600;
    const endX = centerX * 1000;
    const endY = centerY * 600;

    // Calculate distance and angle from badge to center
    const dx = endX - startX;
    const dy = endY - startY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const angle = Math.atan2(dy, dx);

    // Calculate where line touches center circle
    const centerTouchX = endX - centerRadius * Math.cos(angle);
    const centerTouchY = endY - centerRadius * Math.sin(angle);

    // Control points optimized for tighter spacing - smoother, more compact curves
    // First control: extends horizontally from badge, then curves inward
    // Reduced distance for tighter spacing
    const controlDist1 = Math.min(distance * 0.35, 120);
    const controlX1 = startX - controlDist1;
    const controlY1 = startY;

    // Second control: smooth transition toward center
    // Adjusted for better curve with compact layout
    const controlDist2 = Math.min(distance * 0.25, 80);
    const controlX2 = centerTouchX - controlDist2 * Math.cos(angle);
    const controlY2 = centerTouchY - controlDist2 * Math.sin(angle);

    return `M ${startX} ${startY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${centerTouchX} ${centerTouchY}`;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[600px] lg:min-h-[700px] flex items-center justify-center p-6 sm:p-8 md:p-10"
    >
      {/* Background layer SVG */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <Image
          src="/assets/svgs/bg-layer-ai.svg"
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Background blurred white circular gradients */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.06) 18%, rgba(255,255,255,0.02) 40%, transparent 70%), radial-gradient(circle at 100% 100%, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 18%, rgba(255,255,255,0.015) 40%, transparent 70%)",
          filter: "blur(4px)",
        }}
      />

      {/* SVG Container */}
      <svg
        ref={svgRef}
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1000 600"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Input to Center connections */}
        {inputs.map((input, index) => {
          const badgePos = badgePositions.inputs[index] || {
            x: 0.15,
            y: input.y,
            width: 0.1,
          };
          const path = getInputPath(badgePos);
          return (
            <g key={`input-${input.id}`} id={`input-connector-${input.id}`}>
              <path
                id={`input-line-${input.id}`}
                d={path}
                fill="none"
                stroke="rgba(255, 255, 255, 0.25)"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="drop-shadow-sm"
              />
              {/* White connection node at badge - positioned at path start */}
              <circle
                id={`input-node-${input.id}`}
                cx={badgePos.x * 1000}
                cy={badgePos.y * 600}
                r="4"
                fill="white"
                className="drop-shadow-[0_0_4px_rgba(255,255,255,0.8)]"
              />
              {/* Animated white dots */}
              {[0, 1, 2].map((dotIndex) => (
                <circle
                  key={`dot-${dotIndex}`}
                  r="3.5"
                  fill="white"
                  opacity="0.9"
                >
                  <animateMotion
                    dur="2.5s"
                    repeatCount="indefinite"
                    begin={`${input.id * 0.2 + dotIndex * 0.8}s`}
                    keyPoints="0;1"
                    keyTimes="0;1"
                    calcMode="linear"
                  >
                    <mpath href={`#input-path-${input.id}`} />
                  </animateMotion>
                  <animate
                    attributeName="opacity"
                    values="0;0.9;0.9;0"
                    dur="2.5s"
                    repeatCount="indefinite"
                    begin={`${input.id * 0.2 + dotIndex * 0.8}s`}
                    keyTimes="0;0.1;0.9;1"
                  />
                </circle>
              ))}
              <path
                id={`input-path-${input.id}`}
                d={path}
                fill="none"
                stroke="none"
              />
            </g>
          );
        })}

        {/* Center to Output connections */}
        {outputs.map((output, index) => {
          const badgePos = badgePositions.outputs[index] || {
            x: 0.85,
            y: output.y,
            width: 0.1,
          };
          const path = getOutputPath(badgePos);
          return (
            <g key={`output-${output.id}`} id={`output-connector-${output.id}`}>
              <path
                id={`output-line-${output.id}`}
                d={path}
                fill="none"
                stroke="rgba(255, 255, 255, 0.25)"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="drop-shadow-sm"
              />
              {/* Green connection node at badge - positioned at path start */}
              <circle
                id={`output-node-${output.id}`}
                cx={badgePos.x * 1000}
                cy={badgePos.y * 600}
                r="4"
                fill="#22C55E"
                className="drop-shadow-[0_0_4px_rgba(34,197,94,0.8)]"
              />
              {/* Animated green dots */}
              {[0, 1, 2].map((dotIndex) => (
                <circle
                  key={`dot-${dotIndex}`}
                  r="3.5"
                  fill="#22C55E"
                  opacity="0.9"
                >
                  <animateMotion
                    dur="2.5s"
                    repeatCount="indefinite"
                    begin={`${inputs.length * 0.2 + output.id * 0.2 + dotIndex * 0.8}s`}
                    keyPoints="0;1"
                    keyTimes="0;1"
                    calcMode="linear"
                  >
                    <mpath href={`#output-path-${output.id}`} />
                  </animateMotion>
                  <animate
                    attributeName="opacity"
                    values="0;0.9;0.9;0"
                    dur="2.5s"
                    repeatCount="indefinite"
                    begin={`${inputs.length * 0.2 + output.id * 0.2 + dotIndex * 0.8}s`}
                    keyTimes="0;0.1;0.9;1"
                  />
                </circle>
              ))}
              <path
                id={`output-path-${output.id}`}
                d={path}
                fill="none"
                stroke="none"
              />
            </g>
          );
        })}
      </svg>

      {/* Input boxes */}
      {inputs.map((input, index) => (
        <motion.div
          key={input.id}
          id={`input-badge-${input.id}`}
          ref={(el) => {
            inputRefs.current[index] = el;
          }}
          className="absolute w-fit bg-white/10 backdrop-blur-md rounded-lg px-3 py-2.5 sm:px-4 sm:py-3 shadow-lg z-20"
          style={{
            left: "3%",
            top: `${input.y * 100}%`,
            transform: "translateY(-50%)",
          }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          <p className="text-[10px] sm:text-[11px] text-white font-inter font-light leading-tight whitespace-nowrap">
            <SenseiText>{t(`inputs.${input.id}`)}</SenseiText>
          </p>
        </motion.div>
      ))}

      {/* Center S Logo */}
      <motion.div
        className="relative z-10 flex items-center justify-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="relative w-[100px] h-[100px] sm:w-[110px] sm:h-[110px] md:w-[122px] md:h-[122px]">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-[#432CEF] rounded-xl blur-2xl opacity-20" />
          {/* S Icon */}
          <Image
            src="/assets/svgs/s.svg"
            alt="Sensei"
            fill
            className="object-contain"
            priority
          />
        </div>
      </motion.div>

      {/* Output boxes */}
      {outputs.map((output, index) => (
        <motion.div
          key={output.id}
          id={`output-badge-${output.id}`}
          ref={(el) => {
            outputRefs.current[index] = el;
          }}
          className="absolute w-fit bg-white/10 backdrop-blur-md rounded-lg px-3 py-2.5 sm:px-4 sm:py-3 shadow-lg z-20"
          style={{
            right: "3%",
            top: `${output.y * 100}%`,
            transform: "translateY(-50%)",
          }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
        >
          <p className="text-[10px] sm:text-[11px] text-white font-inter font-light leading-tight whitespace-nowrap">
            <SenseiText>{t(`outputs.${output.id}`)}</SenseiText>
          </p>
        </motion.div>
      ))}
    </div>
  );
}
