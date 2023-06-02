
import { initializeApp } from "firebase/app";
import firebaseConfig from './config.js';
import { signOut, getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, FacebookAuthProvider } from "firebase/auth";
import { useContext, useState } from 'react';
import  './Login.css'
import { userContext } from "../../App.js";

const app = initializeApp(firebaseConfig);



function Login() {
  // HANDLING CONTEXT API
  const [loggedInUser, setLoggedInUser] = useContext(userContext);


  const [newUser, setNewUser] = useState(false)

  const [loginStatus, setloginStatus] = useState({
    isLogin: false,
    loginErrorMsg: ""
  })

  const [userInfo, setInfoUser] = useState({
    isSignIn: false,
    UserName: "",
    UserEmail_Id: "",
    UserImage: "",
    pass: "",
    err: "",
    isSignUp: false,
    isSubmited: false,
  })
  const handleClickSignIn = () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        setInfoUser({
          isSignIn: true,
          UserName: user.displayName,
          UserEmail_Id: user.email,
          UserImage: user.photoURL
        })
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }

  const handleClickSignOut = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      setInfoUser({
        isSignIn: false,
        UserName: "",
        UserEmail_Id: "",
        UserImage: ""
      })
    }).catch((error) => {
      console.log(error.message);
    });
  }
  const { UserName, UserEmail_Id, UserImage } = userInfo;



  const handleChange = (e) => {
    console.log(e.target.value);
    let isFormValidate;
    if (e.target.name === "Email") {
      isFormValidate = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/.test(e.target.value)
    }
    if (e.target.name === "pass") {
      isFormValidate = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(e.target.value)
    }
    if (e.target.name === "userName") {
      const updateUserInfo = { ...userInfo }
      updateUserInfo.UserName = e.target.value;
      setInfoUser(updateUserInfo)
    }

    if (isFormValidate) {
      const newUserInfo = { ...userInfo }
      newUserInfo[e.target.name] = e.target.value
      setInfoUser(newUserInfo)
    }
  }

  //Handling from submit function
  const handleSubmit = (e) => {
    userInfo.isSubmited = true
    if (newUser && userInfo.Email && userInfo.pass) {
      console.log("success");
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, userInfo.Email, userInfo.pass)
        .then((userCredential) => {
          const user = userCredential.user;
          const updateUser = { ...userInfo }
          updateUser.isSignUp = true;
          setInfoUser(updateUser)
          manageUser(userInfo.UserName)
        })
        .catch((error) => {
          console.log("Not resisted");
          const updateUser = { ...userInfo }
          updateUser.isSignUp = false;
          setInfoUser(updateUser)
        });
    }

    if (userInfo.Email && userInfo.pass && !newUser) {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, userInfo.Email, userInfo.pass)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          const copyOFloginStatus = { ...loginStatus };
          copyOFloginStatus.isLogin = true;
          setloginStatus(copyOFloginStatus)
          console.log(user);
          setLoggedInUser(user)
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const copyOFloginStatus = { ...loginStatus };
          copyOFloginStatus.isLogin = false;
          copyOFloginStatus.loginErrorMsg = errorMessage
          setloginStatus(copyOFloginStatus)
          console.log(errorMessage);
        });
    }

    e.preventDefault()
  }


  const manageUser = (name) => {
    const auth = getAuth();
    updateProfile(auth.currentUser, {
      displayName: name,
    }).then(() => {
      console.log(userInfo.UserName);
      console.log("user updated done");
    }).catch((error) => {
      console.log(error);
    });

  }


  const handleFbSingIn = () => {
    const provider = new FacebookAuthProvider();
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;

        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

      });
  }

  return (
    <div  className="login_page_container">
      <div>
        <button onClick={handleFbSingIn} style={{ backgroundColor: "#e1e1e1" }}>Facebook Login</button>
      </div>

  
      <div>
        {
          userInfo.isSignIn ?
            <div className='User_info'>
              <h2>Hlw, {UserName}</h2>
              <h4>Your Email Id is - {UserEmail_Id}</h4>
              <img src={UserImage} alt="User Profile" />
            </div>
            :
            <h1>Click Here for Authenticate by Google</h1>
        }

        {
          userInfo.isSignIn ? <button className='sign_btn' onClick={handleClickSignOut}>Sing Out</button> :
            <button className='sign_btn' onClick={handleClickSignIn}>Sing In With Google</button>
        }
      </div>


      <h2>Starting Simple Email and password login Functionality</h2>
      <form className='form-el' action="" onSubmit={handleSubmit}>


        <div style={{ display: 'flex', marginBottom: "50px" }}>
          <input type="checkbox" name="newUser" id="" onChange={() => { setNewUser(!newUser) }} />
          <label htmlFor="newUser">New User</label>
        </div>


        {newUser && <input type="text" name="userName" id="" onBlur={handleChange} placeholder='Name Here..' />}

        <label htmlFor="Email">Email</label>
        <input onBlur={handleChange} type="email" name="Email" id="" placeholder='Enter Your Email' />

        <label htmlFor="pass">Password</label>
        <input onBlur={handleChange} type="password" name="pass" id="" placeholder='password' />

        <input type="submit" value={newUser ? "Sign Up" : "Login"} />
      </form>
      {
        userInfo.isSubmited ? newUser ?
          // for singUp 
          userInfo.isSignUp ?
            <h4>Sign Up Success</h4>
            :
            <h4>User Already Resistered. Please Try with New Email</h4>


          :

          // for login
          loginStatus.isLogin ?
            <h4>Login Success</h4>
            :
            <>
              <h4>Login Failed</h4>
              <h5>{loginStatus.loginErrorMsg}</h5>
            </>

          : <></>
      }


    </div>
  )
}



export default Login
