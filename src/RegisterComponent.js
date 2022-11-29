import { useRef, useState, useEffect} from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as api from "./api";

// 15:23 https://www.youtube.com/watch?v=brcHK3P6ChQ&list=PL0Zuz27SZ-6PRCpm9clX0WiBEMB70FWwd&ab_channel=DaveGray

// Regex-regler för användarnamn och lösenord.
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
//const REGISTER_URL = '/register';

// Funktions-komponent: RegisterComponent
const RegisterComponent = () => {

    //useRef-referenser (username-input & fel)
    const userRef = useRef();
    const errRef = useRef();

    // States: Användarnamn-input
    const [username, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    // States: Lösenord-input
    const [password, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    // States: Matcha lösenord
    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    // Meddelande om registrering lyckas eller ej
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    // Sätt "focus" på användarnamn-input när RegisterComponent-komponenten laddar
    useEffect(() => {
        userRef.current.focus();
    }, [])

    // Match användarnamn-input mot "[username]"
    useEffect(() => {
        const result = USER_REGEX.test(username);
        console.log(result);
        console.log(username);
        setValidName(result);
    }, [username])

    //lösenord, matcha lösenord
    useEffect(() => {
        const result = PWD_REGEX.test(password);
        console.log(result);
        console.log(password);
        setValidPwd(result);
        const match = password === matchPwd;
        setValidMatch(match);
    }, [password, matchPwd])

    //felmeddelande
    useEffect(() => {
        setErrMsg('');
    }, [username, password, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Förhindra att knappen ändras till "enabled" via JS-hack:

        /*
        const v1 = USER_REGEX.text(username);
        const v2 = PWD_REGEX.text(password);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");

            return;
        }
        */

        try {
            //const response = await api.register(REGISTER_URL, JSON.stringify({username, password}),
            //const response = await api.register(JSON.stringify({username, password}),
            //const response = await api.register(username, password)
            await api.register(username, password)
            //{
                    //headers: {'Content-Type': 'application/json'},
                    //withCredentials: true
                //}
            //console.log(response.data);
            //console.log(response.accessToken);
            //console.log(JSON.stringify(response))
            setSuccess(true);
            // clear input fields
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }

        //console.log(username, password);
        //setSuccess(true);

        //await api.register(username, password);
        //28:30 (koppla till backend)
        //35:41

    return (
        <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                    <a href="#">Logga in</a>
                    </p>
                </section>
            ) : (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" :
                "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Registrera användare</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">
                    Username:
                    <span className={validName ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validName || !username ? "hide" :
                    "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    required
                    aria-invalid={validName ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                    />
                <p id="uidnote" className={userFocus && username &&
                !validName ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    4 till 24 tecken.<br />
                    Bokstäver, siffror, underline och bindestreck är tillåtna.
                </p>

                <label htmlFor="password">
                    Password:
                    <span className={validPwd ? "valid" : "hide"}>
                        <FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validPwd || !password ? "hide" : "invalid"}>
                        <FontAwesomeIcon icon={faTimes} />
                    </span>
                </label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    required
                    aria-invalid={validPwd ? "false" : "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                />
                <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" :
                "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    8 till 24 tecken.<br />
                    Måste innehålla stora och små bokstäver, en siffra och ett specialtecken. <br />
                    Tillåtna tecken: <span aria-label="utropstecken">!</span>
                    <span aria-label="snabel-a">@</span> <span aria-label="brädgård">#</
                    span> <span aria-label="dollar-tecken">$</span> <span
                    aria-label="procent">%</span>
                </p>
                <input
                    type="password"
                    id="confirm_psw"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                />
                <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" :
                    "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Måste matcha lösenordsfältet.
                </p>

                <button disabled={!validName || !validPwd || !validMatch ? true : false}
                        >Registrera användare</button>
            </form>
            <p>
                Redan registrerad?<br />
                <span className="linje">
                    {/*Lägg in router-länk till inloggningssida här*/}
                    <a href="#">Logga in</a>
                </span>
            </p>
        </section>
            )}
            </>
    )
}

export default RegisterComponent