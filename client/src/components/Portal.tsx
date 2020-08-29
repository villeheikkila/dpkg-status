import React, { useRef, useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import styled, { keyframes } from "styled-components";

type PortalNode = Element | null;
export const PortalNodeContext = React.createContext<PortalNode>(null);

export const PortalProvider: React.FC = ({ children }) => {
  const portalRef = useRef<HTMLDivElement>(null);
  const [context, setContext] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    setContext(portalRef.current);
  }, []);

  return (
    <div style={{ zIndex: 0 }}>
      <PortalNodeContext.Provider value={context}>
        {children}
      </PortalNodeContext.Provider>
      <div ref={portalRef} />
    </div>
  );
};

interface ModalProps {
  onClose: () => void;
}

const Portal: React.FC<ModalProps> = ({ onClose, children }) => {
  const portalNode = useContext(PortalNodeContext);
  const overlayRef = useRef<HTMLDivElement>(null);

  const onOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const isClickOutside = overlayRef.current?.isEqualNode(e.target as Node);
    if (!isClickOutside) {
      return;
    }
    onClose();
  };

  return portalNode
    ? ReactDOM.createPortal(
        <Wrapper ref={overlayRef} onMouseDown={onOverlayClick}>
          <ModalContent>{children}</ModalContent>
        </Wrapper>,
        portalNode
      )
    : null;
};

const Wrapper = styled.div`
  animation: ${keyframes`from { opacity: 0; }`} 600ms ease-out;
  position: fixed;
  z-index: 15;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
  overflow: hidden;
`;

const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -50px;
  margin-left: -50px;
`;

export default Portal;
