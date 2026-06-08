import { db, COL } from './firebase.js';
import { query, orderBy, limit, onSnapshot, collection } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

export async function loadRanking() {
  const leaderboardList = document.getElementById('leaderboard-list');
  if (!leaderboardList) return;

  const q = query(collection(db, COL.USERS), orderBy('points', 'desc'), limit(50));
  onSnapshot(q, (snap) => {
    leaderboardList.innerHTML = snap.docs.map((doc, idx) => {
      const data = doc.data();
      const medal = idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : '';
      return `
        <div class="leaderboard-item">
          <div class="rank-position">${medal || idx + 1}</div>
          <div class="rank-avatar">${(data.displayName || 'W').charAt(0).toUpperCase()}</div>
          <div class="rank-info">
            <div class="rank-name"><a href="user.html?uid=${doc.id}" style="color: var(--text-primary);">${data.displayName || 'Użytkownik'}</a></div>
            <div class="rank-value">${data.rank || 'Rookie'}</div>
          </div>
          <div class="rank-points">${data.points || 0}</div>
        </div>
      `;
    }).join('');
  });
}
