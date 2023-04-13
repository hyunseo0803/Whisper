import { initializeApp } from "firebase/app";
import { getAuth, 
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  // GoogleAuthProvider, signInWithRedirect, getRedirectResult, signInWithPopup,
  signOut
} from "firebase/auth";
import { Alert } from "react-native";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyB-uWN6o2ZLTiy6RiOJcQQF0HtS7YvFpb8",
  authDomain: "whisper-5d18b.firebaseapp.com",
  projectId: "whisper-5d18b",
  storageBucket: "whisper-5d18b.appspot.com",
  messagingSenderId: "33932466396",
  appId: "1:33932466396:web:2756893aacc6cb768c3c19",
  measurementId: "G-85SFJMKGEB"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

/**
 * 이메일-패스워드 회원가입
 * @param {string} email 
 * @param {string} password 
 */
export const SIGNUP_email_password = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    alert('회원가입 성공!')
  })
  .catch((error) => {
    switch (error.code) {
      case "auth/user-not-found" || "auth/wrong-password":
        Alert.alert("이메일 혹은 비밀번호가 일치하지 않습니다.");
      case "auth/email-already-in-use":
        return "이미 사용 중인 이메일입니다.";
      case "auth/weak-password":
        return "비밀번호는 6글자 이상이어야 합니다.";
      case "auth/network-request-failed":
        return "네트워크 연결에 실패 하였습니다.";
      case "auth/invalid-email":
        return "잘못된 이메일 형식입니다.";
      case "auth/internal-error":
        return "잘못된 요청입니다.";
      default:
        return "로그인에 실패 하였습니다.";
    }
    // ..
  });
}

/**
 * 이메일-패스워드 로그인
 * @param {string} email 
 * @param {string} password 
 */
export const SIGNIN_email_password = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    alert('로그인 성공!!')
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorMessage)
  });
}



// // 구글 로그인
// const provider = new GoogleAuthProvider();
// auth.languageCode = 'it';
// provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

// provider.setCustomParameters({
//   'login_hint': 'user@example.com'
// });

// signInWithRedirect(auth, provider);
// export const SIGNIN_goggle = () => {
//     getRedirectResult(auth)
//     .then((result) => {
//       // This gives you a Google Access Token. You can use it to access Google APIs.
//       const credential = GoogleAuthProvider.credentialFromResult(result);
//       const token = credential.accessToken;
  
//       // The signed-in user info.
//       const user = result.user;
//       // IdP data available using getAdditionalUserInfo(result)
//       // ...
//     }).catch((error) => {
//       // Handle Errors here.
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       // The email of the user's account used.
//       const email = error.customData.email;
//       // The AuthCredential type that was used.
//       const credential = GoogleAuthProvider.credentialFromError(error);
//       // ...
//     });
//   }


/**
 * 로그아웃
 */
export const SIGNOUT = () => {
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
}