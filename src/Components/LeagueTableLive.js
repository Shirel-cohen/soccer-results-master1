import React from "react";
import Tables from "./Tables";
import {sendApiGetRequest} from "./AppResponse";

class LeagueTableLive extends React.Component {

    state = {
        leagueTable: [
            {id: 0, club: "", Points: 0, Won: 0, Drawn: 0, Lost: 0, GF: 0, GA: 0, GD: 0},
            {id: 0, club: "", Points: 0, Won: 0, Drawn: 0, Lost: 0, GF: 0, GA: 0, GD: 0},
            {id: 0, club: "", Points: 0, Won: 0, Drawn: 0, Lost: 0, GF: 0, GA: 0, GD: 0},
            {id: 0, club: "", Points: 0, Won: 0, Drawn: 0, Lost: 0, GF: 0, GA: 0, GD: 0},
            {id: 0, club: "", Points: 0, Won: 0, Drawn: 0, Lost: 0, GF: 0, GA: 0, GD: 0},
            {id: 0, club: "", Points: 0, Won: 0, Drawn: 0, Lost: 0, GF: 0, GA: 0, GD: 0},
            {id: 0, club: "", Points: 0, Won: 0, Drawn: 0, Lost: 0, GF: 0, GA: 0, GD: 0},
            {id: 0, club: "", Points: 0, Won: 0, Drawn: 0, Lost: 0, GF: 0, GA: 0, GD: 0},
            {id: 0, club: "", Points: 0, Won: 0, Drawn: 0, Lost: 0, GF: 0, GA: 0, GD: 0},
            {id: 0, club: "", Points: 0, Won: 0, Drawn: 0, Lost: 0, GF: 0, GA: 0, GD: 0},
            {id: 0, club: "", Points: 0, Won: 0, Drawn: 0, Lost: 0, GF: 0, GA: 0, GD: 0},
            {id: 0, club: "", Points: 0, Won: 0, Drawn: 0, Lost: 0, GF: 0, GA: 0, GD: 0}
        ],

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

            sendApiGetRequest("http://localhost:8989/get-all-matches" , (response)=>{
                debugger
              //  this.state.leagueTable.length=0;
                const matchFinished = response.data;
                this.calc(matchFinished, originalArray);
                const sortedTable = this.sort(originalArray);
                this.setState({
                    leagueTable: sortedTable,

                })
            })
        });

    }



    calc = (games, league) => {
        debugger
        let  tableLeague=[...this.state.leagueTable]
        tableLeague.map(i=>{
            i.Points=0;
            i.GD=0;
            i.GA=0;
            i.Drawn=0;
            i.Won=0;
            i.Lost=0;
            i.GF=0;
        })
        this.setState({
            leagueTable:tableLeague
        })

        games.forEach(game => {
            let team1Index = league.findIndex(league => league.club === game.team1);
            let team2Index = league.findIndex(league => league.club === game.team2);
            //add goals gf
            console.log(team1Index)
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
                league[team1Index].Won += 1;
                league[team2Index].Lost++;
                league[team1Index].Points += 3;
            } else if (game.team1Goals < game.team2Goals) {
                league[team2Index].Won += 1;
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


    };


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
               <h6>League Table Live</h6>
                <Tables league = {this.state.leagueTable}/>
            </div>
        );
    }


}
export default LeagueTableLive;