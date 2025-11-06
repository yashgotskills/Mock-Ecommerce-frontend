import { useRef, useEffect } from "react";

interface Product3DViewerProps {
  imageUrl: string;
  productName: string;
}

export const Product3DViewer = ({ imageUrl, productName }: Product3DViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const previousPosition = useRef({ x: 0, y: 0 });
  const rotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseDown = (e: MouseEvent) => {
      isDragging.current = true;
      previousPosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging.current) return;

      const deltaX = e.clientX - previousPosition.current.x;
      const deltaY = e.clientY - previousPosition.current.y;

      rotation.current.y += deltaX * 0.5;
      rotation.current.x += deltaY * 0.5;

      // Limit vertical rotation
      rotation.current.x = Math.max(-45, Math.min(45, rotation.current.x));

      updateTransform();

      previousPosition.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging.current = false;
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging.current = true;
        previousPosition.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging.current || e.touches.length !== 1) return;

      const deltaX = e.touches[0].clientX - previousPosition.current.x;
      const deltaY = e.touches[0].clientY - previousPosition.current.y;

      rotation.current.y += deltaX * 0.5;
      rotation.current.x += deltaY * 0.5;

      rotation.current.x = Math.max(-45, Math.min(45, rotation.current.x));

      updateTransform();

      previousPosition.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY,
      };
    };

    const handleTouchEnd = () => {
      isDragging.current = false;
    };

    const updateTransform = () => {
      const img = container.querySelector("img");
      if (img) {
        img.style.transform = `perspective(1000px) rotateX(${rotation.current.x}deg) rotateY(${rotation.current.y}deg) scale(1.1)`;
      }
    };

    container.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    
    container.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    // Auto-rotate on mount
    let autoRotateInterval: NodeJS.Timeout;
    const startAutoRotate = () => {
      autoRotateInterval = setInterval(() => {
        if (!isDragging.current) {
          rotation.current.y += 0.5;
          updateTransform();
        }
      }, 30);
    };

    startAutoRotate();

    return () => {
      container.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      clearInterval(autoRotateInterval);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing select-none relative overflow-hidden rounded-2xl bg-gradient-to-br from-secondary/30 to-secondary/10"
      style={{ touchAction: "none" }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/5" />
      <img
        src={imageUrl}
        alt={productName}
        className="max-w-[80%] max-h-[80%] object-contain transition-transform duration-100 ease-out"
        style={{
          transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1.1)",
          filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.15))",
        }}
        draggable={false}
      />
      <div className="absolute bottom-4 right-4 px-3 py-1.5 bg-black/60 backdrop-blur-sm text-white text-xs rounded-full">
        Drag to rotate
      </div>
    </div>
  );
};
