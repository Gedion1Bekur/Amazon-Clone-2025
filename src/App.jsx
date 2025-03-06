import { useContext, useEffect } from "react";
import "./App.css";
import Loader from "./Components/Loader/Loader";
import { Type } from "./Utils/action.type";
import Routing from "./Router";
import { ParentContext } from "./Components/DataProvider/DataProvider";
import { auth  } from "./Utils/firebase";
function App() {
  const[{user},dispatch]=useContext(ParentContext);
  

  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      
      if(authUser){
        
        // console.log(authUser.email?.split("@")[0])

        dispatch({
          type:Type.SET_USER,
          user:authUser
        })
 
        
      }else{
     dispatch({
       type:Type.SET_USER,
       user:null
     })
      }
    })

  },[]);
  console.log(user)
  return (
    <>
      <Routing />

    </>
  );
}

export default App;
