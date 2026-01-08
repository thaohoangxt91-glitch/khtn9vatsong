
import { Question } from './types';

export const QUESTIONS: Question[] = [
  // Bài 33 & 34 (Giữ nguyên hoặc rút gọn để nhường chỗ cho 35, 36)
  { id: 1, text: "Đơn vị cấu tạo nên phân tử DNA là gì?", options: ["Amino acid", "Nucleotide", "Glucose", "Lipid"], correctAnswer: 1, explanation: "DNA được cấu tạo từ các đơn phân là nucleotide.", level: "Nhận biết" },
  // ... (Các câu cũ đã có)
  
  // Bài 35: Nhiễm sắc thể
  { id: 21, text: "Thành phần hóa học chính của nhiễm sắc thể (NST) ở sinh vật nhân thực gồm?", options: ["DNA và protein Histone", "RNA và protein", "DNA và lipid", "Chỉ có DNA"], correctAnswer: 0, explanation: "NST cấu tạo từ sợi nhiễm sắc bao gồm DNA quấn quanh các khối protein Histone.", level: "Nhận biết" },
  { id: 22, text: "Bộ NST lưỡng bội của loài người là?", options: ["n = 23", "2n = 46", "2n = 44", "2n = 78"], correctAnswer: 1, explanation: "Ở người, bộ NST lưỡng bội 2n = 46 (23 cặp).", level: "Nhận biết" },
  { id: 23, text: "Cấu trúc nào của NST là điểm đính của thoi phân bào?", options: ["Cánh ngắn", "Cánh dài", "Tâm động", "Đầu mút"], correctAnswer: 2, explanation: "Tâm động (eo thứ nhất) là vị trí đính thoi phân bào giúp NST di chuyển.", level: "Thông hiểu" },
  { id: 24, text: "Trong một cặp NST tương đồng, hai chiếc có đặc điểm gì?", options: ["Giống nhau về hình dạng và kích thước", "Một chiếc từ bố, một chiếc từ mẹ", "Mang các gene tương ứng", "Tất cả các ý trên"], correctAnswer: 3, explanation: "Cặp tương đồng gồm 2 chiếc giống nhau về hình dạng, kích thước, trình tự gene, 1 có nguồn gốc từ bố và 1 từ mẹ.", level: "Thông hiểu" },
  { id: 25, text: "Ở người, cặp NST giới tính của nam giới là?", options: ["XX", "XY", "XO", "YY"], correctAnswer: 1, explanation: "Nam giới có cặp giới tính XY, nữ giới là XX.", level: "Nhận biết" },

  // Bài 36: Nguyên phân và Giảm phân
  { id: 41, text: "Kết quả của quá trình nguyên phân từ 1 tế bào mẹ (2n) tạo ra?", options: ["2 tế bào con (n)", "2 tế bào con (2n)", "4 tế bào con (n)", "4 tế bào con (2n)"], correctAnswer: 1, explanation: "Nguyên phân tạo ra 2 tế bào con có bộ NST giống hệt tế bào mẹ (2n).", level: "Nhận biết" },
  { id: 42, text: "Trong nguyên phân, các NST co xoắn cực đại và tập trung thành 1 hàng ở mặt phẳng xích đạo vào kì nào?", options: ["Kì đầu", "Kì giữa", "Kì sau", "Kì cuối"], correctAnswer: 1, explanation: "Kì giữa là lúc NST quan sát rõ nhất dưới kính hiển vi do co xoắn cực đại.", level: "Thông hiểu" },
  { id: 43, text: "Sự phân li của các chromatid về hai cực tế bào diễn ra ở kì nào của nguyên phân?", options: ["Kì đầu", "Kì giữa", "Kì sau", "Kì cuối"], correctAnswer: 2, explanation: "Ở kì sau, tâm động chia tách, mỗi chromatid (nay là NST đơn) đi về một cực.", level: "Thông hiểu" },
  { id: 44, text: "Giảm phân là quá trình tạo ra loại tế bào nào?", options: ["Tế bào sinh dưỡng", "Tế bào hợp tử", "Giao tử", "Tế bào phôi"], correctAnswer: 2, explanation: "Giảm phân diễn ra ở tế bào sinh dục chín để tạo ra giao tử (n).", level: "Nhận biết" },
  { id: 45, text: "Hiện tượng tiếp hợp và trao đổi chéo giữa các NST tương đồng diễn ra ở kì nào?", options: ["Kì đầu I", "Kì giữa I", "Kì sau I", "Kì đầu II"], correctAnswer: 0, explanation: "Trao đổi chéo diễn ra ở kì đầu I của giảm phân, tạo ra sự biến dị di truyền.", level: "Vận dụng" }
];

export const DNA_STRUCTURE_DATA = {
  backbone: "Khung xương đường-phosphate",
  bases: {
    A: { name: "Adenine", color: "#FF0000", pair: "T" },
    T: { name: "Thymine", color: "#00FF00", pair: "A" },
    G: { name: "Guanine", color: "#0000FF", pair: "C" },
    C: { name: "Cytosine", color: "#FFFF00", pair: "G" }
  }
};
