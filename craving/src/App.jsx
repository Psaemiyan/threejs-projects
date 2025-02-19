import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

function Model({ path, sectionIndex, scrollOffset }) {
    const modelRef = useRef();
    const { scene } = useGLTF(path);

    const initialYPosition = -sectionIndex * 4.5;

    useFrame(() => {
        if (modelRef.current) {
            modelRef.current.position.y = initialYPosition - scrollOffset;
        }
    });

    return <primitive ref={modelRef} object={scene} scale={0.3} />;
}

function CameraController({ scrollOffset }) {
    const { camera } = useThree();

    useFrame(() => {
        camera.position.y = -scrollOffset;
    });

    return null;
}

export default function App() {
    const [scrollOffset, setScrollOffset] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const scrollFraction = scrollY / maxScroll;
            setScrollOffset(scrollFraction * maxScroll);
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

                <CameraController scrollOffset={scrollOffset} />

                <Model path="./model1.glb" sectionIndex={0} scrollOffset={scrollOffset} />
                <Model path="./model2.glb" sectionIndex={1} scrollOffset={scrollOffset} />
                <Model path="./model3.glb" sectionIndex={2} scrollOffset={scrollOffset} />
            </Canvas>
        </>
    );
}
