import '../css/App.css';
import {BrowserRouter,NavLink,Route, Routes} from "react-router-dom"
import LiveResults from "./LiveResults";
import LeagueTable from "./LeagueTable";
import LeagueTableLive from "./LeagueTableLive";
import Login from "./Login";
import '../others/index.css';

function App() {
    const links=[
        // {to:"/", text:"home page"},
        {to:"LiveResults", text:"LIVE MATCHES"},
        {to:"LeagueTable", text:"LEAGUE TABLE"},
        {to:"LeagueTableLive", text:"LIVE RESULT"},
        {to:"Login", text:"LOGIN"},
    ]

    // const activeMenuClass=({isActive})=>(isActive ? "active-menu" : "non-active-menu");

    return (

        <div className="App">
            <BrowserRouter>
                <ul>
                    {
                        links.map((link)=>{
                            return(
                                <button className={"Buttons"}>
                                    <NavLink to={link.to}>
                                        {link.text}
                                    </NavLink>
                                </button>
                            )
                        })
                    }
                </ul>

                <Routes>
                    <Route path={"/Login"} element ={<Login/>}/>
                    <Route path={"/LiveResults"} element ={<LiveResults/>}/>
                    <Route path={"/LeagueTableLive"} element = {<LeagueTableLive/>}/>
                    <Route path={"/LeagueTable"}  element={<LeagueTable/>}/>

                </Routes>
            </BrowserRouter>


        </div>
    );
}

export default App;