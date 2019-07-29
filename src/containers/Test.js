import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Button } from 'antd'

class Test extends Component {
  constructor(props) {
    super(props)
    this.state = {
      msg: 'test'
    }
  }

  fetchData() {
    this.props.dispatch({
      type: 'CHANG_NAME',
      name: 'Vuex'
    })
  }

  render() {
    const { user } = this.props
    return (
      <div>
        <Button onClick={this.fetchData.bind(this)}>{user.name}</Button>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { user: state.user }
}

export default connect(mapStateToProps)(Test)
