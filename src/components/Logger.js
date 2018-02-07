// @flow
import React from 'react';

import Configurable from './Configurable';

type LogUtilsProps = {
  /**
   * Optional. The location of the node through which to interact with Attivio.
   * Defaults to the value in the configuration if it's available or
   * 'http://localhost:17000' if it's not.
   */
  baseUri: string;
}

class LogUtils extends React.Component<LogUtilsProps, LogUtilsProps, void> {
  static instance;

  static defaultProps = {
    baseUri: 'http://localhost:17000',
  }

  static info(message: string, context: string = 'general', error: Error | null = null) {
    LogUtils.instance.sendInfo('info', message, context, error);
  }

  static error(message: string, context: string = 'general', error: Error | null = null) {
    LogUtils.instance.sendInfo('error', message, context, error);
  }

  static debug(message: string, context: string = 'general', error: Error | null = null) {
    LogUtils.instance.sendInfo('debug', message, context, error);
  }

  static warn(message: string, context: string = 'general', error: Error | null = null) {
    LogUtils.instance.sendInfo('warn', message, context, error);
  }

  constructor(props: any) {
    super(props);
    LogUtils.instance = this;
  }

  sendInfo(level: 'debug' | 'info' | 'warn' | 'error', message: string, context: string, error: Error | null = null) {
    const headers = new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });
    const payload = {
      level,
      message,
      context,
      error,
    };
    const body = JSON.stringify(payload);
    const params = {
      method: 'POST',
      headers,
      body,
    };

    const uri = `${this.props.baseUri}/rest/loggingApi/log`;
    const request = new Request(uri, params);
    fetch(request).then((result: Response) => {
      if (!result.ok) {
        console.log(`Failed to log error to the server:\n${message}`, result.statusText); // eslint-disable-line no-console
      }
    }).catch((e: Error) => {
      console.log(`Failed to log error to the server:\n${message}`, e); // eslint-disable-line no-console
    });
  }

  render() {
    return null;
  }
}

export default Configurable(LogUtils);
