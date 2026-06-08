import { db, COL } from './firebase.js';
import { query, where, onSnapshot, collection } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

export async function loadFriends() {
  const container = document.getElementById('friends-content');
  if (!container) return;

  container.innerHTML = `
    <div class="friend-card">
      <div class="friend-avatar">A</div>
      <div class="friend-info">
        <div class="friend-name">Antonii</div>
        <div class="friend-status">Warrior • Online</div>
      </div>
      <div class="friend-actions">
        <button class="friend-action-btn">💬</button>
        <button class="friend-action-btn">⚔️</button>
      </div>
    </div>
    <div class="friend-card">
      <div class="friend-avatar">M</div>
      <div class="friend-info">
        <div class="friend-name">Magdalena</div>
        <div class="friend-status">Champion • Offline</div>
      </div>
      <div class="friend-actions">
        <button class="friend-action-btn">💬</button>
        <button class="friend-action-btn">⚔️</button>
      </div>
    </div>
  `;
}
