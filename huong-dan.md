---
title: Hướng dẫn cài đặt
permalink: /huong-dan/
---


Mỗi nhóm mất khoảng hai phút. Bạn cần là quản trị viên Jira.

## 1. Cài app và mở trang cài đặt

1. Cài **Chat Alerts for Jira** từ Atlassian Marketplace.
2. Trên Jira, mở **Cài đặt (⚙) > Ứng dụng (Apps) > Chat Alerts (Telegram & Lark)**.
3. Ở mục **Chung**, chọn ngôn ngữ của tin và múi giờ (dùng cho bản tóm tắt hằng ngày).

## 2a. Thêm nhóm Telegram

1. Trên Telegram, mở **@BotFather**, gửi `/newbot` và làm theo. Chép mã bot nhận được (dạng `123456789:ABC-DEF…`).
2. Thêm bot vào nhóm Telegram. Gửi `/start@TenBot` trong nhóm để bot thấy nhóm.
3. Trên trang cài đặt, bấm **Thêm nhóm Telegram**, dán mã vào ô **Mã bot**.
4. Bấm **Tìm nhóm của tôi**, rồi **Dùng "…"** cạnh tên nhóm. Hoặc tự nhập mã nhóm; nhóm thường bắt đầu bằng `-100`.
5. Chọn dự án và loại tin (xem bước 3), bấm **Lưu**, rồi **Gửi tin thử**.

## 2b. Thêm nhóm Lark (Feishu)

1. Trong nhóm Lark, mở **Cài đặt > Bot > Thêm bot > Bot tùy chỉnh**. Đặt tên và thêm.
2. Chép **địa chỉ webhook**.
3. Nên bật **Xác minh chữ ký** và chép secret. **Không** dùng "Từ khóa tùy chỉnh" hay "Danh sách IP": Atlassian gửi từ nhiều địa chỉ thay đổi và tin của app không chứa từ khóa.
4. Trên trang cài đặt, bấm **Thêm nhóm Lark**, dán webhook vào ô **Địa chỉ webhook**, secret vào ô **Khóa ký**.
5. Chọn dự án và loại tin, bấm **Lưu**, rồi **Gửi tin thử**.

## 3. Chọn tin cho từng nhóm

- **Dự án:** mã dự án cách nhau bằng dấu phẩy, ví dụ `WEB, APP`. Để trống là mọi dự án. Nên chọn dự án để mỗi nhóm chỉ thấy việc của mình.
- **Gửi tin khi có:** việc mới, đổi trạng thái, đổi người làm, bình luận mới.
- **Tóm tắt việc quá hạn mỗi ngày:** danh sách việc chưa xong đã quá hạn, mỗi ngày một lần. Gửi trong khung giờ đã chọn, hoặc chậm tối đa hai giờ nếu Jira đang bận.

## Những gì không bao giờ được gửi

- Issue có mức bảo mật (security level).
- Bình luận chỉ cho một nhóm hoặc vai trò xem.
- Bình luận đã sửa (chỉ gửi bình luận mới).

Ai trong nhóm chat cũng đọc được tin, kể cả người không mở được issue trên Jira. Hãy chọn nhóm và dự án cho phù hợp.

## Khi nhiều việc đổi cùng lúc

Khi sửa hàng loạt hay nhập dữ liệu, mỗi nhóm nhận tối đa 15 tin mỗi phút (Telegram) hoặc 60 tin (Lark). Sau đó nhóm nhận một tin "Nhiều thay đổi cùng lúc" kèm link xem thay đổi gần đây trên Jira, và phút sau báo tiếp như thường.

## Xử lý sự cố

Khi một nhóm không nhận được tin, trang cài đặt hiện cảnh báo ở nhóm đó kèm cách sửa. Các trường hợp hay gặp:

| Lỗi | Cách sửa |
| --- | --- |
| Telegram từ chối mã bot | Mở @BotFather, chọn bot, chọn **API Token**, chép mã hiện tại rồi lưu. |
| Bot bị xóa khỏi nhóm | Thêm lại bot vào nhóm rồi gửi tin thử. |
| Nhóm đã nâng cấp thành siêu nhóm | Bấm **Tìm nhóm của tôi** lại, hoặc nhập mã mới ghi trong cảnh báo. |
| Webhook Lark không còn dùng được | Bot bị xóa hoặc webhook bị đổi. Chép webhook mới rồi lưu. |
| Lark từ chối chữ ký | Dán secret hiện tại của bot (secret đổi khi bấm đặt lại). |
| Sáng nay không có bản tóm tắt | Chỉ gửi khi dự án đã chọn có việc quá hạn. Kiểm tra giờ và múi giờ. |

Vẫn chưa được? Liên hệ [EMAIL HỖ TRỢ]. Trả lời trong một ngày làm việc.

## Gỡ app

Gỡ app sẽ xóa toàn bộ cài đặt và mã đã lưu. Nhớ xóa bot khỏi nhóm Telegram hoặc Lark.
