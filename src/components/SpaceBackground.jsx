import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'

const COUNT = 1800
// Pre-calculate positions once at module level to guarantee pure component rendering
const STAR_POSITIONS = new Float32Array(COUNT * 3)
for (let i = 0; i < COUNT; i++) {
  STAR_POSITIONS[i * 3] = (Math.random() - 0.5) * 25
  STAR_POSITIONS[i * 3 + 1] = (Math.random() - 0.5) * 25
  STAR_POSITIONS[i * 3 + 2] = (Math.random() - 0.5) * 25
}

function Stars() {
  const pointsRef = useRef()

  // Very slow drift, different feel from the Hero's grid — more "floating in space"
  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.008
      pointsRef.current.rotation.x += delta * 0.002
    }
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
        size={0.018}
        color="#ffffff"
        transparent
        opacity={0.7}
        sizeAttenuation
      />
    </points>
  )
}

export default function SpaceBackground() {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 70 }}>
        <Stars />
      </Canvas>
    </div>
  )
}