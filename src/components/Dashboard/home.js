import { useRef } from 'react'
import { auth, storage, db } from '../../firebase'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { addDoc, collection } from 'firebase/firestore/lite'
import { Link } from "react-router-dom";

const Home = () => {
  const form = useRef()

  const submitPortfolio = (e) => {
    e.preventDefault()
    const name = form.current[0]?.value
    const description = form.current[1]?.value
    const url = form.current[2]?.value
    const image = form.current[3]?.files[0]

    const storageRef = ref(storage, `portfolio/${image.name}`)

    uploadBytes(storageRef, image).then(
      (snapshot) => {
        getDownloadURL(snapshot.ref).then(
          (downloadUrl) => {
            savePortfolio({
              name,
              description,
              url,
              image: downloadUrl,
            })
          },
          () => {
            savePortfolio({
              name,
              description,
              url,
              image: null,
            })
          }
        )
      },
      () => {
        savePortfolio({
          name,
          description,
          url,
          image: null,
        })
      }
    )
  }

  const savePortfolio = async (portfolio) => {
    try {
      await addDoc(collection(db, 'portfolio'), portfolio)
      window.location.reload(false)
    } catch (error) {
      alert('Failed to add portfolio')
    }
  }

  return (
    <div className="dashboard form">
      <form ref={form} onSubmit={submitPortfolio}>
        <p>
          <input type="text" placeholder="Name" />
        </p>
        <p>
          <textarea placeholder="Description" />
        </p>
        <p>
          <input type="text" placeholder="Url" />
        </p>
        <p>
          <input type="file" placeholder="Image" />
        </p>
        <button className="flat-button" type="submit">
          Submit
        </button>
        <button className="flat-button" onClick={() => auth.signOut()}>
          Sign out
        </button>
        <Link to="/portfolio">
          <button className="flat-button">Back</button>
        </Link>
      </form>
    </div>
  )
}

export default Home
