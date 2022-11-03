import Head from 'next/head'
import { useState } from 'react'
import NextLink from 'next/link'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'
import { addDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDp-flw9XmSWydAy7iwcuwJwHZahd9Cbbs',
  authDomain: 'loginegs.firebaseapp.com',
  projectId: 'loginegs',
  storageBucket: 'loginegs.appspot.com',
  messagingSenderId: '755106316788',
  appId: '1:755106316788:web:ba2b2539d389e893e1b9a1',
  measurementId: 'G-NGVWVEN9Q7'
}

const app = initializeApp(firebaseConfig) // <--- inicializar o firebase

function App() {
  const [nome, setNome] = useState('')
  const [sobrenome, setSobrenome] = useState('')
  const [idade, setIdade] = useState('')
  const [email, setEmail] = useState('')
  const [cpf, setCpf] = useState('')
  const [checkbox, setCheckbox] = useState(false)
  const [users, setUsers] = useState([])
  const db = getFirestore(app)
  const timestamp = new Date().getTime() // USEI timestamp PARA ORDENAR POR DATA o cadastros depois
  const userColletionRef = collection(db, 'users')

  async function criarUsuario() {
    console.log(nome, sobrenome, idade, email, cpf, checkbox)
    const docRef = await addDoc(userColletionRef, {
      nome,
      sobrenome,
      idade,
      email,
      cpf,
      timestamp
    })
    console.log('Document written with ID: ', docRef.id) // controle pra saber em qual banco foi salvo
  }

  const handleSubmit = e => {
    if (
      nome === '' ||
      sobrenome === '' ||
      idade === '' ||
      email === '' ||
      cpf === '' ||
      checkbox === false
    ) {
      e.preventDefault() // <--- previnir o submit
      alert('Preencha todos os campos') // <--- alerta se não preencher
    } else {
      criarUsuario()
      //save dados in session storage
    }
  }

  return (
    <div className="home">
      <Head>
        <title>Login </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" href="./styles/home.css" />
      </Head>
      <div className="container ">
        <div className="row home">
          <div className="col-5 home-esquerda">
            <img src="./imgs/logo.svg" alt="logo" />
          </div>
          <div className="col-5 home-direita">
            <h2>TESTE</h2>
            <h3>EGS SISTEMAS</h3>
            <p>NOME:</p>
            <input
              type="text"
              placeholder="Escreva seu nome"
              id="nome"
              onChange={e => setNome(e.target.value)}
            />
            <p>SOBRENOME</p>
            <input
              type="text"
              placeholder="Escreva seu sobrenome"
              id="sobrenome"
              onChange={e => setSobrenome(e.target.value)}
            />
            <p>IDADE</p>
            <input
              type="text"
              placeholder="00/00/00"
              id="idade"
              onChange={e => setIdade(e.target.value)}
            />
            <p>E-MAIL</p>
            <input
              type="text"
              placeholder="Escreva seu e-mail"
              id="email"
              onChange={e => setEmail(e.target.value)}
            />
            <p>CPF</p>
            <input
              type="text"
              placeholder="000.000.000-00"
              id="cpf"
              onChange={e => setCpf(e.target.value)}
            />
            <div className="termos col-12">
              <input
                type="checkbox"
                className="checkbox"
                id="checkbox"
                onChange={e => setCheckbox(e.target.value)}
              />
              <p>ACEITO OS TERMOS DE USO</p>
            </div>

            <NextLink
              href="/cadastros"
              onClick={handleSubmit}
              className="linkbtn"
            >
              <button type="button" className="btn btn-primary" id="btn">
                ENVIAR
              </button>
            </NextLink>
            <p className="member">I'm already a member</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
