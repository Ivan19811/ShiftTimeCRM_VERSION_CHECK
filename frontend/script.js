const versionElement = document.getElementById('version');
const updateButton = document.getElementById('updateBtn');

let currentVersion = "1.0.0"; // Локальна кешована версія

async function checkVersion() {
  versionElement.textContent = '⏳ Перевірка версії...';
  console.log("🔍 Починаємо перевірку версії...");

  try {
    const response = await fetch('https://shifttime-srm-1.onrender.com/version');

    if (!response.ok) {
      throw new Error(`❌ Помилка HTTP: ${response.status} ${response.statusText}`);
    }

    console.log("📦 Отримано відповідь від сервера");

    const data = await response.json();

    if (!data || typeof data.version === 'undefined') {
      throw new Error("❗ Відповідь не містить ключа 'version': " + JSON.stringify(data));
    }

    const latestVersion = data.version;
    console.log("✅ Актуальна версія з сервера:", latestVersion);

    versionElement.textContent = latestVersion;

    if (latestVersion !== currentVersion) {
      console.log("⚠️ Виявлено нову версію! Поточна:", currentVersion, "| Нова:", latestVersion);
      versionElement.classList.add('new');
      updateButton.disabled = false;
    } else {
      console.log("🟢 Версія актуальна:", currentVersion);
      versionElement.classList.remove('new');
      updateButton.disabled = true;
    }

  } catch (error) {
    console.error("❌ ПОМИЛКА при перевірці версії:", error);
    versionElement.textContent = '❌ Помилка завантаження';
    versionElement.classList.add('error');
  }
}

// Запускаємо перевірку після завантаження сторінки
checkVersion();
