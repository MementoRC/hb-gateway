import {
  mkRequestValidator,
  mkValidator,
  RequestValidator,
  Validator,
  validateAmount,
  validateToken,
  validateTokenSymbols,
} from '../../services/validators';
import {
  validateNonce,
  validateAddress,
} from '../ethereum/ethereum.validators';

// test if a string matches the shape of an Ethereum address
export const isAddress = (str: string): boolean => {
  return /^(0x|xdc)[a-fA-F0-9]{40}$/.test(str);
};

export const invalidSpenderError: string =
  'The spender param is invalid xdc address (0x or xdc followed by 40 hexidecimal characters).';

// given a request, look for a key called spender that is 'xdcswap' or an Ethereum address
export const validateSpender: Validator = mkValidator(
  'spender',
  invalidSpenderError,
  (val) => typeof val === 'string' && (val === 'xdcswap' || isAddress(val))
);

export const validateXdcApproveRequest: RequestValidator = mkRequestValidator([
  validateAddress,
  validateSpender,
  validateToken,
  validateAmount,
  validateNonce,
]);

export const validateXdcAllowancesRequest: RequestValidator =
  mkRequestValidator([validateAddress, validateSpender, validateTokenSymbols]);
