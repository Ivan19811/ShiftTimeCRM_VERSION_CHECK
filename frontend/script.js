const versionElement = document.getElementById('version');
const updateButton = document.getElementById('updateBtn');

let currentVersion = "1.0.0"; // локальна версія (наприклад, кешована)

async function checkVersion() {
  try {
    const res = await fetch('https://your-backend-url.onrender.com/version');
    const data = await res.json();
    const latestVersion = data.version;

    versionElement.textContent = latestVersion;

    if (latestVersion !== currentVersion) {
      versionElement.classList.add('new');
      updateButton.disabled = false;
    } else {
      versionElement.classList.remove('new');
      updateButton.disabled = true;
    }
  } catch (err) {
    versionElement.textContent = '❌ Помилка завантаження';
  }
}

checkVersion();
