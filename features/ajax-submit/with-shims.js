import 'form-extra-events/with-shims';
import objectAssign from 'polyshim/shim/object-assign';
import CustomEvent  from 'polyshim/shim/custom-event';
import AjaxSubmit   from '../../src/ajax-submit';

AjaxSubmit.setShim(objectAssign, CustomEvent);

export default AjaxSubmit;
