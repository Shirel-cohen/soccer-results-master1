import React from "react";




function Tables(props) {
    const leagueTable = props.league;

    return (
        <div className={"tables"}>
            <table>
                <tr className={"col"}>
                    <th scope={"col"}>#</th>
                    <th className={"left"} scope={"coll"}>TEAM</th>
                    <th scope={"col"}>PTS</th>
                    <th scope={"col"}>W</th>
                    <th scope={"col"}>D</th>
                    <th scope={"col"}>L</th>
                    <th scope={"col"}> GF</th>
                    <th>GA</th>
                    <th scope={"col"}>GD</th>
                    {/*<th>POSITION</th>*/}
                </tr>


                {/*<Tables teams={this.state.teams}/>*/}
                {

                    leagueTable.map((team) => {
                        return (
                            <tr className={"wpos"}>
                                <td>{team.id}</td>
                                <td className={"left"} scope={"row"}>{team.club}</td>
                                <td>{team.Points}</td>
                                <td>{team.Won}</td>
                                <td>{team.Drawn}</td>
                                <td>{team.Lost}</td>
                                <td>{team.GF}</td>
                                <td> {team.GA}</td>
                                <td>{team.GD}</td>
                                <td>{team.position}</td>
                            </tr>
                        );


                    })
                }
            </table>


        </div>
    );








}

export default Tables;