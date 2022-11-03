import Head from 'next/head'
import { useState } from 'react'
import NextLink from 'next/link'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'
import { addDoc } from 'firebase/firestore'
import ReactInputMask from 'react-input-mask'

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
  const db = getFirestore(app)
  const timestamp = new Date().getTime() // USEI timestamp PARA ORDENAR POR DATA o cadastros depois
  const userColletionRef = collection(db, 'users')

  async function createUsers() {
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
      createUsers() // <--- se preenchido é chamada a função para criar o usuario no banco
    }
  }

  ///AQUI É O HTML que vai ser renderizado, preferi usar head para organizar e importar mais facil o bootstrap que ia agilizar o desenvolvimento

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
          {/* //AQUI ONDE ESTÁ A IMAGEM */}
          <div className="col-5 home-esquerda">
            <img src="./imgs/logo.svg" alt="logo" />
          </div>

          {/* //AQUI É O FORMULARIO QUE VAI SER RENDERIZADO */}

          <div className="col-5 home-direita">
            <h2>TESTE</h2>
            <h3>EGS SISTEMAS</h3>
            <p>NOME:</p>
            <ReactInputMask
              type="text"
              placeholder="Escreva seu nome"
              id="nome"
              onChange={e => setNome(e.target.value)}
            ></ReactInputMask>
            <p>SOBRENOME</p>
            <ReactInputMask
              type="text"
              placeholder="Escreva seu sobrenome"
              id="sobrenome"
              onChange={e => setSobrenome(e.target.value)}
            ></ReactInputMask>
            <p>IDADE</p>
            <ReactInputMask
              typeof="text"
              placeholder="00/00/0000"
              mask="99/99/9999"
              id="idade"
              onChange={e => setIdade(e.target.value)}
            ></ReactInputMask>

            <p>E-MAIL</p>
            <ReactInputMask
              type="text"
              placeholder="Escreva seu e-mail"
              id="email"
              onChange={e => setEmail(e.target.value)}
            ></ReactInputMask>
            <p>CPF</p>
            <ReactInputMask
              type="text"
              placeholder="000.000.000-00"
              id="cpf"
              mask="999.999.999-99"
              onChange={e => setCpf(e.target.value)}
            ></ReactInputMask>
            <div className="termos col-12">
              <ReactInputMask
                type="checkbox"
                className="checkbox"
                id="checkbox"
                onChange={e => setCheckbox(e.target.value)}
              ></ReactInputMask>
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
