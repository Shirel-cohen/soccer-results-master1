import {useEffect, useState} from "react";
import axios from "axios";
import RenderGame from "./RenderGame";
import {sendApiGetRequest, sendApiPostRequest} from "./AppResponse";
function LoginHooks(){
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [responseFromGet, setResponseFromGet] = useState(0);
    const [userSignIn, setUserSignIn] = useState(false);
    const [clubs, setClubs] = useState([]);
    const [option1, setOption1] = useState ("");
    const [option2, setOption2] = useState ("");
    // const [group1Goals, setGroup1Goals] = useState(0);
    // const [group2Goals, setGroup2Goals] = useState(0);
    const [liveMatches, setLiveMatches] = useState ([]);
    const [saveButton, setSaveButton] = useState(false);
    const [isGoalsChange, setIsGoalsChange] = useState(false);


    const onSignIn = () => {
        axios.post("http://localhost:8989/sign-in",null,{
            params:{
                username: username,
                password: password,

            }
        }).then((res=>{
            if (res.data.errorCode==null){
                setUserSignIn(true);
                alert("sign-in successfully!");
            }else {
                alert(res.data.errorCode);
                // setResponseByCodeError(res.data.errorCode);
            }
        }));
    }
    useEffect(()=>{
        axios.get("http://localhost:8989/get-groups").then(res =>{
            setClubs(res.data)
        })
    },[])

    useEffect ( ()=>{
        axios.get("http://localhost:8989/get-live-games").then(res => {
            setLiveMatches(res.data)
        })
    },[liveMatches])

    const selectOption1 = (e)=> {
        setOption1(e.target.value)
    }

    const selectOption2 = (e)=> {
        setOption2(e.target.value)
    }

    const saveMatch = () => {
        sendApiPostRequest("http://localhost:8989/save-match", {
            team1: option1,
            team2: option2,
            isLive: true,
        }, (response) => {
            if (response.data.success) {
              setSaveButton(true)
                alert("Game saved!");
            }
        });
        sendApiGetRequest("http://localhost:8989/get-live-games" , (res)=>{
            setLiveMatches(res.data);
            })
        }

    const addGoalsGroupOne = (goalsA, team1) => {
        let array = liveMatches
        debugger
        array.map(team => {
            if(team.team1 ===team1){
                team.team1Goals += goalsA;
            }
        })
        setIsGoalsChange(true);
        sendApiPostRequest("http://localhost:8989/update-team1-goals", {
            team1: team1,
            team1Goals: goalsA
        }, (response) => {
            if (response.data) {
                alert("goal Added!");
            }
        })
    }
    const addGoalsGroupTwo = (goalsB, team2) => {
        let array = liveMatches
        array.map(team => {
            if(team.team2 ===team2){
                team.team1Goals += goalsB;
            }
        })
        setIsGoalsChange(true);
        sendApiPostRequest("http://localhost:8989/update-team2-goals", {
            team2: team2,
            team2Goals: goalsB
        }, (response) => {

            if (response.data) {
                alert("goal Added!");
            }
        })
    }

    const finishMatch = (team1,isAlive) =>{
        sendApiPostRequest("http://localhost:8989/finish-match",
            {
                team1: team1,
                isLive: isAlive,
            }, (response) => {
                if (response.data.isLive === false) {
                    alert("match finished");
                }
            });
    }
    //
    let updateTeamsNotPlaying = () => {
        const teamsNotPlaying = clubs;
        return teamsNotPlaying.filter(filterByLiveMatches);
    }
    let filterByLiveMatches = (team) => {
        const liveMatchesToFilter = liveMatches;
        let notPlaying = true;
        liveMatchesToFilter.forEach ((live) => {
            if(team.name === live.team1 || team.name === live.team2){
                notPlaying = false;
            }
        });
        return notPlaying;
        console.log(notPlaying)
    }
    useEffect(()=> {

    },[isGoalsChange])


    return(
        <div>

            {
                !userSignIn ?
                    <div className={"login"}>

                        <input type="text" placeholder={"enter your username"} value={username} onChange={ (e)=> setUsername(e.target.value)}/> <br/>
                        <input type="password" placeholder={"enter your password"} value={password} onChange={ (e)=> setPassword(e.target.value)}/> <br/>
                        <button type="login" onClick={onSignIn}>login</button>

                    </div>
                    :
                    <div>
                        <div id={"selection"}>
                        <div id={"group1"} style={{fontWeight: "bold"}}>
                            Group1 <br/>
                            <select id={"option1"} onChange={selectOption1} value={option1}>
                                <option value="">please select a group</option>
                                {
                                    updateTeamsNotPlaying().map((team, i) => {
                                        let disabled = team.name===option2;
                                        return (
                                            <option  value={team.name} disabled={disabled}>{team.name}</option>
                                        )
                                    })
                                }
                            </select>


                        </div>

                        <div id={"group2"} style={{fontWeight: "bold"}}>
                            Group2 <br/>
                            <select id={"option2"} onChange={selectOption2} value={option2}>

                                <option  value="">please select a group</option>
                                {
                                    updateTeamsNotPlaying().map((team, i) => {
                                        let disabled = team.name===option1;
                                        return (
                                            <option value={team.name} disabled={disabled}>{team.name}</option>
                                        )
                                    })
                                }
                            </select>
                        </div>
                        <button id={"saveButton"} onClick={saveMatch} disabled={option1==="" || option2===""}>save</button>
                        </div>
                        <div>
                        {
                            saveButton &&

                               liveMatches.map((match) => {
                                   return(
                                       <div className={"renderLiveGames"}>
                                       <RenderGame match ={match} addGoals1={addGoalsGroupOne} addGoals2 = {addGoalsGroupTwo}
                                       finish = {finishMatch}/>
                                       </div>
                                   )

                               })
                        }
                    </div>

                    </div>
            }

        </div>
    )
}
export default LoginHooks;