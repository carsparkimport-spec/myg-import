"use client";

import type { CSSProperties } from 'react';
import { BRANDS, type Brand } from '@/data/brands';
import styles from './BrandGrid.module.css';

/** Logo monochrome : la forme du SVG sert de masque, la couleur vient du texte (currentColor). */
export function BrandLogo({ brand, className = '' }: { brand: Brand; className?: string }) {
  const style: CSSProperties = {
    WebkitMaskImage: `url(${brand.mono})`,
    maskImage: `url(${brand.mono})`,
  };
  return <div role="img" aria-label={brand.name} className={`${styles.logoMark} ${className}`} style={style} />;
}

/** Grand médaillon du bandeau d'une page de marque. */
export function BrandEmblem({ brand }: { brand: Brand }) {
  return (
    <div className={styles.emblem}>
      <BrandLogo brand={brand} />
    </div>
  );
}

interface Props {
  /** Nombre de véhicules disponibles par nom de marque */
  counts: Record<string, number>;
  loading: boolean;
  /** Chemin de la page stock, ex. /eu/stock */
  basePath: string;
}

export default function BrandGrid({ counts, loading, basePath }: Props) {
  const inStock = BRANDS.filter(b => (counts[b.name] || 0) > 0).sort(
    (a, b) => counts[b.name] - counts[a.name] || a.name.localeCompare(b.name)
  );
  const onRequest = BRANDS.filter(b => !(counts[b.name] > 0));

  if (loading) {
    return (
      <div className={`${styles.grid} ${styles.wrap}`} aria-hidden>
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className={styles.skeleton} />
        ))}
      </div>
    );
  }

  return (
    <div className={`${styles.wrap} ${styles.sections}`}>
      {inStock.length > 0 && (
        <div className={styles.grid}>
          {inStock.map((brand, i) => (
            <a
              key={brand.slug}
              href={`${basePath}/${brand.slug}`}
              className={styles.card}
              style={{ '--i': i } as CSSProperties}
            >
              <svg className={styles.arrow} width="15" height="15" viewBox="0 0 16 16" fill="none" aria-hidden>
                <path d="M4 12L12 4M6 4h6v6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <BrandLogo brand={brand} className={styles.logo} />
              <span className={styles.name}>{brand.name}</span>
              <span className={styles.count}>
                {counts[brand.name]} véhicule{counts[brand.name] > 1 ? 's' : ''}
              </span>
            </a>
          ))}
        </div>
      )}

      {onRequest.length > 0 && (
        <div>
          <p className={styles.requestTitle}>
            {inStock.length > 0 ? 'Autres marques · sur demande' : 'Toutes les marques · sur demande'}
          </p>
          <p className={styles.requestNote}>Nous recherchons et importons le véhicule de votre choix.</p>
          <div className={styles.strip}>
            {onRequest.map(brand => (
              <a key={brand.slug} href={`${basePath}/${brand.slug}`} className={styles.mini}>
                <BrandLogo brand={brand} />
                <span className={styles.miniName}>{brand.name}</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
