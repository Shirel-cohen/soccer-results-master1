import React from "react";

function RenderGame(props) {
    const match = props.match;


    return (
        <div>
            <table className={"tables"}>
{/*                <tr>
                    <th>team1</th>
                    <th>GT1</th>
                    <th>team2</th>
                    <th>GT2</th>
                    <th>finish match</th>
                </tr>*/}
                <tr className={"wpos"}>
                    <td>{match.team1}</td>
                    <td>{match.groupOneGoals}
                        <button onClick={() => {
                            props.addGoals1(match.team1Goals+1,match.team1)
                        }}>Add goal
                        </button>
                    </td>
                    <td>{match.team2}</td>
                    <td>{match.groupTwoGoals}
                        <button onClick={() => {
                            props.addGoals2(match.team2Goals+1,match.team2)
                        }}>Add goal</button>
                    </td>
                    <td>
                        <button disabled={ match.team2.selected && match.team1.selected
                        } onClick={() => {
                            props.finish(match.team1,false)
                        }}
                        >Finish</button>
                    </td>

                </tr>


            </table>
        </div>
    )
}

export default RenderGame;