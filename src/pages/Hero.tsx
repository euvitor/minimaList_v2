import { useRef } from "react";
import { AuthModal, type AuthModalHandle } from "../components/AuthModal";

function Hero() {
    const authModalRef = useRef<AuthModalHandle>(null)

    return (
        <>
            <button type="button" onClick={() => authModalRef.current?.open()}>
                Login
            </button>
            <AuthModal ref={authModalRef} />
        </>
    )
}

export default Hero