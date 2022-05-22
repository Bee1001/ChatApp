import React from 'react';

import { MdErrorOutline, MdCheckCircle } from 'react-icons/md';

export default function Notification(props) {
    const {notify, setNotify} = props;

    return (
        <div
            className="alert"
            style={{
                display: notify.isOpen ? 'block' : 'none',
                position: 'absolute',
                width: '330px',
                height: '50px',
                lineHeight: '30px' ,
                padding: '10px',
                background: notify.type === 'success' ? '#2e7d32' : '#D32F2F',
                boxShadow: 'rgb(0 0 0 / 20%) 0px 3px 5px -1px, rgb(0 0 0 / 14%) 0px 6px 10px 0px, rgb(0 0 0 / 12%) 0px 1px 18px 0px',
                color: 'white',
                borderRadius: '2px',
                bottom: '25px',
                left: '37px',
                zIndex: 99999,
                fontFamily: "'Poppins', sans-serif",
                fontWeight: '500'
            }}
        >
            <div
                className="alert-content"
                style={{ display: 'flex', alignItems: 'center' }}
            >
                <span style={{ marginRight: '10px', lineHeight: 0, fontSize: '1.1em' }}>{ notify.type === 'fail' ? <MdErrorOutline/> : <MdCheckCircle/>}</span>
                <span>{notify.message}</span>
            </div>
        </div>
    )
}
