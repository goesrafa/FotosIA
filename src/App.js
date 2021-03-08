import React, { useState } from 'react'
import './App.css'
import { ReactComponent as Drone } from '../src/images/drone.svg'
import Carregando from '../src/images/Spin-1s-200px.gif'

function App() {
  //JSX - Extensão de Sintaxe JavaScript
  //Hooks - useState(facilitador para getter/setter)
  const [pessoas, setPessoas] = useState([]) //[] inicial. com uma matriz
  const [carregando, setCarregando] = useState(false)
  const [genero, setGenero] = useState('')
  const [corolhos, setCorolhos] = useState('')
  const [etinia, setEtinia] = useState('')

  function ListaPessoas(props) {
    const pessoas = props.pessoas
    const listagemPessoas = pessoas.map((pessoa) =>
      <img key={pessoa.id} src={pessoa.urls[4][512]}
        title="Pessoa gerada via IA" alt="pessoa gerada via IA" />
    )
    return (
      <>{listagemPessoas}</>
    )
  }

  async function obtemFoto() {
    setCarregando(true)
    let chaveAPI = process.env.REACT_APP_APIKEY

    const filtrarGenero = genero.length > 0 ? `&gender=${genero}` : ''
    const filtrarCorolhos = corolhos.length > 0 ? `&eye_color=${corolhos}` : ''
    const filtrarEtinia = etinia.length > 0 ? `&ethnicity=${etinia}` : ''

    let url = `https://api.generated.photos/api/v1/faces?api_key=${chaveAPI}${filtrarGenero}${filtrarCorolhos}${filtrarEtinia}&order_by=random`
    console.log(url)
    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setPessoas(data.faces)
      })
      .catch(function (error) {
        console.error('Houve um erro na requisição' + error.message)
      })
    setCarregando(false)
  }

  return (
    <div className='app'>
      <h1>Gerador de fotos com IA</h1>
      <Drone />
      {carregando &&
        <img src={Carregando} title="Aguarde..." alt="Aguarde" width="50" />
      }
      <div className='linha'>
        <ListaPessoas pessoas={pessoas} />
      </div>
      <div className='linha'>

        <label>Cor dos olhos: </label>
        <select onChange={event => setCorolhos(event.target.value)}>
          <option value="">Todas</option>
          <option value="brown">Castanho</option>
          <option value="blue">Azul</option>
          <option value="gray">Cinza</option>
          <option value="green">Verde</option>
        </select>

        <label>Gênero: </label>
        <select onChange={event => setGenero(event.target.value)}>
          <option value="">Todos</option>
          <option value="male">Masculino</option>
          <option value="female">Feminino</option>
        </select>

        <label>Etnia: </label>
        <select onChange={event => setEtinia(event.target.value)}>
          <option value="">Todos</option>
          <option value="white">Branca</option>
          <option value="latino">Latina</option>
          <option value="asian">Asiática</option>
          <option value="black">Negra</option>
        </select>
      </div>


      <div className='linha'>
        <button type='button' onClick={obtemFoto}>
          Obter Imagens
      </button>

        {pessoas.length > 0 &&
          <button type='button' onClick={() => setPessoas([])}>
            Limpar Imagens
        </button>
        }
      </div>
    </div>
  )
}

export default App;
