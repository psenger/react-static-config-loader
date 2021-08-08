import React from 'react'
import { act as testAct, create } from 'react-test-renderer'
import { act as domAct } from 'react-dom/test-utils'
import { ConfigPropExtenderHoc, Context, StaticConfigWrapper } from '.'
import { unmountComponentAtNode } from 'react-dom'

describe('StaticConfigWrapper', () => {
  it('is truthy', () => {
    expect(StaticConfigWrapper).toBeTruthy()
  })

  let container = null
  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div')
    document.body.appendChild(container)
  })
  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container)
    container.remove()
    container = null
  })

  // https://reactjs.org/docs/testing-recipes.html#act
  it('Should show the default loading msg (null)', async () => {
    expect.assertions(1)
    const fn = async () => {
      await new Promise(function (resolve) {
        setTimeout(resolve, 2000)
      })
      return new Promise((resolve) => {
        return resolve({
          msg: 'go',
          version: 1234,
          selection: ['no', 'yes'],
          buttonName: 'go go button'
        })
      })
    }
    class ExampleClass extends React.Component {
      static contextType = Context
      render() {
        const config = this.context
        return <code>{JSON.stringify(config, null, 4)}</code>
      }
    }
    let root
    await testAct(async () => {
      domAct(() => {
        root = create(
          <StaticConfigWrapper loader={fn}>
            <ExampleClass />
          </StaticConfigWrapper>,
          container
        )
      })
      await new Promise(function (resolve) {
        setTimeout(resolve, 100)
      })
    })

    expect(root).toMatchSnapshot()
  })
  it('Should show the custom loading msg', async () => {
    expect.assertions(1)
    const fn = async () => {
      await new Promise(function (resolve) {
        setTimeout(resolve, 2000)
      })
      return new Promise((resolve) => {
        return resolve({
          msg: 'go',
          version: 1234,
          selection: ['no', 'yes'],
          buttonName: 'go go button'
        })
      })
    }
    class ExampleClass extends React.Component {
      static contextType = Context
      render() {
        const config = this.context
        return <code>{JSON.stringify(config, null, 4)}</code>
      }
    }
    let root
    await testAct(async () => {
      domAct(() => {
        root = create(
          <StaticConfigWrapper loader={fn} loadingMsg={<div>🥱Loading🥱</div>}>
            <ExampleClass />
          </StaticConfigWrapper>,
          container
        )
      })
      await new Promise(function (resolve) {
        setTimeout(resolve, 100)
      })
    })

    expect(root).toMatchSnapshot()
  })
  it('Should resolve children with context', async () => {
    expect.assertions(1)
    const fn = async () =>
      new Promise((resolve) => {
        return resolve({
          msg: 'go',
          version: 1234,
          selection: ['no', 'yes'],
          buttonName: 'go go button'
        })
      })
    class ExampleClass extends React.Component {
      static contextType = Context
      render() {
        const config = this.context
        return <code>{JSON.stringify(config, null, 4)}</code>
      }
    }
    let root
    await testAct(async () => {
      domAct(() => {
        root = create(
          <StaticConfigWrapper loader={fn} loadingMsg={<div>Loading</div>}>
            <ExampleClass />
          </StaticConfigWrapper>,
          container
        )
      })
      await new Promise(function (resolve) {
        setTimeout(resolve, 2000)
      })
    })
    expect(root).toMatchSnapshot()
  })
  it('Should inject the config in the properties via a hoc', async () => {
    expect.assertions(1)
    const fn = async () =>
      new Promise((resolve) => {
        return resolve({
          msg: 'go',
          version: 1234,
          selection: ['no', 'yes'],
          buttonName: 'go go button'
        })
      })
    const PureFunction = ({ config, someValue }) => (
      <React.Fragment>
        <code>{JSON.stringify(config, null, 4)}</code>
        <div>{someValue}</div>
      </React.Fragment>
    )
    const HoC = ({ someValue }) => {
      return (
        <ConfigPropExtenderHoc>
          <PureFunction someValue={someValue} />
        </ConfigPropExtenderHoc>
      )
    }
    let root
    await testAct(async () => {
      domAct(() => {
        root = create(
          <StaticConfigWrapper loader={fn} loadingMsg={<div>Loading</div>}>
            <HoC someValue='hello' />
          </StaticConfigWrapper>,
          container
        )
      })
      await new Promise(function (resolve) {
        setTimeout(resolve, 2000)
      })
    })
    expect(root).toMatchSnapshot()
  })
})
