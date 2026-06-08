import { db, COL, getLevel, getRank } from './firebase.js';
import { query, orderBy, limit, onSnapshot, collection } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

export async function loadFeed() {
  const container = document.getElementById('feed-posts');
  if (!container) return;

  const q = query(collection(db, COL.POSTS), orderBy('createdAt', 'desc'), limit(20));
  onSnapshot(q, (snap) => {
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
          <div class="post-content">${data.content || ''}</div>
          ${data.imageUrl ? `<img src="${data.imageUrl}" class="post-image"/>` : ''}
          <div class="post-actions">
            <button class="post-action-btn">👍 ${data.likes?.length || 0}</button>
            <button class="post-action-btn">💬 ${data.commentsCount || 0}</button>
            <button class="post-action-btn">🔥 ${data.reactions?.fire?.length || 0}</button>
          </div>
        </div>
      `;
    }).join('');
  });
}
