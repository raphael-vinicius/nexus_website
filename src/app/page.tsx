export default function HomePage() {
  return (
    <main
      id="conteudo"
      style={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#000",
        color: "#fff",
        padding: "24px",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: "560px",
          textAlign: "center",
        }}
      >
        <p
          aria-label="Nexus Importados"
          style={{
            margin: "0 0 28px",
            fontSize: "18px",
            fontWeight: 700,
            letterSpacing: "0",
            textTransform: "uppercase",
          }}
        >
          Nexus
        </p>
        <h1
          style={{
            margin: "0",
            fontSize: "48px",
            lineHeight: 1,
            fontWeight: 800,
          }}
        >
          Nexus Importados
        </h1>
        <p
          style={{
            margin: "20px auto 0",
            maxWidth: "440px",
            fontSize: "18px",
            lineHeight: 1.5,
            color: "#d4d4d4",
          }}
        >
          Tecnologia premium com atendimento direto e simples.
        </p>
        <a
          href="https://wa.me/5518997126615"
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "48px",
            marginTop: "32px",
            padding: "0 22px",
            border: "1px solid #fff",
            borderRadius: "0",
            background: "#fff",
            color: "#000",
            fontSize: "16px",
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          Falar no WhatsApp
        </a>
      </section>
    </main>
  );
}
