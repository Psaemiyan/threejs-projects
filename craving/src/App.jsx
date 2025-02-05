import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls} from '@react-three/drei';
import { useSpring, animated } from '@react-spring/three';


function Model({ path, sectionId, position }) {
    const modelRef = useRef();
    const model = useGLTF(path);
    const [modelY, setModelY] = useState(0);
    const [targetY, setTargetY] = useState(0);

    useEffect(() => {
        const updatePosition = () => {
            const section = document.getElementById(sectionId);
            if (section) {
                const scrollY = window.scrollY;
                const windowHeight = window.innerHeight;
                const sectionIndex = parseInt(sectionId.replace('section', '')) - 1;
                
                // Calculate the vertical position based on scroll and section index
                const verticalOffset = scrollY - (sectionIndex * windowHeight);

                // Adjust multiplier to control scroll speed and direction
                setTargetY(verticalOffset * 0.01); 
            }
        };

        updatePosition();

        window.addEventListener('scroll', updatePosition);
        window.addEventListener('resize', updatePosition);

        return () => {
            window.removeEventListener('scroll', updatePosition);
            window.removeEventListener('resize', updatePosition);
        };
    }, [sectionId]);

    useFrame(() => {
        if (modelRef.current) {
            setModelY(prev => prev + (targetY - prev) * 0.05); // Smoothly interpolate
            modelRef.current.position.y = modelY;
            modelRef.current.rotation.y += 0.002; // Smooth rotation
        }
    });

    return (
        <animated.group ref={modelRef} position={position}>
            <primitive object={model.scene} scale={0.4} />
        </animated.group>
    );
}

export default function App() {
    return (
        <Canvas
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'transparent',
                pointerEvents: 'auto'
            }}

            camera={ {
                fov: 45,
                position: [ 0, 3, 8 ]
            } }
        >
            {/* <OrbitControls enableZoom={false}/> */}
            <ambientLight intensity={3} />
            <directionalLight position={[5, 5, 5]} intensity={20} />

            <Model path="./model1.glb" sectionId="section1" position={[2, 0, 0]}/>
            <Model path="./model2.glb" sectionId="section2" position={[-2, 0, 0]}/>
            <Model path="./model3.glb" sectionId="section3" position={[2, 0, 0]}/>
        </Canvas>
    );
}
