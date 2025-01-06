document.addEventListener("turbo:load", () => {
  console.log("stretch_timer.js が読み込まれました！");

  // 10分ごとのストレッチ通知
  let stretchInterval = setInterval(() => {
    // 通知メッセージの表示
    alert("10分が経過しました！ストレッチをしましょう😊");
  }, 10 * 60 * 1000); // 10分（600,000ミリ秒）

  // タイマー停止ボタンが押された場合の処理
  const stopButton = document.getElementById("stop");
  if (stopButton) {
    stopButton.addEventListener("click", () => {
      clearInterval(stretchInterval); // インターバルを停止
      alert("作業を終了しました！ストレッチタイマーも停止しました😊");
    });
  }
});
