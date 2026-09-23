# Minecraft Bots Performance Testing 🎮

اختبار أداء سيرفر Minecraft باستخدام 20 بوت Mineflayer

## المميزات ✨

✅ **20 بوت** بأسماء عشوائية Minecraft style  
✅ دخول كل **30 ثانية**  
✅ تسجيل/لوجين في **10 ثواني**  
✅ حركة وتفاعل عشوائي  
✅ عند رؤية **"RJ_79"** أو **"جيش روان"** → يرسلون `-performance-` كل **3 ثواني** (بدون توقف)  
✅ إعادة اتصال عند الـ kick  
✅ عرض كل شيء في **Console**  

---

## التثبيت

### المتطلبات
- Node.js 18.x أو أعلى
- npm

### الخطوات

```bash
# استنساخ المشروع
git clone <your-repo-url>
cd minecraft-bots-performance

# تثبيت المتطلبات
npm install

# تشغيل البوتات
npm start
```

---

## الإعدادات

تعديل المتغيرات في `minecraft_bots.js`:

```javascript
const SERVER = {
  host: 'lestbox.play.hosting',      // عنوان السيرفر
  port: 25565,                        // البورت
  password: 'rawanbotsincoming'       // كلمة السر
};

const BOT_COUNT = 20;                 // عدد البوتات
const BOT_JOIN_DELAY = 30000;         // تأخير الدخول (30 ثانية)
const LOGIN_DELAY = 10000;            // تأخير اللوجين (10 ثواني)
const PERFORMANCE_SPAM_INTERVAL = 3000; // تكرار الـ performance (3 ثواني)
```

---

## الاستخدام

عندما تشغل البرنامج:

```
🚀 Starting bot spawner...

🤖 [Bot 1] Creating: BlockMaster234
✅ [BlockMaster234] Logged in to server
📝 [BlockMaster234] Registering...
✨ [BlockMaster234] Successfully authenticated!
🎮 [BlockMaster234] Spawned! Starting random interactions...
```

**عندما تكتب في الدردشة "جيش روان":**

```
💬 [BlockMaster234] RJ_79: جيش روان
🚨 [BlockMaster234] Detected trigger! Starting performance spam...
📊 [BlockMaster234] Sent: -performance-
📊 [BlockMaster234] Sent: -performance-
📊 [BlockMaster234] Sent: -performance-
...
```

---

## السيرفر المستهدف

- **Host:** lestbox.play.hosting
- **Port:** 25565
- **Version:** 1.21.1
- **Auth Plugin:** /register و /login

---

## الملفات

- `minecraft_bots.js` - البرنامج الرئيسي
- `package.json` - المتطلبات
- `.gitignore` - ملفات التجاهل
- `README.md` - التعليمات

---

## الترخيص

MIT License

---

## المطور

RJ_79

---

**استمتع باختبار أداء السيرفر!** 🚀
