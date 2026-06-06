"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────── DATA ─────────────── */

const SEARCH_LEVELS = [
  {
    level: 1,
    label: "Cấp 1 — Tìm kiếm thông thường",
    badge: "Cơ bản",
    badgeColor: "#ef4444",
    query: 'hợp đồng dân sự là gì',
    description: "Kết quả lộn xộn: blog, bài viết quảng cáo luật sư, trang wiki, diễn đàn… lẫn lộn với nguồn chính thống.",
    results: [
      { source: "baovephapluat.vn", type: "Blog pháp luật", note: "Nội dung trích dẫn không rõ nguồn gốc" },
      { source: "luatphucgia.vn", type: "Công ty luật", note: "Quảng cáo dịch vụ xen lẫn" },
      { source: "fpt.com.vn", type: "Trang công nghệ", note: "Không chuyên ngành luật" },
      { source: "congly.vn", type: "Báo điện tử", note: "Bài viết tổng hợp, có thể lỗi thời" },
      { source: "studocu.vn", type: "Tài liệu SV", note: "Không xác minh được tác giả" },
    ],
    verdict: "Kết quả trộn lẫn nhiều nguồn không đáng tin, khó phân biệt đâu là nội dung pháp lý chính xác.",
    icon: "🔍",
  },
  {
    level: 2,
    label: "Cấp 2 — Tìm kiếm nâng cao",
    badge: "Nâng cao",
    badgeColor: "#f59e0b",
    query: '"hợp đồng dân sự" điều kiện có hiệu lực site:thuvienphapluat.vn',
    description: "Kết quả chính xác hơn nhờ toán tử site: lọc chỉ nguồn thuvienphapluat.vn và dấu ngoặc kép khóa cụm từ.",
    results: [
      { source: "thuvienphapluat.vn", type: "Chuyên ngành", note: "Trích dẫn BLDS 2015 Điều 117" },
      { source: "thuvienphapluat.vn", type: "Chuyên ngành", note: "Phân tích điều kiện hiệu lực hợp đồng" },
      { source: "thuvienphapluat.vn", type: "Chuyên ngành", note: "Bài viết có chú thích hiệu lực" },
    ],
    verdict: "Kết quả tập trung vào nguồn đáng tin, nội dung liên quan trực tiếp đến câu hỏi pháp lý.",
    icon: "🎯",
  },
  {
    level: 3,
    label: "Cấp 3 — Tìm thẳng văn bản pháp luật",
    badge: "Chính xác",
    badgeColor: "#22c55e",
    query: 'BLDS 2015 điều 117 điều kiện có hiệu lực hợp đồng site:vbpl.vn',
    description: "Tìm trực tiếp trên cổng Cơ sở dữ liệu quốc gia về văn bản pháp luật — nguồn gốc đáng tin cậy nhất.",
    results: [
      { source: "vbpl.vn", type: "Chính phủ", note: "Văn bản gốc Bộ luật Dân sự 91/2015/QH13" },
      { source: "vbpl.vn", type: "Chính phủ", note: "Điều 117 — Điều kiện có hiệu lực GDDS" },
    ],
    verdict: "Kết quả chỉ chứa văn bản pháp luật gốc do Bộ Tư pháp quản lý — độ tin cậy cao nhất.",
    icon: "⚖️",
  },
];

const LEGAL_SOURCES = [
  {
    name: "thuvienphapluat.vn",
    url: "https://thuvienphapluat.vn",
    purpose: "Tra cứu BLDS, nghị định, thông tư",
    icon: "📚",
    color: "#3b82f6",
  },
  {
    name: "vbpl.vn",
    url: "https://vbpl.vn",
    purpose: "Văn bản gốc của Chính phủ",
    icon: "🏛️",
    color: "#22c55e",
  },
  {
    name: "moj.gov.vn",
    url: "https://moj.gov.vn",
    purpose: "Thông tin pháp lý chính thức từ Bộ Tư pháp",
    icon: "⚖️",
    color: "#a855f7",
  },
];

const RELIABILITY_DATA = [
  {
    source: "vbpl.vn",
    type: "Chính phủ",
    stars: 5,
    reason: "Văn bản pháp luật gốc, do Bộ Tư pháp quản lý. Độ chính xác tuyệt đối.",
    color: "#22c55e",
    icon: "🏛️",
  },
  {
    source: "moj.gov.vn",
    type: "Chính phủ",
    stars: 5,
    reason: "Cổng thông tin Bộ Tư pháp chính thức, có đầy đủ văn bản quy phạm.",
    color: "#22c55e",
    icon: "⚖️",
  },
  {
    source: "thuvienphapluat.vn",
    type: "Chuyên ngành",
    stars: 4,
    reason: "Cập nhật nhanh, có chú thích hiệu lực, nhưng là bên thứ ba.",
    color: "#3b82f6",
    icon: "📚",
  },
  {
    source: "Trang blog luật",
    type: "Blog",
    stars: 2,
    reason: "Không rõ tác giả, có thể đã lỗi thời, thiếu cập nhật sửa đổi.",
    color: "#f59e0b",
    icon: "📝",
  },
  {
    source: "ChatGPT / AI",
    type: "AI",
    stars: 2,
    reason: "Có thể bịa điều luật (hallucination), cần xác minh lại từ nguồn gốc.",
    color: "#ef4444",
    icon: "🤖",
  },
];

const ARTICLE_385 = {
  title: "Điều 385. Khái niệm hợp đồng",
  content: "Hợp đồng là sự thỏa thuận giữa các bên về việc xác lập, thay đổi hoặc chấm dứt quyền, nghĩa vụ dân sự.",
  source: "Bộ luật Dân sự 2015 (Luật số 91/2015/QH13)",
  effectiveDate: "01/01/2017",
};

const ARTICLE_117 = {
  title: "Điều 117. Điều kiện có hiệu lực của giao dịch dân sự",
  conditions: [
    "Chủ thể có năng lực pháp luật dân sự, năng lực hành vi dân sự phù hợp với giao dịch dân sự được xác lập",
    "Chủ thể tham gia giao dịch dân sự hoàn toàn tự nguyện",
    "Mục đích và nội dung của giao dịch dân sự không vi phạm điều cấm của luật, không trái đạo đức xã hội",
  ],
  note: "Hình thức của giao dịch dân sự là điều kiện có hiệu lực của giao dịch dân sự trong trường hợp luật có quy định.",
};

/* ─────────────── STYLES ─────────────── */

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "2.5rem",
  },
  sectionHeader: {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    marginBottom: "1.25rem",
  },
  sectionIcon: {
    width: "36px",
    height: "36px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.1rem",
    flexShrink: 0,
  },
  sectionTitle: {
    fontFamily: "var(--serif)",
    fontSize: "1.15rem",
    fontWeight: 400 as const,
    color: "var(--text)",
    lineHeight: 1.3,
  },
  stepBadge: {
    fontSize: "0.6rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase" as const,
    padding: "3px 10px",
    borderRadius: "12px",
    fontWeight: 500,
    fontFamily: "var(--sans)",
  },
  card: {
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: "8px",
    overflow: "hidden",
    transition: "all 0.3s ease",
  },
  cardHover: {
    borderColor: "rgba(201,169,110,0.35)",
    boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
  },
  queryBox: {
    fontFamily: "'DM Mono', 'Fira Code', monospace",
    fontSize: "0.82rem",
    color: "var(--accent2)",
    background: "rgba(201,169,110,0.08)",
    padding: "0.75rem 1rem",
    borderRadius: "6px",
    border: "1px solid rgba(201,169,110,0.15)",
    lineHeight: 1.6,
    wordBreak: "break-all" as const,
  },
  table: {
    width: "100%",
    borderCollapse: "collapse" as const,
    fontSize: "0.82rem",
  },
  th: {
    textAlign: "left" as const,
    padding: "0.75rem 1rem",
    fontSize: "0.65rem",
    letterSpacing: "0.12em",
    textTransform: "uppercase" as const,
    color: "var(--accent)",
    borderBottom: "1px solid var(--border)",
    fontWeight: 500,
    fontFamily: "var(--sans)",
  },
  td: {
    padding: "0.75rem 1rem",
    color: "var(--muted)",
    borderBottom: "1px solid rgba(42,42,50,0.5)",
    lineHeight: 1.6,
    verticalAlign: "top" as const,
  },
  legalBox: {
    background: "linear-gradient(135deg, rgba(201,169,110,0.08), rgba(201,169,110,0.02))",
    border: "1px solid rgba(201,169,110,0.25)",
    borderRadius: "8px",
    padding: "1.5rem",
    position: "relative" as const,
    overflow: "hidden",
  },
  starFull: {
    color: "#f59e0b",
    fontSize: "0.9rem",
  },
  starEmpty: {
    color: "var(--border)",
    fontSize: "0.9rem",
  },
};

/* ─────────────── COMPONENTS ─────────────── */

function Stars({ count }: { count: number }) {
  return (
    <span style={{ display: "inline-flex", gap: "2px" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} style={i <= count ? styles.starFull : styles.starEmpty}>
          ★
        </span>
      ))}
    </span>
  );
}

function StepIndicator({ step, total }: { step: number; total: number }) {
  return (
    <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
      {Array.from({ length: total }, (_, i) => (
        <div
          key={i}
          style={{
            width: i === step ? "24px" : "8px",
            height: "4px",
            borderRadius: "2px",
            background: i === step ? "var(--accent)" : "var(--border)",
            transition: "all 0.3s ease",
          }}
        />
      ))}
    </div>
  );
}

/* ─────────────── MAIN ─────────────── */

export default function Assignment2() {
  const [activeLevel, setActiveLevel] = useState(0);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [showArticle, setShowArticle] = useState<"385" | "117" | null>(null);

  const currentSearch = SEARCH_LEVELS[activeLevel];

  return (
    <div style={styles.container}>

      {/* ══════════ BƯỚC 1: TÌM KIẾM 3 CẤP ĐỘ ══════════ */}
      <div>
        <div style={styles.sectionHeader}>
          <div style={{ ...styles.sectionIcon, background: "rgba(59,130,246,0.15)", color: "#60a5fa" }}>🔍</div>
          <div>
            <p style={{ fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.2rem" }}>Bước 1</p>
            <h4 style={styles.sectionTitle}>Tìm kiếm cơ bản → nâng cao</h4>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: "flex", gap: "0", marginBottom: "1.25rem", borderRadius: "8px", overflow: "hidden", border: "1px solid var(--border)" }}>
          {SEARCH_LEVELS.map((sl, i) => (
            <button
              key={sl.level}
              onClick={() => setActiveLevel(i)}
              style={{
                flex: 1,
                padding: "0.75rem 0.5rem",
                background: activeLevel === i ? "var(--surface)" : "var(--bg2)",
                border: "none",
                borderRight: i < 2 ? "1px solid var(--border)" : "none",
                cursor: "pointer",
                fontFamily: "var(--sans)",
                fontSize: "0.72rem",
                color: activeLevel === i ? "var(--text)" : "var(--muted)",
                fontWeight: activeLevel === i ? 500 : 400,
                transition: "all 0.2s",
                letterSpacing: "0.03em",
                position: "relative",
              }}
            >
              <span style={{ display: "block", fontSize: "1.1rem", marginBottom: "4px" }}>{sl.icon}</span>
              {sl.label.split(" — ")[1]}
              {activeLevel === i && (
                <motion.div
                  layoutId="activeTab"
                  style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: "var(--accent)" }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Active Search Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeLevel}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            style={styles.card}
          >
            {/* Header */}
            <div style={{ padding: "1.25rem 1.25rem 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span style={{ fontSize: "1.5rem" }}>{currentSearch.icon}</span>
                <div>
                  <p style={{ fontFamily: "var(--serif)", fontSize: "1rem", color: "var(--text)", fontWeight: 400 }}>
                    {currentSearch.label}
                  </p>
                  <StepIndicator step={activeLevel} total={3} />
                </div>
              </div>
              <span style={{
                ...styles.stepBadge,
                background: `${currentSearch.badgeColor}18`,
                color: currentSearch.badgeColor,
                border: `1px solid ${currentSearch.badgeColor}30`,
              }}>
                {currentSearch.badge}
              </span>
            </div>

            {/* Query */}
            <div style={{ padding: "1rem 1.25rem" }}>
              <p style={{ fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "0.5rem" }}>Câu truy vấn Google</p>
              <div style={styles.queryBox}>
                <span style={{ color: "var(--muted)", marginRight: "6px" }}>🔎</span>
                {currentSearch.query}
              </div>
            </div>

            {/* Description */}
            <div style={{ padding: "0 1.25rem 1rem" }}>
              <p style={{ fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.75 }}>
                {currentSearch.description}
              </p>
            </div>

            {/* Results Table */}
            <div style={{ padding: "0 1.25rem 1.25rem", overflowX: "auto" }}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Nguồn</th>
                    <th style={styles.th}>Loại</th>
                    <th style={styles.th}>Ghi chú</th>
                  </tr>
                </thead>
                <tbody>
                  {currentSearch.results.map((r, i) => (
                    <tr key={i}>
                      <td style={{ ...styles.td, color: "var(--accent2)", fontWeight: 500 }}>{r.source}</td>
                      <td style={styles.td}>
                        <span style={{
                          fontSize: "0.68rem",
                          padding: "2px 8px",
                          borderRadius: "4px",
                          background: `${currentSearch.badgeColor}12`,
                          color: currentSearch.badgeColor,
                          border: `1px solid ${currentSearch.badgeColor}25`,
                        }}>
                          {r.type}
                        </span>
                      </td>
                      <td style={styles.td}>{r.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Verdict */}
            <div style={{
              padding: "1rem 1.25rem",
              background: `${currentSearch.badgeColor}08`,
              borderTop: `1px solid ${currentSearch.badgeColor}15`,
              display: "flex",
              gap: "0.75rem",
              alignItems: "flex-start",
            }}>
              <span style={{ fontSize: "0.9rem", marginTop: "1px" }}>💡</span>
              <p style={{ fontSize: "0.8rem", color: "var(--muted)", lineHeight: 1.7, fontStyle: "italic" }}>
                <strong style={{ color: "var(--text)", fontWeight: 500 }}>Nhận xét:</strong> {currentSearch.verdict}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ══════════ BƯỚC 2: TRA CỨU NGUỒN CHÍNH THỐNG ══════════ */}
      <div>
        <div style={styles.sectionHeader}>
          <div style={{ ...styles.sectionIcon, background: "rgba(34,197,94,0.15)", color: "#4ade80" }}>🏛️</div>
          <div>
            <p style={{ fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.2rem" }}>Bước 2</p>
            <h4 style={styles.sectionTitle}>Tra cứu trực tiếp trên nguồn chính thống</h4>
          </div>
        </div>

        {/* Legal Sources Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.75rem", marginBottom: "1.5rem" }}>
          {LEGAL_SOURCES.map((src) => (
            <div
              key={src.name}
              style={{
                ...styles.card,
                padding: "1.25rem",
                cursor: "default",
                borderLeft: `3px solid ${src.color}`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                <span style={{ fontSize: "1.2rem" }}>{src.icon}</span>
                <span style={{ fontSize: "0.8rem", color: src.color, fontWeight: 500, fontFamily: "var(--sans)" }}>{src.name}</span>
              </div>
              <p style={{ fontSize: "0.78rem", color: "var(--muted)", lineHeight: 1.6 }}>{src.purpose}</p>
            </div>
          ))}
        </div>

        {/* Article Lookup */}
        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem" }}>
          <button
            onClick={() => setShowArticle(showArticle === "385" ? null : "385")}
            style={{
              flex: 1,
              padding: "0.85rem 1rem",
              background: showArticle === "385" ? "rgba(201,169,110,0.12)" : "var(--bg2)",
              border: `1px solid ${showArticle === "385" ? "rgba(201,169,110,0.35)" : "var(--border)"}`,
              borderRadius: "8px",
              cursor: "pointer",
              fontFamily: "var(--sans)",
              fontSize: "0.78rem",
              color: showArticle === "385" ? "var(--accent)" : "var(--muted)",
              textAlign: "left" as const,
              transition: "all 0.2s",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>📖 Điều 385 — Khái niệm hợp đồng</span>
            <span style={{ fontSize: "0.7rem" }}>{showArticle === "385" ? "▲" : "▼"}</span>
          </button>
          <button
            onClick={() => setShowArticle(showArticle === "117" ? null : "117")}
            style={{
              flex: 1,
              padding: "0.85rem 1rem",
              background: showArticle === "117" ? "rgba(201,169,110,0.12)" : "var(--bg2)",
              border: `1px solid ${showArticle === "117" ? "rgba(201,169,110,0.35)" : "var(--border)"}`,
              borderRadius: "8px",
              cursor: "pointer",
              fontFamily: "var(--sans)",
              fontSize: "0.78rem",
              color: showArticle === "117" ? "var(--accent)" : "var(--muted)",
              textAlign: "left" as const,
              transition: "all 0.2s",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>📖 Điều 117 — Điều kiện hiệu lực</span>
            <span style={{ fontSize: "0.7rem" }}>{showArticle === "117" ? "▲" : "▼"}</span>
          </button>
        </div>

        <AnimatePresence>
          {showArticle === "385" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: "hidden" }}
            >
              <div style={styles.legalBox}>
                <div style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "120px",
                  height: "120px",
                  background: "radial-gradient(circle at top right, rgba(201,169,110,0.08), transparent 70%)",
                }} />
                <p style={{ fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.5rem" }}>
                  {ARTICLE_385.source}
                </p>
                <h5 style={{ fontFamily: "var(--serif)", fontSize: "1.05rem", color: "var(--text)", fontWeight: 400, marginBottom: "1rem" }}>
                  {ARTICLE_385.title}
                </h5>
                <blockquote style={{
                  borderLeft: "3px solid var(--accent)",
                  paddingLeft: "1rem",
                  margin: "0",
                  fontStyle: "italic",
                  fontSize: "0.9rem",
                  color: "var(--accent2)",
                  lineHeight: 1.8,
                }}>
                  &ldquo;{ARTICLE_385.content}&rdquo;
                </blockquote>
                <p style={{ fontSize: "0.72rem", color: "var(--muted)", marginTop: "1rem" }}>
                  📅 Có hiệu lực từ: <strong style={{ color: "var(--text)" }}>{ARTICLE_385.effectiveDate}</strong>
                </p>
              </div>
            </motion.div>
          )}

          {showArticle === "117" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              style={{ overflow: "hidden" }}
            >
              <div style={styles.legalBox}>
                <div style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: "120px",
                  height: "120px",
                  background: "radial-gradient(circle at top right, rgba(201,169,110,0.08), transparent 70%)",
                }} />
                <p style={{ fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.5rem" }}>
                  Bộ luật Dân sự 2015 (Luật số 91/2015/QH13)
                </p>
                <h5 style={{ fontFamily: "var(--serif)", fontSize: "1.05rem", color: "var(--text)", fontWeight: 400, marginBottom: "1rem" }}>
                  {ARTICLE_117.title}
                </h5>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                  {ARTICLE_117.conditions.map((c, i) => (
                    <div key={i} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                      <span style={{
                        width: "22px",
                        height: "22px",
                        borderRadius: "50%",
                        background: "rgba(201,169,110,0.15)",
                        color: "var(--accent)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.7rem",
                        fontWeight: 600,
                        flexShrink: 0,
                        marginTop: "2px",
                      }}>
                        {i + 1}
                      </span>
                      <p style={{ fontSize: "0.83rem", color: "var(--muted)", lineHeight: 1.7 }}>{c}</p>
                    </div>
                  ))}
                </div>
                <div style={{
                  marginTop: "1rem",
                  padding: "0.75rem",
                  background: "rgba(245,158,11,0.08)",
                  borderRadius: "6px",
                  border: "1px solid rgba(245,158,11,0.15)",
                }}>
                  <p style={{ fontSize: "0.78rem", color: "#fbbf24", lineHeight: 1.6 }}>
                    ⚠️ <strong>Lưu ý khoản 2:</strong> {ARTICLE_117.note}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ══════════ BƯỚC 3: BẢNG ĐÁNH GIÁ ĐỘ TIN CẬY ══════════ */}
      <div>
        <div style={styles.sectionHeader}>
          <div style={{ ...styles.sectionIcon, background: "rgba(168,85,247,0.15)", color: "#c084fc" }}>📊</div>
          <div>
            <p style={{ fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.2rem" }}>Bước 3</p>
            <h4 style={styles.sectionTitle}>Bảng đánh giá độ tin cậy 5 nguồn thông tin</h4>
          </div>
        </div>

        <div style={{ ...styles.card, overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={styles.table}>
              <thead>
                <tr style={{ background: "var(--bg2)" }}>
                  <th style={{ ...styles.th, width: "28%" }}>Nguồn</th>
                  <th style={{ ...styles.th, width: "14%" }}>Loại</th>
                  <th style={{ ...styles.th, width: "16%" }}>Độ tin cậy</th>
                  <th style={{ ...styles.th, width: "42%" }}>Lý do đánh giá</th>
                </tr>
              </thead>
              <tbody>
                {RELIABILITY_DATA.map((row, i) => (
                  <tr
                    key={row.source}
                    onMouseEnter={() => setHoveredRow(i)}
                    onMouseLeave={() => setHoveredRow(null)}
                    style={{
                      background: hoveredRow === i ? "rgba(201,169,110,0.04)" : "transparent",
                      transition: "background 0.2s",
                    }}
                  >
                    <td style={styles.td}>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                        <span style={{ fontSize: "1rem" }}>{row.icon}</span>
                        <span style={{ color: "var(--text)", fontWeight: 500, fontSize: "0.82rem" }}>{row.source}</span>
                      </div>
                    </td>
                    <td style={styles.td}>
                      <span style={{
                        fontSize: "0.65rem",
                        padding: "2px 8px",
                        borderRadius: "4px",
                        background: `${row.color}12`,
                        color: row.color,
                        border: `1px solid ${row.color}25`,
                        letterSpacing: "0.05em",
                      }}>
                        {row.type}
                      </span>
                    </td>
                    <td style={styles.td}>
                      <Stars count={row.stars} />
                    </td>
                    <td style={{ ...styles.td, fontSize: "0.78rem", lineHeight: 1.65 }}>
                      {row.reason}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ══════════ BƯỚC 4: QUY TRÌNH TÌM KIẾM ══════════ */}
      <div>
        <div style={styles.sectionHeader}>
          <div style={{ ...styles.sectionIcon, background: "rgba(201,169,110,0.15)", color: "var(--accent)" }}>📋</div>
          <div>
            <p style={{ fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.2rem" }}>Bước 4</p>
            <h4 style={styles.sectionTitle}>Quy trình tìm kiếm thông tin pháp lý</h4>
          </div>
        </div>

        {/* Process Steps - Timeline style */}
        <div style={{ position: "relative", paddingLeft: "2rem" }}>
          {/* Vertical line */}
          <div style={{
            position: "absolute",
            left: "11px",
            top: "8px",
            bottom: "8px",
            width: "2px",
            background: "linear-gradient(to bottom, var(--accent), rgba(201,169,110,0.2))",
            borderRadius: "1px",
          }} />

          {[
            {
              step: "01",
              title: "Xác định từ khóa chính xác",
              desc: "Dùng tên điều luật, số điều cụ thể thay vì mô tả chung chung. Ví dụ: thay vì \"luật hợp đồng\" → dùng \"Điều 385 BLDS 2015 khái niệm hợp đồng\".",
              color: "#3b82f6",
            },
            {
              step: "02",
              title: "Tìm kiếm nâng cao trên Google",
              desc: "Sử dụng toán tử site: để giới hạn nguồn, dấu ngoặc kép \"...\" để khóa cụm từ chính xác, và OR để mở rộng kết quả khi cần.",
              color: "#f59e0b",
            },
            {
              step: "03",
              title: "Ưu tiên đọc văn bản gốc",
              desc: "Tra cứu trực tiếp trên vbpl.vn (Cổng CSDL Quốc gia) hoặc thuvienphapluat.vn thay vì dựa vào bên thứ ba hoặc AI.",
              color: "#22c55e",
            },
            {
              step: "04",
              title: "Kiểm tra ngày có hiệu lực",
              desc: "BLDS 2015 thay thế BLDS 2005 từ 01/01/2017. Luôn kiểm tra văn bản đang còn hiệu lực hay đã bị thay thế/sửa đổi, tránh trích dẫn luật cũ.",
              color: "#a855f7",
            },
          ].map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              style={{ position: "relative", marginBottom: "1.5rem", paddingLeft: "1.5rem" }}
            >
              {/* Dot */}
              <div style={{
                position: "absolute",
                left: "-2rem",
                top: "4px",
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                background: `${item.color}20`,
                border: `2px solid ${item.color}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1,
              }}>
                <span style={{ fontSize: "0.55rem", fontWeight: 700, color: item.color, fontFamily: "var(--sans)" }}>{item.step}</span>
              </div>

              <div style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                padding: "1rem 1.25rem",
                transition: "all 0.2s",
              }}>
                <h5 style={{ fontFamily: "var(--serif)", fontSize: "0.95rem", color: "var(--text)", fontWeight: 400, marginBottom: "0.4rem" }}>
                  {item.title}
                </h5>
                <p style={{ fontSize: "0.8rem", color: "var(--muted)", lineHeight: 1.75 }}>
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Summary Quote */}
        <div style={{
          background: "linear-gradient(135deg, rgba(201,169,110,0.06), rgba(201,169,110,0.02))",
          border: "1px solid rgba(201,169,110,0.2)",
          borderRadius: "8px",
          padding: "1.25rem 1.5rem",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute",
            top: "-8px",
            left: "1rem",
            fontSize: "3rem",
            color: "rgba(201,169,110,0.15)",
            fontFamily: "var(--serif)",
            lineHeight: 1,
          }}>
            &ldquo;
          </div>
          <p style={{ fontSize: "0.83rem", color: "var(--muted)", lineHeight: 1.85, fontStyle: "italic", paddingTop: "0.5rem" }}>
            Quy trình tìm kiếm thông tin pháp lý của tôi gồm 4 bước: <strong style={{ color: "var(--text)", fontWeight: 500 }}>(1)</strong> Xác định từ khóa chính xác — dùng tên điều luật, số điều thay vì mô tả chung chung.{" "}
            <strong style={{ color: "var(--text)", fontWeight: 500 }}>(2)</strong> Tìm kiếm nâng cao trên Google với toán tử <code style={{ background: "rgba(201,169,110,0.1)", padding: "1px 6px", borderRadius: "3px", fontSize: "0.78rem", color: "var(--accent2)" }}>site:</code> để lọc nguồn.{" "}
            <strong style={{ color: "var(--text)", fontWeight: 500 }}>(3)</strong> Ưu tiên đọc văn bản gốc trên vbpl.vn thay vì qua bên thứ ba.{" "}
            <strong style={{ color: "var(--text)", fontWeight: 500 }}>(4)</strong> Kiểm tra ngày có hiệu lực — BLDS 2015 thay thế BLDS 2005 từ 01/01/2017, tránh dùng nguồn trích dẫn luật cũ.
          </p>
        </div>
      </div>
    </div>
  );
}
