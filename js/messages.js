import { db, COL, serverTimestamp } from './firebase.js';
import { collection, addDoc, query, where, onSnapshot, orderBy } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

export async function loadMessages() {
  const container = document.getElementById('conversations-list');
  if (!container) return;

  container.innerHTML = `
    <div class="post-card" style="margin-bottom: 1rem; cursor: pointer;">
      <div style="display: flex; align-items: center; gap: 1rem;">
        <div style="width: 50px; height: 50px; border-radius: 50%; background: linear-gradient(135deg, var(--gold-primary), var(--gold-light)); display: flex; align-items: center; justify-content: center; color: var(--bg-primary); font-weight: 700;">A</div>
        <div style="flex: 1;">
          <div style="font-weight: 600;">Antonii</div>
          <div style="font-size: 13px; color: var(--text-muted);">Hej, jak się masz?</div>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 12px; color: var(--text-muted);">2m</div>
        </div>
      </div>
    </div>
  `;
}

export async function sendMessage(conversationId, content, senderId) {
  try {
    await addDoc(collection(db, COL.MESSAGES), {
      conversationId,
      senderId,
      content,
      createdAt: serverTimestamp(),
      read: false,
    });
    return true;
  } catch (err) {
    console.error('Send message error:', err);
    return false;
  }
}
