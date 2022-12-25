import React, {Component} from "react";
import {sendApiGetRequest, sendApiPostRequest} from "./AppResponse";
import '../css/leagueTable.css'




class LeagueTable extends React.Component{
    state = {
        teams: [
            {id: 0, club: "a", Points: 0, Won: 0, Drawn: 0, Lost: 0, GF: 0, GA: 0, GD: 0},
            {id: 0, club: "b", Points: 0, Won: 0, Drawn: 0, Lost: 0, GF: 0, GA: 0, GD: 0},
            {id: 0, club: "", Points: 0, Won: 0, Drawn: 0, Lost: 0, GF: 0, GA: 0, GD: 0},
            {id: 0, club: "", Points: 0, Won: 0, Drawn: 0, Lost: 0, GF: 0, GA: 0, GD: 0},
            {id: 0, club: "", Points: 0, Won: 0, Drawn: 0, Lost: 0, GF: 0, GA: 0, GD: 0},
            {id: 0, club: "", Points: 0, Won: 0, Drawn: 0, Lost: 0, GF: 0, GA: 0, GD: 0},
            {id: 0, club: "c", Points: 0, Won: 0, Drawn: 0, Lost: 0, GF: 0, GA: 0, GD: 0},
            {id: 0, club: "", Points: 0, Won: 0, Drawn: 0, Lost: 0, GF: 0, GA: 0, GD: 0},
            {id: 0, club: "", Points: 0, Won: 0, Drawn: 0, Lost: 0, GF: 0, GA: 0, GD: 0},
            {id: 0, club: "d", Points: 0, Won: 0, Drawn: 0, Lost: 0, GF: 0, GA: 0, GD: 0},
            {id: 0, club: "", Points: 0, Won: 0, Drawn: 0, Lost: 0, GF: 0, GA: 0, GD: 0},
            {id: 0, club: "", Points: 0, Won: 0, Drawn: 0, Lost: 0, GF: 0, GA: 0, GD: 0}
        ],

        currentTeamWon: 0,
        currentTeamDraw: 0,
        // currentTeamPoints: this.state.currentTeamWon * 3 + this.state.currentTeamDraw,
        currentTeamPoints: 0,


        currentTeamGf: 0,
        currentTeamGa: 0,
        // currentTeamGd: this.state.currentTeamGf - this.state.currentTeamGa
        currentTeamGd: 0,

    };

    updateState =()=>{
       /* sendApiPostRequest("http://localhost:8989/finish-match",{
            isLive: false

        },(response)=>{

        })*/

        sendApiGetRequest("http://localhost:8989/get-finished-matches",(response)=>{

            const finishedMatches = response.data;
            const originalArray = this.state.teams;

            finishedMatches.map((matchFinished , i)=>{
                let team1 = matchFinished.
                originalArray.map((team,j)=>{
                    if (matchFinished.team1 === team.club || matchFinished.team2 ===team.club) {
                         // matchFinished[i].team2
                        if (matchFinished[i].team2Goals === matchFinished.team1Goals) {
                            //add  to one draw but this not in state!!
                            originalArray[j].Drawn += 1;
                            originalArray[j].GF += matchFinished[i].team1Goals
                            this.setState({
                                teams: originalArray
                            })
                        }
                    }
                })
            })


        })




        this.setState({
            currentTeamGd: this.state.currentTeamGf - this.state.currentTeamGa,
            currentTeamPoints: this.state.currentTeamWon * 3 + this.state.currentTeamDraw,


        })

    }




    componentDidMount() {
        sendApiGetRequest("http://localhost:8989/get-groups" , (response)=>{
            const teams = response.data;
            const originalArray = this.state.teams;


            originalArray.map((currentClub , i)=>{
                currentClub.club = teams[i].name;
                currentClub.id = teams[i].id;
            })
            this.setState({
                teams: originalArray
            })
        });
    }



    render() {
        return (
            <div >
                <div className={"league-table"}>

                    <h1 className={"heading"}> STANDING</h1>
                    <table>
                        <tr className={"col"}>
                            <th>#</th>
                            <th className={"left"}>TEAM</th>
                            <th>PTS</th>
                            <th>W</th>
                            <th>D</th>
                            <th>L</th>
                            <th>+/-</th>
                            <th>GD</th>
                            {/*<th>POSITION</th>*/}
                        </tr>


                        {/*<Tables teams={this.state.teams}/>*/}
                         {



                            this.state.teams.map((team) => {




                                return (
                                    <tr className={"wpos"}>
                                        <td >{team.id}</td>
                                        <td className={"left"}>{team.club}</td>
                                        <td>{team.Points}</td>
                                        <td>{team.Won}</td>
                                        <td>{team.Drawn}</td>
                                        <td>{team.Lost}</td>
                                        <td>{team.GF} - {team.GA}</td>
                                        <td>{team.GD}</td>
                                        {/*<td>{team.position}</td>*/}
                                    </tr>
                                );


                            })
                        }
                    </table>
                </div>


            </div>
        );
    }


}

export default LeagueTable;