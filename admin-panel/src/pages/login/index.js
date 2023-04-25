import { useState } from "react"

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    return (
        <div className="flex flex-col gap-0 margin-20-perc p-6 rounded-xl mt-8" style={{backgroundColor: "white"}}>
            <div className="mb-6">
                <div className="flex flex-col">
                    <label className="block mb-2 text-sm font-medium text-gray-600">Username</label>
                    <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        placeholder="Username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
            </div>
            <div className="mb-6">
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                    <input
                        type="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                        placeholder="Password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
            </div>
            <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                Login
            </button>
        </div>
    )
}

export default Login