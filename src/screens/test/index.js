import React from 'react';
import { PulseLoader } from 'react-spinners';

export default class Teste extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }
  render() {
    return (

        <PulseLoader
          color={'var(--pink)'}
          loading={this.state.loading}
        />

    )
  }
}
