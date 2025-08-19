import "../css/about.css"

function AboutDocs() {
  return (
    <div className="about-docs-container">
      {/* Hero / Intro */}
      <section className="hero-section">
        <h1 className="main-title">About</h1>
        <p className="subtitle">Here's how the model works</p>
      </section>

      {/* Docs Layout */}
      <div className="docs-layout">
        {/* Side Navigation */}
        <aside className="docs-sidebar">
          <nav>
            <ul>
              <li><a href="#overview">Overview</a></li>
              <li><a href="#dataset">Dataset</a></li>
              <li><a href="#preprocessing">Preprocessing</a></li>
              <li><a href="#architecture">Model Architecture</a></li>
              <li><a href="#training">Training Process</a></li>
              <li><a href="#evaluation">Evaluation Metrics</a></li>
              <li><a href="#deployment">Deployment</a></li>
              <li><a href="#limitations">Limitations</a></li>
              <li><a href="#privacy">Privacy & Security</a></li>
            </ul>
          </nav>
        </aside>

        {/* Docs Content */}
        <main className="docs-content">
          <section id="overview" className="docs-section">
            <h2>Overview</h2>
            <p>[Describe what the model does at a high level.]</p>
          </section>

          <section id="dataset" className="docs-section">
            <h2>Dataset</h2>
            <p>[Explain the datasets used, sources, diversity, etc.]</p>
          </section>

          <section id="preprocessing" className="docs-section">
            <h2>Preprocessing</h2>
            <p>[Face detection, normalization, alignment, augmentation.]</p>
          </section>

          <section id="architecture" className="docs-section">
            <h2>Model Architecture</h2>
            <p>[Neural net structure, encoder-decoder, GAN, transformers, etc.]</p>
          </section>

          <section id="training" className="docs-section">
            <h2>Training Process</h2>
            <p>[Loss functions, optimizers, epochs, hardware used.]</p>
          </section>

          <section id="evaluation" className="docs-section">
            <h2>Evaluation Metrics</h2>
            <p>[Accuracy measures, FID score, realism evaluation.]</p>
          </section>

          <section id="deployment" className="docs-section">
            <h2>Deployment</h2>
            <p>[How the model runs in browser/app, frameworks, WebAssembly, etc.]</p>
          </section>

          <section id="limitations" className="docs-section">
            <h2>Limitations</h2>
            <p>[What the model cannot predict accurately, edge cases.]</p>
          </section>

          <section id="privacy" className="docs-section">
            <h2>Privacy & Security</h2>
            <p>[How user data is handled, what’s stored or not stored.]</p>
          </section>
        </main>
      </div>
    </div>
  )
}

export default AboutDocs
