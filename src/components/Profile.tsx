import { useEffect, useState } from "react"

interface username{
    username: String
}
interface profile{
    name: String,
    img: String,
    login: String,
    bio: string,
    followers: Number,
    following: Number,
}

export function Profile(props: username){

    const [profile, setProfile] = useState<profile>({
        name: "",
        img: "",
        login: "",
        bio: "",
        followers: 0,
        following: 0
    })
    useEffect(()=>{
        fetch(`https://api.github.com/users/${props.username}`)
        .then((e)=>{return e.json()})
        .then((e)=>{
            setProfile({
                name: e.name,
                img: e.avatar_url,
                login: e.login,
                bio: e.bio,
                followers: e.followers,
                following: e.following
            })
        })
    },[])
    document.title = `${profile.login} (${profile.name})`
    
    return (
        <>
            <div className="py-6 px-8 w-80 bg-gray-800 text-white rounded">
                <div className="flex flex-col items-center mb-6">
                    <img
                        className="rounded-full w-40 h-40 border-2 border-blue-400" 
                        src={String(profile.img)} 
                    />
                    <div className="mt-4 flex flex-col items-center">
                        <span>{profile.name}</span>
                        <a href={`https://github.com/${profile.login}`} target="_blank" className={"underline"}>@{profile.login}</a>
                    </div>
                </div>

                <div className="w-full flex justify-between bg-gray-900 rounded py-1 px-3">
                    <span>{profile.followers} Followers</span>
                    <span>{profile.following} Following</span>
                </div>
            </div>
        </>
    )
}