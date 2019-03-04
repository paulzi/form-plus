import 'form-extra-events/with-shims';
import objectAssign from 'polyshim/shim/object-assign';
import CatchDownload from '../../src/catch-download';

CatchDownload.setShim(objectAssign);

export default CatchDownload;
