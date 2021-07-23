import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './App.css'

//Função de listar usuários na página inicial
export default function List(){
    let [usuarios, setUsuarios] = useState([])

//Pegando dados dos usuários na API
    useEffect(() =>{
        axios.get('https://www.mocky.io/v2/5d531c4f2e0000620081ddce', {

        }).then((resp) => {
            setUsuarios(resp.data)
        })
    }, [])

//Inserção dos usuários na lista da página inicial
    return (
        <div>
            {usuarios.map((u, index) => {
                return (
                    <li key={'user-'+ index}>
                        <div className={'users'}>
                                <img src={u.img}></img>
                            <div className={'dados'}>
                                <div id={'uname'}>
                                    {u.name}
                                </div>
                                <div className={'dadosUsuario'}>
                                    ID: {u.id} - Username: {u.username}
                                </div>
                            </div>
                        </div>    
                        <button>Pagar</button>

                </li>
                )
            })}
        </div>
    )
}

