import { db, COL } from './firebase.js';
import { doc, getDoc, updateDoc } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

export async function loadProfile(user, userData) {
  if (!user || !userData) return;

  document.getElementById('profile-name').textContent = userData.displayName || 'Wojownik';
  document.getElementById('profile-username').textContent = '@' + (userData.username || user.email.split('@')[0]);
  document.getElementById('stat-level').textContent = userData.level || 1;
  document.getElementById('stat-xp').textContent = userData.points || 0;
  document.getElementById('stat-rank').textContent = userData.rank || 'Rookie';
  document.getElementById('stat-posts').textContent = userData.postsCount || 0;
  document.getElementById('profile-bio').value = userData.bio || '';

  const avatar = (userData.displayName || 'W').charAt(0).toUpperCase();
  document.getElementById('profile-avatar').textContent = avatar;

  const achievementsContainer = document.getElementById('achievements-list');
  if (achievementsContainer) {
    const achievements = ['🏅', '⭐', '🎖️', '🏆', '💎', '🔥', '⚔️', '👑'];
    achievementsContainer.innerHTML = achievements.map(a => `<div style="font-size: 32px; text-align: center;">${a}</div>`).join('');
  }

  document.getElementById('save-bio-btn').addEventListener('click', async () => {
    const bio = document.getElementById('profile-bio').value;
    try {
      await updateDoc(doc(db, COL.USERS, user.uid), { bio });
      showToast('✅ Bio zaktualizowane', 'success');
    } catch (err) {
      showToast('❌ Błąd', 'error');
    }
  });
}

function showToast(msg, type) {
  const toast = document.createElement('div');
  toast.textContent = msg;
  toast.style.cssText = `
    position: fixed;
    bottom: 100px;
    left: 50%;
    transform: translateX(-50%);
    background: ${type === 'error' ? '#ef4444' : '#22c55e'};
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    font-size: 14px;
    z-index: 1000;
  `;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}
