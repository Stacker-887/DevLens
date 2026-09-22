import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import FeatureCard from './components/FeatureCard'
import './App.css'

function App() {
  const [connected, setConnected] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [projects, setProjects] = useState([])
  const [projectName, setProjectName] = useState('')
  const [projectLanguage, setProjectLanguage] = useState('')

  useEffect(() => {
    fetch('http://localhost:5000/api/health')
      .then((response) => response.json())
      .then((data) => {
        setMessage(`${data.service}: ${data.status}`)
      })
  }, [])

  useEffect(() => {
    fetch('http://localhost:5000/api/projects')
      .then((response) => response.json())
      .then((data) => {
        setProjects(data)
      })
  }, [])

  return (
    <>
      <Navbar />

      <main className="hero">
        <h1>Understand Your Codebase</h1>

        <p>
          DevLens uses AI to analyze your code, find problems,
          and help you understand your entire project.
        </p>

        <p>{message}</p>

        <button
          onClick={() => {
            setLoading(true)

            setTimeout(() => {
              setLoading(false)
              setConnected(true)
            }, 1500)
          }}
          disabled={loading || connected}
        >
          {loading
            ? 'Connecting...'
            : connected
              ? 'GitHub Connected'
              : 'Connect GitHub'}
          </button>
      </main>

      <section className="features">
        <h2>What DevLens can do</h2>

        <div className="feature-grid">
          <FeatureCard
            title="Codebase Analysis"
            description="Analyze your project structure and understand how your code is organized."
          />

          <FeatureCard
            title="Security Detection"
            description="Find potential security problems and risky patterns in your code."
          />

          <FeatureCard
            title="AI Developer Mentor"
            description="Ask questions about your codebase and get answers based on your actual code."
          />
        </div>
      </section>

      <section className="projects">
        <h2>Your Projects</h2>

        <form
          onSubmit={async (event) => {
            event.preventDefault()

            const response = await fetch('http://localhost:5000/api/projects', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                name: projectName,
                language: projectLanguage,
                status: 'Ready'
              })
            })

            const newProject = await response.json()

            setProjects([...projects, newProject])

            setProjectName('')
            setProjectLanguage('')
          }}
        >
          <input
            type="text"
            placeholder="Project name"
            value={projectName}
            onChange={(event) => setProjectName(event.target.value)}
          />

          <input
            type="text"
            placeholder="Language"
            value={projectLanguage}
            onChange={(event) => setProjectLanguage(event.target.value)}
          />

          <button type="submit">Create Project</button>
        </form>

        <div>
          {projects.map((project) => (
            <div key={project.id}>
              <h3>{project.name}</h3>
              <p>Language: {project.language}</p>
              <p>Status: {project.status}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default App