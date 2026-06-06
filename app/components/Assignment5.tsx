"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────── DATA ─────────────── */

const INFOGRAPHIC_DATA = [
  { id: 1, title: "Bình đẳng", desc: "Các bên tham gia quan hệ dân sự đều bình đẳng trước pháp luật", icon: "⚖️" },
  { id: 2, title: "Tự do ý chí", desc: "Tự do cam kết, thỏa thuận nhưng không vi phạm pháp luật", icon: "🕊️" },
  { id: 3, title: "Thiện chí", desc: "Xác lập và thực hiện quyền dân sự một cách trung thực, thiện chí", icon: "🤝" },
  { id: 4, title: "Tự chịu trách nhiệm", desc: "Tự chịu trách nhiệm về hành vi dân sự của mình", icon: "🛡️" },
  { id: 5, title: "Tôn trọng lợi ích", desc: "Không xâm phạm lợi ích quốc gia, quyền lợi người khác", icon: "🏛️" },
];

const SLIDES = [
  { title: "Hợp đồng dân sự vô hiệu là gì?", content: "Trình bày: Lò Văn Tiến\nK67D — ĐH Luật ĐHQGHN" },
  { title: "Định nghĩa", content: "Hợp đồng vô hiệu = hợp đồng không có giá trị pháp lý từ thời điểm giao kết\n\n(Điều 122, BLDS 2015)" },
  { title: "4 trường hợp phổ biến", content: "• Một bên không có năng lực hành vi\n• Bị lừa dối, đe dọa, cưỡng ép\n• Vi phạm điều cấm của pháp luật\n• Nội dung trái đạo đức xã hội" },
  { title: "Ví dụ thực tế", content: "Trẻ 15 tuổi tự ký hợp đồng mua xe máy\n\n→ Hợp đồng VÔ HIỆU vì thiếu năng lực hành vi dân sự đầy đủ (Điều 21 BLDS)" },
  { title: "Kết luận", content: "Luôn kiểm tra tư cách pháp lý của các bên trước khi ký kết hợp đồng!" },
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

export default function Assignment5() {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div style={styles.container}>

      {/* ══════════ SẢN PHẨM 1: BÀI VIẾT ══════════ */}
      <div>
        <div style={styles.sectionHeader}>
          <div style={{ ...styles.sectionIcon, background: "rgba(168,85,247,0.15)", color: "#c084fc" }}>📝</div>
          <div>
            <p style={{ fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.2rem" }}>Sản phẩm 1</p>
            <h4 style={styles.sectionTitle}>Bài viết pháp lý (Claude AI hỗ trợ)</h4>
          </div>
        </div>

        <div style={{ ...styles.card, padding: "2rem", position: "relative" }}>
          {/* Decorative Elements */}
          <div style={{ position: "absolute", top: 0, left: 0, width: "4px", height: "100%", background: "linear-gradient(to bottom, #c084fc, transparent)" }} />
          
          <h2 style={{ fontFamily: "var(--serif)", fontSize: "1.5rem", color: "var(--text)", marginBottom: "0.5rem", textAlign: "center" }}>
            Hợp đồng mua bán tài sản theo BLDS 2015<br />
            <span style={{ fontSize: "1.1rem", color: "var(--muted)", fontStyle: "italic" }}>Những điều người dân cần biết</span>
          </h2>
          <div style={{ textAlign: "center", fontSize: "0.75rem", color: "var(--muted)", marginBottom: "2rem", letterSpacing: "0.05em" }}>
            Căn cứ: Điều 430–443 Bộ luật Dân sự 2015
          </div>

          <div style={{ fontSize: "0.9rem", color: "var(--text)", lineHeight: 1.8, display: "flex", flexDirection: "column", gap: "1rem" }}>
            <p>
              Hàng ngày, chúng ta thực hiện rất nhiều giao dịch mua bán, từ việc mua mớ rau ngoài chợ đến mua một chiếc xe máy hay điện thoại đắt tiền. Tất cả đều là <strong style={{ color: "var(--accent)" }}>hợp đồng mua bán tài sản</strong> dưới góc độ pháp lý. Tuy nhiên, không phải ai cũng nắm rõ quyền và nghĩa vụ của mình khi tham gia các giao dịch này.
            </p>
            
            <div style={{ background: "var(--bg)", padding: "1rem 1.5rem", borderRadius: "8px", borderLeft: "3px solid var(--border)" }}>
              <strong style={{ color: "#c084fc", fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Ví dụ thực tế:</strong>
              <p style={{ marginTop: "0.5rem", fontSize: "0.85rem", color: "var(--muted)" }}>
                Anh A mua một chiếc xe máy cũ của anh B với giá 15 triệu. Anh A đưa tiền, anh B giao xe. Đây chính là một hợp đồng mua bán tài sản, dù hai bên chỉ thỏa thuận bằng miệng.
              </p>
            </div>

            <p style={{ marginTop: "0.5rem" }}>
              <strong style={{ color: "var(--text)" }}>Quyền và nghĩa vụ cơ bản:</strong>
            </p>
            <ul style={{ listStyleType: "disc", paddingLeft: "1.5rem", color: "var(--muted)" }}>
              <li><strong style={{ color: "var(--text)" }}>Bên bán (Anh B):</strong> Có nghĩa vụ giao tài sản đúng tình trạng đã cam kết, đúng thời hạn và địa điểm. Phải bảo đảm quyền sở hữu tài sản (xe không do trộm cắp mà có).</li>
              <li><strong style={{ color: "var(--text)" }}>Bên mua (Anh A):</strong> Có nghĩa vụ nhận tài sản và thanh toán đủ tiền theo thỏa thuận. Có quyền yêu cầu bên bán bảo hành nếu có cam kết.</li>
            </ul>

            <p style={{ marginTop: "0.5rem", color: "var(--accent)" }}>
              <strong>3 Lời khuyên pháp lý thực tế:</strong>
            </p>
            <ol style={{ listStyleType: "decimal", paddingLeft: "1.5rem", color: "var(--muted)", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
              <li><strong>Kiểm tra kỹ tài sản trước khi nhận:</strong> Đừng vội thanh toán nếu chưa xem xét kỹ tình trạng tài sản.</li>
              <li><strong>Nên lập văn bản với tài sản có giá trị:</strong> Dù mua bán bằng miệng vẫn có hiệu lực, nhưng với tài sản lớn (xe cộ, đồ công nghệ đắt tiền), hãy làm giấy tờ viết tay để có bằng chứng.</li>
              <li><strong>Xác minh nguồn gốc:</strong> Tuyệt đối không mua tài sản không rõ nguồn gốc hoặc giá rẻ bất thường để tránh rủi ro tiêu thụ của gian.</li>
            </ol>
            
            <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px dashed var(--border)", fontSize: "0.75rem", color: "var(--muted)", fontStyle: "italic", textAlign: "right" }}>
              * Bản thảo ban đầu được tạo bởi Claude AI, biên tập và bổ sung góc nhìn thực tiễn bởi Lò Văn Tiến.
            </div>
          </div>
        </div>
      </div>

      {/* ══════════ SẢN PHẨM 2: INFOGRAPHIC ══════════ */}
      <div>
        <div style={styles.sectionHeader}>
          <div style={{ ...styles.sectionIcon, background: "rgba(59,130,246,0.15)", color: "#60a5fa" }}>🎨</div>
          <div>
            <p style={{ fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.2rem" }}>Sản phẩm 2</p>
            <h4 style={styles.sectionTitle}>Infographic: 5 Nguyên tắc BLDS 2015</h4>
          </div>
        </div>

        {/* CSS-based Premium Infographic Render */}
        <div style={{
          background: "linear-gradient(145deg, #0f172a, #1e1e24)",
          borderRadius: "12px",
          padding: "3rem 2rem",
          border: "1px solid rgba(59,130,246,0.2)",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* Background grid pattern */}
          <div style={{ position: "absolute", inset: 0, opacity: 0.05, backgroundImage: "radial-gradient(#60a5fa 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
          
          <div style={{ position: "relative", zIndex: 1, maxWidth: "500px", margin: "0 auto" }}>
            <h2 style={{ fontFamily: "var(--sans)", fontSize: "1.8rem", fontWeight: 700, color: "#fff", textAlign: "center", marginBottom: "0.2rem", letterSpacing: "0.05em" }}>
              5 NGUYÊN TẮC CƠ BẢN
            </h2>
            <h3 style={{ fontFamily: "var(--serif)", fontSize: "1.1rem", color: "#93c5fd", textAlign: "center", marginBottom: "3rem", fontWeight: 400, letterSpacing: "0.1em" }}>
              BỘ LUẬT DÂN SỰ 2015
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {INFOGRAPHIC_DATA.map((item, index) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1.5rem",
                    background: "rgba(255,255,255,0.03)",
                    padding: "1.25rem",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}
                >
                  <div style={{
                    width: "50px", height: "50px", borderRadius: "50%",
                    background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "1.5rem", flexShrink: 0, position: "relative"
                  }}>
                    {item.icon}
                    <div style={{ position: "absolute", top: "-5px", left: "-5px", background: "#3b82f6", width: "18px", height: "18px", borderRadius: "50%", fontSize: "0.55rem", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "bold" }}>
                      {item.id}
                    </div>
                  </div>
                  <div>
                    <h4 style={{ color: "#e2e8f0", fontSize: "0.95rem", fontWeight: 600, marginBottom: "0.25rem", fontFamily: "var(--sans)" }}>{item.title}</h4>
                    <p style={{ color: "#94a3b8", fontSize: "0.8rem", lineHeight: 1.5 }}>{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div style={{ textAlign: "center", marginTop: "3rem", fontSize: "0.65rem", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              Nguồn: Điều 3, BLDS 2015 (Luật số 91/2015/QH13)
            </div>
          </div>
        </div>
      </div>

      {/* ══════════ SẢN PHẨM 3: VIDEO ══════════ */}
      <div>
        <div style={styles.sectionHeader}>
          <div style={{ ...styles.sectionIcon, background: "rgba(245,158,11,0.15)", color: "#f59e0b" }}>▶️</div>
          <div>
            <p style={{ fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.2rem" }}>Sản phẩm 3</p>
            <h4 style={styles.sectionTitle}>Video: Hợp đồng vô hiệu (Canva Video)</h4>
          </div>
        </div>

        {/* Video Player Mockup */}
        <div style={{ ...styles.card, background: "#000", position: "relative", aspectRatio: "16/9", display: "flex", flexDirection: "column" }}>
          
          {/* The "Screen" / Slide Content */}
          <div style={{ flex: 1, position: "relative", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {/* Background design for slide */}
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, #4338ca, #312e81)", opacity: 0.8 }} />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
                transition={{ duration: 0.4 }}
                style={{ position: "relative", zIndex: 1, width: "80%", textAlign: "center" }}
              >
                <h2 style={{ fontFamily: "var(--sans)", fontSize: "clamp(1.5rem, 4vw, 2.5rem)", fontWeight: 700, color: "#fff", marginBottom: "1.5rem" }}>
                  {SLIDES[currentSlide].title}
                </h2>
                <div style={{ 
                  color: "#e0e7ff", fontSize: "1rem", lineHeight: 1.8, whiteSpace: "pre-wrap",
                  background: "rgba(0,0,0,0.2)", padding: "1.5rem", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)",
                  textAlign: currentSlide === 2 ? "left" : "center" // left align the bullet points
                }}>
                  {SLIDES[currentSlide].content}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Mock Presenter Webcam */}
            <div style={{
              position: "absolute", bottom: "20px", left: "20px", width: "120px", height: "120px", borderRadius: "50%",
              background: "#1e1b4b", border: "3px solid #818cf8", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 10px 25px rgba(0,0,0,0.5)", zIndex: 10
            }}>
              <span style={{ fontSize: "3rem" }}>👨‍🎓</span>
              <div style={{ position: "absolute", bottom: "10px", background: "rgba(0,0,0,0.6)", padding: "2px 8px", borderRadius: "10px", fontSize: "0.6rem", color: "#fff" }}>Lò Văn Tiến</div>
            </div>
          </div>

          {/* Video Controls bar */}
          <div style={{ height: "48px", background: "rgba(20,20,20,0.95)", display: "flex", alignItems: "center", padding: "0 1rem", gap: "1rem", borderTop: "1px solid #333", zIndex: 10 }}>
            {/* Play/Pause Button (just cycles slides for demo) */}
            <button 
              onClick={() => setCurrentSlide(prev => (prev + 1) % SLIDES.length)}
              style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", width: "30px", height: "30px", borderRadius: "50%" }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}
              onMouseLeave={e => e.currentTarget.style.background = "none"}
            >
              ▶️
            </button>
            
            {/* Progress Bar */}
            <div style={{ flex: 1, height: "4px", background: "#333", borderRadius: "2px", position: "relative", cursor: "pointer" }}>
              <div style={{ 
                position: "absolute", left: 0, top: 0, height: "100%", background: "#f59e0b", borderRadius: "2px",
                width: `${((currentSlide) / (SLIDES.length - 1)) * 100}%`, transition: "width 0.4s ease"
              }} />
            </div>
            
            <div style={{ color: "#aaa", fontSize: "0.75rem", fontFamily: "monospace" }}>
              Slide {currentSlide + 1} / {SLIDES.length}
            </div>
            <div style={{ color: "#aaa", fontSize: "1rem", cursor: "pointer" }}>⚙️ 🔲</div>
          </div>
        </div>
        <p style={{ fontSize: "0.75rem", color: "var(--muted)", textAlign: "center", marginTop: "1rem", fontStyle: "italic" }}>
          * Nhấn nút Play (▶️) trên thanh điều khiển để xem qua các Slide thuyết trình.
        </p>
      </div>

      {/* ══════════ SẢN PHẨM 4: HÌNH ẢNH MINH CHỨNG ══════════ */}
      <div>
        <div style={styles.sectionHeader}>
          <div style={{ ...styles.sectionIcon, background: "rgba(16,185,129,0.15)", color: "#10b981" }}>🖼️</div>
          <div>
            <p style={{ fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.2rem" }}>Sản phẩm 4</p>
            <h4 style={styles.sectionTitle}>Sơ đồ tư duy (Mind Map) & Hình ảnh thực hành</h4>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {/* Mind Map Image */}
          <div style={{ ...styles.card, padding: "1rem", background: "var(--bg2)", position: "relative" }}>
            <div style={{ position: "absolute", top: "1.5rem", left: "1.5rem", background: "rgba(0,0,0,0.6)", padding: "4px 10px", borderRadius: "20px", fontSize: "0.7rem", color: "#fff", zIndex: 10, border: "1px solid rgba(255,255,255,0.2)", backdropFilter: "blur(4px)" }}>
              🧠 NotebookLM
            </div>
            <div style={{ width: "100%", borderRadius: "6px", overflow: "hidden", border: "1px solid var(--border)", background: "#fff" }}>
              <img src="/mindmap.png" alt="NotebookLM Mind Map" style={{ width: "100%", height: "auto", display: "block" }} />
            </div>
            <p style={{ fontSize: "0.8rem", color: "var(--muted)", textAlign: "center", marginTop: "1rem", fontStyle: "italic" }}>
              Sơ đồ tư duy hệ thống hóa kiến thức được tạo bằng công cụ AI (NotebookLM).
            </p>
          </div>
          
          {/* Practice Image */}
          <div style={{ ...styles.card, padding: "1rem", background: "var(--bg2)", position: "relative" }}>
            <div style={{ position: "absolute", top: "1.5rem", left: "1.5rem", background: "rgba(0,0,0,0.6)", padding: "4px 10px", borderRadius: "20px", fontSize: "0.7rem", color: "#fff", zIndex: 10, border: "1px solid rgba(255,255,255,0.2)", backdropFilter: "blur(4px)" }}>
              📸 Thực hành AI
            </div>
            <div style={{ width: "100%", borderRadius: "6px", overflow: "hidden", border: "1px solid var(--border)", background: "#fff" }}>
              <img src="/image.png" alt="Thực hành AI" style={{ width: "100%", height: "auto", display: "block" }} />
            </div>
            <p style={{ fontSize: "0.8rem", color: "var(--muted)", textAlign: "center", marginTop: "1rem", fontStyle: "italic" }}>
              Minh chứng thao tác thực hành với các công cụ số trong quá trình học tập.
            </p>
          </div>
        </div>
      </div>

      {/* ══════════ BƯỚC CUỐI: MÔ TẢ QUÁ TRÌNH ══════════ */}
      <div>
        <div style={styles.sectionHeader}>
          <div style={{ ...styles.sectionIcon, background: "rgba(201,169,110,0.15)", color: "var(--accent)" }}>💡</div>
          <div>
            <p style={{ fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.2rem" }}>Tổng kết</p>
            <h4 style={styles.sectionTitle}>Đánh giá quá trình sáng tạo với AI</h4>
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
            Trong bài tập này, tôi đã sử dụng Claude để tạo bản nháp bài viết giải thích pháp luật, sau đó tự mình chỉnh sửa ngôn từ và bổ sung quan điểm cá nhân để bài viết mang tính thực tiễn cao hơn. Với Infographic, tôi dùng AI tóm tắt 5 nguyên tắc cơ bản của BLDS 2015 thành ngôn ngữ dễ hiểu nhất, sau đó trực quan hóa trên Canva. Cuối cùng, chức năng Canva Video giúp tôi nhanh chóng tạo ra một video thuyết trình ngắn gọn về hợp đồng vô hiệu.
            <br/><br/>
            Quá trình này cho tôi thấy AI rất xuất sắc trong việc tổng hợp và cấu trúc hóa thông tin, nhưng <strong style={{ color: "var(--text)" }}>sự kiểm duyệt của con người</strong> — đặc biệt là tính chính xác về mặt pháp lý và việc đưa ra các ví dụ thực tiễn sinh động — vẫn là yếu tố quyết định tạo nên giá trị cốt lõi của sản phẩm.
          </p>
        </div>
      </div>

    </div>
  );
}
