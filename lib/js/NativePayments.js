// @flow

import type { PaymentDetailsBase, PaymentComplete } from './types';

import { NativeModules, Platform } from 'react-native';
const { ReactNativePayments } = NativeModules;

const NativePayments: {
  canMakePayments: boolean,
  supportedGateways: Array<string>,
  createPaymentRequest: PaymentDetailsBase => Promise<any>,
  handleDetailsUpdate: PaymentDetailsBase => Promise<any>,
  show: () => Promise<any>,
  abort: () => Promise<any>,
  complete: PaymentComplete => Promise<any>,
  getFullWalletAndroid: string => Promise<any>
} = {
  supportedGateways: ReactNativePayments ? ReactNativePayments.supportedGateways : [],

  canMakePayments(methodData: object) {
    return new Promise((resolve) => {
      // On iOS, canMakePayments is exposed as a constant.
      resolve(ReactNativePayments.canMakePayments);
    });
  },

  createPaymentRequest(methodData, details, options = {}) {
    return new Promise((resolve, reject) => {
      ReactNativePayments.createPaymentRequest(
        methodData,
        details,
        options,
        err => {
          if (err) return reject(err);

          resolve();
        }
      );
    });
  },

  handleDetailsUpdate(details) {
    return new Promise((resolve, reject) => {
      ReactNativePayments.handleDetailsUpdate(details, err => {
        if (err) return reject(err);

        resolve();
      });
    });
  },

  show(methodData, details, options = {}) {
    return new Promise((resolve, reject) => {
      ReactNativePayments.show((err, paymentToken) => {
        if (err) return reject(err);

        resolve(true);
      });
    });
  },

  abort() {
    return new Promise((resolve, reject) => {
      ReactNativePayments.abort(err => {
        if (err) return reject(err);

        resolve(true);
      });
    });
  },

  complete(paymentStatus) {
    return new Promise((resolve, reject) => {
      ReactNativePayments.complete(paymentStatus, err => {
        if (err) return reject(err);

        resolve(true);
      });
    });
  },

  getFullWalletAndroid(googleTransactionId: string, paymentMethodData: object, details: object): Promise<string> {
    return new Promise((resolve, reject) => {
      ReactNativePayments.getFullWalletAndroid(
        googleTransactionId,
        paymentMethodData,
        details,
        (err) => reject(err),
        (serializedPaymentToken) => resolve({
          serializedPaymentToken,
          paymentToken: JSON.parse(serializedPaymentToken),
          /** Leave previous typo in order not to create a breaking change **/
          serializedPaymenToken: serializedPaymentToken,
          paymenToken: JSON.parse(serializedPaymentToken)
        })
      );
    });
  }
};

export default NativePayments;
