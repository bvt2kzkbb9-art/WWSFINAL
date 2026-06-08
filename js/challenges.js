import { db, COL, serverTimestamp } from './firebase.js';
import { collection, addDoc, query, where, onSnapshot } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

export async function loadChallenges() {
  const container = document.getElementById('challenges-content');
  if (!container) return;

  const challenges = [
    { icon: '🐍', name: 'Ale Wąż', xp: 25 },
    { icon: '💪', name: 'Burpees', xp: 20 },
    { icon: '🏃', name: 'Gonisz', xp: 25 },
    { icon: '🤸', name: 'Przysiady', xp: 15 },
  ];

  container.innerHTML = challenges.map(c => `
    <div class="post-card" style="margin-bottom: 1rem;">
      <div style="display: flex; align-items: center; gap: 1rem;">
        <div style="font-size: 32px;">${c.icon}</div>
        <div style="flex: 1;">
          <div style="font-weight: 600; color: var(--text-primary);">${c.name}</div>
          <div style="font-size: 12px; color: var(--text-muted);">+${c.xp} XP</div>
        </div>
        <button onclick="sendChallenge('${c.name}')" style="padding: 8px 16px; background: linear-gradient(135deg, var(--gold-primary), var(--gold-light)); color: var(--bg-primary); border: none; border-radius: 6px; font-weight: 600; cursor: pointer;">Rzuć</button>
      </div>
    </div>
  `).join('');
}

export async function sendChallenge(challengeName) {
  console.log('Challenge sent:', challengeName);
}
