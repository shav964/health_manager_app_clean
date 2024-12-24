document.addEventListener('DOMContentLoaded', () => {
  // 作業開始ボタンの処理
  document.getElementById('start').addEventListener('click', () => {
    fetch('/work_sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
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
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(data => {
        document.getElementById('message').innerText = data.message; // 結果を表示
      });
  });
});