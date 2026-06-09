import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js';
import {
  getAuth, onAuthStateChanged, signOut,
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  updateProfile, sendPasswordResetEmail,
  GoogleAuthProvider, signInWithPopup,
} from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js';
const firebaseConfig = {

  apiKey: "AIzaSyAnR0Q3MmOXkEUfMLdgbVGNFyD1o0hEIaY",

  authDomain: "weekend-warrior-social-v3.firebaseapp.com",

  databaseURL: "https://weekend-warrior-social-v3-default-rtdb.europe-west1.firebasedatabase.app",

  projectId: "weekend-warrior-social-v3",

  storageBucket: "weekend-warrior-social-v3.firebasestorage.app",

  messagingSenderId: "257482203896",

  appId: "1:257482203896:web:46c3906a32a5ca38ba510d"
};
// Initialize Firebase


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export const COL = {
  USERS: 'users',
  POSTS: 'posts',
  COMMENTS: 'comments',
  FOLLOWERS: 'followers',
  FRIEND_REQUESTS: 'friend_requests',
  FRIENDS: 'friends',
  CONVERSATIONS: 'conversations',
  MESSAGES: 'messages',
  NOTIFICATIONS: 'notifications',
  CHALLENGE_INVITES: 'challenge_invites',
  CHALLENGES: 'challenges',
  LAGA_REQUESTS: 'laga_requests',
  ACHIEVEMENTS: 'achievements',
};

export const RANKS = [
  { id: 'Rookie', min: 0, emoji: '🥉' },
  { id: 'Warrior', min: 500, emoji: '🥈' },
  { id: 'Champion', min: 2000, emoji: '🥇' },
  { id: 'Legend', min: 10000, emoji: '👑' },
];

export function getRank(points = 0) {
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (points >= RANKS[i].min) return RANKS[i].id;
  }
  return 'Rookie';
}

export function getLevel(points = 0) {
  return Math.floor(points / 500) + 1;
}

export { collection, doc, getDoc, getDocs, setDoc, updateDoc, query, where, orderBy, limit, onSnapshot, serverTimestamp, arrayUnion };
