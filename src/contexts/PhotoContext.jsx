import React, { createContext, useContext, useEffect, useState } from 'react'

const PhotoContext = createContext()

const usePhotoContext = () => {
  return useContext(PhotoContext)
}

const PhotoContextProvider = ({ children }) => {

  const [chosenPhotos, setChosenPhotos] = useState([])

  const [notChosenPhotos, setNotChosenPhotos] = useState([])

  const values = {
    chosenPhotos,
    setChosenPhotos,
    notChosenPhotos,
    setNotChosenPhotos,
  }

  return (
    <PhotoContext.Provider value={values}>
      { children }
    </PhotoContext.Provider>
  )
}

export { usePhotoContext, PhotoContextProvider as default }