import { useEffect, useRef, useState } from 'react'

const songs = [
    { img: '/song1.png', title: 'Tum Se Hi', artist: 'Mohit Chauhan' },
    { img: '/song2.png', title: 'Bairan', artist: 'Banjaare' },
    { img: '/song3.png', title: 'Arz Kiya Hai', artist: 'Anuv Jain' },
    { img: '/song4.png', title: 'I Wanna Be Yours', artist: 'Arctic Monkeys' },
    { img: '/song5.png', title: 'The Night We Met', artist: 'Lord Huron' },
]

export default function NowHumming() {
    const sectionRef = useRef(null)
    const [isVisible, setIsVisible] = useState(false)
    const [active, setActive] = useState(2) // centre card index

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => setIsVisible(entry.isIntersecting),
            { threshold: 0.15 },
        )
        if (sectionRef.current) observer.observe(sectionRef.current)
        return () => observer.disconnect()
    }, [])

    /* ── layout maths for each position relative to active ── */
    const getCardStyle = (i) => {
        const offset = i - active                     // –2 … +2
        const absOff = Math.abs(offset)

        const scale = 1 - absOff * 0.12           // 1 → 0.88 → 0.76
        const translateX = offset * 180               // px shift
        const zIndex = 10 - absOff
        const opacity = 1 - absOff * 0.25           // 1 → 0.75 → 0.50
        const blur = absOff > 0 ? absOff * 1.5 : 0

        return {
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: '260px',
            aspectRatio: '9 / 16',
            borderRadius: '18px',
            overflow: 'hidden',
            boxShadow: absOff === 0
                ? '0 20px 60px rgba(0,0,0,0.6)'
                : '0 8px 30px rgba(0,0,0,0.4)',
            transform: `translate(-50%, -50%) translateX(${translateX}px) scale(${scale})`,
            zIndex,
            opacity,
            filter: `blur(${blur}px)`,
            transition: 'all 0.5s cubic-bezier(0.4,0,0.2,1)',
            cursor: absOff === 0 ? 'default' : 'pointer',
        }
    }

    return (
        <section id="now-humming" ref={sectionRef} className="relative py-32 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className={`text-center mb-24 ${isVisible ? 'animate-fade-in-up' : 'scroll-hidden'}`}>
                    <span
                        className="text-sm font-semibold tracking-widest uppercase text-white/40"
                        style={{ fontFamily: 'Herkey, sans-serif' }}
                    >
                        What I listen to
                    </span>
                    <h2
                        className="text-4xl sm:text-5xl font-bold mt-3 text-white"
                        style={{ fontFamily: 'Monograph, sans-serif' }}
                    >
                        Now Humming&nbsp;.....
                    </h2>
                </div>

                {/* ── Stacked carousel ── */}
                <div
                    className={`${isVisible ? 'animate-fade-in-up' : 'scroll-hidden'}`}
                    style={{ animationDelay: '0.2s' }}
                >
                    <div
                        style={{
                            position: 'relative',
                            height: '480px',
                            width: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        {songs.map((song, i) => (
                            <div
                                key={i}
                                style={getCardStyle(i)}
                                onClick={() => setActive(i)}
                            >
                                <img
                                    src={song.img}
                                    alt={song.title}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover',
                                        display: 'block',
                                        userSelect: 'none',
                                        pointerEvents: 'none',
                                    }}
                                    draggable={false}
                                />
                            </div>
                        ))}
                    </div>

                    {/* Song info below */}
                    <div className="text-center mt-8" style={{ transition: 'opacity 0.4s ease' }}>
                        <h3
                            className="text-xl font-bold text-white"
                            style={{ fontFamily: 'Monograph, sans-serif' }}
                        >
                            {songs[active].title}
                        </h3>
                        <p
                            className="text-sm text-white/50 mt-1"
                            style={{ fontFamily: 'Herkey, sans-serif' }}
                        >
                            {songs[active].artist}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
