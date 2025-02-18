import React, { useEffect, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import gsap from "gsap";

function Model({ path, sectionIndex }) {
    const modelRef = useRef();
    const { scene } = useGLTF(path);

    const initialYPosition = -sectionIndex * 4.5; 

    useEffect(() => {
        if (modelRef.current) {
            gsap.set(modelRef.current.position, { y: initialYPosition });
        }
    }, [initialYPosition]);

    return <primitive ref={modelRef} object={scene} scale={0.3} position={[0, initialYPosition, 0]} />;
}

function CameraController() {
    const { camera } = useThree(); 

    useEffect(() => {
        const updateScroll = () => {
            const scrollY = window.scrollY;
            gsap.to(camera.position, {
                duration: 1.2,
                ease: "power2.inOut",
                y: -scrollY / window.innerHeight * 4, 
            });
        };

        window.addEventListener("scroll", updateScroll);
        return () => window.removeEventListener("scroll", updateScroll);
    }, [camera]);

    return null; 
}

export default function App() {
    return (
        <>
            <Canvas
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "transparent",
                    pointerEvents: "auto",
                }}
                camera={{ fov: 45, position: [0, 0, 8] }} 
            >
                <ambientLight intensity={3} />
                <directionalLight position={[5, 5, 5]} intensity={20} />

                <CameraController /> 

                <Model path="./model1.glb" sectionIndex={0} />
                <Model path="./model2.glb" sectionIndex={1} />
                <Model path="./model3.glb" sectionIndex={2} />
            </Canvas>
        </>
    );
}
