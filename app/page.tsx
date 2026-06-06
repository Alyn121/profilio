"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const NAV = ["Giới thiệu", "Dự án", "Tổng kết"];

const PROJECTS = [
  {
    id: "01",
    title: "Thao tác tệp tin & thư mục",
    topic: "Bài tập 1 & 1.4",
    desc: "Cấu trúc thư mục tối ưu, quy tắc đặt tên tệp và hình ảnh minh họa.",
    tags: ["File System", "Tổ chức dữ liệu"],
    status: "Hoàn thành",
  },
  {
    id: "02",
    title: "Tìm kiếm & đánh giá thông tin",
    topic: "Bài tập 2",
    desc: "Quy trình tìm kiếm nâng cao, đánh giá độ tin cậy nguồn thông tin.",
    tags: ["Research", "Critical Thinking"],
    status: "Hoàn thành",
  },
  {
    id: "03",
    title: "Viết Prompt hiệu quả cho AI",
    topic: "Bài tập 3",
    desc: "So sánh prompt trước/sau tối ưu, ứng dụng trong nghiên cứu pháp lý.",
    tags: ["Prompt Engineering", "AI"],
    status: "Hoàn thành",
  },
  {
    id: "04",
    title: "Cộng tác & họp trực tuyến",
    topic: "Bài tập 4",
    desc: "Minh chứng sử dụng công cụ họp, kinh nghiệm làm việc nhóm từ xa.",
    tags: ["Collaboration", "Remote Work"],
    status: "Hoàn thành",
  },
  {
    id: "05",
    title: "AI hỗ trợ sáng tạo nội dung",
    topic: "Bài tập 5",
    desc: "Sản phẩm văn bản, hình ảnh, video được hỗ trợ bởi AI.",
    tags: ["Generative AI", "Content"],
    status: "Hoàn thành",
  },
  {
    id: "06",
    title: "Sử dụng AI có trách nhiệm",
    topic: "Bài tập 6",
    desc: "Nguyên tắc đạo đức AI, bài học từ quá trình nghiên cứu.",
    tags: ["AI Ethics", "Responsible AI"],
    status: "Hoàn thành",
  },
];

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [active, setActive] = useState("Giới thiệu");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)" }}>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        padding: "0 2rem",
        background: scrolled ? "rgba(12,12,14,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
        transition: "all 0.3s ease",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: "60px",
      }}>
        <span style={{ fontFamily: "var(--serif)", fontSize: "1.1rem", color: "var(--accent)", letterSpacing: "0.05em" }}>
          Portfolio.
        </span>
        <div style={{ display: "flex", gap: "2rem" }}>
          {NAV.map((n) => (
            <button
              key={n}
              onClick={() => { setActive(n); scrollTo(n === "Giới thiệu" ? "hero" : n === "Dự án" ? "projects" : "summary"); }}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "var(--sans)", fontSize: "0.8rem", fontWeight: 400,
                color: active === n ? "var(--accent)" : "var(--muted)",
                letterSpacing: "0.08em", textTransform: "uppercase",
                transition: "color 0.2s",
              }}
            >
              {n}
            </button>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 2rem 0", maxWidth: "900px", margin: "0 auto" }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <p style={{ fontFamily: "var(--sans)", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "1.5rem" }}>
            Digital Portfolio — 2024
          </p>
          <h1 style={{
            fontFamily: "var(--serif)", fontSize: "clamp(3rem, 8vw, 6rem)",
            fontWeight: 300, lineHeight: 1.05, color: "var(--text)",
            marginBottom: "1.5rem",
          }}>
            Nguyễn Văn A<br />
            <em style={{ color: "var(--accent)", fontStyle: "italic" }}>Sinh viên Luật</em>
          </h1>
          <p style={{ fontFamily: "var(--sans)", fontSize: "1rem", color: "var(--muted)", maxWidth: "480px", lineHeight: 1.8, marginBottom: "3rem" }}>
            Sinh viên năm nhất ngành Luật Kinh tế. Quan tâm đến LegalTech và ứng dụng AI trong thực hành pháp lý hiện đại.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <button
              onClick={() => scrollTo("projects")}
              style={{
                fontFamily: "var(--sans)", fontSize: "0.8rem", letterSpacing: "0.1em",
                textTransform: "uppercase", padding: "0.75rem 2rem",
                background: "var(--accent)", color: "#000", border: "none",
                cursor: "pointer", fontWeight: 500,
              }}
            >
              Xem dự án →
            </button>
            <button
              onClick={() => scrollTo("summary")}
              style={{
                fontFamily: "var(--sans)", fontSize: "0.8rem", letterSpacing: "0.1em",
                textTransform: "uppercase", padding: "0.75rem 2rem",
                background: "none", color: "var(--muted)",
                border: "1px solid var(--border)", cursor: "pointer",
              }}
            >
              Tổng kết
            </button>
          </div>
        </motion.div>

        {/* Decorative line */}
        <div style={{ position: "absolute", right: "5vw", top: "20vh", width: "1px", height: "40vh", background: "linear-gradient(to bottom, transparent, var(--border), transparent)" }} />
      </section>

      {/* ABOUT STRIP */}
      <section style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "3rem 2rem", background: "var(--bg2)" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem" }}>
          {[
            { label: "Trường", value: "Đại học [Tên trường]" },
            { label: "Ngành", value: "Luật Kinh tế" },
            { label: "Khóa", value: "K25 — 2024" },
            { label: "Học phần", value: "Nhập môn Công nghệ số & AI" },
          ].map((item) => (
            <FadeIn key={item.label}>
              <p style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.4rem" }}>{item.label}</p>
              <p style={{ fontFamily: "var(--serif)", fontSize: "1.1rem", color: "var(--text)", fontWeight: 400 }}>{item.value}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ padding: "6rem 2rem", maxWidth: "900px", margin: "0 auto" }}>
        <FadeIn>
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.75rem" }}>Kết quả học tập</p>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 300, color: "var(--text)", marginBottom: "4rem" }}>
            Các bài tập<br /><em style={{ fontStyle: "italic", color: "var(--muted)" }}>đã hoàn thành</em>
          </h2>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1px", background: "var(--border)" }}>
          {PROJECTS.map((p, i) => (
            <FadeIn key={p.id} delay={i * 0.05}>
              <div
                style={{
                  background: "var(--bg2)", padding: "2rem",
                  transition: "background 0.2s",
                  cursor: "default",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "var(--surface)")}
                onMouseLeave={e => (e.currentTarget.style.background = "var(--bg2)")}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                  <span style={{ fontFamily: "var(--serif)", fontSize: "2rem", color: "var(--border)", fontWeight: 300 }}>{p.id}</span>
                  <span style={{
                    fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "uppercase",
                    padding: "3px 10px", background: "rgba(201,169,110,0.12)", color: "var(--accent)",
                    borderRadius: "2px"
                  }}>{p.status}</span>
                </div>
                <p style={{ fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.5rem" }}>{p.topic}</p>
                <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.2rem", color: "var(--text)", fontWeight: 400, marginBottom: "0.75rem", lineHeight: 1.3 }}>{p.title}</h3>
                <p style={{ fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.7, marginBottom: "1.25rem" }}>{p.desc}</p>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {p.tags.map(t => (
                    <span key={t} style={{ fontSize: "0.65rem", letterSpacing: "0.08em", padding: "3px 8px", border: "1px solid var(--border)", color: "var(--muted)", borderRadius: "2px" }}>{t}</span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* SUMMARY */}
      <section id="summary" style={{ borderTop: "1px solid var(--border)", padding: "6rem 2rem", background: "var(--bg2)" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <FadeIn>
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.75rem" }}>Tổng kết</p>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 300, color: "var(--text)", marginBottom: "2.5rem" }}>
              Nhìn lại hành trình<br /><em style={{ fontStyle: "italic", color: "var(--muted)" }}>học tập</em>
            </h2>
          </FadeIn>
          {[
            { q: "Kỹ năng quan trọng nhất", a: "Khả năng viết Prompt hiệu quả và đánh giá độ tin cậy thông tin — hai kỹ năng thiết yếu cho nghiên cứu pháp lý trong kỷ nguyên AI." },
            { q: "Khó khăn & cách vượt qua", a: "Ban đầu lúng túng với các công cụ số mới. Giải quyết bằng cách thực hành lặp lại và tham khảo tài liệu hướng dẫn chính thức." },
            { q: "Định hướng tương lai", a: "Ứng dụng AI trong nghiên cứu án lệ, soạn thảo hợp đồng và phân tích văn bản pháp luật — hướng đến hành nghề Luật thế hệ mới." },
          ].map((item, i) => (
            <FadeIn key={item.q} delay={i * 0.1}>
              <div style={{ borderTop: "1px solid var(--border)", padding: "2rem 0", display: "grid", gridTemplateColumns: "200px 1fr", gap: "2rem" }}>
                <p style={{ fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent)", paddingTop: "0.2rem" }}>{item.q}</p>
                <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8 }}>{item.a}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid var(--border)", padding: "2rem", textAlign: "center" }}>
        <p style={{ fontSize: "0.75rem", color: "var(--muted)", letterSpacing: "0.08em" }}>
          © 2024 · Portfolio Digital · Nhập môn Công nghệ số & AI
        </p>
      </footer>
    </div>
  );
}
