"use client";

import { useState } from "react";

// Loads only a thumbnail until someone presses play, so the page stays fast on mobile data.
export default function YouTubeEmbed({ id, title }) {
  const [playing, setPlaying] = useState(false);

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-black">
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          aria-label={`Play video: ${title}`}
          className="group absolute inset-0 h-full w-full"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover opacity-70 grayscale transition duration-700 group-hover:scale-[1.03] group-hover:opacity-100 group-hover:grayscale-0"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-night/80 via-night/10 to-transparent" />

          {/* Play button with a slowly turning label around it */}
          <span className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 sm:h-40 sm:w-40">
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-[spin_16s_linear_infinite] text-cream motion-reduce:animate-none" aria-hidden>
              <defs>
                <path id="play-ring" d="M50 50m-44 0a44 44 0 1 1 88 0a44 44 0 1 1 -88 0" />
              </defs>
              <text className="fill-current font-mono text-[7.5px] uppercase tracking-[0.3em]">
                <textPath href="#play-ring">Play the set &bull; Play the set &bull; Play the set &bull;</textPath>
              </text>
            </svg>
            <span className="absolute inset-[22%] flex items-center justify-center rounded-full bg-ember text-night transition-transform duration-500 group-hover:scale-110">
              <svg viewBox="0 0 24 24" className="ml-1 h-6 w-6 fill-current sm:h-8 sm:w-8" aria-hidden>
                <path d="M6 4l14 8-14 8z" />
              </svg>
            </span>
          </span>
        </button>
      )}
    </div>
  );
}
