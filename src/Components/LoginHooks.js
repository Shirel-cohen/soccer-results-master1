// import {useEffect, useState} from "react";
// import axios from "axios";
// function LoginHooks(){
//     const [username, setUsername] = useState("");
//     const [password, setPassword] = useState("");
//     const [responseFromGet, setResponseFromGet] = useState(0);
//     const [userSignIn, setUserSignIn] = useState(false);
//     const [clubs, setClubs] = useState([]);
//     const [option1, setOption1] = useState ("");
//     const [option2, setOption2] = useState ("");
//     const [group1Goals, setGroup1Goals] = useState(0);
//     const [group2Goals, setGroup2Goals] = useState(0);
//     const [liveMatches, setLiveMatches] = useState ([]);
//
//
// const onSignIn = () => {
//     axios.get("http://localhost:8989/sign-in",{
//         params:{
//             username: username,
//             password: password,
//
//         }
//     }).then((res=>{
//         if (res.data.errorCode==null){
//             setUserSignIn(true);
//             alert("11");
//         }else {
//             alert(res.data.errorCode);
//            // setResponseByCodeError(res.data.errorCode);
//         }
//     }));
// }
//     useEffect(()=>{
//         axios.get("http://localhost:8989/get-groups").then(res =>{
//             setClubs(res.data)
//         })
//     },[])
//
// const selectOption1 = ()=> {
//     let option1 = document.getElementById("option1");
//     let text1 = option1.options[option1.selectedIndex].text;
//     setOption1(text1);
//     }
//
//     const selectOption2 = ()=> {
//         let option2 = document.getElementById("option2");
//         let text2 = option2.options[option2.selectedIndex].text;
//         setOption2(text2);
//     }
//
//     const saveMatch = () => {
//     axios.post("http://localhost:8989/save-match", {
//         params:
//             team1: option1,
//             team2: option2,
//             isLive: true}
//     }).then((res => {
//         if(res.data.success){
//             alert("game saved!")
//         } else {
//             alert("one of the group already playing")
//         }
//     } ))
//         axios.get("http://localhost:8989/get-live-games", {
//         }).then(res =>{
//             setLiveMatches(res.data)
//
//         })
//     }
//
//
//
//     return(
//         <div>
//
//         {
//             !userSignIn ?
//                 <div>
//
//                 <input type="text" placeholder={"enter your username"} value={username} onChange={ (e)=> setUsername(e.target.value)}/> <br/><br/>
//                 <input type="password" placeholder={"enter your password"} value={password} onChange={ (e)=> setPassword(e.target.value)}/> <br/><br/>
//                 <button onClick={onSignIn}>login</button>
//
//                 </div>
//                 :
//             <div>
//                 <div id={"group1"}>
//                     Group1 <br/>
//                     <select id={"option1"} onChange={selectOption1}>
//                         <option value="">please select a group</option>
//                         {
//                             clubs.map((team, i) => {
//                                 let disabled = team.name===option2;
//                                 return (
//                                     <option  value={team.name} disabled={disabled}>{team.name}</option>
//                                 )
//                             })
//                         }
//                     </select>
//
//
//                 </div>
//
//                 <div id={"group2"}>
//                     Group2 <br/>
//                     <select id={"option2"} onChange={selectOption2}>
//
//                         <option  value="">please select a group</option>
//                         {
//                             clubs.map((team, i) => {
//                                 let disabled = team.name===option1;
//                                 return (
//                                     <option value={team.name} disabled={disabled}>{team.name}</option>
//                                 )
//                             })
//                         }
//                     </select>
//                 </div>
//                 <button onClick={saveMatch}>save</button>
//
//              </div>
//         }
//
// </div>
//     )
// }
// export default LoginHooks;