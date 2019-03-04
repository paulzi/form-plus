import 'form-extra-events/with-shims';
import objectAssign from 'polyshim/shim/object-assign';
import SubmitLock from '../../src/submit-lock';

SubmitLock.setShim(objectAssign);

export default SubmitLock;
