import React from "react";
import "../css/Tables.css"

import {sendApiGetRequest} from "./AppResponse";


class LiveMatches extends React.Component{
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

    renderLiveMatches = () => {
        return (
                <div>

                    <table>
                        <tr className={"col"}>
                            <th>HOME</th>
                            <th>T1G</th>
                            <th>T2G</th>
                            <th>AWAY</th>
                        </tr>

                        {
                            this.state.liveGames.map((game) => {
                                return (
                                    <tr className={"wpos"}>

                                        <td style={{color: this.colorTeam1(game)}}>{game.team1}</td>
                                        <td style={{color: this.colorTeam1(game)}}>{game.team1Goals}</td>


                                        <td style={{color: this.colorTeam2(game)}}>{game.team2Goals}</td>
                                        <td style={{color: this.colorTeam2(game)}}>{game.team2}</td>
                                    </tr>
                                );
                            })
                        }
                    </table>
                </div>
        )

    };
    renderNoMatches = () => {
        return (
            <div>
                <div className="content">
                    <h2>NO LIVE TONIGHT</h2>
                    <h2>NO LIVE TONIGHT</h2>
                </div>

            </div>
        );

    };
    render() {

        return (

            <div className={ "league-table"}>
                {
                    this.state.liveGames.length > 0 ? this.renderLiveMatches() : this.renderNoMatches()

                }


            </div>
        );

    }


}
export default LiveMatches;