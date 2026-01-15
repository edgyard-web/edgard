'use client';

import { useState } from 'react';
import { useInitData } from '@tma.js/sdk-react';// основной хук для данных пользователя

export default function Home() {
  const initData = useInitData();  // получает user, chatType и т.д. от Telegram
  const userName = initData?.user?.firstName || 'Эдгар';  // безопасно берём имя

  const [videoUrl, setVideoUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleAddVideo = () => {
    if (!videoUrl.trim()) {
      setMessage('Вставь ссылку!');
      return;
    }

    if (!videoUrl.includes('youtube.com') && !videoUrl.includes('youtu.be')) {
      setMessage('Это не YouTube-ссылка 😔');
      return;
    }

    // Пока просто сообщение (потом отправим на backend)
    setMessage(`Видео добавлено! Ссылка: ${videoUrl}`);
    setVideoUrl('');  // очищаем поле
  };

  return (
    <div
      style={{
        padding: '20px',
        maxWidth: '500px',
        margin: '0 auto',
        fontFamily: 'system-ui, sans-serif',
        background: '#121212',  // тёмная тема как в Telegram
        color: '#fff',
        minHeight: '100vh',
      }}
    >
      <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>
        Привет, {userName}! 👻
      </h1>
      <p style={{ textAlign: 'center', marginBottom: '30px' }}>
        Uwiew-клон: добавляй хоррор-видео и зарабатывай просмотры
      </p>

      <h2 style={{ marginBottom: '10px' }}>Добавь своё видео</h2>
      <input
        type="text"
        placeholder="https://youtube.com/watch?v=... или youtu.be/..."
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        style={{
          width: '100%',
          padding: '12px',
          marginBottom: '15px',
          borderRadius: '12px',
          border: '1px solid #333',
          background: '#1e1e1e',
          color: '#fff',
          fontSize: '16px',
        }}
      />

      <button
        onClick={handleAddVideo}
        style={{
          width: '100%',
          padding: '14px',
          background: '#0088cc',
          color: 'white',
          border: 'none',
          borderRadius: '12px',
          fontSize: '18px',
          cursor: 'pointer',
        }}
      >
        Добавить видео
      </button>

      {message && (
        <p
          style={{
            marginTop: '20px',
            textAlign: 'center',
            color: message.includes('добавлено') ? '#4caf50' : '#ff5252',
          }}
        >
          {message}
        </p>
      )}

      <p style={{ marginTop: '40px', textAlign: 'center', fontSize: '14px' }}>
        Баланс баллов: 0 (скоро подключим систему)
      </p>
    </div>
  );
}
