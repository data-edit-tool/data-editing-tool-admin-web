import React, { type RefObject } from 'react';

// 클릭 이벤트가 발생한 위치가 특정 요소의 외부인지 확인하는 훅
const useClickAway = <T extends HTMLElement>(cb: (e: MouseEvent | TouchEvent) => void) => {
  const ref: RefObject<T> = React.useRef(null);
  const refCb = React.useRef(cb);

  React.useEffect(() => {
    const handler = (e: MouseEvent | TouchEvent) => {
      const element = ref.current;
      if (element && !element.contains(e.target as Node)) {
        setTimeout(() => {
          refCb.current(e);
        }, 0);
      }
    };

    document.addEventListener('mousedown', handler);
    document.addEventListener('touchstart', handler);

    return () => {
      document.removeEventListener('mousedown', handler);
      document.removeEventListener('touchstart', handler);
    };
  }, []);

  return ref;
};

export default useClickAway;
