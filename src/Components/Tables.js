import React from "react";
import '../css/Tables.css'


function Tables(props) {
    const teams = props.teams;

    return (
        <div className={"tables"}>
                {
                    teams.map((team) => {
                        return (
                            <tr className={"teams"}>
                                <td>{props.id}</td>
                                <td>{props.points}</td>
                                <td>{props.name}</td>
                                <td>{props.inFavorGoals}</td>
                                <td>{props.goalsAgainst}</td>
                            </tr>
                        );
                    })
                }



        </div>
    );








}

export default Tables;