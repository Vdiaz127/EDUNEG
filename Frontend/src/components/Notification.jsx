// components/Notification.jsx
import { useEffect, useState } from 'react';

const Notification = ({ message, type, onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose();
    }, 5000); // Oculta la notificación después de 5 segundos

    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible) return null;

  const bgColor = type === 'success' ? 'bg-green-500' : type === 'error' ? 'bg-red-500' : 'bg-yellow-500';

  return (
    <div className={`fixed top-4 right-4 p-4 rounded-lg text-white ${bgColor} shadow-lg`}>
      {message}
    </div>
  );
};

export default Notification;