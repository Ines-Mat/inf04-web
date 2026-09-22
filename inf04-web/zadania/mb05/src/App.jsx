import { useState } from 'react'
import './App.css'

function App() {

  return (
    <>
    <Navbar />
    <header className='container py-4 py-lg-5'>
      <div className="row align-items-center g-3">
        <div className="col-12 col-lg-8">
          <h1 className="mb-2">Galeria zdjęć</h1>
          <p className="lead text-body-secondary mb-0">
            Zdjęcia wyprawy w góry, nad morze i po mieście. Wybiezr kategorię, żeby zawęzić widok, albo powiększ zdjęcie, które ci się spodoba.
          </p>
        </div>
        <div className="col-12 col-lg-4">
          <div className="d-flex flex-wrap gap-2 justify-content-lg-end">
            <button type="button" className="btn btn-outline-secondary" data-bs-toggle="offcanvas" data-bs-target="#panelFiltrow">Filtry</button>
            <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#dodajZdjecie">Dodaj zdjęcie</button>
          
          </div>
        </div>

      </div>
    </header>
      <main className="container">
        <CategoryBar/>
        <Gallery/>
      </main>
      <Footer/>

      <AddPhotoModal/>
    </>
  )
}

export default App
