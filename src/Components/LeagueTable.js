
import Tables from "./Tables";
import {useEffect, useState} from "react";
import axios from "axios";


const LeagueTable =()=>{
    const [leagueTable, setLeagueTable]= useState([]);
    const [matchedFinished, setMatchedFinished] = useState([]);

    useEffect(() =>{
    axios.get("http://localhost:8989/get-groups").then((response)=> {
    const teams = response.data;
    setLeagueTable(teams);
})
axios.get("http://localhost:8989/get-finished-matches").then((response)=>{
    let allGames = response.data;
    setMatchedFinished(allGames);
})
})

        return (
            <div className={"league-table"}>
                <h6>League Table</h6>
                {
                    leagueTable.length>0 &&

                <Tables league = {leagueTable} games={matchedFinished}/>}
            </div>
        );


}
export default LeagueTable;

