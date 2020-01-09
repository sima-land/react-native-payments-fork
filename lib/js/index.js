// @flow

import { NativeModules, requireNativeComponent } from 'react-native';
import _PaymentRequest from './PaymentRequest';
import { PKPaymentButton } from './PKPaymentButton';

const { RNGooglePay } = NativeModules;

export const ApplePayButton = PKPaymentButton;
export const ApplePay = _PaymentRequest;
export const GooglePay = RNGooglePay;
export const GooglePayButton = requireNativeComponent('GooglePayImageView');
