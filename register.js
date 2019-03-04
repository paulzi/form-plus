import SkipEmpty     from './features/skip-empty';
import SubmitLock    from './features/submit-lock';
import CatchDownload from './features/catch-download';
import AjaxSubmit    from './features/ajax-submit';
import AjaxResponse  from './features/ajax-response';

SkipEmpty.register();
SubmitLock.register();
CatchDownload.register();
AjaxSubmit.register();
AjaxResponse.register();

export { SkipEmpty, SubmitLock, CatchDownload, AjaxSubmit, AjaxResponse };
