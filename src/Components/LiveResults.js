import React from "react";
import "../css/leagueTable.css"
import "../css/LiveResult.css"
import {sendApiGetRequest} from "./AppResponse";

class LiveResults extends React.Component{
    state= {
        liveGames: []
    }

    componentDidMount() {
        sendApiGetRequest("http://localhost:8989/get-live-games" , (response)=>{
            this.setState({
                liveGames :response.data
            })
        })
    }

    colorTeam1 = (game) => {
        let colorStyle = "";
        if (game.team1Goals > game.team2Goals) {
            colorStyle = "green";
        } else
            colorStyle = "red";



        if (game.team1Goals === game.team2Goals)
             colorStyle = "#f5d12e";

        return colorStyle;

      /*  <td style={{color :this.matchResult(game)}}>{game.team1}</td>
        <td style={{color : this.matchResult(game)}}>{game.team1Goals}</td>*/


    };
    colorTeam2 = (game) => {
        let colorStyle = "";

        if (game.team2Goals > game.team1Goals) {
            colorStyle = "green";
        } else {
            colorStyle = "red";
        }

        if (game.team1Goals === game.team2Goals)
            colorStyle = "#f5d12e";

        return colorStyle;

        /*  <td style={{color :this.matchResult(game)}}>{game.team1}</td>
          <td style={{color : this.matchResult(game)}}>{game.team1Goals}</td>*/


    };
    render() {

        return (

            <div className={"head"}>
                <div className="content">
                    <h2>Live</h2>
                    <h2>Live</h2>
                </div>
                <div className={"league-table"} >

                    <table>
                        <tr className={"col"}>
                            <th>T1</th>
                            <th>T1G</th>
                            <th>T2G</th>
                            <th>T2</th>
                        </tr>

                        {
                            this.state.liveGames.map((game) => {
                                return (
                                    <tr className={ "wpos"}>

                                        <td style={{color :this.colorTeam1(game)}}>{game.team1}</td>
                                        <td style={{color : this.colorTeam1(game)}}>{game.team1Goals}</td>



                                        <td style={{color :this.colorTeam2(game)}} >{game.team2Goals}</td>
                                        <td style={{color :this.colorTeam2(game)}}>{game.team2}</td>
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
export default LiveResults;