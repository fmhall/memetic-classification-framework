import React from 'react';

/**
 * Shared "paperclip-punk" manual primitives: figure frames, figure labels,
 * spec tables, and hairline rules. Pure presentational, server-renderable.
 */

export function FigLabel({
  id,
  title,
  className = '',
}: {
  id: string;
  title?: string;
  className?: string;
}) {
  return (
    <div
      className={`font-mono-label flex items-baseline gap-2 text-[10px] uppercase text-blue ${className}`}
    >
      <span className="font-semibold">{id}</span>
      {title ? <span className="text-ink-soft">— {title}</span> : null}
    </div>
  );
}

/** A bordered figure frame with a top label strip and an optional caption. */
export function Figure({
  id,
  title,
  caption,
  children,
  className = '',
  bodyClassName = '',
}: {
  id: string;
  title?: string;
  caption?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
}) {
  return (
    <figure className={`border border-line-strong bg-paper ${className}`}>
      <div className="flex items-center justify-between border-b border-line px-3 py-1.5">
        <FigLabel id={id} title={title} />
        <span className="font-mono-label text-[9px] uppercase text-ink-faint">
          plate
        </span>
      </div>
      <div className={bodyClassName}>{children}</div>
      {caption ? (
        <figcaption className="border-t border-line px-3 py-2 font-mono-label text-[10px] leading-relaxed text-ink-soft">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

/** Section heading rendered as a numbered manual section. */
export function SectionHead({
  no,
  title,
  right,
}: {
  no: string;
  title: string;
  right?: React.ReactNode;
}) {
  return (
    <div className="mb-4 flex items-end justify-between gap-4 border-b-2 border-line-strong pb-1.5">
      <h2 className="flex items-baseline gap-3">
        <span className="font-mono-label text-sm text-blue">{no}</span>
        <span className="font-serif text-2xl font-semibold tracking-tight text-ink">
          {title}
        </span>
      </h2>
      {right ? (
        <span className="font-mono-label text-[10px] uppercase text-ink-faint">
          {right}
        </span>
      ) : null}
    </div>
  );
}

/** A typeset ledger row: label on the left, value on the right, dotted leader. */
export function SpecRow({
  label,
  value,
  accent,
}: {
  label: string;
  value: React.ReactNode;
  accent?: string;
}) {
  return (
    <div className="flex items-baseline gap-2 py-1">
      <span className="font-mono-label shrink-0 text-[10px] uppercase text-ink-soft">
        {label}
      </span>
      <span className="mt-px min-w-3 flex-1 border-b border-dotted border-line" />
      <span
        className="font-mono-label shrink-0 text-[11px] tabular-nums"
        style={{ color: accent ?? 'var(--ink)' }}
      >
        {value}
      </span>
    </div>
  );
}
