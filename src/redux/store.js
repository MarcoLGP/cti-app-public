import { configureStore } from '@reduxjs/toolkit'
import infoSlice from './infoSlice'

export default configureStore({
    reducer: {
        clientId: infoSlice
    }
})
