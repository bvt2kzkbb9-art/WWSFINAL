import { db, COL, serverTimestamp } from './firebase.js';
import { collection, addDoc, query, where, onSnapshot } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

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
        <button class="friend-action-btn" onclick="sendMessage('user1')">💬</button>
        <button class="friend-action-btn" onclick="sendChallenge('user1')">⚔️</button>
      </div>
    </div>
  `;
}

export async function sendFriendRequest(myUid, targetUid) {
  try {
    await addDoc(collection(db, COL.FRIEND_REQUESTS), {
      senderId: myUid,
      receiverId: targetUid,
      status: 'pending',
      createdAt: serverTimestamp(),
    });
    return true;
  } catch (err) {
    console.error('Friend request error:', err);
    return false;
  }
}
