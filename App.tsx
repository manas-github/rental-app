import React from 'react';
import { observer } from "mobx-react"
import AppContainer from './routing'

@observer
export default class App extends React.Component {
  render() {
    return (
      <AppContainer/>
    );
  }
}


