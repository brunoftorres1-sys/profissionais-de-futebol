const courses = [
  {
    title: "Fundamentos do Controle de Bola",
    category: "Tecnica",
    duration: "2h 30min",
    description: "Treinos para melhorar dominio, primeiro toque e controle em movimento.",
  },
  {
    title: "Taticas de Posicionamento",
    category: "Tatica",
    duration: "3h 15min",
    description: "Leitura de jogo, ocupacao de espacos e movimentacao sem bola.",
  },
  {
    title: "Preparacao Fisica",
    category: "Fisica",
    duration: "4h",
    description: "Rotinas de forca, velocidade, resistencia e prevencao de lesoes.",
  },
];

const trials = ["Sao Paulo FC", "Palmeiras", "Flamengo", "Santos FC"];

export default function App() {
  return (
    <main className="page-shell">
      <header className="site-header">
        <div>
          <span className="eyebrow">Academia profissional</span>
          <h1>FuturoCraque</h1>
        </div>
        <a className="header-action" href="#testes">Testes em clubes</a>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <span className="badge">Mais de 10.000 aspirantes treinando</span>
          <h2>Transforme seu sonho em realidade profissional</h2>
          <p>
            Aprenda fundamentos tecnicos, taticos, fisicos e mentais com uma plataforma focada em jovens atletas que querem evoluir no futebol.
          </p>
          <div className="actions">
            <a href="#cursos" className="primary-button">Ver cursos</a>
            <a href="#testes" className="secondary-button">Inscrever-se em testes</a>
          </div>
        </div>
        <div className="hero-panel" aria-label="Resumo da plataforma">
          <strong>150+</strong>
          <span>video aulas</span>
          <strong>50+</strong>
          <span>treinadores profissionais</span>
          <strong>1000+</strong>
          <span>jogadores formados</span>
        </div>
      </section>

      <section id="cursos" className="section">
        <div className="section-heading">
          <span className="eyebrow">Cursos</span>
          <h2>Areas de desenvolvimento</h2>
        </div>
        <div className="course-grid">
          {courses.map((course) => (
            <article className="course-card" key={course.title}>
              <span>{course.category}</span>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
              <small>{course.duration}</small>
            </article>
          ))}
        </div>
      </section>

      <section id="testes" className="section trials-section">
        <div className="section-heading">
          <span className="eyebrow">Oportunidades</span>
          <h2>Testes em clubes profissionais</h2>
          <p>Inscricoes gratuitas para peneiras e avaliacoes em clubes parceiros.</p>
        </div>
        <div className="trial-list">
          {trials.map((club) => (
            <div className="trial-item" key={club}>
              <span>{club}</span>
              <button type="button">Inscrever-se</button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
