import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
const API = process.env.REACT_APP_API_URL;


export default function LogSingle() {
    let navigate = useNavigate();
    let { index } = useParams();
    const [log, setLog] = useState({});

    useEffect(() => {
        axios
            .get(`${API}/logs/${index}`)
            .then((res) => {
                setLog(res.data);
                // console.log(res);
            })
            .catch((err) => console.error(err))
    }, [index, navigate]);

    const handleDelete = () => {
        axios.delete(`${API}/logs/${index}`)
            .then(() => {
                navigate("/logs");
            })
            .catch((err) => console.error(err))
    };


    return (
        <div className="Log">
            <h2>Captain's Log</h2>
            <h3>Show</h3>
            <h4>{log.title} - By {log.captainName}</h4>
            <p>{log.post}</p>
            <p>{log.mistakesWereMadeToday}</p>
            <p>Days since last crisis: {log.daysSinceLastCrisis}</p>
            <Link to="/logs">Back</Link>
            <br></br>
            <Link to={`/logs/${index}/edit`}>Edit</Link>
            <br />
            <button onClick={handleDelete}>Delete</button>
        </div>
    )
};
