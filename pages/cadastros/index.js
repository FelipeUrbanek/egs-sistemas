import Head from 'next/head'
import NextLink from 'next/link'
import { useEffect, useState } from 'react'
import { initializeApp } from 'firebase/app'
import { getFirestore, collection } from 'firebase/firestore'
import { getDocs, addDoc } from 'firebase/firestore'

/* const firebaseConfig = {
  apiKey: 'AIzaSyB7WJC0O2wXAzssaHfJj9GEUZH1lp8mw3Q',
  authDomain: 'egs-sistemas.firebaseapp.com',
  projectId: 'egs-sistemas',
  storageBucket: 'egs-sistemas.appspot.com',
  messagingSenderId: '1056066729202',
  appId: '1:1056066729202:web:05647346d66f2309ea8c6b',
  measurementId: 'G-9D8R9236EC'
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const usersCollection = collection(db, 'user')

var [usuarios, setUsuario] = useState({})

async function getUsers() {
  const data = await getDocs(usersCollection)
  const users = data.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }))
  const usersObj = Object.assign({}, users)
  setUsuario(usersObj)
}
getUsers()
console.log(usuarios) */

function App() {
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
      <div className="navbar-bg">
        <nav class="navbar navbar-expand-lg ">
          <NextLink href="/" className="navbar-brand" id="btn">
            <img src="./imgs/logo.svg" alt="logo" className="img-fluid" />
          </NextLink>

          <div className="nav-names">
            <p>Felipe</p>
            <p>Urbanek</p>
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
              <h5>SOBRENOME</h5>
            </div>
            <div className="col-1">
              <h5>DATA</h5>
            </div>
            <div className="col-3">
              <h5>E-MAIL</h5>
            </div>
            <div className="col-3">
              <h5>CPF</h5>
            </div>
          </div>
        </section>

        <section>
          <div className="row cadastrados">
            <div className="col-2">
              <p>Felipe</p>
            </div>
            <div className="col-3">
              <p>Urbanek</p>
            </div>
            <div className="col-1">
              <p>1112122</p>
            </div>
            <div className="col-3">
              <p>carkiss</p>
            </div>
            <div className="col-3">
              <p>0333232323</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default App
