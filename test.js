import 'form-association-polyfill';
import SkipEmpty     from './features/skip-empty/with-shims';
import SubmitLock    from './features/submit-lock/with-shims';
import CatchDownload from './features/catch-download/with-shims';
import AjaxSubmit    from './features/ajax-submit/with-shims';
import AjaxResponse  from './features/ajax-response/with-shims';

SkipEmpty.register();
SubmitLock.register();
CatchDownload.register();
AjaxSubmit.register();
AjaxResponse.register();

export { SkipEmpty, SubmitLock, CatchDownload, AjaxSubmit, AjaxResponse };
