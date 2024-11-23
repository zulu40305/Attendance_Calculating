import React, { useRef, useState } from "react";
import { FiMenu } from 'react-icons/fi';
import { IoClose } from "react-icons/io5";
import styles from "./Sidebar.module.css";

export default function Sidebar(props) {
  const [isOpen, setOpen] = useState(false);
  const [xPosition, setX] = useState(-props.width);
  const side = useRef();
  
  const toggleMenu = () => {
    if (xPosition < 0) {
      setX(0);
      setOpen(true);
    } else {
      setX(-props.width);
      setOpen(false);
    }
  };

  return (
    <>
      <button onClick={() => toggleMenu()} className={styles.button}>
        {isOpen ? <IoClose className={styles.close}/> : <FiMenu className={styles.open}/>}
      </button>
      <div ref={side}  className={isOpen ? styles.sidebar_shadow : styles.sidebar} style={{width: `${props.width}rem`, height: '100%',  transform: `translatex(${xPosition}rem)`}}>
        <h3 className={styles.sidebar_title}>데이터 필터 제어판</h3>
        <div className={styles.content_container}>
          <div className={styles.content}>{props.children}</div>
        </div>
      </div>
    </>
  );
};