import { useRef, useState, useEffect} from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as api from "../../api";
import {useNavigate} from "react-router-dom";
import "./RegisterView.css";


const USER_REGEX = /^.{1,50}$/;
const PWD_REGEX = /^.{1,50}$/;


// Funktions-komponent: RegisterComponent
const RegisterView = () => {

    const navigate = useNavigate()

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
        setValidName(USER_REGEX.test(username));
    }, [username])

    //lösenord, matcha lösenord
    useEffect(() => {
        setValidPwd(PWD_REGEX.test(password));
        const match = password === matchPwd;
        setValidMatch(match);
    }, [password, matchPwd])


//felmeddelande
    useEffect(() => {
        setErrMsg('');
    }, [username, password, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = await api.register(username, password)
            if(data.messager !== "Registration successful") {
                setErrMsg(data.messager)
                return
            }
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

    return (
        <>
            {success ? (
                <section>
                    <h1>Registration Successful!</h1>
                        <button onClick={() => navigate("/login")}>Log in</button>
                </section>
            ) : (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" :
                "offscreen"} aria-live="assertive">{errMsg}</p>
            <h1>Register User</h1>
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
                <br />
                <label htmlFor="password">
                    Password:
                    <span className={validPwd ? "valid" : "hide"}><FontAwesomeIcon icon={faCheck} />
                    </span>
                    <span className={validPwd || !password ? "hide" : "invalid"}><FontAwesomeIcon icon={faTimes} />
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
                <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "offscreen"}></p>
                <br />
                <label htmlFor="password">
                    Confirm Password:
                    <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? "hide" : "invalid"} />
                </label>
                <input
                    type="password"
                    id="confirm_psw"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    value={matchPwd}
                    required
                    aria-invalid={validMatch ? "false" : "true"}
                    aria-describedby="confirmnote"
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)}
                />
                <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Måste matcha lösenordsfältet.
                </p>

                <button disabled={!validName || !validPwd || !validMatch ? true : false}
                >Sign Up!</button>

            </form>
            <p>
{/*                Redan registrerad?<br />*/}
                Already registered?
            </p>
            <button onClick={() => navigate("/login")}>Log in</button>

        </section>
            )}
            </>
    )
}

export default RegisterView