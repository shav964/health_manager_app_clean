document.addEventListener("turbo:load", () => {
  let timerInterval;
  let startTime;

  // タイマーを開始する関数
  function startTimer() {
    if (timerInterval) clearInterval(timerInterval);

    timerInterval = setInterval(() => {
      const now = new Date();
      const elapsed = new Date(now - startTime);

      const hours = String(elapsed.getUTCHours()).padStart(2, "0");
      const minutes = String(elapsed.getUTCMinutes()).padStart(2, "0");
      const seconds = String(elapsed.getUTCSeconds()).padStart(2, "0");

      document.getElementById("timer").innerText = ${hours}:${minutes}:${seconds};

      // 10分経過したらアラートを表示
      if (elapsed.getUTCMinutes() === 10 && elapsed.getUTCSeconds() === 0) {
        alert("10分経過しました。休憩を取りましょう！");
      }
    }, 1000);
  }

  // 作業開始時の処理
  const startButton = document.getElementById("start");
  if (startButton) {
    startButton.addEventListener("click", () => {
      startTime = new Date(); // 現在の時間を保存
      startTimer(); // タイマー開始
    });
  }

  // 作業終了時の処理
  const stopButton = document.getElementById("stop");
  if (stopButton) {
    stopButton.addEventListener("click", () => {
      if (timerInterval) clearInterval(timerInterval);

      const now = new Date();
      const elapsed = new Date(now - startTime);

      const hours = String(elapsed.getUTCHours()).padStart(2, "0");
      const minutes = String(elapsed.getUTCMinutes()).padStart(2, "0");
      const seconds = String(elapsed.getUTCSeconds()).padStart(2, "0");

      document.getElementById(
        "timer"
      ).innerText = 作業終了！合計時間: ${hours}:${minutes}:${seconds};
      document.getElementById(
        "message"
      ).innerText = 作業が完了しました！合計時間: ${hours}時間 ${minutes}分 ${seconds}秒;
    });
  }
});