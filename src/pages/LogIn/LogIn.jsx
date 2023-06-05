import React from 'react'
import styles from './LogIn.module.scss'

export const LogIn = () => {
  return (
    <div className={styles['log-in']}>
        <div className={styles.content}>
            <form>
                <h2>Log In</h2>
            </form>
        </div>
    </div>
  )
}
