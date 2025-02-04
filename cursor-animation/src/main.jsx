import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import App from './App.jsx'
import './App.css'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <Canvas camera={{ position: [0, 5, 10], fov: 50 }}>
        <App />
    </Canvas>
)