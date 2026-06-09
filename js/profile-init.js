import { db, COL } from './firebase.js';
import { doc, getDoc } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js';

export async function initProfile(user) {
  const app = document.getElementById('app');

  try {
    const snap = await getDoc(doc(db, COL.USERS, user.uid));

    const data = snap.exists()
      ? snap.data()
      : {
          displayName: user.displayName || 'Wojownik',
          points: 0,
          level: 1,
          rank: 'Rookie'
        };

    app.innerHTML = `
      <div class="profile-page">
        <h1>👤 ${data.displayName}</h1>

        <div class="card">
          <h3>Poziom</h3>
          <p>${data.level || 1}</p>
        </div>

        <div class="card">
          <h3>XP</h3>
          <p>${data.points || 0}</p>
        </div>

        <div class="card">
          <h3>Ranga</h3>
          <p>${data.rank || 'Rookie'}</p>
        </div>
      </div>
    `;
  } catch (err) {
    console.error(err);

    app.innerHTML = `
      <div class="card">
        <h2>Błąd ładowania profilu</h2>
        <p>${err.message}</p>
      </div>
    `;
  }
}
