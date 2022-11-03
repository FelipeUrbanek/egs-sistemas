import Head from 'next/head'
import NextLink from 'next/link'
import { useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'
import { getDocs } from 'firebase/firestore'

//ACHEI MAIS SIMPLES FAZER TUDO JA NA FUNÇÃO , DO OUTRO MODO TAVA COM PROBLEMAS DE LOOPS INFINITOS EM ALGUNS CASOS

export default function Cadastros() {
  const firebaseConfig = {
    apiKey: 'AIzaSyDp-flw9XmSWydAy7iwcuwJwHZahd9Cbbs',
    authDomain: 'loginegs.firebaseapp.com',
    projectId: 'loginegs',
    storageBucket: 'loginegs.appspot.com',
    messagingSenderId: '755106316788',
    appId: '1:755106316788:web:ba2b2539d389e893e1b9a1',
    measurementId: 'G-NGVWVEN9Q7'
  }

  // Initialize Firebase
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)

  const userColletionRef = collection(db, 'users')
  const [users, setUsers] = useState([])
  const [ultimonome, setUltimonome] = useState('')
  const [ultimosobrenome, setUltimosobrenome] = useState('')

  //USEEFFECT PARA USUARIOS
  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userColletionRef)
      const users = data.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }))

      //COMO O FIREBASE NÃO ORDENA POR DATA, EU ORDENO AQUI
      const userstimestamp = users.sort((a, b) => b.timestamp - a.timestamp)

      setUsers(userstimestamp)

      setUltimonome(userstimestamp[0].nome) // <--- PEGAR O ULTIMO NOME CADASTRADO
      setUltimosobrenome(userstimestamp[0].sobrenome) // <--- PEGAR O ULTIMO SOBRENOME CADASTRADO (ACHEI QUE SERIA MAIS FACIL QUE COLOCAR NO "HTML")
    }
    getUsers()
  }, [])

  return (
    <div className="cadastros">
      <Head>
        <title>Cadastros</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
          crossOrigin="anonymous"
        />
        <link rel="stylesheet" href="./styles/cadastros.css" />
      </Head>

      {/* criar header e resto da pagina aqui */}

      <div className="navbar-bg">
        <nav class="navbar navbar-expand-lg ">
          <NextLink href="/" className="navbar-brand" id="btn">
            <img src="./imgs/logo.svg" alt="logo" className="img-fluid" />
          </NextLink>

          <div className="nav-names">
            <p>{ultimonome}</p>
            <p>{ultimosobrenome}</p>
          </div>
        </nav>
      </div>
      <div className="container ">
        <section>
          <div className="row cadastros-line">
            <div className="col-2">
              <h5>NOME:</h5>
            </div>
            <div className="col-3">
              <h5>SOBRENOME:</h5>
            </div>
            <div className="col-1">
              <h5>DATA:</h5>
            </div>
            <div className="col-3">
              <h5>E-MAIL:</h5>
            </div>
            <div className="col-3">
              <h5>CPF:</h5>
            </div>
          </div>
        </section>

        <section>
          {' '}
          {/* Criada uma section para receber os dados do firebase */}
          {users.map(user => (
            <div className="row cadastrados">
              <div className="col-2">
                <p>{user.nome}</p>
              </div>
              <div className="col-3">
                <p>{user.sobrenome}</p>
              </div>
              <div className="col-1">
                <p>{user.idade}</p>
              </div>
              <div className="col-3">
                <p>{user.email}</p>
              </div>
              <div className="col-3">
                <p>{user.cpf}</p>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  )
}
