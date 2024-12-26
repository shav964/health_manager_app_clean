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
    // 「作業中」のセッションの最新IDを取得する (仮に1番目の行を取得)
    const rows = document.querySelectorAll('table tbody tr');
    let sessionId = null;
  
    rows.forEach(row => {
      const idCell = row.children[0]; // IDセルを取得
      const endTimeCell = row.children[2]; // 終了時間セルを取得
      if (endTimeCell.innerText === '作業中' && sessionId === null) {
        sessionId = idCell.innerText; // 作業中の最初のIDを取得
      }
    });
  
    if (!sessionId) {
      document.getElementById('message').innerText = '作業中のセッションが見つかりません！';
      return;
    }
  
    fetch(`/work_sessions/${sessionId}`, {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken // CSRFトークンを追加
      },
      body: JSON.stringify({ end_time: new Date().toISOString() }) // end_timeを送信
    })
      .then(response => response.json())
      .then(data => {
        document.getElementById('message').innerText = data.message; // 結果を表示
      })
      .catch(error => {
        document.getElementById('message').innerText = 'エラーが発生しました: ' + error;
      });
  });
  
});