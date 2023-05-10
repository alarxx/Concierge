import { SwiperOptions, Swiper } from '../types/';

declare const register: (injectStyles?: boolean) => void;

// prettier-ignore
interface SwiperContainerEventMap extends HTMLElementEventMap {
  /**
   * Event will be fired in when autoplay started
   */
  autoplaystart: CustomEvent;
  /**
   * Event will be fired when autoplay stopped
   */
  autoplaystop: CustomEvent;
  /**
   * Event will be fired on autoplay pause
   */
  autoplaypause: CustomEvent;
  /**
   * Event will be fired on autoplay resume
   */
  autoplayresume: CustomEvent;
  /**
   * Event triggers continuously while autoplay is enabled. It contains time left (in ms) before transition to next slide and percentage of that time related to autoplay delay
   */
  autoplaytimeleft: CustomEvent;
  /**
   * Event will be fired when slide changed with autoplay
   */
  autoplay: CustomEvent;/**
   * Event will be fired on window hash change
   */
  hashchange: CustomEvent;
  /**
   * Event will be fired when swiper updates the hash
   */
  hashset: CustomEvent;/**
   * Event will be fired on key press
   */
  keypress: CustomEvent;/**
   * Event will be fired on mousewheel scroll
   */
  scroll: CustomEvent;/**
   * Event will be fired on navigation hide
   */
  navigationhide: CustomEvent;
  /**
   * Event will be fired on navigation show
   */
  navigationshow: CustomEvent;
  /**
   * Event will be fired on navigation prev button click
   */
  navigationprev: CustomEvent;
  /**
   * Event will be fired on navigation next button click
   */
  navigationnext: CustomEvent;/**
   * Event will be fired after pagination rendered
   */
  paginationrender: CustomEvent;

  /**
   * Event will be fired when pagination updated
   */
  paginationupdate: CustomEvent;

  /**
   * Event will be fired on pagination hide
   */
  paginationhide: CustomEvent;

  /**
   * Event will be fired on pagination show
   */
  paginationshow: CustomEvent;/**
   * Event will be fired on draggable scrollbar drag start
   */
  scrollbardragstart: CustomEvent;

  /**
   * Event will be fired on draggable scrollbar drag move
   */
  scrollbardragmove: CustomEvent;

  /**
   * Event will be fired on draggable scrollbar drag end
   */
  scrollbardragend: CustomEvent;/**
   * Event will be fired on zoom change
   */
  zoomchange: CustomEvent;

  
  /**
   * Fired right after Swiper initialization.
   * @note Note that with `swiper.on('init')` syntax it will
   * work only in case you set `init: false` parameter.
   *
   * @example
   * ```js
   * const swiper = new Swiper('.swiper', {
   *   init: CustomEvent;
   * swiper.on('init', function() {
   *  // do something
   * });
   * // init Swiper
   * swiper.init();
   * ```
   *
   * @example
   * ```js
   * // Otherwise use it as the parameter:
   * const swiper = new Swiper('.swiper', {
   *   // other parameters
   *   on: CustomEvent;
   * ```
   */
  init: CustomEvent;

  /**
   * Event will be fired right before Swiper destroyed
   */
  beforedestroy: CustomEvent;

  /**
   * Event will be fired when currently active slide is changed
   */
  slidechange: CustomEvent;

  /**
   * Event will be fired in the beginning of animation to other slide (next or previous).
   */
  slidechangetransitionstart: CustomEvent;

  /**
   * Event will be fired after animation to other slide (next or previous).
   */
  slidechangetransitionend: CustomEvent;

  /**
   * Same as "slideChangeTransitionStart" but for "forward" direction only
   */
  slidenexttransitionstart: CustomEvent;

  /**
   * Same as "slideChangeTransitionEnd" but for "forward" direction only
   */
  slidenexttransitionend: CustomEvent;

  /**
   * Same as "slideChangeTransitionStart" but for "backward" direction only
   */
  slideprevtransitionstart: CustomEvent;

  /**
   * Same as "slideChangeTransitionEnd" but for "backward" direction only
   */
  slideprevtransitionend: CustomEvent;

  /**
   * Event will be fired in the beginning of transition.
   */
  transitionstart: CustomEvent;

  /**
   * Event will be fired after transition.
   */
  transitionend: CustomEvent;

  /**
   * Event will be fired when user touch Swiper. Receives `touchstart` event as an arguments.
   */
  touchstart: CustomEvent;

  /**
   * Event will be fired when user touch and move finger over Swiper. Receives `touchmove` event as an arguments.
   */
  touchmove: CustomEvent;

  /**
   * Event will be fired when user touch and move finger over Swiper in direction opposite to direction parameter. Receives `touchmove` event as an arguments.
   */
  touchmoveopposite: CustomEvent;

  /**
   * Event will be fired when user touch and move finger over Swiper and move it. Receives `touchmove` event as an arguments.
   */
  slidermove: CustomEvent;

  /**
   * Event will be fired when user release Swiper. Receives `touchend` event as an arguments.
   */
  touchend: CustomEvent;

  /**
   * Event will be fired when user click/tap on Swiper. Receives `touchend` event as an arguments.
   */
  click: CustomEvent;

  /**
   * Event will be fired when user click/tap on Swiper. Receives `touchend` event as an arguments.
   */
  tap: CustomEvent;

  /**
   * Event will be fired when user double tap on Swiper's container. Receives `touchend` event as an arguments
   */
  doubletap: CustomEvent;

  /**
   * Event will be fired when Swiper progress is changed, as an arguments it receives progress that is always from 0 to 1
   */
  progress: CustomEvent;

  /**
   * Event will be fired when Swiper reach its beginning (initial position)
   */
  reachbeginning: CustomEvent;

  /**
   * Event will be fired when Swiper reach last slide
   */
  reachend: CustomEvent;

  /**
   * Event will be fired when Swiper goes to beginning or end position
   */
  toedge: CustomEvent;

  /**
   * Event will be fired when Swiper goes from beginning or end position
   */
  fromedge: CustomEvent;

  /**
   * Event will be fired when swiper's wrapper change its position. Receives current translate value as an arguments
   */
  settranslate: CustomEvent;

  /**
   * Event will be fired everytime when swiper starts animation. Receives current transition duration (in ms) as an arguments
   */
  settransition: CustomEvent;

  /**
   * Event will be fired on window resize right before swiper's onresize manipulation
   */
  resize: CustomEvent;

  /**
   * Event will be fired if observer is enabled and it detects DOM mutations
   */
  observerupdate: CustomEvent;

  /**
   * Event will be fired right before "loop fix"
   */
  beforeloopfix: CustomEvent;

  /**
   * Event will be fired after "loop fix"
   */
  loopfix: CustomEvent;

  /**
   * Event will be fired on breakpoint change
   */
  breakpoint: CustomEvent;

  /**
   * !INTERNAL: Event will fired right before breakpoint change
   */
 

  /**
   * !INTERNAL: Event will fired after setting CSS classes on swiper container element
   */
 

  /**
   * !INTERNAL: Event will fired after setting CSS classes on swiper slide element
   */
 

  /**
   * !INTERNAL: Event will fired after setting CSS classes on all swiper slides
   */
  classnames: CustomEvent; index: CustomEvent;

  /**
   * !INTERNAL: Event will fired as soon as swiper instance available (before init)
   */
 

  /**
   * !INTERNAL: Event will be fired on free mode touch end (release) and there will no be momentum
   */
 

  /**
   * Event will fired on active index change
   */
  activeindexchange: CustomEvent;
  /**
   * Event will fired on snap index change
   */
  snapindexchange: CustomEvent;
  /**
   * Event will fired on real index change
   */
  realindexchange: CustomEvent;
  /**
   * Event will fired right after initialization
   */
  afterinit: CustomEvent;
  /**
   * Event will fired right before initialization
   */
  beforeinit: CustomEvent;
  /**
   * Event will fired before resize handler
   */
  beforeresize: CustomEvent;
  /**
   * Event will fired before slide change transition start
   */
  beforeslidechangestart: CustomEvent;
  /**
   * Event will fired before transition start
   */
  beforetransitionstart: CustomEvent; // what is internal?
  /**
   * Event will fired on direction change
   */
  changedirection: CustomEvent;
  /**
   * Event will be fired when user double click/tap on Swiper
   */
  doubleclick: CustomEvent;
  /**
   * Event will be fired on swiper destroy
   */
  destroy: CustomEvent;
  /**
   * Event will be fired on momentum bounce
   */
  momentumbounce: CustomEvent;
  /**
   * Event will be fired on orientation change (e.g. landscape -> portrait)
   */
  orientationchange: CustomEvent;
  /**
   * Event will be fired in the beginning of animation of resetting slide to current one
   */
  slideresettransitionstart: CustomEvent;
  /**
   * Event will be fired in the end of animation of resetting slide to current one
   */
  slideresettransitionend: CustomEvent;
  /**
   * Event will be fired with first touch/drag move
   */
  sliderfirstmove: CustomEvent;
  /**
   * Event will be fired when number of slides has changed
   */
  slideslengthchange: CustomEvent;
  /**
   * Event will be fired when slides grid has changed
   */
  slidesgridlengthchange: CustomEvent;
  /**
   * Event will be fired when snap grid has changed
   */
  snapgridlengthchange: CustomEvent;
  /**
   * Event will be fired after swiper.update() call
   */
  update: CustomEvent;
  /**
   * Event will be fired when swiper is locked (when `watchOverflow` enabled)
   */
  lock: CustomEvent;
  /**
   * Event will be fired when swiper is unlocked (when `watchOverflow` enabled)
   */
  unlock: CustomEvent;
  
}

interface SwiperContainer extends HTMLElement {}
interface SwiperContainer extends SwiperOptions {
  swiper: Swiper;
  initialize: () => void;
  injectStyles: string[];
  injectStylesUrls: string[];
  eventsPrefix: string;
  addEventListener<K extends keyof SwiperContainerEventMap>(
    type: K,
    listener: (this: SwiperContainer, ev: SwiperContainerEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions,
  ): void;
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ): void;
  removeEventListener<K extends keyof SwiperContainerEventMap>(
    type: K,
    listener: (this: SwiperContainer, ev: SwiperContainerEventMap[K]) => any,
    options?: boolean | EventListenerOptions,
  ): void;
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions,
  ): void;
}

interface SwiperSlide extends HTMLElement {
  lazy?: string | boolean;
}

export { register, SwiperContainer, SwiperSlide };
