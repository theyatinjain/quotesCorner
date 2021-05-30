import React, { Fragment } from 'react';
import styles from './Layout.module.css';
import MainNavigation from './MainNavigation';

function Layout(props) {
    return (
        <Fragment>
            <MainNavigation />
            <main className={styles.main}>
                {props.children}
            </main>
        </Fragment>
    )
}

export default Layout;