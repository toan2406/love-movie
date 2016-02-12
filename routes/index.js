import express from 'express'
const router = express.Router()

import React from 'react'
import ReactDOM from 'react-dom/server'
import { Provider } from 'react-redux'
import { RouterContext, match } from 'react-router'
import configureStore from 'shared/store/configureStore'
import routes from 'shared/routes'
import fetchComponentData from 'shared/lib/fetchComponentData'

router.use((req, res, next) => {
  const store = configureStore()

  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      fetchComponentData(store.dispatch, renderProps.components, renderProps.params)
        .then(() => {
          const InitialView = (
            <Provider store={store}>
              <RouterContext {...renderProps} />
            </Provider>
          )
          const initialState = store.getState()

          res.render('index', {
            title: 'Express',
            html: ReactDOM.renderToString(InitialView),
            state: JSON.stringify(initialState)
          })
        })
    } else {
      res.status(404).send('Not found')
    }
  })
})

export default router
