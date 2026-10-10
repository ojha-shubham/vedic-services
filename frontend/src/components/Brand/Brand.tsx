import { Link } from "react-router-dom";
import "./Brand.css";

interface BrandProps {
  inverse?: boolean;
}

export function Brand({ inverse = false }: BrandProps) {
  return (
    <Link
      className={`brand${inverse ? " brand--inverse" : ""}`}
      to="/"
      aria-label="Pandit Lavakush Ojha — home"
    >
      <span className="brand__seal" aria-hidden="true">
        ॐ
      </span>
      <span className="brand__name">
        <strong>Pandit Lavakush Ojha</strong>
        <span>VEDIC CEREMONIES</span>
      </span>
    </Link>
  );
}
