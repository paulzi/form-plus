import SkipEmpty     from './features/skip-empty/with-polyfills';
import SubmitLock    from './features/submit-lock/with-polyfills';
import CatchDownload from './features/catch-download/with-polyfills';
import AjaxSubmit    from './features/ajax-submit/with-polyfills';
import AjaxResponse  from './features/ajax-response/with-polyfills';

SkipEmpty.register();
SubmitLock.register();
CatchDownload.register();
AjaxSubmit.register();
AjaxResponse.register();

export { SkipEmpty, SubmitLock, CatchDownload, AjaxSubmit, AjaxResponse };