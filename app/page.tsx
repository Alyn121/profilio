"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Assignment1 from "./components/Assignment1";
import Assignment2 from "./components/Assignment2";
import Assignment3 from "./components/Assignment3";
import Assignment4 from "./components/Assignment4";
import Assignment5 from "./components/Assignment5";
import Assignment6 from "./components/Assignment6";

const NAV = ["Giới thiệu", "Dự án", "Tổng kết"];

const PROJECTS = [
  {
    id: "01",
    title: "Máy tính & thiết bị ngoại vi",
    topic: "Bài tập 1 & 1.4",
    goal: "Nắm vững thao tác quản lý tệp tin, thư mục và tổ chức dữ liệu học tập hiệu quả.",
    process: [
      "Xây dựng cấu trúc thư mục theo học kỳ: K67D_HK1 → Luật-Dan-Su → Tai-lieu / Bai-tap / De-cuong",
      "Áp dụng quy tắc đặt tên: ngày_tháng_nội-dung (vd: 2026-03-01_Hop-dong-dan-su.pdf)",
      "Phân loại tài liệu pháp luật theo từng chương của BLDS 2015",
    ],
    outcome: "Cấu trúc thư mục hoàn chỉnh, ảnh màn hình minh họa, file PDF mô tả quy tắc đặt tên.",
    tags: ["File System", "Quản lý dữ liệu"],
    imgHint: "📁 CHÈN ẢNH: Chụp màn hình cấu trúc thư mục thực tế trên máy tính của bạn",
    hasComponent: true,
  },
  {
    id: "02",
    title: "Khai thác dữ liệu & thông tin",
    topic: "Bài tập 2",
    goal: "Thành thạo tìm kiếm, đánh giá và khai thác thông tin pháp lý chính thống.",
    process: [
      "Sử dụng tìm kiếm nâng cao: site:thuvienphapluat.vn \"hợp đồng dân sự\" OR \"bồi thường thiệt hại\"",
      "Đánh giá nguồn: ưu tiên vbpl.vn (văn bản pháp luật), thuvienphapluat.vn, cổng thông tin Bộ Tư pháp",
      "Tra cứu BLDS 2015 Điều 385–429 về hợp đồng, Điều 584–608 về bồi thường thiệt hại ngoài hợp đồng",
    ],
    outcome: "Bảng so sánh nguồn thông tin pháp lý, quy trình tra cứu văn bản quy phạm pháp luật.",
    tags: ["Research", "Legal Research", "BLDS 2015"],
    imgHint: "🔍 CHÈN ẢNH: Chụp màn hình kết quả tìm kiếm pháp lý trên thuvienphapluat.vn hoặc vbpl.vn",
    hasComponent: true,
  },
  {
    id: "03",
    title: "Viết Prompt hiệu quả cho AI",
    topic: "Bài tập 3",
    goal: "Tối ưu hóa Prompt AI để hỗ trợ nghiên cứu và học tập Luật Dân sự.",
    process: [
      "Prompt ban đầu (yếu): \"Giải thích về hợp đồng dân sự\"",
      "Prompt cải tiến: \"Theo BLDS 2015, hãy phân tích điều kiện có hiệu lực của hợp đồng dân sự (Điều 117), cho ví dụ thực tế về hợp đồng vô hiệu và hậu quả pháp lý tương ứng\"",
      "So sánh kết quả: Prompt cải tiến cho câu trả lời có căn cứ pháp lý, ví dụ cụ thể và phân tích sâu hơn",
    ],
    outcome: "Bảng so sánh 5 cặp Prompt trước/sau; hướng dẫn viết Prompt cho sinh viên Luật.",
    tags: ["Prompt Engineering", "AI", "LegalTech"],
    imgHint: "🤖 CHÈN ẢNH: Chụp màn hình 2 câu trả lời của AI – một với prompt cũ, một với prompt mới để so sánh",
    hasComponent: true,
  },
  {
    id: "04",
    title: "Giao tiếp & hợp tác môi trường số",
    topic: "Bài tập 4",
    goal: "Sử dụng thành thạo công cụ họp trực tuyến và làm việc nhóm trong học tập Luật.",
    process: [
      "Thực hành họp nhóm qua Google Meet để thảo luận tình huống pháp lý Luật Dân sự",
      "Sử dụng Google Docs cộng tác soạn thảo bài phân tích án lệ theo thời gian thực",
      "Phân công vai trò: người dẫn (facilitator), người ghi biên bản, người phản biện",
    ],
    outcome: "Ảnh chụp màn hình buổi họp, biên bản cuộc họp, link Google Docs tài liệu nhóm.",
    tags: ["Collaboration", "Google Meet", "Teamwork"],
    imgHint: "💻 CHÈN ẢNH: Chụp màn hình buổi họp nhóm trên Google Meet / Zoom với các thành viên",
    hasComponent: true,
  },
  {
    id: "05",
    title: "Sáng tạo nội dung số với AI",
    topic: "Bài tập 5",
    goal: "Ứng dụng AI tạo nội dung hỗ trợ học và truyền thông kiến thức Luật Dân sự.",
    process: [
      "Dùng Claude/ChatGPT soạn infographic tóm tắt 5 nguyên tắc cơ bản BLDS 2015 (Điều 3)",
      "Dùng Canva tạo sơ đồ các loại hợp đồng dân sự phổ biến: mua bán, thuê, vay tài sản, tặng cho",
      "Tạo video ngắn (Loom/Canva) giải thích quy trình giải quyết tranh chấp dân sự ngoài tòa án",
    ],
    outcome: "Infographic BLDS 2015, sơ đồ phân loại hợp đồng, video giải thích quy trình hòa giải.",
    tags: ["Generative AI", "Canva", "Legal Content"],
    imgHint: "🎨 CHÈN ẢNH/VIDEO: Đính kèm infographic hoặc sơ đồ bạn đã tạo bằng Canva / AI",
    hasComponent: true,
  },
  {
    id: "06",
    title: "AI và đạo đức trong môi trường số",
    topic: "Bài tập 6",
    goal: "Hiểu rõ nguyên tắc sử dụng AI có trách nhiệm, đặc biệt trong bối cảnh nghề luật.",
    process: [
      "Nghiên cứu 5 nguyên tắc AI có trách nhiệm: minh bạch, công bằng, bảo mật, trách nhiệm giải trình, lấy con người làm trung tâm",
      "Phân tích rủi ro AI trong pháp lý: hallucination (bịa đặt căn cứ pháp luật), thiếu cập nhật văn bản mới, thiên kiến trong xét xử",
      "Bài học: Luôn xác minh điều luật AI trích dẫn từ nguồn chính thống; AI là công cụ hỗ trợ, không thay thế phán đoán pháp lý",
    ],
    outcome: "Bài phân tích về đạo đức AI trong hành nghề Luật; checklist kiểm tra đầu ra AI cho sinh viên Luật.",
    tags: ["AI Ethics", "Responsible AI", "Legal Ethics"],
    imgHint: "📊 CHÈN ẢNH: Infographic hoặc bảng tổng hợp các nguyên tắc sử dụng AI có trách nhiệm",
    hasComponent: true,
  },
];

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

/* ──────────────────── ASSIGNMENT COMPONENT MAP ──────────────────── */
function AssignmentContent({ id }: { id: string }) {
  switch (id) {
    case "01": return <Assignment1 />;
    case "02": return <Assignment2 />;
    case "03": return <Assignment3 />;
    case "04": return <Assignment4 />;
    case "05": return <Assignment5 />;
    case "06": return <Assignment6 />;
    default: return null;
  }
}

/* ──────────────────── DRAWER PANEL ──────────────────── */
function ProjectDrawer({
  project,
  onClose,
}: {
  project: typeof PROJECTS[number] | null;
  onClose: () => void;
}) {
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  // Scroll to top when project changes
  useEffect(() => {
    if (project && drawerRef.current) {
      drawerRef.current.scrollTop = 0;
    }
  }, [project]);

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 90,
              background: "rgba(0,0,0,0.6)",
              backdropFilter: "blur(4px)",
              cursor: "pointer",
            }}
          />

          {/* Drawer */}
          <motion.div
            ref={drawerRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              width: "min(680px, 90vw)",
              zIndex: 100,
              background: "var(--bg)",
              borderLeft: "1px solid var(--border)",
              overflowY: "auto",
              overflowX: "hidden",
              boxShadow: "-20px 0 60px rgba(0,0,0,0.4)",
            }}
          >
            {/* Drawer Header */}
            <div style={{
              position: "sticky",
              top: 0,
              zIndex: 10,
              background: "rgba(12,12,14,0.95)",
              backdropFilter: "blur(12px)",
              borderBottom: "1px solid var(--border)",
              padding: "1rem 1.75rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <span style={{
                  fontFamily: "var(--serif)",
                  fontSize: "1.5rem",
                  color: "var(--accent)",
                  fontWeight: 300,
                  opacity: 0.6,
                }}>
                  {project.id}
                </span>
                <div>
                  <p style={{
                    fontSize: "0.6rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--muted)",
                    marginBottom: "2px",
                  }}>
                    {project.topic}
                  </p>
                  <h3 style={{
                    fontFamily: "var(--serif)",
                    fontSize: "1.05rem",
                    color: "var(--text)",
                    fontWeight: 400,
                    lineHeight: 1.3,
                  }}>
                    {project.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={onClose}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: "8px",
                  width: "36px",
                  height: "36px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "var(--muted)",
                  fontSize: "1.1rem",
                  transition: "all 0.2s",
                  flexShrink: 0,
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "var(--bg3)";
                  e.currentTarget.style.color = "var(--text)";
                  e.currentTarget.style.borderColor = "var(--accent)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "var(--surface)";
                  e.currentTarget.style.color = "var(--muted)";
                  e.currentTarget.style.borderColor = "var(--border)";
                }}
              >
                ✕
              </button>
            </div>

            {/* Drawer Body */}
            <div style={{ padding: "2rem 1.75rem 3rem" }}>
              {/* Tags */}
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "2rem" }}>
                {project.tags.map(t => (
                  <span key={t} style={{
                    fontSize: "0.62rem",
                    letterSpacing: "0.08em",
                    padding: "4px 10px",
                    border: "1px solid var(--border)",
                    color: "var(--muted)",
                    borderRadius: "4px",
                  }}>
                    {t}
                  </span>
                ))}
              </div>

              {/* Goal */}
              <div style={{ marginBottom: "2rem" }}>
                <p style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  marginBottom: "0.6rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}>
                  <span style={{ fontSize: "0.85rem" }}>🎯</span> Mục tiêu
                </p>
                <p style={{
                  fontSize: "0.9rem",
                  color: "var(--muted)",
                  lineHeight: 1.85,
                  paddingLeft: "0.5rem",
                  borderLeft: "2px solid rgba(201,169,110,0.3)",
                }}>
                  {project.goal}
                </p>
              </div>

              {/* Process */}
              <div style={{ marginBottom: "2rem" }}>
                <p style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  marginBottom: "0.8rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}>
                  <span style={{ fontSize: "0.85rem" }}>⚙️</span> Quá trình thực hiện
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  {project.process.map((step, si) => (
                    <div key={si} style={{
                      display: "flex",
                      gap: "0.75rem",
                      alignItems: "flex-start",
                      padding: "0.75rem 1rem",
                      background: "var(--surface)",
                      borderRadius: "6px",
                      border: "1px solid var(--border)",
                    }}>
                      <span style={{
                        width: "22px",
                        height: "22px",
                        borderRadius: "50%",
                        background: "rgba(201,169,110,0.12)",
                        color: "var(--accent)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        flexShrink: 0,
                        marginTop: "1px",
                      }}>
                        {si + 1}
                      </span>
                      <p style={{ fontSize: "0.83rem", color: "var(--muted)", lineHeight: 1.7 }}>{step}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Outcome */}
              <div style={{ marginBottom: "2rem" }}>
                <p style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--accent)",
                  marginBottom: "0.6rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}>
                  <span style={{ fontSize: "0.85rem" }}>📦</span> Sản phẩm cuối cùng
                </p>
                <p style={{
                  fontSize: "0.85rem",
                  color: "var(--muted)",
                  lineHeight: 1.85,
                  paddingLeft: "0.5rem",
                  borderLeft: "2px solid rgba(201,169,110,0.3)",
                }}>
                  {project.outcome}
                </p>
              </div>

              {/* Divider */}
              <div style={{
                height: "1px",
                background: "linear-gradient(to right, var(--accent), transparent)",
                margin: "2rem 0",
                opacity: 0.3,
              }} />

              {/* Assignment Component */}
              {project.hasComponent ? (
                <div>
                  <p style={{
                    fontSize: "0.65rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "var(--accent)",
                    marginBottom: "1.25rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                  }}>
                    <span style={{ fontSize: "0.85rem" }}>📝</span> Nội dung bài tập chi tiết
                  </p>
                  <AssignmentContent id={project.id} />
                </div>
              ) : (
                /* Image Hint for assignments without component */
                <div style={{
                  background: "rgba(201,169,110,0.06)",
                  border: "1px dashed rgba(201,169,110,0.35)",
                  borderRadius: "8px",
                  padding: "1.25rem 1.5rem",
                }}>
                  <p style={{
                    fontSize: "0.65rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--accent)",
                    marginBottom: "0.5rem",
                  }}>
                    📝 Nội dung bài tập
                  </p>
                  <p style={{ fontSize: "0.8rem", color: "var(--accent2)", lineHeight: 1.7 }}>
                    {project.imgHint}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ──────────────────── MAIN PAGE ──────────────────── */
export default function Home() {
  const [active, setActive] = useState("Giới thiệu");
  const [scrolled, setScrolled] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const handleClose = useCallback(() => setSelectedProject(null), []);

  const activeProject = PROJECTS.find(p => p.id === selectedProject) || null;

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
        display: "flex", alignItems: "center", justifyContent: "space-between", height: "60px",
      }}>
        <span style={{ fontFamily: "var(--serif)", fontSize: "1.1rem", color: "var(--accent)", letterSpacing: "0.05em" }}>LVT.</span>
        <div style={{ display: "flex", gap: "2rem" }}>
          {NAV.map((n) => (
            <button key={n} onClick={() => { setActive(n); scrollTo(n === "Giới thiệu" ? "hero" : n === "Dự án" ? "projects" : "summary"); }}
              style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "var(--sans)", fontSize: "0.8rem", fontWeight: 400, color: active === n ? "var(--accent)" : "var(--muted)", letterSpacing: "0.08em", textTransform: "uppercase", transition: "color 0.2s" }}>
              {n}
            </button>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center", gap: "3rem", padding: "0 2rem", maxWidth: "1200px", margin: "0 auto", position: "relative" }}>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
          <p style={{ fontFamily: "var(--sans)", fontSize: "0.75rem", letterSpacing: "0em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "1.5rem" }}>
            Digital Portfolio · Nhập môn Công nghệ số & AI
          </p>
          <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(2.8rem, 7vw, 5.5rem)", fontWeight: 300, lineHeight: 1.05, color: "var(--text)", marginBottom: "1.5rem" }}>
            Lò Văn Tiến<br />
            <em style={{ color: "var(--accent)", fontStyle: "italic" }}>Sinh viên Luật</em>
          </h1>

          <p style={{ fontFamily: "var(--sans)", fontSize: "0.95rem", color: "var(--muted)", maxWidth: "550px", lineHeight: 1.85, marginBottom: "2rem" }}>
            Sinh viên năm 4 ngành <strong style={{ color: "var(--text)" }}>Luật học</strong> — Trường Đại học Luật, ĐHQGHN · Lớp K67D · MSSV 22061380.<br />
            Là một người đam mê khám phá và không ngừng tìm tòi học hỏi, tôi luôn tò mò về cách công nghệ định hình thế giới. Tôi đặc biệt quan tâm đến <strong style={{ color: "var(--text)" }}>Luật Dân sự</strong> và việc ứng dụng trí tuệ nhân tạo (AI) để tối ưu hóa quy trình hành nghề pháp lý (LegalTech).
          </p>
          <p style={{ fontFamily: "var(--sans)", fontSize: "0.85rem", color: "var(--muted)", maxWidth: "500px", lineHeight: 1.8, marginBottom: "2.5rem", fontStyle: "italic" }}>
            &ldquo;Portfolio này tổng hợp các kỹ năng số tôi đã học trong học phần Nhập môn Công nghệ số & AI, đồng thời là nơi lưu trữ và chia sẻ hành trình học tập của bản thân.&rdquo;
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <button onClick={() => scrollTo("projects")} style={{ fontFamily: "var(--sans)", fontSize: "0.8rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.75rem 2rem", background: "var(--accent)", color: "#000", border: "none", cursor: "pointer", fontWeight: 500 }}>
              Xem 6 bài tập →
            </button>
            <button onClick={() => scrollTo("summary")} style={{ fontFamily: "var(--sans)", fontSize: "0.8rem", letterSpacing: "0.08em", textTransform: "uppercase", padding: "0.75rem 2rem", background: "none", color: "var(--muted)", border: "1px solid var(--border)", cursor: "pointer" }}>
              Tổng kết
            </button>
          </div>
        </motion.div>

        {/* 📸 PROFILE IMAGE - SIDE */}
        <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, delay: 0.2 }} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ width: "100%", maxWidth: "400px", overflow: "hidden", borderRadius: "12px", border: "1px solid var(--border)", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
            <Image 
              src="/profile-avatar.jpg" 
              alt="Lò Văn Tiến - Sinh viên Luật K67D"
              width={400}
              height={400}
              priority
              style={{ width: "100%", height: "auto", display: "block" }}
            />
          </div>
        </motion.div>

        <div style={{ position: "absolute", right: "4vw", top: "15vh", width: "1px", height: "45vh", background: "linear-gradient(to bottom, transparent, var(--border), transparent)" }} />
      </section>

      {/* INFO STRIP */}
      <section style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "2.5rem 2rem", background: "var(--bg2)" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "2rem" }}>
          {[
            { label: "Họ và tên", value: "Lò Văn Tiến" },
            { label: "MSSV", value: "22061380" },
            { label: "Lớp", value: "K67D — Luật học" },
            { label: "Trường", value: "ĐH Luật, ĐHQGHN" },
          ].map((item) => (
            <FadeIn key={item.label}>
              <p style={{ fontSize: "0.65rem", letterSpacing: "0em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.35rem" }}>{item.label}</p>
              <p style={{ fontFamily: "var(--serif)", fontSize: "1.05rem", color: "var(--text)", fontWeight: 400 }}>{item.value}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ padding: "5rem 2rem", maxWidth: "960px", margin: "0 auto" }}>
        <FadeIn>
          <p style={{ fontSize: "0.7rem", letterSpacing: "0em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.75rem" }}>Kết quả học tập</p>
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(2rem, 5vw, 3.2rem)", fontWeight: 300, color: "var(--text)", marginBottom: "0.75rem" }}>
            6 Bài tập <em style={{ fontStyle: "italic", color: "var(--muted)" }}>đã hoàn thành</em>
          </h2>
          <p style={{ fontSize: "0.85rem", color: "var(--muted)", marginBottom: "3.5rem", maxWidth: "500px" }}>
            Nhấn vào từng thẻ để xem chi tiết mục tiêu, quá trình thực hiện và sản phẩm cuối cùng.
          </p>
        </FadeIn>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1px", background: "var(--border)" }}>
          {PROJECTS.map((p, i) => (
            <FadeIn key={p.id} delay={i * 0.06}>
              <div
                onClick={() => setSelectedProject(p.id)}
                style={{
                  background: selectedProject === p.id ? "var(--surface)" : "var(--bg2)",
                  padding: "1.75rem",
                  transition: "all 0.25s ease",
                  cursor: "pointer",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.background = "var(--bg3)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-1px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.background = selectedProject === p.id ? "var(--surface)" : "var(--bg2)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                }}
              >
                {/* Active indicator */}
                {selectedProject === p.id && (
                  <div style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    background: "var(--accent)",
                  }} />
                )}

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                  <span style={{ fontFamily: "var(--serif)", fontSize: "2rem", color: "var(--border)", fontWeight: 300 }}>{p.id}</span>
                  <span style={{
                    fontSize: "0.65rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    padding: "3px 10px",
                    background: "rgba(201,169,110,0.12)",
                    color: "var(--accent)",
                    borderRadius: "2px",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px",
                  }}>
                    Xem chi tiết →
                  </span>
                </div>
                <p style={{ fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.4rem" }}>{p.topic}</p>
                <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.15rem", color: "var(--text)", fontWeight: 400, marginBottom: "0.75rem", lineHeight: 1.3 }}>{p.title}</h3>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {p.tags.map(t => (
                    <span key={t} style={{ fontSize: "0.62rem", letterSpacing: "0.08em", padding: "3px 8px", border: "1px solid var(--border)", color: "var(--muted)", borderRadius: "2px" }}>{t}</span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* KIẾN THỨC NỀN TẢNG - BLDS 2015 */}
      <section style={{ borderTop: "1px solid var(--border)", background: "var(--bg2)", padding: "5rem 2rem" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <FadeIn>
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.75rem" }}>Kiến thức chuyên ngành</p>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(2rem, 4vw, 2.8rem)", fontWeight: 300, color: "var(--text)", marginBottom: "1.5rem" }}>
              Bộ Luật Dân Sự 2015 <br/>
              <em style={{ color: "var(--muted)", fontStyle: "italic", fontSize: "0.8em" }}>Đạo luật gốc của Hệ thống pháp luật tư</em>
            </h2>
            <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, maxWidth: "700px", marginBottom: "3rem" }}>
              Bộ luật Dân sự 2015 không chỉ là một văn bản quy phạm pháp luật, mà còn là nền tảng cốt lõi điều chỉnh mọi quan hệ xã hội phát sinh trên cơ sở bình đẳng, tự do ý chí và tự chịu trách nhiệm. Trong bối cảnh số hóa, việc nắm vững BLDS 2015 là chìa khóa để xây dựng các giải pháp LegalTech và tư vấn pháp lý AI chính xác.
            </p>
          </FadeIn>

          {/* Cấu trúc 6 phần */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem", marginBottom: "4rem" }}>
            {[
              { part: "Phần 1", title: "Quy định chung", details: "Điều 1 - 150: Nguyên tắc cơ bản, Năng lực hành vi, Giao dịch dân sự, Đại diện, Thời hiệu." },
              { part: "Phần 2", title: "Quyền sở hữu và Quyền khác", details: "Điều 151 - 273: Chiếm hữu, Quyền sở hữu, Quyền đối với tài sản của người khác." },
              { part: "Phần 3", title: "Nghĩa vụ và Hợp đồng", details: "Điều 274 - 608: Thực hiện nghĩa vụ, Bảo đảm nghĩa vụ, Hợp đồng thông dụng, Bồi thường ngoài hợp đồng." },
              { part: "Phần 4", title: "Thừa kế", details: "Điều 609 - 662: Thừa kế theo di chúc, Thừa kế theo pháp luật, Thanh toán và Phân chia di sản." },
              { part: "Phần 5", title: "Pháp luật áp dụng", details: "Điều 663 - 687: Quan hệ dân sự có yếu tố nước ngoài, Áp dụng pháp luật nước ngoài, Xung đột pháp luật." },
              { part: "Phần 6", title: "Điều khoản thi hành", details: "Điều 688 - 689: Hiệu lực thi hành và Quy định chuyển tiếp." },
            ].map((item, i) => (
              <FadeIn key={item.part} delay={i * 0.1}>
                <div style={{ 
                  background: "var(--surface)", 
                  padding: "1.5rem", 
                  borderRadius: "8px", 
                  border: "1px solid var(--border)",
                  height: "100%",
                  transition: "transform 0.2s, background 0.2s"
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.background = "var(--bg3)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.background = "var(--surface)";
                  (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
                }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", marginBottom: "1rem" }}>
                    <span style={{ fontSize: "0.7rem", color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 500 }}>{item.part}</span>
                    <h4 style={{ fontFamily: "var(--serif)", fontSize: "1.2rem", color: "var(--text)", fontWeight: 400 }}>{item.title}</h4>
                  </div>
                  <p style={{ fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.6 }}>{item.details}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Thay thế Placeholder bằng nội dung thực tế */}
          <FadeIn delay={0.3}>
            <div style={{ 
              background: "linear-gradient(145deg, var(--surface), var(--bg))", 
              border: "1px solid rgba(201,169,110,0.15)", 
              borderRadius: "12px", 
              overflow: "hidden",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            }}>
              {/* Nội dung diễn giải */}
              <div style={{ padding: "3rem 2.5rem", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.6rem", color: "var(--accent)", marginBottom: "1rem" }}>
                  Hệ thống hóa Tư duy Pháp lý
                </h3>
                <p style={{ fontSize: "0.95rem", color: "var(--muted)", lineHeight: 1.8, marginBottom: "2rem" }}>
                  Việc hệ thống hóa 689 điều luật thành sơ đồ trực quan không chỉ giúp ghi nhớ nhanh cấu trúc mà còn hỗ trợ quá trình đối chiếu, so sánh và suy luận pháp lý một cách logic. Dưới đây là sơ đồ Mind Map tổng hợp khối lượng kiến thức đồ sộ của môn học, được thực hiện với sự hỗ trợ của các công cụ số chuyên dụng.
                </p>
                <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                  <span style={{ fontSize: "0.75rem", padding: "6px 14px", background: "rgba(201,169,110,0.08)", color: "var(--accent)", borderRadius: "20px", border: "1px solid rgba(201,169,110,0.2)", letterSpacing: "0.05em" }}>✓ Tư duy hệ thống</span>
                  <span style={{ fontSize: "0.75rem", padding: "6px 14px", background: "rgba(201,169,110,0.08)", color: "var(--accent)", borderRadius: "20px", border: "1px solid rgba(201,169,110,0.2)", letterSpacing: "0.05em" }}>✓ Trực quan hóa dữ liệu</span>
                </div>
              </div>
              
              {/* Hình ảnh sơ đồ */}
              <div style={{ background: "rgba(0,0,0,0.2)", borderLeft: "1px solid rgba(255,255,255,0.03)", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
                <div style={{ width: "100%", borderRadius: "8px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", boxShadow: "0 10px 30px rgba(0,0,0,0.5)" }}>
                  <img src="/mindmap-blds.png" alt="Sơ đồ tư duy BLDS" style={{ width: "100%", height: "auto", display: "block", filter: "brightness(0.95)" }} />
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* SUMMARY */}
      <section id="summary" style={{ borderTop: "1px solid var(--border)", padding: "5rem 2rem" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <FadeIn>
            <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.75rem" }}>Tổng kết</p>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 300, color: "var(--text)", marginBottom: "3rem" }}>
              Nhìn lại hành trình<br /><em style={{ fontStyle: "italic", color: "var(--muted)" }}>học tập của tôi</em>
            </h2>
          </FadeIn>
          {[
            {
              q: "Trải nghiệm cá nhân",
              a: "Đây là lần đầu tiên tôi tiếp cận AI và các công cụ số một cách có hệ thống. Là sinh viên Luật, ban đầu tôi không nghĩ công nghệ liên quan nhiều đến nghề mình chọn. Nhưng qua học phần này, tôi nhận ra AI có thể là trợ lý đắc lực trong nghiên cứu pháp lý."
            },
            {
              q: "Kỹ năng quan trọng nhất",
              a: "Kỹ năng viết Prompt hiệu quả và đánh giá độ tin cậy của nguồn thông tin pháp lý. Khi AI có thể 'bịa' căn cứ pháp luật, khả năng xác minh thông tin từ nguồn gốc (BLDS, Nghị định, Thông tư) trở nên cực kỳ quan trọng với sinh viên Luật."
            },
            {
              q: "Khó khăn & cách vượt qua",
              a: "Khó khăn lớn nhất là phân biệt thông tin pháp lý chính xác từ AI và thông tin đã lỗi thời hoặc sai lệch. Tôi giải quyết bằng cách luôn đối chiếu mọi điều luật AI đề cập với văn bản gốc trên vbpl.vn hoặc thuvienphapluat.vn."
            },
            {
              q: "Định hướng tương lai",
              a: "Tôi muốn ứng dụng AI để hỗ trợ tra cứu án lệ, tóm tắt văn bản pháp quy và soạn thảo hợp đồng dân sự cơ bản. Mục tiêu dài hạn là trở thành luật sư am hiểu LegalTech, nắm bắt xu hướng số hóa trong ngành Luật Việt Nam."
            },
          ].map((item, i) => (
            <FadeIn key={item.q} delay={i * 0.1}>
              <div style={{ borderTop: "1px solid var(--border)", padding: "2rem 0", display: "grid", gridTemplateColumns: "180px 1fr", gap: "2rem" }}>
                <p style={{ fontSize: "0.7rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent)", paddingTop: "0.2rem", lineHeight: 1.5 }}>{item.q}</p>
                <p style={{ fontSize: "0.9rem", color: "var(--muted)", lineHeight: 1.85 }}>{item.a}</p>
              </div>
            </FadeIn>
          ))}

          {/* Hình ảnh tổng kết (Thay thế Placeholder) */}
          <FadeIn delay={0.5}>
            <div style={{ 
              marginTop: "4rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "1.5rem"
            }}>
              <div style={{
                position: "relative",
                padding: "1rem",
                background: "#fdfcf8",
                borderRadius: "2px",
                boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
                transform: "rotate(-2deg)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                cursor: "pointer",
                maxWidth: "600px",
                width: "100%"
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.transform = "rotate(0deg) scale(1.02)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 30px 60px rgba(0,0,0,0.6)";
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.transform = "rotate(-2deg) scale(1)";
                (e.currentTarget as HTMLDivElement).style.boxShadow = "0 20px 50px rgba(0,0,0,0.5)";
              }}
              >
                {/* Băng dính trang trí */}
                <div style={{
                  position: "absolute",
                  top: "-15px",
                  left: "50%",
                  transform: "translateX(-50%) rotate(2deg)",
                  width: "120px",
                  height: "35px",
                  background: "rgba(255,255,255,0.4)",
                  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
                  zIndex: 10,
                  backdropFilter: "blur(2px)",
                  border: "1px solid rgba(255,255,255,0.5)"
                }} />

                <div style={{ width: "100%", height: "auto", overflow: "hidden", border: "1px solid #e0e0e0" }}>
                  <img src="/image-tongket.jpg" alt="Quá trình thực hành môn học" style={{ width: "100%", display: "block" }} />
                </div>
                
                <p style={{ 
                  fontFamily: "var(--serif)", 
                  color: "#2a2a32", 
                  textAlign: "center", 
                  marginTop: "1.5rem",
                  fontSize: "1.2rem",
                  fontStyle: "italic",
                  letterSpacing: "0.02em"
                }}>
                  "Hành trình công nghệ bắt đầu từ những bước nhỏ nhất."
                </p>
                <p style={{ 
                  textAlign: "center", 
                  fontSize: "0.7rem", 
                  color: "#8a8690", 
                  marginTop: "0.4rem", 
                  fontFamily: "var(--sans)", 
                  textTransform: "uppercase", 
                  letterSpacing: "0.15em" 
                }}>
                  Kỷ niệm môn học · K67D ĐH Luật ĐHQGHN
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid var(--border)", padding: "2rem", textAlign: "center", background: "var(--bg2)" }}>
        <p style={{ fontFamily: "var(--serif)", fontSize: "1rem", color: "var(--accent)", marginBottom: "0.4rem" }}>Lò Văn Tiến · 22061380</p>
        <p style={{ fontSize: "0.72rem", color: "var(--muted)", letterSpacing: "0.08em" }}>
          K67D · Luật học · Trường Đại học Luật, ĐHQGHN · 2026
        </p>
      </footer>

      {/* ═══════ PROJECT DETAIL DRAWER ═══════ */}
      <ProjectDrawer project={activeProject} onClose={handleClose} />
    </div>
  );
}
