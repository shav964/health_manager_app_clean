import "@hotwired/turbo-rails";
import "controllers";
document.addEventListener('DOMContentLoaded', () => {
  const csrfToken = document.querySelector('meta[name="csrf-token"]').content;

  // 作業開始ボタンの処理
  document.getElementById('start').addEventListener('click', () => {
    fetch('/work_sessions', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken // CSRFトークンを追加
      },
      body: JSON.stringify({}) // 必要に応じてリクエストデータを追加
    })
      .then(response => response.json())
      .then(data => {
        document.getElementById('message').innerText = data.message; // 結果を表示
      });
  });

  // 作業終了ボタンの処理
  document.getElementById('stop').addEventListener('click', () => {
    fetch('/work_sessions/1', {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken // CSRFトークンを追加
      },
      body: JSON.stringify({}) // 必要に応じてリクエストデータを追加
    })
      .then(response => response.json())
      .then(data => {
        document.getElementById('message').innerText = data.message; // 結果を表示
      });
  });
});