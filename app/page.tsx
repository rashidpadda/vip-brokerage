'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import GlobeMap from './components/Map'



export default function HomePage() {
  const [started, setStarted] = useState(false)

  const handleStart = () => setStarted(true)

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black text-white">
      <GlobeMap started={started} />

      {/* Overlay & Hero - hidden on start */}
      <AnimatePresence>
        {!started && (
          <>
            <motion.div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            />
            {/* Subtle gradient for better contrast */}
            <motion.div
              className="absolute inset-0 bg-linear-to-b from-black/70 via-black/50 to-black/80"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            />
            <motion.div
              className="absolute inset-0 z-10 flex flex-col justify-center px-6 md:px-16 pointer-events-auto"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-3xl"
              >
                <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur">
                  <span className="inline-block h-2 w-2 rounded-full bg-orange-500" />
                  Global developments. Local expertise.
                </div>

                <div className="mt-6 flex items-start gap-5">
                  {/* Left orange accent line */}
                  <div className="mt-2 hidden h-24 w-1 rounded-full bg-orange-500 md:block" />
                  <h1 className="text-4xl md:text-7xl font-extrabold leading-[1.05] tracking-tight">
                    THE WORLD <br /> OF VIP BROKERAGE
                  </h1>
                </div>

                <p className="mt-6 max-w-2xl text-lg md:text-2xl text-white/75">
                  Explore world-class developments and premium properties with a seamless, map-first experience.
                </p>

                <button
                  onClick={handleStart}
                  className="cursor-pointer hover:cursor-pointer hover:shadow-lg hover:shadow-orange-500/20 mt-8 inline-flex items-center justify-center rounded-full bg-orange-500 px-7 py-3.5 font-semibold text-white shadow-lg shadow-orange-500/20 transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-black"
                >
                  Start Exploring
                </button>
                <div className="mt-3 text-sm text-white/60">
                  Tip: Click any flag to fly to a destination.
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}