import 'context-selector/with-shims';
import 'form-extra-events/with-shims';
import objectAssign from 'polyshim/shim/object-assign';
import CustomEvent  from 'polyshim/shim/custom-event';
import AjaxResponse from '../../src/ajax-response';

AjaxResponse.setShim(objectAssign, CustomEvent);

export default AjaxResponse;
