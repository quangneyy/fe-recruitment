import React from 'react';
import footerStyles from 'styles/footer.module.scss'; // Thay đổi đường dẫn tùy thuộc vào cách bạn tổ chức file của mình
import { CiPhone } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import { PiPaperPlaneTilt, } from "react-icons/pi";


export default function App() {
  return (
    <div className={footerStyles.footer}>
      <div className={footerStyles.content}>
        <div className={footerStyles.row}>
          <div className={`${footerStyles.col} ${footerStyles.colLg3}`}>
            <div className={footerStyles.linkBox}>
              <div className={footerStyles.linkBoxTitle}>Liên hệ để đăng tin tuyển dụng tại:</div>
              <div className={footerStyles.linkBoxLink}><CiPhone /> Hồ Chí Minh: (+84) 977 460 519</div>
              <div className={footerStyles.linkBoxLink}><CiPhone /> Hà Nội: (+84) 983 131 351</div>
              <div className={footerStyles.linkBoxLink}><MdOutlineEmail /> Email: love@itviec.com</div>
              <div className={footerStyles.linkBoxLink}><PiPaperPlaneTilt /> Gửi thông tin liên hệ</div>


            </div>
          </div>
          <div className={`${footerStyles.col} ${footerStyles.colLg3}`}>
            <div className={footerStyles.linkBox}>
              <div className={footerStyles.linkBoxTitle}>Điều khoản chung</div>
              <div className={footerStyles.linkBoxLink}>Quy định bảo mật</div>
              <div className={footerStyles.linkBoxLink}>Quy chế hoạt động</div>
              <div className={footerStyles.linkBoxLink}>Giải quyết khiếu nại</div>
              <div className={footerStyles.linkBoxLink}>Thoả thuận sử dụng</div>
              <div className={footerStyles.linkBoxLink}>Thông cáo báo chí</div>
            </div>
          </div>
          <div className={`${footerStyles.col} ${footerStyles.colLg2}`}>
            <div className={footerStyles.linkBox}>
              <div className={footerStyles.linkBoxTitle}>Về IT</div>
              <div className={footerStyles.linkBoxLink}>Trang Chủ</div>
              <div className={footerStyles.linkBoxLink}>Dịch vụ gợi ý ứng viên</div>
              <div className={footerStyles.linkBoxLink}>Liên Hệ</div>
              <div className={footerStyles.linkBoxLink}>Việc Làm IT</div>
              <div className={footerStyles.linkBoxLink}>Câu hỏi thường gặp</div>
            </div>
          </div>
          <div className={`${footerStyles.col} ${footerStyles.colLg4}`}>
            <div className={footerStyles.linkBox}>
              <div className={footerStyles.linkBoxTitle}>Tin Tức</div>
              <div className={footerStyles.linkBoxSubscribeDescription}>
                Đăng ký nhận bản tin của chúng tôi để nhận được tin tức hàng tuần của bạn,
                cập nhật, thủ thuật và ưu đãi đặc biệt.
              </div>
              <div className={footerStyles.inputBox}>
                <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" width="51" height="43.667" viewBox="0 0 51 43.667">
                  {/* ... (SVG content) */}
                </svg>
                <input type="text" placeholder="Enter your email address" />
              </div>
              <button className={footerStyles.subscribeButton}>Subscribe</button>
            </div>
          </div>
        </div>
        <div className={footerStyles.seprator}></div>
        <div className={`${footerStyles.row} ${footerStyles.justifyContentBetween}`}>
          <div className={`${footerStyles.colAuto} ${footerStyles.mb4} ${footerStyles.mbLg0}`}>
            <div className={footerStyles.privacyBox}>Privacy Policy . Terms and conditions</div>
          </div>
          <div className={footerStyles.colAuto}>
            <div className={footerStyles.socialMediaBox}>Dribbble . Behance . Instagram</div>
          </div>
        </div>
      </div>
    </div>
  );
}