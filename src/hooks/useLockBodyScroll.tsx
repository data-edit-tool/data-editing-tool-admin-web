import { useEffect } from 'react';

// 스크롤 고정 훅 (모달 오픈시 스크롤 고정)
const useLockBodyScroll = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);
};

export default useLockBodyScroll;
