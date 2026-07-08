// =====================================================================
// Подключи этот файл на USM.html / sklad.html / pk.html, когда они появятся:
//   <script type="module" src="session-tracker.js"></script>
//
// Он найдёт id сессии, записанный index.html в sessionStorage,
// и проставит время окончания при уходе со страницы.
// =====================================================================
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, doc, updateDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const sessionId = sessionStorage.getItem("kpiGuideSessionId");

async function closeSession() {
  if (!sessionId) return;
  try {
    await updateDoc(doc(db, "sessions", sessionId), {
      endTime: serverTimestamp(),
    });
  } catch (e) {
    // страница закрывается — молча игнорируем ошибку сети
  }
}

// срабатывает при закрытии вкладки / переходе на другой сайт
window.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") closeSession();
});
window.addEventListener("pagehide", closeSession);
