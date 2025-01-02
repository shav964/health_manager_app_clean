import { Turbo } from "@hotwired/turbo-rails";

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
