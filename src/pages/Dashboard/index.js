import { useState } from "react";
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";
import Loading from "../../components/loading";

export function Dashboard() {

    const [message, setMessage] = useState({ success: false, message: "", showMessage: false });
    const [usersData, setUsersData] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [secretNote, setSecretNote] = useState("");
    const navigate = useNavigate();

    function OnChange(e) {
        setSecretNote(e.target.value);
    }

    async function getUserData() {
        let response = await fetch("https://secret-notebook-api.vercel.app//getUserData", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userId: localStorage.userId })
        });

        let data = await response.json();
        if (response.status) setUsersData(data);
        setIsLoading(false)
    }

    useEffect(() => {
        getUserData()
    }, []);

    async function logoutTheUser() {
        try {
            setIsLoading(true);
            let response = await fetch("https://secret-notebook-api.vercel.app//logout", {
                method: "DELETE",
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({ jwtToken: localStorage.refreshToken })
            });
            setIsLoading(false);
            if (response.status === 200) {
                localStorage.clear();
                navigate("/login");
            }
        } catch (e) {
            console.log("Unable to logout");
            logoutTheUser();
        }
    }

    async function uploadSecretNote() {
        let response = await fetch("https://secret-notebook-api.vercel.app//setSecret", {
            body: JSON.stringify({ secretNote, userId: localStorage.userId }),
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
        });
        let result = await response.json();
        setMessage({ ...result, showMessage: true })
        console.log(result)
    };

    function hideMessage() {
        setMessage({ ...message, showMessage: false })
    }

    return (
        <>
            {isLoading && <Loading />}
            <div>
                <div className="bg-white p-5 text-black rounded-lg max-h-96 overflow-hidden">
                    <div className="">Hello, <span className="lowercase font-bold">{ usersData.firstName }</span></div>
                    {message.showMessage && <div className={`${(message.success) ? "bg-green-400" : "bg-red-400"} text-white text-sm p-2 rounded-lg mb-2 flex justify-between items-center`}>
                        <div className="">{message.message}</div>
                        <div className="cursor-pointer" onClick={hideMessage}>&times;</div>
                    </div>}
                    <div className="font-bold text-lg">Write your secret Note</div>
                    <hr className="h-1 bg-black mb-2" />
                    <textarea cols="30" rows="10" onChange={OnChange} value={secretNote} placeholder="Enter your Messsage here" className="p-2 border-black border-2 max-h-48"></textarea>
                    <div onClick={uploadSecretNote} className="bg-blue-400 hover:bg-blue-600  p-2 rounded-lg text-white text-center cursor-pointer">Upload You Secret Note</div>
                    <br />
                </div>
                <button className="absolute top-10 right-10 bg-blue-500 hover:bg-blue-600 p-2 rounded-lg cursor-pointer" onClick={logoutTheUser}>Log Out</button>
            </div>
        </>
    )
}