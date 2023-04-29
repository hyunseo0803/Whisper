import { initializeApp } from "firebase/app";
import { getAuth, 
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signOut, sendPasswordResetEmail, getIdTokenResult
} from "firebase/auth";
import { Alert } from "react-native";
import { getFirestore, collection, setDoc, doc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN, FIREBASE_PROJECT_ID, FIREBASE_STORAGE_BUCKET, FIREBASE_MESSAGE_SENDER_ID, FIREBASE_APP_ID, FIREBASE_MEASUREMENT_ID } from '@env';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGE_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID
};


// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export const auth = getAuth(app);

/**
 * 이메일-패스워드 회원가입
 * @param {string} email 
 * @param {string} password 
 */
export const SIGNUP_email_password = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
  .then(async(userCredential) => {
    try {
      const user = userCredential.user;
      console.log("사용자~!~!~!~!~", user.uid)
      const UserRef = await setDoc(doc(db, "users", user.uid), {
        email: email,
        time: ''
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    // Signed in
    Alert.alert('회원가입 성공!')
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
export const SIGNIN_email_password = async(autoLogin, email, password) => {
  try{
    if(autoLogin){
      await signInWithEmailAndPassword(auth, email, password)
      .then(async(userCredential) => {
        // Signed in
        const user = userCredential.user;
        alert("저장되어야해")
        await AsyncStorage.setItem(
          'user',
          JSON.stringify({
            token: getIdTokenResult,
            userId: email
          })
        );
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert(errorMessage)
      });
    }
    else{
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        alert('노 저장')
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert(errorMessage)
      });
    }
  }
  catch(e){
    console.log(e)
  }
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



export const RESET_password = (email) => {
  sendPasswordResetEmail(auth, email)
  .then(() => {
    // Password reset email sent!
    // ..
    Alert.alert("이메일 보내기 성공!", "메일함을 확인해보세요 ");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
    Alert.alert("이메일 보내기 실패!", "이메일을 입력해주세요. ");
  });
}


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


// 데이터 가져오기
// const docRef = doc(db, "cities", "SF");
// const docSnap = await getDoc(docRef);

// if (docSnap.exists()) {
//   console.log("Document data:", docSnap.data());
// } else {
//   // doc.data() will be undefined in this case
//   console.log("No such document!");
// }