"use client";
import React from "react";
import { motion } from "framer-motion";

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

export default function Assignment1() {
  return (
    <div style={styles.container}>

      {/* ══════════ BƯỚC 1: CẤU TRÚC THƯ MỤC ══════════ */}
      <div>
        <div style={styles.sectionHeader}>
          <div style={{ ...styles.sectionIcon, background: "rgba(59,130,246,0.15)", color: "#3b82f6" }}>📁</div>
          <div>
            <p style={{ fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.2rem" }}>Thực hành</p>
            <h4 style={styles.sectionTitle}>Cấu trúc thư mục học tập tối ưu</h4>
          </div>
        </div>

        <p style={{ fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
          Tổ chức cấu trúc thư mục theo thứ bậc <strong>Học kỳ → Môn học → Loại tài liệu</strong> giúp việc quản lý, tìm kiếm và sao lưu dữ liệu học tập ngành Luật trở nên hiệu quả và khoa học hơn.
        </p>

        <div style={{ ...styles.card, background: "var(--bg2)", padding: "1.5rem", position: "relative" }}>
          <div style={{ position: "absolute", top: "1rem", right: "1.5rem", fontSize: "0.7rem", color: "var(--muted)", fontFamily: "monospace", border: "1px solid var(--border)", padding: "2px 8px", borderRadius: "4px" }}>
            D:\K67D_HocTap
          </div>
          
          <pre style={{ fontFamily: "monospace", fontSize: "0.85rem", lineHeight: 1.8, color: "var(--text)", overflowX: "auto" }}>
            <span style={{ color: "var(--accent)" }}>📁 K67D_HocTap/</span><br/>
            ├── <span style={{ color: "#60a5fa" }}>📁 HK1_2026-2027/</span><br/>
            │   ├── <span style={{ color: "#34d399" }}>📁 01_Luat-Dan-Su/</span><br/>
            │   │   ├── 📁 Tai-lieu/<br/>
            │   │   │   └── 📄 2026-08-20_Tai-lieu-1-co-ban.pdf<br/>
            │   │   ├── 📁 Bai-tap/<br/>
            │   │   │   ├── 📄 2026-09-10_Bai-tap-1-quan-ly-file.docx<br/>
            │   │   │   └── 📄 2026-09-15_Bai-tap-2-ho-tro.docx<br/>
            │   │   └── 📁 De-cuong/<br/>
            │   │       ├── 📄 2026-09-01_De-cuong-Luat-Dan-Su.docx<br/>
            │   │       └── 📄 2026-09-05_Nhap-mon-phap-ly.docx<br/>
            │   ├── <span style={{ color: "#34d399" }}>📁 02_Nhap-Mon-CNSO/</span><br/>
            │   │   ├── 📁 Tai-lieu/<br/>
            │   │   ├── 📁 Bai-tap/<br/>
            │   │   └── 📁 Portfolio/<br/>
            │   └── <span style={{ color: "#34d399" }}>📁 03_Mon-Khac/</span><br/>
            └── <span style={{ color: "#60a5fa" }}>📁 Tai-lieu-chung/</span><br/>
                ├── 📁 BLDS-2015/<br/>
                │   └── 📄 2026-09-15_BLDS-2015-tom-tat.pdf<br/>
                └── 📁 Van-ban-phap-luat/
          </pre>
        </div>
      </div>

      {/* ══════════ BƯỚC 2: QUY TẮC ĐẶT TÊN ══════════ */}
      <div>
        <div style={styles.sectionHeader}>
          <div style={{ ...styles.sectionIcon, background: "rgba(16,185,129,0.15)", color: "#10b981" }}>📝</div>
          <div>
            <p style={{ fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.2rem" }}>Nguyên tắc</p>
            <h4 style={styles.sectionTitle}>Quy tắc đặt tên (Naming Convention)</h4>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem" }}>
          
          {/* Quy tắc thư mục */}
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ ...styles.card, padding: "1.5rem" }}>
            <h5 style={{ fontSize: "0.9rem", color: "var(--accent)", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ fontSize: "1.2rem" }}>📂</span> Thư mục
            </h5>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.85rem", color: "var(--text)" }}>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                <span style={{ color: "#10b981", marginTop: "2px" }}>✓</span>
                <span>Không sử dụng dấu tiếng Việt.</span>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                <span style={{ color: "#10b981", marginTop: "2px" }}>✓</span>
                <span>Dùng ký tự <code style={{ background: "var(--bg)", padding: "2px 6px", borderRadius: "4px", color: "#f59e0b" }}>-</code> thay cho khoảng trắng.</span>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                <span style={{ color: "#10b981", marginTop: "2px" }}>✓</span>
                <span>Đánh số thứ tự để sắp xếp: <code style={{ background: "var(--bg)", padding: "2px 6px", borderRadius: "4px" }}>01_</code>, <code style={{ background: "var(--bg)", padding: "2px 6px", borderRadius: "4px" }}>02_</code>.</span>
              </li>
            </ul>
            <div style={{ marginTop: "1.25rem", padding: "0.75rem", background: "var(--bg2)", borderLeft: "3px solid #3b82f6", borderRadius: "0 6px 6px 0", fontSize: "0.8rem", color: "var(--muted)", fontFamily: "monospace" }}>
              Ví dụ: <span style={{ color: "#60a5fa" }}>01_Luat-Dan-Su</span>
            </div>
          </motion.div>

          {/* Quy tắc tệp tin */}
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} style={{ ...styles.card, padding: "1.5rem" }}>
            <h5 style={{ fontSize: "0.9rem", color: "var(--accent)", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ fontSize: "1.2rem" }}>📄</span> Tệp tin (File)
            </h5>
            <ul style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.85rem", color: "var(--text)" }}>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                <span style={{ color: "#10b981", marginTop: "2px" }}>✓</span>
                <span>Định dạng ngày chuẩn ISO: <code style={{ background: "var(--bg)", padding: "2px 6px", borderRadius: "4px", color: "#f59e0b" }}>YYYY-MM-DD</code>.</span>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                <span style={{ color: "#10b981", marginTop: "2px" }}>✓</span>
                <span>Tên file nêu rõ nội dung và mục đích.</span>
              </li>
              <li style={{ display: "flex", alignItems: "flex-start", gap: "0.5rem" }}>
                <span style={{ color: "#10b981", marginTop: "2px" }}>✓</span>
                <span>Tự động sắp xếp (sort) theo trình tự thời gian.</span>
              </li>
            </ul>
            <div style={{ marginTop: "1.25rem", padding: "0.75rem", background: "var(--bg2)", borderLeft: "3px solid #3b82f6", borderRadius: "0 6px 6px 0", fontSize: "0.8rem", color: "var(--muted)", fontFamily: "monospace" }}>
              Ví dụ: <span style={{ color: "#60a5fa" }}>2026-09-01_De-cuong.pdf</span>
            </div>
          </motion.div>

        </div>
      </div>

      {/* ══════════ BƯỚC 3: KẾT LUẬN ══════════ */}
      <div>
        <div style={styles.sectionHeader}>
          <div style={{ ...styles.sectionIcon, background: "rgba(245,158,11,0.15)", color: "#f59e0b" }}>✨</div>
          <div>
            <p style={{ fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.2rem" }}>Lợi ích</p>
            <h4 style={styles.sectionTitle}>Lợi ích của việc chuẩn hóa dữ liệu</h4>
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
          <div style={{ fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.8, fontStyle: "italic", paddingTop: "0.5rem", position: "relative", zIndex: 1 }}>
            <p style={{ marginBottom: "0.75rem" }}>
              <strong style={{ color: "var(--text)", fontStyle: "normal" }}>Dễ dàng tìm kiếm & Truy xuất:</strong> Việc áp dụng chuẩn YYYY-MM-DD giúp mọi file tự động sắp xếp theo thứ tự thời gian trên cả Windows và macOS, không bao giờ bị lẫn lộn giữa các kỳ học.
            </p>
            <p>
              <strong style={{ color: "var(--text)", fontStyle: "normal" }}>Tương thích đa nền tảng:</strong> Việc loại bỏ dấu tiếng Việt và thay khoảng trắng bằng dấu gạch ngang (<code style={{ fontSize: "0.75rem" }}>-</code>) giúp đường dẫn file không bị lỗi mã hóa (encoding) khi tải lên các hệ thống học tập trực tuyến, đính kèm email hay chia sẻ qua Google Drive.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
