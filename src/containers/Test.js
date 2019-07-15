import React, { Component } from 'react'
import { connect } from 'react-redux'

class Test extends Component {
  constructor(props) {
    super(props)
    this.state = {
      msg: 'test'
    }
  }

  render() {
    const { user } = this.props
    return <div>{user.name}</div>
  }
}

function mapStateToProps(state) {
  return { user: state.user }
}

export default connect(mapStateToProps)(Test)
