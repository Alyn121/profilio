import React from "react";

export default function Assignment1() {
  return (
    <div className="space-y-8">
      {/* Tiêu đề */}
      <div>
        <h3 className="text-2xl font-semibold mb-2">📁 Cấu Trúc Thư Mục Tối Ưu</h3>
        <p className="text-var(--muted) mb-4">
          Tổ chức cấu trúc thư mục theo học kỳ → môn học → loại tài liệu để dễ tìm kiếm và quản lý dữ liệu học tập hiệu quả.
        </p>
      </div>

      {/* Cấu trúc thư mục */}
      <div className="bg-var(--surface) p-6 rounded-lg border border-var(--border) font-mono text-sm overflow-x-auto">
        <pre className="whitespace-pre-wrap break-words text-var(--text)">
{`📁 K67D_HocTap/
├── 📁 HK1_2024-2025/
│   ├── 📁 01_Luat-Dan-Su/
│   │   ├── 📁 Tai-lieu/
│   │   │   └── 📄 2024-08-20_Tai-lieu-1-co-ban.pdf
│   │   ├── 📁 Bai-tap/
│   │   │   ├── 📄 2024-09-10_Bai-tap-1-quan-ly-file.docx
│   │   │   └── 📄 2024-09-15_Bai-tap-2-ho-tro.docx
│   │   └── 📁 De-cuong/
│   │       ├── 📄 2024-09-01_De-cuong-Luat-Dan-Su.docx
│   │       └── 📄 2024-09-05_Nhap-mon-phap-ly.docx
│   ├── 📁 02_Nhap-Mon-CNSO/
│   │   ├── 📁 Tai-lieu/
│   │   ├── 📁 Bai-tap/
│   │   └── 📁 Portfolio/
│   └── 📁 03_Mon-Khac/
└── 📁 Tai-lieu-chung/
    ├── 📁 BLDS-2015/
    │   └── 📄 2024-09-15_BLDS-2015-tom-tat.pdf
    └── 📁 Van-ban-phap-luat/`}
        </pre>
      </div>

      {/* Quy tắc đặt tên */}
      <div>
        <h4 className="text-lg font-semibold mb-3">📝 Quy Tắc Đặt Tên File & Thư Mục</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Thư mục */}
          <div className="bg-var(--surface) p-4 rounded-lg border border-var(--border)">
            <h5 className="font-semibold mb-2 text-var(--accent)">Thư Mục</h5>
            <ul className="space-y-2 text-sm">
              <li>✓ Không dấu tiếng Việt</li>
              <li>✓ Dùng <code className="bg-var(--bg) px-2 py-1 rounded">-</code> thay dấu cách</li>
              <li>✓ Số thứ tự: <code className="bg-var(--bg) px-2 py-1 rounded">01_</code>, <code className="bg-var(--bg) px-2 py-1 rounded">02_</code></li>
              <li>✓ Ví dụ: <code className="bg-var(--bg) px-2 py-1 rounded">01_Luat-Dan-Su</code></li>
            </ul>
          </div>

          {/* File */}
          <div className="bg-var(--surface) p-4 rounded-lg border border-var(--border)">
            <h5 className="font-semibold mb-2 text-var(--accent)">File</h5>
            <ul className="space-y-2 text-sm">
              <li>✓ Format: <code className="bg-var(--bg) px-2 py-1 rounded">YYYY-MM-DD_noi-dung.ext</code></li>
              <li>✓ Tự động sắp xếp theo thời gian</li>
              <li>✓ Ví dụ: <code className="bg-var(--bg) px-2 py-1 rounded">2024-09-01_De-cuong-Luat.pdf</code></li>
              <li>✓ Rõ ràng về nội dung & ngày tháng</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Lợi ích */}
      <div>
        <h4 className="text-lg font-semibold mb-3">✨ Lợi Ích Của Cách Tổ Chức Này</h4>
        <div className="space-y-2">
          {[
            "Dễ dàng tìm kiếm: Biết ngay file ở môn nào, chuỗi học hay tài liệu",
            "Tự động sắp xếp: File tự sort theo ngày tháng nhờ format YYYY-MM-DD",
            "Tương thích đa nền: Không dấu tiếng Việt hoạt động tốt trên Windows, macOS, Linux, server web",
            "Chuyên nghiệp: Tuân thủ chuẩn ISO 8601 cho định dạng ngày tháng",
            "Dễ lên lịch: Nhìn vào tên file biết ngay khi nào cần backup, nộp bài, hoặc review"
          ].map((benefit, idx) => (
            <div key={idx} className="flex gap-3">
              <span className="text-var(--accent) flex-shrink-0">→</span>
              <p className="text-var(--text)">{benefit}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Location */}
      <div className="bg-var(--accent) bg-opacity-10 p-4 rounded-lg border border-var(--accent) border-opacity-30">
        <p className="text-sm text-var(--text)">
          <strong>📍 Vị trí thực tế:</strong> <code className="bg-var(--bg) px-2 py-1 rounded">D:\K67D_HocTap\</code>
        </p>
        <p className="text-sm text-var(--muted) mt-2">
          Đây là bài tập thực hành tổ chức dữ liệu cơ bản - nền tảng cho các công việc lớn hơn trong học tập Luật Dân sự và Công nghệ số.
        </p>
      </div>
    </div>
  );
}
