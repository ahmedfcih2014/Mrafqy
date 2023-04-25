import { useState } from "react"

const Login = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errors ,setErrors] = useState({username: "", password: ""})

    const changeUsername = e => {
        setErrors({...errors, username: ""})
        setUsername(e.target.value)
    }

    const changePassword = e => {
        setErrors({...errors, password: ""})
        setPassword(e.target.value)
    }

    const submitLogin = () => {
        if (!username) {
            setErrors({...errors, username: "Username can`t be empty"})
            return
        }
        if (!password) {
            setErrors({...errors, password: "Password can`t be empty"})
            return
        }
        console.log({
            username,
            password
        })
    }

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
                        onChange={changeUsername}
                    />
                    {
                        errors.username ? 
                        <span class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                            { errors.username }
                        </span>
                        : null
                    }
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
                        onChange={changePassword}
                    />
                    {
                        errors.password ? 
                        <span class="flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">
                            { errors.password }
                        </span>
                        : null
                    }
                </div>
            </div>
            <button
                type="submit"
                onClick={submitLogin}
                className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                Login
            </button>
        </div>
    )
}

export default Login