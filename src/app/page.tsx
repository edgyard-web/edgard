'use client';

import { useState } from 'react';
import { useInitData } from '@telegram-apps/sdk-react';  // или @telegram-apps/sdk, в зависимости от версии в шаблоне
import { Button, Input } from '@telegram-apps/telegram-ui';  // если в шаблоне есть UI-компоненты Telegram

export default function Home() {
  const initData = useInitData();  // твои данные из Telegram
  const [videoUrl, setVideoUrl] = useState('');
  const [message, setMessage] = useState('');

  const handleAddVideo = () => {
    if (!videoUrl.includes('youtube.com') && !videoUrl.includes('youtu.be')) {
      setMessage('Это не похоже на YouTube-ссылку 😔');
      return;
    }

    // Здесь позже добавим отправку на backend
    // Пока просто симуляция
    setMessage(`Видео добавлено! Ссылка: ${videoUrl}`);
    setVideoUrl('');  // очистка поля
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Привет, {initData?.user?.firstName || 'Эдгар'}! 👻</h1>
      <p>Это твой Uwiew-клон для обмена просмотрами хоррор-видео</p>

      <h2>Добавь своё видео</h2>
      <Input
        placeholder="Вставь ссылку на YouTube (https://youtube.com/watch?v=...)"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        style={{ marginBottom: '10px', width: '100%' }}
      />
      <Button onClick={handleAddVideo} size="l" stretched>
        Добавить видео
      </Button>

      {message && <p style={{ marginTop: '20px', color: message.includes('добавлено') ? 'green' : 'red' }}>{message}</p>}

      <p style={{ marginTop: '30px' }}>Баланс баллов: 0 (скоро подключим!)</p>
    </div>
  );
}
