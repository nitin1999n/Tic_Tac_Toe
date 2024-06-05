import React from 'react'
import { PropsWithChildren } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome'
type IconsProps=PropsWithChildren<{
    name: string;
}>
const Icons=({name}:IconsProps)=> {
    switch (name) {
        case 'circle':
            return <Icon name="circle-thin" size={38} color="#000000"/>
            break;
        case 'cross':
            return <Icon name="times" size={38} color="#FFFFFF"/>
            break;
        default:
            return <Icon name="pincle" size={38} color="#FFFFFF"/>

    }
}

export default Icons