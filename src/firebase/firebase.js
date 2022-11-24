import { initializeApp } from "firebase/app";
import { collection, getDocs, query, where, getDoc, deleteDoc, addDoc, doc, initializeFirestore, updateDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged, updateProfile, updateEmail, signOut } from 'firebase/auth'
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import "@env"

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig)
const db = initializeFirestore(app, { experimentalForceLongPolling: true })
const auth = getAuth(app)
const storage = getStorage(app)

const userInfo = (setUser) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user)
    }
  });
}

const getDbData = async (collectionName, set) => {
  const citiesCol = collection(db, collectionName)
  const citySnapshot = await getDocs(citiesCol)
  const cityList = citySnapshot.docs.map(doc => doc.data())
  set(cityList)
}

const deleteDocument = async (id, coll) => await deleteDoc(doc(db, coll, id))

const uploadPhoto = async (photo, dispatch, refreshPhoto) => {

  const storageRef = ref(storage, `fotos_perfil/${auth.currentUser.displayName}`);
  const img = await fetch(photo)
  const bytes = await img.blob()
  uploadBytes(storageRef, bytes).then(() => {
    getDownloadURL(ref(storage, `fotos_perfil/${auth.currentUser.displayName}`)).then(url => {
      updatePhoto(url)
      dispatch(refreshPhoto(url))
    })
  })
}

async function photoURL(nome) {
  const url = await getDownloadURL(ref(storage, `${nome}`));
  return url;
}

const updateEstoque = async (id, task) => {

  const docRef = doc(db, 'Estoque', id)

  await updateDoc(docRef, { Produto: task.Produto, Unidades: task.Unidades, Custo: task.Custo, Valor: task.Valor, Codigo: task.Codigo })
}

const logout = () => {
  signOut(auth)
}

const resetPass = (email) => {
  sendPasswordResetEmail(auth, email)
}

const findNota = async (id) => {
  const notaRef = doc(db, 'Registros', id)
  const docSnap = await getDoc(notaRef)
  if (docSnap.exists()) { }

}

const tryLogin = (email, pass, setErr, navigate, setHelper, setModalVisibleHandleLogin, setHideMenu, setPass, dispatch, setUser, setLoading, setIsLogin) => {

  signInWithEmailAndPassword(auth, email, pass).then((userCredential) => {
    setLoading(true)
    setHideMenu(false)
    dispatch(setUser({
      displayName: userCredential.user.displayName,
      email: userCredential.user.email,
      photoURL: userCredential.user.photoURL,
      uid: userCredential.user.uid
    }))
    setPass('')
    setErr(false)
    setIsLogin(true)
    navigate('title13')
  }).catch(() => {
    setErr(true)
    setHelper('Credenciais inválidas.')
    setModalVisibleHandleLogin(true)
  })
}

const updatePass = () => {
  sendPasswordResetEmail(auth, auth.currentUser.email)
}

const findProduct = async (barcode, dispatch, coll, setNotFoundEstoque, setProductDoc) => {
  const estoqueRef = collection(db, 'Estoque')
  const q = query(estoqueRef, where('Codigo', '==', barcode))
  const querySnapshot = await getDocs(q)
  if (querySnapshot.docs.length == 1) {
    if (coll) {
      const collectionRef = collection(db, coll)
      querySnapshot.forEach((doc) => addDoc(collectionRef, { Produto: doc.data().Produto, Valor: doc.data().Valor, Img: doc.data().Img }))
    } else querySnapshot.forEach(doc => dispatch(setProductDoc(doc.data())))
  } else dispatch(setNotFoundEstoque(true))
}

const registerProduct = async (barcode, dispatch, navigate, setProductDoc, setBarcode, setOpenModalEstoque, setHideMenu) => {
  const estoqueRef = collection(db, 'Estoque')
  const q = query(estoqueRef, where('Codigo', '==', barcode))
  const querySnapshot = await getDocs(q)

  if (querySnapshot.docs.length == 1) {
    querySnapshot.docs.forEach(doc => dispatch(setProductDoc(doc.data())))
    setHideMenu(false)
    navigate('title10')
  } else {
    dispatch(setBarcode(barcode))
    navigate('title14')
    setOpenModalEstoque(true)
    setHideMenu(false)
  }
}

const barcodeSearch = async (barcode, dispatch, setProductDoc, setBarcode) => {
  const barcodeRef = collection(db, 'Barcodes')
  const q = query(barcodeRef, where('Codigo', '==', barcode))
  const querySnapshot = await getDocs(q)
  if (querySnapshot.docs.length == 1) querySnapshot.forEach(doc => dispatch(setProductDoc(doc.data())))
  dispatch(setBarcode(barcode))
}

const addDocument = async (coll, task, deleteDoc) => {
  const collRef = collection(db, coll)
  await addDoc(collRef, task).then(doc => deleteDoc ? deleteDocument(doc.id, coll) : null)
}

const findDocument = async (dispatch, setClientId, id, coll, setNotFound) => {
  const docRef = doc(db, coll, id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) dispatch(setClientId({ ...docSnap.data(), idFicha: docSnap.id }))
  else dispatch(setNotFound(true))

}

const confirmFicha = async (documento, id) => {
  const dbRef = collection(db, 'Registros')
  const task = { ...documento, tipo: 'Ficha' }
  await addDoc(dbRef, task).then(() => deleteDoc(doc(db, 'Ficha', id)))
}

const updateName = (nome) => {
  updateProfile(auth.currentUser, {
    displayName: nome
  })
}

const updatePhoto = (foto, dispatch, refreshPhoto) => {
  updateProfile(auth.currentUser, {
    photoURL: foto ? foto : ''
  })
  if (dispatch) dispatch(refreshPhoto(''))
}

const updateUserEmail = (email) => {
  updateEmail(auth.currentUser, email)
}

export { getDbData, db, registerProduct, photoURL, updateEstoque, addDocument, findNota, deleteDocument, userInfo, findDocument, tryLogin, resetPass, updateName, updateUserEmail, updatePass, logout, updatePhoto, barcodeSearch, uploadPhoto, confirmFicha, findProduct }