import { db, COL, serverTimestamp } from './firebase.js';
import { query, orderBy, limit, onSnapshot, collection, addDoc, updateDoc, doc, arrayUnion } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

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
              <div class="post-author"><a href="user.html?uid=${data.authorId}" style="color: var(--text-primary);">${data.authorName || 'Użytkownik'}</a></div>
              <div class="post-time">Przed chwilą</div>
            </div>
          </div>
          <div class="post-content">${data.content || ''}</div>
          ${data.imageUrl ? `<img src="${data.imageUrl}" class="post-image" alt="Post image"/>` : ''}
          <div class="post-actions">
            <button class="post-action-btn" onclick="likePost('${doc.id}')">👍 ${data.likes?.length || 0}</button>
            <button class="post-action-btn">💬 ${data.commentsCount || 0}</button>
            <button class="post-action-btn">🔥 ${data.reactions?.fire?.length || 0}</button>
          </div>
        </div>
      `;
    }).join('');
  });
}

export async function createPost(content, imageUrl, authorId, authorName) {
  try {
    await addDoc(collection(db, COL.POSTS), {
      authorId,
      authorName,
      content,
      imageUrl: imageUrl || '',
      likes: [],
      reactions: {},
      commentsCount: 0,
      createdAt: serverTimestamp(),
    });
    return true;
  } catch (err) {
    console.error('Create post error:', err);
    return false;
  }
}

export async function likePost(postId) {
  try {
    const postRef = doc(db, COL.POSTS, postId);
    await updateDoc(postRef, {
      likes: arrayUnion(true),
    });
  } catch (err) {
    console.error('Like error:', err);
  }
}
