const services = [
  {
    title: "Custom Development",
    description:
      "Full-stack applications tailored to your workflows and goals.",
  },
  {
    title: "Technical Consulting",
    description:
      "Architecture reviews, tech-stack guidance, and roadmap planning.",
  },
  {
    title: "Team Augmentation",
    description:
      "Experienced engineers embedded in your team to accelerate delivery.",
  },
];

function Services() {
  return (
    <section id="services" className="services">
      <h2>What We Do</h2>
      <div className="services-grid">
        {services.map((s) => (
          <div key={s.title} className="service-card">
            <h3>{s.title}</h3>
            <p>{s.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;
