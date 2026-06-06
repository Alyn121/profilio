"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Assignment1 from "./components/Assignment1";
import Assignment2 from "./components/Assignment2";
import Assignment3 from "./components/Assignment3";

const NAV = ["Giới thiệu", "Dự án", "Tổng kết"];

const PROJECTS = [
  {
    id: "01",
    title: "Máy tính & thiết bị ngoại vi",
    topic: "Bài tập 1 & 1.4",
    goal: "Nắm vững thao tác quản lý tệp tin, thư mục và tổ chức dữ liệu học tập hiệu quả.",
    process: [
      "Xây dựng cấu trúc thư mục theo học kỳ: K67D_HK1 → Luật-Dan-Su → Tai-lieu / Bai-tap / De-cuong",
      "Áp dụng quy tắc đặt tên: ngày_tháng_nội-dung (vd: 2024-03-01_Hop-dong-dan-su.pdf)",
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
    hasComponent: false,
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
    hasComponent: false,
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
    hasComponent: false,
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
          <p style={{ fontFamily: "var(--sans)", fontSize: "0.75rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "1.5rem" }}>
            Digital Portfolio · Nhập môn Công nghệ số & AI
          </p>
          <h1 style={{ fontFamily: "var(--serif)", fontSize: "clamp(2.8rem, 7vw, 5.5rem)", fontWeight: 300, lineHeight: 1.05, color: "var(--text)", marginBottom: "1.5rem" }}>
            Lò Văn Tiến<br />
            <em style={{ color: "var(--accent)", fontStyle: "italic" }}>Sinh viên Luật</em>
          </h1>

          <p style={{ fontFamily: "var(--sans)", fontSize: "0.95rem", color: "var(--muted)", maxWidth: "500px", lineHeight: 1.85, marginBottom: "2rem" }}>
            Sinh viên năm nhất ngành <strong style={{ color: "var(--text)" }}>Luật học</strong> — Trường Đại học Luật, ĐHQGHN · Lớp K67D · MSSV 22061380.<br />
            Quan tâm đến <strong style={{ color: "var(--text)" }}>Luật Dân sự</strong>, quyền con người và ứng dụng công nghệ trong hành nghề pháp lý (LegalTech).
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
              <p style={{ fontSize: "0.65rem", letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.35rem" }}>{item.label}</p>
              <p style={{ fontFamily: "var(--serif)", fontSize: "1.05rem", color: "var(--text)", fontWeight: 400 }}>{item.value}</p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ padding: "5rem 2rem", maxWidth: "960px", margin: "0 auto" }}>
        <FadeIn>
          <p style={{ fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.75rem" }}>Kết quả học tập</p>
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

      {/* BLDS CALLOUT */}
      <section style={{ borderTop: "1px solid var(--border)", background: "var(--bg2)", padding: "4rem 2rem" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <FadeIn>
            <p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.75rem" }}>Kiến thức nền tảng</p>
            <h2 style={{ fontFamily: "var(--serif)", fontSize: "clamp(1.5rem, 3vw, 2.2rem)", fontWeight: 300, color: "var(--text)", marginBottom: "2.5rem" }}>
              Bộ Luật Dân Sự Việt Nam 2015 <em style={{ color: "var(--muted)", fontStyle: "italic" }}>— Nền tảng học tập</em>
            </h2>
          </FadeIn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1px", background: "var(--border)" }}>
            {[
              { no: "689 điều", label: "Bố cục", desc: "6 phần, 27 chương, có hiệu lực từ 01/01/2017" },
              { no: "5 nguyên tắc", label: "Điều 3 BLDS", desc: "Bình đẳng, tự do ý chí, thiện chí, tự chịu trách nhiệm, tôn trọng lợi ích Nhà nước" },
              { no: "Hợp đồng", label: "Phần thứ ba", desc: "Điều 385–429 quy định giao kết, hiệu lực, thực hiện và chấm dứt hợp đồng" },
              { no: "Bồi thường", label: "Điều 584–608", desc: "Trách nhiệm bồi thường thiệt hại ngoài hợp đồng — căn cứ phát sinh và nguyên tắc bồi thường" },
            ].map((item, i) => (
              <FadeIn key={item.no} delay={i * 0.07}>
                <div style={{ background: "var(--bg2)", padding: "1.5rem", transition: "background 0.2s" }}
                  onMouseEnter={e => (e.currentTarget.style.background = "var(--surface)")}
                  onMouseLeave={e => (e.currentTarget.style.background = "var(--bg2)")}>
                  <p style={{ fontFamily: "var(--serif)", fontSize: "1.4rem", color: "var(--accent)", marginBottom: "0.3rem", fontWeight: 400 }}>{item.no}</p>
                  <p style={{ fontSize: "0.65rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.5rem" }}>{item.label}</p>
                  <p style={{ fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* 📸 GỢI Ý CHÈN ẢNH BLDS */}
          <FadeIn delay={0.3}>
            <div style={{ marginTop: "2rem", background: "rgba(201,169,110,0.07)", border: "1px dashed rgba(201,169,110,0.35)", borderRadius: "4px", padding: "1.25rem 1.5rem" }}>
              <p style={{ fontSize: "0.75rem", color: "var(--accent)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.4rem" }}>📸 GỢI Ý HÌNH ẢNH CHO PHẦN NÀY</p>
              <p style={{ fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.7 }}>
                Có thể chèn: (1) Ảnh bìa Bộ Luật Dân sự 2015 (tải từ vbpl.vn) · (2) Sơ đồ cấu trúc 6 phần của BLDS bạn tự vẽ bằng Canva · (3) Ảnh chụp buổi học môn Luật Dân sự trên lớp
              </p>
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

          {/* 📸 GỢI Ý ẢNH TỔNG KẾT */}
          <FadeIn delay={0.5}>
            <div style={{ marginTop: "1.5rem", background: "rgba(201,169,110,0.07)", border: "1px dashed rgba(201,169,110,0.35)", borderRadius: "4px", padding: "1.25rem 1.5rem" }}>
              <p style={{ fontSize: "0.75rem", color: "var(--accent)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.4rem" }}>📸 GỢI Ý ẢNH CHO TRANG TỔNG KẾT</p>
              <p style={{ fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.7 }}>
                Chèn ảnh chụp tại trường ĐH Luật ĐHQGHN, ảnh với nhóm học tập K67D, hoặc ảnh chụp màn hình kết quả môn học để minh chứng quá trình học.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid var(--border)", padding: "2rem", textAlign: "center", background: "var(--bg2)" }}>
        <p style={{ fontFamily: "var(--serif)", fontSize: "1rem", color: "var(--accent)", marginBottom: "0.4rem" }}>Lò Văn Tiến · 22061380</p>
        <p style={{ fontSize: "0.72rem", color: "var(--muted)", letterSpacing: "0.08em" }}>
          K67D · Luật học · Trường Đại học Luật, ĐHQGHN · 2024
        </p>
      </footer>

      {/* ═══════ PROJECT DETAIL DRAWER ═══════ */}
      <ProjectDrawer project={activeProject} onClose={handleClose} />
    </div>
  );
}
