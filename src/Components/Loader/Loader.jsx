import React from 'react'
import {GridLoader } from 'react-spinners'



import styles from './loder.module.css'
function Loader() {
  return (
    <div className={styles.loader_container}>
       <GridLoader
  color="#8d8b8b"
  width={-1}
/>
    </div>
  )
}

export default Loader
