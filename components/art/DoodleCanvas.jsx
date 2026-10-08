"use client";

import { useEffect, useRef } from "react";

// Lets visitors draw on the poster with a marker. Drawings stay on their screen only.
export default function DoodleCanvas({ onDraw, clearSignal, color = "#1B1A1F" }) {
  const canvasRef = useRef(null);
  const drawing = useRef(false);
  const last = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const fit = () => {
      const { width, height } = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const saved = canvas.width ? ctx.getImageData(0, 0, canvas.width, canvas.height) : null;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (saved) ctx.putImageData(saved, 0, 0);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (!clearSignal) return;
    const canvas = canvasRef.current;
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
  }, [clearSignal]);

  const point = (e) => {
    const r = canvasRef.current.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };

  const down = (e) => {
    drawing.current = true;
    last.current = point(e);
    canvasRef.current.setPointerCapture(e.pointerId);
  };

  const move = (e) => {
    if (!drawing.current) return;
    const ctx = canvasRef.current.getContext("2d");
    const p = point(e);
    ctx.strokeStyle = color;
    ctx.lineWidth = 4.5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(last.current.x, last.current.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    last.current = p;
    onDraw?.();
  };

  const up = () => {
    drawing.current = false;
  };

  return (
    <canvas
      ref={canvasRef}
      onPointerDown={down}
      onPointerMove={move}
      onPointerUp={up}
      onPointerCancel={up}
      aria-label="Doodle area: draw on the poster with your mouse or finger"
      className="absolute inset-0 h-full w-full cursor-crosshair touch-none"
    />
  );
}
