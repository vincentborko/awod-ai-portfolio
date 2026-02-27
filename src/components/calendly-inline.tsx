"use client";

import Script from "next/script";

type CalendlyInlineProps = {
  url: string;
};

export function CalendlyInline({ url }: CalendlyInlineProps) {
  const needsPublicLink = url.includes("/app/");

  return (
    <div className="calendly-block">
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
      <div
        className="calendly-inline-widget"
        data-url={url}
        data-resize="true"
        style={{ minWidth: "320px", height: "760px" }}
      />
      {needsPublicLink ? (
        <div className="notice-box">
          <strong>Calendly Link Check</strong>
          <p>
            Current URL looks like an internal Calendly app link. Replace it with
            a public event URL (e.g. `https://calendly.com/name/event`) so
            website visitors can book directly.
          </p>
        </div>
      ) : null}
    </div>
  );
}
