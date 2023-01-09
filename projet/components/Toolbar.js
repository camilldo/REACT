import React from 'react';
import { Icon, Button } from 'antd';
// import '../styles/Toolbar.css';

const Toolbar = () => {
    return (
        <div className="toolbar">
            <div className="toolbar-title">My Toolbar</div>
            <div className="toolbar-connexion">
                <Icon type="login" />
                <Button>Connexion</Button>
            </div>
            <div className="toolbar-search">
                <input type="text" placeholder="Search" />
            </div>
        </div>
    );
}
export default Toolbar;
