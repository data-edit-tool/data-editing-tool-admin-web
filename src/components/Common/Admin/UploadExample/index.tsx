import React from 'react';
import styled from 'styled-components';

import Close from 'components/SVG/Icon/Close';

const Container = styled.div`
  margin-left: 40px;
  width: 540px;
  border: 1px solid ${({ theme }) => theme.adminColor.line1};
  border-radius: 8px;
  padding: 30px;
  position: relative;
  .title {
    font-size: ${({ theme }) => theme.fontSize.text_16};
    font-weight: 700;
    color: #111;
  }
  .description {
    margin-top: 16px;
    font-size: ${({ theme }) => theme.fontSize.text_16};
    color: #111;
  }
  svg {
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
  }
  .file-structure {
    margin-top: 20px;
    width: 100%;
    height: 603px;
    padding: 30px;
    background-color: #111;
    border-radius: 10px;
    color: ${({ theme }) => theme.adminColor.white};
    font-size: ${({ theme }) => theme.fontSize.text_14};
    overflow-y: auto;
  }
`;

interface IUploadExample {
  onClose: () => void;
}

const UploadExample: React.FC<IUploadExample> = ({ onClose }) => {
  return (
    <Container>
      <div className="title">업로드 폴더 구조</div>
      <div className="description">여러 Mainset 폴더를 한번에 등록합니다.</div>
      <Close width="16" height="16" color="#111" onClick={onClose} />
      <div className="file-structure">
        <ul className="ascii">
          <li>
            muti-modal project
            <ul>
              <li>
                SET001_M002(mainset)
                <ul>
                  <li>
                    SET001_M002_S001(Subset)
                    <ul>
                      <li>SET001_M002_S001_001_F_30_family_cs.mp4</li>
                      <li>SET001_M002_S001_001_F_30_family_B.wav</li>
                      <li>...</li>
                      <li>SET001_M002_S001_mix_FM_3040_family_fs.mp4</li>
                      <li>SET001_M002_S001_mix_FM_3040_family_B.wav</li>
                      <li>SET001_M002_S001_STT8K_001.wav</li>
                      <li>SET001_M002_S001_STT8K_002.wav</li>
                    </ul>
                  </li>
                  <li>...</li>
                  <li className="empty" />
                  <li>
                    SET001_M002_S006(Subset)
                    <ul>
                      <li>SET001_M002_S006_001_F_30_family_cs.mp4</li>
                      <li>SET001_M002_S006_001_F_30_family_B.wav</li>
                      <li>...</li>
                      <li>SET001_M002_S006_mix_FM_3040_family_fs.mp4</li>
                      <li>SET001_M002_S006_mix_FM_3040_family_B.wav</li>
                      <li>SET001_M002_S006_STT8K_001.wav</li>
                      <li>SET001_M002_S006_STT8K_002.wav</li>
                    </ul>
                  </li>
                  <li>
                    speakerThumbnail(speaker_info)
                    <ul>
                      <li>SPEAKER_001_M_30_FRIEND.jpg</li>
                      <li>SPEAKER_002_F_40_FRIEND.jpg</li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li>...</li>
              <li className="empty" />
              <li>
                SET300_M002(mainset)
                <ul>
                  <li>
                    SET300_M002_S001(Subset)
                    <ul>
                      <li>SET300_M002_S001_001_F_30_family_cs.mp4</li>
                      <li>SET300_M002_S001_F_30_family_B.wav</li>
                      <li>...</li>
                      <li>SET300_M002_S001_mix_FM_3040_family_fs.mp4</li>
                      <li>SET300_M002_S001_mix_FM_3040_family_B.wav</li>
                      <li>SET300_M002_S001_STT8K_001.wav</li>
                      <li>SET300_M002_S001_STT8K_002.wav</li>
                    </ul>
                  </li>
                  <li>...</li>
                  <li className="empty" />
                  <li>
                    SET300_M002_S006(Subset)
                    <ul>
                      <li>SET001_M002_S006_001_F_30_family_cs.mp4</li>
                      <li>SET001_M002_S006_001_F_30_family_B.wav</li>
                      <li>...</li>
                      <li>SET001_M002_S006_mix_FM_3040_family_fs.mp4</li>
                      <li>SET001_M002_S006_mix_FM_3040_family_B.wav</li>
                      <li>SET300_M002_S006_STT8K_001.wav</li>
                      <li>SET300_M002_S006_STT8K_002.wav</li>
                    </ul>
                  </li>
                  <li>
                    speakerThumbnail(speaker_info)
                    <ul>
                      <li>SPEAKER_001_M_30_FRIEND.jpg</li>
                      <li>SPEAKER_002_F_40_FRIEND.jpg</li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </Container>
  );
};

export default UploadExample;
