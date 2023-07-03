import React from 'react'

type Device = {
    mac: string;
    name: string;
    ip: string;
}

interface DevicesListProps {
    devices: Device[];
}

const DevicesList: React.FC<DevicesListProps> = ({devices}) => {


    return (
        <div className='devices-list'>
            
        </div>
    )
}