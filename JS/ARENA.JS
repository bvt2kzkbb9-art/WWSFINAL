import { db, COL } from './firebase.js';
import { query, orderBy, limit, onSnapshot, collection } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

export async function loadChallengesCarousel() {
  const carousel = document.getElementById('challenges-carousel');
  if (!carousel) return;

  const challenges = [
    { icon: '🐍', name: 'Ale Wąż' },
    { icon: '🏃', name: 'Gonisz' },
    { icon: '💪', name: 'Burpees' },
    { icon: '🚴', name: 'Rower' },
    { icon: '🤸', name: 'Przysiady' },
    { icon: '⛹️', name: 'Skakanka' },
    { icon: '🧗', name: 'Wspinaczka' },
    { icon: '🏊', name: 'Pływanie' },
  ];

  carousel.innerHTML = challenges.map(c => `
    <div class="carousel-item">
      <div class="carousel-icon">${c.icon}</div>
      <div class="carousel-name">${c.name}</div>
    </div>
  `).join('');
}

export async function loadRecentActivity() {
  const container = document.getElementById('activity-feed');
  if (!container) return;

  const q = query(collection(db, COL.POSTS), orderBy('createdAt', 'desc'), limit(5));
  onSnapshot(q, (snap) => {
    if (snap.empty) {
      container.innerHTML = '<p style="color: var(--text-muted); text-align: center; padding: 2rem;">Brak aktywności</p>';
      return;
    }

    container.innerHTML = snap.docs.map(doc => {
      const data = doc.data();
      return `
        <div class="post-card">
          <div class="post-header">
            <div class="post-avatar-sm">${(data.authorName || 'W').charAt(0).toUpperCase()}</div>
            <div>
              <div class="post-author">${data.authorName || 'Użytkownik'}</div>
              <div class="post-time">Przed chwilą</div>
            </div>
          </div>
          <div class="post-content">${(data.content || '').substring(0, 100)}...</div>
          <div class="post-actions">
            <button class="post-action-btn">👍 ${data.likes?.length || 0}</button>
            <button class="post-action-btn">💬 ${data.commentsCount || 0}</button>
          </div>
        </div>
      `;
    }).join('');
  });
}
