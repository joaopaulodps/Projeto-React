import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './App.css'

//Função de listar usuários na página inicial
export default function List(){
let [usuarios, setUsuarios] = useState([])
let [showModal, setShowModal] = useState(false)
let [showTransacao, setShowTransacao] = useState(false)
let [usuarioSelecionado, setUsuarioSelecionado] = useState({})
let [pagamento, setPagamento] = useState('')
let [selecionaCartao, setSelecionaCartao] = useState('')
let [transacao, setTransacao] = useState('')

let cards = [
    // valid card
    {
      card_number: '1111111111111111',
      cvv: 789,
      expiry_date: '01/18',
    },
    // invalid card
    {
      card_number: '4111111111111234',
      cvv: 123,
      expiry_date: '01/20',
    }    
  ];


{/*Pegando dados dos usuários na API*/}
    useEffect(() =>{
        axios.get('https://www.mocky.io/v2/5d531c4f2e0000620081ddce', {

        }).then((resp) => {
            setUsuarios(resp.data)
        })
    }, [])

let mostraModal = (u) => {
 setShowModal(true)
 setUsuarioSelecionado(u)
}

const resetForm = () => {
    setPagamento('')
    setSelecionaCartao('')
    setShowTransacao(false)
}

{/*Envio da transação*/}
const enviar= (evt) => {
    evt.preventDefault(evt)
    resetForm()

    const dadosTransacao = {
        "card_number": cards[selecionaCartao].card_number,
        "cvv": cards[selecionaCartao]?.cvv,
        "expiry_date": cards[selecionaCartao]?.expiry_date,
        "destination_user_id": usuarioSelecionado.id,
        "value": pagamento
    }

{axios.post("https://run.mocky.io/v3/533cd5d7-63d3-4488-bf8d-4bb8c751c989", {
   body: dadosTransacao
}).then((resp)=> {
   // console.log(resp.data)
    if (resp.data.status === "Aprovada") {
        setTransacao("O pagamento foi concluído com sucesso!")
    } else {
        setTransacao("O pagamento NÂO foi concluído com sucesso!")
    }
    setShowTransacao(true)
    })
}}

    return (
        <>
        <div>
            {/*Backdrop*/}
            <div className="backdrop" style={{display : (showModal ? 'block' : 'none')}}
            onClick={() => setShowModal(false)}>
            </div>
            <div className="backdrop" style={{display : (showTransacao ? 'block' : 'none')}} 
            onClick={() => setShowTransacao(false)}>
            </div>

            {/*Modal de pagamento*/}
                <div className="modalPagamento" style={{display : (showModal ? 'block' : 'none')}}>
                    <div className="titulo">
                        <div className="cabecalho">
                            Pagamento para <span style={{color:'yellow'}}>{usuarioSelecionado.name}</span>
                        </div>
                    </div>
                    <form className="selectUsuario" onSubmit={enviar}>

                        <input className="valorTransf" type={"number"} placeholder={"R$ 0,00"}
                        value={pagamento} onChange={ e => setPagamento(e.target.value)}/>

                        <select className="selecionaCartao" required value={selecionaCartao}
                        onChange= {e => setSelecionaCartao(e.target.value)}>
                                    <option>Selecione um cartão</option>
                                    {cards.map((card, i) => {
                                        return (
                                        <option key={'opcaoCartao' + i}
                                        value={i}>Cartão com final {card.card_number.substr(-4)}
                                        </option>)
                                    })}
                                </select>
                                
                        <button className="botaoEnviar" onClick={()=> setShowModal(false)}>Pagar</button>
                    </form>
                </div>

    {/*Modal de Resultado*/}
            <div className="modalResult" style={{display : (showTransacao ? 'block' : 'none')}}>
                <div className="titulo">
                        <span className="cabecalho">Recibo de pagamento</span>
                </div>
                <div>
                    <span className="resultTransacao">{transacao}</span>
                </div>
        </div>

{/*Lista de usuários*/}
            <ul style={{margin:'0', padding:'0'}}>
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
                        <button data-index={index} onClick={()=> mostraModal(u)}>Pagar</button>
                </li>
                )
            })}
            </ul>
        </div>
        </>
    )
}

