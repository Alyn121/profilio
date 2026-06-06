# Bài Tập 1: Thao Tác Cơ Bản Với Tệp Tin & Thư Mục

## Hướng Dẫn Tổ Chức Thư Mục & Quy Tắc Đặt Tên

**Sinh viên:** Lò Văn Tiến | **MSSV:** 22061380 | **Lớp:** K67D  
**Ngày hoàn thành:** 06/09/2024

---

## 1. Cấu Trúc Thư Mục

```
📁 K67D_HocTap/
├── 📁 HK1_2024-2025/
│   ├── 📁 01_Luat-Dan-Su/
│   │   ├── 📁 Tai-lieu/
│   │   ├── 📁 Bai-tap/
│   │   └── 📁 De-cuong/
│   ├── 📁 02_Nhap-Mon-CNSO/
│   │   ├── 📁 Tai-lieu/
│   │   ├── 📁 Bai-tap/
│   │   └── 📁 Portfolio/
│   └── 📁 03_Mon-Khac/
└── 📁 Tai-lieu-chung/
    ├── 📁 BLDS-2015/
    └── 📁 Van-ban-phap-luat/
```

---

## 2. Quy Tắc Đặt Tên

### A. Đối với Thư Mục:

| Quy Tắc | Ví Dụ | Lý Do |
|---------|-------|-------|
| Không dấu tiếng Việt | `Luat-Dan-Su` (không phải `Luật-Dân-Sự`) | Tương thích với mọi hệ điều hành |
| Dùng `-` thay dấu cách | `Tai-lieu` (không phải `Tai lieu`) | Dễ nhận diện, tránh lỗi path |
| Số thứ tự ở đầu | `01_Luat-Dan-Su`, `02_Nhap-Mon-CNSO` | Tự động sắp xếp theo thứ tự |
| Chữ cái thường | `bai-tap` (không phải `Bai-Tap`) | Thống nhất, chuyên nghiệp |

### B. Đối với File:

| Format | Ví Dụ | Lợi Ích |
|--------|-------|---------|
| `YYYY-MM-DD_noi-dung.ext` | `2024-09-01_De-cuong-Luat-Dan-Su.pdf` | Tự động sắp xếp theo ngày tháng |
| ISO 8601 date format | `2024-09-15_BLDS-2015-tom-tat.docx` | Chuẩn quốc tế, dễ bảo trì |
| Rõ ràng nội dung | Tránh: `file1.pdf`, `homework.docx` | Biết ngay nội dung là gì |

---

## 3. Ví Dụ Thực Tế

### ✅ Tên File Đúng:
- `2024-09-01_De-cuong-Luat-Dan-Su.docx`
- `2024-09-10_Bai-tap-1-quan-ly-file.pdf`
- `2024-08-20_Tai-lieu-1-co-ban.pdf`
- `2024-09-15_BLDS-2015-tom-tat.pdf`

### ❌ Tên File Sai:
- `Đề cương Luật Dân Sự.pdf` (có dấu tiếng Việt, có dấu cách)
- `BaiTap1.docx` (không có ngày tháng, không rõ nội dung)
- `file_new_FINAL_v3.pdf` (không rõ ý nghĩa, khó quản lý phiên bản)
- `report.pdf` (quá chung chung)

---

## 4. Lợi Ích Của Cách Tổ Chức Này

### 🎯 Dễ Tìm Kiếm
- Nhìn vào đường dẫn biết ngay file ở môn nào, học kỳ nào, loại tài liệu gì
- Ví dụ: `HK1_2024-2025/01_Luat-Dan-Su/Tai-lieu/2024-08-20_Tai-lieu-1-co-ban.pdf`

### 📅 Tự Động Sắp Xếp
- Vì dùng `YYYY-MM-DD`, file tự động sort theo thời gian
- Năm 2024 trước, tháng 09 trước, ngày 15 trước (từ lớn đến nhỏ)
- Windows Explorer, Mac Finder, Google Drive đều sắp xếp đúng

### 🖥️ Tương Thích Đa Nền Tảng
- Không dấu tiếng Việt: hoạt động tốt trên Windows, macOS, Linux, server web
- Không dấu cách: tránh lỗi khi gọi file từ terminal/command line
- Không ký tự đặc biệt: tránh conflict với hệ file systems

### 📚 Chuyên Nghiệp & Dễ Bảo Trì
- Tuân thủ chuẩn ISO 8601 cho định dạng ngày tháng
- Nhìn chuyên nghiệp, khi share hay upload tài liệu trên hệ thống đại học
- Người khác cũng dễ hiểu cấu trúc của bạn

### ⏰ Dễ Quản Lý Phiên Bản & Backup
- Biết ngay khi nào cần backup (file nào cũ nhất, mới nhất)
- Khi làm nhóm, dễ phân biệt ai nộp bài khi nào
- Dễ tìm bài nộp hạn, nộp muộn theo ngày tháng

---

## 5. Áp Dụng Lâu Dài

Quy tắc này không chỉ dùng cho học phần này, mà bạn nên áp dụng suốt cuộc sống học tập và công tác:

- ✅ Luôn dùng ngày tháng ở đầu file quan trọng
- ✅ Không dấu tiếng Việt cho thư mục chính
- ✅ Số thứ tự cho các thư mục tuần tự
- ✅ Quy tắc đặt tên nhất quán trong cả dự án/năm học

Khi bạn trở thành luật sư và phải quản lý hàng trăm hồ sơ, đơn kiện, văn bản hợp đồng, cách tổ chức này sẽ giúp bạn **tiết kiệm hàng giờ** trong tìm kiếm và sắp xếp tài liệu.

---

## 6. Checklist Hoàn Thành Bài Tập

- [x] Tạo cấu trúc thư mục theo mẫu
- [x] Tạo 3-4 file Word/PDF đặt tên đúng quy tắc
- [x] Chụp 2 ảnh: (1) toàn bộ cây thư mục, (2) chi tiết một folder
- [x] Viết mô tả quy tắc đặt tên (file này)
- [ ] Nộp portfolio có ảnh & mô tả
- [ ] Đạt điểm A

---

## 7. Tham Khảo Thêm

- **Chuẩn ISO 8601:** https://en.wikipedia.org/wiki/ISO_8601 (định dạng ngày tháng quốc tế)
- **Best Practices File Naming:** https://en.wikipedia.org/wiki/Filename (Wikipedia)
- **GitHub File Naming Convention:** Hầu hết các repo công cộng đều sử dụng quy tắc tương tự

---

**Tài liệu này là hướng dẫn thực hành cho Bài Tập 1 — Thao Tác Cơ Bản Với Tệp Tin & Thư Mục**  
**Học phần: Nhập Môn Công Nghệ Số & Ứng Dụng AI | Trường ĐH Luật, ĐHQGHN**
