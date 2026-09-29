import { useState } from 'react'
import Navbar from './components/Navbar.jsx'
import CategoryBar from './components/CategoryBar.jsx'
import Gallery from './components/Gallery.jsx'
import AddPhotoModal from './components/AddPhotoModal.jsx'
import FiltersOffcanvas from './components/FiltersOffcanvas.jsx'
import Footer from './components/Footer.jsx'
import photos from './data/photos.json'
import './App.css'

const PUSTY_FORMULARZ = {
  title: '',
  category: '',
  image: '',
  alt: '',
  description: ''
}

function App() {
  const [zdjecia, setZdjecia] = useState(photos)
  const [aktywnaKategoria, setAktywnaKategoria] = useState('wszystkie')
  const [formularz, setFormularz] = useState(PUSTY_FORMULARZ)

  function usunZdjecie(id){
    setZdjecia(zdjecia.filter(z => z.id !== id))
  }

  function dodajZdjecie(nowe){
    const noweId = zdjecia.length > 0 ? Math.max(...zdjecia.map(z => z.id)) + 1 : 1
    setZdjecia([...zdjecia, { ...nowe, id: noweId, favorite: false }])
  }

  function przelaczUlubione(id){
    setZdjecia(
      zdjecia.map(z => (z.id === id ? { ...z, favorite: !z.favorite } : z))
    )
  }

  const zmienPole = (nazwaPola) => (event) => {
    setFormularz({
      ...formularz,
      [nazwaPola]: event.target.value
    })
  }

  const widoczne = aktywnaKategoria === 'wszystkie' ? zdjecia : zdjecia.filter(z => z.category === aktywnaKategoria)
  
  return (
    <>
      <Navbar />
      <header className='container py-4 py-lg-5'>
        <div className="row align-items-center g-3">
          <div className="col-12 col-lg-8">
            <h1 className="mb-2">Galeria zdjęć</h1>
            <p className="lead text-body-secondary mb-0">
              Zdjęcia wyprawy w góry, nad morze i po mieście. Wybierz kategorię, żeby zawęzić widok, albo powiększ zdjęcie, które ci się spodoba.
            </p>
          </div>
          <div className="col-12 col-lg-4">
            <div className="d-flex flex-wrap gap-2 justify-content-lg-end">
              <button type="button" className="btn btn-outline-secondary" data-bs-toggle="offcanvas" data-bs-target="#panelFiltrow">Filtry</button>
              <button type="button" className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#dodajzdjecie">Dodaj zdjęcie</button>
            </div>
          </div>
        </div>
      </header>

      <main className="container">
        <CategoryBar aktywna={aktywnaKategoria} onWybierz={setAktywnaKategoria}/>

        <p className="text-body-secondary">Wyświetlono {widoczne.length} z {zdjecia.length} zdjęć</p>
        
        {widoczne.length === 0 && (
          <div className="alert alert-warning"> Nie znaleziono zdjęć w tej kategorii</div>
        )}

        <Gallery zdjecia={widoczne} onUsun={usunZdjecie} onPrzelacz={przelaczUlubione}/>
      </main>

      <Footer/>

      <AddPhotoModal 
        formularz={formularz} 
        setFormularz={setFormularz} 
        zmienPole={zmienPole} 
        onDodaj={dodajZdjecie} 
      />

      <FiltersOffcanvas aktywna={aktywnaKategoria} onWybierz={setAktywnaKategoria}/>
    </>
  )
}

export default App
