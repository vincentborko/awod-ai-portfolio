"use client";

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import type { CaseAssetLink } from "@/data/site";

type AssetAspect = "portrait" | "landscape" | "square";

type EmbeddedAsset = {
  label: string;
  provider: "Instagram" | "YouTube";
  embedUrl: string;
  sourceUrl: string;
  aspect: AssetAspect;
  thumbnailUrl?: string;
  thumbnailAspect?: AssetAspect;
  thumbnailSize?: string;
  thumbnailPosition?: string;
};

type CaseAssetGalleryProps = {
  caseName: string;
  assetLinks: CaseAssetLink[];
};

function extractYouTubeId(url: URL) {
  const hostname = url.hostname.replace(/^www\./, "").toLowerCase();
  if (hostname === "youtu.be") {
    return url.pathname.split("/").filter(Boolean)[0] ?? null;
  }

  if (hostname.endsWith("youtube.com")) {
    if (url.pathname === "/watch") {
      return url.searchParams.get("v");
    }

    const parts = url.pathname.split("/").filter(Boolean);
    if (parts[0] === "embed" && parts[1]) {
      return parts[1];
    }
  }

  return null;
}

function detectAspectFromSize(width: number, height: number): AssetAspect {
  const ratio = width / height;
  if (ratio > 1.1) {
    return "landscape";
  }
  if (ratio < 0.9) {
    return "portrait";
  }
  return "square";
}

function toEmbeddedAsset(
  label: string,
  rawUrl: string,
  customThumbnailUrl?: string,
  customThumbnailAspect?: AssetAspect,
  customThumbnailSize?: string,
  customThumbnailPosition?: string
): EmbeddedAsset | null {
  try {
    const url = new URL(rawUrl);
    const hostname = url.hostname.replace(/^www\./, "").toLowerCase();

    if (hostname.endsWith("instagram.com")) {
      const segments = url.pathname.split("/").filter(Boolean);
      const postType = segments[0];
      const postId = segments[1];

      // Keep stable Instagram embeds.
      if (postId && (postType === "reel" || postType === "tv" || postType === "p")) {
        const aspect =
          postType === "reel" ? "portrait" : postType === "p" ? "square" : "landscape";

        return {
          label,
          provider: "Instagram",
          embedUrl: `https://www.instagram.com/${postType}/${postId}/embed/`,
          sourceUrl: rawUrl,
          aspect,
          thumbnailUrl: customThumbnailUrl,
          thumbnailAspect: customThumbnailAspect,
          thumbnailSize: customThumbnailSize,
          thumbnailPosition: customThumbnailPosition,
        };
      }
    }

    const youtubeId = extractYouTubeId(url);
    if (youtubeId) {
      return {
        label,
        provider: "YouTube",
        embedUrl: `https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1`,
        sourceUrl: rawUrl,
        aspect: "landscape",
        thumbnailUrl: customThumbnailUrl ?? `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`,
        thumbnailAspect: customThumbnailAspect,
        thumbnailSize: customThumbnailSize,
        thumbnailPosition: customThumbnailPosition,
      };
    }
  } catch {
    return null;
  }

  return null;
}

export function CaseAssetGallery({ caseName, assetLinks }: CaseAssetGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [detectedThumbMeta, setDetectedThumbMeta] = useState<
    Record<string, { aspect: AssetAspect; ratio: number }>
  >({});

  const embeddedAssets = useMemo(
    () =>
      assetLinks
        .map((link) =>
          toEmbeddedAsset(
            link.label,
            link.url,
            link.thumbnailUrl,
            link.thumbnailAspect,
            link.thumbnailSize,
            link.thumbnailPosition
          )
        )
        .filter((asset): asset is EmbeddedAsset => asset !== null),
    [assetLinks]
  );

  const activeAsset = activeIndex !== null ? embeddedAssets[activeIndex] : null;

  useEffect(() => {
    let cancelled = false;
    const assetsWithThumb = embeddedAssets.filter((asset) => Boolean(asset.thumbnailUrl));

    if (!assetsWithThumb.length) {
      return () => {
        cancelled = true;
      };
    }

    Promise.all(
      assetsWithThumb.map(
        (asset) =>
          new Promise<{ sourceUrl: string; aspect: AssetAspect; ratio: number } | null>(
            (resolve) => {
            const image = new Image();
            image.onload = () =>
              resolve({
                sourceUrl: asset.sourceUrl,
                aspect: detectAspectFromSize(image.naturalWidth, image.naturalHeight),
                ratio: image.naturalWidth / image.naturalHeight,
              });
            image.onerror = () => resolve(null);
            image.src = asset.thumbnailUrl!;
            }
          )
      )
    ).then((results) => {
      if (cancelled) {
        return;
      }

      const nextMeta: Record<string, { aspect: AssetAspect; ratio: number }> = {};
      results.forEach((result) => {
        if (result) {
          nextMeta[result.sourceUrl] = { aspect: result.aspect, ratio: result.ratio };
        }
      });
      setDetectedThumbMeta(nextMeta);
    });

    return () => {
      cancelled = true;
    };
  }, [embeddedAssets]);

  useEffect(() => {
    if (activeAsset) {
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = previousOverflow;
      };
    }

    return undefined;
  }, [activeAsset]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  if (!embeddedAssets.length) {
    return null;
  }

  const canUseDom = typeof document !== "undefined";

  return (
    <>
      <div className="case-asset-gallery">
        <p className="case-asset-title">Project Assets</p>
        <div className={`case-asset-grid${embeddedAssets.length === 1 ? " is-single" : ""}`}>
          {embeddedAssets.map((asset, index) => {
            const thumbnailMeta = detectedThumbMeta[asset.sourceUrl];
            const thumbnailAspect = asset.thumbnailAspect ?? thumbnailMeta?.aspect ?? asset.aspect;
            const thumbnailStyle =
              asset.thumbnailAspect || !thumbnailMeta
                ? undefined
                : { aspectRatio: String(thumbnailMeta.ratio) };

            return (
              <button
                key={asset.sourceUrl}
                type="button"
                className={`case-asset-card is-${thumbnailAspect}`}
                onClick={() => setActiveIndex(index)}
                aria-label={`Play ${asset.label} on this page`}
              >
                <div
                  className="case-asset-thumb"
                  style={thumbnailStyle}
                >
                  {asset.thumbnailUrl ? (
                    <div
                      className="case-asset-thumb-image"
                      style={{
                        backgroundImage: `url(${asset.thumbnailUrl})`,
                        backgroundSize: asset.thumbnailSize ?? "cover",
                        backgroundPosition: asset.thumbnailPosition ?? "center",
                      }}
                      aria-hidden
                    />
                  ) : (
                    <div className="case-asset-placeholder">Instagram Preview</div>
                  )}
                  <span className="case-asset-play-badge" aria-hidden>
                    Play
                  </span>
                </div>
                <div className="case-asset-meta">
                  <strong>{asset.label}</strong>
                  <span>{asset.provider}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {activeAsset && canUseDom
        ? createPortal(
            <div
              className="case-player-modal"
              role="dialog"
              aria-modal="true"
              aria-label={`${caseName} Asset Player`}
              onClick={() => setActiveIndex(null)}
            >
              <div className="case-player-panel" onClick={(event) => event.stopPropagation()}>
                <button
                  type="button"
                  className="case-player-close"
                  onClick={() => setActiveIndex(null)}
                  aria-label="Close player"
                >
                  Close
                </button>
                <div
                  className={`case-player-stage is-${activeAsset.aspect} is-${activeAsset.provider.toLowerCase()}`}
                >
                  <iframe
                    className={`case-player-frame is-${activeAsset.provider.toLowerCase()}`}
                    src={
                      activeAsset.provider === "YouTube"
                        ? `${activeAsset.embedUrl}&autoplay=1`
                        : activeAsset.embedUrl
                    }
                    title={`${caseName} - ${activeAsset.label}`}
                    loading="lazy"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <p className="case-player-note">
                  Video plays directly on this page. Optional source link:
                  {" "}
                  <a href={activeAsset.sourceUrl} target="_blank" rel="noreferrer">
                    Source
                  </a>
                </p>
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
}
