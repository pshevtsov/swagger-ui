import React from "react"
import PropTypes from "prop-types"
import { fromJS } from "immutable"
import ImPropTypes from "react-immutable-proptypes"
import { sanitizeUrl } from "core/utils"


class Path extends React.Component {
  static propTypes = {
    host: PropTypes.string,
    basePath: PropTypes.string
  }

  render() {
    let { host, basePath } = this.props

    return (
      <pre className="base-url">
        [ Base URL: {host}{basePath} ]
      </pre>
    )
  }
}


class Contact extends React.Component {
  static propTypes = {
    data: PropTypes.object
  }

  render(){
    let { data } = this.props
    let name = data.get("name") || "the developer"
    let url = data.get("url")
    let email = data.get("email")

    return (
      <div>
        { url && <div><a href={ sanitizeUrl(url) } target="_blank">{ name } - Website</a></div> }
        { email &&
          <a href={sanitizeUrl(`mailto:${email}`)}>
            { url ? `Send email to ${name}` : `Contact ${name}`}
          </a>
        }
      </div>
    )
  }
}

class License extends React.Component {
  static propTypes = {
    license: PropTypes.object
  }

  render(){
    let { license } = this.props
    let name = license.get("name") || "License"
    let url = license.get("url")

    return (
      <div>
        {
          url ? <a target="_blank" href={ sanitizeUrl(url) }>{ name }</a>
        : <span>{ name }</span>
        }
      </div>
    )
  }
}

export default class Info extends React.Component {
  static propTypes = {
    info: PropTypes.object,
    url: PropTypes.string,
    host: PropTypes.string,
    basePath: PropTypes.string,
    externalDocs: ImPropTypes.map,
    getComponent: PropTypes.func.isRequired,
  }

  render() {
    let { info, url, host, basePath, getComponent, externalDocs } = this.props
    let version = info.get("version")
    let description = info.get("description")
    let title = info.get("title")
    let termsOfService = info.get("termsOfService")
    let contact = info.get("contact")
    let license = info.get("license")
    const { url:externalDocsUrl, description:externalDocsDescription } = (externalDocs || fromJS({})).toJS()

    const Markdown = getComponent("Markdown")
    const VersionStamp = getComponent("VersionStamp")

    return (
      <div className="info">
        <hgroup className="main">
          <h2 className="title" >{ title }
            { version && <VersionStamp version={version}></VersionStamp> }
          </h2>
          { host || basePath ? <Path host={ host } basePath={ basePath } /> : null }
          { url && <a target="_blank" href={ sanitizeUrl(url) }><span className="url"> { url } </span></a> }
        </hgroup>
        <img className="logo" src="logo.png" width="200" />
        <div className="description">
          <Markdown source={ description } />
        </div>

        {
          termsOfService && <div>
            <a target="_blank" href={ sanitizeUrl(termsOfService) }>Terms of service</a>
          </div>
        }

        { contact && contact.size ? <Contact data={ contact } /> : null }
        { license && license.size ? <License license={ license } /> : null }
        { externalDocsUrl ?
            <a target="_blank" href={sanitizeUrl(externalDocsUrl)}>{externalDocsDescription || externalDocsUrl}</a>
        : null }

      </div>
    )
  }

}

Info.propTypes = {
  title: PropTypes.any,
  description: PropTypes.any,
  version: PropTypes.any,
  url: PropTypes.string
}
