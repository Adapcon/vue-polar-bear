import { library, dom, config } from '@fortawesome/fontawesome-svg-core';

/**
 * SOLID ICONS
 */
import {
  faAngleDoubleUp as fasAngleDoubleUp,
  faArrowUp as fasArrowUp,
  faBalanceScale as fasBalanceScale,
  faBan as fasBan,
  faBezierCurve as fasBezierCurve,
  faEllipsisV as fasEllipsisV,
  faBarcode as fasBarcode,
  faBars as fasBars,
  faBook as fasBook,
  faBoxes as fasBoxes,
  faBuilding as fasBuilding,
  faBullhorn as fasBullhorn,
  faCalculator as fasCalculator,
  faCheckDouble as fasCheckDouble,
  faCalendar as fasCalendar,
  faCalendarAlt as fasCalendarAlt,
  faCamera as fasCamera,
  faCaretUp as fasCaretUp,
  faChartLine as fasChartLine,
  faCheck as fasCheck,
  faMinus as fasMinus,
  faCheckCircle as fasCheckCircle,
  faChevronUp as fasChevronUp,
  faCircle as fasCircle,
  faClock as fasClock,
  faClone as fasClone,
  faCog as fasCog,
  faComment as fasComment,
  faCommentDots as fasCommentDots,
  faComments as fasComments,
  faCompress as fasCompress,
  faCreditCard as fasCreditCard,
  faEdit as fasEdit,
  faEnvelope as fasEnvelope,
  faEnvelopeOpen as fasEnvelopeOpen,
  faEraser as fasEraser,
  faExclamationCircle as fasExclamationCircle,
  faExclamationTriangle as fasExclamationTriangle,
  faExpand as fasExpand,
  faEye as fasEye,
  faEyeSlash as fasEyeSlash,
  faFile as fasFile,
  faFileCode as fasFileCode,
  faFileExcel as fasFileExcel,
  faFileCsv as fasFileCsv,
  faFileAudio as fasFileAudio,
  faFileImage as fasFileImage,
  faFilePdf as fasFilePdf,
  faFileAlt as fasFileAlt,
  faFileWord as fasFileWord,
  faFilter as fasFilter,
  faFlag as fasFlag,
  faFolder as fasFolder,
  faFolderOpen as fasFolderOpen,
  faForward as fasForward,
  faHandshake as fasHandshake,
  faHistory as fasHistory,
  faHome as fasHome,
  faImage as fasImage,
  faInbox as fasInbox,
  faInfoCircle as fasInfoCircle,
  faKey as fasKey,
  faKeyboard as fasKeyboard,
  faLayerGroup as fasLayerGroup,
  faLock as fasLock,
  faMapMarker as fasMapMarker,
  faMars as fasMars,
  faMicrochip as fasMicrochip,
  faMinusCircle as fasMinusCircle,
  faPaperclip as fasPaperclip,
  faPaperPlane as fasPaperPlane,
  faPen as fasPen,
  faPhone as fasPhone,
  faPlay as fasPlay,
  faPlayCircle as fasPlayCircle,
  faPlug as fasPlug,
  faPlusCircle as fasPlusCircle,
  faPlus as fasPlus,
  faPrint as fasPrint,
  faQuestionCircle as fasQuestionCircle,
  faRss as fasRss,
  faSearch as fasSearch,
  faShare as fasShare,
  faShoppingBag as fasShoppingBag,
  faShoppingCart as fasShoppingCart,
  faSort as fasSort,
  faSortUp as fasSortUp,
  faSortDown as fasSortDown,
  faSpinner as fasSpinner,
  faStar as fasStar,
  faStepForward as fasStepForward,
  faStop as fasStop,
  faSyncAlt as fasSyncAlt,
  faTags as fasTags,
  faThList as fasThList,
  faThumbsDown as fasThumbsDown,
  faThumbsUp as fasThumbsUp,
  faTimes as fasTimes,
  faTrash as fasTrash,
  faTruck as fasTruck,
  faUndo as fasUndo,
  faUnlock as fasUnlock,
  faUpload as fasUpload,
  faDownload as fasDownload,
  faMicrophone as fasMicrophone,
  faUser as fasUser,
  faUserPlus as fasUserPlus,
  faUsers as fasUsers,
  faVenus as fasVenus,
  faVenusMars as fasVenusMars,
  faVideo as fasVideo,
  faWrench as fasWrench,
  faTh as FasTh,
  faGripVertical as fasGripVertical,
  faFire as fasFire,
  faPause as fasPause,
  faVolumeMute as fasVolumeMute,
  faVolumeUp as fasVolumeUp,
  faVolumeOff as fasVolumeOff,
  faRobot as fasRobot,
} from '@fortawesome/free-solid-svg-icons';

/**
 * REGULAR ICONS
 */
import {
  faBell as farBell,
  faCircle as farCircle,
  faEnvelope as farEnvelope,
  faHandshake as farHandshake,
  faStar as farStar,
  faSave as farSave,
} from '@fortawesome/free-regular-svg-icons';

/**
 * BRANDS ICONS
 */
import {
  faChrome as fabChrome,
  faEdge as fabEdge,
  faFirefox as fabFirefox,
  faInstagram as fabInstagram,
  faInternetExplorer as fabInternetExplorer,
  faOpera as fabOpera,
  faSafari as fabSafari,
  faVimeo as fabVimeo,
  faWhatsapp as fabWhatsapp,
  faYoutube as fabYoutube,
  faFacebook as fabFacebook,
  faTwitter as fabTwitter,
  faLinkedin as fabLinkedin,
  faDiscord as fabDiscord,
  faTiktok as fabTiktok,

} from '@fortawesome/free-brands-svg-icons';

/**
 * Configuration
 */
config.keepOriginalSource = false;
config.autoA11y = true;

/**
 * Icons library build
 */
library.add(
  fasAngleDoubleUp,
  fasArrowUp,
  fasBalanceScale,
  fasBan,
  fasBezierCurve,
  fasEllipsisV,
  fasBarcode,
  fasBars,
  farBell,
  fasBook,
  fasBoxes,
  fasBuilding,
  fasBullhorn,
  fasCalculator,
  fasCalendar,
  fasCalendarAlt,
  fasCheckDouble,
  fasCamera,
  fasCaretUp,
  fasChartLine,
  fasCheck,
  fasMinus,
  fasCheckCircle,
  fasChevronUp,
  fabChrome,
  farCircle,
  fasCircle,
  fasClock,
  fasClone,
  fasCog,
  fasComment,
  fasCommentDots,
  fasComments,
  fasCompress,
  fasCreditCard,
  fasEdit,
  fabEdge,
  fasEnvelope,
  fasEnvelopeOpen,
  farEnvelope,
  fasEraser,
  fasExclamationCircle,
  fasExclamationTriangle,
  fasExpand,
  fasEye,
  fasEyeSlash,
  fasFile,
  fasFileAlt,
  fasFileCode,
  fasFileExcel,
  fasFileAudio,
  fasFileCsv,
  fasFileImage,
  fasFilePdf,
  fasFileWord,
  fasFilter,
  fabFirefox,
  fasFlag,
  fasFolder,
  fasFolderOpen,
  fasForward,
  fasLayerGroup,
  fasHandshake,
  farHandshake,
  fasHistory,
  fasHome,
  fasImage,
  fasInbox,
  fasInfoCircle,
  fabInstagram,
  fabInternetExplorer,
  fasKey,
  fasKeyboard,
  fasLock,
  fasMapMarker,
  fasMars,
  fasMicrochip,
  fasMinusCircle,
  fabOpera,
  fasPaperclip,
  fasPaperPlane,
  fasPen,
  fasPhone,
  fasPlay,
  fasPlayCircle,
  fasPlug,
  fasPlusCircle,
  fasPrint,
  fasQuestionCircle,
  fasRss,
  fabSafari,
  farSave,
  fasSearch,
  fasShare,
  fasShoppingBag,
  fasShoppingCart,
  fasSort,
  fasSortUp,
  fasSortDown,
  fasSpinner,
  farStar,
  fasStar,
  fasStepForward,
  fasStop,
  fasSyncAlt,
  fasTags,
  fasThList,
  fasThumbsDown,
  fasThumbsUp,
  fasTimes,
  fasTrash,
  fasTruck,
  fasUndo,
  fasUnlock,
  fasUpload,
  fasDownload,
  fasMicrophone,
  fasUser,
  fasUserPlus,
  fasUsers,
  fasVenus,
  fasVenusMars,
  fasVideo,
  fasVolumeMute,
  fasVolumeOff,
  fasVolumeUp,
  fasPause,
  fabVimeo,
  fabWhatsapp,
  fasWrench,
  fabYoutube,
  fabFacebook,
  fabTwitter,
  fabLinkedin,
  fabDiscord,
  fabTiktok,
  FasTh,
  fasPlus,
  fasGripVertical,
  fasFire,
  fasRobot,
);

// Replace any existing <i> tags with <svg> and set up a MutationObserver to
// continue doing this as the DOM changes.
// dom.watch();
export default { dom, library };
