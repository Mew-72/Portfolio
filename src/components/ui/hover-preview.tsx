"use client"

import React, { useState, useCallback, useRef } from "react"

// Import local assets
import Img1 from '@/assets/1.jpeg';
import Img2 from '@/assets/2.jpeg';
import Img3 from '@/assets/3.jpeg';
import Img4 from '@/assets/4.jpeg';

interface PreviewItem {
    image: string
    title: string
    subtitle: string
    objectPosition?: string
}

const previewData: Record<string, PreviewItem> = {
    journey: {
        image: Img1,
        title: "Web Development",
        subtitle: "Building the future of the web",
        objectPosition: "top", // Middle of top (0%) and center (50%)
    },
    tech: {
        image: Img2,
        title: "Modern Tech Stack",
        subtitle: "React, Next.js, and beyond",
        objectPosition: "center",
    },
    creative: {
        image: Img3,
        title: "Creative Coding",
        subtitle: "Merging art with algorithms",
        objectPosition: "center",
    },
    motion: {
        image: Img4,
        title: "Motion Graphics",
        subtitle: "Dynamic visual storytelling",
        objectPosition: "0% 10%",
    },
}

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;700&family=Syne:wght@400;700;800&display=swap');

  .hover-preview-container {
    min-height: 80vh; 
    background: transparent; 
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px;
    font-family: 'Space Grotesk', sans-serif;
    overflow-x: hidden;
    position: relative;
    width: 100%;
  }

  .content-container {
    max-width: 900px;
    width: 100%;
    z-index: 20; 
  }

  .text-block {
    font-size: clamp(0.8rem, 2vw, 1.2rem); /* Reduced size */
    line-height: 1.6;
    color: hsl(var(--muted-foreground)); /* Muted foreground */
    font-weight: 400;
    letter-spacing: -0.02em;
  }

  .text-block p {
    margin-bottom: 1.5em;
    opacity: 0;
    animation: fadeUp 0.8s ease forwards;
  }

  .text-block p:nth-child(1) { animation-delay: 0.2s; }
  .text-block p:nth-child(2) { animation-delay: 0.4s; }
  .text-block p:nth-child(3) { animation-delay: 0.6s; }
  .text-block p:nth-child(4) { animation-delay: 0.8s; }

  @keyframes fadeUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .hover-link {
    color: hsl(var(--foreground)); /* Theme aware foreground */
    font-weight: 700;
    font-family: 'Syne', sans-serif;
    cursor: pointer;
    position: relative;
    display: inline-block;
    transition: color 0.3s ease;
  }

  .hover-link::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #ff6b6b, #feca57, #48dbfb);
    transition: width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  }

  .hover-link:hover::after {
    width: 100%;
  }

  .preview-card {
    position: fixed;
    pointer-events: none;
    z-index: 1000;
    opacity: 0;
    transform: translateY(10px) scale(0.95);
    transition: opacity 0.25s ease, transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
    will-change: transform, opacity;
  }

  .preview-card.visible {
    opacity: 1;
    transform: translateY(0) scale(1);
  }

  .preview-card-inner {
    background: #1a1a1a;
    border-radius: 16px;
    padding: 8px;
    box-shadow: 
      0 25px 50px -12px rgba(0, 0, 0, 0.8),
      0 0 0 1px rgba(255, 255, 255, 0.1),
      0 0 60px rgba(255, 107, 107, 0.1);
    overflow: hidden;
    backdrop-filter: blur(10px);
  }

  .preview-card img {
    width: 280px;
    height: auto;
    border-radius: 10px;
    display: block;
    object-fit: cover;
    aspect-ratio: 16/10;
  }

  .preview-card-title {
    padding: 12px 8px 8px;
    font-size: 0.85rem;
    color: #fff;
    font-weight: 600;
    font-family: 'Syne', sans-serif;
  }

  .preview-card-subtitle {
    padding: 0 8px 8px;
    font-size: 0.75rem;
    color: #666;
  }
`

const HoverLink = ({
    previewKey,
    children,
    onHoverStart,
    onHoverMove,
    onHoverEnd,
}: {
    previewKey: string
    children: React.ReactNode
    onHoverStart: (key: string, e: React.MouseEvent) => void
    onHoverMove: (e: React.MouseEvent) => void
    onHoverEnd: () => void
}) => {
    return (
        <span
            className="hover-link"
            onMouseEnter={(e) => onHoverStart(previewKey, e)}
            onMouseMove={onHoverMove}
            onMouseLeave={onHoverEnd}
        >
            {children}
        </span>
    )
}

const PreviewCard = ({
    data,
    position,
    isVisible,
    cardRef,
}: {
    data: PreviewItem | null
    position: { x: number; y: number }
    isVisible: boolean
    cardRef: React.RefObject<HTMLDivElement | null>
}) => {
    if (!data) return null

    return (
        <div
            ref={cardRef}
            className={`preview-card ${isVisible ? "visible" : ""}`}
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
            }}
        >
            <div className="preview-card-inner">
                <img
                    key={data.image}
                    src={data.image}
                    alt={data.title || ""}
                    crossOrigin="anonymous"
                    referrerPolicy="no-referrer"
                    style={{ objectPosition: data.objectPosition || 'center' }}
                />
                <div className="preview-card-title">{data.title}</div>
                <div className="preview-card-subtitle">{data.subtitle}</div>
            </div>
        </div>
    )
}

export function HoverPreview() {
    const [activePreview, setActivePreview] = useState<(typeof previewData)[keyof typeof previewData] | null>(null)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isVisible, setIsVisible] = useState(false)
    const cardRef = useRef<HTMLDivElement>(null)

    const updatePosition = useCallback((e: React.MouseEvent | MouseEvent) => {
        const target = e.currentTarget as HTMLElement
        const rect = target.getBoundingClientRect()

        const cardWidth = 296
        const cardHeight = 240
        const gap = 10 // Gap between text and card

        // Center card horizontally relative to the text element
        let x = rect.left + rect.width / 2 - cardWidth / 2

        // Clamp X to viewport
        if (x < 20) {
            x = 20
        }
        if (x + cardWidth > window.innerWidth - 20) {
            x = window.innerWidth - cardWidth - 20
        }

        // Check if there's space above
        const spaceAbove = rect.top
        const spaceBelow = window.innerHeight - rect.bottom

        let y: number
        if (spaceAbove >= cardHeight + gap) {
            // Show above the text (default)
            y = rect.top - cardHeight - gap
        } else if (spaceBelow >= cardHeight + gap) {
            // Show below the text
            y = rect.bottom + gap
        } else {
            // Not enough space either way, show above anyway
            y = Math.max(10, rect.top - cardHeight - gap)
        }

        setPosition({ x, y })
    }, [])


    const handleHoverStart = useCallback(
        (key: string, e: React.MouseEvent) => {
            setActivePreview(previewData[key as keyof typeof previewData])
            setIsVisible(true)
            updatePosition(e)
        },
        [updatePosition],
    )

    const handleHoverMove = useCallback(
        (e: React.MouseEvent) => {
            if (isVisible) {
                updatePosition(e)
            }
        },
        [isVisible, updatePosition],
    )

    const handleHoverEnd = useCallback(() => {
        setIsVisible(false)
    }, [])

    return (
        <>
            <style>{styles}</style>
            <div className="hover-preview-container">

                {/* Simplified ambient glow since removing background noise image for cleaner integration */}
                <div className="ambient-glow" style={{ position: 'absolute', opacity: 0.1 }} />

                <div className="content-container">
                    <h2 className="text-4xl md:text-6xl font-bold mb-12 text-foreground font-['Syne']">About Me</h2>

                    <div className="text-block">
                        <p>
                            I am a passionate <HoverLink
                                previewKey="creative"
                                onHoverStart={handleHoverStart}
                                onHoverMove={handleHoverMove}
                                onHoverEnd={handleHoverEnd}
                            >Creative Developer</HoverLink> crafting digital experiences that merge art with technology. My journey involves exploring new frontiers in{" "}
                            <HoverLink
                                previewKey="journey"
                                onHoverStart={handleHoverStart}
                                onHoverMove={handleHoverMove}
                                onHoverEnd={handleHoverEnd}
                            >
                                Web Development
                            </HoverLink>
                            , bridging the gap between design and engineering.
                        </p>

                        <p>
                            I specialize in building performant, accessible, and beautiful applications using{" "}
                            <HoverLink
                                previewKey="tech"
                                onHoverStart={handleHoverStart}
                                onHoverMove={handleHoverMove}
                                onHoverEnd={handleHoverEnd}
                            >
                                Modern Tech Stacks
                            </HoverLink>{" "}
                            like React, Next.js, and TypeScript.
                        </p>

                        <p>
                            Beyond code, I'm constantly experimenting with AI and{" "}
                            <HoverLink
                                previewKey="motion"
                                onHoverStart={handleHoverStart}
                                onHoverMove={handleHoverMove}
                                onHoverEnd={handleHoverEnd}
                            >
                                Motion Graphics
                            </HoverLink>{" "}
                            to push the boundaries of what's possible on the web.
                        </p>
                    </div>
                </div>

                <PreviewCard data={activePreview} position={position} isVisible={isVisible} cardRef={cardRef} />
            </div>
        </>
    )
}
