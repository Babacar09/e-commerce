"use client"

import { useMemo } from "react";

type AvatarProps={
    name:string;
    size?:number;
}

export default function Avatar({name, size=50}:AvatarProps){
    const getInitials = (name:string)=>{
        return name
        .split(" ")
        .map((word)=>word[0] )
        .join("")
        .toUpperCase()
    }

    const backgroundColor= useMemo(()=>{
        const colors = ["#F87171", "#60A5FA", "#34D399", "#FBBF24", "#A78BFA", "#F472B6"];
        const index = name.length %colors.length;
        return colors [index]
    },[name])
    return(
        <div className="flex items-center justify-center rounded-full text-white font-bold"
        style={{
            backgroundColor:backgroundColor,
            width:size,
            height:size,
            fontSize:size/2.5
        }}
        >
            {getInitials(name)}
        </div>

    )
}