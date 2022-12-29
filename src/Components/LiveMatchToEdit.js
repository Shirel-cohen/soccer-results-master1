// function LiveMatchToEdit(props){
//     const LiveMatchesToEdit = props.liveMatches;
//     const liveMatchesToEdit = [
//         // {team1: "barcelona", t1g: 0, team2: "real", t2g: 0},
//         // {team1: "liverbol", t1g: 0, team2: "United", t2g: 0},
//         // {team1: "milan", t1g: 0, team2: "inter", t2g: 0}
//     ];
//
//     return(
//
//         <div className={"league-table"}>
//             <table>
//                 <tr className={"col"}>
//                     <th className={"col"} >EDIT</th>
//                     <th className={"col"} >Home</th>
//                     <th className={"col"} >T1G</th>
//                     <th className={"col"} >T2G</th>
//                     <th className={"col"} >AWAY</th>
//                     <th className={"col"} >EDIT</th>
//                     <th className={"col"} >FINISH</th>
//                 </tr>
//                 {
//                     liveMatchesToEdit.map((match)=>{
//                         return(
//                             <tr className={"wpos"}>
//                                 <td>
//                                     <button>add Goal</button>
//                                 </td>
//                                 <td>{match.team1}</td>
//                                 <td>{match.t1g}</td>
//                                 <td>{match.t2g}</td>
//                                 <td>{match.team2}</td>
//                                 <td>
//                                     <button>add Goal</button>
//                                 </td>
//                                 <td>
//                                     <button>Finish - match</button>
//                                 </td>
//                             </tr>
//                         )
//                     })
//                 }
//
//             </table>
//
//
//         </div>
//     )
// }
// export default LiveMatchToEdit;