import { Turbo } from "@hotwired/turbo-rails";
import "./stretch_timer";
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('stop').addEventListener('click', () => {
    const rows = document.querySelectorAll('table tbody tr');
    let sessionId = null;

    rows.forEach(row => {
      const idCell = row.children[0];
      const endTimeCell = row.children[2];
      if (endTimeCell.innerText === '作業中' && sessionId === null) {
        sessionId = idCell.innerText;
      }
    });

    if (!sessionId) {
      document.getElementById('message').innerText = '作業中のセッションが見つかりません！';
      return;
    }

    fetch(`/work_sessions/${sessionId}`, {
      method: 'PATCH',
      headers: {
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
      }
    });
  });
});
document.addEventListener('DOMContentLoaded', () => {
  let timerInterval;
  let startTime;

 
  document.querySelector('form[method="post"]').addEventListener('submit', () => {
    startTime = new Date(); 
    startTimer(); 
  });

 
  function startTimer() {
    if (timerInterval) clearInterval(timerInterval); 

    timerInterval = setInterval(() => {
      const now = new Date();
      const elapsed = new Date(now - startTime); 

      const hours = String(elapsed.getUTCHours()).padStart(2, '0');
      const minutes = String(elapsed.getUTCMinutes()).padStart(2, '0');
      const seconds = String(elapsed.getUTCSeconds()).padStart(2, '0');

      document.getElementById('timer').innerText = `${hours}:${minutes}:${seconds}`;
    }, 1000);
  }

 
  document.getElementById('stop').addEventListener('click', () => {
    if (timerInterval) clearInterval(timerInterval); 
    document.getElementById('timer').innerText = '00:00:00'; 
  });
});