import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

const COUNT = 1800
// Pre-generate star positions once at module level to guarantee pure component rendering
const STAR_POSITIONS = new Float32Array(COUNT * 3)
for (let i = 0; i < COUNT; i++) {
  STAR_POSITIONS[i * 3] = (Math.random() - 0.5) * 45 // x spread
  STAR_POSITIONS[i * 3 + 1] = (Math.random() - 0.5) * 35 // y spread
  STAR_POSITIONS[i * 3 + 2] = (Math.random() - 0.5) * 45 - 10 // z depth
}

/**
 * 3D Deep Space Starfield with warp/drift velocity
 */
function SpaceStarfield() {
  const pointsRef = useRef()

  // Move stars toward the camera to simulate moving forward in space
  useFrame((_, delta) => {
    if (!pointsRef.current) return
    const pos = pointsRef.current.geometry.attributes.position.array
    const speed = delta * 12

    for (let i = 0; i < COUNT; i++) {
      pos[i * 3 + 2] += speed
      // When a star passes behind camera, reset it deep into the distance
      if (pos[i * 3 + 2] > 6) {
        pos[i * 3 + 2] = -40
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={STAR_POSITIONS.length / 3}
          array={STAR_POSITIONS}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#ffffff"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  )
}

/**
 * Procedural 3D Tactical Marvel Starship (Quinjet / Milano cruiser)
 */
function SpaceshipModel() {
  const shipRef = useRef()
  const thrusterLeftRef = useRef()
  const thrusterRightRef = useRef()

  useFrame((state) => {
    if (!shipRef.current) return
    const t = state.clock.getElapsedTime() * 0.65

    // Cruise in a dynamic, sweeping space flight path predominantly in the left-to-center region
    shipRef.current.position.x = -2.2 + Math.sin(t) * 1.8
    shipRef.current.position.y = 0.2 + Math.sin(t * 1.6) * 0.8
    shipRef.current.position.z = -1.5 + Math.cos(t) * 1.6

    // Realistic flight banking & aerodynamics:
    // Roll into the turn
    shipRef.current.rotation.z = -Math.cos(t) * 0.45
    // Pitch up/down based on elevation changes
    shipRef.current.rotation.x = 0.15 + Math.sin(t * 1.6) * 0.18
    // Yaw towards the heading
    shipRef.current.rotation.y = 0.25 - Math.sin(t) * 0.35

    // Pulsing engine thruster plumes
    const plumeScale = 1.0 + Math.sin(state.clock.getElapsedTime() * 25) * 0.2
    if (thrusterLeftRef.current && thrusterRightRef.current) {
      thrusterLeftRef.current.scale.set(1, plumeScale, 1)
      thrusterRightRef.current.scale.set(1, plumeScale, 1)
    }
  })

  return (
    <group ref={shipRef} scale={[0.85, 0.85, 0.85]}>
      {/* Main Hull Armor (Dark Titanium Stealth) */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.9, 0.3, 2.2]} />
        <meshStandardMaterial color="#14161d" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Aerodynamic Forward Nosecone */}
      <mesh position={[0, 0, 1.4]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[0.45, 1.2, 4]} />
        <meshStandardMaterial color="#1a1d26" metalness={0.9} roughness={0.25} />
      </mesh>

      {/* Cockpit Canopy Glass (Glowing Cyan / Holographic HUD) */}
      <mesh position={[0, 0.18, 0.5]}>
        <boxGeometry args={[0.42, 0.2, 0.8]} />
        <meshStandardMaterial
          color="#0284c7"
          emissive="#38bdf8"
          emissiveIntensity={2.5}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Left Delta Swept-Back Wing */}
      <group position={[-0.8, 0, -0.2]} rotation={[0, 0.2, -0.08]}>
        <mesh>
          <boxGeometry args={[1.6, 0.04, 1.1]} />
          <meshStandardMaterial color="#181b24" metalness={0.85} roughness={0.3} />
        </mesh>
        {/* Left Wingtip Angled Stabilizer Fin */}
        <mesh position={[-0.8, 0.25, -0.3]} rotation={[0, 0, -0.3]}>
          <boxGeometry args={[0.04, 0.5, 0.6]} />
          <meshStandardMaterial color="#0f1117" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Wing Edge Emissive Glow Strip */}
        <mesh position={[-0.4, 0.02, 0.4]}>
          <boxGeometry args={[0.9, 0.02, 0.05]} />
          <meshStandardMaterial color="#e63946" emissive="#e63946" emissiveIntensity={2} />
        </mesh>
      </group>

      {/* Right Delta Swept-Back Wing */}
      <group position={[0.8, 0, -0.2]} rotation={[0, -0.2, 0.08]}>
        <mesh>
          <boxGeometry args={[1.6, 0.04, 1.1]} />
          <meshStandardMaterial color="#181b24" metalness={0.85} roughness={0.3} />
        </mesh>
        {/* Right Wingtip Angled Stabilizer Fin */}
        <mesh position={[0.8, 0.25, -0.3]} rotation={[0, 0, 0.3]}>
          <boxGeometry args={[0.04, 0.5, 0.6]} />
          <meshStandardMaterial color="#0f1117" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Wing Edge Emissive Glow Strip */}
        <mesh position={[0.4, 0.02, 0.4]}>
          <boxGeometry args={[0.9, 0.02, 0.05]} />
          <meshStandardMaterial color="#e63946" emissive="#e63946" emissiveIntensity={2} />
        </mesh>
      </group>

      {/* Twin Engine Turbine Cylinders */}
      <mesh position={[-0.35, 0.02, -1.1]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.18, 0.22, 0.6, 16]} />
        <meshStandardMaterial color="#2d313c" metalness={0.95} roughness={0.2} />
      </mesh>
      <mesh position={[0.35, 0.02, -1.1]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.18, 0.22, 0.6, 16]} />
        <meshStandardMaterial color="#2d313c" metalness={0.95} roughness={0.2} />
      </mesh>

      {/* Glowing Ion Jet Thruster Exhaust Plumes */}
      <mesh
        ref={thrusterLeftRef}
        position={[-0.35, 0.02, -1.6]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <coneGeometry args={[0.14, 0.8, 16]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#00f0ff"
          emissiveIntensity={4.5}
          transparent
          opacity={0.88}
        />
      </mesh>
      <mesh
        ref={thrusterRightRef}
        position={[0.35, 0.02, -1.6]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <coneGeometry args={[0.14, 0.8, 16]} />
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#00f0ff"
          emissiveIntensity={4.5}
          transparent
          opacity={0.88}
        />
      </mesh>

      {/* Point light on the ship's engines */}
      <pointLight position={[0, 0, -1.5]} color="#00f0ff" intensity={3} distance={5} />
    </group>
  )
}

export default function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
      >
        {/* Cinematic space lighting */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1.8} color="#ffffff" />
        <directionalLight position={[-10, -5, -5]} intensity={0.5} color="#38bdf8" />

        {/* Streaming stars in deep space */}
        <SpaceStarfield />

        {/* 3D Flying Spaceship */}
        <SpaceshipModel />
      </Canvas>
    </div>
  )
}