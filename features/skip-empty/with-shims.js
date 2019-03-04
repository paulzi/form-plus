import 'form-extra-events/with-shims';
import objectAssign from 'polyshim/shim/object-assign';
import SkipEmpty from '../../src/skip-empty';

SkipEmpty.setShim(objectAssign);

export default SkipEmpty;
