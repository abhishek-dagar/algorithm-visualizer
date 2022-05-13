import React, { useState, useEffect } from "react";
import styles from "./userCard.module.scss";
import Userform from "./userform";
import { userApi } from "apis";

const UserCard = (props) => {
  const [isForm, setisForm] = useState(false);
  const [userData, setuserData] = useState({username:"",Desgnation:"",bio:""})
  const changeForm = () => {
    handelapidata();
    setisForm(!isForm);
  };

  const handelapidata=()=>{
    userApi
        .getUserData({ userToken: localStorage.getItem("userToken") })
        .then(({ userData }) => {
          setuserData(userData.userInfo)
        })
  }

  useEffect(() => {
    handelapidata();
  }, [])
  
  return isForm ? (
    <Userform changeForm={changeForm} userData={props.userData}></Userform>
  ) : (
    <div className={styles.CardnameContainer}>
      <h1>
        <span className={styles.mainName}>{userData.username}</span>
        <span className={styles.Desgnation}>{userData.Desgnation}</span>
      </h1>
      <div className={styles.profile_bio}>{userData.bio}</div>
      <button onClick={() => setisForm(true)}>Edit profile</button>
    </div>
  );
};

export default UserCard;
