"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────── DATA ─────────────── */

const PRINCIPLES = [
  { id: 1, name: "Minh bạch", desc: "AI phải giải thích được cách nó đưa ra kết quả", example: "Phần mềm xét xử phải công khai thuật toán định giá đền bù.", icon: "🔍", color: "#3b82f6" },
  { id: 2, name: "Công bằng", desc: "Không phân biệt đối xử, không thiên kiến", example: "AI tuyển dụng công ty luật không loại hồ sơ vì giới tính.", icon: "⚖️", color: "#10b981" },
  { id: 3, name: "Bảo mật", desc: "Bảo vệ dữ liệu cá nhân người dùng", example: "Không lưu trữ nội dung tư vấn pháp lý của thân chủ.", icon: "🛡️", color: "#f59e0b" },
  { id: 4, name: "Trách nhiệm giải trình", desc: "Có người/tổ chức chịu trách nhiệm khi AI sai", example: "Luật sư chịu trách nhiệm pháp lý dù dùng AI soạn thảo.", icon: "📋", color: "#ef4444" },
  { id: 5, name: "Lấy con người làm trung tâm", desc: "AI hỗ trợ, không thay thế phán đoán con người", example: "Thẩm phán vẫn là người ra phán quyết cuối cùng.", icon: "👤", color: "#8b5cf6" },
];

const RISKS = [
  {
    id: "hallucination",
    title: "1. AI \"bịa\" điều luật (Hallucination)",
    desc: "AI có thể tự tạo ra số điều, tên luật, án lệ nghe rất thuyết phục nhưng hoàn toàn không tồn tại.",
    example: "Năm 2023, một luật sư Mỹ nộp bản tóm tắt lên tòa có 6 án lệ do ChatGPT tự bịa ra — dẫn đến bị tòa phạt và mất uy tín nghiêm trọng.",
    solution: "Luôn tra cứu lại mọi điều luật, án lệ mà AI trích dẫn trên các CSDL chính thống như vbpl.vn hoặc thuvienphapluat.vn trước khi sử dụng."
  },
  {
    id: "outdated",
    title: "2. Thông tin pháp luật đã lỗi thời",
    desc: "AI được huấn luyện đến một thời điểm nhất định, không cập nhật được ngay văn bản pháp luật mới sửa đổi, bổ sung.",
    example: "AI có thể vẫn trích dẫn Bộ luật Dân sự 2005 để giải quyết tình huống, trong khi BLDS 2015 đã thay thế và có hiệu lực từ 01/01/2017.",
    solution: "Kiểm tra 'Tình trạng hiệu lực' của mọi văn bản. Chủ động cung cấp văn bản mới nhất cho AI (nếu công cụ hỗ trợ đọc file)."
  },
  {
    id: "privacy",
    title: "3. Vi phạm bảo mật thông tin thân chủ",
    desc: "Khi luật sư nhập thông tin vụ việc vào AI công cộng, dữ liệu có thể bị lưu lại trên server và dùng để huấn luyện model.",
    example: "Nhập nguyên văn hợp đồng có chứa tên tuổi, CCCD, bí mật kinh doanh của khách hàng vào ChatGPT để nhờ tóm tắt.",
    solution: "Tuân thủ tuyệt đối quy tắc ẩn danh hóa (Anonymization). Thay tên thật bằng 'Bên A', 'Bên B', xóa các con số nhạy cảm trước khi đưa vào AI."
  },
  {
    id: "overreliance",
    title: "4. Phụ thuộc AI, mất kỹ năng tư duy",
    desc: "Lạm dụng AI khiến sinh viên Luật lười suy nghĩ, thui chột khả năng tự lập luận và tìm kiếm căn cứ pháp lý độc lập.",
    example: "Copy nguyên văn câu trả lời của AI vào bài thi hoặc báo cáo mà không hiểu bản chất pháp lý của vấn đề.",
    solution: "Chỉ dùng AI như một 'trợ lý' kiểm tra lỗi hoặc tìm kiếm gợi ý. Lập luận chính và phán đoán pháp lý phải xuất phát từ tư duy của chính mình."
  }
];

/* ─────────────── STYLES ─────────────── */

const styles = {
  container: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "3rem",
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
  card: {
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: "8px",
    overflow: "hidden",
  },
};

/* ─────────────── COMPONENT ─────────────── */

export default function Assignment6() {
  const [activeRisk, setActiveRisk] = useState<string>("hallucination");
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div style={styles.container}>

      {/* ══════════ BƯỚC 1: 5 NGUYÊN TẮC AI ══════════ */}
      <div>
        <div style={styles.sectionHeader}>
          <div style={{ ...styles.sectionIcon, background: "rgba(59,130,246,0.15)", color: "#3b82f6" }}>🌐</div>
          <div>
            <p style={{ fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.2rem" }}>Lý thuyết cốt lõi</p>
            <h4 style={styles.sectionTitle}>5 Nguyên tắc sử dụng AI có trách nhiệm</h4>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1px", background: "var(--border)", borderRadius: "8px", overflow: "hidden" }}>
          {PRINCIPLES.map((p) => (
            <div key={p.id} style={{ display: "grid", gridTemplateColumns: "40px 140px 1fr", background: "var(--surface)", padding: "1rem" }}>
              <div style={{ fontSize: "1.5rem", display: "flex", alignItems: "center", justifyContent: "center", color: p.color }}>{p.icon}</div>
              <div style={{ display: "flex", alignItems: "center", fontWeight: 600, color: "var(--text)", fontSize: "0.85rem", letterSpacing: "0.05em" }}>
                {p.name}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem", justifyContent: "center" }}>
                <div style={{ fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.5 }}>{p.desc}</div>
                <div style={{ fontSize: "0.75rem", color: p.color, fontStyle: "italic" }}>VD: {p.example}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ══════════ BƯỚC 2: RỦI RO ĐẶC THÙ NGÀNH LUẬT ══════════ */}
      <div>
        <div style={styles.sectionHeader}>
          <div style={{ ...styles.sectionIcon, background: "rgba(239,68,68,0.15)", color: "#ef4444" }}>⚠️</div>
          <div>
            <p style={{ fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.2rem" }}>Phân tích chuyên sâu</p>
            <h4 style={styles.sectionTitle}>4 Rủi ro AI đặc thù trong hành nghề Luật</h4>
          </div>
        </div>

        <div style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
          {/* Risk Nav */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", width: "220px", flexShrink: 0 }}>
            {RISKS.map(r => (
              <button
                key={r.id}
                onClick={() => setActiveRisk(r.id)}
                style={{
                  textAlign: "left", padding: "0.8rem 1rem", borderRadius: "6px", fontSize: "0.8rem", fontFamily: "var(--sans)", transition: "all 0.2s",
                  background: activeRisk === r.id ? "rgba(239,68,68,0.1)" : "transparent",
                  color: activeRisk === r.id ? "#ef4444" : "var(--muted)",
                  border: `1px solid ${activeRisk === r.id ? "rgba(239,68,68,0.3)" : "transparent"}`,
                  cursor: "pointer", fontWeight: activeRisk === r.id ? 500 : 400
                }}
              >
                {r.title}
              </button>
            ))}
          </div>

          {/* Risk Content */}
          <div style={{ flex: 1, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "8px", padding: "1.5rem", position: "relative", minHeight: "240px" }}>
            <AnimatePresence mode="wait">
              {RISKS.filter(r => r.id === activeRisk).map(r => (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.2 }}
                  style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
                >
                  <h3 style={{ fontSize: "1.1rem", fontFamily: "var(--serif)", color: "var(--text)" }}>{r.title}</h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.7 }}>{r.desc}</p>
                  
                  <div style={{ background: "rgba(245,158,11,0.08)", borderLeft: "3px solid #f59e0b", padding: "1rem", borderRadius: "0 6px 6px 0" }}>
                    <p style={{ fontSize: "0.7rem", color: "#f59e0b", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.4rem" }}>Ví dụ thực tế</p>
                    <p style={{ fontSize: "0.82rem", color: "var(--text)", lineHeight: 1.6, fontStyle: "italic" }}>{r.example}</p>
                  </div>

                  <div style={{ background: "rgba(16,185,129,0.08)", borderLeft: "3px solid #10b981", padding: "1rem", borderRadius: "0 6px 6px 0" }}>
                    <p style={{ fontSize: "0.7rem", color: "#10b981", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.4rem" }}>Cách xử lý / Phòng tránh</p>
                    <p style={{ fontSize: "0.82rem", color: "var(--text)", lineHeight: 1.6 }}>{r.solution}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* ══════════ BƯỚC 3: CHECKLIST AN TOÀN ══════════ */}
      <div>
        <div style={styles.sectionHeader}>
          <div style={{ ...styles.sectionIcon, background: "rgba(168,85,247,0.15)", color: "#c084fc" }}>✅</div>
          <div>
            <p style={{ fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.2rem" }}>Công cụ thực hành</p>
            <h4 style={styles.sectionTitle}>Checklist sử dụng AI an toàn cho Sinh viên Luật</h4>
          </div>
        </div>

        <div style={{ ...styles.card, background: "var(--bg2)", padding: "2rem" }}>
          <p style={{ fontSize: "0.82rem", color: "var(--muted)", marginBottom: "1.5rem", textAlign: "center" }}>
            Đánh dấu (✓) vào các ô dưới đây để tự kiểm tra trước khi sử dụng kết quả từ AI cho bài tập pháp lý.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
            {/* Cột 1 */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ fontSize: "0.75rem", color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.1em", borderBottom: "1px solid var(--border)", paddingBottom: "0.5rem" }}>
                1. Trước khi hỏi AI
              </div>
              {[
                { id: "c1", label: "Tôi đã xóa/ẩn danh toàn bộ thông tin cá nhân chưa?" },
                { id: "c2", label: "Tôi đã tự suy nghĩ và có dàn ý cho vấn đề này trước chưa?" },
                { id: "c3", label: "Câu hỏi (Prompt) của tôi đã cung cấp đủ ngữ cảnh pháp lý chưa?" }
              ].map(item => (
                <label key={item.id} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", cursor: "pointer" }}>
                  <input type="checkbox" checked={!!checkedItems[item.id]} onChange={() => toggleCheck(item.id)}
                    style={{ marginTop: "4px", accentColor: "var(--accent)", width: "16px", height: "16px", cursor: "pointer" }} />
                  <span style={{ fontSize: "0.85rem", color: checkedItems[item.id] ? "var(--text)" : "var(--muted)", lineHeight: 1.5, transition: "color 0.2s" }}>
                    {item.label}
                  </span>
                </label>
              ))}
            </div>

            {/* Cột 2 */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ fontSize: "0.75rem", color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.1em", borderBottom: "1px solid var(--border)", paddingBottom: "0.5rem" }}>
                2. Khi nhận kết quả từ AI
              </div>
              {[
                { id: "c4", label: "Tôi đã tra lại số điều, tên luật AI trích dẫn trên vbpl.vn chưa?" },
                { id: "c5", label: "Văn bản quy phạm pháp luật AI nhắc đến có còn hiệu lực không?" },
                { id: "c6", label: "Kết quả AI có mâu thuẫn với giáo trình hoặc kiến thức tôi đã học không?" }
              ].map(item => (
                <label key={item.id} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", cursor: "pointer" }}>
                  <input type="checkbox" checked={!!checkedItems[item.id]} onChange={() => toggleCheck(item.id)}
                    style={{ marginTop: "4px", accentColor: "var(--accent)", width: "16px", height: "16px", cursor: "pointer" }} />
                  <span style={{ fontSize: "0.85rem", color: checkedItems[item.id] ? "var(--text)" : "var(--muted)", lineHeight: 1.5, transition: "color 0.2s" }}>
                    {item.label}
                  </span>
                </label>
              ))}
            </div>

            {/* Cột 3 */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div style={{ fontSize: "0.75rem", color: "var(--accent)", textTransform: "uppercase", letterSpacing: "0.1em", borderBottom: "1px solid var(--border)", paddingBottom: "0.5rem" }}>
                3. Trước khi nộp bài
              </div>
              {[
                { id: "c7", label: "Tôi đã tự hiểu bản chất và diễn đạt lại bằng ngôn ngữ của chính mình chưa?" },
                { id: "c8", label: "Tôi có ghi rõ nguồn và minh bạch việc sử dụng AI như một công cụ hỗ trợ không?" },
                { id: "c9", label: "Giảng viên có cho phép sử dụng AI cho dạng bài tập này không?" }
              ].map(item => (
                <label key={item.id} style={{ display: "flex", alignItems: "flex-start", gap: "0.75rem", cursor: "pointer" }}>
                  <input type="checkbox" checked={!!checkedItems[item.id]} onChange={() => toggleCheck(item.id)}
                    style={{ marginTop: "4px", accentColor: "var(--accent)", width: "16px", height: "16px", cursor: "pointer" }} />
                  <span style={{ fontSize: "0.85rem", color: checkedItems[item.id] ? "var(--text)" : "var(--muted)", lineHeight: 1.5, transition: "color 0.2s" }}>
                    {item.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══════════ BƯỚC CUỐI: BÀI HỌC RÚT RA ══════════ */}
      <div>
        <div style={styles.sectionHeader}>
          <div style={{ ...styles.sectionIcon, background: "rgba(201,169,110,0.15)", color: "var(--accent)" }}>🎓</div>
          <div>
            <p style={{ fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.2rem" }}>Tổng kết</p>
            <h4 style={styles.sectionTitle}>Bài học về Đạo đức nghề nghiệp</h4>
          </div>
        </div>

        <div style={{
          background: "linear-gradient(135deg, rgba(201,169,110,0.06), rgba(201,169,110,0.02))",
          border: "1px solid rgba(201,169,110,0.2)",
          borderRadius: "8px",
          padding: "1.5rem",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{
            position: "absolute",
            top: "5px",
            left: "1.25rem",
            fontSize: "3.5rem",
            color: "rgba(201,169,110,0.15)",
            fontFamily: "var(--serif)",
            lineHeight: 1,
          }}>
            &ldquo;
          </div>
          <p style={{ fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.85, fontStyle: "italic", paddingTop: "0.5rem", position: "relative", zIndex: 1 }}>
            Qua bài tập 6, tôi nhận ra ranh giới giữa dùng AI hiệu quả và dùng AI thiếu trách nhiệm rất mong manh — đặc biệt trong ngành Luật, nơi một sai sót nhỏ về trích dẫn điều luật cũng có thể gây hậu quả nghiêm trọng đến quyền lợi của khách hàng.
            <br/><br/>
            Bài học quan trọng nhất tôi rút ra: <strong style={{ color: "var(--text)" }}>AI là công cụ tra cứu và tổng hợp xuất sắc, nhưng phán đoán pháp lý cuối cùng phải do con người</strong> — người luật sư được đào tạo bài bản — thực hiện và chịu trách nhiệm. Sử dụng AI có trách nhiệm không đồng nghĩa với việc sợ hãi và tẩy chay công nghệ, mà là hiểu rõ năng lực cốt lõi của bản thân để không bị phụ thuộc, biết rõ AI làm được gì và tuyệt đối không làm được gì.
          </p>
        </div>
      </div>

    </div>
  );
}
