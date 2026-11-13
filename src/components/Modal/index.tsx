import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

interface IModalContainer {
  id: string;
  children: React.ReactNode;
}

const ModalContainer = ({ id, children }: IModalContainer) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  if (mounted) {
    const container = document.getElementById(id);

    if (!container) {
      throw new Error("Can't use modal component without root modal container");
    }

    return ReactDOM.createPortal(children, container);
  }

  return null;
};

export default ModalContainer;
