// =====================================================================
// Трекер сессий - подключается на страницах USM.html, sklad.html, pk.html
//   <script type="module" src="session-tracker.js"></script>
//
// Автоматически фиксирует время окончания сессии при уходе со страницы
// =====================================================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, doc, updateDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

// Инициализация Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const sessionId = sessionStorage.getItem("kpiGuideSessionId");

/**
 * Закрывает сессию - записывает время окончания
 */
async function closeSession() {
  if (!sessionId) {
    console.warn("⚠️ Сессия не найдена в sessionStorage");
    return;
  }
  try {
    await updateDoc(doc(db, "sessions", sessionId), {
      endTime: serverTimestamp(),
    });
    console.log("✅ Сессия закрыта:", sessionId);
  } catch (e) {
    // Страница закрывается — игнорируем ошибки сети
    console.debug("Не удалось закрыть сессию (возможно, страница закрыта):", e);
  }
}

/**
 * Отслеживает активность пользователя и продлевает сессию
 * (опционально - можно включить/отключить)
 */
let activityTimeout = null;
const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 минут

function resetActivityTimer() {
  if (activityTimeout) {
    clearTimeout(activityTimeout);
  }
  activityTimeout = setTimeout(() => {
    console.log("⏰ Сессия истекла по бездействию");
    closeSession();
  }, SESSION_TIMEOUT_MS);
}

// События активности пользователя
const activityEvents = ['mousedown', 'keydown', 'touchstart', 'scroll'];
activityEvents.forEach(event => {
  document.addEventListener(event, resetActivityTimer);
});

// События ухода со страницы
window.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") {
    closeSession();
  } else {
    // Возврат на страницу - сбрасываем таймер
    resetActivityTimer();
  }
});

window.addEventListener("pagehide", closeSession);
window.addEventListener("beforeunload", closeSession);

// Запускаем таймер при загрузке
resetActivityTimer();

console.log("🔍 Трекер сессий активирован. Session ID:", sessionId || "не найден");
