import React, {Component} from "react";
import {sendApiGetRequest, sendApiPostRequest} from "./AppResponse";
import Tables from "./Tables";




class LeagueTable extends React.Component{
    state = {
        leagueTable: [
            {id: 0, club: "0", Points: 0, Won: 0, Drawn: 0, Lost: 0, GF: 0, GA: 0, GD: 0},
            {id: 0, club: "0", Points: 0, Won: 0, Drawn: 0, Lost: 0, GF: 0, GA: 0, GD: 0},
            {id: 0, club: "", Points: 0, Won: 0, Drawn: 0, Lost: 0, GF: 0, GA: 0, GD: 0},
            {id: 0, club: "", Points: 0, Won: 0, Drawn: 0, Lost: 0, GF: 0, GA: 0, GD: 0},
            {id: 0, club: "", Points: 0, Won: 0, Drawn: 0, Lost: 0, GF: 0, GA: 0, GD: 0},
            {id: 0, club: "e", Points: 0, Won: 0, Drawn: 0, Lost: 0, GF: 0, GA: 0, GD: 0},
            {id: 0, club: "f", Points: 0, Won: 0, Drawn: 0, Lost: 0, GF: 0, GA: 0, GD: 0},
            {id: 0, club: "", Points: 0, Won: 0, Drawn: 0, Lost: 0, GF: 0, GA: 0, GD: 0},
            {id: 0, club: "", Points: 0, Won: 0, Drawn: 0, Lost: 0, GF: 0, GA: 0, GD: 0},
            {id: 0, club: "", Points: 0, Won: 0, Drawn: 0, Lost: 0, GF: 0, GA: 0, GD: 0},
            {id: 0, club: "", Points: 0, Won: 0, Drawn: 0, Lost: 0, GF: 0, GA: 0, GD: 0},
            {id: 0, club: "", Points: 0, Won: 0, Drawn: 0, Lost: 0, GF: 0, GA: 0, GD: 0}
        ],
        matchesFinished: [],
    };

    componentDidMount() {
        // get Clubs from server :
        sendApiGetRequest("http://localhost:8989/get-groups" , (response)=>{
            const teams = response.data;
            const originalArray = this.state.leagueTable;
            originalArray.map((currentClub , i)=>{
                currentClub.club = teams[i].name;
                currentClub.id = teams[i].id;
            })
            this.setState({
                leagueTable: originalArray
            })

            sendApiGetRequest("http://localhost:8989/get-finished-matches" , (response)=>{
                const matchFinished = response.data;
                this.calc(matchFinished, originalArray);
                const sortedTable = this.sort(originalArray);
                this.setState({
                    leagueTable: sortedTable,
                })
            })
        });

    }
// componentDidUpdate(prevProps, prevState, snapshot) {
//         if(prevProps.matchesFinished!==prevState.matchesFinished){
//
//         }
// }

    calc = (games , league)=>{
        games.forEach(game => {
            let team1Index = league.findIndex(league => league.club === game.team1);
            let team2Index = league.findIndex(league => league.club === game.team2);
            //add goals gf
            league[team1Index].GF += game.team1Goals;
            league[team2Index].GF += game.team2Goals;

            //add goals Against
            league[team1Index].GA += game.team2Goals;
            league[team2Index].GA += game.team1Goals;
            //calc diffG
            league[team1Index].GD += game.team1Goals - game.team2Goals;
            league[team2Index].GD += game.team2Goals - game.team1Goals;
            //
            if (game.team1Goals > game.team2Goals) {
                league[team1Index].Won+=1;
                league[team2Index].Lost++;
                league[team1Index].Points += 3;
            } else if (game.team1Goals < game.team2Goals) {
                league[team2Index].Won+=1;
                league[team1Index].Lost++;
                league[team2Index].Points += 3;
            } else {
                league[team1Index].Drawn += 1;
                league[team2Index].Drawn += 1;
                league[team1Index].Points += 1;
                league[team2Index].Points += 1;
            }

        });

        this.setState({
            leagueTable: league,

        })
    }

    sort = (leagueTable)=>{
        leagueTable.sort((team1, team2) => {

                if (team1.Points > team2.Points)
                    return -1;
                if (team1.Points < team2.Points)
                    return 1;


                if (team1.GD > team2.GD)
                    return -1;
                if (team1.GD < team2.GD)
                    return 1;


                if (team1.club.toUpperCase() < team2.club.toUpperCase())
                return -1;
                if (team1.club.toUpperCase() > team2.club.toUpperCase())
                    return 1;

                return 0;
            }
        );
                return leagueTable;
            }

    render() {
        return (
            <div className={"league-table"}>
                <Tables league = {this.state.leagueTable}/>
            </div>
        );
    }

}
export default LeagueTable;