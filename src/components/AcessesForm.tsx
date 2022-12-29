import { useEffect, useState } from "react"

/*
    abilitar botão quando o campo for mair que 3 caracteres ok

    mostrar o avatar do usuario e o nome dele ok
    caso não encontrar o usuario na api, mostrar uma imagem e texto alternativo

    renderizar um novo componete com as seguites informações 
        - imagem
        - nome
        - nick
        - bio
        - fllows
*/

interface test {
    status: Function,
    username: Function
}
export default function Form(props:test){

    const [username, setUsername] = useState('')
    const [profile, setProfile] = useState<{name:String, img:String}>({name:"", img:""})
    const [error, setError] = useState(false)
    const [error403, setError403] = useState(false)

    useEffect(()=>{
        fetch(`https://api.github.com/users/${username}`)
        .then((e)=>{
            setError(false)
            if(!e.ok){
                setError(true)
            }
            if(e.status === 403){
                setError403(true)
            }
            
            return e.json()
        })
        .then((e)=>{
            setProfile({
                img: e.avatar_url,
                name: e.name 
            })
        })
    },[username])
        
    return(
        <>
            <div className="min-w-64 max-w-md p-4 bg-gray-800 flex gap-4 text-white items-center rounded mx-auto">
                <div className="flex-1">
                    <input 
                        type="text" 
                        className="bg-gray-900 px-6 py-2 w-full focus:outline-none focus:border-blue-500 border border-transparent"
                        value={username}
                        onChange={(e)=>{setUsername(e.target.value)}}
                        placeholder="Nick"
                    />
                    <button 
                        className="w-full p-2 bg-blue-400 mt-3 disabled:bg-slate-300/30" 
                        disabled={username.length < 3 || error}
                        onClick={()=>{props.status(true), props.username(username)}}
                    >
                        Confirmar
                    </button>
                </div>
                <div className="flex items-center flex-col bg-gray-900 p-2 rounded max-w-[150px]">
                    <img src={error ? "/public/vite.svg" : String(profile.img)} className="rounded-full w-16 h-16"/>
                    <span className="text-center">{error ? "????" : profile.name}</span>
                </div>
            </div>
            {
                error403 ? (
                    <div className="bg-red-300/70 text-red-600 py-1 px-3 rounded mt-4 flex flex-col items-center">
                        <span className="font-bold">Erro 403</span>
                        <span>Infelizmente não foi possivel acessar a api. Tente novamente mais tarde</span>
                    </div>
                ) : null
            }
            
        </>
    )
}