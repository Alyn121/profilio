"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

/* ─────────────── DATA ─────────────── */

const MEETING_MINUTES = {
  date: "15/10/2026",
  tool: "Google Meet & Google Docs",
  topic: "Tình huống pháp lý: A cho B mượn xe máy, B làm hỏng. Theo BLDS 2015, B có phải bồi thường không?",
  members: [
    { name: "Lò Văn Tiến", id: "22061380", role: "Trưởng nhóm", color: "#3b82f6" },
    { name: "Mai Huyền Thương", id: "", role: "Ghi biên bản", color: "#10b981" },
    { name: "Nguyễn Thị Minh Thư", id: "", role: "Phản biện", color: "#f59e0b" },
    { name: "Vũ Duy Đức Toàn", id: "", role: "Thành viên thảo luận", color: "#8b5cf6" },
    { name: "Phạm Thanh Trà", id: "", role: "Thành viên thảo luận", color: "#ef4444" },
  ],
  discussion: [
    { speaker: "Tiến", content: "Tình huống này là hợp đồng mượn tài sản. B mượn xe của A thì phải có nghĩa vụ bảo quản." },
    { speaker: "Thương", content: "Đúng vậy, theo Điều 496 BLDS 2015 về nghĩa vụ của bên mượn tài sản, B phải giữ gìn, bảo quản tài sản mượn, không được tự ý thay đổi tình trạng tài sản." },
    { speaker: "Thư", content: "Nếu B làm hỏng xe thì sao? Có tính là sự kiện bất khả kháng không?" },
    { speaker: "Toàn", content: "Chắc chắn không, vì do B đi không cẩn thận ngã xe nên B phải tự chịu trách nhiệm." },
    { speaker: "Trà", content: "Mình đồng ý. Nếu B chứng minh được do nguyên nhân khách quan thì mới tính." },
    { speaker: "Tiến", content: "Chính xác, Khoản 4 Điều 496 quy định rõ: 'Phải bồi thường thiệt hại, nếu làm mất, hư hỏng tài sản mượn'." },
  ],
  conclusion: "Nhóm thống nhất: Theo khoản 4 Điều 496 Bộ luật Dân sự 2015, B có nghĩa vụ bồi thường thiệt hại cho A vì đã làm hư hỏng chiếc xe máy trong quá trình mượn, trừ trường hợp B chứng minh được đó là sự kiện bất khả kháng (ví dụ: đang đi thì cây đổ trúng xe)."
};

const CHAT_MESSAGES = [
  { time: "19:02", sender: "Phạm Thanh Trà", text: "Mọi người nghe rõ mình nói không?" },
  { time: "19:03", sender: "Lò Văn Tiến", text: "Rõ nhé. Mình share màn hình file Docs rồi đấy." },
  { time: "19:08", sender: "Vũ Duy Đức Toàn", text: "Cho mình xin link Docs để cùng gõ biên bản." },
  { time: "19:08", sender: "Lò Văn Tiến", text: "https://docs.google.com/document/d/..." },
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
  // Mocks
  meetContainer: {
    background: "#202124",
    borderRadius: "8px",
    overflow: "hidden",
    border: "1px solid #3c4043",
    display: "flex",
    flexDirection: "column" as const,
  },
  meetGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "10px",
    padding: "10px",
    background: "#202124",
  },
  meetVideoCard: {
    background: "#3c4043",
    borderRadius: "8px",
    aspectRatio: "16/9",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative" as const,
    overflow: "hidden",
  },
  docsContainer: {
    background: "#f8f9fa",
    borderRadius: "8px",
    border: "1px solid #dadce0",
    overflow: "hidden",
    color: "#202124",
    fontFamily: "Arial, sans-serif",
  },
  docsToolbar: {
    background: "#edf2fa",
    padding: "8px 16px",
    borderBottom: "1px solid #dadce0",
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  docsPage: {
    background: "#ffffff",
    margin: "20px auto",
    padding: "40px",
    width: "90%",
    maxWidth: "600px",
    minHeight: "400px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    border: "1px solid #dadce0",
  },
};

/* ─────────────── COMPONENT ─────────────── */

export default function Assignment4() {
  const [activeTab, setActiveTab] = useState<"meet" | "docs">("meet");

  return (
    <div style={styles.container}>

      {/* ══════════ BƯỚC 1 & 2: HỌP NHÓM ONLINE ══════════ */}
      <div>
        <div style={styles.sectionHeader}>
          <div style={{ ...styles.sectionIcon, background: "rgba(168,85,247,0.15)", color: "#c084fc" }}>📹</div>
          <div>
            <p style={{ fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.2rem" }}>Bước 1 & 2</p>
            <h4 style={styles.sectionTitle}>Tổ chức & Ghi hình buổi họp trực tuyến</h4>
          </div>
        </div>

        <p style={{ fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
          Nhóm 5 thành viên đã sử dụng <strong>Google Meet</strong> để thảo luận tình huống pháp lý về Hợp đồng mượn tài sản (Điều 496 BLDS 2015).
        </p>

        {/* Google Meet Mock */}
        <div style={styles.meetContainer}>
          {/* Header */}
          <div style={{ padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", color: "#fff", fontSize: "0.9rem" }}>
            <span>Thảo luận Bài tập Nhóm - Luật Dân sự</span>
            <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <span style={{ fontSize: "0.75rem", background: "#d93025", padding: "2px 6px", borderRadius: "4px" }}>REC</span>
              <span style={{ fontSize: "0.8rem", color: "#9aa0a6" }}>19:15</span>
            </div>
          </div>

          <div style={{ display: "flex", borderTop: "1px solid #3c4043", borderBottom: "1px solid #3c4043" }}>
            {/* Video Grid */}
            <div style={{ flex: 1, ...styles.meetGrid }}>
              {MEETING_MINUTES.members.map((m, i) => (
                <div key={i} style={styles.meetVideoCard}>
                  {/* Avatar Placeholder */}
                  <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: m.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", color: "#fff" }}>
                    {m.name.charAt(0)}
                  </div>
                  {/* Name Tag */}
                  <div style={{ position: "absolute", bottom: "8px", left: "8px", background: "rgba(0,0,0,0.6)", padding: "4px 8px", borderRadius: "4px", fontSize: "0.7rem", color: "#fff", display: "flex", alignItems: "center", gap: "4px" }}>
                    <span style={{ width: "8px", height: "8px", background: "#10b981", borderRadius: "50%" }}></span>
                    {m.name}
                  </div>
                  {/* Talking Indicator for Tien */}
                  {i === 0 && (
                    <div style={{ position: "absolute", top: "8px", right: "8px", background: "rgba(59,130,246,0.8)", padding: "4px", borderRadius: "50%" }}>
                      🔊
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Chat Sidebar */}
            <div style={{ width: "240px", background: "#fff", display: "flex", flexDirection: "column" }}>
              <div style={{ padding: "12px", borderBottom: "1px solid #e0e0e0", fontSize: "0.85rem", fontWeight: 500, color: "#202124" }}>
                Tin nhắn trong cuộc gọi
              </div>
              <div style={{ flex: 1, padding: "12px", overflowY: "auto", display: "flex", flexDirection: "column", gap: "12px" }}>
                {CHAT_MESSAGES.map((msg, idx) => (
                  <div key={idx}>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginBottom: "2px" }}>
                      <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#202124" }}>{msg.sender}</span>
                      <span style={{ fontSize: "0.65rem", color: "#5f6368" }}>{msg.time}</span>
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "#3c4043", lineHeight: 1.4 }}>
                      {msg.text.includes("http") ? <a href="#" style={{ color: "#1a73e8", textDecoration: "underline" }}>{msg.text}</a> : msg.text}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ padding: "12px", borderTop: "1px solid #e0e0e0" }}>
                <div style={{ background: "#f1f3f4", padding: "8px 12px", borderRadius: "20px", fontSize: "0.75rem", color: "#5f6368" }}>
                  Gửi tin nhắn...
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div style={{ padding: "12px", display: "flex", justifyContent: "center", gap: "12px", background: "#202124" }}>
            {["🎤", "📹", "✋", "💻", "☎️"].map((icon, i) => (
              <div key={i} style={{ 
                width: "40px", height: "40px", borderRadius: "50%", 
                background: icon === "☎️" ? "#ea4335" : "#3c4043", 
                display: "flex", alignItems: "center", justifyContent: "center", 
                fontSize: "1.1rem", cursor: "pointer"
              }}>
                {icon}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════ BƯỚC 3: CỘNG TÁC GOOGLE DOCS ══════════ */}
      <div>
        <div style={styles.sectionHeader}>
          <div style={{ ...styles.sectionIcon, background: "rgba(59,130,246,0.15)", color: "#3b82f6" }}>📄</div>
          <div>
            <p style={{ fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.2rem" }}>Bước 3</p>
            <h4 style={styles.sectionTitle}>Cộng tác thời gian thực trên Google Docs</h4>
          </div>
        </div>

        {/* Google Docs Mock */}
        <div style={styles.docsContainer}>
          <div style={styles.docsToolbar}>
            <div style={{ fontSize: "1.2rem", color: "#1a73e8" }}>📄</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: "0.9rem", fontWeight: 500, marginBottom: "2px" }}>K67D_BT4_Hop-tac-nhom_2026</div>
              <div style={{ fontSize: "0.7rem", color: "#5f6368", display: "flex", gap: "12px" }}>
                <span>Tệp</span><span>Chỉnh sửa</span><span>Xem</span><span>Chèn</span><span>Định dạng</span>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              {/* Active avatars */}
              <div style={{ display: "flex", marginLeft: "10px" }}>
                {MEETING_MINUTES.members.slice(1).map((m, i) => (
                  <div key={i} style={{ width: "28px", height: "28px", borderRadius: "50%", background: m.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "0.7rem", border: "2px solid #fff", marginLeft: "-8px", zIndex: 10 - i }}>
                    {m.name.charAt(0)}
                  </div>
                ))}
              </div>
              <div style={{ background: "#c2e7ff", color: "#001d35", padding: "6px 16px", borderRadius: "20px", fontSize: "0.8rem", fontWeight: 500, display: "flex", alignItems: "center", gap: "6px" }}>
                🔒 Chia sẻ
              </div>
            </div>
          </div>

          <div style={{ background: "#f8f9fa", padding: "1px" }}>
            <div style={styles.docsPage}>
              <h2 style={{ textAlign: "center", fontSize: "1.2rem", marginBottom: "20px" }}>BIÊN BẢN CUỘC HỌP NHÓM</h2>
              
              <div style={{ fontSize: "0.85rem", lineHeight: 1.8 }}>
                <p><strong>Ngày:</strong> {MEETING_MINUTES.date}</p>
                <p><strong>Công cụ:</strong> {MEETING_MINUTES.tool}</p>
                <p><strong>Thành viên:</strong></p>
                <ul style={{ paddingLeft: "20px", marginBottom: "15px" }}>
                  {MEETING_MINUTES.members.map((m, i) => (
                    <li key={i}>{m.name} {m.id ? `(${m.id})` : ""} - {m.role}</li>
                  ))}
                </ul>

                <p style={{ marginTop: "20px", color: "#1a73e8", fontWeight: "bold" }}>1. Chủ đề thảo luận:</p>
                <p style={{ paddingLeft: "15px", fontStyle: "italic", background: "#f1f3f4", padding: "10px", borderRadius: "4px" }}>
                  {MEETING_MINUTES.topic}
                </p>

                <p style={{ marginTop: "20px", color: "#1a73e8", fontWeight: "bold" }}>2. Ý kiến thành viên:</p>
                <ul style={{ paddingLeft: "20px", marginBottom: "15px" }}>
                  {MEETING_MINUTES.discussion.map((d, i) => (
                    <li key={i} style={{ marginBottom: "8px", position: "relative" }}>
                      <strong>{d.speaker}:</strong> {d.content}
                      {/* Fake Cursors */}
                      {i === 1 && <span style={{ position: "absolute", bottom: "-4px", right: "20%", width: "2px", height: "14px", background: "#10b981", animation: "blink 1s infinite" }}><span style={{ position: "absolute", top: "-14px", left: 0, background: "#10b981", color: "#fff", fontSize: "0.5rem", padding: "1px 4px", borderRadius: "2px", whiteSpace: "nowrap" }}>Mai Huyền Thương</span></span>}
                      {i === 3 && <span style={{ position: "absolute", bottom: "-4px", left: "60%", width: "2px", height: "14px", background: "#8b5cf6", animation: "blink 1s infinite" }}><span style={{ position: "absolute", top: "-14px", left: 0, background: "#8b5cf6", color: "#fff", fontSize: "0.5rem", padding: "1px 4px", borderRadius: "2px", whiteSpace: "nowrap" }}>Vũ Duy Đức Toàn</span></span>}
                      {i === 5 && <span style={{ position: "absolute", bottom: "-4px", left: "40%", width: "2px", height: "14px", background: "#3b82f6", animation: "blink 1s infinite" }}><span style={{ position: "absolute", top: "-14px", left: 0, background: "#3b82f6", color: "#fff", fontSize: "0.5rem", padding: "1px 4px", borderRadius: "2px", whiteSpace: "nowrap" }}>Lò Văn Tiến</span></span>}
                    </li>
                  ))}
                </ul>

                <p style={{ marginTop: "20px", color: "#1a73e8", fontWeight: "bold" }}>3. Kết luận nhóm:</p>
                <p style={{ paddingLeft: "15px", borderLeft: "3px solid #f59e0b" }}>
                  {MEETING_MINUTES.conclusion}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════ BƯỚC 4: KINH NGHIỆM ══════════ */}
      <div>
        <div style={styles.sectionHeader}>
          <div style={{ ...styles.sectionIcon, background: "rgba(201,169,110,0.15)", color: "var(--accent)" }}>💡</div>
          <div>
            <p style={{ fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.2rem" }}>Bước 4</p>
            <h4 style={styles.sectionTitle}>Kinh nghiệm làm việc từ xa</h4>
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
            Qua buổi họp trực tuyến, tôi nhận ra <strong style={{ color: "var(--text)" }}>Google Meet</strong> hoàn toàn đáp ứng được nhu cầu thảo luận học tập. Điểm mạnh là không cần cài đặt phần mềm và dùng được ngay bằng tài khoản Google của trường đại học. 
            <br/><br/>
            Việc cộng tác trên <strong style={{ color: "var(--text)" }}>Google Docs</strong> giúp cả nhóm đóng góp ý kiến đồng thời theo thời gian thực (real-time) thay vì phải gửi file qua lại gây nhầm lẫn phiên bản. Khó khăn duy nhất gặp phải là kết nối mạng đôi lúc không ổn định của một thành viên, nhưng nhóm đã giải quyết nhanh chóng bằng cách tắt camera để tiết kiệm băng thông và trao đổi qua khung chat.
          </p>
        </div>
      </div>

    </div>
  );
}
