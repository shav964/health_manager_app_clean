document.addEventListener("turbo:load", () => {
  console.log("stretch_timer.js が読み込まれました！");

 
  let stretchInterval = setInterval(() => {
  
    alert("10分が経過しました！ストレッチをしましょう😊");
  }, 10 * 60 * 1000);

 
  const stopButton = document.getElementById("stop");
  if (stopButton) {
    stopButton.addEventListener("click", () => {
      clearInterval(stretchInterval);
      alert("作業を終了しました！ストレッチタイマーも停止しました😊");
    });
  }
});
