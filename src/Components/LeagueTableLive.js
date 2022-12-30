import React, {useEffect, useState} from "react";
import Tables from "./Tables";
import axios from "axios";

const LeagueTableLive=()=> {


    const [leagueTable, setLeagueTable]= useState([]);
    const [games, setGames] = useState([]);

    useEffect(() =>{
        axios.get("http://localhost:8989/get-groups").then((response)=> {
            const teams = response.data;
            setLeagueTable(teams);
        })
        axios.get("http://localhost:8989/get-all-matches").then((response)=>{
            let allGames = response.data;
            setGames(allGames);
        })
    })


    return (

        <div className={"league-table"}>
            <h6 style={{marginTop:"-140px", fontSize:"40px"} }>League Table Live</h6>
            {leagueTable.length>0  &&
                <Tables league = {leagueTable} games={games}/>}
        </div>
    );
}

export default LeagueTableLive;