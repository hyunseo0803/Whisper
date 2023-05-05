import { Alert } from "react-native";
import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword,
  signOut, sendPasswordResetEmail, getIdTokenResult,
} from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth, db } from '../../../firebase'


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
    // 자동 로그인
    if(autoLogin){
        await signInWithEmailAndPassword(auth, email, password)
        .then(async(userCredential) => {
          // const user = userCredential.user;
          await AsyncStorage.setItem(
            'user',
            JSON.stringify({
              token: getIdTokenResult,
              userId: email
            })
          );
          Alert.alert("로그인 성공!")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert(errorMessage)
      });
    }
    else{
      // 매번 로그인
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        Alert.alert("로그인 성공!")
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
  signOut(auth).then(async() => {
    // Sign-out successful.
    await AsyncStorage.removeItem('user')
    Alert.alert("로그아웃 성공!", "로그아웃 되었습니다.")
  }).catch((error) => {
    // An error happened.
    Alert.alert("로그아웃 실패!", "관리자에게 문의 바랍니다.")
  });
}