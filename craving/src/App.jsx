import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

function Model({ path, sectionIndex, scrollOffset }) {
    const modelRef = useRef();
    const { scene } = useGLTF(path);

    const initialYPosition = -sectionIndex * 6.5; // Initial placement per section

    useFrame(() => {
        if (modelRef.current) {
            modelRef.current.position.y = initialYPosition + scrollOffset; // Move down as scrollOffset increases
            console.log(`Model ${sectionIndex}: y=${modelRef.current.position.y}`);
        }
    });

    return <primitive ref={modelRef} object={scene} scale={0.3} />;
}

function CameraController({ scrollOffset, totalSections, maxScrollRange }) {
    const { camera } = useThree();

    useFrame(() => {
        const maxCameraPosition = (totalSections - 1) * 4.5; // Max movement range
        const cameraOffset = 2; // Adjust this to position camera properly
        const cameraSpeedFactor = 0.5; // Reduce this value to slow down camera movement

        camera.position.y = cameraOffset - (scrollOffset * maxCameraPosition / maxScrollRange) * cameraSpeedFactor;
        console.log('Camera position:', camera.position.y);
    });

    return null;
}

export default function App() {
    const [scrollOffset, setScrollOffset] = useState(0);
    const totalSections = 3; // Number of models/sections
    const maxScrollRange = 10; // Defines max normalized scroll range

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const scrollFraction = scrollY / maxScroll;
            const newScrollOffset = scrollFraction * maxScrollRange; // Normalize the scroll offset
            setScrollOffset(newScrollOffset);
            console.log('scrollOffset:', newScrollOffset);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

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

                <CameraController 
                    scrollOffset={scrollOffset} 
                    totalSections={totalSections} 
                    maxScrollRange={maxScrollRange} 
                />

                <Model path="./model1.glb" sectionIndex={0} scrollOffset={scrollOffset} />
                <Model path="./model2.glb" sectionIndex={1} scrollOffset={scrollOffset} />
                <Model path="./model3.glb" sectionIndex={2} scrollOffset={scrollOffset} />
            </Canvas>
        </>
    );
}
