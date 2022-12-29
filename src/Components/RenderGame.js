import React, {useEffect} from "react";

function RenderGame(props) {
    const match = props.match;



    return (
        <div>
            <table>

                <tr className={"wpos"}>
                    <td>
                        <button onClick={() => {
                            props.addGoals1(match.team1Goals+1,match.team1)
                        }}>Add goal
                        </button>

                    </td>
                    {/*<td>{match.groupOneGoals}</td>*/}
                    <td>{match.team1}</td>
                    <td style={{paddingLeft: "10px"}}>{match.team2}</td>
                   {/* <td>{match.groupTwoGoals}</td>*/}
                    <td>
                        <button onClick={() => {
                            props.addGoals2(match.team2Goals + 1, match.team2);
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