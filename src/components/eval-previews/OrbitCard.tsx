import type { CSSProperties, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
  /** Show a dark overlay controlled by --depth-darken CSS var */
  darkenOverlay?: boolean;
};

export function OrbitCard({ children, className = "", style, onClick, darkenOverlay }: Props) {
  return (
    <button
      type="button"
      className={`orbit-card-wrap ${className}`}
      style={style}
      onClick={onClick}
    >
      {children}
      {darkenOverlay && <div className="orbit-card-darken" aria-hidden="true" />}
    </button>
  );
}
