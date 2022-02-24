import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from 'next/router';
import { useDispatch } from "react-redux";
import SearchBar from "../SearchBar";
import { toggleSideMenu } from "../../store/actions";
import styles from './UlNavBar.module.scss'

export default function UlNavBar({ mobile = false }) {
  const router = useRouter();
  const session = useSession();
  const dispatch = useDispatch();
  function hide(){
    mobile && 
    setTimeout(() => {
       dispatch(toggleSideMenu)
    }, 20);
  }
  return (
    <ul>
      {mobile && (
        <li >
          <SearchBar />
        </li>
      )}
      <li onClick={hide}>
        <Link href={"/"}>
          <a className={router.pathname == "/" ? styles.active : ""}>Home</a>
        </Link>
      </li>
      <li onClick={hide}>
        <Link href={"/citta"}>
          <a className={router.pathname.startsWith("/citta") ? styles.active : ""}>Città</a>
        </Link>
      </li>
      <li onClick={hide}>
        <Link href={"/esperienze"}>
          <a className={router.pathname.startsWith("/esperienze") ? styles.active : ""}>Esperienze</a>
        </Link>
      </li>
      <li onClick={hide}>
        <Link href={"/about"}>
          <a className={router.pathname == "/about" ? styles.active : ""}>About</a>
        </Link>
      </li>
      {mobile && session.data && (
        <li onClick={hide}>
          <Link href={"/cart"}>
            <a>Carrello</a>
          </Link>
        </li>
      )}
      <li onClick={hide}>
        {session.data != null ? (
          <button 
            onClick={signOut} 
            style={{
              cursor: "pointer", 
              color:"#fff",
              background:"transparent",
              fontWeight:"600",
              border:"none",
              fontFamily: 'Raleway',
              fontSize:'16px'
               }}
          >
            Logout
          </button>
        ) : (
          <Link href={"/auth/signin"}>
            <button 
              style={{
              cursor: "pointer", 
              color:"#fff",
              background:"transparent",
              fontWeight:"600",
              border:"none",
              fontFamily: 'Raleway',
              fontSize:'16px'
            }}>
                Login
            </button>
          </Link>
        )}
      </li>
    </ul>
  );
}
