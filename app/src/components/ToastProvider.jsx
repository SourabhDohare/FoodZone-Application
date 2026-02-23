import styled, { keyframes } from "styled-components";
import { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message) => {
    const id = crypto.randomUUID();

    setToasts((prev) => [...prev, { id, message }]);

    setTimeout(() => {
      removeToast(id);
    }, 2500);
  }, []);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer>
        {toasts.map((toast) => (
          <Toast key={toast.id} message={toast.message} />
        ))}
      </ToastContainer>
    </ToastContext.Provider>
  );
};
const Toast = ({ message }) => {
  return (
    <ToastWrapper>
      <Icon>✓</Icon>
      <span>{message}</span>
    </ToastWrapper>
  );
};


const slideIn = keyframes`
  0% {
    transform: translateY(-20px) scale(0.95);
    opacity: 0;
  }
  100% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
`;



const ToastContainer = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  z-index: 3000;
`;

const ToastWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  min-width: 260px;
  max-width: 320px;

  background: rgba(30, 30, 30, 0.95);
  backdrop-filter: blur(12px);

  padding: 14px 18px;
  border-radius: 14px;

  font-size: 14px;
  font-weight: 500;
  color: white;

  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.35),
    0 0 0 1px rgba(255, 255, 255, 0.05);

  animation: ${slideIn} 0.35s cubic-bezier(0.22, 1, 0.36, 1);
`;

const Icon = styled.div`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: linear-gradient(135deg, #00c853, #69f0ae);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: bold;
  color: white;
`;
