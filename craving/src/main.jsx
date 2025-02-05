import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './App.css'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(<>
    <App />
    
    <section id="section1" className="section">
        <h1>What are you craving?</h1>
    </section>
    <section id="section2" className="section">
        <h2>Testingg</h2>
    </section>
    <section id="section3" className="section">
        <h2>Testinggg</h2>
    </section>

    </>
)