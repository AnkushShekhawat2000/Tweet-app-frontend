import { useEffect, useState } from "react";
import { useUserauth } from "../context/UserAuthContext";

const useLoggedInUser = () => {
    const {user} = useUserauth();
    const email = user?.email;

    // console.log("loggedInUser=>", email, "    uuuuu", user);
    const [loggedInUser, setLoggedInUser] = useState({});

    useEffect(() => {
        fetch(`https://tweet-app-backend.onrender.com/loggedInUser?email=${email}`)
            .then(res => res.json())
            .then(data => {
                console.log('from useLoggedinuser', data)
                setLoggedInUser(data)
            })
    }, [email])



    return [loggedInUser, setLoggedInUser];
}

export default useLoggedInUser

