import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, browserHistory } from 'react-router'
import { IntlProvider } from 'lib/react-intl-redux'
import configureStore from 'store/configureStore'
import immutifyState from 'lib/immutifyState'
import routes from 'routes'
import 'app.css'

// import all files in images folder
require.context('../images', false, /^.*$/)

// the router reducer (name "routing") is not an immutable obj
const initialState = immutifyState({
  obj: window.__INITIAL_STATE__,
  exclude: ['routing', 'intl']
})
const store = configureStore(initialState)

ReactDOM.render(
  <Provider store={store}>
    <IntlProvider>
      <Router history={browserHistory}>
        {routes}
      </Router>
    </IntlProvider>
  </Provider>,
  document.getElementById('react-root')
)
