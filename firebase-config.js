// =====================================================================
// FIREBASE CONFIG
// Вставь сюда конфиг из консоли Firebase:
// Project settings → General → Your apps → SDK setup and configuration
// =====================================================================
export const firebaseConfig = {
  apiKey: "AIzaSyCBMJhhHXfGj0eOdSUE5vI2IRsMMsUaXW0",
  authDomain: "my-proect-x.firebaseapp.com",
  projectId: "my-proect-x",
  storageBucket: "my-proect-x.firebasestorage.app",
  messagingSenderId: "293796481685",
  appId: "1:293796481685:web:dbd0187501dcd7973b299c",
};

// Email единственного администратора — только этот аккаунт увидит admin.html
export const ADMIN_EMAIL = "amurvvs@gmail.com";

// Соответствие должностей и страниц репозитория
export const POSITION_PAGES = {
  usm: { label: "УСМ", page: "USM.html" },
  sklad: { label: "Кладовщик", page: "sklad.html" },
  pk: { label: "Продавец-консультант", page: "pk.html" },
};
