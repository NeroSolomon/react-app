import React, { Component } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import routes from './config/routes.js'
import configStore from './store/store-config.js'
import {
  addLocaleData,
  IntlProvider,
  FormattedMessage
} from 'react-intl' /* react-intl imports */
import en from 'react-intl/locale-data/en'
import zh from 'react-intl/locale-data/zh'
import en_US from './locales/en.js'
import zh_CN from './locales/cn.js'
import { Button } from 'antd'
addLocaleData([...en, ...zh])

const store = configStore()
console.log(store.getState())

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      lang: 'en'
    }
  }

  render() {
    let messages = {}
    messages['en'] = en_US
    messages['zh'] = zh_CN
    return (
      <Provider store={store}>
        <IntlProvider
          locale={this.state.lang}
          messages={messages[this.state.lang]}
        >
          <div>
            <FormattedMessage id="hello" />
            <Button onClick={() => this.setState({ lang: 'zh' })}>
              change lang
            </Button>
            <Router>{routes}</Router>
          </div>
        </IntlProvider>
      </Provider>
    )
  }
}

export default App
