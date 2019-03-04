import 'context-selector/with-shims';
import 'form-extra-events/with-shims';
import objectAssign from 'polyshim/shim/object-assign';
import AjaxResponse from '../../src/ajax-response';

AjaxResponse.setShim(objectAssign);

export default AjaxResponse;
