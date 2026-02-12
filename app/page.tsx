'use client'

import React, { useEffect, useRef, useState, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html, Environment, Stars } from '@react-three/drei'
import * as THREE from 'three'
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
            <motion.div
              className="absolute inset-0 flex flex-col justify-center px-6 md:px-16 z-10 pointer-events-auto"
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
                <h1 className="text-4xl md:text-7xl font-extrabold leading-tight">
                  THE WORLD <br /> OF VIP BROKERAGE
                </h1>

                <p className="mt-6 text-lg md:text-2xl text-gray-300">
                  Explore our world-class development & properties.
                </p>

                <button
                  onClick={handleStart}
                  className="mt-8 bg-orange-500 hover:bg-orange-600 transition px-6 py-3 rounded-full font-semibold"
                >
                  Start Exploring
                </button>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}