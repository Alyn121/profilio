"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────── DATA ─────────────── */

const PROMPT_ELEMENTS = [
  {
    name: "Vai trò",
    desc: "Cho AI biết nó đang đóng vai gì",
    example: '"Bạn là giảng viên Luật Dân sự..."',
    icon: "🎭",
    color: "#a855f7"
  },
  {
    name: "Ngữ cảnh",
    desc: "Bối cảnh cụ thể của vấn đề",
    example: '"...đang giải thích cho sinh viên năm nhất..."',
    icon: "🌍",
    color: "#3b82f6"
  },
  {
    name: "Yêu cầu",
    desc: "Cần làm gì chính xác",
    example: '"...hãy phân tích Điều 117 BLDS 2015..."',
    icon: "🎯",
    color: "#ef4444"
  },
  {
    name: "Định dạng",
    desc: "Muốn kết quả trả về dạng gì",
    example: '"...trình bày theo 3 mục: khái niệm, điều kiện, ví dụ thực tế"',
    icon: "📋",
    color: "#22c55e"
  }
];

const PROMPT_PAIRS = [
  {
    id: 1,
    title: "Về hợp đồng dân sự",
    bad: "giải thích hợp đồng dân sự",
    badResult: "Hợp đồng dân sự là sự thỏa thuận giữa các bên về việc xác lập, thay đổi hoặc chấm dứt quyền, nghĩa vụ dân sự. Hợp đồng có thể được giao kết bằng lời nói, bằng văn bản hoặc bằng hành vi cụ thể...",
    good: "Bạn là giảng viên Luật Dân sự đang giải thích cho sinh viên năm nhất.\nTheo BLDS 2015, hãy phân tích Điều 117 về điều kiện có hiệu lực của hợp đồng dân sự. Trình bày theo 3 phần:\n1. Các điều kiện cụ thể\n2. Ví dụ hợp đồng VÔ HIỆU trong thực tế\n3. Hậu quả pháp lý khi hợp đồng vô hiệu",
    goodResult: "Chào các bạn sinh viên năm nhất! Hôm nay chúng ta sẽ tìm hiểu về Điều 117 BLDS 2015.\n\n1. CÁC ĐIỀU KIỆN CỤ THỂ:\n- Chủ thể: Có năng lực pháp luật và năng lực hành vi dân sự phù hợp.\n- Ý chí: Hoàn toàn tự nguyện, không bị ép buộc, lừa dối.\n- Nội dung & Mục đích: Không vi phạm điều cấm của luật, không trái đạo đức xã hội.\n\n2. VÍ DỤ THỰC TẾ (HỢP ĐỒNG VÔ HIỆU):\nA (15 tuổi) tự ý ký hợp đồng bán chiếc xe máy trị giá 30 triệu đồng cho B mà không có sự đồng ý của cha mẹ. Hợp đồng này vô hiệu do A chưa đủ năng lực hành vi dân sự để tự mình xác lập giao dịch này.\n\n3. HẬU QUẢ PHÁP LÝ:\nTheo Điều 131 BLDS 2015, khi hợp đồng vô hiệu, các bên khôi phục lại tình trạng ban đầu, hoàn trả cho nhau những gì đã nhận. Tức là B trả lại xe, A trả lại tiền. Bên có lỗi gây thiệt hại phải bồi thường.",
  },
  {
    id: 2,
    title: "Về bồi thường thiệt hại",
    bad: "bồi thường thiệt hại là gì",
    badResult: "Bồi thường thiệt hại là một hình thức trách nhiệm dân sự nhằm bù đắp những tổn thất về vật chất hoặc tinh thần do hành vi vi phạm pháp luật gây ra. Người gây thiệt hại phải đền bù cho người bị hại...",
    good: "Theo Điều 584-585 BLDS 2015, hãy giải thích:\n- Căn cứ phát sinh trách nhiệm bồi thường thiệt hại ngoài hợp đồng\n- Nguyên tắc bồi thường thiệt hại\nCho 1 tình huống thực tế: A lái xe máy không chú ý đâm vào B gây thương tích. Phân tích A có phải bồi thường không và bồi thường những gì theo luật.",
    goodResult: "Dưới đây là giải thích theo BLDS 2015:\n\n1. CĂN CỨ PHÁT SINH (Điều 584):\nNgười nào có hành vi xâm phạm tính mạng, sức khỏe, danh dự, nhân phẩm, uy tín, tài sản, quyền, lợi ích hợp pháp khác của người khác mà gây thiệt hại thì phải bồi thường.\n\n2. NGUYÊN TẮC BỒI THƯỜNG (Điều 585):\n- Phải được bồi thường toàn bộ và kịp thời.\n- Các bên có thể thỏa thuận về mức bồi thường, hình thức và phương thức.\n- Có thể được giảm mức bồi thường nếu không có lỗi cố ý và thiệt hại quá lớn so với khả năng kinh tế.\n\n3. PHÂN TÍCH TÌNH HUỐNG:\nA lái xe không chú ý đâm vào B. Hành vi của A là có lỗi (vô ý), xâm phạm trực tiếp đến sức khỏe của B. Do đó, A có trách nhiệm bồi thường (căn cứ Điều 584).\nNhững khoản A phải bồi thường cho B (theo Điều 590):\n- Chi phí cứu chữa, phục hồi sức khỏe hợp lý (tiền viện phí, thuốc men).\n- Thu nhập thực tế bị mất hoặc bị giảm sút của B trong thời gian nằm viện.\n- Chi phí bồi dưỡng cho người chăm sóc B.\n- Một khoản tiền bù đắp tổn thất về tinh thần (do các bên thỏa thuận, tối đa không quá 50 tháng lương cơ sở).",
  },
  {
    id: 3,
    title: "Tóm tắt văn bản pháp luật",
    bad: "tóm tắt BLDS 2015",
    badResult: "Bộ luật Dân sự 2015 (Luật số 91/2015/QH13) gồm 6 phần, 27 chương và 689 điều, có hiệu lực từ 01/01/2017. Bộ luật quy định địa vị pháp lý, chuẩn mực pháp lý về cách ứng xử của cá nhân, pháp nhân; quyền, nghĩa vụ về nhân thân và tài sản của cá nhân, pháp nhân trong các quan hệ được hình thành trên cơ sở bình đẳng, tự do ý chí, độc lập về tài sản và tự chịu trách nhiệm...",
    good: "Hãy tóm tắt Phần thứ ba của BLDS 2015 (Nghĩa vụ và hợp đồng, Điều 274–429) theo sơ đồ phân cấp, chỉ giữ lại các điểm quan trọng nhất mà sinh viên Luật năm nhất cần nắm. Giới hạn trong 300 từ.",
    goodResult: "TÓM TẮT PHẦN THỨ BA BLDS 2015 (Điều 274 - 429)\n\nI. QUY ĐỊNH CHUNG VỀ NGHĨA VỤ\n1. Khái niệm (Điều 274): Nghĩa vụ là việc mà một bên phải chuyển giao tài sản, thực hiện hoặc không thực hiện một công việc vì lợi ích của bên kia.\n2. Căn cứ phát sinh:\n   - Hợp đồng\n   - Hành vi pháp lý đơn phương\n   - Gây thiệt hại do vi phạm pháp luật\n3. Chấm dứt nghĩa vụ: Khi đã hoàn thành, có thỏa thuận bù trừ, hoặc người có quyền miễn việc thực hiện.\n\nII. HỢP ĐỒNG\n1. Khái niệm (Điều 385): Sự thỏa thuận xác lập, thay đổi, chấm dứt quyền, nghĩa vụ dân sự.\n2. Giao kết hợp đồng:\n   - Đề nghị giao kết: Thể hiện rõ ý định và ràng buộc trách nhiệm.\n   - Chấp nhận đề nghị: Sự trả lời đồng ý toàn bộ nội dung.\n3. Các loại hợp đồng chủ yếu (Điều 402):\n   - Hợp đồng song vụ / đơn vụ\n   - Hợp đồng chính / phụ\n4. Phụ lục hợp đồng (Điều 403): Chi tiết hóa các điều khoản, có hiệu lực như hợp đồng.\n5. Thực hiện & Chấm dứt: Phải thực hiện đúng, đầy đủ, trung thực. Hợp đồng chấm dứt khi hoàn thành, hủy bỏ hoặc đơn phương chấm dứt có căn cứ pháp luật.",
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
  chatBubbleBad: {
    background: "var(--bg2)",
    border: "1px solid var(--border)",
    borderRadius: "12px 12px 12px 0",
    padding: "1rem",
    color: "var(--muted)",
    fontSize: "0.82rem",
    lineHeight: 1.7,
    position: "relative" as const,
  },
  chatBubbleGood: {
    background: "rgba(201,169,110,0.08)",
    border: "1px solid rgba(201,169,110,0.2)",
    borderRadius: "12px 12px 12px 0",
    padding: "1rem",
    color: "var(--accent2)",
    fontSize: "0.82rem",
    lineHeight: 1.7,
    position: "relative" as const,
  },
};

/* ─────────────── COMPONENT ─────────────── */

export default function Assignment3() {
  const [activeTab, setActiveTab] = useState(1);
  const activePair = PROMPT_PAIRS.find(p => p.id === activeTab)!;

  return (
    <div style={styles.container}>

      {/* ══════════ BƯỚC 1: 4 YẾU TỐ PROMPT ══════════ */}
      <div>
        <div style={styles.sectionHeader}>
          <div style={{ ...styles.sectionIcon, background: "rgba(168,85,247,0.15)", color: "#c084fc" }}>🧠</div>
          <div>
            <p style={{ fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.2rem" }}>Bước 1</p>
            <h4 style={styles.sectionTitle}>Hiểu cấu trúc Prompt hiệu quả</h4>
          </div>
        </div>

        <p style={{ fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.7, marginBottom: "1.5rem" }}>
          Prompt xấu thường quá ngắn, không có ngữ cảnh, không rõ yêu cầu đầu ra. Một Prompt được tối ưu hóa cần hội đủ 4 yếu tố then chốt:
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "0.75rem" }}>
          {PROMPT_ELEMENTS.map((el, i) => (
            <motion.div
              key={el.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                borderTop: `3px solid ${el.color}`,
                borderRadius: "8px",
                padding: "1.25rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem" }}>
                <span style={{ fontSize: "1.2rem" }}>{el.icon}</span>
                <span style={{ fontSize: "0.85rem", color: "var(--text)", fontWeight: 500 }}>{el.name}</span>
              </div>
              <p style={{ fontSize: "0.75rem", color: "var(--muted)", lineHeight: 1.6, marginBottom: "0.75rem" }}>
                {el.desc}
              </p>
              <div style={{
                background: "var(--bg)",
                padding: "0.5rem 0.75rem",
                borderRadius: "4px",
                border: "1px solid var(--border)",
                fontSize: "0.7rem",
                color: el.color,
                fontFamily: "var(--serif)",
                fontStyle: "italic",
              }}>
                {el.example}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ══════════ BƯỚC 2: THỰC HÀNH 3 CẶP PROMPT ══════════ */}
      <div>
        <div style={styles.sectionHeader}>
          <div style={{ ...styles.sectionIcon, background: "rgba(59,130,246,0.15)", color: "#60a5fa" }}>💬</div>
          <div>
            <p style={{ fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.2rem" }}>Bước 2</p>
            <h4 style={styles.sectionTitle}>So sánh 3 cặp Prompt thực tế</h4>
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem" }}>
          {PROMPT_PAIRS.map((pair) => (
            <button
              key={pair.id}
              onClick={() => setActiveTab(pair.id)}
              style={{
                padding: "0.6rem 1rem",
                background: activeTab === pair.id ? "rgba(201,169,110,0.15)" : "var(--surface)",
                border: `1px solid ${activeTab === pair.id ? "rgba(201,169,110,0.4)" : "var(--border)"}`,
                borderRadius: "20px",
                cursor: "pointer",
                fontFamily: "var(--sans)",
                fontSize: "0.75rem",
                color: activeTab === pair.id ? "var(--accent)" : "var(--muted)",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem"
              }}
            >
              <span>{activeTab === pair.id ? "🎯" : "📄"}</span>
              {pair.title}
            </button>
          ))}
        </div>

        {/* Active Comparison */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            
            {/* BAD PROMPT */}
            <div style={{ ...styles.card, borderLeft: "3px solid #ef4444" }}>
              <div style={{ padding: "0.75rem 1.25rem", background: "rgba(239,68,68,0.05)", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ fontSize: "0.8rem" }}>❌</span>
                <span style={{ fontSize: "0.75rem", color: "#ef4444", fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>Prompt cũ (Quá chung chung)</span>
              </div>
              <div style={{ padding: "1.25rem", display: "grid", gridTemplateColumns: "1fr", gap: "1.25rem" }}>
                <div>
                  <p style={{ fontSize: "0.65rem", letterSpacing: "0.1em", color: "var(--muted)", textTransform: "uppercase", marginBottom: "0.5rem" }}>Câu lệnh của bạn</p>
                  <div style={{ background: "var(--bg)", padding: "0.75rem 1rem", borderRadius: "6px", border: "1px solid var(--border)", fontSize: "0.82rem", color: "var(--text)", fontFamily: "monospace" }}>
                    {activePair.bad}
                  </div>
                </div>
                <div>
                  <p style={{ fontSize: "0.65rem", letterSpacing: "0.1em", color: "var(--muted)", textTransform: "uppercase", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "4px" }}>
                    🤖 AI Trả lời
                  </p>
                  <div style={styles.chatBubbleBad}>
                    {activePair.badResult}
                  </div>
                </div>
              </div>
            </div>

            {/* GOOD PROMPT */}
            <div style={{ ...styles.card, borderLeft: "3px solid #22c55e", boxShadow: "0 10px 30px rgba(34,197,94,0.05)" }}>
              <div style={{ padding: "0.75rem 1.25rem", background: "rgba(34,197,94,0.05)", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span style={{ fontSize: "0.8rem" }}>✅</span>
                <span style={{ fontSize: "0.75rem", color: "#22c55e", fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>Prompt Mới (Tối ưu 4 yếu tố)</span>
              </div>
              <div style={{ padding: "1.25rem", display: "grid", gridTemplateColumns: "1fr", gap: "1.25rem" }}>
                <div>
                  <p style={{ fontSize: "0.65rem", letterSpacing: "0.1em", color: "var(--muted)", textTransform: "uppercase", marginBottom: "0.5rem" }}>Câu lệnh của bạn</p>
                  <div style={{ background: "rgba(201,169,110,0.05)", padding: "0.75rem 1rem", borderRadius: "6px", border: "1px solid rgba(201,169,110,0.2)", fontSize: "0.82rem", color: "var(--accent)", whiteSpace: "pre-wrap", lineHeight: 1.6 }}>
                    {activePair.good}
                  </div>
                </div>
                <div>
                  <p style={{ fontSize: "0.65rem", letterSpacing: "0.1em", color: "var(--muted)", textTransform: "uppercase", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "4px" }}>
                    ✨ AI Trả lời (Minh họa)
                  </p>
                  <div style={styles.chatBubbleGood}>
                    {activePair.goodResult.split('\n').map((line, i) => (
                      <React.Fragment key={i}>
                        {line}
                        {i < activePair.goodResult.split('\n').length - 1 && <br />}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </motion.div>
        </AnimatePresence>
      </div>

      {/* ══════════ BƯỚC 4: NHẬN XÉT ĐÁNH GIÁ ══════════ */}
      <div>
        <div style={styles.sectionHeader}>
          <div style={{ ...styles.sectionIcon, background: "rgba(201,169,110,0.15)", color: "var(--accent)" }}>📝</div>
          <div>
            <p style={{ fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--accent)", marginBottom: "0.2rem" }}>Bước 4</p>
            <h4 style={styles.sectionTitle}>Kết luận về cách viết Prompt</h4>
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
            Prompt ban đầu cho kết quả chung chung, không có căn cứ pháp lý cụ thể và không có ví dụ thực tế. Sau khi bổ sung <span style={{ color: "var(--accent)" }}>vai trò</span>, <span style={{ color: "var(--accent)" }}>số điều luật</span> và <span style={{ color: "var(--accent)" }}>yêu cầu định dạng rõ ràng</span>, AI trả lời đúng trọng tâm hơn, trích dẫn đúng điều khoản BLDS 2015 và đưa ra tình huống minh họa có giá trị học tập cao. 
            <br/><br/>
            <strong style={{ color: "var(--text)", fontWeight: 500 }}>Kết luận:</strong> Càng cung cấp ngữ cảnh cụ thể trong Prompt, AI càng trở thành một trợ lý đắc lực và hữu ích hơn cho việc nghiên cứu pháp lý.
          </p>
        </div>
      </div>

    </div>
  );
}
